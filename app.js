/**
 * THE DUPE EDIT — Dupe Intelligence & Decision-Ranking System
 * 
 * Not a search engine. A decision engine.
 * Reduce options. Reduce regret.
 */

(function() {
  'use strict';

  const CONFIG = {
    minSearchLength: 2,
    maxDupes: 4,
  };

  // DOM Elements
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  
  const els = {
    searchForm: $('#search-form'),
    searchInput: $('#search-input'),
    autocompleteList: $('#autocomplete-list'),
    searchSection: $('#search-section'),
    resultsSection: $('#results-section'),
    loading: $('#loading'),
    loadingText: $('#loading-text'),
    backButton: $('#back-button'),
    themeToggle: $('#theme-toggle'),
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
  
  let autocompleteIndex = -1;

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
  // Database Search (Curated Intelligence)
  // ============================================
  function searchDatabase(query) {
    if (!window.DUPE_DATABASE || query.length < CONFIG.minSearchLength) return null;
    
    const q = query.toLowerCase().trim();
    const qWords = q.split(/\s+/);
    
    let bestMatch = null;
    let bestScore = 0;
    
    for (const product of window.DUPE_DATABASE.products) {
      const targets = [
        { text: product.name.toLowerCase(), weight: 1.0 },
        { text: product.brand.toLowerCase(), weight: 0.8 },
        { text: (product.brand + ' ' + product.name).toLowerCase(), weight: 1.2 },
        ...(product.aliases || []).map(a => ({ text: a.toLowerCase(), weight: 1.5 }))
      ];
      
      for (const target of targets) {
        const t = target.text;
        let score = 0;
        
        // Exact match — highest priority
        if (t === q) {
          score = 100 * target.weight;
        }
        // Query exactly matches start of target
        else if (t.startsWith(q + ' ') || t.startsWith(q)) {
          score = 80 * target.weight;
        }
        // Target exactly matches start of query
        else if (q.startsWith(t + ' ') || q.startsWith(t)) {
          score = 70 * target.weight;
        }
        // All query words appear in target
        else if (qWords.length > 1 && qWords.every(w => t.includes(w))) {
          score = 60 * target.weight;
        }
        // Target contains query as substring
        else if (t.includes(q)) {
          score = 40 * target.weight;
        }
        // Query contains target as substring
        else if (q.includes(t)) {
          score = 30 * target.weight;
        }
        // Partial word match (any query word in target)
        else if (qWords.some(w => w.length > 2 && t.includes(w))) {
          score = 20 * target.weight;
        }
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = product;
        }
      }
    }
    
    return bestMatch;
  }
  
  // ============================================
  // Autocomplete
  // ============================================
  function getAutocompleteSuggestions(query) {
    if (!window.DUPE_DATABASE || query.length < 2) return [];
    
    const q = query.toLowerCase().trim();
    const suggestions = [];
    const seen = new Set();
    
    for (const product of window.DUPE_DATABASE.products) {
      const displayName = product.brand + ' ' + product.name;
      const searchTargets = [
        displayName.toLowerCase(),
        product.name.toLowerCase(),
        ...(product.aliases || []).map(a => a.toLowerCase())
      ];
      
      for (const target of searchTargets) {
        if (target.includes(q) && !seen.has(displayName)) {
          seen.add(displayName);
          suggestions.push({
            display: displayName,
            brand: product.brand,
            name: product.name,
            category: product.category
          });
          break;
        }
      }
      
      if (suggestions.length >= 6) break;
    }
    
    return suggestions;
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

  function showLoading() {
    els.loading.classList.remove('hidden');
    els.loadingText.textContent = 'Analyzing...';
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

  // Render the original product snapshot
  function renderOriginal(product) {
    els.originalName.textContent = product.name;
    els.originalBrand.textContent = product.brand;
    els.originalPrice.textContent = product.price || '';
    els.originalDesc.textContent = product.description || '';
    
    els.originalImage.innerHTML = '';
    els.originalImage.classList.remove('no-image');
    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.brand + ' ' + product.name;
      img.loading = 'lazy';
      img.onerror = function() { 
        this.parentElement.classList.add('no-image');
        this.parentElement.innerHTML = '✦';
      };
      els.originalImage.appendChild(img);
    } else {
      els.originalImage.classList.add('no-image');
      els.originalImage.innerHTML = '✦';
    }
    
    // Why people want it
    if (product.appeal) {
      els.originalContent.innerHTML = `
        <div class="original-appeal">
          <p class="appeal-label">Why people want it</p>
          <p class="appeal-text">${escapeHTML(product.appeal)}</p>
        </div>
      `;
    } else {
      els.originalContent.innerHTML = '';
    }
  }

  // Render a single dupe card with ranking and reasoning
  function renderDupeCard(dupe, rank, isTop) {
    const card = document.createElement('article');
    card.className = 'dupe-card' + (isTop ? ' dupe-card-top' : '');
    
    const rankLabel = rank === 1 ? 'Best Match' : rank === 2 ? 'Strong Alternative' : 'Alternative';
    const rankClass = rank === 1 ? 'rank-best' : rank === 2 ? 'rank-strong' : 'rank-alt';
    
    let retailersHTML = '';
    if (dupe.retailers && dupe.retailers.length) {
      retailersHTML = '<div class="dupe-retailers"><p class="dupe-retailers-label">Available at</p><div class="dupe-retailers-list">';
      dupe.retailers.slice(0, 3).forEach(r => {
        retailersHTML += `<a href="${escapeHTML(r.url)}" class="dupe-retailer-link" target="_blank" rel="noopener">${escapeHTML(r.name)}</a>`;
      });
      retailersHTML += '</div></div>';
    }
    
    let bestForHTML = '';
    if (dupe.bestFor && dupe.bestFor.length) {
      bestForHTML = '<div class="dupe-best-for"><p class="best-for-label">Best for</p><p class="best-for-text">' + dupe.bestFor.join(' · ') + '</p></div>';
    }
    
    let tradeoffsHTML = '';
    if (dupe.differences && rank > 1) {
      tradeoffsHTML = `<div class="dupe-tradeoffs"><p class="tradeoffs-label">Tradeoffs</p><p class="tradeoffs-text">${escapeHTML(dupe.differences)}</p></div>`;
    }
    
    // Image with fallback placeholder
    const imageHTML = dupe.image 
      ? `<img src="${escapeHTML(dupe.image)}" alt="${escapeHTML(dupe.name)}" class="dupe-image" loading="lazy" onerror="this.outerHTML='<div class=\\'dupe-image no-image\\'>✦</div>'">`
      : '<div class="dupe-image no-image">✦</div>';
    
    card.innerHTML = `
      <div class="dupe-rank ${rankClass}">${rankLabel}</div>
      <div class="dupe-header">
        ${imageHTML}
        <div class="dupe-meta">
          <h3 class="dupe-name">${escapeHTML(dupe.name)}</h3>
          <p class="dupe-brand">${escapeHTML(dupe.brand)}</p>
          <p class="dupe-price">${escapeHTML(dupe.priceRange || 'Price varies')}</p>
        </div>
      </div>
      <div class="dupe-body">
        <div class="dupe-reasoning">
          <p class="reasoning-label">Why this works</p>
          <p class="reasoning-text">${escapeHTML(dupe.reason)}</p>
        </div>
        ${bestForHTML}
        ${tradeoffsHTML}
        ${retailersHTML}
      </div>
    `;
    
    return card;
  }

  // Render "no good dupe" state
  function renderNoDupe(query) {
    els.originalName.textContent = query;
    els.originalBrand.textContent = '';
    els.originalPrice.textContent = '';
    els.originalDesc.textContent = '';
    els.originalImage.innerHTML = '';
    els.originalImage.classList.add('no-image');
    els.originalContent.innerHTML = '';
    els.dupesCount.textContent = '';
    els.dupesList.innerHTML = '';
    
    els.noResults.classList.remove('hidden');
    els.noResults.innerHTML = `
      <div class="no-results-content">
        <h3 class="no-results-title">Not in our database yet</h3>
        <p class="no-results-text">
          We haven't analyzed this product. The Dupe Edit only surfaces recommendations 
          we can stand behind — we don't aggregate random listings or echo unverified opinions.
        </p>
        <p class="no-results-text">
          If you'd like us to research this product, let us know.
        </p>
        <a href="mailto:hello@thedupeedit.com?subject=Dupe%20Request:%20${encodeURIComponent(query)}" class="request-btn">
          Request analysis
        </a>
      </div>
    `;
    
    showResults();
  }

  // Main render function
  function renderResults(query, product) {
    els.dupesList.innerHTML = '';
    els.noResults.classList.add('hidden');
    
    if (!product) {
      renderNoDupe(query);
      return;
    }
    
    renderOriginal(product);
    
    if (!product.dupes || !product.dupes.length) {
      els.dupesCount.textContent = '';
      els.noResults.classList.remove('hidden');
      els.noResults.innerHTML = `
        <div class="no-results-content">
          <h3 class="no-results-title">No good dupe right now</h3>
          <p class="no-results-text">
            We've analyzed this product and haven't found a dupe that meets our standards. 
            Some products are genuinely hard to replicate — the original may be worth it.
          </p>
        </div>
      `;
      showResults();
      return;
    }
    
    // Sort by match score and limit to max 4
    const sorted = product.dupes
      .slice()
      .sort((a, b) => (b.matchScore || 70) - (a.matchScore || 70))
      .slice(0, CONFIG.maxDupes);
    
    const count = sorted.length;
    els.dupesCount.textContent = count === 1 
      ? 'Our recommendation' 
      : count + ' ranked option' + (count > 1 ? 's' : '');
    
    sorted.forEach((dupe, i) => {
      els.dupesList.appendChild(renderDupeCard(dupe, i + 1, i === 0));
    });
    
    // Add honest assessment if available
    if (product.honestNote) {
      const note = document.createElement('div');
      note.className = 'honest-note';
      note.innerHTML = `
        <p class="honest-note-label">Honest assessment</p>
        <p class="honest-note-text">${escapeHTML(product.honestNote)}</p>
      `;
      els.dupesList.appendChild(note);
    }
    
    showResults();
  }

  // ============================================
  // Event Handlers
  // ============================================
  function handleSearch(e) {
    e.preventDefault();
    
    const query = els.searchInput.value.trim();
    if (query.length < CONFIG.minSearchLength) return;
    
    hideAutocomplete();
    showLoading();
    
    // Small delay for perceived thoroughness
    setTimeout(() => {
      const product = searchDatabase(query);
      hideLoading();
      renderResults(query, product);
      
      const url = new URL(window.location);
      url.searchParams.set('q', query);
      history.pushState({}, '', url);
    }, 400);
  }

  function handleChipClick(e) {
    const query = e.target.dataset.query;
    if (query) {
      els.searchInput.value = query;
      els.searchForm.dispatchEvent(new Event('submit'));
    }
  }
  
  // ============================================
  // Autocomplete Handlers
  // ============================================
  function handleAutocompleteInput() {
    const query = els.searchInput.value.trim();
    const suggestions = getAutocompleteSuggestions(query);
    
    if (suggestions.length === 0) {
      hideAutocomplete();
      return;
    }
    
    autocompleteIndex = -1;
    renderAutocomplete(suggestions);
  }
  
  function handleAutocompleteKeydown(e) {
    const items = els.autocompleteList.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      autocompleteIndex = Math.min(autocompleteIndex + 1, items.length - 1);
      updateAutocompleteSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      autocompleteIndex = Math.max(autocompleteIndex - 1, -1);
      updateAutocompleteSelection(items);
    } else if (e.key === 'Enter' && autocompleteIndex >= 0) {
      e.preventDefault();
      const selected = items[autocompleteIndex];
      if (selected) {
        els.searchInput.value = selected.dataset.query;
        hideAutocomplete();
        els.searchForm.dispatchEvent(new Event('submit'));
      }
    } else if (e.key === 'Escape') {
      hideAutocomplete();
    }
  }
  
  function updateAutocompleteSelection(items) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === autocompleteIndex);
    });
    if (autocompleteIndex >= 0 && items[autocompleteIndex]) {
      items[autocompleteIndex].scrollIntoView({ block: 'nearest' });
    }
  }
  
  function renderAutocomplete(suggestions) {
    els.autocompleteList.innerHTML = suggestions.map((s, i) => `
      <li class="autocomplete-item" role="option" data-query="${escapeHTML(s.display)}" data-index="${i}">
        <div class="autocomplete-item-info">
          <span class="autocomplete-item-name">${escapeHTML(s.name)}</span>
          <span class="autocomplete-item-brand">${escapeHTML(s.brand)}</span>
        </div>
        <span class="autocomplete-item-category">${escapeHTML(s.category)}</span>
      </li>
    `).join('');
    
    els.autocompleteList.classList.remove('hidden');
    
    // Add click handlers
    els.autocompleteList.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        els.searchInput.value = item.dataset.query;
        hideAutocomplete();
        els.searchForm.dispatchEvent(new Event('submit'));
      });
    });
  }
  
  function hideAutocomplete() {
    els.autocompleteList.classList.add('hidden');
    els.autocompleteList.innerHTML = '';
    autocompleteIndex = -1;
  }

  // ============================================
  // Initialize
  // ============================================
  function init() {
    initTheme();
    
    els.searchForm.addEventListener('submit', handleSearch);
    els.backButton.addEventListener('click', showSearch);
    els.themeToggle.addEventListener('click', toggleTheme);
    
    // Autocomplete handlers
    els.searchInput.addEventListener('input', handleAutocompleteInput);
    els.searchInput.addEventListener('keydown', handleAutocompleteKeydown);
    els.searchInput.addEventListener('blur', () => {
      setTimeout(() => hideAutocomplete(), 150);
    });
    els.searchInput.addEventListener('focus', () => {
      if (els.searchInput.value.length >= 2) {
        handleAutocompleteInput();
      }
    });
    
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('suggestion-chip')) {
        handleChipClick(e);
      }
    });
    
    els.chips.forEach(chip => chip.addEventListener('click', handleChipClick));
    
    // Email obfuscation for contact links
    initContactLinks();
    
    const urlQuery = new URL(window.location).searchParams.get('q');
    if (urlQuery) {
      els.searchInput.value = urlQuery;
      handleSearch(new Event('submit'));
    }
    
    window.addEventListener('popstate', function() {
      const q = new URL(window.location).searchParams.get('q');
      if (q) {
        els.searchInput.value = q;
        const product = searchDatabase(q);
        renderResults(q, product);
      } else {
        showSearch();
      }
    });
    
    els.searchInput.focus();
    
    if (window.DUPE_DATABASE) {
      console.log('The Dupe Edit loaded. ' + window.DUPE_DATABASE.products.length + ' products analyzed.');
    }
  }
  
  // ============================================
  // Contact Link Obfuscation
  // ============================================
  function initContactLinks() {
    // Obfuscated email parts (prevents scraping)
    const p1 = 'isfar';
    const p2 = 'baset';
    const p3 = 'gmail';
    const addr = p1 + '.' + p2 + '@' + p3 + '.com';
    
    // Request button in no-results section
    const requestBtn = $('#request-dupe-btn');
    if (requestBtn) {
      requestBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const searchQuery = els.searchInput?.value || 'Unknown product';
        const subject = encodeURIComponent('Product Request: ' + searchQuery);
        const body = encodeURIComponent('Hi,\n\nI\'d love to see dupes for: ' + searchQuery + '\n\nThanks!');
        window.location.href = 'mailto:' + addr + '?subject=' + subject + '&body=' + body;
      });
    }
    
    // Footer email link
    const footerEmail = $('#footer-email');
    if (footerEmail) {
      footerEmail.addEventListener('click', function(e) {
        e.preventDefault();
        const subject = encodeURIComponent('Product Request for The Dupe Edit');
        const body = encodeURIComponent('Hi,\n\nI\'d love to see dupes for: [PRODUCT NAME]\n\nThanks!');
        window.location.href = 'mailto:' + addr + '?subject=' + subject + '&body=' + body;
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
