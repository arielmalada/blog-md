---
title: How to Set Up a GitHub Pages Blog with CI/CD
date: 2025-09-25
excerpt: Complete step-by-step guide to deploying a static blog on GitHub Pages with automatic deployments using GitHub Actions.
tags: github-pages, ci-cd, static-site, deployment, automation, tutorial
---

# How to Set Up a GitHub Pages Blog with CI/CD

Setting up a professional blog on GitHub Pages with automatic CI/CD deployments is easier than you think. In this comprehensive guide, I'll walk you through the complete process, from creating your repository to seeing your blog live on the internet.

## What is GitHub Pages?

GitHub Pages is GitHub's free hosting service for static websites. It allows you to:

- Host personal blogs, portfolios, and documentation sites
- Serve content directly from Git repositories
- Get automatic HTTPS and global CDN delivery
- Deploy with zero downtime

## Prerequisites

Before you begin, make sure you have:

- A GitHub account (free)
- Basic knowledge of Git commands
- A static site or blog files ready to deploy

## Step 1: Create Your Repository

1. **Log in to GitHub** and click the "+" icon in the top right
2. **Select "New repository"**
3. **Choose a repository name** (e.g., `my-awesome-blog`)
4. **Make it public** (required for free GitHub Pages hosting)
5. **Don't initialize** with README, .gitignore, or license if you have existing code
6. **Click "Create repository"**

## Step 2: Enable GitHub Pages

1. **Navigate to your repository settings**
2. **Click "Settings"** (gear icon ⚙️ in the top navigation)
3. **Scroll down** to find the "Pages" section
4. **Under "Source"**, select **"GitHub Actions"** from the dropdown
5. **Click "Save"**

> **Important**: Selecting "GitHub Actions" tells GitHub to use automated deployments instead of deploying from a specific branch.

## Step 3: Create the GitHub Actions Workflow

Create a file at `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Understanding the Workflow

- **Triggers**: Runs on pushes to `main` branch or manual trigger
- **Permissions**: Allows reading content and writing to Pages
- **Build Job**: Packages your files for deployment
- **Deploy Job**: Actually publishes to GitHub Pages

## Step 4: Push Your Code

Commit and push your blog files to the repository:

```bash
# Add all your blog files
git add .

# Commit with a descriptive message
git commit -m "Initial commit: Add blog with GitHub Pages setup"

# Push to GitHub
git push origin main
```

## How the CI/CD Process Works

### Automatic Deployment Flow

1. **Code Push**: You push changes to the `main` branch
2. **Workflow Trigger**: GitHub Actions automatically starts the deployment workflow
3. **Build Process**: Runs on Ubuntu with all your files
4. **Artifact Creation**: Packages files for deployment
5. **Pages Deployment**: Publishes to GitHub Pages infrastructure
6. **Global Distribution**: Content served via GitHub's global CDN

### Deployment Timeline

- **Workflow Start**: 10-30 seconds after push
- **Build Time**: 30-60 seconds
- **Deployment**: 1-2 minutes
- **Global Availability**: Immediate after deployment

## Benefits of This Setup

### 🚀 **Zero-Maintenance Deployments**
- No manual steps required
- Automatic deployments on every push
- Zero downtime during updates

### 🌍 **Global Performance**
- Served from GitHub's global CDN
- Fast loading worldwide
- Automatic compression and optimization

### 🔒 **Security & Reliability**
- Free SSL certificates (HTTPS)
- Automatic security updates
- GitHub's enterprise-grade infrastructure

### 💰 **Cost-Effective**
- Completely free hosting
- Unlimited bandwidth
- No server maintenance costs

## Advanced Configuration

### Environment Variables

Add environment variables in your repository settings:

```yaml
env:
  NODE_ENV: production
  CUSTOM_API_URL: ${{ secrets.API_URL }}
```

### Multiple Deployment Environments

Deploy different branches to different environments:

```yaml
on:
  push:
    branches: [ main, staging ]
  pull_request:
    branches: [ main ]
```

### Manual Deployment Trigger

You can manually trigger the workflow:

1. Go to your repository's **Actions** tab
2. Click on the **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"**
4. Select the branch and click **"Run workflow"**

## Troubleshooting Common Issues

### "Resource not accessible by integration"

**Solution**: Ensure GitHub Pages is enabled in repository settings
1. Go to Settings → Pages
2. Verify "Source" is set to "GitHub Actions"
3. Save the settings

### "Pages site not found"

**Solution**: Wait for the first deployment to complete
1. Check the Actions tab for workflow status
2. Wait 2-3 minutes after enabling Pages
3. Refresh the page

### Build Failures

**Common causes and solutions**:

1. **Missing files**: Ensure all necessary files are committed
2. **Workflow syntax errors**: Check YAML formatting
3. **Permission issues**: Verify workflow permissions are set

### Debug Tips

1. **Check workflow logs** in the Actions tab
2. **Enable debug mode**:
   ```yaml
   - name: Debug
     run: |
       echo "Current directory: $(pwd)"
       ls -la
   ```
3. **Test locally** with `python3 -m http.server 8000`

## Adding a Custom Domain

1. **Purchase a domain** from a registrar (Namecheap, GoDaddy, etc.)
2. **Add a CNAME record** pointing to your GitHub Pages URL
3. **Configure in repository settings**:
   - Go to Settings → Pages
   - Enter your custom domain
   - Click "Save"
4. **Add CNAME file** to your repository root:
   ```
   yourdomain.com
   ```

## SEO and Analytics

### Basic SEO Setup

```html
<!-- Add to your index.html <head> section -->
<meta name="description" content="Your blog description">
<meta name="keywords" content="blog, technology, tutorials">
<meta property="og:title" content="Your Blog Title">
<meta property="og:description" content="Your blog description">
<link rel="canonical" href="https://yourdomain.com/">
```

### Google Analytics

```html
<!-- Add to your index.html before closing </body> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Adding New Blog Posts

### Markdown with Frontmatter

Create new posts in the `posts/` directory:

```markdown
---
title: Your Amazing Blog Post
date: 2025-09-25
excerpt: Brief description that appears in post listings
tags: tag1, tag2, tag3
---

# Your Blog Post Title

Write your content here using Markdown syntax...

## Subheading

- Bullet points
- **Bold text**
- *Italic text*
- \`inline code\`

### Code Blocks

\`\`\`javascript
function hello() {
    console.log('Hello, world!');
}
\`\`\`

### Links and Images

[Link text](https://example.com)
![Alt text](image.jpg)

## Conclusion

Wrap up your post with key takeaways.
```

### Publishing New Posts

```bash
# Create new post
touch posts/my-new-post.md

# Edit with your content
# Add frontmatter and markdown content

# Commit and push
git add posts/my-new-post.md
git commit -m "Add my new amazing post"
git push origin main
```

## Best Practices

### Content Organization

```
your-repo/
├── index.html          # Main blog page
├── app.js             # JavaScript functionality
├── style.css          # Blog styles
├── github-service.js  # GitHub API integration
├── posts/             # Blog posts directory
│   ├── post1.md       # Individual posts
│   ├── post2.md
│   └── ...
└── .github/
    └── workflows/
        └── deploy.yml # CI/CD workflow
```

### Workflow Optimization

- **Use caching** for faster builds:
  ```yaml
  - name: Cache dependencies
    uses: actions/cache@v3
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
  ```

- **Add build steps** if needed:
  ```yaml
  - name: Build site
    run: |
      npm install
      npm run build
  ```

## Conclusion

GitHub Pages with CI/CD provides a powerful, automated blogging platform that:

- **Requires minimal setup** and maintenance
- **Scales automatically** with your content
- **Provides professional hosting** for free
- **Integrates seamlessly** with your development workflow
- **Offers global performance** via CDN

The initial setup takes about 10-15 minutes, but the benefits of automated deployments, global CDN delivery, and zero-maintenance hosting make it worthwhile. Once configured, you can focus entirely on writing great content while GitHub handles the infrastructure.

Ready to share your ideas with the world? Your GitHub Pages blog is waiting! 🚀
