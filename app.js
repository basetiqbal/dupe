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
    imagePlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNGNUYwRTgiLz48cGF0aCBkPSJNMzIgNDhMMzYgNDRMNDAgNDhMNDggMzZMNTYgNDgiIHN0cm9rZT0iI0M0QTY3QSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjMyIiByPSI0IiBmaWxsPSIjQzRBNjdBIi8+PC9zdmc+',
  };

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
   * Show loading state
   */
  function showLoading() {
    elements.loading.classList.remove('hidden');
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
   * Create image element with lazy loading and fallback
   */
  function createImageElement(src, alt, className = '') {
    const img = document.createElement('img');
    img.alt = alt;
    img.loading = 'lazy';
    img.className = className;
    
    if (src) {
      img.src = src;
      img.onerror = function() {
        this.src = CONFIG.imagePlaceholder;
        this.parentElement?.classList.add('no-image');
      };
    } else {
      img.src = CONFIG.imagePlaceholder;
      img.parentElement?.classList.add('no-image');
    }
    
    return img;
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
   * Render a single dupe card
   */
  function renderDupeCard(dupe) {
    const matchInfo = getMatchLevel(dupe.matchScore || 75);
    
    const card = document.createElement('article');
    card.className = 'dupe-card';
    
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
    
    const imageHTML = dupe.image 
      ? `<img src="${escapeHTML(dupe.image)}" alt="${escapeHTML(dupe.name)}" loading="lazy" onerror="this.src='${CONFIG.imagePlaceholder}'; this.parentElement.classList.add('no-image');">`
      : `<span>No image</span>`;
    
    card.innerHTML = `
      <div class="dupe-card-header">
        <div class="dupe-card-image ${!dupe.image ? 'no-image' : ''}">${imageHTML}</div>
        <div class="dupe-card-main">
          <div class="dupe-card-info">
            <span class="match-score ${matchInfo.level}">${matchInfo.label}</span>
            <h4 class="dupe-name">${escapeHTML(dupe.name)}</h4>
            <p class="dupe-brand">${escapeHTML(dupe.brand)}</p>
          </div>
          <p class="dupe-price">${escapeHTML(dupe.priceRange)}</p>
        </div>
      </div>
      <div class="dupe-card-body">
        <p class="dupe-reason">${escapeHTML(dupe.reason)}</p>
        ${tagsHTML ? `<div class="dupe-meta">${tagsHTML}</div>` : ''}
        ${differencesHTML}
        ${retailerLinksHTML}
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
    
    // Add product image
    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = `${product.brand} ${product.name}`;
      img.loading = 'lazy';
      img.onerror = function() {
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
    
    // Render each dupe card
    for (const dupe of sortedDupes) {
      const card = renderDupeCard(dupe);
      elements.dupesList.appendChild(card);
    }
    
    showResultsView();
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
   */
  async function handleSearch(event) {
    event.preventDefault();
    
    // Hide autocomplete
    hideAutocomplete();
    
    const query = elements.searchInput.value.trim();
    if (query.length < CONFIG.minSearchLength) {
      return;
    }
    
    // Show loading
    showLoading();
    
    // Minimum loading time for perceived performance
    const startTime = Date.now();
    
    // Perform search
    const result = searchDupes(query);
    
    // Calculate remaining time for minimum loading display
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, CONFIG.loadingDelayMs - elapsed);
    
    // Wait remaining time then show results
    await new Promise(resolve => setTimeout(resolve, remaining));
    
    hideLoading();
    renderResults(result);
    
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
