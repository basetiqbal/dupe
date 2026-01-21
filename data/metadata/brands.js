/**
 * THE DUPE EDIT — Brand Metadata Registry
 * 
 * Centralized brand information for:
 * - Consistent naming across products
 * - Brand tier classification for scoring
 * - Metadata enrichment
 * 
 * Tiers explained:
 * - luxury: Heritage houses, ultra-premium (Chanel, Hermès, La Mer)
 * - prestige: High-end department store brands (Estée Lauder, MAC)
 * - niche: Specialized artisanal brands (Maison Francis Kurkdjian, Byredo)
 * - masstige: Mass-market premium (Charlotte Tilbury, Rare Beauty)
 * - indie: Independent emerging brands (Dossier, The Ordinary)
 * - drugstore: Mass-market accessible (Maybelline, CeraVe)
 */

window.BRAND_REGISTRY = {
  version: '1.0.0',
  lastUpdated: '2026-01-20',
  
  brands: {
    // ============================================
    // LUXURY TIER
    // ============================================
    'chanel': {
      id: 'chanel',
      name: 'Chanel',
      tier: 'luxury',
      country: 'FR',
      founded: 1910,
      parentCompany: 'Chanel Limited',
      description: 'Iconic French luxury house known for timeless elegance',
      categories: ['fragrance', 'makeup', 'skincare'],
      website: 'https://www.chanel.com'
    },
    'dior': {
      id: 'dior',
      name: 'Dior',
      tier: 'luxury',
      country: 'FR',
      founded: 1946,
      parentCompany: 'LVMH',
      description: 'French luxury goods company',
      categories: ['fragrance', 'makeup', 'skincare'],
      website: 'https://www.dior.com'
    },
    'hermes': {
      id: 'hermes',
      name: 'Hermès',
      tier: 'luxury',
      country: 'FR',
      founded: 1837,
      parentCompany: 'Hermès International',
      description: 'French high fashion luxury goods manufacturer',
      categories: ['fragrance'],
      website: 'https://www.hermes.com'
    },
    'la-mer': {
      id: 'la-mer',
      name: 'La Mer',
      tier: 'luxury',
      country: 'US',
      founded: 1965,
      parentCompany: 'Estée Lauder Companies',
      description: 'Luxury skincare brand known for Miracle Broth',
      categories: ['skincare'],
      website: 'https://www.lamer.com'
    },
    'tom-ford': {
      id: 'tom-ford',
      name: 'Tom Ford',
      tier: 'luxury',
      country: 'US',
      founded: 2005,
      parentCompany: 'Estée Lauder Companies',
      description: 'Luxury fashion and beauty brand',
      categories: ['fragrance', 'makeup'],
      website: 'https://www.tomford.com'
    },
    'creed': {
      id: 'creed',
      name: 'Creed',
      tier: 'luxury',
      country: 'FR',
      founded: 1760,
      parentCompany: 'Kering',
      description: 'Historic fragrance house with royal heritage',
      categories: ['fragrance'],
      website: 'https://www.creedfragrance.com'
    },

    // ============================================
    // NICHE TIER
    // ============================================
    'maison-francis-kurkdjian': {
      id: 'maison-francis-kurkdjian',
      name: 'Maison Francis Kurkdjian',
      tier: 'niche',
      country: 'FR',
      founded: 2009,
      parentCompany: 'LVMH',
      description: 'Luxury niche fragrance house by master perfumer Francis Kurkdjian',
      categories: ['fragrance'],
      website: 'https://www.franciskurkdjian.com'
    },
    'parfums-de-marly': {
      id: 'parfums-de-marly',
      name: 'Parfums de Marly',
      tier: 'niche',
      country: 'FR',
      founded: 2009,
      parentCompany: 'Independent',
      description: 'French niche perfume house inspired by 18th century Versailles',
      categories: ['fragrance'],
      website: 'https://parfums-de-marly.com'
    },
    'initio': {
      id: 'initio',
      name: 'Initio Parfums Privés',
      tier: 'niche',
      country: 'FR',
      founded: 2015,
      description: 'Niche fragrance house focused on pheromone-inspired scents',
      categories: ['fragrance'],
      website: 'https://www.initioparfums.com'
    },
    'mancera': {
      id: 'mancera',
      name: 'Mancera',
      tier: 'niche',
      country: 'FR',
      founded: 2008,
      description: 'Niche fragrance house known for powerful, long-lasting scents',
      categories: ['fragrance'],
      website: 'https://www.manceraparis.com'
    },
    'room-1015': {
      id: 'room-1015',
      name: 'Room 1015',
      tier: 'niche',
      country: 'FR',
      founded: 2015,
      description: 'Rock-inspired niche fragrance house',
      categories: ['fragrance'],
      website: 'https://room1015.com'
    },
    'skinceuticals': {
      id: 'skinceuticals',
      name: 'SkinCeuticals',
      tier: 'niche',
      country: 'US',
      founded: 1997,
      parentCompany: "L'Oréal",
      description: 'Professional-grade skincare backed by science',
      categories: ['skincare'],
      website: 'https://www.skinceuticals.com'
    },
    'tatcha': {
      id: 'tatcha',
      name: 'Tatcha',
      tier: 'niche',
      country: 'US',
      founded: 2009,
      parentCompany: 'Unilever',
      description: 'Japanese beauty rituals meets modern skincare',
      categories: ['skincare'],
      website: 'https://www.tatcha.com'
    },
    'drunk-elephant': {
      id: 'drunk-elephant',
      name: 'Drunk Elephant',
      tier: 'niche',
      country: 'US',
      founded: 2012,
      parentCompany: 'Shiseido',
      description: 'Clean-clinical skincare with biocompatible philosophy',
      categories: ['skincare'],
      website: 'https://www.drunkelephant.com'
    },

    // ============================================
    // PRESTIGE TIER
    // ============================================
    'charlotte-tilbury': {
      id: 'charlotte-tilbury',
      name: 'Charlotte Tilbury',
      tier: 'prestige',
      country: 'GB',
      founded: 2013,
      parentCompany: 'Puig',
      description: 'Pro-inspired luxury makeup and skincare',
      categories: ['makeup', 'skincare'],
      website: 'https://www.charlottetilbury.com'
    },
    'nars': {
      id: 'nars',
      name: 'NARS',
      tier: 'prestige',
      country: 'US',
      founded: 1994,
      parentCompany: 'Shiseido',
      description: 'Bold, artistic color cosmetics',
      categories: ['makeup'],
      website: 'https://www.narscosmetics.com'
    },
    'mac': {
      id: 'mac',
      name: 'MAC',
      tier: 'prestige',
      country: 'CA',
      founded: 1984,
      parentCompany: 'Estée Lauder Companies',
      description: 'Professional makeup artistry for all',
      categories: ['makeup'],
      website: 'https://www.maccosmetics.com'
    },
    'lancome': {
      id: 'lancome',
      name: 'Lancôme',
      tier: 'prestige',
      country: 'FR',
      founded: 1935,
      parentCompany: "L'Oréal",
      description: 'French luxury beauty and skincare',
      categories: ['makeup', 'skincare', 'fragrance'],
      website: 'https://www.lancome.com'
    },
    'burberry': {
      id: 'burberry',
      name: 'Burberry',
      tier: 'prestige',
      country: 'GB',
      founded: 1856,
      description: 'British luxury fashion and fragrance house',
      categories: ['fragrance'],
      website: 'https://www.burberry.com'
    },
    'ysl': {
      id: 'ysl',
      name: 'Yves Saint Laurent',
      tier: 'prestige',
      country: 'FR',
      founded: 1961,
      parentCompany: "L'Oréal",
      description: 'French luxury beauty and fashion',
      categories: ['makeup', 'fragrance'],
      website: 'https://www.yslbeauty.com'
    },
    'versace': {
      id: 'versace',
      name: 'Versace',
      tier: 'prestige',
      country: 'IT',
      founded: 1978,
      parentCompany: 'Capri Holdings',
      description: 'Italian luxury fashion and fragrance',
      categories: ['fragrance'],
      website: 'https://www.versace.com'
    },
    'montblanc': {
      id: 'montblanc',
      name: 'Montblanc',
      tier: 'prestige',
      country: 'DE',
      founded: 1906,
      parentCompany: 'Richemont',
      description: 'Luxury goods manufacturer',
      categories: ['fragrance'],
      website: 'https://www.montblanc.com'
    },
    'kiehls': {
      id: 'kiehls',
      name: "Kiehl's",
      tier: 'prestige',
      country: 'US',
      founded: 1851,
      parentCompany: "L'Oréal",
      description: 'Apothecary-heritage skincare brand',
      categories: ['skincare'],
      website: 'https://www.kiehls.com'
    },
    'benefit': {
      id: 'benefit',
      name: 'Benefit Cosmetics',
      tier: 'prestige',
      country: 'US',
      founded: 1976,
      parentCompany: 'LVMH',
      description: 'Fun, problem-solving cosmetics',
      categories: ['makeup'],
      website: 'https://www.benefitcosmetics.com'
    },
    'makeup-by-mario': {
      id: 'makeup-by-mario',
      name: 'Makeup by Mario',
      tier: 'prestige',
      country: 'US',
      founded: 2020,
      description: 'Celebrity makeup artist brand',
      categories: ['makeup'],
      website: 'https://www.makeupbymario.com'
    },

    // ============================================
    // MASSTIGE TIER
    // ============================================
    'rare-beauty': {
      id: 'rare-beauty',
      name: 'Rare Beauty',
      tier: 'masstige',
      country: 'US',
      founded: 2020,
      parentCompany: 'Selena Gomez',
      description: 'Inclusive beauty celebrating individuality',
      categories: ['makeup'],
      website: 'https://www.rarebeauty.com'
    },
    'ariana-grande': {
      id: 'ariana-grande',
      name: 'Ariana Grande',
      tier: 'masstige',
      country: 'US',
      founded: 2015,
      description: 'Celebrity fragrance line',
      categories: ['fragrance'],
      website: 'https://www.arianagrande.com'
    },
    'fragrance-one': {
      id: 'fragrance-one',
      name: 'Fragrance One',
      tier: 'masstige',
      country: 'US',
      founded: 2018,
      description: 'Fragrance influencer-created brand',
      categories: ['fragrance'],
      website: 'https://www.fragrance.one'
    },
    'la-roche-posay': {
      id: 'la-roche-posay',
      name: 'La Roche-Posay',
      tier: 'masstige',
      country: 'FR',
      founded: 1975,
      parentCompany: "L'Oréal",
      description: 'Dermatologist-recommended skincare',
      categories: ['skincare'],
      website: 'https://www.laroche-posay.us'
    },
    'belif': {
      id: 'belif',
      name: 'belif',
      tier: 'masstige',
      country: 'KR',
      founded: 2010,
      parentCompany: 'LG Household & Health Care',
      description: 'Korean skincare with herbal heritage',
      categories: ['skincare'],
      website: 'https://www.belifusa.com'
    },
    'cosrx': {
      id: 'cosrx',
      name: 'COSRX',
      tier: 'masstige',
      country: 'KR',
      founded: 2013,
      description: 'K-beauty cult favorite for problem skin',
      categories: ['skincare'],
      website: 'https://www.cosrx.com'
    },
    'first-aid-beauty': {
      id: 'first-aid-beauty',
      name: 'First Aid Beauty',
      tier: 'masstige',
      country: 'US',
      founded: 2009,
      parentCompany: 'Procter & Gamble',
      description: 'Gentle, effective skincare for sensitive skin',
      categories: ['skincare'],
      website: 'https://www.firstaidbeauty.com'
    },

    // ============================================
    // INDIE TIER
    // ============================================
    'dossier': {
      id: 'dossier',
      name: 'Dossier',
      tier: 'indie',
      country: 'US',
      founded: 2018,
      description: 'Clean, affordable fragrance alternatives',
      categories: ['fragrance'],
      website: 'https://www.dossier.co'
    },
    'alt-fragrances': {
      id: 'alt-fragrances',
      name: 'ALT Fragrances',
      tier: 'indie',
      country: 'US',
      founded: 2020,
      description: 'Designer fragrance alternatives',
      categories: ['fragrance'],
      website: 'https://www.altfragrances.com'
    },
    'armaf': {
      id: 'armaf',
      name: 'Armaf',
      tier: 'indie',
      country: 'AE',
      founded: 2010,
      description: 'Dubai-based fragrance house known for quality dupes',
      categories: ['fragrance'],
      website: 'https://www.armaf.co'
    },
    'afnan': {
      id: 'afnan',
      name: 'Afnan',
      tier: 'indie',
      country: 'AE',
      founded: 2010,
      description: 'Middle Eastern fragrance house',
      categories: ['fragrance'],
      website: 'https://www.afnanperfumes.com'
    },
    'rasasi': {
      id: 'rasasi',
      name: 'Rasasi',
      tier: 'indie',
      country: 'AE',
      founded: 1979,
      description: 'Premium Arabian perfume house',
      categories: ['fragrance'],
      website: 'https://www.rasasi.com'
    },
    'al-haramain': {
      id: 'al-haramain',
      name: 'Al Haramain',
      tier: 'indie',
      country: 'AE',
      founded: 1970,
      description: 'Traditional Arabian perfume house',
      categories: ['fragrance'],
      website: 'https://www.alharamainperfumes.com'
    },
    'the-ordinary': {
      id: 'the-ordinary',
      name: 'The Ordinary',
      tier: 'indie',
      country: 'CA',
      founded: 2016,
      parentCompany: 'DECIEM / Estée Lauder',
      description: 'Clinical formulations with integrity',
      categories: ['skincare'],
      website: 'https://www.theordinary.com'
    },
    'the-inkey-list': {
      id: 'the-inkey-list',
      name: 'The INKEY List',
      tier: 'indie',
      country: 'GB',
      founded: 2018,
      description: 'Affordable, effective skincare solutions',
      categories: ['skincare'],
      website: 'https://www.theinkeylist.com'
    },
    'naturium': {
      id: 'naturium',
      name: 'Naturium',
      tier: 'indie',
      country: 'US',
      founded: 2019,
      parentCompany: 'E.l.f. Beauty',
      description: 'Clean, potent skincare at accessible prices',
      categories: ['skincare'],
      website: 'https://www.naturium.com'
    },
    'timeless': {
      id: 'timeless',
      name: 'Timeless Skin Care',
      tier: 'indie',
      country: 'US',
      founded: 2008,
      description: 'No-frills effective skincare',
      categories: ['skincare'],
      website: 'https://www.timelessha.com'
    },

    // ============================================
    // DRUGSTORE TIER
    // ============================================
    'elizabeth-arden': {
      id: 'elizabeth-arden',
      name: 'Elizabeth Arden',
      tier: 'drugstore',
      country: 'US',
      founded: 1910,
      parentCompany: 'Revlon',
      description: 'Classic American beauty brand',
      categories: ['fragrance', 'skincare'],
      website: 'https://www.elizabetharden.com'
    },
    'zara': {
      id: 'zara',
      name: 'Zara',
      tier: 'drugstore',
      country: 'ES',
      founded: 1975,
      parentCompany: 'Inditex',
      description: 'Fast fashion retailer with fragrance line',
      categories: ['fragrance'],
      website: 'https://www.zara.com'
    },
    'revlon': {
      id: 'revlon',
      name: 'Revlon',
      tier: 'drugstore',
      country: 'US',
      founded: 1932,
      description: 'Iconic American drugstore beauty brand',
      categories: ['makeup'],
      website: 'https://www.revlon.com'
    },
    'nyx': {
      id: 'nyx',
      name: 'NYX Professional Makeup',
      tier: 'drugstore',
      country: 'US',
      founded: 1999,
      parentCompany: "L'Oréal",
      description: 'Affordable professional-quality makeup',
      categories: ['makeup'],
      website: 'https://www.nyxcosmetics.com'
    },
    'milani': {
      id: 'milani',
      name: 'Milani',
      tier: 'drugstore',
      country: 'US',
      founded: 2001,
      description: 'Italian-inspired drugstore cosmetics',
      categories: ['makeup'],
      website: 'https://www.milanicosmetics.com'
    },
    'maybelline': {
      id: 'maybelline',
      name: 'Maybelline',
      tier: 'drugstore',
      country: 'US',
      founded: 1915,
      parentCompany: "L'Oréal",
      description: 'New York-inspired drugstore makeup',
      categories: ['makeup'],
      website: 'https://www.maybelline.com'
    },
    'wet-n-wild': {
      id: 'wet-n-wild',
      name: 'wet n wild',
      tier: 'drugstore',
      country: 'US',
      founded: 1979,
      description: 'Ultra-affordable color cosmetics',
      categories: ['makeup'],
      website: 'https://www.wetnwildbeauty.com'
    },
    'elf': {
      id: 'elf',
      name: 'e.l.f. Cosmetics',
      tier: 'drugstore',
      country: 'US',
      founded: 2004,
      description: 'Affordable, cruelty-free beauty',
      categories: ['makeup', 'skincare'],
      website: 'https://www.elfcosmetics.com'
    }
  },

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Get brand by ID
   * @param {string} brandId
   * @returns {Object|null}
   */
  getBrand(brandId) {
    return this.brands[brandId] || null;
  },

  /**
   * Get brand tier
   * @param {string} brandId
   * @returns {string|null}
   */
  getTier(brandId) {
    const brand = this.getBrand(brandId);
    return brand ? brand.tier : null;
  },

  /**
   * Get all brands by tier
   * @param {string} tier
   * @returns {Object[]}
   */
  getBrandsByTier(tier) {
    return Object.values(this.brands).filter(b => b.tier === tier);
  },

  /**
   * Get tier configuration
   * @param {string} tier
   * @returns {Object}
   */
  getTierConfig(tier) {
    return window.DUPE_SCHEMAS?.brand?.tiers?.[tier] || null;
  },

  /**
   * Calculate tier distance (for scoring)
   * Lower distance = closer tier (e.g., luxury to prestige = 1, luxury to drugstore = 4)
   * @param {string} tier1
   * @param {string} tier2
   * @returns {number}
   */
  getTierDistance(tier1, tier2) {
    const tierOrder = ['luxury', 'niche', 'prestige', 'masstige', 'indie', 'drugstore'];
    const idx1 = tierOrder.indexOf(tier1);
    const idx2 = tierOrder.indexOf(tier2);
    if (idx1 === -1 || idx2 === -1) return 5;
    return Math.abs(idx1 - idx2);
  },

  /**
   * Fuzzy search brands by name
   * @param {string} query
   * @returns {Object[]}
   */
  searchBrands(query) {
    const normalized = query.toLowerCase().trim();
    return Object.values(this.brands).filter(brand => {
      return brand.name.toLowerCase().includes(normalized) ||
             brand.id.includes(normalized);
    });
  }
};

// Freeze to prevent mutation
Object.freeze(window.BRAND_REGISTRY.brands);
