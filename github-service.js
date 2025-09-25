// GitHub API Service for fetching blog posts from repository
class GitHubService {
  constructor(config) {
    this.config = config;
    this.baseURL = 'https://api.github.com';
    this.rateLimitRemaining = null;
    this.rateLimitReset = null;
  }

  // Get repository contents
  async getContents(path = '') {
    const url = `${this.baseURL}/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Blog-MD/1.0'
        }
      });

      // Update rate limit info
      this.rateLimitRemaining = parseInt(response.headers.get('x-ratelimit-remaining')) || 60;
      this.rateLimitReset = parseInt(response.headers.get('x-ratelimit-reset')) || Date.now();

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error fetching GitHub contents:', error);
      throw error;
    }
  }

  // Get file content (Base64 decoded)
  async getFileContent(filePath) {
    const contents = await this.getContents(filePath);
    const file = contents[0]; // Should be a single file

    if (file.type !== 'file') {
      throw new Error('Path is not a file');
    }

    // Decode Base64 content
    const content = atob(file.content);
    return {
      ...file,
      decodedContent: content
    };
  }

  // Parse frontmatter from markdown content
  parseFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      // No frontmatter, return entire content
      return {
        frontmatter: {},
        content: content.trim()
      };
    }

    const frontmatterText = match[1];
    const body = match[2];

    // Simple YAML-like frontmatter parser
    const frontmatter = {};
    const lines = frontmatterText.split('\n');

    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        // Remove quotes if present
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
      }
    });

    return {
      frontmatter,
      content: body.trim()
    };
  }

  // Get all markdown posts
  async getPosts() {
    try {
      // First try to get from GitHub API
      const contents = await this.getContents(this.config.postsPath);
      const markdownFiles = contents.filter(item =>
        item.type === 'file' &&
        item.name.toLowerCase().endsWith('.md')
      );

      const posts = await Promise.all(
        markdownFiles.map(async (file) => {
          try {
            const fileData = await this.getFileContent(`${this.config.postsPath}/${file.name}`);
            const parsed = this.parseFrontmatter(fileData.decodedContent);

            // Generate ID from filename
            const id = file.name.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return {
              id,
              title: parsed.frontmatter.title || this.generateTitleFromFilename(file.name),
              date: parsed.frontmatter.date || fileData.sha.substring(0, 10), // Fallback to commit SHA
              excerpt: parsed.frontmatter.excerpt || this.generateExcerpt(parsed.content),
              content: parsed.content,
              originalFile: file.name
            };
          } catch (error) {
            console.warn(`Error processing file ${file.name}:`, error);
            return null;
          }
        })
      );

      // Filter out null posts and sort by date (newest first)
      return posts.filter(post => post !== null)
                  .sort((a, b) => new Date(b.date) - new Date(a.date));

    } catch (error) {
      console.warn('GitHub API failed, falling back to local files:', error.message);
      console.log('Repository might be private or not exist. This is normal for development.');

      // Fallback to loading local markdown files
      return await this.getPostsFromLocalFiles();
    }
  }

  // Fallback method to load posts from local files
  async getPostsFromLocalFiles() {
    const posts = [];

    // List of local markdown files to load as fallback
    const localFiles = [
      'posts/getting-started-with-markdown.md',
      'posts/web-development-trends-2024.md',
      'posts/building-accessible-websites.md'
    ];

    for (const filePath of localFiles) {
      try {
        const response = await fetch(`/${filePath}`);
        if (!response.ok) {
          console.warn(`Failed to load local file: ${filePath}`);
          continue;
        }

        const content = await response.text();
        const parsed = this.parseFrontmatter(content);

        // Generate ID from filename
        const filename = filePath.split('/').pop();
        const id = filename.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

        posts.push({
          id,
          title: parsed.frontmatter.title || this.generateTitleFromFilename(filename),
          date: parsed.frontmatter.date || new Date().toISOString().split('T')[0], // Today's date as fallback
          excerpt: parsed.frontmatter.excerpt || this.generateExcerpt(parsed.content),
          content: parsed.content,
          originalFile: filename,
          source: 'local' // Mark as local fallback
        });

      } catch (error) {
        console.warn(`Error loading local file ${filePath}:`, error);
      }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Generate title from filename
  generateTitleFromFilename(filename) {
    return filename
      .replace(/\.md$/i, '')
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  // Generate excerpt from content
  generateExcerpt(content, maxLength = 150) {
    const plainText = content
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
      .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
      .replace(/^\s*>\s+/gm, '') // Remove blockquotes
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    return plainText.substring(0, maxLength).replace(/\s+\S*$/, '...');
  }

  // Get rate limit status
  getRateLimitStatus() {
    return {
      remaining: this.rateLimitRemaining,
      resetTime: new Date(this.rateLimitReset * 1000),
      resetInMinutes: Math.ceil((this.rateLimitReset * 1000 - Date.now()) / (1000 * 60))
    };
  }
}

// Initialize GitHub service with configuration
// Make it globally available for app.js
window.githubService = new GitHubService({
  owner: 'arielmalada',
  repo: 'blog-md',
  branch: 'main',
  postsPath: 'posts'
});
