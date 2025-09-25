# DevBlog - Modern Web Development Blog

A clean, fast, and professional blog built with vanilla HTML, CSS, and JavaScript, featuring GitHub Pages integration and automatic CI/CD deployment.

## 🚀 Features

- **Markdown-based content** - Write posts in clean Markdown syntax
- **GitHub Pages hosting** - Free, fast, and reliable hosting
- **Automatic deployments** - CI/CD pipeline with GitHub Actions
- **Responsive design** - Mobile-first, modern UI
- **Search functionality** - Find posts quickly
- **Clean typography** - Optimized reading experience
- **SEO-friendly** - Proper meta tags and structure
- **Version control** - Full Git integration
- **Obsidian integration** - Write posts in your favorite note-taking app

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Markdown Parser**: marked.js
- **Build Tool**: GitHub Actions
- **Hosting**: GitHub Pages
- **Version Control**: Git
- **Package Manager**: CDN (no npm dependencies)

## 📋 Prerequisites

- Git
- GitHub account
- Basic command line knowledge
- A code editor (VS Code recommended)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/arielmalada/blog-md.git
cd blog-md
```

### 2. Run Locally
```bash
# Start a local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### 3. View Live Site
Visit the deployed version: https://arielmalada.github.io/blog-md/

## 📝 Writing Posts

### Create New Posts

1. Create a new markdown file in the `posts/` directory:
   ```bash
   touch posts/my-awesome-post.md
   ```

2. Add frontmatter and content:
   ```markdown
   ---
   title: My Awesome Post
   date: 2024-09-25
   excerpt: Brief description of your post
   ---

   # My Awesome Post

   Start writing your content here using Markdown...

   ## Section Title

   - Bullet points
   - **Bold text**
   - *Italic text*

   ### Code Example

   \`\`\`javascript
   function hello() {
       console.log('Hello, world!');
   }
   \`\`\`

   ## Conclusion

   Wrap up your thoughts here.
   ```

3. Commit and push:
   ```bash
   git add posts/my-awesome-post.md
   git commit -m "Add my awesome post"
   git push origin main
   ```

### Post Format

- **Frontmatter**: YAML metadata between `---` markers
- **Title**: Required, used in post listings
- **Date**: Required, format: YYYY-MM-DD
- **Excerpt**: Optional, shown in post previews
- **Content**: Markdown syntax supported

## 🔧 Project Structure

```
blog-md/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── posts/                      # Blog post markdown files
│   ├── getting-started-with-markdown.md
│   ├── setup-github-pages-ci-cd.md
│   └── obsidian-github-blog.md
├── index.html                  # Main blog page
├── app.js                     # JavaScript functionality
├── github-service.js          # GitHub API integration
├── style.css                  # Blog styles
└── README.md                  # This file
```

## 🚀 Deployment

### Automatic Deployment

The blog automatically deploys to GitHub Pages when you push changes to the `main` branch:

1. **Make your changes** (add posts, update content)
2. **Commit and push** to GitHub
3. **GitHub Actions** runs automatically
4. **Deployment completes** in 1-2 minutes
5. **Site updates** live on GitHub Pages

### Manual Deployment

You can also trigger deployment manually:

1. Go to your repository on GitHub
2. Navigate to the **Actions** tab
3. Click **"Deploy to GitHub Pages"** workflow
4. Click **"Run workflow"**

## ⚙️ Configuration

### GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Save the settings

### Local Development

```bash
# Start local server
python3 -m http.server 8000

# Or use any other static server
npx serve .
# or
npm install -g live-server
live-server
```

## 🔍 Features Overview

### Blog Functionality
- ✅ Post listing with excerpts
- ✅ Individual post pages
- ✅ Search functionality
- ✅ Responsive design
- ✅ SEO optimization

### Content Management
- ✅ Markdown-based posts
- ✅ Frontmatter support
- ✅ Automatic reading time calculation
- ✅ Post metadata handling

### Technical Features
- ✅ GitHub API integration
- ✅ Fallback to local files
- ✅ Error handling
- ✅ Loading states
- ✅ Clean URL routing

## 🎨 Customization

### Styling
Edit `style.css` to customize:
- Colors and themes
- Typography
- Layout and spacing
- Responsive breakpoints

### Functionality
Modify `app.js` to add:
- Custom post processing
- Additional features
- Analytics integration
- Social sharing

### Content
Update posts in `posts/` directory:
- Add new markdown files
- Update existing content
- Modify frontmatter
- Add images and assets

## 🐛 Troubleshooting

### Common Issues

**Posts not loading:**
- Check if posts are in `posts/` directory
- Verify frontmatter format
- Check browser console for errors

**Deployment issues:**
- Verify GitHub Pages is enabled in settings
- Check Actions tab for workflow status
- Ensure repository is public

**Markdown not rendering:**
- Check if marked.js is loading
- Verify markdown syntax
- Look for JavaScript errors

### Debug Tips

1. **Check browser console** for JavaScript errors
2. **Verify file paths** in HTML
3. **Test locally** before pushing
4. **Check GitHub Actions** logs for deployment issues

## 📈 Performance

- **Fast loading** - Optimized CSS and minimal JavaScript
- **CDN delivery** - GitHub Pages global CDN
- **Mobile optimized** - Responsive design
- **SEO friendly** - Proper meta tags and structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- GitHub Pages for free hosting
- marked.js for markdown parsing
- Obsidian for the inspiration
- The developer community for guidance

---

**Ready to start blogging?** Just create your first post and push to see it live! 🚀
