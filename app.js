/**
 * THE DUPE EDIT — Simple, Functional Search
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  const CONFIG = {
    minSearchLength: 2,
    debounceMs: 150,
    maxAutocomplete: 8,
    apiEndpoint: '/api/search',
    feedbackEmail: 'hello@thedupeedit.com',
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNGNUYwRTgiLz48cGF0aCBkPSJNMzIgNDhMMzYgNDRMNDAgNDhMNDggMzZMNTYgNDgiIHN0cm9rZT0iI0M0QTY3QSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjMyIiByPSI0IiBmaWxsPSIjQzRBNjdBIi8+PC9zdmc+',
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
  let activeIndex = -1;

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
  // Search Logic
  // ============================================
  
  function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').trim();
  }

  function similarity(query, target) {
    const q = normalize(query);
    const t = normalize(target);
    if (t === q) return 1.0;
    if (t.includes(q)) return 0.9;
    
    const qWords = q.split(/\s+/).filter(w => w.length > 1);
    const tWords = t.split(/\s+/);
    let matches = 0;
    for (const qw of qWords) {
      for (const tw of tWords) {
        if (tw === qw || tw.includes(qw) || qw.includes(tw)) {
          matches++;
          break;
        }
      }
    }
    return qWords.length ? Math.min(matches / qWords.length, 0.85) : 0;
  }

  function searchDatabase(query) {
    if (!window.DUPE_DATABASE || query.length < CONFIG.minSearchLength) return null;
    
    let best = null, bestScore = 0;
    
    for (const product of window.DUPE_DATABASE.products) {
      const scores = [
        similarity(query, product.name),
        similarity(query, product.brand) * 0.7,
        similarity(query, product.brand + ' ' + product.name),
      ];
      if (product.aliases) {
        for (const a of product.aliases) {
          scores.push(similarity(query, a));
        }
      }
      const score = Math.max.apply(null, scores);
      if (score > 0) console.log('[DEBUG] Score for', product.brand, product.name, ':', score);
      if (score > bestScore && score >= 0.4) {
        bestScore = score;
        best = product;
      }
    }
    console.log('[DEBUG] Best match:', best ? (best.brand + ' ' + best.name) : 'null', '| Score:', bestScore);
    return best;
  }

  function getAutocomplete(query) {
    if (!window.DUPE_DATABASE || query.length < CONFIG.minSearchLength) return [];
    
    const results = [];
    for (const product of window.DUPE_DATABASE.products) {
      const scores = [
        similarity(query, product.name),
        similarity(query, product.brand) * 0.8,
        similarity(query, product.brand + ' ' + product.name),
      ];
      if (product.aliases) {
        for (const a of product.aliases) {
          scores.push(similarity(query, a));
        }
      }
      const score = Math.max.apply(null, scores);
      if (score >= 0.3) results.push({ product: product, score: score });
    }
    
    results.sort(function(a, b) { return b.score - a.score; });
    return results.slice(0, CONFIG.maxAutocomplete).map(function(r) { return r.product; });
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
  // Rendering
  // ============================================
  
  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showLoading(msg) {
    els.loading.classList.remove('hidden');
    els.loadingText.textContent = msg || 'Finding dupes...';
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

  function renderImage(container, src, alt) {
    container.innerHTML = '';
    container.classList.remove('no-image');
    var img = document.createElement('img');
    img.alt = alt;
    img.loading = 'lazy';
    
    if (src) {
      img.src = src;
      img.onerror = function() {
        this.src = CONFIG.placeholder;
        container.classList.add('no-image');
      };
    } else {
      img.src = CONFIG.placeholder;
      container.classList.add('no-image');
    }
    container.appendChild(img);
  }

  function renderRetailers(retailers) {
    if (!retailers || !retailers.length) return '';
    
    var html = '<div class="dupe-retailers"><p class="dupe-retailers-label">Shop at</p><div class="dupe-retailers-list">';
    for (var i = 0; i < retailers.length; i++) {
      var r = retailers[i];
      html += '<a href="' + escapeHTML(r.url) + '" class="dupe-retailer-link" target="_blank" rel="noopener">' +
        escapeHTML(r.name) +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>';
    }
    html += '</div></div>';
    return html;
  }

  function getMatchLabel(score) {
    if (score >= 85) return { cls: 'high', label: 'Very Close Match' };
    if (score >= 70) return { cls: 'medium', label: 'Good Match' };
    return { cls: 'low', label: 'Similar Vibe' };
  }

  function renderDupeCard(dupe) {
    var match = getMatchLabel(dupe.matchScore || 75);
    var card = document.createElement('article');
    card.className = 'dupe-card';
    
    var imgSrc = dupe.image || '';
    var tagsHTML = '';
    if (dupe.bestFor) {
      for (var i = 0; i < dupe.bestFor.length; i++) {
        tagsHTML += '<span class="dupe-tag">' + escapeHTML(dupe.bestFor[i]) + '</span>';
      }
    }
    
    var diffHTML = '';
    if (dupe.differences) {
      diffHTML = '<div class="dupe-differences"><p class="dupe-differences-label">Key Differences</p><p class="dupe-differences-text">' + escapeHTML(dupe.differences) + '</p></div>';
    }
    
    card.innerHTML = 
      '<div class="dupe-card-header">' +
        '<div class="dupe-card-image' + (!imgSrc ? ' no-image' : '') + '">' +
          '<img src="' + (imgSrc || CONFIG.placeholder) + '" alt="' + escapeHTML(dupe.name) + '" loading="lazy" onerror="this.src=\'' + CONFIG.placeholder + '\'; this.parentElement.classList.add(\'no-image\');">' +
        '</div>' +
        '<div class="dupe-card-main">' +
          '<div class="dupe-card-info">' +
            '<span class="match-score ' + match.cls + '">' + match.label + '</span>' +
            '<h4 class="dupe-name">' + escapeHTML(dupe.name) + '</h4>' +
            '<p class="dupe-brand">' + escapeHTML(dupe.brand) + '</p>' +
          '</div>' +
          '<p class="dupe-price">' + escapeHTML(dupe.priceRange || 'Price varies') + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="dupe-card-body">' +
        '<p class="dupe-reason">' + escapeHTML(dupe.reason) + '</p>' +
        (tagsHTML ? '<div class="dupe-meta">' + tagsHTML + '</div>' : '') +
        diffHTML +
        renderRetailers(dupe.retailers) +
      '</div>';
    
    return card;
  }

  function renderResults(product, liveData) {
    els.dupesList.innerHTML = '';
    els.noResults.classList.add('hidden');
    els.originalContent.innerHTML = '';
    
    if (!product) {
      els.noResults.classList.remove('hidden');
      els.originalName.textContent = els.searchInput.value;
      els.originalBrand.textContent = '';
      els.originalPrice.textContent = '';
      els.originalDesc.textContent = '';
      renderImage(els.originalImage, null, 'No product found');
      els.dupesCount.textContent = '';
      
      // Show live suggestions if available
      if (liveData && liveData.sources && liveData.sources.suggestions && liveData.sources.suggestions.results && liveData.sources.suggestions.results.length) {
        var suggestions = liveData.sources.suggestions.results.slice(0, 5);
        var sugHTML = '<div class="live-suggestions"><p class="live-suggestions-label">Try searching for:</p><div class="live-suggestions-list">';
        for (var i = 0; i < suggestions.length; i++) {
          sugHTML += '<button class="suggestion-chip live-chip" data-query="' + escapeHTML(suggestions[i]) + '">' + escapeHTML(suggestions[i]) + '</button>';
        }
        sugHTML += '</div></div>';
        els.originalContent.innerHTML = sugHTML;
      }
      
      showResults();
      return;
    }
    
    // Render original product
    els.originalName.textContent = product.name;
    els.originalBrand.textContent = product.brand;
    els.originalPrice.textContent = product.price ? 'Retail: ' + product.price : '';
    els.originalDesc.textContent = product.description || '';
    renderImage(els.originalImage, product.image, product.brand + ' ' + product.name);
    
    // Render dupes
    if (!product.dupes || !product.dupes.length) {
      els.noResults.classList.remove('hidden');
      els.dupesCount.textContent = '';
      showResults();
      return;
    }
    
    els.dupesCount.textContent = product.dupes.length + ' curated alternative' + (product.dupes.length !== 1 ? 's' : '');
    
    var sorted = product.dupes.slice().sort(function(a, b) { return (b.matchScore || 75) - (a.matchScore || 75); });
    for (var i = 0; i < sorted.length; i++) {
      els.dupesList.appendChild(renderDupeCard(sorted[i]));
    }
    
    // Add live TikTok/Reddit links if available
    if (liveData) {
      var contentHTML = '';
      
      if (liveData.sources && liveData.sources.tiktok && liveData.sources.tiktok.info && liveData.sources.tiktok.info.searchUrl) {
        contentHTML += '<a href="' + escapeHTML(liveData.sources.tiktok.info.searchUrl) + '" class="live-link" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>See TikTok reviews</a>';
      }
      
      if (liveData.sources && liveData.sources.reddit && liveData.sources.reddit.results && liveData.sources.reddit.results.length) {
        contentHTML += '<a href="' + escapeHTML(liveData.sources.reddit.results[0].url) + '" class="live-link" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>Reddit discussion</a>';
      }
      
      if (contentHTML) {
        els.originalContent.innerHTML = '<div class="live-links">' + contentHTML + '</div>';
      }
    }
    
    showResults();
  }

  // ============================================
  // Autocomplete
  // ============================================
  
  function showAutocomplete(items) {
    els.autocomplete.innerHTML = '';
    activeIndex = -1;
    
    if (!items.length) {
      els.autocomplete.classList.add('hidden');
      return;
    }
    
    for (var i = 0; i < items.length; i++) {
      var product = items[i];
      var li = document.createElement('li');
      li.className = 'autocomplete-item';
      li.dataset.index = i;
      
      li.innerHTML = '<div class="autocomplete-item-info"><span class="autocomplete-item-name">' + escapeHTML(product.name) + '</span><span class="autocomplete-item-brand">' + escapeHTML(product.brand) + '</span></div><span class="autocomplete-item-category">' + escapeHTML(product.category) + '</span>';
      
      (function(p) {
        li.addEventListener('click', function() { selectAutocomplete(p); });
      })(product);
      
      (function(idx) {
        li.addEventListener('mouseenter', function() { setActiveAutocomplete(idx); });
      })(i);
      
      els.autocomplete.appendChild(li);
    }
    
    els.autocomplete.classList.remove('hidden');
  }

  function hideAutocomplete() {
    els.autocomplete.classList.add('hidden');
    activeIndex = -1;
  }

  function setActiveAutocomplete(index) {
    var items = els.autocomplete.querySelectorAll('.autocomplete-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', i === index);
    }
    activeIndex = index;
  }

  function selectAutocomplete(product) {
    els.searchInput.value = product.brand + ' ' + product.name;
    hideAutocomplete();
    els.searchForm.dispatchEvent(new Event('submit'));
  }

  // ============================================
  // Event Handlers
  // ============================================
  
  async function handleSearch(e) {
    e.preventDefault();
    hideAutocomplete();
    
    var query = els.searchInput.value.trim();
    if (query.length < CONFIG.minSearchLength) return;
    
    showLoading();
    
    // Search local database and fetch live data in parallel
    var localResult = searchDatabase(query);
    console.log('[DEBUG] Query:', query, '| Local result:', localResult ? (localResult.brand + ' ' + localResult.name) : 'null');
    var liveData = await fetchLiveData(query);
    
    hideLoading();
    renderResults(localResult, liveData);
    
    // Update URL
    var url = new URL(window.location);
    url.searchParams.set('q', query);
    history.pushState({}, '', url);
  }

  function handleInput() {
    clearTimeout(debounceTimer);
    var query = els.searchInput.value.trim();
    
    if (query.length < CONFIG.minSearchLength) {
      hideAutocomplete();
      return;
    }
    
    debounceTimer = setTimeout(function() {
      var suggestions = getAutocomplete(query);
      showAutocomplete(suggestions);
    }, CONFIG.debounceMs);
  }

  function handleKeydown(e) {
    var items = els.autocomplete.querySelectorAll('.autocomplete-item');
    if (els.autocomplete.classList.contains('hidden') || !items.length) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveAutocomplete(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveAutocomplete(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      var suggestions = getAutocomplete(els.searchInput.value);
      if (suggestions[activeIndex]) selectAutocomplete(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      hideAutocomplete();
    }
  }

  function handleChipClick(e) {
    var query = e.target.dataset.query;
    if (query) {
      els.searchInput.value = query;
      els.searchForm.dispatchEvent(new Event('submit'));
    }
  }

  function handleRequestDupe(e) {
    e.preventDefault();
    var term = els.searchInput.value.trim() || 'a product';
    var subject = encodeURIComponent('Dupe Request: ' + term);
    var body = encodeURIComponent('Hi! I would love to see dupes for: ' + term + '\n\nThanks!');
    window.location.href = 'mailto:' + CONFIG.feedbackEmail + '?subject=' + subject + '&body=' + body;
  }

  // ============================================
  // Initialize
  // ============================================
  
  function init() {
    initTheme();
    
    if (!window.DUPE_DATABASE) {
      console.error('Database not loaded');
      return;
    }
    
    // Event listeners
    els.searchForm.addEventListener('submit', handleSearch);
    els.searchInput.addEventListener('input', handleInput);
    els.searchInput.addEventListener('keydown', handleKeydown);
    els.searchInput.addEventListener('focus', handleInput);
    els.backButton.addEventListener('click', showSearch);
    els.themeToggle.addEventListener('click', toggleTheme);
    
    document.addEventListener('click', function(e) {
      if (!els.searchForm.contains(e.target)) hideAutocomplete();
      // Handle dynamic chip clicks
      if (e.target.classList.contains('suggestion-chip') || e.target.classList.contains('live-chip')) {
        handleChipClick(e);
      }
    });
    
    els.chips.forEach(function(chip) { chip.addEventListener('click', handleChipClick); });
    
    var requestBtn = $('#request-dupe-btn');
    if (requestBtn) requestBtn.addEventListener('click', handleRequestDupe);
    
    // Handle URL query on load
    var urlQuery = new URL(window.location).searchParams.get('q');
    if (urlQuery) {
      els.searchInput.value = urlQuery;
      handleSearch(new Event('submit'));
    }
    
    window.addEventListener('popstate', function() {
      var q = new URL(window.location).searchParams.get('q');
      if (q) {
        els.searchInput.value = q;
        renderResults(searchDatabase(q), null);
      } else {
        showSearch();
      }
    });
    
    els.searchInput.focus();
    console.log('Dupe Edit loaded. ' + window.DUPE_DATABASE.products.length + ' products.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
