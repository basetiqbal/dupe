/**
 * THE DUPE EDIT — Data Schemas & Validation
 * 
 * This file defines the canonical schemas for all data types in the system.
 * Schemas are used for:
 * 1. Runtime validation of loaded data
 * 2. Documentation of expected data structure
 * 3. Build-time validation during data ingestion
 * 4. Type hints for IDE support
 * 
 * Architecture Principle: All data flows through normalized schemas.
 * This ensures consistency whether data comes from:
 * - Hand-curated JSON files
 * - Web scraping pipelines
 * - API integrations
 * - User submissions (future)
 */

window.DUPE_SCHEMAS = {
  version: '2.0.0',

  // ============================================
  // BRAND METADATA SCHEMA
  // ============================================
  brand: {
    required: ['id', 'name', 'tier'],
    optional: ['website', 'country', 'founded', 'parentCompany', 'description', 'categories'],
    
    /**
     * @typedef {Object} Brand
     * @property {string} id - Unique identifier (kebab-case)
     * @property {string} name - Display name
     * @property {'luxury'|'prestige'|'masstige'|'drugstore'|'indie'|'niche'} tier - Price/positioning tier
     * @property {string} [website] - Official website URL
     * @property {string} [country] - Country of origin (ISO 3166-1 alpha-2)
     * @property {number} [founded] - Year founded
     * @property {string} [parentCompany] - Parent company name
     * @property {string} [description] - Brief brand description
     * @property {string[]} [categories] - Categories the brand operates in
     */
    tiers: {
      'luxury': { priceMultiplier: 4.0, trustScore: 0.95, description: 'Ultra-premium, heritage houses' },
      'prestige': { priceMultiplier: 2.5, trustScore: 0.90, description: 'High-end department store brands' },
      'niche': { priceMultiplier: 3.0, trustScore: 0.85, description: 'Specialized, artisanal brands' },
      'masstige': { priceMultiplier: 1.5, trustScore: 0.80, description: 'Mass-market premium' },
      'indie': { priceMultiplier: 1.2, trustScore: 0.75, description: 'Independent, emerging brands' },
      'drugstore': { priceMultiplier: 1.0, trustScore: 0.70, description: 'Mass-market accessible' }
    }
  },

  // ============================================
  // LUXURY PRODUCT SCHEMA
  // ============================================
  luxuryProduct: {
    required: ['id', 'name', 'brandId', 'category'],
    optional: [
      'subcategory', 'price', 'priceValue', 'currency', 'size', 'sizeUnit',
      'description', 'aliases', 'launchYear', 'discontinued', 'imageUrl',
      'signals', 'dupeIds'
    ],
    
    /**
     * @typedef {Object} LuxuryProduct
     * @property {string} id - Unique identifier (kebab-case)
     * @property {string} name - Product name
     * @property {string} brandId - Reference to brand.id
     * @property {'fragrance'|'makeup'|'skincare'|'haircare'|'bodycare'} category
     * @property {string} [subcategory] - Category-specific subcategory
     * @property {string} [price] - Human-readable price string
     * @property {number} [priceValue] - Numeric price for calculations
     * @property {string} [currency] - ISO 4217 currency code (default: USD)
     * @property {number} [size] - Product size value
     * @property {string} [sizeUnit] - Unit of measurement (ml, oz, g)
     * @property {string} [description] - Editorial description
     * @property {string[]} [aliases] - Alternative names/search terms
     * @property {number} [launchYear] - Year product was launched
     * @property {boolean} [discontinued] - Whether product is discontinued
     * @property {string} [imageUrl] - Product image URL
     * @property {Object} [signals] - Normalized comparison signals
     * @property {string[]} [dupeIds] - References to dupe product IDs
     */
    categories: {
      'fragrance': {
        subcategories: ['eau-de-parfum', 'eau-de-toilette', 'parfum', 'cologne', 'body-mist'],
        sizeUnits: ['ml', 'oz'],
        signalTypes: ['scent', 'performance', 'vibe']
      },
      'makeup': {
        subcategories: ['lipstick', 'lip-gloss', 'foundation', 'concealer', 'blush', 'bronzer', 'highlighter', 'eyeshadow', 'mascara', 'eyeliner', 'brow', 'primer', 'setting'],
        sizeUnits: ['g', 'oz', 'ml'],
        signalTypes: ['color', 'finish', 'coverage', 'formula']
      },
      'skincare': {
        subcategories: ['moisturizer', 'serum', 'cleanser', 'toner', 'mask', 'eye-cream', 'sunscreen', 'oil', 'exfoliant', 'treatment'],
        sizeUnits: ['ml', 'oz', 'g'],
        signalTypes: ['ingredients', 'concerns', 'skinType', 'texture']
      },
      'haircare': {
        subcategories: ['shampoo', 'conditioner', 'treatment', 'styling', 'oil', 'mask'],
        sizeUnits: ['ml', 'oz'],
        signalTypes: ['hairType', 'concerns', 'ingredients']
      },
      'bodycare': {
        subcategories: ['lotion', 'cream', 'oil', 'scrub', 'wash'],
        sizeUnits: ['ml', 'oz', 'g'],
        signalTypes: ['scent', 'texture', 'ingredients']
      }
    }
  },

  // ============================================
  // DUPE PRODUCT SCHEMA
  // ============================================
  dupeProduct: {
    required: ['id', 'name', 'brandId', 'category', 'luxuryProductId'],
    optional: [
      'subcategory', 'priceRange', 'priceMin', 'priceMax', 'currency',
      'size', 'sizeUnit', 'matchScore', 'reason', 'differences',
      'bestFor', 'signals', 'verifiedDate', 'source', 'discontinued'
    ],
    
    /**
     * @typedef {Object} DupeProduct
     * @property {string} id - Unique identifier (kebab-case)
     * @property {string} name - Product name
     * @property {string} brandId - Reference to brand.id
     * @property {'fragrance'|'makeup'|'skincare'|'haircare'|'bodycare'} category
     * @property {string} luxuryProductId - Reference to luxury product being duped
     * @property {string} [subcategory] - Category-specific subcategory
     * @property {string} [priceRange] - Human-readable price range
     * @property {number} [priceMin] - Minimum price for calculations
     * @property {number} [priceMax] - Maximum price for calculations
     * @property {string} [currency] - ISO 4217 currency code (default: USD)
     * @property {number} [size] - Product size value
     * @property {string} [sizeUnit] - Unit of measurement
     * @property {number} [matchScore] - Overall similarity score (0-100)
     * @property {string} [reason] - Why this is a good dupe
     * @property {string} [differences] - Key differences from original
     * @property {string[]} [bestFor] - Who this dupe is best suited for
     * @property {Object} [signals] - Normalized comparison signals
     * @property {string} [verifiedDate] - ISO date when dupe was last verified
     * @property {string} [source] - Source of dupe information
     * @property {boolean} [discontinued] - Whether product is discontinued
     */
  },

  // ============================================
  // SIGNAL SCHEMAS (Normalized Comparison Data)
  // ============================================
  signals: {
    /**
     * Signals are normalized descriptors that enable multi-dimensional matching.
     * Each signal type has defined vocabulary for consistency.
     */
    
    // FRAGRANCE SIGNALS
    scent: {
      required: ['family', 'topNotes', 'heartNotes', 'baseNotes'],
      optional: ['accords', 'dominant', 'sillage', 'longevity', 'projection'],
      
      families: [
        'floral', 'oriental', 'woody', 'fresh', 'citrus', 'aromatic',
        'chypre', 'fougere', 'gourmand', 'aquatic', 'green', 'spicy',
        'leather', 'animalic', 'amber', 'musk', 'oud', 'fruity'
      ],
      
      notes: [
        // Top notes (typically)
        'bergamot', 'lemon', 'orange', 'grapefruit', 'lime', 'mandarin',
        'pink-pepper', 'black-pepper', 'cardamom', 'saffron', 'ginger',
        'lavender', 'mint', 'basil', 'rosemary',
        
        // Heart notes (typically)
        'rose', 'jasmine', 'ylang-ylang', 'tuberose', 'iris', 'violet',
        'peony', 'magnolia', 'gardenia', 'lily', 'orange-blossom', 'neroli',
        'geranium', 'carnation',
        
        // Base notes (typically)
        'sandalwood', 'cedar', 'vetiver', 'patchouli', 'oud', 'amber',
        'musk', 'vanilla', 'tonka', 'benzoin', 'labdanum', 'incense',
        'leather', 'tobacco', 'coffee', 'chocolate', 'caramel', 'praline'
      ],
      
      accords: [
        'amber', 'woody', 'floral', 'fresh', 'sweet', 'spicy', 'powdery',
        'creamy', 'smoky', 'warm', 'cool', 'airy', 'dense', 'linear',
        'complex', 'natural', 'synthetic'
      ],
      
      // Performance metrics (scale 1-10)
      performanceScales: {
        sillage: { min: 1, max: 10, labels: ['intimate', 'moderate', 'strong', 'beast'] },
        longevity: { min: 1, max: 10, labels: ['1-2hrs', '3-5hrs', '6-8hrs', '8-12hrs', '12+hrs'] },
        projection: { min: 1, max: 10, labels: ['skin', 'close', 'moderate', 'strong', 'enormous'] }
      }
    },
    
    // MAKEUP COLOR SIGNALS
    color: {
      required: ['family', 'undertone'],
      optional: ['hexCode', 'intensity', 'depth', 'finish', 'shimmer'],
      
      families: [
        'nude', 'pink', 'red', 'coral', 'berry', 'plum', 'mauve',
        'brown', 'orange', 'peach', 'burgundy', 'wine', 'terracotta',
        'neutral', 'bronze', 'gold', 'silver', 'rose-gold'
      ],
      
      undertones: ['warm', 'cool', 'neutral'],
      
      depths: ['light', 'medium', 'deep', 'dark'],
      
      finishes: [
        'matte', 'satin', 'cream', 'sheer', 'glossy', 'metallic',
        'shimmer', 'glitter', 'velvet', 'dewy', 'natural'
      ]
    },
    
    // SKINCARE INGREDIENT SIGNALS
    ingredients: {
      required: ['keyActives'],
      optional: ['heroIngredient', 'concerns', 'skinTypes', 'avoidIf', 'concentration'],
      
      actives: [
        'retinol', 'retinal', 'tretinoin', 'vitamin-c', 'niacinamide',
        'hyaluronic-acid', 'salicylic-acid', 'glycolic-acid', 'lactic-acid',
        'azelaic-acid', 'benzoyl-peroxide', 'peptides', 'ceramides',
        'squalane', 'bakuchiol', 'alpha-arbutin', 'tranexamic-acid',
        'kojic-acid', 'centella', 'snail-mucin', 'propolis', 'zinc'
      ],
      
      concerns: [
        'aging', 'fine-lines', 'wrinkles', 'dark-spots', 'hyperpigmentation',
        'acne', 'breakouts', 'pores', 'texture', 'dullness', 'dehydration',
        'dryness', 'oiliness', 'sensitivity', 'redness', 'rosacea',
        'firmness', 'elasticity', 'barrier-repair', 'brightening'
      ],
      
      skinTypes: ['dry', 'oily', 'combination', 'normal', 'sensitive', 'mature']
    },
    
    // VIBE/AESTHETIC SIGNALS (Cross-category)
    vibe: {
      required: [],
      optional: ['aesthetic', 'occasion', 'season', 'demographic', 'mood'],
      
      aesthetics: [
        'classic', 'modern', 'minimalist', 'maximalist', 'editorial',
        'natural', 'bold', 'subtle', 'romantic', 'edgy', 'clean',
        'luxurious', 'approachable', 'statement', 'everyday'
      ],
      
      occasions: [
        'everyday', 'office', 'date-night', 'special-occasion', 'wedding',
        'party', 'casual', 'formal', 'travel', 'gym', 'beach'
      ],
      
      seasons: ['spring', 'summer', 'fall', 'winter', 'all-season'],
      
      moods: [
        'confident', 'romantic', 'mysterious', 'fresh', 'cozy', 'sophisticated',
        'playful', 'sensual', 'energetic', 'calming', 'powerful'
      ]
    },
    
    // PERFORMANCE SIGNALS (Cross-category)
    performance: {
      required: [],
      optional: ['longevity', 'buildability', 'transferResistance', 'ease', 'value'],
      
      scales: {
        longevity: { min: 1, max: 10, labels: ['poor', 'fair', 'good', 'excellent', 'exceptional'] },
        buildability: { min: 1, max: 10, labels: ['none', 'slight', 'moderate', 'high'] },
        transferResistance: { min: 1, max: 10, labels: ['transfers', 'some-transfer', 'minimal', 'transfer-proof'] },
        ease: { min: 1, max: 10, labels: ['difficult', 'learning-curve', 'easy', 'foolproof'] },
        value: { min: 1, max: 10, labels: ['poor', 'fair', 'good', 'excellent', 'exceptional'] }
      }
    }
  },

  // ============================================
  // VALIDATION UTILITIES
  // ============================================
  
  /**
   * Validate an object against a schema
   * @param {Object} data - Data to validate
   * @param {string} schemaType - Schema type to validate against
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate(data, schemaType) {
    const schema = this[schemaType];
    if (!schema) {
      return { valid: false, errors: [`Unknown schema type: ${schemaType}`] };
    }
    
    const errors = [];
    
    // Check required fields
    if (schema.required) {
      for (const field of schema.required) {
        if (!(field in data) || data[field] === null || data[field] === undefined) {
          errors.push(`Missing required field: ${field}`);
        }
      }
    }
    
    // Check for unknown fields (warning only)
    if (schema.required && schema.optional) {
      const allowedFields = new Set([...schema.required, ...schema.optional]);
      for (const field of Object.keys(data)) {
        if (!allowedFields.has(field)) {
          // This is a warning, not an error - allows for forward compatibility
          console.warn(`Unknown field "${field}" in ${schemaType} schema`);
        }
      }
    }
    
    return { valid: errors.length === 0, errors };
  },

  /**
   * Normalize a product for consistent comparison
   * @param {Object} product - Raw product data
   * @returns {Object} - Normalized product
   */
  normalizeProduct(product) {
    return {
      ...product,
      id: product.id || this.generateId(product.name, product.brandId),
      name: (product.name || '').trim(),
      brandId: (product.brandId || product.brand || '').toLowerCase().replace(/\s+/g, '-'),
      category: (product.category || '').toLowerCase(),
      subcategory: (product.subcategory || '').toLowerCase().replace(/\s+/g, '-'),
      aliases: (product.aliases || []).map(a => a.toLowerCase().trim())
    };
  },

  /**
   * Generate a deterministic ID from name and brand
   * @param {string} name 
   * @param {string} brandId 
   * @returns {string}
   */
  generateId(name, brandId) {
    const base = `${brandId}-${name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return base;
  }
};

// Freeze schemas to prevent mutation
Object.freeze(window.DUPE_SCHEMAS);
