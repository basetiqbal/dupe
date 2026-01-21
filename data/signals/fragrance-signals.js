/**
 * THE DUPE EDIT — Fragrance Signal Profiles
 * 
 * This file contains normalized signal data for fragrance products.
 * Signals enable multi-dimensional matching beyond simple name/brand matching.
 * 
 * Signal Structure:
 * - scent: Note pyramid, family, accords
 * - performance: Longevity, sillage, projection metrics
 * - vibe: Aesthetic, occasion, season, mood descriptors
 * 
 * These signals are used by the scoring engine to calculate similarity
 * across multiple dimensions, providing more accurate dupe matching.
 */

window.FRAGRANCE_SIGNALS = {
  version: '1.0.0',
  lastUpdated: '2026-01-20',
  
  // ============================================
  // FRAGRANCE SIGNAL PROFILES
  // Keyed by product ID
  // ============================================
  profiles: {
    // ----- Baccarat Rouge 540 -----
    'br540': {
      productId: 'br540',
      scent: {
        family: 'oriental',
        subfamilies: ['amber', 'floral', 'woody'],
        topNotes: ['saffron', 'jasmine'],
        heartNotes: ['amberwood', 'ambergris'],
        baseNotes: ['fir-resin', 'cedar'],
        accords: ['amber', 'sweet', 'warm', 'woody', 'powdery'],
        dominant: 'amber',
        character: 'A crystalline, almost ethereal amber with burnt sugar and saffron facets'
      },
      performance: {
        longevity: 8,  // 1-10 scale
        sillage: 8,
        projection: 7,
        seasonality: {
          spring: 0.7,
          summer: 0.5,
          fall: 0.9,
          winter: 1.0
        }
      },
      vibe: {
        aesthetic: ['modern', 'luxurious', 'minimalist'],
        occasion: ['special-occasion', 'date-night', 'evening'],
        mood: ['sophisticated', 'confident', 'mysterious'],
        demographic: {
          genderLean: 0.4,  // 0 = feminine, 0.5 = unisex, 1 = masculine
          ageRange: [25, 55]
        }
      }
    },

    // ----- Ariana Grande Cloud (BR540 dupe) -----
    'cloud': {
      productId: 'cloud',
      luxuryReference: 'br540',
      scent: {
        family: 'oriental',
        subfamilies: ['amber', 'floral', 'sweet'],
        topNotes: ['lavender-blossom', 'juicy-pear', 'bergamot'],
        heartNotes: ['coconut', 'praline', 'vanilla-orchid'],
        baseNotes: ['creamy-musks', 'blonde-woods', 'cashmere'],
        accords: ['sweet', 'amber', 'musky', 'warm', 'powdery'],
        dominant: 'sweet-amber',
        character: 'Dreamy, sweet, and cozy with similar amber DNA but more accessible'
      },
      performance: {
        longevity: 6,
        sillage: 6,
        projection: 5,
        seasonality: {
          spring: 0.8,
          summer: 0.6,
          fall: 0.9,
          winter: 0.9
        }
      },
      vibe: {
        aesthetic: ['approachable', 'modern', 'romantic'],
        occasion: ['everyday', 'date-night', 'casual'],
        mood: ['cozy', 'romantic', 'playful'],
        demographic: {
          genderLean: 0.3,
          ageRange: [18, 40]
        }
      }
    },

    // ----- Tom Ford Lost Cherry -----
    'lost-cherry': {
      productId: 'lost-cherry',
      scent: {
        family: 'gourmand',
        subfamilies: ['fruity', 'oriental'],
        topNotes: ['black-cherry', 'cherry-liqueur'],
        heartNotes: ['bitter-almond', 'turkish-rose', 'jasmine'],
        baseNotes: ['peru-balsam', 'roasted-tonka', 'sandalwood', 'vetiver'],
        accords: ['sweet', 'fruity', 'boozy', 'warm', 'almond'],
        dominant: 'boozy-cherry',
        character: 'Seductive boozy cherry with almond bitterness and creamy base'
      },
      performance: {
        longevity: 7,
        sillage: 7,
        projection: 6,
        seasonality: {
          spring: 0.6,
          summer: 0.4,
          fall: 0.9,
          winter: 1.0
        }
      },
      vibe: {
        aesthetic: ['bold', 'luxurious', 'seductive'],
        occasion: ['date-night', 'evening', 'special-occasion'],
        mood: ['sensual', 'confident', 'mysterious'],
        demographic: {
          genderLean: 0.4,
          ageRange: [25, 50]
        }
      }
    },

    // ----- Creed Aventus -----
    'aventus': {
      productId: 'aventus',
      scent: {
        family: 'chypre',
        subfamilies: ['fruity', 'woody', 'smoky'],
        topNotes: ['pineapple', 'blackcurrant', 'apple', 'bergamot'],
        heartNotes: ['birch', 'patchouli', 'moroccan-jasmine', 'pink-pepper'],
        baseNotes: ['musk', 'oakmoss', 'ambergris', 'vanilla'],
        accords: ['fruity', 'smoky', 'woody', 'fresh', 'powerful'],
        dominant: 'smoky-pineapple',
        character: 'Iconic fruity-smoky-woody powerhouse symbolizing success'
      },
      performance: {
        longevity: 8,
        sillage: 9,
        projection: 8,
        seasonality: {
          spring: 0.9,
          summer: 0.7,
          fall: 0.8,
          winter: 0.7
        }
      },
      vibe: {
        aesthetic: ['powerful', 'modern', 'statement'],
        occasion: ['office', 'special-occasion', 'date-night'],
        mood: ['confident', 'powerful', 'sophisticated'],
        demographic: {
          genderLean: 0.8,
          ageRange: [25, 55]
        }
      }
    },

    // ----- Club de Nuit Intense Man (Aventus dupe) -----
    'cdnim': {
      productId: 'cdnim',
      luxuryReference: 'aventus',
      scent: {
        family: 'chypre',
        subfamilies: ['fruity', 'woody', 'smoky'],
        topNotes: ['lemon', 'pineapple', 'blackcurrant', 'apple', 'bergamot'],
        heartNotes: ['birch', 'jasmine', 'rose'],
        baseNotes: ['musk', 'patchouli', 'ambergris', 'vanilla'],
        accords: ['fruity', 'smoky', 'woody', 'fresh', 'lemony'],
        dominant: 'lemony-smoky-pineapple',
        character: 'Remarkably similar to Aventus with stronger lemon opening'
      },
      performance: {
        longevity: 9,
        sillage: 9,
        projection: 9,
        seasonality: {
          spring: 0.9,
          summer: 0.6,
          fall: 0.8,
          winter: 0.7
        }
      },
      vibe: {
        aesthetic: ['powerful', 'modern', 'accessible'],
        occasion: ['office', 'everyday', 'date-night'],
        mood: ['confident', 'energetic', 'powerful'],
        demographic: {
          genderLean: 0.85,
          ageRange: [20, 50]
        }
      }
    },

    // ----- Parfums de Marly Delina -----
    'delina': {
      productId: 'delina',
      scent: {
        family: 'floral',
        subfamilies: ['fruity', 'rose', 'musky'],
        topNotes: ['lychee', 'rhubarb', 'bergamot', 'nutmeg'],
        heartNotes: ['turkish-rose', 'peony', 'vanilla'],
        baseNotes: ['musk', 'incense', 'cashmeran', 'cedarwood'],
        accords: ['floral', 'fruity', 'sweet', 'rosy', 'musky'],
        dominant: 'fruity-rose',
        character: 'Romantic, feminine rose with lychee sparkle and vanilla warmth'
      },
      performance: {
        longevity: 8,
        sillage: 8,
        projection: 7,
        seasonality: {
          spring: 1.0,
          summer: 0.7,
          fall: 0.8,
          winter: 0.6
        }
      },
      vibe: {
        aesthetic: ['romantic', 'luxurious', 'feminine'],
        occasion: ['date-night', 'wedding', 'special-occasion'],
        mood: ['romantic', 'elegant', 'confident'],
        demographic: {
          genderLean: 0.2,
          ageRange: [20, 45]
        }
      }
    },

    // ----- Dior Sauvage -----
    'sauvage': {
      productId: 'sauvage',
      scent: {
        family: 'aromatic',
        subfamilies: ['fresh', 'spicy', 'woody'],
        topNotes: ['calabrian-bergamot', 'pepper'],
        heartNotes: ['sichuan-pepper', 'lavender', 'star-anise', 'nutmeg', 'pink-pepper'],
        baseNotes: ['ambroxan', 'cedar', 'labdanum', 'vanilla', 'vetiver'],
        accords: ['fresh', 'spicy', 'woody', 'amber', 'aromatic'],
        dominant: 'ambroxan-bergamot',
        character: 'Raw, noble, fresh and spicy with powerful ambroxan backbone'
      },
      performance: {
        longevity: 9,
        sillage: 9,
        projection: 8,
        seasonality: {
          spring: 0.9,
          summer: 0.7,
          fall: 0.8,
          winter: 0.8
        }
      },
      vibe: {
        aesthetic: ['modern', 'powerful', 'clean'],
        occasion: ['everyday', 'office', 'date-night'],
        mood: ['confident', 'fresh', 'energetic'],
        demographic: {
          genderLean: 0.85,
          ageRange: [18, 50]
        }
      }
    },

    // ----- Chanel No. 5 -----
    'chanel-no5': {
      productId: 'chanel-no5',
      scent: {
        family: 'floral',
        subfamilies: ['aldehydic', 'powdery'],
        topNotes: ['aldehydes', 'ylang-ylang', 'neroli', 'bergamot', 'lemon'],
        heartNotes: ['jasmine', 'rose', 'lily-of-the-valley', 'iris'],
        baseNotes: ['sandalwood', 'cedar', 'vetiver', 'musk', 'vanilla', 'amber'],
        accords: ['aldehydic', 'powdery', 'floral', 'woody', 'classic'],
        dominant: 'aldehydic-floral',
        character: 'The original luxury fragrance - timeless aldehydic floral elegance'
      },
      performance: {
        longevity: 8,
        sillage: 7,
        projection: 6,
        seasonality: {
          spring: 0.8,
          summer: 0.6,
          fall: 0.9,
          winter: 0.9
        }
      },
      vibe: {
        aesthetic: ['classic', 'elegant', 'timeless'],
        occasion: ['special-occasion', 'evening', 'formal'],
        mood: ['sophisticated', 'elegant', 'confident'],
        demographic: {
          genderLean: 0.2,
          ageRange: [30, 70]
        }
      }
    },

    // ----- Tom Ford Oud Wood -----
    'oud-wood': {
      productId: 'oud-wood',
      scent: {
        family: 'woody',
        subfamilies: ['oud', 'spicy'],
        topNotes: ['oud', 'rosewood', 'cardamom'],
        heartNotes: ['sandalwood', 'vetiver', 'tonka'],
        baseNotes: ['amber', 'synthetic-musks'],
        accords: ['woody', 'oud', 'warm', 'spicy', 'creamy'],
        dominant: 'creamy-oud',
        character: 'Sophisticated, accessible oud with creamy sandalwood'
      },
      performance: {
        longevity: 7,
        sillage: 6,
        projection: 5,
        seasonality: {
          spring: 0.6,
          summer: 0.4,
          fall: 0.9,
          winter: 1.0
        }
      },
      vibe: {
        aesthetic: ['sophisticated', 'minimalist', 'luxurious'],
        occasion: ['evening', 'date-night', 'formal'],
        mood: ['mysterious', 'sophisticated', 'confident'],
        demographic: {
          genderLean: 0.6,
          ageRange: [28, 60]
        }
      }
    },

    // ----- Bleu de Chanel -----
    'bleu-de-chanel': {
      productId: 'bleu-de-chanel',
      scent: {
        family: 'woody',
        subfamilies: ['aromatic', 'fresh', 'citrus'],
        topNotes: ['grapefruit', 'lemon', 'mint', 'pink-pepper'],
        heartNotes: ['ginger', 'nutmeg', 'jasmine', 'iso-e-super'],
        baseNotes: ['cedar', 'sandalwood', 'labdanum', 'vetiver', 'incense', 'patchouli'],
        accords: ['woody', 'fresh', 'aromatic', 'citrus', 'clean'],
        dominant: 'woody-citrus',
        character: 'Refined, sophisticated blue fragrance benchmark'
      },
      performance: {
        longevity: 8,
        sillage: 7,
        projection: 6,
        seasonality: {
          spring: 0.9,
          summer: 0.8,
          fall: 0.8,
          winter: 0.7
        }
      },
      vibe: {
        aesthetic: ['refined', 'modern', 'clean'],
        occasion: ['office', 'everyday', 'date-night'],
        mood: ['confident', 'sophisticated', 'calm'],
        demographic: {
          genderLean: 0.8,
          ageRange: [22, 55]
        }
      }
    }
  },

  // ============================================
  // UTILITY METHODS
  // ============================================
  
  /**
   * Get signal profile for a product
   * @param {string} productId
   * @returns {Object|null}
   */
  getProfile(productId) {
    return this.profiles[productId] || null;
  },

  /**
   * Get all profiles for a scent family
   * @param {string} family
   * @returns {Object[]}
   */
  getByFamily(family) {
    return Object.values(this.profiles).filter(p => 
      p.scent.family === family || 
      p.scent.subfamilies?.includes(family)
    );
  },

  /**
   * Get all dupes for a luxury product
   * @param {string} luxuryProductId
   * @returns {Object[]}
   */
  getDupeSignals(luxuryProductId) {
    return Object.values(this.profiles).filter(p => 
      p.luxuryReference === luxuryProductId
    );
  },

  /**
   * Check if a note exists in a profile
   * @param {Object} profile
   * @param {string} note
   * @returns {boolean}
   */
  hasNote(profile, note) {
    const allNotes = [
      ...(profile.scent?.topNotes || []),
      ...(profile.scent?.heartNotes || []),
      ...(profile.scent?.baseNotes || [])
    ];
    return allNotes.includes(note);
  },

  /**
   * Get all unique notes from all profiles
   * @returns {string[]}
   */
  getAllNotes() {
    const notes = new Set();
    Object.values(this.profiles).forEach(profile => {
      (profile.scent?.topNotes || []).forEach(n => notes.add(n));
      (profile.scent?.heartNotes || []).forEach(n => notes.add(n));
      (profile.scent?.baseNotes || []).forEach(n => notes.add(n));
    });
    return Array.from(notes).sort();
  }
};
