// Blog Application JavaScript

// GitHub service is now initialized in github-service.js and available as window.githubService

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
    card.addEventListener('click', (e) => {
      showPost(postId);
    });

    // Keyboard handler
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showPost(postId);
      }
    });

    // Make sure the card is clickable
    card.style.cursor = 'pointer';
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
    try {
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        sanitize: false
      });

      // Parse markdown content first
      let htmlContent = marked.parse(post.content);

      // Post-process HTML to replace emoji shortcodes with Unicode emojis
      htmlContent = htmlContent
        .replace(/:white_check_mark:/g, '✅')
        .replace(/:rocket:/g, '🚀')
        .replace(/:heavy_check_mark:/g, '✔️')
        .replace(/:x:/g, '❌')
        .replace(/:star:/g, '⭐')
        .replace(/:arrow_right:/g, '➡️')
        .replace(/:gear:/g, '⚙️')
        .replace(/:book:/g, '📚')
        .replace(/:computer:/g, '💻')
        .replace(/:chart_with_upwards_trend:/g, '📈')
        .replace(/:link:/g, '🔗')
        .replace(/:warning:/g, '⚠️')
        .replace(/:information_source:/g, 'ℹ️')
        .replace(/:bulb:/g, '💡')
        .replace(/:memo:/g, '📝')
        .replace(/:package:/g, '📦')
        .replace(/:zap:/g, '⚡')
        .replace(/:tada:/g, '🎉')
        .replace(/:100:/g, '💯')
        .replace(/:thumbsup:/g, '👍')
        .replace(/:thumbsdown:/g, '👎')
        .replace(/:point_right:/g, '👉')
        .replace(/:point_left:/g, '👈');

      postContent.innerHTML = htmlContent;
    } catch (error) {
      console.error('Error rendering markdown:', error);
      // Fallback to plain text if markdown parsing fails
      postContent.innerHTML = `<pre>${post.content}</pre>`;
    }
  } else {
    console.warn('Marked.js not loaded, using fallback rendering');
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
async function initializeApp() {
  try {
    // Show loading state
    postsGrid.innerHTML = `
      <div class="loading-state">
        <h3>Loading posts...</h3>
        <p>Fetching latest content from GitHub</p>
      </div>
    `;

    // Load posts from GitHub
    allPosts = await githubService.getPosts();
    filteredPosts = [...allPosts];

    // Show rate limit info in console (for debugging)
    const rateLimit = githubService.getRateLimitStatus();
    console.log(`GitHub API Rate Limit: ${rateLimit.remaining} requests remaining, resets in ${rateLimit.resetInMinutes} minutes`);

    // Set up event listeners
    setupEventListeners();

  } catch (error) {
    console.error('Error initializing app:', error);
    postsGrid.innerHTML = `
      <div class="error-state">
        <h3>Unable to load posts</h3>
        <p>There was an error fetching content from GitHub. Loading local files as fallback...</p>
        <p><small>Error: ${error.message}</small></p>
        <p><small>Note: This blog works with both public and private repositories.</small></p>
      </div>
    `;

    // Give a moment for the user to see the message, then retry
    setTimeout(async () => {
      try {
        allPosts = await githubService.getPostsFromLocalFiles();
        filteredPosts = [...allPosts];
        renderPosts(filteredPosts);
        console.log('Successfully loaded from local files');
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        postsGrid.innerHTML = `
          <div class="error-state">
            <h3>Unable to load posts</h3>
            <p>Both GitHub API and local files failed. Please check your setup.</p>
            <p><small>GitHub Error: ${error.message}</small></p>
            <p><small>Local Error: ${fallbackError.message}</small></p>
          </div>
        `;
      }
    }, 2000);

    return;
  }
  
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

// Debug: Check if githubService is available
window.addEventListener('load', () => {
  console.log('GitHub Service loaded:', typeof window.githubService);
  console.log('GitHub Service instance:', window.githubService ? 'Available' : 'Not available');
});

// Error handling for marked.js loading
window.addEventListener('error', (e) => {
  if (e.filename && e.filename.includes('marked')) {
    console.warn('Marked.js failed to load. Using fallback rendering.');
  }
});