/**
 * THE DUPE EDIT — Real-Time Dupe Search
 * 
 * Primary: Live internet search (YouTube, Reddit, TikTok)
 * Secondary: Curated database matches (if available)
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    minSearchLength: 2,
    debounceMs: 150,
    apiEndpoint: '/api/search',
    feedbackEmail: 'hello@thedupeedit.com',
  };

  // ============================================
  // DOM Elements
  // ============================================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  
  const els = {
    searchForm: $('#search-form'),
    searchInput: $('#search-input'),
    searchSection: $('#search-section'),
    resultsSection: $('#results-section'),
    loading: $('#loading'),
    loadingText: $('#loading-text'),
    backButton: $('#back-button'),
    themeToggle: $('#theme-toggle'),
    autocomplete: $('#autocomplete-list'),
    originalName: $('#original-name'),
    originalBrand: $('#original-brand'),
    originalPrice: $('#original-price'),
    originalDesc: $('#original-description'),
    originalImage: $('#original-product-image'),
    originalContent: $('#original-content'),
    dupesList: $('#dupes-list'),
    dupesCount: $('#dupes-count'),
    noResults: $('#no-results'),
    chips: $$('.suggestion-chip'),
  };

  let debounceTimer = null;

  // ============================================
  // Theme
  // ============================================
  function initTheme() {
    const stored = localStorage.getItem('dupe-theme');
    const theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dupe-theme', next);
  }

  // ============================================
  // API
  // ============================================
  async function fetchLiveData(query) {
    try {
      const res = await fetch(CONFIG.apiEndpoint + '?q=' + encodeURIComponent(query));
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('[API]', e.message);
    }
    return null;
  }

  // ============================================
  // Local Database (Optional Enhancement)
  // ============================================
  function searchDatabase(query) {
    if (!window.DUPE_DATABASE || query.length < CONFIG.minSearchLength) return null;
    
    const q = query.toLowerCase().trim();
    
    for (const product of window.DUPE_DATABASE.products) {
      // Exact or close match on name/brand/aliases
      const targets = [
        product.name.toLowerCase(),
        product.brand.toLowerCase(),
        (product.brand + ' ' + product.name).toLowerCase(),
        ...(product.aliases || []).map(a => a.toLowerCase())
      ];
      
      for (const t of targets) {
        if (t === q || t.includes(q) || q.includes(t)) {
          return product;
        }
      }
    }
    return null;
  }

  // ============================================
  // Rendering Helpers
  // ============================================
  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatViews(num) {
    if (!num) return '';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M views';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K views';
    return num + ' views';
  }

  function formatDuration(seconds) {
    if (!seconds) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function showLoading(msg) {
    els.loading.classList.remove('hidden');
    els.loadingText.textContent = msg || 'Searching the web for dupes...';
  }

  function hideLoading() {
    els.loading.classList.add('hidden');
  }

  function showSearch() {
    els.searchSection.classList.remove('hidden');
    els.resultsSection.classList.add('hidden');
    els.searchInput.focus();
    history.pushState({}, '', window.location.pathname);
  }

  function showResults() {
    els.searchSection.classList.add('hidden');
    els.resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================
  // Render YouTube Results
  // ============================================
  function renderYouTubeCard(video) {
    const card = document.createElement('article');
    card.className = 'dupe-card youtube-card';
    
    card.innerHTML = `
      <a href="${escapeHTML(video.url)}" target="_blank" rel="noopener" class="youtube-link">
        <div class="youtube-thumbnail">
          ${video.thumbnail ? `<img src="${escapeHTML(video.thumbnail)}" alt="${escapeHTML(video.title)}" loading="lazy">` : ''}
          ${video.duration ? `<span class="youtube-duration">${formatDuration(video.duration)}</span>` : ''}
        </div>
        <div class="youtube-info">
          <span class="platform-badge youtube-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.4 3.5-6.4 3.5z"/></svg>
            YouTube
          </span>
          <h4 class="youtube-title">${escapeHTML(video.title)}</h4>
          <p class="youtube-meta">${escapeHTML(video.author)} ${video.views ? '• ' + formatViews(video.views) : ''}</p>
        </div>
      </a>
    `;
    
    return card;
  }

  // ============================================
  // Render Reddit Results
  // ============================================
  function renderRedditCard(post) {
    const card = document.createElement('article');
    card.className = 'dupe-card reddit-card';
    
    card.innerHTML = `
      <a href="${escapeHTML(post.url)}" target="_blank" rel="noopener" class="reddit-link">
        <div class="reddit-info">
          <span class="platform-badge reddit-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.8 1.76 1.76 0 .72-.43 1.33-1.01 1.61a3.11 3.11 0 0 1 .04.52c0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18 0-.36.04-.53A1.75 1.75 0 0 1 4.03 12a1.76 1.76 0 0 1 2.96-1.28 8.35 8.35 0 0 1 4.68-1.49l.9-4.17.02-.03a.42.42 0 0 1 .48-.33l2.89.62a1.25 1.25 0 0 1 1.05-.58zM9.25 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-5.47 3.99a.33.33 0 0 0-.23.1.33.33 0 0 0 0 .47c.58.58 1.42.87 2.96.87s2.38-.29 2.96-.87a.33.33 0 0 0-.46-.47c-.44.44-1.13.67-2.5.67-1.38 0-2.06-.23-2.5-.67a.33.33 0 0 0-.23-.1z"/></svg>
            r/${escapeHTML(post.subreddit)}
          </span>
          <h4 class="reddit-title">${escapeHTML(post.title)}</h4>
          <p class="reddit-meta">${post.score} upvotes • ${post.comments} comments</p>
        </div>
      </a>
    `;
    
    return card;
  }

  // ============================================
  // Render Curated Dupe (from local database)
  // ============================================
  function renderCuratedDupe(dupe) {
    const card = document.createElement('article');
    card.className = 'dupe-card curated-card';
    
    const matchLabel = dupe.matchScore >= 85 ? 'Very Close Match' : dupe.matchScore >= 70 ? 'Good Match' : 'Similar Vibe';
    const matchClass = dupe.matchScore >= 85 ? 'high' : dupe.matchScore >= 70 ? 'medium' : 'low';
    
    let retailersHTML = '';
    if (dupe.retailers && dupe.retailers.length) {
      retailersHTML = '<div class="dupe-retailers"><p class="dupe-retailers-label">Shop:</p><div class="dupe-retailers-list">';
      dupe.retailers.forEach(r => {
        retailersHTML += `<a href="${escapeHTML(r.url)}" class="dupe-retailer-link" target="_blank" rel="noopener">${escapeHTML(r.name)}</a>`;
      });
      retailersHTML += '</div></div>';
    }
    
    card.innerHTML = `
      <div class="curated-header">
        <span class="platform-badge curated-badge">✓ Curated Pick</span>
        <span class="match-score ${matchClass}">${matchLabel}</span>
      </div>
      <div class="curated-content">
        ${dupe.image ? `<img src="${escapeHTML(dupe.image)}" alt="${escapeHTML(dupe.name)}" class="curated-image" loading="lazy">` : ''}
        <div class="curated-info">
          <h4 class="curated-name">${escapeHTML(dupe.name)}</h4>
          <p class="curated-brand">${escapeHTML(dupe.brand)}</p>
          <p class="curated-price">${escapeHTML(dupe.priceRange || 'Price varies')}</p>
          <p class="curated-reason">${escapeHTML(dupe.reason)}</p>
          ${retailersHTML}
        </div>
      </div>
    `;
    
    return card;
  }

  // ============================================
  // Main Render Function
  // ============================================
  function renderResults(query, liveData, curatedProduct) {
    els.dupesList.innerHTML = '';
    els.noResults.classList.add('hidden');
    els.originalContent.innerHTML = '';
    
    // Set search query as the "product"
    els.originalName.textContent = query;
    els.originalBrand.textContent = '';
    els.originalPrice.textContent = '';
    els.originalImage.innerHTML = '';
    
    // If we have a curated match, show its details
    if (curatedProduct) {
      els.originalName.textContent = curatedProduct.name;
      els.originalBrand.textContent = curatedProduct.brand;
      els.originalPrice.textContent = curatedProduct.price ? 'Retail: ' + curatedProduct.price : '';
      els.originalDesc.textContent = curatedProduct.description || '';
      if (curatedProduct.image) {
        els.originalImage.innerHTML = `<img src="${escapeHTML(curatedProduct.image)}" alt="${escapeHTML(curatedProduct.name)}" loading="lazy">`;
      }
    } else {
      els.originalDesc.textContent = 'Showing live results from across the web';
    }
    
    let hasResults = false;
    let resultCount = 0;
    
    // Render curated dupes first (if available)
    if (curatedProduct && curatedProduct.dupes && curatedProduct.dupes.length) {
      const curatedSection = document.createElement('div');
      curatedSection.className = 'results-section-group';
      curatedSection.innerHTML = '<h4 class="results-section-title">✨ Our Curated Picks</h4>';
      
      curatedProduct.dupes.forEach(dupe => {
        curatedSection.appendChild(renderCuratedDupe(dupe));
        resultCount++;
      });
      
      els.dupesList.appendChild(curatedSection);
      hasResults = true;
    }
    
    // Render YouTube results
    if (liveData && liveData.sources && liveData.sources.youtube && liveData.sources.youtube.results.length) {
      const ytSection = document.createElement('div');
      ytSection.className = 'results-section-group';
      ytSection.innerHTML = '<h4 class="results-section-title">📺 YouTube Reviews</h4>';
      
      liveData.sources.youtube.results.forEach(video => {
        ytSection.appendChild(renderYouTubeCard(video));
        resultCount++;
      });
      
      els.dupesList.appendChild(ytSection);
      hasResults = true;
    }
    
    // Render Reddit results
    if (liveData && liveData.sources && liveData.sources.reddit && liveData.sources.reddit.results.length) {
      const redditSection = document.createElement('div');
      redditSection.className = 'results-section-group';
      redditSection.innerHTML = '<h4 class="results-section-title">💬 Reddit Discussions</h4>';
      
      liveData.sources.reddit.results.forEach(post => {
        redditSection.appendChild(renderRedditCard(post));
        resultCount++;
      });
      
      els.dupesList.appendChild(redditSection);
      hasResults = true;
    }
    
    // TikTok search link (always show)
    if (liveData && liveData.sources && liveData.sources.tiktok && liveData.sources.tiktok.info) {
      const tiktokSection = document.createElement('div');
      tiktokSection.className = 'results-section-group';
      tiktokSection.innerHTML = `
        <h4 class="results-section-title">🎵 TikTok</h4>
        <a href="${escapeHTML(liveData.sources.tiktok.info.searchUrl)}" target="_blank" rel="noopener" class="tiktok-search-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          Search TikTok for "${escapeHTML(query)} dupe"
        </a>
        <div class="tiktok-hashtags">
          ${liveData.sources.tiktok.info.hashtags.map(h => `<span class="tiktok-hashtag">${escapeHTML(h)}</span>`).join('')}
        </div>
      `;
      els.dupesList.appendChild(tiktokSection);
      hasResults = true;
    }
    
    // Google suggestions for related searches
    if (liveData && liveData.sources && liveData.sources.suggestions && liveData.sources.suggestions.results.length) {
      const suggestSection = document.createElement('div');
      suggestSection.className = 'results-section-group suggestions-group';
      suggestSection.innerHTML = `
        <h4 class="results-section-title">🔍 Related Searches</h4>
        <div class="related-searches">
          ${liveData.sources.suggestions.results.slice(0, 6).map(s => 
            `<button class="suggestion-chip live-chip" data-query="${escapeHTML(s)}">${escapeHTML(s)}</button>`
          ).join('')}
        </div>
      `;
      els.dupesList.appendChild(suggestSection);
    }
    
    // Update count
    els.dupesCount.textContent = hasResults ? `${resultCount} result${resultCount !== 1 ? 's' : ''} found` : '';
    
    // Show no results message if nothing found
    if (!hasResults) {
      els.noResults.classList.remove('hidden');
    }
    
    showResults();
  }

  // ============================================
  // Event Handlers
  // ============================================
  async function handleSearch(e) {
    e.preventDefault();
    
    const query = els.searchInput.value.trim();
    if (query.length < CONFIG.minSearchLength) return;
    
    showLoading('Searching the web for "' + query + '" dupes...');
    
    // Search local database (bonus) and fetch live data (primary) in parallel
    const curatedProduct = searchDatabase(query);
    const liveData = await fetchLiveData(query);
    
    hideLoading();
    renderResults(query, liveData, curatedProduct);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    history.pushState({}, '', url);
  }

  function handleInput() {
    clearTimeout(debounceTimer);
    // No autocomplete for now - just let them search
  }

  function handleChipClick(e) {
    const query = e.target.dataset.query;
    if (query) {
      els.searchInput.value = query;
      els.searchForm.dispatchEvent(new Event('submit'));
    }
  }

  // ============================================
  // Initialize
  // ============================================
  function init() {
    initTheme();
    
    // Event listeners
    els.searchForm.addEventListener('submit', handleSearch);
    els.searchInput.addEventListener('input', handleInput);
    els.backButton.addEventListener('click', showSearch);
    els.themeToggle.addEventListener('click', toggleTheme);
    
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('suggestion-chip') || e.target.classList.contains('live-chip')) {
        handleChipClick(e);
      }
    });
    
    els.chips.forEach(chip => chip.addEventListener('click', handleChipClick));
    
    // Handle URL query on load
    const urlQuery = new URL(window.location).searchParams.get('q');
    if (urlQuery) {
      els.searchInput.value = urlQuery;
      handleSearch(new Event('submit'));
    }
    
    window.addEventListener('popstate', function() {
      const q = new URL(window.location).searchParams.get('q');
      if (q) {
        els.searchInput.value = q;
        handleSearch(new Event('submit'));
      } else {
        showSearch();
      }
    });
    
    els.searchInput.focus();
    console.log('Dupe Edit loaded. Real-time web search enabled.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
