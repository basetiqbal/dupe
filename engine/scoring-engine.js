/**
 * THE DUPE EDIT — Multi-Dimensional Scoring Engine
 * 
 * This is the core intelligence layer that calculates similarity scores
 * between luxury products and potential dupes.
 * 
 * Architecture Principles:
 * 1. DETERMINISTIC: Same inputs always produce same outputs
 * 2. EXPLAINABLE: Every score can be broken down into components
 * 3. EXTENSIBLE: New signal dimensions can be added without breaking existing logic
 * 4. GRACEFUL DEGRADATION: Works with partial data, improves with more
 * 
 * Scoring Strategy:
 * - Weighted multi-dimensional similarity
 * - Category-specific signal weighting
 * - Confidence-adjusted final scores
 * - Human-readable explanations
 */

window.DUPE_SCORING_ENGINE = {
  version: '1.0.0',

  // ============================================
  // CONFIGURATION: Weights by Category
  // ============================================
  
  /**
   * Weight configurations define how much each signal dimension
   * contributes to the final similarity score.
   * 
   * Weights should sum to 1.0 for each category.
   */
  weights: {
    fragrance: {
      scent: {
        family: 0.15,
        notes: 0.25,
        accords: 0.10
      },
      performance: {
        longevity: 0.10,
        sillage: 0.08,
        projection: 0.07
      },
      vibe: {
        aesthetic: 0.08,
        occasion: 0.05,
        mood: 0.05,
        demographic: 0.07
      }
    },
    
    makeup: {
      color: {
        family: 0.25,
        undertone: 0.15,
        depth: 0.10,
        finish: 0.10
      },
      formula: {
        texture: 0.10,
        longevity: 0.08,
        coverage: 0.07
      },
      vibe: {
        aesthetic: 0.05,
        occasion: 0.05,
        skintone: 0.05
      }
    },
    
    skincare: {
      ingredients: {
        hero: 0.25,
        actives: 0.20,
        supporting: 0.05
      },
      concerns: {
        primary: 0.15,
        secondary: 0.10
      },
      texture: {
        type: 0.08,
        weight: 0.05,
        finish: 0.05
      },
      vibe: {
        skinType: 0.05,
        routine: 0.02
      }
    }
  },

  // ============================================
  // SIMILARITY CALCULATORS
  // ============================================

  /**
   * Calculate similarity between two strings (0-1)
   * Uses Jaccard similarity on character n-grams
   */
  stringSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    if (str1 === str2) return 1;
    
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    
    if (s1 === s2) return 1;
    if (s1.includes(s2) || s2.includes(s1)) return 0.85;
    
    // N-gram based similarity
    const getNGrams = (str, n = 2) => {
      const grams = new Set();
      for (let i = 0; i <= str.length - n; i++) {
        grams.add(str.substring(i, i + n));
      }
      return grams;
    };
    
    const grams1 = getNGrams(s1);
    const grams2 = getNGrams(s2);
    
    const intersection = new Set([...grams1].filter(g => grams2.has(g)));
    const union = new Set([...grams1, ...grams2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  },

  /**
   * Calculate set similarity (Jaccard index)
   * For comparing arrays of values like notes, accords, etc.
   */
  setSimilarity(set1, set2) {
    if (!set1 || !set2 || set1.length === 0 || set2.length === 0) return 0;
    
    const s1 = new Set(set1.map(v => v.toLowerCase()));
    const s2 = new Set(set2.map(v => v.toLowerCase()));
    
    const intersection = new Set([...s1].filter(v => s2.has(v)));
    const union = new Set([...s1, ...s2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  },

  /**
   * Calculate weighted set similarity
   * Gives more weight to matches in priority positions
   */
  weightedSetSimilarity(set1, set2, priorityWeight = 1.5) {
    if (!set1 || !set2 || set1.length === 0 || set2.length === 0) return 0;
    
    const s1 = set1.map(v => v.toLowerCase());
    const s2 = new Set(set2.map(v => v.toLowerCase()));
    
    let score = 0;
    let totalWeight = 0;
    
    s1.forEach((item, index) => {
      // Earlier items (more prominent notes) get higher weight
      const weight = priorityWeight ** (1 - index / s1.length);
      totalWeight += weight;
      if (s2.has(item)) {
        score += weight;
      }
    });
    
    return totalWeight > 0 ? score / totalWeight : 0;
  },

  /**
   * Calculate numeric similarity (for performance metrics)
   * Returns 1 for identical, scales down based on difference
   */
  numericSimilarity(val1, val2, maxDiff = 10) {
    if (val1 === undefined || val2 === undefined) return 0;
    const diff = Math.abs(val1 - val2);
    return Math.max(0, 1 - (diff / maxDiff));
  },

  /**
   * Calculate seasonality match
   */
  seasonalitySimilarity(season1, season2) {
    if (!season1 || !season2) return 0;
    
    const seasons = ['spring', 'summer', 'fall', 'winter'];
    let totalDiff = 0;
    let count = 0;
    
    seasons.forEach(season => {
      if (season1[season] !== undefined && season2[season] !== undefined) {
        totalDiff += Math.abs(season1[season] - season2[season]);
        count++;
      }
    });
    
    return count > 0 ? 1 - (totalDiff / count) : 0;
  },

  // ============================================
  // CATEGORY-SPECIFIC SCORERS
  // ============================================

  /**
   * Score fragrance similarity
   */
  scoreFragrance(luxurySignals, dupeSignals) {
    const scores = {
      dimensions: {},
      confidence: 0,
      total: 0
    };
    
    const weights = this.weights.fragrance;
    let totalWeight = 0;
    let availableWeight = 0;
    
    // ----- SCENT SIGNALS -----
    if (luxurySignals.scent && dupeSignals.scent) {
      const lScent = luxurySignals.scent;
      const dScent = dupeSignals.scent;
      
      // Family match
      if (lScent.family && dScent.family) {
        const familyScore = this.stringSimilarity(lScent.family, dScent.family);
        scores.dimensions.scentFamily = {
          score: familyScore,
          weight: weights.scent.family,
          explanation: familyScore > 0.8 ? 'Same scent family' : 
                       familyScore > 0.5 ? 'Related scent families' : 'Different scent families'
        };
        scores.total += familyScore * weights.scent.family;
        availableWeight += weights.scent.family;
      }
      totalWeight += weights.scent.family;
      
      // Notes match (weighted - top notes matter more)
      const luxuryNotes = [
        ...(lScent.topNotes || []),
        ...(lScent.heartNotes || []),
        ...(lScent.baseNotes || [])
      ];
      const dupeNotes = [
        ...(dScent.topNotes || []),
        ...(dScent.heartNotes || []),
        ...(dScent.baseNotes || [])
      ];
      
      if (luxuryNotes.length > 0 && dupeNotes.length > 0) {
        const notesScore = this.weightedSetSimilarity(luxuryNotes, dupeNotes);
        const sharedNotes = luxuryNotes.filter(n => 
          dupeNotes.some(dn => dn.toLowerCase() === n.toLowerCase())
        );
        
        scores.dimensions.notes = {
          score: notesScore,
          weight: weights.scent.notes,
          sharedNotes: sharedNotes.slice(0, 5),
          explanation: `Shares ${sharedNotes.length} of ${luxuryNotes.length} key notes`
        };
        scores.total += notesScore * weights.scent.notes;
        availableWeight += weights.scent.notes;
      }
      totalWeight += weights.scent.notes;
      
      // Accords match
      if (lScent.accords && dScent.accords) {
        const accordsScore = this.setSimilarity(lScent.accords, dScent.accords);
        scores.dimensions.accords = {
          score: accordsScore,
          weight: weights.scent.accords,
          explanation: accordsScore > 0.7 ? 'Very similar character' : 
                       accordsScore > 0.4 ? 'Some shared characteristics' : 'Different character'
        };
        scores.total += accordsScore * weights.scent.accords;
        availableWeight += weights.scent.accords;
      }
      totalWeight += weights.scent.accords;
    }
    
    // ----- PERFORMANCE SIGNALS -----
    if (luxurySignals.performance && dupeSignals.performance) {
      const lPerf = luxurySignals.performance;
      const dPerf = dupeSignals.performance;
      
      // Longevity
      if (lPerf.longevity !== undefined && dPerf.longevity !== undefined) {
        const longevityScore = this.numericSimilarity(lPerf.longevity, dPerf.longevity);
        const diff = dPerf.longevity - lPerf.longevity;
        scores.dimensions.longevity = {
          score: longevityScore,
          weight: weights.performance.longevity,
          comparison: diff > 0 ? 'Lasts longer' : diff < 0 ? 'Shorter lasting' : 'Similar longevity',
          explanation: `${dPerf.longevity}/10 vs ${lPerf.longevity}/10`
        };
        scores.total += longevityScore * weights.performance.longevity;
        availableWeight += weights.performance.longevity;
      }
      totalWeight += weights.performance.longevity;
      
      // Sillage
      if (lPerf.sillage !== undefined && dPerf.sillage !== undefined) {
        const sillageScore = this.numericSimilarity(lPerf.sillage, dPerf.sillage);
        scores.dimensions.sillage = {
          score: sillageScore,
          weight: weights.performance.sillage,
          explanation: `Sillage: ${dPerf.sillage}/10 vs ${lPerf.sillage}/10`
        };
        scores.total += sillageScore * weights.performance.sillage;
        availableWeight += weights.performance.sillage;
      }
      totalWeight += weights.performance.sillage;
      
      // Projection
      if (lPerf.projection !== undefined && dPerf.projection !== undefined) {
        const projectionScore = this.numericSimilarity(lPerf.projection, dPerf.projection);
        scores.dimensions.projection = {
          score: projectionScore,
          weight: weights.performance.projection,
          explanation: `Projection: ${dPerf.projection}/10 vs ${lPerf.projection}/10`
        };
        scores.total += projectionScore * weights.performance.projection;
        availableWeight += weights.performance.projection;
      }
      totalWeight += weights.performance.projection;
      
      // Seasonality
      if (lPerf.seasonality && dPerf.seasonality) {
        const seasonScore = this.seasonalitySimilarity(lPerf.seasonality, dPerf.seasonality);
        scores.dimensions.seasonality = {
          score: seasonScore,
          weight: 0.05,
          explanation: seasonScore > 0.8 ? 'Same seasonal profile' : 'Different seasonal use'
        };
        scores.total += seasonScore * 0.05;
        availableWeight += 0.05;
        totalWeight += 0.05;
      }
    }
    
    // ----- VIBE SIGNALS -----
    if (luxurySignals.vibe && dupeSignals.vibe) {
      const lVibe = luxurySignals.vibe;
      const dVibe = dupeSignals.vibe;
      
      // Aesthetic
      if (lVibe.aesthetic && dVibe.aesthetic) {
        const aestheticScore = this.setSimilarity(lVibe.aesthetic, dVibe.aesthetic);
        scores.dimensions.aesthetic = {
          score: aestheticScore,
          weight: weights.vibe.aesthetic,
          explanation: aestheticScore > 0.6 ? 'Similar aesthetic' : 'Different aesthetic'
        };
        scores.total += aestheticScore * weights.vibe.aesthetic;
        availableWeight += weights.vibe.aesthetic;
      }
      totalWeight += weights.vibe.aesthetic;
      
      // Occasion
      if (lVibe.occasion && dVibe.occasion) {
        const occasionScore = this.setSimilarity(lVibe.occasion, dVibe.occasion);
        scores.dimensions.occasion = {
          score: occasionScore,
          weight: weights.vibe.occasion,
          explanation: `Suitable for ${occasionScore > 0.5 ? 'similar' : 'different'} occasions`
        };
        scores.total += occasionScore * weights.vibe.occasion;
        availableWeight += weights.vibe.occasion;
      }
      totalWeight += weights.vibe.occasion;
      
      // Mood
      if (lVibe.mood && dVibe.mood) {
        const moodScore = this.setSimilarity(lVibe.mood, dVibe.mood);
        scores.dimensions.mood = {
          score: moodScore,
          weight: weights.vibe.mood,
          explanation: `${moodScore > 0.5 ? 'Similar' : 'Different'} mood profile`
        };
        scores.total += moodScore * weights.vibe.mood;
        availableWeight += weights.vibe.mood;
      }
      totalWeight += weights.vibe.mood;
      
      // Demographic (gender lean, age range)
      if (lVibe.demographic && dVibe.demographic) {
        let demoScore = 0;
        let demoCount = 0;
        
        if (lVibe.demographic.genderLean !== undefined && dVibe.demographic.genderLean !== undefined) {
          demoScore += this.numericSimilarity(lVibe.demographic.genderLean, dVibe.demographic.genderLean, 1);
          demoCount++;
        }
        
        if (demoCount > 0) {
          demoScore /= demoCount;
          scores.dimensions.demographic = {
            score: demoScore,
            weight: weights.vibe.demographic,
            explanation: demoScore > 0.7 ? 'Same target audience' : 'Different target audience'
          };
          scores.total += demoScore * weights.vibe.demographic;
          availableWeight += weights.vibe.demographic;
        }
      }
      totalWeight += weights.vibe.demographic;
    }
    
    // ----- CALCULATE CONFIDENCE -----
    // Confidence is based on how much data was available
    scores.confidence = totalWeight > 0 ? availableWeight / totalWeight : 0;
    
    // Normalize total score
    if (availableWeight > 0) {
      scores.total = scores.total / availableWeight;
    }
    
    return scores;
  },

  /**
   * Score makeup similarity
   */
  scoreMakeup(luxurySignals, dupeSignals) {
    const scores = {
      dimensions: {},
      confidence: 0,
      total: 0
    };
    
    const weights = this.weights.makeup;
    let totalWeight = 0;
    let availableWeight = 0;
    
    // ----- COLOR SIGNALS -----
    if (luxurySignals.color && dupeSignals.color) {
      const lColor = luxurySignals.color;
      const dColor = dupeSignals.color;
      
      // Color family
      if (lColor.family && dColor.family) {
        const familyScore = this.stringSimilarity(lColor.family, dColor.family);
        scores.dimensions.colorFamily = {
          score: familyScore,
          weight: weights.color.family,
          explanation: familyScore > 0.8 ? 'Same color family' : 'Different color families'
        };
        scores.total += familyScore * weights.color.family;
        availableWeight += weights.color.family;
      }
      totalWeight += weights.color.family;
      
      // Undertone
      if (lColor.undertone && dColor.undertone) {
        const undertoneScore = lColor.undertone === dColor.undertone ? 1 : 0.3;
        scores.dimensions.undertone = {
          score: undertoneScore,
          weight: weights.color.undertone,
          explanation: undertoneScore === 1 ? 'Same undertone' : 'Different undertone'
        };
        scores.total += undertoneScore * weights.color.undertone;
        availableWeight += weights.color.undertone;
      }
      totalWeight += weights.color.undertone;
      
      // Depth
      if (lColor.depth && dColor.depth) {
        const depthScore = this.stringSimilarity(lColor.depth, dColor.depth);
        scores.dimensions.depth = {
          score: depthScore,
          weight: weights.color.depth,
          explanation: `Depth: ${dColor.depth} vs ${lColor.depth}`
        };
        scores.total += depthScore * weights.color.depth;
        availableWeight += weights.color.depth;
      }
      totalWeight += weights.color.depth;
      
      // Finish
      if (lColor.finish && dColor.finish) {
        const finishScore = this.stringSimilarity(lColor.finish, dColor.finish);
        scores.dimensions.finish = {
          score: finishScore,
          weight: weights.color.finish,
          explanation: finishScore > 0.8 ? 'Same finish' : 'Different finish'
        };
        scores.total += finishScore * weights.color.finish;
        availableWeight += weights.color.finish;
      }
      totalWeight += weights.color.finish;
    }
    
    // ----- FORMULA SIGNALS -----
    if (luxurySignals.formula && dupeSignals.formula) {
      const lForm = luxurySignals.formula;
      const dForm = dupeSignals.formula;
      
      // Texture
      if (lForm.texture && dForm.texture) {
        const textureScore = this.stringSimilarity(lForm.texture, dForm.texture);
        scores.dimensions.texture = {
          score: textureScore,
          weight: weights.formula.texture,
          explanation: `Texture: ${dForm.texture} vs ${lForm.texture}`
        };
        scores.total += textureScore * weights.formula.texture;
        availableWeight += weights.formula.texture;
      }
      totalWeight += weights.formula.texture;
      
      // Longevity
      if (lForm.longevity !== undefined && dForm.longevity !== undefined) {
        const longevityScore = this.numericSimilarity(lForm.longevity, dForm.longevity);
        scores.dimensions.longevity = {
          score: longevityScore,
          weight: weights.formula.longevity,
          explanation: `Wear time: ${dForm.longevity}/10 vs ${lForm.longevity}/10`
        };
        scores.total += longevityScore * weights.formula.longevity;
        availableWeight += weights.formula.longevity;
      }
      totalWeight += weights.formula.longevity;
      
      // Coverage
      if (lForm.coverage !== undefined && dForm.coverage !== undefined) {
        const coverageScore = this.numericSimilarity(lForm.coverage, dForm.coverage);
        scores.dimensions.coverage = {
          score: coverageScore,
          weight: weights.formula.coverage,
          explanation: `Coverage: ${dForm.coverage}/10 vs ${lForm.coverage}/10`
        };
        scores.total += coverageScore * weights.formula.coverage;
        availableWeight += weights.formula.coverage;
      }
      totalWeight += weights.formula.coverage;
    }
    
    // Calculate confidence and normalize
    scores.confidence = totalWeight > 0 ? availableWeight / totalWeight : 0;
    if (availableWeight > 0) {
      scores.total = scores.total / availableWeight;
    }
    
    return scores;
  },

  /**
   * Score skincare similarity
   */
  scoreSkincare(luxurySignals, dupeSignals) {
    const scores = {
      dimensions: {},
      confidence: 0,
      total: 0
    };
    
    const weights = this.weights.skincare;
    let totalWeight = 0;
    let availableWeight = 0;
    
    // ----- INGREDIENT SIGNALS -----
    if (luxurySignals.ingredients && dupeSignals.ingredients) {
      const lIngr = luxurySignals.ingredients;
      const dIngr = dupeSignals.ingredients;
      
      // Hero ingredient
      if (lIngr.heroIngredient && dIngr.heroIngredient) {
        const heroScore = this.stringSimilarity(lIngr.heroIngredient, dIngr.heroIngredient);
        scores.dimensions.heroIngredient = {
          score: heroScore,
          weight: weights.ingredients.hero,
          explanation: heroScore > 0.8 ? `Same hero ingredient: ${dIngr.heroIngredient}` : 
                       'Different hero ingredients'
        };
        scores.total += heroScore * weights.ingredients.hero;
        availableWeight += weights.ingredients.hero;
      }
      totalWeight += weights.ingredients.hero;
      
      // Key actives
      if (lIngr.keyActives && dIngr.keyActives) {
        const activesScore = this.setSimilarity(lIngr.keyActives, dIngr.keyActives);
        const sharedActives = lIngr.keyActives.filter(a =>
          dIngr.keyActives.some(da => da.toLowerCase().includes(a.toLowerCase()) ||
                                       a.toLowerCase().includes(da.toLowerCase()))
        );
        
        scores.dimensions.keyActives = {
          score: activesScore,
          weight: weights.ingredients.actives,
          sharedActives,
          explanation: `Shares ${sharedActives.length} key active ingredients`
        };
        scores.total += activesScore * weights.ingredients.actives;
        availableWeight += weights.ingredients.actives;
      }
      totalWeight += weights.ingredients.actives;
    }
    
    // ----- CONCERN SIGNALS -----
    if (luxurySignals.concerns && dupeSignals.concerns) {
      const lConc = luxurySignals.concerns;
      const dConc = dupeSignals.concerns;
      
      // Primary concerns
      if (lConc.primary && dConc.primary) {
        const primaryScore = this.setSimilarity(lConc.primary, dConc.primary);
        scores.dimensions.primaryConcerns = {
          score: primaryScore,
          weight: weights.concerns.primary,
          explanation: `Addresses ${primaryScore > 0.5 ? 'similar' : 'different'} primary concerns`
        };
        scores.total += primaryScore * weights.concerns.primary;
        availableWeight += weights.concerns.primary;
      }
      totalWeight += weights.concerns.primary;
      
      // Secondary concerns
      if (lConc.secondary && dConc.secondary) {
        const secondaryScore = this.setSimilarity(lConc.secondary, dConc.secondary);
        scores.dimensions.secondaryConcerns = {
          score: secondaryScore,
          weight: weights.concerns.secondary,
          explanation: `Addresses ${secondaryScore > 0.5 ? 'similar' : 'different'} secondary concerns`
        };
        scores.total += secondaryScore * weights.concerns.secondary;
        availableWeight += weights.concerns.secondary;
      }
      totalWeight += weights.concerns.secondary;
    }
    
    // ----- TEXTURE SIGNALS -----
    if (luxurySignals.texture && dupeSignals.texture) {
      const lText = luxurySignals.texture;
      const dText = dupeSignals.texture;
      
      // Texture type
      if (lText.type && dText.type) {
        const typeScore = lText.type === dText.type ? 1 : 0.5;
        scores.dimensions.textureType = {
          score: typeScore,
          weight: weights.texture.type,
          explanation: `${dText.type} vs ${lText.type}`
        };
        scores.total += typeScore * weights.texture.type;
        availableWeight += weights.texture.type;
      }
      totalWeight += weights.texture.type;
      
      // Weight
      if (lText.weight && dText.weight) {
        const weightScore = this.stringSimilarity(lText.weight, dText.weight);
        scores.dimensions.textureWeight = {
          score: weightScore,
          weight: weights.texture.weight,
          explanation: `${dText.weight} vs ${lText.weight} weight`
        };
        scores.total += weightScore * weights.texture.weight;
        availableWeight += weights.texture.weight;
      }
      totalWeight += weights.texture.weight;
    }
    
    // Calculate confidence and normalize
    scores.confidence = totalWeight > 0 ? availableWeight / totalWeight : 0;
    if (availableWeight > 0) {
      scores.total = scores.total / availableWeight;
    }
    
    return scores;
  },

  // ============================================
  // MAIN SCORING INTERFACE
  // ============================================

  /**
   * Calculate similarity score between a luxury product and a dupe
   * Returns detailed breakdown with explanation
   * 
   * @param {Object} luxuryProduct - Luxury product with signals
   * @param {Object} dupeProduct - Dupe product with signals
   * @param {string} category - Product category
   * @returns {Object} - Detailed score breakdown
   */
  calculateSimilarity(luxuryProduct, dupeProduct, category) {
    const luxurySignals = luxuryProduct.signals || {};
    const dupeSignals = dupeProduct.signals || {};
    
    let scores;
    
    // Route to category-specific scorer
    switch (category) {
      case 'fragrance':
        scores = this.scoreFragrance(luxurySignals, dupeSignals);
        break;
      case 'makeup':
        scores = this.scoreMakeup(luxurySignals, dupeSignals);
        break;
      case 'skincare':
        scores = this.scoreSkincare(luxurySignals, dupeSignals);
        break;
      default:
        scores = { dimensions: {}, confidence: 0, total: 0 };
    }
    
    // Add brand tier adjustment
    const tierAdjustment = this.calculateTierAdjustment(luxuryProduct, dupeProduct);
    scores.tierAdjustment = tierAdjustment;
    
    // Add value score (how much cheaper for similar quality)
    const valueScore = this.calculateValueScore(luxuryProduct, dupeProduct, scores.total);
    scores.valueScore = valueScore;
    
    // Generate final match score (0-100)
    scores.matchScore = Math.round(scores.total * 100);
    
    // Generate human-readable summary
    scores.summary = this.generateSummary(scores);
    
    return scores;
  },

  /**
   * Calculate tier adjustment factor
   * Slightly boosts dupes from reputable brand tiers
   */
  calculateTierAdjustment(luxuryProduct, dupeProduct) {
    const registry = window.BRAND_REGISTRY;
    if (!registry) return { factor: 1, explanation: 'Brand data unavailable' };
    
    const luxuryTier = registry.getTier(luxuryProduct.brandId);
    const dupeTier = registry.getTier(dupeProduct.brandId);
    
    if (!luxuryTier || !dupeTier) {
      return { factor: 1, explanation: 'Brand tier unknown' };
    }
    
    const tierDistance = registry.getTierDistance(luxuryTier, dupeTier);
    
    // Closer tiers get slight boost (niche dupe of luxury better than drugstore)
    const factor = 1 + (0.02 * (5 - tierDistance));
    
    return {
      factor,
      luxuryTier,
      dupeTier,
      distance: tierDistance,
      explanation: tierDistance <= 2 ? 'Similar brand positioning' : 'Different market segment'
    };
  },

  /**
   * Calculate value score
   * How good is the dupe considering price difference?
   */
  calculateValueScore(luxuryProduct, dupeProduct, similarityScore) {
    const luxuryPrice = luxuryProduct.priceValue;
    const dupePrice = dupeProduct.priceMax || dupeProduct.priceMin;
    
    if (!luxuryPrice || !dupePrice) {
      return { score: null, explanation: 'Price data unavailable' };
    }
    
    const savings = 1 - (dupePrice / luxuryPrice);
    const effectiveValue = similarityScore * savings;
    
    // Value score: how much quality you get per dollar saved
    const valueScore = Math.min(1, effectiveValue * 2);
    
    return {
      score: valueScore,
      savings: Math.round(savings * 100),
      explanation: savings > 0.7 ? `${Math.round(savings * 100)}% savings with ${Math.round(similarityScore * 100)}% similarity` :
                   savings > 0.4 ? 'Moderate savings' : 'Slight savings'
    };
  },

  /**
   * Generate human-readable summary
   */
  generateSummary(scores) {
    const level = scores.matchScore >= 80 ? 'Very Close Match' :
                  scores.matchScore >= 65 ? 'Good Match' :
                  scores.matchScore >= 50 ? 'Similar Vibe' :
                  'Loose Alternative';
    
    // Find strongest dimensions
    const dimensions = Object.entries(scores.dimensions)
      .filter(([_, d]) => d.score > 0.7)
      .map(([name, _]) => name);
    
    const strengths = dimensions.length > 0 ?
      `Strong match in: ${dimensions.slice(0, 3).join(', ')}` :
      'Overall similar profile';
    
    return {
      level,
      matchScore: scores.matchScore,
      confidence: Math.round(scores.confidence * 100),
      strengths,
      trustStatement: scores.confidence >= 0.7 ?
        'High confidence score based on detailed signal data' :
        'Score based on limited data - actual similarity may vary'
    };
  },

  /**
   * Rank dupes by similarity score
   * @param {Object} luxuryProduct
   * @param {Object[]} dupeProducts
   * @param {string} category
   * @returns {Object[]} Ranked dupes with scores
   */
  rankDupes(luxuryProduct, dupeProducts, category) {
    const rankedDupes = dupeProducts.map(dupe => {
      const scores = this.calculateSimilarity(luxuryProduct, dupe, category);
      return {
        ...dupe,
        scores
      };
    });
    
    // Sort by match score descending
    rankedDupes.sort((a, b) => b.scores.matchScore - a.scores.matchScore);
    
    return rankedDupes;
  }
};

// Freeze to prevent mutation
Object.freeze(window.DUPE_SCORING_ENGINE.weights);
