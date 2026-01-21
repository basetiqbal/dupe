/**
 * THE DUPE EDIT — Data Loader & Registry
 * 
 * Central module for loading and managing modular data files.
 * Handles lazy loading, caching, and data registry for the application.
 * 
 * Supports:
 * - Synchronous loading (current static files)
 * - Lazy loading by category (future optimization)
 * - Data validation against schemas
 * - Hot reloading in development
 */

window.DUPE_DATA_LOADER = {
  version: '1.0.0',
  
  // Data registry - tracks what's loaded
  registry: {
    brands: { loaded: false, data: null, source: null },
    products: { loaded: false, data: null, source: null },
    fragranceSignals: { loaded: false, data: null, source: null },
    beautySignals: { loaded: false, data: null, source: null },
    schemas: { loaded: false, data: null, source: null }
  },
  
  // Loading state
  state: {
    initialized: false,
    loading: false,
    errors: []
  },

  /**
   * Initialize all data modules
   * Call this once on app startup
   */
  async initialize() {
    if (this.state.initialized) {
      console.log('[DataLoader] Already initialized');
      return true;
    }
    
    this.state.loading = true;
    console.log('[DataLoader] Initializing...');
    
    try {
      // Check for globally available data (synchronous loads via script tags)
      this.registerGlobalData();
      
      // Build unified product index
      this.buildProductIndex();
      
      this.state.initialized = true;
      this.state.loading = false;
      
      console.log('[DataLoader] Initialization complete');
      this.logStatus();
      
      return true;
    } catch (error) {
      this.state.errors.push(error);
      this.state.loading = false;
      console.error('[DataLoader] Initialization failed:', error);
      return false;
    }
  },

  /**
   * Register data from global window objects
   * (For synchronous script tag loading)
   */
  registerGlobalData() {
    // Schemas
    if (window.DUPE_SCHEMAS) {
      this.registry.schemas = {
        loaded: true,
        data: window.DUPE_SCHEMAS,
        source: 'global'
      };
    }
    
    // Brands
    if (window.BRAND_REGISTRY) {
      this.registry.brands = {
        loaded: true,
        data: window.BRAND_REGISTRY,
        source: 'global'
      };
    }
    
    // Products (legacy format)
    if (window.DUPE_DATABASE) {
      this.registry.products = {
        loaded: true,
        data: window.DUPE_DATABASE,
        source: 'global'
      };
    }
    
    // Fragrance signals
    if (window.FRAGRANCE_SIGNALS) {
      this.registry.fragranceSignals = {
        loaded: true,
        data: window.FRAGRANCE_SIGNALS,
        source: 'global'
      };
    }
    
    // Beauty signals
    if (window.BEAUTY_SIGNALS) {
      this.registry.beautySignals = {
        loaded: true,
        data: window.BEAUTY_SIGNALS,
        source: 'global'
      };
    }
  },

  /**
   * Build a unified product index for fast lookups
   */
  buildProductIndex() {
    if (!this.registry.products.loaded) return;
    
    const products = this.registry.products.data.products || [];
    
    // Index by ID
    const byId = new Map();
    // Index by brand
    const byBrand = new Map();
    // Index by category
    const byCategory = new Map();
    // Full-text search index
    const searchTerms = new Map();
    
    for (const product of products) {
      // By ID
      byId.set(product.id, product);
      
      // By brand
      const brandKey = product.brand.toLowerCase();
      if (!byBrand.has(brandKey)) {
        byBrand.set(brandKey, []);
      }
      byBrand.get(brandKey).push(product);
      
      // By category
      const catKey = product.category;
      if (!byCategory.has(catKey)) {
        byCategory.set(catKey, []);
      }
      byCategory.get(catKey).push(product);
      
      // Search terms
      const terms = [
        product.name.toLowerCase(),
        product.brand.toLowerCase(),
        ...(product.aliases || []).map(a => a.toLowerCase())
      ];
      
      for (const term of terms) {
        if (!searchTerms.has(term)) {
          searchTerms.set(term, []);
        }
        searchTerms.get(term).push(product.id);
      }
    }
    
    // Store indices
    this.indices = {
      byId,
      byBrand,
      byCategory,
      searchTerms,
      totalProducts: products.length,
      totalDupes: products.reduce((sum, p) => sum + (p.dupes?.length || 0), 0)
    };
    
    console.log(`[DataLoader] Index built: ${this.indices.totalProducts} products, ${this.indices.totalDupes} dupes`);
  },

  /**
   * Get product by ID
   */
  getProduct(id) {
    return this.indices?.byId?.get(id) || null;
  },

  /**
   * Get products by brand
   */
  getProductsByBrand(brand) {
    const key = brand.toLowerCase();
    return this.indices?.byBrand?.get(key) || [];
  },

  /**
   * Get products by category
   */
  getProductsByCategory(category) {
    return this.indices?.byCategory?.get(category) || [];
  },

  /**
   * Get signals for a product
   */
  getSignals(productId, category) {
    if (category === 'fragrance' && this.registry.fragranceSignals.loaded) {
      return this.registry.fragranceSignals.data.getProfile(productId);
    }
    
    if (['makeup', 'skincare'].includes(category) && this.registry.beautySignals.loaded) {
      return this.registry.beautySignals.data.getProfile(productId);
    }
    
    return null;
  },

  /**
   * Get brand information
   */
  getBrand(brandId) {
    if (!this.registry.brands.loaded) return null;
    return this.registry.brands.data.getBrand(brandId);
  },

  /**
   * Log current data status
   */
  logStatus() {
    console.log('[DataLoader] Status:');
    Object.entries(this.registry).forEach(([key, value]) => {
      console.log(`  ${key}: ${value.loaded ? '✓' : '✗'} (source: ${value.source || 'none'})`);
    });
    
    if (this.indices) {
      console.log(`  Products indexed: ${this.indices.totalProducts}`);
      console.log(`  Dupes indexed: ${this.indices.totalDupes}`);
    }
  },

  /**
   * Validate data against schemas
   */
  validateData() {
    const errors = [];
    const schemas = this.registry.schemas.data;
    
    if (!schemas) {
      errors.push('Schemas not loaded');
      return { valid: false, errors };
    }
    
    // Validate products
    if (this.registry.products.loaded) {
      const products = this.registry.products.data.products || [];
      
      for (const product of products) {
        const result = schemas.validate(product, 'luxuryProduct');
        if (!result.valid) {
          errors.push(`Product ${product.id}: ${result.errors.join(', ')}`);
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Get statistics about loaded data
   */
  getStats() {
    const stats = {
      initialized: this.state.initialized,
      modulesLoaded: Object.values(this.registry).filter(r => r.loaded).length,
      totalModules: Object.keys(this.registry).length,
      products: {
        total: this.indices?.totalProducts || 0,
        dupes: this.indices?.totalDupes || 0,
        categories: this.indices?.byCategory ? Array.from(this.indices.byCategory.keys()) : []
      },
      brands: {
        total: this.registry.brands.loaded ? 
          Object.keys(this.registry.brands.data.brands || {}).length : 0
      },
      signals: {
        fragrance: this.registry.fragranceSignals.loaded ?
          Object.keys(this.registry.fragranceSignals.data.profiles || {}).length : 0,
        beauty: this.registry.beautySignals.loaded ?
          Object.keys(this.registry.beautySignals.data.makeup || {}).length +
          Object.keys(this.registry.beautySignals.data.skincare || {}).length : 0
      }
    };
    
    return stats;
  }
};

// ============================================
// FUTURE SCALABILITY: Dynamic Data Loading
// ============================================

/**
 * Dynamic JSON loader for future modular data files
 * Currently stubbed - will be used when migrating to fetch-based loading
 */
window.DUPE_DYNAMIC_LOADER = {
  cache: new Map(),
  
  /**
   * Load a JSON file dynamically
   * @param {string} path - Path to JSON file
   * @param {Object} options - Loading options
   */
  async loadJSON(path, options = {}) {
    const { cache = true, validate = false } = options;
    
    // Check cache
    if (cache && this.cache.has(path)) {
      return this.cache.get(path);
    }
    
    try {
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${path}: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate if requested
      if (validate && window.DUPE_SCHEMAS) {
        // Determine schema type from path
        const schemaType = this.inferSchemaType(path);
        if (schemaType) {
          const result = window.DUPE_SCHEMAS.validate(data, schemaType);
          if (!result.valid) {
            console.warn(`Validation warnings for ${path}:`, result.errors);
          }
        }
      }
      
      // Cache result
      if (cache) {
        this.cache.set(path, data);
      }
      
      return data;
    } catch (error) {
      console.error(`[DynamicLoader] Error loading ${path}:`, error);
      throw error;
    }
  },
  
  /**
   * Infer schema type from file path
   */
  inferSchemaType(path) {
    if (path.includes('brands')) return 'brand';
    if (path.includes('signals')) return null; // Signals have nested structure
    if (path.includes('products')) return 'luxuryProduct';
    return null;
  },
  
  /**
   * Preload multiple files in parallel
   */
  async preload(paths) {
    return Promise.all(paths.map(p => this.loadJSON(p)));
  },
  
  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
};
