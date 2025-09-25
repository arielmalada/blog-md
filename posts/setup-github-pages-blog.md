---
title: How to Set Up a GitHub Pages Blog with CI/CD
date: 2024-01-25
excerpt: Complete guide to deploying a static blog on GitHub Pages with automatic deployments using GitHub Actions.
tags: github-pages, ci-cd, static-site, deployment, automation
---

# How to Set Up a GitHub Pages Blog with CI/CD

Setting up a blog on GitHub Pages with automatic deployments is easier than you think. In this guide, I'll walk you through the complete process I just implemented for this blog.

## What is GitHub Pages?

GitHub Pages is a free hosting service that allows you to publish static websites directly from your GitHub repositories. It's perfect for:

- Personal blogs
- Project documentation
- Portfolio websites
- Static site generators

## Prerequisites

Before you start, you'll need:

- A GitHub account
- A repository with your static site files
- Basic knowledge of Git

## Step 1: Create Your Repository

1. **Go to GitHub** and click the "+" icon
2. **Select "New repository"**
3. **Choose a name** (e.g., `my-awesome-blog`)
4. **Make it public** (required for free GitHub Pages)
5. **Don't initialize** with README if you have existing code

## Step 2: Enable GitHub Pages

1. **Navigate to your repository settings**
2. **Click "Settings"** (gear icon)
3. **Scroll to "Pages"** section
4. **Under "Source"**, select **"GitHub Actions"**
5. **Click "Save"**

## Step 3: Create the GitHub Actions Workflow

Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

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

## Step 4: Push Your Code

```bash
git add .
git commit -m "Add blog with GitHub Pages setup"
git push origin main
```

## How It Works

### The Workflow Process

1. **Trigger**: Pushes to `main` branch or manual trigger
2. **Build**: GitHub Actions runs on Ubuntu
3. **Upload**: Files are packaged as deployment artifact
4. **Deploy**: GitHub Pages serves your site globally

### Automatic Deployments

Every time you push changes:

- ✅ **GitHub Actions** automatically runs
- ✅ **Builds your site** in seconds
- ✅ **Deploys to production** with zero downtime
- ✅ **Available worldwide** via GitHub's CDN

## Benefits of This Setup

### 🚀 **Automatic Deployments**
No manual steps needed - just push your code!

### 🌍 **Global CDN**
Your blog loads fast everywhere in the world.

### 📱 **Mobile Optimized**
GitHub Pages automatically optimizes for mobile devices.

### 🔒 **Free SSL**
Automatic HTTPS certificate for your domain.

### 🎯 **Custom Domain Ready**
Easy to add your own domain later.

## Advanced Features

### Environment Variables
You can add environment variables in your repository settings:

```yaml
env:
  CUSTOM_VAR: ${{ secrets.CUSTOM_SECRET }}
```

### Multiple Environments
Deploy to different branches for staging/production:

```yaml
on:
  push:
    branches: [ main, staging ]
```

## Troubleshooting

### Common Issues

**"Resource not accessible by integration"**
- Ensure Pages is enabled in repository settings
- Check workflow permissions are set correctly

**"Pages site not found"**
- Wait 1-2 minutes after enabling Pages
- Check the Actions tab for workflow status

**Build failures**
- Verify all files are committed
- Check for syntax errors in workflow file

### Debug Tips

1. **Check Actions tab** for detailed logs
2. **Enable debug logging** in workflow:
   ```yaml
   - name: Debug
     run: echo "Debug information here"
   ```
3. **Test locally** first with `python3 -m http.server 8000`

## Next Steps

### Add a Custom Domain
1. Buy a domain from your registrar
2. Add CNAME record pointing to your Pages URL
3. Configure in repository settings

### Add Analytics
```html
<!-- Add to your index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### SEO Optimization
- Add meta descriptions
- Create sitemap.xml
- Submit to search engines

## Conclusion

GitHub Pages with CI/CD is the perfect setup for developers who want:

- **Zero maintenance** hosting
- **Automatic deployments**
- **Professional presentation**
- **Global performance**

The setup takes about 10 minutes initially, but saves hours of deployment work forever. Your blog will automatically stay updated with every push, and you get enterprise-grade hosting for free!

Ready to share your ideas with the world? 🚀
