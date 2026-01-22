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
    
    for (const product of window.DUPE_DATABASE.products) {
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
      img.onerror = function() { this.parentElement.classList.add('no-image'); };
      els.originalImage.appendChild(img);
    } else {
      els.originalImage.classList.add('no-image');
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
    
    card.innerHTML = `
      <div class="dupe-rank ${rankClass}">${rankLabel}</div>
      <div class="dupe-header">
        ${dupe.image ? `<img src="${escapeHTML(dupe.image)}" alt="${escapeHTML(dupe.name)}" class="dupe-image" loading="lazy">` : '<div class="dupe-image no-image"></div>'}
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
  // Initialize
  // ============================================
  function init() {
    initTheme();
    
    els.searchForm.addEventListener('submit', handleSearch);
    els.backButton.addEventListener('click', showSearch);
    els.themeToggle.addEventListener('click', toggleTheme);
    
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('suggestion-chip')) {
        handleChipClick(e);
      }
    });
    
    els.chips.forEach(chip => chip.addEventListener('click', handleChipClick));
    
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
