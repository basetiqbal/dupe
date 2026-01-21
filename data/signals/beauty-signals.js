/**
 * THE DUPE EDIT — Makeup & Skincare Signal Profiles
 * 
 * Signal profiles for color cosmetics and skincare products.
 * Enables multi-dimensional matching based on:
 * - Color/shade characteristics
 * - Formula properties
 * - Active ingredients
 * - Skin concerns addressed
 * - Texture and finish
 */

window.BEAUTY_SIGNALS = {
  version: '1.0.0',
  lastUpdated: '2026-01-20',
  
  // ============================================
  // MAKEUP SIGNAL PROFILES
  // ============================================
  makeup: {
    // ----- Charlotte Tilbury Pillow Talk -----
    'pillow-talk': {
      productId: 'pillow-talk',
      color: {
        family: 'nude-pink',
        undertone: 'neutral',
        depth: 'medium',
        hexCode: '#B5838D',
        intensity: 5,  // 1-10
        shimmer: 1,    // 1-10 (1 = matte)
        finish: 'matte'
      },
      formula: {
        type: 'bullet-lipstick',
        texture: 'creamy-matte',
        coverage: 8,     // 1-10
        longevity: 6,    // 1-10
        comfort: 8,      // 1-10
        transferResistance: 5,
        hydration: 6,
        buildability: 7
      },
      vibe: {
        aesthetic: ['classic', 'romantic', 'natural'],
        occasion: ['everyday', 'date-night', 'office', 'wedding'],
        mood: ['romantic', 'elegant', 'approachable'],
        skintoneFit: {
          fair: 0.9,
          light: 1.0,
          medium: 1.0,
          tan: 0.9,
          deep: 0.8
        }
      }
    },

    // ----- MAC Whirl (Pillow Talk dupe) -----
    'mac-whirl': {
      productId: 'mac-whirl',
      luxuryReference: 'pillow-talk',
      color: {
        family: 'nude-pink',
        undertone: 'cool',
        depth: 'medium',
        hexCode: '#9E7B7B',
        intensity: 6,
        shimmer: 1,
        finish: 'matte'
      },
      formula: {
        type: 'bullet-lipstick',
        texture: 'true-matte',
        coverage: 9,
        longevity: 7,
        comfort: 5,
        transferResistance: 7,
        hydration: 4,
        buildability: 5
      },
      vibe: {
        aesthetic: ['classic', 'professional', 'editorial'],
        occasion: ['office', 'everyday', 'photoshoot'],
        mood: ['sophisticated', 'confident', 'polished'],
        skintoneFit: {
          fair: 0.8,
          light: 0.9,
          medium: 1.0,
          tan: 0.9,
          deep: 0.8
        }
      }
    },

    // ----- MAC Velvet Teddy -----
    'mac-velvet-teddy': {
      productId: 'mac-velvet-teddy',
      color: {
        family: 'nude',
        undertone: 'warm',
        depth: 'medium',
        hexCode: '#A67B5B',
        intensity: 6,
        shimmer: 1,
        finish: 'matte'
      },
      formula: {
        type: 'bullet-lipstick',
        texture: 'matte',
        coverage: 9,
        longevity: 6,
        comfort: 5,
        transferResistance: 6,
        hydration: 4,
        buildability: 5
      },
      vibe: {
        aesthetic: ['90s', 'classic', 'neutral'],
        occasion: ['everyday', 'office', 'casual'],
        mood: ['confident', 'effortless', 'cool'],
        skintoneFit: {
          fair: 0.6,
          light: 0.8,
          medium: 1.0,
          tan: 1.0,
          deep: 0.9
        }
      }
    },

    // ----- NARS Orgasm Blush -----
    'nars-orgasm': {
      productId: 'nars-orgasm',
      color: {
        family: 'coral-pink',
        undertone: 'warm',
        depth: 'light-medium',
        hexCode: '#E8A798',
        intensity: 5,
        shimmer: 6,  // Notable golden shimmer
        finish: 'shimmer'
      },
      formula: {
        type: 'powder-blush',
        texture: 'silky',
        coverage: 6,
        longevity: 7,
        blendability: 9,
        buildability: 9,
        pigmentation: 7
      },
      vibe: {
        aesthetic: ['natural', 'glowy', 'fresh'],
        occasion: ['everyday', 'date-night', 'brunch'],
        mood: ['fresh', 'romantic', 'youthful'],
        skintoneFit: {
          fair: 1.0,
          light: 1.0,
          medium: 0.9,
          tan: 0.8,
          deep: 0.6
        }
      }
    },

    // ----- Milani Luminoso (NARS Orgasm dupe) -----
    'milani-luminoso': {
      productId: 'milani-luminoso',
      luxuryReference: 'nars-orgasm',
      color: {
        family: 'coral-pink',
        undertone: 'warm',
        depth: 'light-medium',
        hexCode: '#E5A08A',
        intensity: 6,
        shimmer: 7,  // Slightly more shimmery due to baked formula
        finish: 'shimmer'
      },
      formula: {
        type: 'baked-blush',
        texture: 'soft',
        coverage: 7,
        longevity: 6,
        blendability: 8,
        buildability: 8,
        pigmentation: 8  // Can be intense on first swatch
      },
      vibe: {
        aesthetic: ['glowy', 'warm', 'radiant'],
        occasion: ['everyday', 'summer', 'casual'],
        mood: ['warm', 'happy', 'fresh'],
        skintoneFit: {
          fair: 0.9,
          light: 1.0,
          medium: 0.9,
          tan: 0.8,
          deep: 0.5
        }
      }
    },

    // ----- Charlotte Tilbury Hollywood Flawless Filter -----
    'ct-flawless-filter': {
      productId: 'ct-flawless-filter',
      color: {
        family: 'luminizer',
        undertone: 'neutral',
        finish: 'dewy',
        shadeRange: 7  // Available shades
      },
      formula: {
        type: 'liquid-luminizer',
        texture: 'serum-hybrid',
        coverage: 3,   // Sheer
        longevity: 6,
        blendability: 10,
        buildability: 9,
        luminosity: 9
      },
      vibe: {
        aesthetic: ['glowy', 'hollywood', 'luminous'],
        occasion: ['everyday', 'special-occasion', 'photo'],
        mood: ['glamorous', 'radiant', 'confident'],
        skintoneFit: {
          fair: 1.0,
          light: 1.0,
          medium: 1.0,
          tan: 1.0,
          deep: 1.0
        }
      }
    }
  },

  // ============================================
  // SKINCARE SIGNAL PROFILES
  // ============================================
  skincare: {
    // ----- Drunk Elephant Protini -----
    'protini': {
      productId: 'protini',
      ingredients: {
        heroIngredient: 'peptides',
        keyActives: [
          'signal-peptides',
          'growth-factors',
          'amino-acids',
          'pygmy-waterlily',
          'soybean-folic-acid',
          'acetyl-glutamine'
        ],
        supportingIngredients: [
          'marula-oil',
          'jojoba-oil',
          'vitamin-b5'
        ],
        avoidIf: []  // DE's clean philosophy
      },
      concerns: {
        primary: ['aging', 'fine-lines', 'firmness'],
        secondary: ['dehydration', 'elasticity', 'texture'],
        suitability: 0.9  // How well it addresses concerns
      },
      texture: {
        type: 'cream',
        weight: 'medium',
        finish: 'natural',
        absorption: 8,
        residue: 2,
        hydration: 8,
        occlusion: 5
      },
      vibe: {
        aesthetic: ['clean', 'clinical', 'modern'],
        skinTypes: ['dry', 'normal', 'combination'],
        ageRange: [25, 65],
        routine: 'morning-evening'
      }
    },

    // ----- The INKEY List Peptide Moisturizer (Protini dupe) -----
    'inkey-peptide': {
      productId: 'inkey-peptide',
      luxuryReference: 'protini',
      ingredients: {
        heroIngredient: 'peptides',
        keyActives: [
          'matrixyl-3000',
          'collagen-amino-acids'
        ],
        supportingIngredients: [
          'squalane',
          'glycerin',
          'shea-butter'
        ],
        avoidIf: []
      },
      concerns: {
        primary: ['aging', 'fine-lines'],
        secondary: ['dehydration'],
        suitability: 0.7
      },
      texture: {
        type: 'cream',
        weight: 'light',
        finish: 'natural',
        absorption: 9,
        residue: 1,
        hydration: 7,
        occlusion: 3
      },
      vibe: {
        aesthetic: ['minimalist', 'clinical', 'accessible'],
        skinTypes: ['normal', 'combination', 'oily'],
        ageRange: [20, 50],
        routine: 'morning-evening'
      }
    },

    // ----- SkinCeuticals C E Ferulic -----
    'skinceuticals-ce': {
      productId: 'skinceuticals-ce',
      ingredients: {
        heroIngredient: 'vitamin-c',
        keyActives: [
          'l-ascorbic-acid-15%',
          'vitamin-e',
          'ferulic-acid'
        ],
        supportingIngredients: [
          'triethanolamine',
          'sodium-hyaluronate'
        ],
        avoidIf: ['niacinamide-same-routine', 'retinol-same-routine']
      },
      concerns: {
        primary: ['brightening', 'dark-spots', 'antioxidant-protection'],
        secondary: ['fine-lines', 'firmness', 'sun-damage'],
        suitability: 1.0  // Gold standard
      },
      texture: {
        type: 'serum',
        weight: 'light',
        finish: 'slight-tackiness',
        absorption: 8,
        residue: 3,
        hydration: 5,
        occlusion: 1
      },
      vibe: {
        aesthetic: ['clinical', 'professional', 'science-backed'],
        skinTypes: ['normal', 'dry', 'combination'],
        ageRange: [25, 70],
        routine: 'morning'
      }
    },

    // ----- Timeless Vitamin C (SkinCeuticals dupe) -----
    'timeless-vitc': {
      productId: 'timeless-vitc',
      luxuryReference: 'skinceuticals-ce',
      ingredients: {
        heroIngredient: 'vitamin-c',
        keyActives: [
          'l-ascorbic-acid-20%',  // Higher concentration
          'vitamin-e',
          'ferulic-acid'
        ],
        supportingIngredients: [
          'hyaluronic-acid',
          'panthenol'
        ],
        avoidIf: ['niacinamide-same-routine', 'retinol-same-routine']
      },
      concerns: {
        primary: ['brightening', 'dark-spots', 'antioxidant-protection'],
        secondary: ['fine-lines', 'firmness'],
        suitability: 0.9
      },
      texture: {
        type: 'serum',
        weight: 'light',
        finish: 'slight-tackiness',
        absorption: 7,
        residue: 3,
        hydration: 5,
        occlusion: 1
      },
      vibe: {
        aesthetic: ['minimalist', 'no-frills', 'value'],
        skinTypes: ['normal', 'oily', 'combination'],
        ageRange: [25, 65],
        routine: 'morning'
      }
    },

    // ----- Tatcha Dewy Skin Cream -----
    'tatcha-dewy': {
      productId: 'tatcha-dewy',
      ingredients: {
        heroIngredient: 'japanese-purple-rice',
        keyActives: [
          'hadasei-3-complex',
          'japanese-purple-rice',
          'okinawa-algae',
          'hyaluronic-acid'
        ],
        supportingIngredients: [
          'squalane',
          'botanical-oils',
          'ginseng'
        ],
        avoidIf: []
      },
      concerns: {
        primary: ['dehydration', 'dullness', 'dryness'],
        secondary: ['fine-lines', 'plumpness'],
        suitability: 0.95
      },
      texture: {
        type: 'cream',
        weight: 'rich',
        finish: 'dewy',
        absorption: 6,
        residue: 4,
        hydration: 10,
        occlusion: 7
      },
      vibe: {
        aesthetic: ['luxurious', 'japanese', 'ritualistic'],
        skinTypes: ['dry', 'normal', 'dehydrated'],
        ageRange: [25, 60],
        routine: 'morning-evening'
      }
    },

    // ----- La Mer Crème de la Mer -----
    'la-mer-cream': {
      productId: 'la-mer-cream',
      ingredients: {
        heroIngredient: 'miracle-broth',
        keyActives: [
          'miracle-broth',
          'sea-kelp',
          'calcium',
          'magnesium',
          'potassium',
          'iron',
          'lecithin',
          'vitamins-c-e-b12'
        ],
        supportingIngredients: [
          'lime-tea-extract',
          'sesame-oil',
          'eucalyptus',
          'sunflower-oil'
        ],
        avoidIf: []
      },
      concerns: {
        primary: ['dryness', 'healing', 'barrier-repair'],
        secondary: ['aging', 'fine-lines', 'soothing'],
        suitability: 0.85  // Subjective luxury
      },
      texture: {
        type: 'cream',
        weight: 'very-rich',
        finish: 'natural-to-dewy',
        absorption: 4,  // Requires warming
        residue: 5,
        hydration: 10,
        occlusion: 9
      },
      vibe: {
        aesthetic: ['luxurious', 'iconic', 'ritualistic'],
        skinTypes: ['dry', 'very-dry', 'mature'],
        ageRange: [35, 80],
        routine: 'morning-evening'
      }
    }
  },

  // ============================================
  // UTILITY METHODS
  // ============================================
  
  /**
   * Get makeup profile by product ID
   */
  getMakeupProfile(productId) {
    return this.makeup[productId] || null;
  },

  /**
   * Get skincare profile by product ID
   */
  getSkincareProfile(productId) {
    return this.skincare[productId] || null;
  },

  /**
   * Get any profile by ID
   */
  getProfile(productId) {
    return this.getMakeupProfile(productId) || this.getSkincareProfile(productId);
  },

  /**
   * Get all profiles with matching concerns
   */
  getByConcern(concern) {
    const results = [];
    Object.values(this.skincare).forEach(profile => {
      if (profile.concerns.primary.includes(concern) || 
          profile.concerns.secondary.includes(concern)) {
        results.push(profile);
      }
    });
    return results;
  },

  /**
   * Get all profiles with matching ingredient
   */
  getByIngredient(ingredient) {
    const results = [];
    Object.values(this.skincare).forEach(profile => {
      const allIngredients = [
        profile.ingredients.heroIngredient,
        ...(profile.ingredients.keyActives || []),
        ...(profile.ingredients.supportingIngredients || [])
      ];
      if (allIngredients.some(i => i.includes(ingredient))) {
        results.push(profile);
      }
    });
    return results;
  }
};
