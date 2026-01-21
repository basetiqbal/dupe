/**
 * THE DUPE EDIT — Search Resolution Pipeline
 * 
 * This module handles the complete flow from user input to ranked dupe results.
 * 
 * Pipeline Stages:
 * 1. INPUT NORMALIZATION - Clean and standardize user query
 * 2. CANDIDATE RETRIEVAL - Find potential luxury product matches
 * 3. FUZZY MATCHING - Score and rank candidates with error tolerance
 * 4. CANONICAL RESOLUTION - Select the best matching luxury product
 * 5. DUPE RETRIEVAL - Fetch all dupes for the resolved product
 * 6. SIGNAL ENRICHMENT - Attach signal profiles for scoring
 * 7. SCORING & RANKING - Calculate similarity and rank dupes
 * 8. OUTPUT FORMATTING - Structure results for frontend consumption
 * 
 * Design Goals:
 * - Fast (< 50ms for entire pipeline)
 * - Forgiving (handles typos, abbreviations, partial names)
 * - Explainable (every decision can be traced)
 * - Extensible (easy to add new stages or modify existing)
 */

window.DUPE_SEARCH_PIPELINE = {
  version: '1.0.0',

  // ============================================
  // CONFIGURATION
  // ============================================
  config: {
    minQueryLength: 2,
    maxResults: 10,
    minConfidenceThreshold: 0.35,
    fuzzyMatchThreshold: 0.4,
    
    // Scoring weights for search matching
    searchWeights: {
      exactMatch: 1.0,
      nameMatch: 0.85,
      brandMatch: 0.6,
      aliasMatch: 0.8,
      categoryMatch: 0.3
    },
    
    // Common abbreviations and their expansions
    abbreviations: {
      'mfk': 'maison francis kurkdjian',
      'tf': 'tom ford',
      'ct': 'charlotte tilbury',
      'pdm': 'parfums de marly',
      'bdc': 'bleu de chanel',
      'br540': 'baccarat rouge 540',
      'ysl': 'yves saint laurent',
      'de': 'drunk elephant',
      'lrp': 'la roche-posay',
      'to': 'the ordinary',
      'edp': 'eau de parfum',
      'edt': 'eau de toilette',
      'hff': 'hollywood flawless filter',
      'cdnim': 'club de nuit intense man'
    },
    
    // Common misspellings
    corrections: {
      'bacarat': 'baccarat',
      'baccarrat': 'baccarat',
      'kurkdijan': 'kurkdjian',
      'kurkdjin': 'kurkdjian',
      'parfum de marly': 'parfums de marly',
      'tillbury': 'tilbury',
      'tilberry': 'tilbury',
      'sauvge': 'sauvage',
      'sauvauge': 'sauvage',
      'avantus': 'aventus',
      'aventis': 'aventus'
    }
  },

  // ============================================
  // STAGE 1: INPUT NORMALIZATION
  // ============================================
  
  /**
   * Normalize user input for consistent matching
   * @param {string} rawQuery - User's raw input
   * @returns {Object} - Normalized query with metadata
   */
  normalizeInput(rawQuery) {
    if (!rawQuery || typeof rawQuery !== 'string') {
      return { normalized: '', original: '', tokens: [], valid: false };
    }
    
    let query = rawQuery.trim().toLowerCase();
    const original = query;
    
    // Expand known abbreviations
    Object.entries(this.config.abbreviations).forEach(([abbr, full]) => {
      const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
      query = query.replace(regex, full);
    });
    
    // Apply spelling corrections
    Object.entries(this.config.corrections).forEach(([wrong, right]) => {
      query = query.replace(new RegExp(wrong, 'gi'), right);
    });
    
    // Remove diacritics
    query = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Normalize special characters
    query = query
      .replace(/['']/g, "'")
      .replace(/[""]/g, '"')
      .replace(/[–—]/g, '-');
    
    // Clean up punctuation but keep meaningful chars
    const cleaned = query
      .replace(/[^a-z0-9\s'-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Tokenize for word-based matching
    const tokens = cleaned.split(' ').filter(t => t.length > 1);
    
    return {
      normalized: cleaned,
      original,
      tokens,
      expanded: query !== original,
      valid: cleaned.length >= this.config.minQueryLength
    };
  },

  // ============================================
  // STAGE 2 & 3: CANDIDATE RETRIEVAL & FUZZY MATCHING
  // ============================================
  
  /**
   * Find potential product matches using fuzzy matching
   * @param {Object} normalizedQuery - Output from normalizeInput
   * @param {Object[]} products - Product database
   * @returns {Object[]} - Ranked candidates with scores
   */
  findCandidates(normalizedQuery, products) {
    if (!normalizedQuery.valid || !products || products.length === 0) {
      return [];
    }
    
    const { normalized, tokens } = normalizedQuery;
    const candidates = [];
    
    for (const product of products) {
      const scores = this.calculateMatchScore(normalized, tokens, product);
      
      if (scores.total >= this.config.fuzzyMatchThreshold) {
        candidates.push({
          product,
          scores,
          confidence: scores.total
        });
      }
    }
    
    // Sort by score descending
    candidates.sort((a, b) => b.confidence - a.confidence);
    
    return candidates;
  },

  /**
   * Calculate match score between query and product
   */
  calculateMatchScore(query, tokens, product) {
    const scores = {
      name: 0,
      brand: 0,
      combined: 0,
      alias: 0,
      category: 0,
      total: 0,
      matchedOn: []
    };
    
    const weights = this.config.searchWeights;
    
    // Normalize product fields for comparison
    const productName = (product.name || '').toLowerCase();
    const productBrand = (product.brand || '').toLowerCase();
    const combined = `${productBrand} ${productName}`;
    const aliases = (product.aliases || []).map(a => a.toLowerCase());
    const category = (product.category || '').toLowerCase();
    
    // Check for exact match first
    if (productName === query || combined === query) {
      scores.total = weights.exactMatch;
      scores.matchedOn.push('exact');
      return scores;
    }
    
    // Name similarity
    scores.name = this.fuzzyMatch(query, productName);
    if (scores.name > 0.6) scores.matchedOn.push('name');
    
    // Brand similarity
    scores.brand = this.fuzzyMatch(query, productBrand);
    if (scores.brand > 0.6) scores.matchedOn.push('brand');
    
    // Combined similarity
    scores.combined = this.fuzzyMatch(query, combined);
    if (scores.combined > 0.6) scores.matchedOn.push('combined');
    
    // Alias matching
    for (const alias of aliases) {
      const aliasScore = this.fuzzyMatch(query, alias);
      if (aliasScore > scores.alias) {
        scores.alias = aliasScore;
        if (aliasScore > 0.6) scores.matchedOn.push('alias');
      }
    }
    
    // Category matching (lower weight)
    if (tokens.includes(category)) {
      scores.category = 0.5;
      scores.matchedOn.push('category');
    }
    
    // Token-based matching
    const tokenScore = this.tokenMatch(tokens, combined);
    
    // Calculate weighted total
    scores.total = Math.max(
      scores.name * weights.nameMatch,
      scores.brand * weights.brandMatch,
      scores.combined * weights.nameMatch,
      scores.alias * weights.aliasMatch,
      tokenScore * 0.75
    );
    
    // Boost for category match
    if (scores.category > 0) {
      scores.total = Math.min(1, scores.total + 0.1);
    }
    
    return scores;
  },

  /**
   * Fuzzy string matching using multiple techniques
   */
  fuzzyMatch(query, target) {
    if (!query || !target) return 0;
    
    // Exact match
    if (query === target) return 1.0;
    
    // Contains
    if (target.includes(query)) return 0.9;
    if (query.includes(target)) return 0.85;
    
    // Levenshtein-based similarity for short strings
    if (query.length <= 15 && target.length <= 15) {
      const distance = this.levenshteinDistance(query, target);
      const maxLen = Math.max(query.length, target.length);
      const similarity = 1 - (distance / maxLen);
      if (similarity > 0.7) return similarity;
    }
    
    // N-gram similarity for longer strings
    const ngramSim = this.ngramSimilarity(query, target, 2);
    
    // Word overlap
    const wordSim = this.wordOverlap(query, target);
    
    return Math.max(ngramSim, wordSim);
  },

  /**
   * Token-based matching
   */
  tokenMatch(queryTokens, target) {
    const targetTokens = target.split(' ').filter(t => t.length > 1);
    let matches = 0;
    
    for (const qt of queryTokens) {
      for (const tt of targetTokens) {
        if (tt.includes(qt) || qt.includes(tt)) {
          matches++;
          break;
        }
      }
    }
    
    return queryTokens.length > 0 ? matches / queryTokens.length : 0;
  },

  /**
   * Levenshtein distance
   */
  levenshteinDistance(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    
    return dp[m][n];
  },

  /**
   * N-gram similarity (Jaccard)
   */
  ngramSimilarity(s1, s2, n = 2) {
    const getNgrams = (str) => {
      const grams = new Set();
      for (let i = 0; i <= str.length - n; i++) {
        grams.add(str.substring(i, i + n));
      }
      return grams;
    };
    
    const grams1 = getNgrams(s1);
    const grams2 = getNgrams(s2);
    
    const intersection = [...grams1].filter(g => grams2.has(g)).length;
    const union = new Set([...grams1, ...grams2]).size;
    
    return union > 0 ? intersection / union : 0;
  },

  /**
   * Word overlap coefficient
   */
  wordOverlap(s1, s2) {
    const words1 = new Set(s1.split(' ').filter(w => w.length > 1));
    const words2 = new Set(s2.split(' ').filter(w => w.length > 1));
    
    const intersection = [...words1].filter(w => words2.has(w)).length;
    const minSize = Math.min(words1.size, words2.size);
    
    return minSize > 0 ? intersection / minSize : 0;
  },

  // ============================================
  // STAGE 4: CANONICAL RESOLUTION
  // ============================================
  
  /**
   * Resolve to the best matching canonical product
   * @param {Object[]} candidates - Ranked candidates from findCandidates
   * @returns {Object|null} - Best match or null
   */
  resolveCanonical(candidates) {
    if (!candidates || candidates.length === 0) {
      return null;
    }
    
    const best = candidates[0];
    
    // If confidence is too low, return null
    if (best.confidence < this.config.minConfidenceThreshold) {
      return null;
    }
    
    // If there's a clear winner (significantly better than second place)
    if (candidates.length > 1) {
      const second = candidates[1];
      const gap = best.confidence - second.confidence;
      
      // Close match - might want to show disambiguation in UI
      if (gap < 0.1 && best.confidence < 0.8) {
        return {
          resolved: best.product,
          confidence: best.confidence,
          matchDetails: best.scores,
          ambiguous: true,
          alternatives: candidates.slice(1, 4).map(c => ({
            product: c.product,
            confidence: c.confidence
          }))
        };
      }
    }
    
    return {
      resolved: best.product,
      confidence: best.confidence,
      matchDetails: best.scores,
      ambiguous: false
    };
  },

  // ============================================
  // STAGE 5 & 6: DUPE RETRIEVAL & ENRICHMENT
  // ============================================
  
  /**
   * Get dupes for a resolved product and enrich with signals
   * @param {Object} product - Resolved luxury product
   * @returns {Object[]} - Enriched dupe products
   */
  getDupesWithSignals(product) {
    if (!product || !product.dupes) {
      return [];
    }
    
    const enrichedDupes = product.dupes.map(dupe => {
      // Get brand info
      const brandInfo = window.BRAND_REGISTRY?.getBrand(
        dupe.brand?.toLowerCase().replace(/\s+/g, '-')
      );
      
      // Get signal profile if available
      let signals = null;
      if (product.category === 'fragrance' && window.FRAGRANCE_SIGNALS) {
        const dupeId = this.generateProductId(dupe.name, dupe.brand);
        signals = window.FRAGRANCE_SIGNALS.getProfile(dupeId);
      } else if (window.BEAUTY_SIGNALS) {
        const dupeId = this.generateProductId(dupe.name, dupe.brand);
        signals = window.BEAUTY_SIGNALS.getProfile(dupeId);
      }
      
      // Parse price range
      const priceInfo = this.parsePriceRange(dupe.priceRange);
      
      return {
        ...dupe,
        brandId: brandInfo?.id || dupe.brand?.toLowerCase().replace(/\s+/g, '-'),
        brandTier: brandInfo?.tier || 'unknown',
        signals,
        priceMin: priceInfo.min,
        priceMax: priceInfo.max,
        hasDetailedSignals: signals !== null
      };
    });
    
    return enrichedDupes;
  },

  /**
   * Parse price range string into min/max values
   */
  parsePriceRange(priceRange) {
    if (!priceRange) return { min: null, max: null };
    
    // Extract numbers from price string
    const numbers = priceRange.match(/\d+/g);
    if (!numbers || numbers.length === 0) {
      return { min: null, max: null };
    }
    
    const parsed = numbers.map(n => parseInt(n, 10));
    
    return {
      min: Math.min(...parsed),
      max: Math.max(...parsed)
    };
  },

  /**
   * Generate product ID from name and brand
   */
  generateProductId(name, brand) {
    return `${brand}-${name}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  },

  // ============================================
  // STAGE 7: SCORING & RANKING
  // ============================================
  
  /**
   * Score and rank dupes using the scoring engine
   * @param {Object} luxuryProduct - Resolved luxury product with signals
   * @param {Object[]} enrichedDupes - Dupes with signals
   * @returns {Object[]} - Scored and ranked dupes
   */
  scoreAndRankDupes(luxuryProduct, enrichedDupes) {
    const scoringEngine = window.DUPE_SCORING_ENGINE;
    
    if (!scoringEngine) {
      // Fallback: use existing matchScore if scoring engine not loaded
      return enrichedDupes.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }
    
    // Get luxury product signals
    let luxurySignals = null;
    if (luxuryProduct.category === 'fragrance' && window.FRAGRANCE_SIGNALS) {
      luxurySignals = window.FRAGRANCE_SIGNALS.getProfile(luxuryProduct.id);
    } else if (window.BEAUTY_SIGNALS) {
      luxurySignals = window.BEAUTY_SIGNALS.getProfile(luxuryProduct.id);
    }
    
    const scoredDupes = enrichedDupes.map(dupe => {
      // If we have signals for both, use the scoring engine
      if (luxurySignals && dupe.signals) {
        const detailedScore = scoringEngine.calculateSimilarity(
          { ...luxuryProduct, signals: luxurySignals },
          { ...dupe, signals: dupe.signals },
          luxuryProduct.category
        );
        
        return {
          ...dupe,
          calculatedScore: detailedScore.matchScore,
          scoreBreakdown: detailedScore,
          useCalculatedScore: true
        };
      }
      
      // Fallback to curated matchScore
      return {
        ...dupe,
        calculatedScore: dupe.matchScore || 70,
        scoreBreakdown: null,
        useCalculatedScore: false
      };
    });
    
    // Sort by calculated score
    scoredDupes.sort((a, b) => b.calculatedScore - a.calculatedScore);
    
    return scoredDupes;
  },

  // ============================================
  // STAGE 8: OUTPUT FORMATTING
  // ============================================
  
  /**
   * Format results for frontend consumption
   * @param {Object} resolution - Canonical resolution result
   * @param {Object[]} rankedDupes - Scored and ranked dupes
   * @param {Object} queryInfo - Original query metadata
   * @returns {Object} - Frontend-ready result object
   */
  formatOutput(resolution, rankedDupes, queryInfo) {
    if (!resolution || !resolution.resolved) {
      return {
        success: false,
        query: queryInfo.original,
        noMatch: true,
        suggestions: this.getSuggestions(queryInfo),
        timestamp: Date.now()
      };
    }
    
    const product = resolution.resolved;
    
    // Format dupes for display
    const formattedDupes = rankedDupes.slice(0, this.config.maxResults).map((dupe, index) => {
      const matchLevel = this.getMatchLevel(dupe.calculatedScore);
      
      return {
        rank: index + 1,
        name: dupe.name,
        brand: dupe.brand,
        brandTier: dupe.brandTier,
        priceRange: dupe.priceRange,
        matchScore: dupe.calculatedScore,
        matchLevel: matchLevel.level,
        matchLabel: matchLevel.label,
        reason: dupe.reason,
        differences: dupe.differences,
        bestFor: dupe.bestFor || [],
        hasDetailedAnalysis: dupe.useCalculatedScore,
        scoreBreakdown: dupe.scoreBreakdown ? {
          summary: dupe.scoreBreakdown.summary,
          confidence: dupe.scoreBreakdown.confidence,
          dimensions: this.formatDimensions(dupe.scoreBreakdown.dimensions)
        } : null
      };
    });
    
    return {
      success: true,
      query: queryInfo.original,
      normalizedQuery: queryInfo.normalized,
      
      luxuryProduct: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory
      },
      
      resolution: {
        confidence: Math.round(resolution.confidence * 100),
        matchedOn: resolution.matchDetails?.matchedOn || [],
        ambiguous: resolution.ambiguous,
        alternatives: resolution.alternatives || []
      },
      
      dupes: formattedDupes,
      dupeCount: formattedDupes.length,
      
      meta: {
        timestamp: Date.now(),
        pipelineVersion: this.version,
        hasSignalData: formattedDupes.some(d => d.hasDetailedAnalysis)
      }
    };
  },

  /**
   * Get match level info from score
   */
  getMatchLevel(score) {
    if (score >= 85) return { level: 'high', label: 'Very Close Match' };
    if (score >= 70) return { level: 'medium', label: 'Good Match' };
    if (score >= 55) return { level: 'fair', label: 'Similar Vibe' };
    return { level: 'low', label: 'Loose Alternative' };
  },

  /**
   * Format dimensions for frontend display
   */
  formatDimensions(dimensions) {
    if (!dimensions) return [];
    
    return Object.entries(dimensions)
      .filter(([_, d]) => d.score > 0)
      .map(([name, d]) => ({
        name: this.formatDimensionName(name),
        score: Math.round(d.score * 100),
        explanation: d.explanation
      }))
      .sort((a, b) => b.score - a.score);
  },

  /**
   * Format dimension name for display
   */
  formatDimensionName(name) {
    const nameMap = {
      scentFamily: 'Scent Family',
      notes: 'Notes Match',
      accords: 'Character',
      longevity: 'Longevity',
      sillage: 'Sillage',
      projection: 'Projection',
      seasonality: 'Seasonality',
      aesthetic: 'Aesthetic',
      occasion: 'Occasion',
      mood: 'Mood',
      demographic: 'Target Audience',
      colorFamily: 'Color Family',
      undertone: 'Undertone',
      depth: 'Color Depth',
      finish: 'Finish',
      texture: 'Texture',
      coverage: 'Coverage',
      heroIngredient: 'Hero Ingredient',
      keyActives: 'Key Actives',
      primaryConcerns: 'Primary Concerns',
      secondaryConcerns: 'Secondary Concerns',
      textureType: 'Texture Type',
      textureWeight: 'Texture Weight'
    };
    
    return nameMap[name] || name.replace(/([A-Z])/g, ' $1').trim();
  },

  /**
   * Get suggestions for no-match cases
   */
  getSuggestions(queryInfo) {
    // Return popular/trending items as suggestions
    return [
      { name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian' },
      { name: 'Pillow Talk', brand: 'Charlotte Tilbury' },
      { name: 'Lost Cherry', brand: 'Tom Ford' }
    ];
  },

  // ============================================
  // MAIN PIPELINE EXECUTION
  // ============================================
  
  /**
   * Execute the complete search pipeline
   * This is the main entry point for searches
   * 
   * @param {string} query - User's search query
   * @param {Object} options - Optional configuration
   * @returns {Object} - Complete search results
   */
  search(query, options = {}) {
    const startTime = performance.now();
    
    // Get products database
    const database = options.database || window.DUPE_DATABASE;
    if (!database || !database.products) {
      return {
        success: false,
        error: 'Database not loaded',
        query
      };
    }
    
    // Stage 1: Normalize input
    const normalizedQuery = this.normalizeInput(query);
    if (!normalizedQuery.valid) {
      return {
        success: false,
        error: 'Query too short',
        query,
        minLength: this.config.minQueryLength
      };
    }
    
    // Stage 2 & 3: Find and rank candidates
    const candidates = this.findCandidates(normalizedQuery, database.products);
    
    // Stage 4: Resolve to canonical product
    const resolution = this.resolveCanonical(candidates);
    
    if (!resolution) {
      return this.formatOutput(null, [], normalizedQuery);
    }
    
    // Stage 5 & 6: Get dupes with signals
    const enrichedDupes = this.getDupesWithSignals(resolution.resolved);
    
    // Stage 7: Score and rank
    const rankedDupes = this.scoreAndRankDupes(resolution.resolved, enrichedDupes);
    
    // Stage 8: Format output
    const result = this.formatOutput(resolution, rankedDupes, normalizedQuery);
    
    // Add performance timing
    result.meta.searchTimeMs = Math.round(performance.now() - startTime);
    
    return result;
  },

  /**
   * Search with callback (for async UI updates)
   */
  searchAsync(query, callback, options = {}) {
    // Use requestAnimationFrame for smooth UI
    requestAnimationFrame(() => {
      const result = this.search(query, options);
      callback(result);
    });
  }
};

// Freeze configuration
Object.freeze(window.DUPE_SEARCH_PIPELINE.config);
