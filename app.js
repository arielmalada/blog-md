// Blog Application JavaScript

// Blog post data embedded directly
const blogData = {
  "posts": [
    {
      "id": "getting-started-with-markdown",
      "title": "Getting Started with Markdown",
      "date": "2024-01-15",
      "excerpt": "Learn the basics of writing in Markdown format for blogging and documentation.",
      "content": "# Getting Started with Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## Why Use Markdown?\n\nMarkdown has several advantages:\n\n- **Easy to learn** - Simple syntax that's intuitive\n- **Portable** - Files are plain text and work everywhere\n- **Fast to write** - No need for complex formatting tools\n- **Version control friendly** - Works great with Git\n\n## Basic Syntax\n\n### Headers\nUse `#` symbols for headers:\n\n```markdown\n# H1 Header\n## H2 Header\n### H3 Header\n```\n\n### Text Formatting\n- *Italic text* with single asterisks\n- **Bold text** with double asterisks\n- `Code text` with backticks\n\n### Lists\nUnordered lists:\n- Item 1\n- Item 2\n- Item 3\n\nOrdered lists:\n1. First item\n2. Second item\n3. Third item\n\n### Links and Images\n[Link text](http://example.com)\n![Alt text](image.jpg)\n\n### Code Blocks\n```javascript\nfunction hello() {\n    console.log('Hello, world!');\n}\n```\n\n### Blockquotes\n> This is a blockquote. It can span multiple lines and is great for highlighting important information or quotes.\n\n## Conclusion\n\nMarkdown is an excellent choice for writing blog posts because it keeps you focused on content rather than formatting. Give it a try!"
    },
    {
      "id": "web-development-trends-2024",
      "title": "Web Development Trends in 2024",
      "date": "2024-02-01",
      "excerpt": "Explore the latest trends shaping web development in 2024, from AI integration to new frameworks.",
      "content": "# Web Development Trends in 2024\n\nThe web development landscape continues to evolve rapidly. Here are the key trends defining 2024.\n\n## 1. AI Integration\n\nArtificial Intelligence is becoming deeply integrated into web development:\n\n- **Code generation** tools like GitHub Copilot\n- **Automated testing** and bug detection\n- **Content personalization** engines\n- **Chatbots and virtual assistants**\n\n### Popular AI Tools\n- GitHub Copilot\n- ChatGPT for code assistance\n- Midjourney for design assets\n- Vercel v0 for component generation\n\n## 2. Performance-First Development\n\nWith Core Web Vitals becoming crucial for SEO:\n\n- **Lazy loading** everything\n- **Image optimization** is mandatory\n- **Bundle splitting** and code splitting\n- **Edge computing** and CDN usage\n\n## 3. Component-Driven Architecture\n\nModern applications are built with reusable components:\n\n```javascript\n// Example React component\nfunction BlogPost({ title, content, date }) {\n    return (\n        <article className=\"blog-post\">\n            <h1>{title}</h1>\n            <time>{date}</time>\n            <div dangerouslySetInnerHTML={{__html: content}} />\n        </article>\n    );\n}\n```\n\n## 4. Serverless and Edge Computing\n\n- **Vercel Edge Functions**\n- **Cloudflare Workers**\n- **AWS Lambda@Edge**\n- **Netlify Edge Functions**\n\n## 5. TypeScript Dominance\n\nTypeScript adoption continues to grow:\n\n> \"TypeScript is no longer optional for serious web development projects.\"\n\n### Benefits:\n- Better IDE support\n- Fewer runtime errors\n- Improved refactoring\n- Enhanced team collaboration\n\n## 6. CSS Evolution\n\nNew CSS features are changing how we style:\n\n- **Container queries**\n- **CSS Grid subgrid**\n- **CSS nesting**\n- **Custom properties (CSS variables)**\n\n## Conclusion\n\nStaying current with web development trends is crucial for building modern, performant applications. Focus on learning these technologies to stay competitive in 2024."
    },
    {
      "id": "building-accessible-websites",
      "title": "Building Accessible Websites",
      "date": "2024-01-28",
      "excerpt": "A comprehensive guide to making your websites accessible to all users, including those with disabilities.",
      "content": "# Building Accessible Websites\n\nWeb accessibility ensures that websites and web applications can be used by everyone, including people with disabilities.\n\n## Why Accessibility Matters\n\nAccessibility is not just about compliance—it's about:\n\n- **Inclusivity** - Ensuring everyone can use your website\n- **Legal compliance** - Meeting ADA and WCAG requirements\n- **Better UX** - Accessible design often improves usability for everyone\n- **SEO benefits** - Search engines favor accessible content\n\n## WCAG Guidelines\n\nThe Web Content Accessibility Guidelines (WCAG) provide four main principles:\n\n### 1. Perceivable\n- Provide text alternatives for images\n- Use sufficient color contrast\n- Make content adaptable to different presentations\n\n```html\n<!-- Good: Alt text for images -->\n<img src=\"chart.png\" alt=\"Sales increased by 25% in Q4 2023\">\n\n<!-- Good: Proper heading structure -->\n<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Subsection Title</h3>\n```\n\n### 2. Operable\n- Make all functionality keyboard accessible\n- Give users enough time to read content\n- Don't use content that causes seizures\n\n### 3. Understandable\n- Make text readable and understandable\n- Make content appear and operate predictably\n- Help users avoid and correct mistakes\n\n### 4. Robust\n- Maximize compatibility with assistive technologies\n\n## Common Accessibility Issues\n\n### Missing Alt Text\n```html\n<!-- Bad -->\n<img src=\"product.jpg\">\n\n<!-- Good -->\n<img src=\"product.jpg\" alt=\"Red laptop computer\">\n```\n\n### Poor Color Contrast\n- Text should have at least 4.5:1 contrast ratio\n- Large text needs at least 3:1 contrast ratio\n- Use tools like WebAIM Contrast Checker\n\n### Keyboard Navigation\nEnsure all interactive elements can be accessed via keyboard:\n\n```css\n/* Visible focus indicators */\nbutton:focus,\na:focus {\n    outline: 2px solid #0066cc;\n    outline-offset: 2px;\n}\n```\n\n## Testing Tools\n\n### Automated Testing\n- **axe-core** - Browser extension and library\n- **Lighthouse** - Built into Chrome DevTools\n- **WAVE** - Web accessibility evaluation tool\n\n### Manual Testing\n1. Navigate using only keyboard (Tab, Enter, Space)\n2. Test with screen reader (NVDA, VoiceOver)\n3. Check color contrast\n4. Validate HTML markup\n\n## Best Practices\n\n### Semantic HTML\nUse proper HTML elements for their intended purpose:\n\n```html\n<!-- Use semantic elements -->\n<nav>...</nav>\n<main>...</main>\n<article>...</article>\n<aside>...</aside>\n<footer>...</footer>\n\n<!-- Use proper form labels -->\n<label for=\"email\">Email Address</label>\n<input type=\"email\" id=\"email\" required>\n```\n\n### ARIA Attributes\nUse ARIA when semantic HTML isn't enough:\n\n```html\n<!-- ARIA labels -->\n<button aria-label=\"Close dialog\">×</button>\n\n<!-- ARIA landmarks -->\n<div role=\"banner\">Header content</div>\n<div role=\"main\">Main content</div>\n```\n\n## Conclusion\n\nBuilding accessible websites is an ongoing process that requires attention to detail and regular testing. Start with semantic HTML, ensure keyboard navigation works, provide proper alt text, and test with real users when possible.\n\nRemember: accessibility benefits everyone, not just users with disabilities."
    }
  ]
};

// Application state
let currentView = 'home';
let currentPost = null;
let allPosts = [];
let filteredPosts = [];

// DOM elements
const homeView = document.getElementById('home-view');
const postView = document.getElementById('post-view');
const postsGrid = document.getElementById('posts-grid');
const searchInput = document.getElementById('search-input');
const homeLink = document.getElementById('home-link');
const backButton = document.getElementById('back-button');

// Post view elements
const postTitle = document.getElementById('post-title');
const postDate = document.getElementById('post-date');
const postContent = document.getElementById('post-content');
const readingTime = document.getElementById('reading-time');

// Utility functions
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function stripMarkdown(markdown) {
  // Simple markdown stripping for excerpts
  return markdown
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/^\s*>\s+/gm, '') // Remove blockquotes
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with space
    .trim();
}

// Rendering functions
function renderPostCard(post) {
  const readTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.date);
  
  return `
    <article class="card post-card" data-post-id="${post.id}" role="button" tabindex="0" aria-label="Read post: ${post.title}">
      <div class="post-card-body">
        <h2 class="post-card-title">${post.title}</h2>
        <div class="post-card-meta">
          <time class="post-card-date" datetime="${post.date}">${formattedDate}</time>
          <span class="post-card-reading-time">${readTime}</span>
        </div>
        <p class="post-card-excerpt">${post.excerpt}</p>
      </div>
    </article>
  `;
}

function renderPosts(posts) {
  if (posts.length === 0) {
    postsGrid.innerHTML = `
      <div class="empty-state">
        <h3>No posts found</h3>
        <p>Try adjusting your search terms.</p>
      </div>
    `;
    return;
  }

  postsGrid.innerHTML = posts.map(renderPostCard).join('');
  
  // Add click handlers to post cards
  const postCards = postsGrid.querySelectorAll('.post-card');
  postCards.forEach(card => {
    const postId = card.getAttribute('data-post-id');
    
    // Click handler
    card.addEventListener('click', () => showPost(postId));
    
    // Keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showPost(postId);
      }
    });
  });
}

function showHome() {
  currentView = 'home';
  homeView.classList.remove('hidden');
  postView.classList.add('hidden');
  document.title = 'DevBlog - Modern Web Development Insights';
  
  // Update URL without reloading
  window.history.pushState({ view: 'home' }, '', '#');
}

function showPost(postId) {
  const post = allPosts.find(p => p.id === postId);
  if (!post) return;
  
  currentPost = post;
  currentView = 'post';
  
  // Update DOM elements
  postTitle.textContent = post.title;
  postDate.textContent = formatDate(post.date);
  readingTime.textContent = calculateReadingTime(post.content);
  
  // Parse and render markdown content
  if (typeof marked !== 'undefined') {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
      sanitize: false
    });
    
    postContent.innerHTML = marked.parse(post.content);
  } else {
    // Fallback if marked.js fails to load
    postContent.innerHTML = `<pre>${post.content}</pre>`;
  }
  
  // Update views
  homeView.classList.add('hidden');
  postView.classList.remove('hidden');
  
  // Update document title
  document.title = `${post.title} - DevBlog`;
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Update URL
  window.history.pushState({ view: 'post', postId }, '', `#post/${postId}`);
}

// Search functionality
function filterPosts(searchTerm) {
  if (!searchTerm.trim()) {
    filteredPosts = [...allPosts];
  } else {
    const term = searchTerm.toLowerCase();
    filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      stripMarkdown(post.content).toLowerCase().includes(term)
    );
  }
  
  if (currentView === 'home') {
    renderPosts(filteredPosts);
  }
}

// Social sharing functionality
function sharePost(platform) {
  if (!currentPost) return;
  
  const url = window.location.href;
  const title = currentPost.title;
  const text = currentPost.excerpt;
  
  switch (platform) {
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'linkedin':
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'copy':
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          // Simple feedback - could be enhanced with a toast notification
          const btn = document.querySelector('[data-platform="copy"]');
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      break;
  }
}

// Event listeners
function setupEventListeners() {
  // Home navigation
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });
  
  // Back button
  backButton.addEventListener('click', showHome);
  
  // Search functionality
  searchInput.addEventListener('input', (e) => {
    filterPosts(e.target.value);
  });
  
  // Share buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('share-btn')) {
      const platform = e.target.getAttribute('data-platform');
      sharePost(platform);
    }
  });
  
  // Browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state) {
      if (e.state.view === 'home') {
        showHome();
      } else if (e.state.view === 'post' && e.state.postId) {
        showPost(e.state.postId);
      }
    } else {
      // Handle initial page load or direct navigation
      const hash = window.location.hash;
      if (hash.startsWith('#post/')) {
        const postId = hash.substring(6);
        showPost(postId);
      } else {
        showHome();
      }
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // ESC key to go back to home when viewing a post
    if (e.key === 'Escape' && currentView === 'post') {
      showHome();
    }
  });
}

// Initialize application
function initializeApp() {
  // Load posts data
  allPosts = [...blogData.posts];
  filteredPosts = [...allPosts];
  
  // Set up event listeners
  setupEventListeners();
  
  // Handle initial route
  const hash = window.location.hash;
  if (hash.startsWith('#post/')) {
    const postId = hash.substring(6);
    if (allPosts.find(p => p.id === postId)) {
      showPost(postId);
    } else {
      showHome();
    }
  } else {
    showHome();
    renderPosts(filteredPosts);
  }
  
  // Set initial history state
  if (!window.history.state) {
    window.history.replaceState({ view: currentView }, '', window.location.hash || '#');
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Error handling for marked.js loading
window.addEventListener('error', (e) => {
  if (e.filename && e.filename.includes('marked')) {
    console.warn('Marked.js failed to load. Using fallback rendering.');
  }
});