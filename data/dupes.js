/**
 * THE DUPE EDIT — Product Database
 * 
 * Data Structure:
 * - Each product represents a luxury/high-end item
 * - Dupes are stored as nested arrays within each product
 * - matchScore (0-100) indicates similarity confidence
 * - bestFor tags help users self-identify
 * 
 * Scaling Strategy:
 * 1. MVP: Hardcoded curated data (this file)
 * 2. V1.1: Move to external JSON, lazy-load by category
 * 3. V2: API integration with database backend
 * 4. V3: Embeddings + vector similarity search
 */

window.DUPE_DATABASE = {
  version: "1.0.0",
  lastUpdated: "2026-01-20",
  
  products: [
    // ============================================
    // FRAGRANCES — WOMEN'S / UNISEX
    // ============================================
    {
      id: "br540",
      name: "Baccarat Rouge 540",
      brand: "Maison Francis Kurkdjian",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$325 (2.4 oz)",
      description: "Amber, woody, floral with saffron and jasmine. Iconic modern luxury scent.",
      aliases: ["baccarat", "br540", "rouge 540", "mfk baccarat"],
      dupes: [
        {
          name: "Cloud",
          brand: "Ariana Grande",
          priceRange: "$40–$65",
          matchScore: 82,
          reason: "Shares the dreamy, sweet amber DNA with similar lavender blossom and musk notes. The closest mainstream dupe available.",
          differences: "Less complex dry-down, lighter sillage, and missing the distinctive burnt sugar/caramel facet of the original.",
          bestFor: ["Beginners", "Budget-conscious", "Everyday wear"]
        },
        {
          name: "Burberry Her Intense",
          brand: "Burberry",
          priceRange: "$95–$135",
          matchScore: 72,
          reason: "Similar amber-berry sweetness with a warm, cozy base. More accessible price point for a designer option.",
          differences: "Fruitier opening, less woody depth. More conventionally feminine presentation.",
          bestFor: ["Designer alternative", "Berry lovers", "Fall/Winter"]
        },
        {
          name: "Extrait de Parfum",
          brand: "Dossier",
          priceRange: "$49",
          matchScore: 78,
          reason: "Specifically formulated as a BR540 alternative. Captures the saffron-amber accord well.",
          differences: "Shorter longevity, less projection. Clean but not as nuanced.",
          bestFor: ["Direct comparison seekers", "Testing before investing"]
        },
        {
          name: "Instant Crush",
          brand: "Mancera",
          priceRange: "$85–$140",
          matchScore: 75,
          reason: "Niche quality at fraction of price. Similar amber-sandalwood warmth with good performance.",
          differences: "Heavier, more linear. Works better in cold weather.",
          bestFor: ["Niche explorers", "Longevity seekers", "Cold weather"]
        }
      ]
    },
    {
      id: "lost-cherry",
      name: "Lost Cherry",
      brand: "Tom Ford",
      category: "fragrance",
      subcategory: "eau de parfum", 
      price: "$395 (1.7 oz)",
      description: "Boozy black cherry, almond, and tonka bean. Seductive and gourmand.",
      aliases: ["tom ford cherry", "tf lost cherry"],
      dupes: [
        {
          name: "Cherry Punk",
          brand: "Room 1015",
          priceRange: "$130–$175",
          matchScore: 80,
          reason: "Excellent niche alternative with similar boozy cherry and almond notes. Edgier, more unique take.",
          differences: "More smoky/leathery. Less sweet, more unisex.",
          bestFor: ["Niche collectors", "Those who find TF too sweet"]
        },
        {
          name: "Dark Cherry",
          brand: "Zara",
          priceRange: "$25–$35",
          matchScore: 68,
          reason: "Surprisingly close opening with cherry-almond accord. Incredible value for the similarity.",
          differences: "Much shorter longevity (2-3 hours). Less complex, more synthetic feel.",
          bestFor: ["Budget explorers", "Testing the vibe", "Layering"]
        },
        {
          name: "Cherry Smoothie",
          brand: "ALT Fragrances",
          priceRange: "$39–$59",
          matchScore: 75,
          reason: "Designed specifically as a Lost Cherry alternative. Solid performance for the price.",
          differences: "Sweeter, less boozy. More playful than seductive.",
          bestFor: ["Direct dupe seekers", "Sweet scent lovers"]
        }
      ]
    },
    {
      id: "delina",
      name: "Delina",
      brand: "Parfums de Marly",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$335 (2.5 oz)",
      description: "Turkish rose, lychee, peony, and vanilla. Romantic and feminine.",
      aliases: ["pdm delina", "parfums marly delina"],
      dupes: [
        {
          name: "La Vie Est Belle Rose Extraordinaire",
          brand: "Lancôme",
          priceRange: "$110–$165",
          matchScore: 72,
          reason: "Similar rosy-fruity sweetness with a designer pedigree. More accessible romantic floral.",
          differences: "Less complex, more linear rose. Missing the distinctive lychee note.",
          bestFor: ["Rose lovers", "Designer preference", "Everyday elegance"]
        },
        {
          name: "Delicate Rose",
          brand: "Dossier",
          priceRange: "$49",
          matchScore: 76,
          reason: "Formulated specifically as a Delina-inspired scent. Captures the fruity-floral balance well.",
          differences: "Lighter sillage, shorter wear time. Less luxurious feel.",
          bestFor: ["Budget-conscious", "Delina curious", "Lighter preference"]
        },
        {
          name: "Sedbury",
          brand: "Parfums de Marly",
          priceRange: "$255",
          matchScore: 70,
          reason: "Same house, similar DNA. A different interpretation of the fruity-floral theme at lower price.",
          differences: "Different fruit notes, more green aspects. Less iconic but equally refined.",
          bestFor: ["PDM fans", "Collection building", "Wanting variety"]
        }
      ]
    },
    {
      id: "chanel-no5",
      name: "No. 5",
      brand: "Chanel",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$140–$200",
      description: "Iconic aldehydic floral. Ylang-ylang, rose, jasmine, and sandalwood. The original luxury fragrance.",
      aliases: ["chanel 5", "no 5", "number 5", "n5"],
      dupes: [
        {
          name: "Red Door",
          brand: "Elizabeth Arden",
          priceRange: "$25–$55",
          matchScore: 65,
          reason: "Classic aldehydic floral from the same era. Shares the powdery, elegant DNA.",
          differences: "More spicy/oriental, less refined aldehydes. Very different dry-down.",
          bestFor: ["Vintage lovers", "Aldehydic exploration", "Extreme budget"]
        },
        {
          name: "24 Faubourg",
          brand: "Hermès",
          priceRange: "$130–$175",
          matchScore: 68,
          reason: "Not cheaper, but a sophisticated aldehydic alternative with similar timeless elegance.",
          differences: "More peachy-floral, warmer. Different character, same sophistication level.",
          bestFor: ["Aldehydic lovers", "Chanel fatigue", "Orange blossom fans"]
        }
      ]
    },
    
    // ============================================
    // FRAGRANCES — MEN'S / UNISEX
    // ============================================
    {
      id: "aventus",
      name: "Aventus",
      brand: "Creed",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$445 (3.3 oz)",
      description: "Pineapple, birch, musk, oakmoss. The modern power fragrance benchmark.",
      aliases: ["creed aventus"],
      dupes: [
        {
          name: "Club de Nuit Intense Man",
          brand: "Armaf",
          priceRange: "$25–$45",
          matchScore: 85,
          reason: "The legendary Aventus dupe. Remarkable similarity at a fraction of the price. Cult following.",
          differences: "Stronger lemon opening, can be harsh first 30 min. Less refined but excellent longevity.",
          bestFor: ["Best value", "Office wear", "Aventus curious"]
        },
        {
          name: "Explorer",
          brand: "Montblanc",
          priceRange: "$45–$80",
          matchScore: 75,
          reason: "Designer take on the fruity-woody-smoky profile. Clean, versatile, widely available.",
          differences: "Less pineapple, more vetiver. Cleaner, less complex but very wearable.",
          bestFor: ["Designer preference", "Clean aesthetic", "Everyday signature"]
        },
        {
          name: "Cedrat Boisé",
          brand: "Mancera",
          priceRange: "$85–$140",
          matchScore: 72,
          reason: "Niche quality with similar citrus-woods structure. Beast mode projection and longevity.",
          differences: "More citrus-forward, less smoky-fruit. Powerhouse performer.",
          bestFor: ["Projection seekers", "Niche explorers", "Statement scent"]
        },
        {
          name: "Supremacy Silver",
          brand: "Afnan",
          priceRange: "$25–$40",
          matchScore: 78,
          reason: "Another excellent budget Aventus-style fragrance. Smoky-fruity opening, woody dry-down.",
          differences: "More metallic/ozonic notes. Good longevity for the price.",
          bestFor: ["Budget collection", "Layering", "Casual wear"]
        }
      ]
    },
    {
      id: "bleu-de-chanel",
      name: "Bleu de Chanel",
      brand: "Chanel",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$160–$190",
      description: "Citrus, mint, cedar, sandalwood. The refined blue fragrance benchmark.",
      aliases: ["bdc", "bleu chanel", "chanel blue"],
      dupes: [
        {
          name: "Blue de Chance",
          brand: "Fragrance One",
          priceRange: "$89–$150",
          matchScore: 70,
          reason: "Created by fragrance influencers as an elevated blue fragrance. Similar profile with boosted performance.",
          differences: "Sweeter, more amber-heavy. Different artistic direction.",
          bestFor: ["Youtuber fans", "Performance seekers"]
        },
        {
          name: "Versace Pour Homme Dylan Blue",
          brand: "Versace",
          priceRange: "$55–$95",
          matchScore: 72,
          reason: "Mainstream blue fragrance with similar mass appeal. Aquatic-citrus-woody profile.",
          differences: "More aquatic, less incense. Younger, more casual feel.",
          bestFor: ["Designer alternative", "Casual wear", "Younger audience"]
        },
        {
          name: "Y Eau de Parfum",
          brand: "Yves Saint Laurent",
          priceRange: "$90–$135",
          matchScore: 70,
          reason: "Similar sophisticated blue-woody profile. Ginger and apple add unique twist.",
          differences: "Spicier, less minty-fresh. Different character, same versatility.",
          bestFor: ["YSL fans", "Spicy preference", "Office appropriate"]
        }
      ]
    },
    {
      id: "sauvage",
      name: "Sauvage",
      brand: "Dior",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$115–$165",
      description: "Bergamot, pepper, ambroxan. The best-selling men's fragrance globally.",
      aliases: ["dior sauvage"],
      dupes: [
        {
          name: "Blue Aoud",
          brand: "Armaf",
          priceRange: "$30–$50",
          matchScore: 70,
          reason: "Captures the fresh-spicy-ambroxan vibe at budget price. Armaf's take on the Sauvage DNA.",
          differences: "Oud note adds different dimension. Less refined but unique.",
          bestFor: ["Budget seekers", "Oud curious", "Experimentation"]
        },
        {
          name: "Hawas",
          brand: "Rasasi",
          priceRange: "$35–$55",
          matchScore: 68,
          reason: "Aquatic-fresh with ambroxan bomb. Similar vibe, different execution.",
          differences: "More aquatic/marine. Less pepper, more water.",
          bestFor: ["Summer scent", "Aquatic lovers", "Middle Eastern option"]
        }
      ]
    },
    {
      id: "oud-wood",
      name: "Oud Wood",
      brand: "Tom Ford",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$280 (1.7 oz)",
      description: "Oud, rosewood, cardamom, sandalwood. Sophisticated woody-oud composition.",
      aliases: ["tf oud wood", "tom ford oud"],
      dupes: [
        {
          name: "Oud for Greatness",
          brand: "Initio",
          priceRange: "$325",
          matchScore: 65,
          reason: "Not cheaper, but an alternative for oud lovers. Different interpretation of luxury oud.",
          differences: "More medicinal oud, saffron prominent. Bolder statement.",
          bestFor: ["Oud connoisseurs", "Different perspective"]
        },
        {
          name: "Oud Ispahan",
          brand: "Dior",
          priceRange: "$250–$350",
          matchScore: 60,
          reason: "Designer oud alternative with rose-oud pairing. Different but equally sophisticated.",
          differences: "Prominent rose, more feminine-leaning. Turkish delight vibe.",
          bestFor: ["Rose-oud lovers", "Dior fans"]
        },
        {
          name: "Amber Oud Gold Edition",
          brand: "Al Haramain",
          priceRange: "$35–$60",
          matchScore: 72,
          reason: "Excellent budget oud option. Woody-amber with oud notes at remarkable price.",
          differences: "Sweeter, less refined. Louder projection.",
          bestFor: ["Budget oud exploration", "Bold scent lovers"]
        }
      ]
    },

    // ============================================
    // MAKEUP — LIPS
    // ============================================
    {
      id: "pillow-talk",
      name: "Pillow Talk Matte Revolution Lipstick",
      brand: "Charlotte Tilbury",
      category: "makeup",
      subcategory: "lipstick",
      price: "$34",
      description: "The universally flattering nude-pink. Cult-favorite MLBB shade.",
      aliases: ["pillow talk", "charlotte tilbury pillow talk", "ct pillow talk"],
      dupes: [
        {
          name: "Matte Lipstick in Whirl",
          brand: "MAC",
          priceRange: "$23",
          matchScore: 80,
          reason: "Very close dusty rose shade with similar matte finish. Iconic MAC formula.",
          differences: "Slightly more mauve, less pink. True matte (more drying).",
          bestFor: ["MAC loyalists", "Mauve lovers", "Proven formula"]
        },
        {
          name: "Super Lustrous Lipstick in Pink in the Afternoon",
          brand: "Revlon",
          priceRange: "$8–$12",
          matchScore: 75,
          reason: "Drugstore darling with surprisingly close color match. Excellent value.",
          differences: "Cream finish (not matte), less longevity. Needs more touch-ups.",
          bestFor: ["Budget-conscious", "Cream finish preference", "Drug store accessible"]
        },
        {
          name: "Lip Lingerie Push-Up in Seduction",
          brand: "NYX",
          priceRange: "$10",
          matchScore: 72,
          reason: "Affordable liquid lip option in similar nude-pink territory. Good longevity.",
          differences: "Liquid formula, different texture. Can be drying.",
          bestFor: ["Liquid lip lovers", "Long wear needs", "Budget friendly"]
        },
        {
          name: "Artist Lip Blush in Blush Vibes",
          brand: "Makeup by Mario",
          priceRange: "$26",
          matchScore: 78,
          reason: "Similar universally flattering nude-pink with innovative blurring formula.",
          differences: "More blurred/soft focus finish. Lighter coverage.",
          bestFor: ["Soft glam fans", "Natural finish lovers"]
        }
      ]
    },
    {
      id: "mac-velvet-teddy",
      name: "Velvet Teddy",
      brand: "MAC",
      category: "makeup",
      subcategory: "lipstick",
      price: "$23",
      description: "Deep-tone beige matte. The 90s nude lip revived.",
      aliases: ["velvet teddy", "mac teddy"],
      dupes: [
        {
          name: "Super Matte Lip Color in Luscious",
          brand: "Milani",
          priceRange: "$8",
          matchScore: 82,
          reason: "Remarkably close color and formula match. Best drugstore Velvet Teddy dupe.",
          differences: "Slightly warmer undertone. Similar wear time.",
          bestFor: ["Best value", "Warm undertones", "Drug store preference"]
        },
        {
          name: "Color Sensational in Nude Lust",
          brand: "Maybelline",
          priceRange: "$9",
          matchScore: 75,
          reason: "Widely available nude-brown option. Classic drugstore formula.",
          differences: "More brown, less beige. Creamier texture.",
          bestFor: ["Easy access", "Brown lovers"]
        }
      ]
    },

    // ============================================
    // MAKEUP — FACE
    // ============================================
    {
      id: "nars-orgasm",
      name: "Blush in Orgasm",
      brand: "NARS",
      category: "makeup",
      subcategory: "blush",
      price: "$30",
      description: "Peachy-pink with golden shimmer. The original cult blush.",
      aliases: ["nars orgasm", "orgasm blush"],
      dupes: [
        {
          name: "Baked Blush in Luminoso",
          brand: "Milani",
          priceRange: "$10",
          matchScore: 85,
          reason: "Legendary dupe. Nearly identical peachy-pink with golden shimmer. Cult following of its own.",
          differences: "Baked formula (slightly more shimmery). Can be more intense on first swatch.",
          bestFor: ["Best dupe overall", "Shimmer lovers", "Value seekers"]
        },
        {
          name: "Powder Blush in Peach Parfait",
          brand: "Wet n Wild",
          priceRange: "$3–$5",
          matchScore: 72,
          reason: "Ultra-affordable with similar coral-peach tone. Great for experimenting.",
          differences: "Less shimmer, more matte-satin. Less longevity.",
          bestFor: ["Extreme budget", "Matte preference", "Beginners"]
        },
        {
          name: "Box O' Powder in Peachy",
          brand: "Benefit",
          priceRange: "$34",
          matchScore: 70,
          reason: "Not cheaper, but an alternative peachy-pink blush with beautiful finish.",
          differences: "More pink, less coral. Different shimmer texture.",
          bestFor: ["Pink preference", "Benefit fans"]
        }
      ]
    },
    {
      id: "ct-flawless-filter",
      name: "Hollywood Flawless Filter",
      brand: "Charlotte Tilbury",
      category: "makeup",
      subcategory: "complexion",
      price: "$49",
      description: "Glowy complexion booster. The viral 'Hollywood glow' product.",
      aliases: ["flawless filter", "hff", "ct filter"],
      dupes: [
        {
          name: "Glass Skin Serum",
          brand: "E.l.f.",
          priceRange: "$12",
          matchScore: 78,
          reason: "TikTok-viral dupe. Similar dewy, glassy finish at a fraction of the price.",
          differences: "Thinner consistency, less coverage. More serum-like.",
          bestFor: ["Budget-conscious", "Light coverage", "K-beauty fans"]
        },
        {
          name: "Born to Glow Liquid Illuminator",
          brand: "NYX",
          priceRange: "$8",
          matchScore: 70,
          reason: "Affordable liquid highlighter with similar glowy effect. Mixable with foundation.",
          differences: "More highlighter-like, less skin-like. More obvious shimmer.",
          bestFor: ["Extreme budget", "Highlight focus", "Mixing"]
        },
        {
          name: "Glow Reviver Lip & Cheek",
          brand: "Rare Beauty",
          priceRange: "$25",
          matchScore: 68,
          reason: "Different product category but achieves similar lit-from-within effect.",
          differences: "Cream vs liquid, cheeks only. Different application.",
          bestFor: ["Cream preference", "Rare Beauty fans"]
        }
      ]
    },

    // ============================================
    // SKINCARE
    // ============================================
    {
      id: "protini",
      name: "Protini Polypeptide Cream",
      brand: "Drunk Elephant",
      category: "skincare",
      subcategory: "moisturizer",
      price: "$68",
      description: "Peptide-packed moisturizer. Firming, anti-aging, protein-rich formula.",
      aliases: ["drunk elephant protini", "de protini"],
      dupes: [
        {
          name: "Peptide Moisturizer",
          brand: "The INKEY List",
          priceRange: "$15",
          matchScore: 75,
          reason: "Similar peptide-focused formula at remarkable value. Clean, effective, no-frills.",
          differences: "Lighter texture, fewer peptide varieties. Less luxurious feel.",
          bestFor: ["Budget-conscious", "Simple routines", "Peptide curious"]
        },
        {
          name: "Buffet + Copper Peptides 1%",
          brand: "The Ordinary",
          priceRange: "$18",
          matchScore: 70,
          reason: "Serum (not cream) but excellent peptide delivery. Can layer under moisturizer.",
          differences: "Different texture, serum format. Needs additional moisturizer.",
          bestFor: ["Serum lovers", "The Ordinary fans", "Customizers"]
        },
        {
          name: "Multi-Peptide + HA Serum",
          brand: "Naturium",
          priceRange: "$18",
          matchScore: 72,
          reason: "Well-formulated peptide serum with hyaluronic acid. Clean brand ethos.",
          differences: "Serum texture, needs to be paired with moisturizer.",
          bestFor: ["Naturium fans", "HA lovers", "Layering"]
        }
      ]
    },
    {
      id: "tatcha-dewy",
      name: "The Dewy Skin Cream",
      brand: "Tatcha",
      category: "skincare",
      subcategory: "moisturizer",
      price: "$72",
      description: "Rich, dewy moisturizer with Japanese botanicals. Plumping and hydrating.",
      aliases: ["tatcha dewy", "dewy skin cream"],
      dupes: [
        {
          name: "Water Cream",
          brand: "COSRX",
          priceRange: "$25",
          matchScore: 70,
          reason: "K-beauty alternative with similar dewy finish. Birch sap and niacinamide.",
          differences: "Lighter texture, different ingredients. Less rich.",
          bestFor: ["K-beauty lovers", "Oily skin", "Lighter hydration"]
        },
        {
          name: "Ultra Facial Cream",
          brand: "Kiehl's",
          priceRange: "$35",
          matchScore: 65,
          reason: "Rich, hydrating cream with squalane. Different ingredients, similar hydration level.",
          differences: "Less dewy finish, more traditional rich cream texture.",
          bestFor: ["Kiehl's fans", "Dry skin", "Matte-hydration balance"]
        },
        {
          name: "Holy Hydration! Face Cream",
          brand: "E.l.f.",
          priceRange: "$12",
          matchScore: 68,
          reason: "Hyaluronic acid-based rich cream. Surprising quality for drugstore price.",
          differences: "Less luxurious texture, different botanical profile.",
          bestFor: ["Budget-conscious", "HA lovers", "Simple needs"]
        }
      ]
    },
    {
      id: "la-mer-cream",
      name: "Crème de la Mer",
      brand: "La Mer",
      category: "skincare",
      subcategory: "moisturizer",
      price: "$200–$395",
      description: "The iconic luxury moisturizer. Miracle Broth, rich texture, celebrity favorite.",
      aliases: ["la mer", "creme de la mer", "la mer cream"],
      dupes: [
        {
          name: "Aqua Bomb",
          brand: "belif",
          priceRange: "$42",
          matchScore: 60,
          reason: "Different texture but excellent hydration. Korean skincare approach to luxury feel.",
          differences: "Gel-cream vs rich cream. Lighter, more suitable for combination skin.",
          bestFor: ["Combo skin", "K-beauty preference", "Lighter textures"]
        },
        {
          name: "Ultra Repair Cream",
          brand: "First Aid Beauty",
          priceRange: "$42",
          matchScore: 55,
          reason: "Rich, repairing cream for dry skin. Colloidal oatmeal soothes like La Mer claims to.",
          differences: "Completely different formula and texture. Practical vs luxurious.",
          bestFor: ["Sensitive skin", "Practical approach", "Eczema-prone"]
        },
        {
          name: "No true dupe exists",
          brand: "—",
          priceRange: "—",
          matchScore: 0,
          reason: "Honest note: La Mer's Miracle Broth is proprietary. Most dermatologists say equally hydrating results can be achieved with well-formulated creams, but no product replicates the exact formula or experience.",
          differences: "The luxury of La Mer is as much about the ritual and experience as the ingredients.",
          bestFor: ["Those okay with alternatives that hydrate without the mystique"]
        }
      ]
    },
    {
      id: "skinceuticals-ce",
      name: "C E Ferulic",
      brand: "SkinCeuticals",
      category: "skincare",
      subcategory: "serum",
      price: "$182",
      description: "The gold standard vitamin C serum. 15% L-ascorbic acid, vitamin E, ferulic acid.",
      aliases: ["ce ferulic", "skinceuticals vitamin c", "skinceuticals ce"],
      dupes: [
        {
          name: "C-Firma Fresh Day Serum",
          brand: "Drunk Elephant",
          priceRange: "$78",
          matchScore: 80,
          reason: "Similar L-ascorbic acid + vitamin E + ferulic acid formula. Fresh packaging prevents oxidation.",
          differences: "Different concentration, added fruit enzymes. Requires mixing before use.",
          bestFor: ["DE fans", "Fresh formula preference", "Luxury but less expensive"]
        },
        {
          name: "Vitamin C Suspension 23% + HA Spheres 2%",
          brand: "The Ordinary",
          priceRange: "$7",
          matchScore: 60,
          reason: "Incredibly affordable vitamin C option. Different form but effective antioxidant.",
          differences: "Silicone suspension, gritty texture. Different form of vitamin C.",
          bestFor: ["Extreme budget", "The Ordinary fans", "Experimentation"]
        },
        {
          name: "15% Vitamin C + E + Ferulic Acid Serum",
          brand: "Timeless",
          priceRange: "$25",
          matchScore: 82,
          reason: "Almost identical formula to SkinCeuticals at fraction of price. Highly regarded dupe.",
          differences: "Less elegant packaging, may oxidize faster. Same key ingredients.",
          bestFor: ["Best value dupe", "Formula-focused", "Budget conscious"]
        },
        {
          name: "Vitamin C Serum with Hyaluronic Acid",
          brand: "La Roche-Posay",
          priceRange: "$45",
          matchScore: 70,
          reason: "Pharmacy brand with dermatologist credibility. Well-formulated vitamin C option.",
          differences: "10% vitamin C (lower concentration). Different supporting ingredients.",
          bestFor: ["Sensitive skin", "Pharmacy accessibility", "LRP fans"]
        }
      ]
    }
  ]
};
