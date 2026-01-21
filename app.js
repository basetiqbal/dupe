/**
 * THE DUPE EDIT — Application Logic
 * 
 * Architecture Notes:
 * - MVP uses client-side search against a local JSON dataset
 * - Designed for easy migration to API-based search later
 * - Search uses fuzzy matching for better UX
 * - All UI state is managed via simple DOM manipulation
 * - Dark mode support with system preference detection
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    minSearchLength: 2,
    searchDebounceMs: 150,
    autocompleteDebounceMs: 100,
    loadingDelayMs: 400, // Minimum loading time for perceived performance
    themeStorageKey: 'dupe-theme',
    maxAutocompleteResults: 6,
    feedbackEmail: 'hello@thedupeedit.com',
    imagePlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNGNUYwRTgiLz48cGF0aCBkPSJNMzIgNDhMMzYgNDRMNDAgNDhMNDggMzZMNTYgNDgiIHN0cm9rZT0iI0M0QTY3QSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjMyIiByPSI0IiBmaWxsPSIjQzRBNjdBIi8+PC9zdmc+',
    // API endpoint - uses relative path for Vercel, absolute for development
    apiEndpoint: '/api/search',
    apiTimeout: 8000, // 8 second timeout for API calls
    useRealTimeApi: true, // Toggle to enable/disable real API calls
  };
  
  // Store for real-time API data
  let liveSearchData = null;

  // ============================================
  // DOM Elements
  // ============================================
  const elements = {
    searchForm: document.getElementById('search-form'),
    searchInput: document.getElementById('search-input'),
    searchSection: document.getElementById('search-section'),
    resultsSection: document.getElementById('results-section'),
    loading: document.getElementById('loading'),
    backButton: document.getElementById('back-button'),
    themeToggle: document.getElementById('theme-toggle'),
    autocompleteList: document.getElementById('autocomplete-list'),
    
    // Original product display
    originalName: document.getElementById('original-name'),
    originalBrand: document.getElementById('original-brand'),
    originalPrice: document.getElementById('original-price'),
    originalDescription: document.getElementById('original-description'),
    originalProductImage: document.getElementById('original-product-image'),
    
    // Results
    dupesList: document.getElementById('dupes-list'),
    dupesCount: document.getElementById('dupes-count'),
    noResults: document.getElementById('no-results'),
    
    // Suggestions
    suggestionChips: document.querySelectorAll('.suggestion-chip'),
  };
  
  // State
  let activeAutocompleteIndex = -1;
  let autocompleteDebounceTimer = null;

  // ============================================
  // Real-Time API Integration
  // ============================================
  
  /**
   * Fetch live data from the search API
   * Returns real-time results from YouTube, Reddit, etc.
   */
  async function fetchLiveSearchData(query) {
    if (!CONFIG.useRealTimeApi) {
      return null;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.apiTimeout);
      
      const response = await fetch(`${CONFIG.apiEndpoint}?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.warn('[API] Response not OK:', response.status);
        return null;
      }
      
      const data = await response.json();
      console.log('[API] Live data received:', data);
      return data;
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('[API] Request timed out');
      } else {
        console.warn('[API] Fetch error:', error.message);
      }
      return null;
    }
  }
  
  /**
   * Merge live API data with static product data
   */
  function mergeWithLiveData(product, liveData) {
    if (!liveData || !product) return product;
    
    const merged = { ...product };
    
    // Add live YouTube videos
    if (liveData.sources?.youtube?.results?.length > 0) {
      merged.liveVideos = liveData.sources.youtube.results.map(v => ({
        platform: 'youtube',
        videoId: v.videoId,
        title: v.title,
        author: v.author,
        views: v.views,
        thumbnail: v.thumbnail,
        url: v.url,
        isLive: true,
      }));
    }
    
    // Add live Reddit discussions
    if (liveData.sources?.reddit?.results?.length > 0) {
      merged.liveReddit = liveData.sources.reddit.results;
    }
    
    // Add TikTok search info
    if (liveData.sources?.tiktok?.info) {
      merged.liveTikTok = liveData.sources.tiktok.info;
    }
    
    // Add suggestions for related searches
    if (liveData.sources?.suggestions?.results?.length > 0) {
      merged.liveSuggestions = liveData.sources.suggestions.results;
    }
    
    return merged;
  }

  // ============================================
  // Theme Management
  // ============================================
  
  /**
   * Get the user's preferred theme
   */
  function getPreferredTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(CONFIG.themeStorageKey);
    if (stored) {
      return stored;
    }
    
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }

  /**
   * Apply a theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(CONFIG.themeStorageKey, theme);
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }

  /**
   * Initialize theme based on preference
   */
  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(CONFIG.themeStorageKey)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  // ============================================
  // Search Engine
  // ============================================
  
  /**
   * Normalize text for comparison
   * Removes accents, lowercases, and strips special characters
   */
  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s]/g, ' ')    // Replace special chars with space
      .replace(/\s+/g, ' ')             // Collapse multiple spaces
      .trim();
  }

  /**
   * Calculate similarity score between two strings
   * Uses a combination of techniques for fuzzy matching
   */
  function calculateSimilarity(query, target) {
    const normalizedQuery = normalizeText(query);
    const normalizedTarget = normalizeText(target);
    
    // Exact match
    if (normalizedTarget === normalizedQuery) {
      return 1.0;
    }
    
    // Contains exact query
    if (normalizedTarget.includes(normalizedQuery)) {
      return 0.9;
    }
    
    // Word-based matching
    const queryWords = normalizedQuery.split(' ').filter(w => w.length > 1);
    const targetWords = normalizedTarget.split(' ');
    
    let matchedWords = 0;
    let partialMatches = 0;
    
    for (const qWord of queryWords) {
      for (const tWord of targetWords) {
        if (tWord === qWord) {
          matchedWords++;
          break;
        } else if (tWord.includes(qWord) || qWord.includes(tWord)) {
          partialMatches += 0.5;
          break;
        }
      }
    }
    
    const wordScore = (matchedWords + partialMatches) / queryWords.length;
    return Math.min(wordScore, 0.85);
  }

  /**
   * Search the dupe database for matches
   * Returns the best matching product with its dupes
   */
  function searchDupes(query) {
    if (!window.DUPE_DATABASE || !query || query.length < CONFIG.minSearchLength) {
      return null;
    }

    const products = window.DUPE_DATABASE.products;
    let bestMatch = null;
    let bestScore = 0;

    for (const product of products) {
      // Check product name
      const nameScore = calculateSimilarity(query, product.name);
      
      // Check brand
      const brandScore = calculateSimilarity(query, product.brand) * 0.7;
      
      // Check combined name + brand
      const combinedScore = calculateSimilarity(query, `${product.brand} ${product.name}`);
      
      // Check aliases/alternate names
      let aliasScore = 0;
      if (product.aliases) {
        for (const alias of product.aliases) {
          const score = calculateSimilarity(query, alias);
          aliasScore = Math.max(aliasScore, score);
        }
      }
      
      // Check category
      const categoryScore = calculateSimilarity(query, product.category) * 0.4;
      
      // Take the best score
      const score = Math.max(nameScore, brandScore, combinedScore, aliasScore, categoryScore);
      
      if (score > bestScore && score >= 0.4) {
        bestScore = score;
        bestMatch = product;
      }
    }

    return bestMatch;
  }

  /**
   * Get autocomplete suggestions based on partial query
   * Returns array of matching products sorted by relevance
   */
  function getAutocompleteSuggestions(query) {
    if (!window.DUPE_DATABASE || !query || query.length < CONFIG.minSearchLength) {
      return [];
    }

    const products = window.DUPE_DATABASE.products;
    const results = [];

    for (const product of products) {
      const nameScore = calculateSimilarity(query, product.name);
      const brandScore = calculateSimilarity(query, product.brand) * 0.8;
      const combinedScore = calculateSimilarity(query, `${product.brand} ${product.name}`);
      
      let aliasScore = 0;
      if (product.aliases) {
        for (const alias of product.aliases) {
          aliasScore = Math.max(aliasScore, calculateSimilarity(query, alias));
        }
      }
      
      const score = Math.max(nameScore, brandScore, combinedScore, aliasScore);
      
      if (score >= 0.3) {
        results.push({ product, score });
      }
    }

    // Sort by score descending and limit results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, CONFIG.maxAutocompleteResults)
      .map(r => r.product);
  }

  // ============================================
  // UI Rendering
  // ============================================

  /**
   * Source search configuration for real-time search
   */
  const SOURCES = [
    { id: 'database', name: 'Our curated database', delay: 200 },
    { id: 'youtube', name: 'YouTube reviews', delay: 400 },
    { id: 'tiktok', name: 'TikTok trends', delay: 300 },
    { id: 'reddit', name: 'Reddit community', delay: 350 },
    { id: 'prices', name: 'Price comparison', delay: 250 },
  ];

  /**
   * Show loading state with animated source search
   */
  function showLoading() {
    elements.loading.classList.remove('hidden');
    
    // Reset all source items
    const sourceItems = document.querySelectorAll('.source-item');
    sourceItems.forEach(item => {
      item.classList.remove('searching', 'complete', 'found');
    });
  }

  /**
   * Animate source search progress with real API integration
   * Now actually waits for live data from the API
   */
  async function animateSourceSearch(query, product) {
    const loadingText = document.getElementById('loading-text');
    
    // Start database search animation immediately (this is instant/static)
    const dbItem = document.querySelector('.source-item[data-source="database"]');
    if (dbItem) {
      dbItem.classList.add('searching');
      loadingText.textContent = 'Checking our curated database...';
      await new Promise(resolve => setTimeout(resolve, 200));
      dbItem.classList.remove('searching');
      dbItem.classList.add(product ? 'found' : 'complete');
    }
    
    // Now fetch live data from API in parallel with animation
    let liveData = null;
    
    if (CONFIG.useRealTimeApi) {
      // Start API fetch
      const apiPromise = fetchLiveSearchData(query);
      
      // Animate YouTube search
      const ytItem = document.querySelector('.source-item[data-source="youtube"]');
      if (ytItem) {
        ytItem.classList.add('searching');
        loadingText.textContent = 'Searching YouTube reviews...';
      }
      
      // Animate TikTok search
      await new Promise(resolve => setTimeout(resolve, 300));
      const ttItem = document.querySelector('.source-item[data-source="tiktok"]');
      if (ttItem) {
        ttItem.classList.add('searching');
        loadingText.textContent = 'Scanning TikTok trends...';
      }
      
      // Animate Reddit search
      await new Promise(resolve => setTimeout(resolve, 200));
      const redditItem = document.querySelector('.source-item[data-source="reddit"]');
      if (redditItem) {
        redditItem.classList.add('searching');
        loadingText.textContent = 'Checking Reddit community...';
      }
      
      // Wait for API response
      loadingText.textContent = 'Gathering results...';
      liveData = await apiPromise;
      
      // Update YouTube status
      if (ytItem) {
        ytItem.classList.remove('searching');
        ytItem.classList.add(liveData?.sources?.youtube?.found ? 'found' : 'complete');
      }
      
      // Update TikTok status  
      if (ttItem) {
        ttItem.classList.remove('searching');
        ttItem.classList.add(liveData?.sources?.tiktok?.found ? 'found' : 'complete');
      }
      
      // Update Reddit status
      if (redditItem) {
        redditItem.classList.remove('searching');
        redditItem.classList.add(liveData?.sources?.reddit?.found ? 'found' : 'complete');
      }
    } else {
      // Fallback: animate sources based on static data (original behavior)
      const foundSources = {
        youtube: product?.videos?.length > 0,
        tiktok: product?.social?.tiktok,
        reddit: product?.social?.reddit?.length > 0,
      };
      
      for (const sourceId of ['youtube', 'tiktok', 'reddit']) {
        const item = document.querySelector(`.source-item[data-source="${sourceId}"]`);
        if (item) {
          item.classList.add('searching');
          loadingText.textContent = `Checking ${sourceId}...`;
          await new Promise(resolve => setTimeout(resolve, 300));
          item.classList.remove('searching');
          item.classList.add(foundSources[sourceId] ? 'found' : 'complete');
        }
      }
    }
    
    // Price comparison (based on whether we have dupes)
    const priceItem = document.querySelector('.source-item[data-source="prices"]');
    if (priceItem) {
      priceItem.classList.add('searching');
      loadingText.textContent = 'Comparing prices...';
      await new Promise(resolve => setTimeout(resolve, 200));
      priceItem.classList.remove('searching');
      priceItem.classList.add(product?.dupes?.length > 0 ? 'found' : 'complete');
    }
    
    // Final message
    loadingText.textContent = product 
      ? 'Compiling your edit...' 
      : 'Wrapping up...';
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Return the live data so we can merge it
    return liveData;
  }

  /**
   * Hide loading state
   */
  function hideLoading() {
    elements.loading.classList.add('hidden');
  }

  /**
   * Switch to search view
   */
  function showSearchView() {
    elements.searchSection.classList.remove('hidden');
    elements.resultsSection.classList.add('hidden');
    elements.searchInput.focus();
    
    // Update URL
    history.pushState({}, '', window.location.pathname);
  }

  /**
   * Switch to results view
   */
  function showResultsView() {
    elements.searchSection.classList.add('hidden');
    elements.resultsSection.classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Get match level label based on score
   */
  function getMatchLevel(score) {
    if (score >= 85) return { level: 'high', label: 'Very Close Match' };
    if (score >= 70) return { level: 'medium', label: 'Good Match' };
    return { level: 'low', label: 'Similar Vibe' };
  }

  /**
   * Parse price string to get numeric value (extracts highest number from range)
   * Returns null if price cannot be parsed
   */
  function parsePrice(priceStr) {
    if (!priceStr || typeof priceStr !== 'string') return null;
    
    // Extract all numbers (handles $40-$65, $325 (2.4 oz), etc.)
    const numbers = priceStr.match(/\$?([\d,]+(?:\.\d{2})?)/g);
    if (!numbers || numbers.length === 0) return null;
    
    // Get the highest price (for ranges, use upper bound)
    const prices = numbers.map(n => parseFloat(n.replace(/[$,]/g, '')));
    return Math.max(...prices);
  }

  /**
   * Validate dupe price against original price
   * Returns object with isValid, shouldFlag, and message
   */
  function validateDupePrice(dupePrice, originalPrice) {
    const dupeParsed = parsePrice(dupePrice);
    const originalParsed = parsePrice(originalPrice);
    
    // If we can't parse either price, flag for review
    if (dupeParsed === null || originalParsed === null) {
      return { isValid: true, shouldFlag: true, message: 'Price unavailable' };
    }
    
    // Dupe should never exceed original
    if (dupeParsed > originalParsed) {
      return { isValid: false, shouldFlag: true, message: 'Price exceeds original' };
    }
    
    return { isValid: true, shouldFlag: false, message: null };
  }

  /**
   * Create image element with lazy loading, skeleton loader, and graceful fallback
   */
  function createImageElement(src, alt, className = '') {
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper loading';
    
    const img = document.createElement('img');
    img.alt = alt;
    img.loading = 'lazy';
    img.className = className;
    img.setAttribute('crossorigin', 'anonymous');
    
    if (src) {
      img.src = src;
      
      img.onload = function() {
        wrapper.classList.remove('loading');
        wrapper.classList.add('loaded');
      };
      
      img.onerror = function() {
        // Try without crossorigin first (some CDNs don't support CORS)
        if (this.hasAttribute('crossorigin')) {
          this.removeAttribute('crossorigin');
          this.src = src;
          return;
        }
        this.src = CONFIG.imagePlaceholder;
        wrapper.classList.remove('loading');
        wrapper.classList.add('no-image');
      };
    } else {
      img.src = CONFIG.imagePlaceholder;
      wrapper.classList.remove('loading');
      wrapper.classList.add('no-image');
    }
    
    wrapper.appendChild(img);
    return wrapper;
  }

  /**
   * Render retailer links for a dupe
   */
  function renderRetailerLinks(retailers) {
    if (!retailers || retailers.length === 0) return '';
    
    const linksHTML = retailers.map(retailer => `
      <a href="${escapeHTML(retailer.url)}" 
         class="dupe-retailer-link" 
         target="_blank" 
         rel="noopener noreferrer"
         title="Shop at ${escapeHTML(retailer.name)}">
        ${escapeHTML(retailer.name)}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    `).join('');
    
    return `
      <div class="dupe-retailers">
        <p class="dupe-retailers-label">Available at</p>
        <div class="dupe-retailers-list">${linksHTML}</div>
      </div>
    `;
  }

  /**
   * Render video links/embeds for a product
   */
  function renderVideoSection(videos, productName) {
    if (!videos || videos.length === 0) return '';
    
    const videoItems = videos.map(video => {
      const platformIcons = {
        youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
        tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
        instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1"/></svg>`
      };
      
      const icon = platformIcons[video.platform] || platformIcons.youtube;
      const url = video.platform === 'youtube' 
        ? `https://youtube.com/watch?v=${video.videoId}`
        : video.url || '#';
      
      return `
        <a href="${escapeHTML(url)}" 
           class="video-link" 
           target="_blank" 
           rel="noopener noreferrer"
           data-video-id="${escapeHTML(video.videoId || '')}"
           data-platform="${escapeHTML(video.platform)}">
          <span class="video-icon">${icon}</span>
          <span class="video-info">
            <span class="video-title">${escapeHTML(video.title || 'Watch Review')}</span>
            ${video.author ? `<span class="video-author">${escapeHTML(video.author)}</span>` : ''}
          </span>
        </a>
      `;
    }).join('');
    
    return `
      <div class="video-section">
        <p class="video-section-label">Watch Reviews</p>
        <div class="video-list">${videoItems}</div>
      </div>
    `;
  }

  /**
   * Render social media links (TikTok hashtags, Reddit threads)
   */
  function renderSocialLinks(social, productName) {
    if (!social) return '';
    
    const links = [];
    
    // TikTok search
    if (social.tiktok?.searchUrl) {
      links.push(`
        <a href="${escapeHTML(social.tiktok.searchUrl)}" 
           class="social-link social-tiktok" 
           target="_blank" 
           rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          TikTok Reviews
        </a>
      `);
    }
    
    // Reddit threads
    if (social.reddit?.length > 0) {
      links.push(`
        <a href="${escapeHTML(social.reddit[0].url)}" 
           class="social-link social-reddit" 
           target="_blank" 
           rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
          Reddit Discussion
        </a>
      `);
    }
    
    if (links.length === 0) return '';
    
    return `
      <div class="social-links">
        <p class="social-links-label">Community Reviews</p>
        <div class="social-links-list">${links.join('')}</div>
      </div>
    `;
  }

  /**
   * Render a single dupe card
   */
  function renderDupeCard(dupe, originalPrice = null) {
    const matchInfo = getMatchLevel(dupe.matchScore || 75);
    
    // Validate price against original
    const priceValidation = originalPrice 
      ? validateDupePrice(dupe.priceRange, originalPrice)
      : { isValid: true, shouldFlag: false };
    
    const card = document.createElement('article');
    card.className = 'dupe-card';
    
    // Add flag class if price is invalid or should be flagged
    if (!priceValidation.isValid) {
      card.classList.add('price-flagged');
    }
    
    let differencesHTML = '';
    if (dupe.differences) {
      differencesHTML = `
        <div class="dupe-differences">
          <p class="dupe-differences-label">Key Differences</p>
          <p class="dupe-differences-text">${escapeHTML(dupe.differences)}</p>
        </div>
      `;
    }
    
    const tagsHTML = dupe.bestFor
      ? dupe.bestFor.map(tag => `<span class="dupe-tag">${escapeHTML(tag)}</span>`).join('')
      : '';
    
    const retailerLinksHTML = renderRetailerLinks(dupe.retailers);
    
    // Build price display with validation flag
    let priceHTML = '';
    if (!priceValidation.isValid) {
      // Don't show price if it exceeds original (data error)
      priceHTML = `<p class="dupe-price dupe-price-flagged" title="${escapeHTML(priceValidation.message)}">
        <span class="price-flag-icon">⚠</span> Price unavailable
      </p>`;
    } else if (priceValidation.shouldFlag) {
      // Show price but with subtle flag
      priceHTML = `<p class="dupe-price" title="Price may vary">${escapeHTML(dupe.priceRange || 'Price varies')}</p>`;
    } else {
      priceHTML = `<p class="dupe-price">${escapeHTML(dupe.priceRange)}</p>`;
    }
    
    // Image with enhanced error handling
    const imageHTML = dupe.image 
      ? `<img src="${escapeHTML(dupe.image)}" alt="${escapeHTML(dupe.name)}" loading="lazy" crossorigin="anonymous" onerror="this.removeAttribute('crossorigin'); if(this.src !== '${CONFIG.imagePlaceholder}') { this.src='${CONFIG.imagePlaceholder}'; this.parentElement.classList.add('no-image'); }">`
      : `<div class="image-placeholder-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;
    
    // Video links for this dupe
    const videoLinksHTML = dupe.videos ? renderVideoSection(dupe.videos, dupe.name) : '';
    
    card.innerHTML = `
      <div class="dupe-card-header">
        <div class="dupe-card-image ${!dupe.image ? 'no-image' : ''}">${imageHTML}</div>
        <div class="dupe-card-main">
          <div class="dupe-card-info">
            <span class="match-score ${matchInfo.level}">${matchInfo.label}</span>
            <h4 class="dupe-name">${escapeHTML(dupe.name)}</h4>
            <p class="dupe-brand">${escapeHTML(dupe.brand)}</p>
          </div>
          ${priceHTML}
        </div>
      </div>
      <div class="dupe-card-body">
        <p class="dupe-reason">${escapeHTML(dupe.reason)}</p>
        ${tagsHTML ? `<div class="dupe-meta">${tagsHTML}</div>` : ''}
        ${differencesHTML}
        ${retailerLinksHTML}
        ${videoLinksHTML}
      </div>
    `;
    
    return card;
  }

  /**
   * Render search results
   */
  function renderResults(product) {
    // Clear previous results
    elements.dupesList.innerHTML = '';
    elements.noResults.classList.add('hidden');
    elements.originalProductImage.innerHTML = '';
    
    if (!product) {
      elements.noResults.classList.remove('hidden');
      elements.originalName.textContent = elements.searchInput.value;
      elements.originalBrand.textContent = '';
      elements.originalPrice.textContent = '';
      elements.originalDescription.textContent = '';
      elements.originalProductImage.innerHTML = `<img src="${CONFIG.imagePlaceholder}" alt="No product found">`;
      elements.originalProductImage.classList.add('no-image');
      elements.dupesCount.textContent = '';
      showResultsView();
      return;
    }
    
    // Render original product with image
    elements.originalName.textContent = product.name;
    elements.originalBrand.textContent = product.brand;
    elements.originalPrice.textContent = product.price ? `Retail: ${product.price}` : '';
    elements.originalDescription.textContent = product.description || '';
    
    // Add product image with enhanced error handling
    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = `${product.brand} ${product.name}`;
      img.loading = 'lazy';
      img.setAttribute('crossorigin', 'anonymous');
      img.onload = function() {
        elements.originalProductImage.classList.add('loaded');
      };
      img.onerror = function() {
        // Retry without CORS first
        if (this.hasAttribute('crossorigin')) {
          this.removeAttribute('crossorigin');
          this.src = product.image;
          return;
        }
        this.src = CONFIG.imagePlaceholder;
        elements.originalProductImage.classList.add('no-image');
      };
      elements.originalProductImage.appendChild(img);
      elements.originalProductImage.classList.remove('no-image');
    } else {
      const img = document.createElement('img');
      img.src = CONFIG.imagePlaceholder;
      img.alt = 'Product image';
      elements.originalProductImage.appendChild(img);
      elements.originalProductImage.classList.add('no-image');
    }
    
    // Render video and social content for original product
    const originalContentEl = document.getElementById('original-content');
    if (originalContentEl) {
      let contentHTML = '';
      
      // Video section
      if (product.videos && product.videos.length > 0) {
        contentHTML += renderVideoSection(product.videos, product.name);
      }
      
      // Social links section
      if (product.social) {
        contentHTML += renderSocialLinks(product.social, product.name);
      }
      
      originalContentEl.innerHTML = contentHTML;
    }
    
    // Check if there are dupes
    if (!product.dupes || product.dupes.length === 0) {
      elements.noResults.classList.remove('hidden');
      elements.dupesCount.textContent = '';
      showResultsView();
      return;
    }
    
    // Render dupes count
    const count = product.dupes.length;
    elements.dupesCount.textContent = `${count} curated alternative${count !== 1 ? 's' : ''}`;
    
    // Sort by match score (highest first)
    const sortedDupes = [...product.dupes].sort((a, b) => 
      (b.matchScore || 75) - (a.matchScore || 75)
    );
    
    // Render each dupe card with price validation against original
    for (const dupe of sortedDupes) {
      const card = renderDupeCard(dupe, product.price);
      elements.dupesList.appendChild(card);
    }
    
    showResultsView();
  }

  /**
   * Render results with staggered animation for real-time feel
   */
  async function renderResultsAnimated(product) {
    // Clear previous results
    elements.dupesList.innerHTML = '';
    elements.noResults.classList.add('hidden');
    elements.originalProductImage.innerHTML = '';
    
    // Clear original content
    const originalContentEl = document.getElementById('original-content');
    if (originalContentEl) {
      originalContentEl.innerHTML = '';
    }
    
    if (!product) {
      elements.noResults.classList.remove('hidden');
      elements.originalName.textContent = elements.searchInput.value;
      elements.originalBrand.textContent = '';
      elements.originalPrice.textContent = '';
      elements.originalDescription.textContent = '';
      elements.originalProductImage.innerHTML = `<img src="${CONFIG.imagePlaceholder}" alt="No product found">`;
      elements.originalProductImage.classList.add('no-image');
      elements.dupesCount.textContent = '';
      showResultsView();
      return;
    }
    
    // Render original product info (instant)
    elements.originalName.textContent = product.name;
    elements.originalBrand.textContent = product.brand;
    elements.originalPrice.textContent = product.price ? `Retail: ${product.price}` : '';
    elements.originalDescription.textContent = product.description || '';
    
    // Add product image
    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = `${product.brand} ${product.name}`;
      img.loading = 'lazy';
      img.setAttribute('crossorigin', 'anonymous');
      img.onload = function() {
        elements.originalProductImage.classList.add('loaded');
      };
      img.onerror = function() {
        if (this.hasAttribute('crossorigin')) {
          this.removeAttribute('crossorigin');
          this.src = product.image;
          return;
        }
        this.src = CONFIG.imagePlaceholder;
        elements.originalProductImage.classList.add('no-image');
      };
      elements.originalProductImage.appendChild(img);
      elements.originalProductImage.classList.remove('no-image');
    } else {
      const img = document.createElement('img');
      img.src = CONFIG.imagePlaceholder;
      img.alt = 'Product image';
      elements.originalProductImage.appendChild(img);
      elements.originalProductImage.classList.add('no-image');
    }
    
    // Switch to results view first
    showResultsView();
    
    // Check if there are dupes
    if (!product.dupes || product.dupes.length === 0) {
      elements.noResults.classList.remove('hidden');
      elements.dupesCount.textContent = '';
      return;
    }
    
    // Render dupes count with animation
    const count = product.dupes.length;
    elements.dupesCount.textContent = `${count} curated alternative${count !== 1 ? 's' : ''}`;
    
    // Sort by match score
    const sortedDupes = [...product.dupes].sort((a, b) => 
      (b.matchScore || 75) - (a.matchScore || 75)
    );
    
    // Render each dupe card with staggered animation
    for (let i = 0; i < sortedDupes.length; i++) {
      const dupe = sortedDupes[i];
      const card = renderDupeCard(dupe, product.price);
      card.classList.add('animate-in');
      card.style.animationDelay = `${i * 100}ms`;
      elements.dupesList.appendChild(card);
    }
    
    // Render video and social content after a brief delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (originalContentEl) {
      let contentHTML = '';
      
      // Combine static videos with live videos
      const allVideos = [
        ...(product.videos || []),
        ...(product.liveVideos || [])
      ].filter((v, i, arr) => 
        // Dedupe by videoId
        arr.findIndex(x => x.videoId === v.videoId) === i
      );
      
      if (allVideos.length > 0) {
        contentHTML += renderVideoSection(allVideos, product.name);
      }
      
      // Render static social links
      if (product.social) {
        contentHTML += renderSocialLinks(product.social, product.name);
      }
      
      // Render live Reddit discussions
      if (product.liveReddit && product.liveReddit.length > 0) {
        contentHTML += renderLiveReddit(product.liveReddit);
      }
      
      // Render live TikTok info
      if (product.liveTikTok) {
        contentHTML += renderLiveTikTok(product.liveTikTok);
      }
      
      // Render related search suggestions
      if (product.liveSuggestions && product.liveSuggestions.length > 0) {
        contentHTML += renderLiveSuggestions(product.liveSuggestions);
      }
      
      if (contentHTML) {
        originalContentEl.innerHTML = contentHTML;
        originalContentEl.classList.add('animate-in');
      }
    }
  }
  
  /**
   * Render live Reddit discussions from API
   */
  function renderLiveReddit(threads) {
    if (!threads || threads.length === 0) return '';
    
    const threadItems = threads.slice(0, 3).map(thread => `
      <a href="${escapeHTML(thread.url)}" 
         class="live-reddit-item" 
         target="_blank" 
         rel="noopener noreferrer">
        <span class="reddit-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z"/></svg>
        </span>
        <span class="reddit-content">
          <span class="reddit-title">${escapeHTML(thread.title.length > 60 ? thread.title.slice(0, 60) + '...' : thread.title)}</span>
          <span class="reddit-meta">r/${escapeHTML(thread.subreddit)} · ${thread.score} upvotes · ${thread.comments} comments</span>
        </span>
      </a>
    `).join('');
    
    return `
      <div class="live-section live-reddit-section animate-in">
        <p class="live-section-label">
          <span class="live-badge">Live</span>
          Reddit Discussions
        </p>
        <div class="live-reddit-list">${threadItems}</div>
      </div>
    `;
  }
  
  /**
   * Render live TikTok search info from API
   */
  function renderLiveTikTok(tiktokInfo) {
    if (!tiktokInfo) return '';
    
    const hashtags = (tiktokInfo.hashtags || []).slice(0, 4).map(tag => 
      `<span class="tiktok-hashtag">${escapeHTML(tag)}</span>`
    ).join('');
    
    return `
      <div class="live-section live-tiktok-section animate-in">
        <p class="live-section-label">
          <span class="live-badge">Live</span>
          TikTok
        </p>
        <a href="${escapeHTML(tiktokInfo.searchUrl)}" 
           class="live-tiktok-link" 
           target="_blank" 
           rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          Search TikTok for dupes
        </a>
        ${hashtags ? `<div class="tiktok-hashtags">${hashtags}</div>` : ''}
      </div>
    `;
  }
  
  /**
   * Render related search suggestions from API
   */
  function renderLiveSuggestions(suggestions) {
    if (!suggestions || suggestions.length === 0) return '';
    
    const chips = suggestions.slice(0, 5).map(suggestion => 
      `<button class="suggestion-chip live-suggestion" data-query="${escapeHTML(suggestion)}">${escapeHTML(suggestion)}</button>`
    ).join('');
    
    return `
      <div class="live-section live-suggestions-section animate-in">
        <p class="live-section-label">Related Searches</p>
        <div class="live-suggestions-list">${chips}</div>
      </div>
    `;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ============================================
  // Autocomplete
  // ============================================
  
  /**
   * Render autocomplete suggestions
   */
  function renderAutocomplete(suggestions) {
    elements.autocompleteList.innerHTML = '';
    activeAutocompleteIndex = -1;
    
    if (suggestions.length === 0) {
      hideAutocomplete();
      return;
    }
    
    suggestions.forEach((product, index) => {
      const li = document.createElement('li');
      li.className = 'autocomplete-item';
      li.setAttribute('role', 'option');
      li.setAttribute('data-index', index);
      
      const imageHTML = product.image 
        ? `<img class="autocomplete-item-image" src="${escapeHTML(product.image)}" alt="" loading="lazy" onerror="this.style.display='none'">`
        : `<div class="autocomplete-item-image" style="display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:var(--color-text-tertiary)">✦</div>`;
      
      li.innerHTML = `
        ${imageHTML}
        <div class="autocomplete-item-info">
          <span class="autocomplete-item-name">${escapeHTML(product.name)}</span>
          <span class="autocomplete-item-brand">${escapeHTML(product.brand)}</span>
        </div>
        <span class="autocomplete-item-category">${escapeHTML(product.category)}</span>
      `;
      
      li.addEventListener('click', () => selectAutocompleteItem(product));
      li.addEventListener('mouseenter', () => setActiveAutocompleteItem(index));
      
      elements.autocompleteList.appendChild(li);
    });
    
    showAutocomplete();
  }
  
  /**
   * Show autocomplete dropdown
   */
  function showAutocomplete() {
    elements.autocompleteList.classList.remove('hidden');
  }
  
  /**
   * Hide autocomplete dropdown
   */
  function hideAutocomplete() {
    elements.autocompleteList.classList.add('hidden');
    activeAutocompleteIndex = -1;
  }
  
  /**
   * Set active autocomplete item
   */
  function setActiveAutocompleteItem(index) {
    const items = elements.autocompleteList.querySelectorAll('.autocomplete-item');
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    activeAutocompleteIndex = index;
  }
  
  /**
   * Select an autocomplete item
   */
  function selectAutocompleteItem(product) {
    elements.searchInput.value = `${product.brand} ${product.name}`;
    hideAutocomplete();
    elements.searchForm.dispatchEvent(new Event('submit'));
  }
  
  /**
   * Handle autocomplete keyboard navigation
   */
  function handleAutocompleteKeydown(event) {
    const items = elements.autocompleteList.querySelectorAll('.autocomplete-item');
    
    if (elements.autocompleteList.classList.contains('hidden') || items.length === 0) {
      return;
    }
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveAutocompleteItem(
          activeAutocompleteIndex < items.length - 1 ? activeAutocompleteIndex + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setActiveAutocompleteItem(
          activeAutocompleteIndex > 0 ? activeAutocompleteIndex - 1 : items.length - 1
        );
        break;
        
      case 'Enter':
        if (activeAutocompleteIndex >= 0) {
          event.preventDefault();
          const suggestions = getAutocompleteSuggestions(elements.searchInput.value);
          if (suggestions[activeAutocompleteIndex]) {
            selectAutocompleteItem(suggestions[activeAutocompleteIndex]);
          }
        }
        break;
        
      case 'Escape':
        hideAutocomplete();
        break;
    }
  }
  
  /**
   * Handle input changes for autocomplete
   */
  function handleAutocompleteInput() {
    clearTimeout(autocompleteDebounceTimer);
    
    const query = elements.searchInput.value.trim();
    
    if (query.length < CONFIG.minSearchLength) {
      hideAutocomplete();
      return;
    }
    
    autocompleteDebounceTimer = setTimeout(() => {
      const suggestions = getAutocompleteSuggestions(query);
      renderAutocomplete(suggestions);
    }, CONFIG.autocompleteDebounceMs);
  }

  // ============================================
  // Event Handlers
  // ============================================

  /**
   * Handle search form submission
   * Now integrates with real-time API for live data
   */
  async function handleSearch(event) {
    event.preventDefault();
    
    // Hide autocomplete
    hideAutocomplete();
    
    const query = elements.searchInput.value.trim();
    if (query.length < CONFIG.minSearchLength) {
      return;
    }
    
    // Show loading with source animation
    showLoading();
    
    // Perform local search (instant)
    const staticResult = searchDupes(query);
    
    // Animate the source search and fetch live data from API
    const liveData = await animateSourceSearch(query, staticResult);
    
    // Merge static data with live API data
    const result = mergeWithLiveData(staticResult, liveData);
    
    // Store live data for rendering
    liveSearchData = liveData;
    
    // Hide loading and show results with staggered animation
    hideLoading();
    renderResultsAnimated(result);
    
    // Update URL with search query
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    history.pushState({}, '', url);
  }

  /**
   * Handle suggestion chip clicks
   */
  function handleSuggestionClick(event) {
    const query = event.target.dataset.query;
    if (query) {
      elements.searchInput.value = query;
      elements.searchForm.dispatchEvent(new Event('submit'));
    }
  }

  /**
   * Handle back button click
   */
  function handleBackClick() {
    showSearchView();
    elements.searchInput.value = '';
  }

  /**
   * Handle browser back/forward navigation
   */
  function handlePopState() {
    const url = new URL(window.location);
    const query = url.searchParams.get('q');
    
    if (query) {
      elements.searchInput.value = query;
      const result = searchDupes(query);
      renderResults(result);
    } else {
      showSearchView();
    }
  }

  /**
   * Handle request dupe button click
   * Opens email with pre-filled subject and body
   */
  function handleRequestDupe(event) {
    event.preventDefault();
    
    const searchedTerm = elements.searchInput.value.trim() || 'a product';
    const subject = encodeURIComponent(`Dupe Request: ${searchedTerm}`);
    const body = encodeURIComponent(
      `Hi Dupe Edit team!\n\n` +
      `I'd love to see dupes for: ${searchedTerm}\n\n` +
      `Additional details (optional):\n` +
      `- Brand: \n` +
      `- Product type: \n` +
      `- Price range I'm looking for: \n\n` +
      `Thanks!`
    );
    
    window.location.href = `mailto:${CONFIG.feedbackEmail}?subject=${subject}&body=${body}`;
  }

  // ============================================
  // Initialization
  // ============================================

  function init() {
    // Initialize theme
    initTheme();
    
    // Check if database is loaded
    if (!window.DUPE_DATABASE) {
      console.error('Dupe database not loaded. Check that dupes.js is included before app.js');
      return;
    }
    
    // Attach event listeners
    elements.searchForm.addEventListener('submit', handleSearch);
    elements.backButton.addEventListener('click', handleBackClick);
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Autocomplete listeners
    elements.searchInput.addEventListener('input', handleAutocompleteInput);
    elements.searchInput.addEventListener('keydown', handleAutocompleteKeydown);
    elements.searchInput.addEventListener('focus', handleAutocompleteInput);
    
    // Hide autocomplete when clicking outside
    document.addEventListener('click', (event) => {
      if (!elements.searchForm.contains(event.target)) {
        hideAutocomplete();
      }
    });
    
    elements.suggestionChips.forEach(chip => {
      chip.addEventListener('click', handleSuggestionClick);
    });
    
    // Handle clicks on live suggestions (dynamically added)
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('live-suggestion')) {
        handleSuggestionClick(event);
      }
    });
    
    // Request dupe button handler
    const requestDupeBtn = document.getElementById('request-dupe-btn');
    if (requestDupeBtn) {
      requestDupeBtn.addEventListener('click', handleRequestDupe);
    }
    
    // Handle browser navigation
    window.addEventListener('popstate', handlePopState);
    
    // Check for query parameter on load
    const url = new URL(window.location);
    const initialQuery = url.searchParams.get('q');
    
    if (initialQuery) {
      elements.searchInput.value = initialQuery;
      const result = searchDupes(initialQuery);
      renderResults(result);
    }
    
    // Focus search input
    elements.searchInput.focus();
    
    console.log('The Dupe Edit initialized successfully.');
    console.log(`Database contains ${window.DUPE_DATABASE.products.length} luxury products.`);
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
