/**
 * THE DUPE EDIT — Curated Product Database
 * Version 3.0.0 — Comprehensive Luxury Coverage
 * 
 * Every recommendation is thoroughly researched and analyzed.
 */

window.DUPE_DATABASE = {
  version: "3.0.0",
  lastUpdated: "2026-01-22",
  
  // Retailer reference
  retailers: {
    sephora: { name: "Sephora", domain: "sephora.com" },
    ulta: { name: "Ulta", domain: "ulta.com" },
    nordstrom: { name: "Nordstrom", domain: "nordstrom.com" },
    amazon: { name: "Amazon", domain: "amazon.com" },
    target: { name: "Target", domain: "target.com" },
    walmart: { name: "Walmart", domain: "walmart.com" },
    fragrancenet: { name: "FragranceNet", domain: "fragrancenet.com" },
    tjmaxx: { name: "TJ Maxx", domain: "tjmaxx.com" },
    marshalls: { name: "Marshalls", domain: "marshalls.com" },
    costco: { name: "Costco", domain: "costco.com" },
    traderjoes: { name: "Trader Joe's", domain: "traderjoes.com" },
    cvs: { name: "CVS", domain: "cvs.com" },
    walgreens: { name: "Walgreens", domain: "walgreens.com" }
  },

  products: [
    // ============================================
    // FRAGRANCES — WOMEN'S LUXURY
    // ============================================
    {
      id: "baccarat-rouge-540",
      name: "Baccarat Rouge 540",
      brand: "Maison Francis Kurkdjian",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$325 (2.4 oz)",
      description: "Saffron, jasmine, amberwood, cedar. The viral sensation that defined modern niche perfumery.",
      image: "https://fimgs.net/mdimg/perfume/375x500.51497.jpg",
      aliases: ["br540", "baccarat rouge", "mfk baccarat", "kurkdjian baccarat", "red bottle perfume"],
      appeal: "The fragrance that broke TikTok. Ethereal, addictive, and impossible to ignore. People will ask what you're wearing.",
      honestNote: "Worth the hype for most. If the price stings, the dupes below genuinely capture 70-85% of the magic.",
      dupes: [
        {
          name: "Cloud",
          brand: "Ariana Grande",
          priceRange: "$45–$65",
          matchScore: 78,
          reason: "The most accessible BR540 vibe. Sweet, dreamy, compliment-getter. Available everywhere.",
          differences: "Sweeter, less complex, shorter longevity. More youthful interpretation.",
          bestFor: ["Budget-friendly", "Everyday wear", "Younger audiences"],
          image: "https://fimgs.net/mdimg/perfume/375x500.51465.jpg",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/cloud-eau-de-parfum-pimprod2007107" },
            { name: "Amazon", url: "https://www.amazon.com/Ariana-Grande-Cloud-Parfum-Spray/dp/B07GXPF757" }
          ]
        },
        {
          name: "Burberry Her",
          brand: "Burberry",
          priceRange: "$95–$140",
          matchScore: 72,
          reason: "Berry-forward with similar amber warmth. More mainstream but still sophisticated.",
          differences: "Fruitier opening, less saffron. More traditionally feminine.",
          bestFor: ["Designer preference", "Berry lovers", "Office appropriate"],
          image: "https://fimgs.net/mdimg/perfume/375x500.51330.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/burberry-her-eau-de-parfum-P432773" },
            { name: "Nordstrom", url: "https://www.nordstrom.com/s/burberry-her-eau-de-parfum/4972866" }
          ]
        },
        {
          name: "Extrait Rouge 540",
          brand: "Lattafa",
          priceRange: "$25–$40",
          matchScore: 85,
          reason: "Middle Eastern clone house doing serious work. Closest affordable match.",
          differences: "Slightly more synthetic, less refined transitions. But shockingly close.",
          bestFor: ["Best value dupe", "Clone curious", "Layering"],
          image: "https://fimgs.net/mdimg/perfume/375x500.77875.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Lattafa-Perfumes-Extrait-Rouge-Parfum/dp/B09XDKQ4FG" },
            { name: "FragranceNet", url: "https://www.fragrancenet.com/cologne/lattafa" }
          ]
        }
      ]
    },
    {
      id: "chanel-no5",
      name: "N°5",
      brand: "Chanel",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$165–$235",
      description: "The icon. Aldehydes, ylang-ylang, jasmine, sandalwood. Nearly 100 years of elegance.",
      image: "https://fimgs.net/mdimg/perfume/375x500.608.jpg",
      aliases: ["chanel no 5", "chanel number 5", "no5", "chanel 5"],
      appeal: "The most famous fragrance in history. Timeless sophistication that transcends trends.",
      honestNote: "Nothing truly duplicates No.5 — the aldehydic sparkle is signature. Alternatives capture the vibe, not the exact experience.",
      dupes: [
        {
          name: "Red Door",
          brand: "Elizabeth Arden",
          priceRange: "$25–$50",
          matchScore: 55,
          reason: "Classic powdery floral with similar old-Hollywood glamour. Much more affordable.",
          differences: "More traditional, less aldehydic sparkle. Different era of perfumery.",
          bestFor: ["Classic lovers", "Budget option", "Vintage vibe"],
          image: "https://fimgs.net/mdimg/perfume/375x500.246.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Elizabeth-Arden-Red-Door-Toilette/dp/B000C1UCKS" },
            { name: "Ulta", url: "https://www.ulta.com/p/red-door-eau-de-toilette-xlsImpprod4141567" }
          ]
        },
        {
          name: "White Diamonds",
          brand: "Elizabeth Taylor",
          priceRange: "$20–$40",
          matchScore: 50,
          reason: "Another celebrity classic with similar floral-powdery DNA.",
          differences: "Less complex, more linear. Solid drugstore classic.",
          bestFor: ["Extreme budget", "Nostalgic appeal", "Drugstore find"],
          image: "https://fimgs.net/mdimg/perfume/375x500.202.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/White-Diamonds-Elizabeth-Taylor-Toilette/dp/B000C214GS" },
            { name: "Walmart", url: "https://www.walmart.com/ip/White-Diamonds-by-Elizabeth-Taylor/1752217" }
          ]
        }
      ]
    },
    {
      id: "miss-dior",
      name: "Miss Dior Eau de Parfum",
      brand: "Dior",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$115–$175",
      description: "Rose, peony, iris, musk. Modern romantic femininity in a bottle.",
      image: "https://fimgs.net/mdimg/perfume/375x500.56974.jpg",
      aliases: ["miss dior", "dior miss dior", "miss dior edp"],
      appeal: "The perfect 'pretty' fragrance. Elegant enough for weddings, wearable enough for Tuesday.",
      dupes: [
        {
          name: "La Vie Est Belle",
          brand: "Lancôme",
          priceRange: "$90–$150",
          matchScore: 65,
          reason: "Similar feminine sweetness with gourmand edge. Massive compliment-getter.",
          differences: "More iris and praline. Less rosy, more sugary.",
          bestFor: ["Gourmand lovers", "Lancôme fans", "Long-lasting option"],
          image: "https://fimgs.net/mdimg/perfume/375x500.15353.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/la-vie-est-belle-P377059" },
            { name: "Ulta", url: "https://www.ulta.com/p/la-vie-est-belle-eau-de-parfum-xlsImpprod5050053" }
          ]
        },
        {
          name: "Flowerbomb",
          brand: "Viktor&Rolf",
          priceRange: "$99–$190",
          matchScore: 62,
          reason: "Floral explosion with similar romantic energy. Equally iconic.",
          differences: "More intense, sweeter, stronger projection.",
          bestFor: ["Statement makers", "Night out", "Winter wear"],
          image: "https://fimgs.net/mdimg/perfume/375x500.2615.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/flowerbomb-P255528" },
            { name: "Nordstrom", url: "https://www.nordstrom.com/s/viktor-rolf-flowerbomb-eau-de-parfum/3193640" }
          ]
        },
        {
          name: "Roses De Chloé",
          brand: "Chloé",
          priceRange: "$80–$135",
          matchScore: 68,
          reason: "Fresh, dewy rose without the sweetness. Same elegant femininity.",
          differences: "Lighter, fresher, more daytime appropriate.",
          bestFor: ["Rose purists", "Daytime wear", "Office friendly"],
          image: "https://fimgs.net/mdimg/perfume/375x500.21655.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/roses-de-chloe-P384564" }
          ]
        }
      ]
    },
    {
      id: "ysl-libre",
      name: "Libre",
      brand: "Yves Saint Laurent",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$105–$165",
      description: "Lavender, orange blossom, vanilla, musk. Freedom in a bottle — warm and bold.",
      image: "https://fimgs.net/mdimg/perfume/375x500.57658.jpg",
      aliases: ["ysl libre", "libre ysl", "libre perfume"],
      appeal: "Modern, confident, genderless energy despite being marketed to women. The lavender-vanilla combo is addictive.",
      dupes: [
        {
          name: "Good Girl",
          brand: "Carolina Herrera",
          priceRange: "$95–$140",
          matchScore: 60,
          reason: "Similar warm-sweet profile with edge. The heel bottle is iconic.",
          differences: "More gourmand, less lavender. Different personality.",
          bestFor: ["Statement piece", "Night out", "Collector's item"],
          image: "https://fimgs.net/mdimg/perfume/375x500.39312.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/good-girl-P417372" },
            { name: "Macy's", url: "https://www.macys.com/shop/product/carolina-herrera-good-girl-eau-de-parfum" }
          ]
        },
        {
          name: "Mon Paris",
          brand: "Yves Saint Laurent",
          priceRange: "$95–$155",
          matchScore: 55,
          reason: "Same house, similar warmth. Fruity-floral instead of lavender.",
          differences: "Sweeter, more berry-forward. Less unisex.",
          bestFor: ["YSL fans", "Fruity preference", "Romantic vibes"],
          image: "https://fimgs.net/mdimg/perfume/375x500.38628.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/mon-paris-P409349" }
          ]
        }
      ]
    },
    {
      id: "le-labo-santal-33",
      name: "Santal 33",
      brand: "Le Labo",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$220–$340",
      description: "Sandalwood, cardamom, iris, leather. The hotel lobby scent that defined a decade.",
      image: "https://fimgs.net/mdimg/perfume/375x500.15888.jpg",
      aliases: ["santal 33", "le labo santal", "santal thirty three", "the hotel scent"],
      appeal: "Smells like expensive taste. Woody, creamy, universally flattering. The Soho House signature.",
      honestNote: "Overexposed in certain circles (NYC, LA) but still excellent. If ubiquity bothers you, try the alternatives.",
      dupes: [
        {
          name: "Toy Boy",
          brand: "Moschino",
          priceRange: "$65–$95",
          matchScore: 70,
          reason: "Surprising Santal 33 energy from a playful brand. Woody-spicy with similar vibe.",
          differences: "More playful, less serious. Slightly sweeter.",
          bestFor: ["Budget conscious", "Unexpected finds", "Compliment-getter"],
          image: "https://fimgs.net/mdimg/perfume/375x500.57982.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/toy-boy-eau-de-parfum-P450532" }
          ]
        },
        {
          name: "Bleu de Chanel",
          brand: "Chanel",
          priceRange: "$120–$180",
          matchScore: 55,
          reason: "Different but appeals to similar taste. Woody, sophisticated, mass-appeal.",
          differences: "More traditional masculine structure. Less creamy sandalwood.",
          bestFor: ["Classic elegance", "Office appropriate", "Safe choice"],
          image: "https://fimgs.net/mdimg/perfume/375x500.11218.jpg",
          retailers: [
            { name: "Nordstrom", url: "https://www.nordstrom.com/s/bleu-de-chanel-eau-de-parfum/3229017" },
            { name: "Sephora", url: "https://www.sephora.com/product/bleu-de-chanel-P393111" }
          ]
        },
        {
          name: "Santal Royale",
          brand: "Armaf",
          priceRange: "$25–$45",
          matchScore: 75,
          reason: "Clone house doing excellent work. Very close sandalwood profile.",
          differences: "Slightly less refined, shorter longevity.",
          bestFor: ["Best value", "Clone curious", "Rotation piece"],
          image: "https://fimgs.net/mdimg/perfume/375x500.47952.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Armaf-Santal-Royale-Parfum-Spray/dp/B08L1HPLKH" }
          ]
        }
      ]
    },
    {
      id: "tom-ford-lost-cherry",
      name: "Lost Cherry",
      brand: "Tom Ford",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$280–$390",
      description: "Black cherry, bitter almond, Turkish rose, Peru balsam. Decadent cherry-almond indulgence.",
      image: "https://fimgs.net/mdimg/perfume/375x500.52329.jpg",
      aliases: ["lost cherry", "tom ford cherry", "tf lost cherry"],
      appeal: "Unapologetically sexy. Cherry liqueur meets marzipan meets seduction. Not for the timid.",
      dupes: [
        {
          name: "Cherry Punk",
          brand: "Room 1015",
          priceRange: "$140–$180",
          matchScore: 72,
          reason: "Niche alternative with similar boozy cherry. More edgy.",
          differences: "Patchouli-forward, darker interpretation.",
          bestFor: ["Niche seekers", "Edgier vibe", "Unique option"],
          image: "https://fimgs.net/mdimg/perfume/375x500.48439.jpg",
          retailers: [
            { name: "Luckyscent", url: "https://www.luckyscent.com/product/84701/cherry-punk-by-room-1015" }
          ]
        },
        {
          name: "Khadlaj La Fave",
          brand: "Khadlaj",
          priceRange: "$20–$35",
          matchScore: 80,
          reason: "Incredible value dupe. Cherry-almond done surprisingly well for the price.",
          differences: "Less complex dry-down, shorter longevity.",
          bestFor: ["Best budget dupe", "Clone curious", "Blind buy safe"],
          image: "https://fimgs.net/mdimg/perfume/375x500.72953.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Khadlaj-La-Fave-Parfum-3-4/dp/B091GYVG8L" }
          ]
        },
        {
          name: "Love, Don't Be Shy",
          brand: "Kilian",
          priceRange: "$245–$295",
          matchScore: 58,
          reason: "Similar indulgent sweetness but with marshmallow instead of cherry.",
          differences: "Orange blossom and marshmallow vs cherry. Different but same energy.",
          bestFor: ["Marshmallow lovers", "Already own Lost Cherry", "Variety"],
          image: "https://fimgs.net/mdimg/perfume/375x500.16851.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/love-don-t-be-shy-P398706" }
          ]
        }
      ]
    },
    {
      id: "byredo-gypsy-water",
      name: "Gypsy Water",
      brand: "Byredo",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$195–$295",
      description: "Bergamot, pine needles, sandalwood, vanilla. Wanderlust in liquid form.",
      image: "https://fimgs.net/mdimg/perfume/375x500.11984.jpg",
      aliases: ["gypsy water", "byredo gypsy", "gypsy water byredo"],
      appeal: "Smells like a cool person's campfire story. Woody, fresh, effortlessly chic.",
      dupes: [
        {
          name: "Replica By The Fireplace",
          brand: "Maison Margiela",
          priceRange: "$150–$175",
          matchScore: 60,
          reason: "Similar cozy-woody vibe. Smoky chestnuts instead of pine.",
          differences: "More smoky, less fresh. Winter vs year-round.",
          bestFor: ["Smoke lovers", "Winter scent", "Margiela fans"],
          image: "https://fimgs.net/mdimg/perfume/375x500.35847.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/replica-by-the-fireplace-P421128" }
          ]
        },
        {
          name: "Wood Sage & Sea Salt",
          brand: "Jo Malone",
          priceRange: "$80–$150",
          matchScore: 55,
          reason: "Similar fresh-woody simplicity. Different notes, same effortless energy.",
          differences: "More ozonic, less vanilla. Salty vs sweet.",
          bestFor: ["Fresh preference", "Jo Malone fans", "Layering base"],
          image: "https://fimgs.net/mdimg/perfume/375x500.25309.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/wood-sage-sea-salt-cologne-P392953" },
            { name: "Nordstrom", url: "https://www.nordstrom.com/s/jo-malone-london-wood-sage-sea-salt-cologne/3593014" }
          ]
        }
      ]
    },
    {
      id: "chloe-edp",
      name: "Chloé Eau de Parfum",
      brand: "Chloé",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$105–$155",
      description: "Peony, rose, lychee, amber. The quintessential 'clean girl' fragrance.",
      image: "https://fimgs.net/mdimg/perfume/375x500.5765.jpg",
      aliases: ["chloe perfume", "chloe edp", "chloe signature"],
      appeal: "Smells like you just showered with expensive products. Fresh, feminine, universally liked.",
      dupes: [
        {
          name: "Philosophy Amazing Grace",
          brand: "Philosophy",
          priceRange: "$55–$75",
          matchScore: 70,
          reason: "Same clean, fresh, soapy vibe. American take on French elegance.",
          differences: "More musky, less rosy. Even cleaner.",
          bestFor: ["Clean scent lovers", "Everyday wear", "Office appropriate"],
          image: "https://fimgs.net/mdimg/perfume/375x500.4177.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/amazing-grace-P253301" },
            { name: "Ulta", url: "https://www.ulta.com/p/amazing-grace-eau-de-toilette-xlsImpprod4210037" }
          ]
        },
        {
          name: "Pure Seduction",
          brand: "Victoria's Secret",
          priceRange: "$18–$25",
          matchScore: 50,
          reason: "Budget-friendly fresh-floral option. Different but similar category.",
          differences: "More synthetic, fruitier, less refined.",
          bestFor: ["Extreme budget", "Gym bag", "Body mist preference"],
          image: "https://fimgs.net/mdimg/perfume/375x500.4513.jpg",
          retailers: [
            { name: "Victoria's Secret", url: "https://www.victoriassecret.com" },
            { name: "Amazon", url: "https://www.amazon.com/Victorias-Secret-Pure-Seduction-Fragrance/dp/B01N5DQFP8" }
          ]
        }
      ]
    },
    {
      id: "marc-jacobs-daisy",
      name: "Daisy",
      brand: "Marc Jacobs",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$85–$130",
      description: "Strawberry, violet leaves, jasmine, vanilla. Fresh, youthful, endlessly charming.",
      image: "https://fimgs.net/mdimg/perfume/375x500.4449.jpg",
      aliases: ["marc jacobs daisy", "daisy perfume", "mj daisy"],
      appeal: "The fragrance that launched a thousand sorority memories. Inoffensive, pretty, easy to love.",
      dupes: [
        {
          name: "Daisy Dream",
          brand: "Marc Jacobs",
          priceRange: "$85–$130",
          matchScore: 85,
          reason: "Same line, slightly different. Fruitier, dreamier version.",
          differences: "More pear and blue notes. Lighter, airier.",
          bestFor: ["Daisy fans wanting variety", "Summer scent", "Lighter option"],
          image: "https://fimgs.net/mdimg/perfume/375x500.25329.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/daisy-dream-P386773" }
          ]
        },
        {
          name: "Fantasy",
          brand: "Britney Spears",
          priceRange: "$20–$35",
          matchScore: 55,
          reason: "Similar sweet-floral-fruity energy at drugstore price.",
          differences: "Sweeter, more gourmand. Less fresh.",
          bestFor: ["Budget option", "Nostalgic pick", "Sweet lovers"],
          image: "https://fimgs.net/mdimg/perfume/375x500.1703.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Britney-Spears-Fantasy-Women-Parfum/dp/B000P24ZNC" },
            { name: "Walmart", url: "https://www.walmart.com/ip/Britney-Spears-Fantasy-Eau-de-Parfum/5854626" }
          ]
        }
      ]
    },
    {
      id: "dolce-gabbana-light-blue",
      name: "Light Blue",
      brand: "Dolce & Gabbana",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$80–$130",
      description: "Sicilian lemon, apple, cedar, jasmine. Mediterranean summer in a bottle.",
      image: "https://fimgs.net/mdimg/perfume/375x500.485.jpg",
      aliases: ["d&g light blue", "light blue d&g", "dolce light blue"],
      appeal: "The unofficial scent of summer vacations. Crisp, citrusy, universally appropriate.",
      dupes: [
        {
          name: "Acqua di Gioia",
          brand: "Giorgio Armani",
          priceRange: "$75–$130",
          matchScore: 68,
          reason: "Similar aquatic-fresh profile. Mint and jasmine give it personality.",
          differences: "More aquatic, less citrus-forward.",
          bestFor: ["Aquatic lovers", "Armani fans", "Beach vibes"],
          image: "https://fimgs.net/mdimg/perfume/375x500.8986.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/acqua-di-gioia-P302611" }
          ]
        },
        {
          name: "Nautica Blue",
          brand: "Nautica",
          priceRange: "$15–$25",
          matchScore: 60,
          reason: "Budget fresh-aquatic option. Clean and simple.",
          differences: "More synthetic, less complex. But cheap and cheerful.",
          bestFor: ["Extreme budget", "Gym scent", "Casual wear"],
          image: "https://fimgs.net/mdimg/perfume/375x500.1688.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Nautica-Blue-Parfum-Men-1-7/dp/B000E7TI3A" },
            { name: "Walmart", url: "https://www.walmart.com/ip/Nautica-Blue-Eau-de-Toilette-Cologne/10418988" }
          ]
        }
      ]
    },

    // ============================================
    // FRAGRANCES — MEN'S LUXURY
    // ============================================
    {
      id: "creed-aventus",
      name: "Aventus",
      brand: "Creed",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$335–$445",
      description: "Pineapple, birch, musk, oakmoss. The king of niche men's fragrances.",
      image: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
      aliases: ["creed aventus", "aventus", "creed for men"],
      appeal: "Smells like success and good decisions. Fruity-smoky DNA that's spawned countless clones.",
      honestNote: "Batch variations are real — some smell smokier, some fruitier. The clones below are more consistent.",
      dupes: [
        {
          name: "Club de Nuit Intense Man",
          brand: "Armaf",
          priceRange: "$25–$45",
          matchScore: 88,
          reason: "The most famous Aventus clone. Absurdly close for 10% of the price.",
          differences: "Lemon note more prominent at opening. Slightly more synthetic.",
          bestFor: ["Best value clone", "Blind buy safe", "Daily driver"],
          image: "https://fimgs.net/mdimg/perfume/375x500.34457.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Armaf-Club-Nuit-Intense-3-6/dp/B00M3QHSEQ" },
            { name: "FragranceNet", url: "https://www.fragrancenet.com/cologne/armaf/club-de-nuit-intense" }
          ]
        },
        {
          name: "Explorer",
          brand: "Montblanc",
          priceRange: "$55–$85",
          matchScore: 78,
          reason: "Designer-level clone. Bergamot and vetiver give it unique character.",
          differences: "Less fruity, more woody. More refined than Armaf.",
          bestFor: ["Designer preference", "Office appropriate", "Aventus-adjacent"],
          image: "https://fimgs.net/mdimg/perfume/375x500.54399.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/montblanc-explorer-eau-de-parfum-P440597" },
            { name: "Macy's", url: "https://www.macys.com/shop/product/montblanc-explorer-eau-de-parfum" }
          ]
        },
        {
          name: "Cedrat Boisé",
          brand: "Mancera",
          priceRange: "$110–$150",
          matchScore: 72,
          reason: "Niche alternative with citrus-wood focus. More refined, less clone-y.",
          differences: "More citrus-forward, less smoky. Its own creation.",
          bestFor: ["Niche seekers", "Citrus lovers", "Not wanting a clone"],
          image: "https://fimgs.net/mdimg/perfume/375x500.21809.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/cedrat-boise-P423682" }
          ]
        }
      ]
    },
    {
      id: "dior-sauvage",
      name: "Sauvage",
      brand: "Dior",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$95–$160",
      description: "Bergamot, Sichuan pepper, ambroxan. The modern masculine powerhouse.",
      image: "https://fimgs.net/mdimg/perfume/375x500.31861.jpg",
      aliases: ["dior sauvage", "sauvage", "sauvage dior", "johnny depp cologne"],
      appeal: "The most popular men's fragrance of the 2020s. Compliment magnet, universally appealing.",
      dupes: [
        {
          name: "Dylan Blue",
          brand: "Versace",
          priceRange: "$70–$105",
          matchScore: 72,
          reason: "Similar fresh-spicy DNA. Incense note adds depth.",
          differences: "Sweeter, less pepper. More aquatic.",
          bestFor: ["Versace fans", "Sweeter preference", "Summer option"],
          image: "https://fimgs.net/mdimg/perfume/375x500.38062.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/dylan-blue-P411306" },
            { name: "Macy's", url: "https://www.macys.com/shop/product/versace-dylan-blue-eau-de-toilette" }
          ]
        },
        {
          name: "Cool Water",
          brand: "Davidoff",
          priceRange: "$20–$40",
          matchScore: 55,
          reason: "The original fresh masculine blueprint. Still holds up.",
          differences: "More aquatic, less spicy. 90s vs 2010s.",
          bestFor: ["Classic lovers", "Budget pick", "Nostalgia"],
          image: "https://fimgs.net/mdimg/perfume/375x500.507.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Davidoff-Cool-Water-Toilette-Spray/dp/B000C1VHOW" },
            { name: "Walmart", url: "https://www.walmart.com/ip/Davidoff-Cool-Water-Eau-de-Toilette/46235746" }
          ]
        },
        {
          name: "Al Haramain L'Aventure",
          brand: "Al Haramain",
          priceRange: "$30–$50",
          matchScore: 80,
          reason: "Middle Eastern house making excellent Sauvage-adjacent scent.",
          differences: "Slightly sweeter, different opening. Very close dry-down.",
          bestFor: ["Budget dupe", "Clone curious", "Arabian houses"],
          image: "https://fimgs.net/mdimg/perfume/375x500.44212.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Al-Haramain-LAventure-Men-3-3/dp/B01MU9KPP0" }
          ]
        }
      ]
    },
    {
      id: "tom-ford-oud-wood",
      name: "Oud Wood",
      brand: "Tom Ford",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$280–$390",
      description: "Oud, rosewood, cardamom, sandalwood. Sophisticated woody-oud composition.",
      image: "https://fimgs.net/mdimg/perfume/375x500.4219.jpg",
      aliases: ["oud wood", "tom ford oud", "tf oud wood"],
      appeal: "The oud that people who don't like oud can wear. Creamy, smooth, endlessly sophisticated.",
      dupes: [
        {
          name: "Oud for Greatness",
          brand: "Initio",
          priceRange: "$280–$350",
          matchScore: 65,
          reason: "Similar sophisticated oud territory. More intense, less creamy.",
          differences: "Stronger, bolder, more animalic.",
          bestFor: ["Oud lovers", "Niche collectors", "Making a statement"],
          image: "https://fimgs.net/mdimg/perfume/375x500.45809.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/oud-for-greatness-P428698" }
          ]
        },
        {
          name: "Amber Oud Gold Edition",
          brand: "Al Haramain",
          priceRange: "$55–$90",
          matchScore: 75,
          reason: "Excellent budget oud. Similar smooth, wearable profile.",
          differences: "More amber, less cardamom. Still excellent.",
          bestFor: ["Budget oud", "Amber lovers", "Daily wear oud"],
          image: "https://fimgs.net/mdimg/perfume/375x500.50696.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Al-Haramain-Amber-Gold-Edition/dp/B07MT6DXDL" }
          ]
        },
        {
          name: "Alexandria II",
          brand: "Xerjoff",
          priceRange: "$280–$400",
          matchScore: 60,
          reason: "Ultra-luxury oud alternative. Different but same tier.",
          differences: "More floral, complex. Italian craftsmanship.",
          bestFor: ["Luxury upgrade", "Unique option", "Collectors"],
          image: "https://fimgs.net/mdimg/perfume/375x500.20669.jpg",
          retailers: [
            { name: "Luckyscent", url: "https://www.luckyscent.com/product/42901/alexandria-ii-by-xerjoff" }
          ]
        }
      ]
    },
    {
      id: "bleu-de-chanel",
      name: "Bleu de Chanel",
      brand: "Chanel",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$120–$180",
      description: "Citrus, mint, cedar, sandalwood. The reliable, elegant crowd-pleaser.",
      image: "https://fimgs.net/mdimg/perfume/375x500.25967.jpg",
      aliases: ["bleu de chanel", "chanel bleu", "bdc"],
      appeal: "Never offensive, always appropriate. The Swiss army knife of men's fragrance.",
      dupes: [
        {
          name: "Percival",
          brand: "Parfums de Marly",
          priceRange: "$250–$295",
          matchScore: 68,
          reason: "Similar fresh-woody DNA with more lavender. Niche upgrade.",
          differences: "More lavender, slightly sweeter. Higher-end option.",
          bestFor: ["Upgrade seekers", "Lavender lovers", "Niche curious"],
          image: "https://fimgs.net/mdimg/perfume/375x500.52361.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/percival-P449632" }
          ]
        },
        {
          name: "Y Eau de Parfum",
          brand: "Yves Saint Laurent",
          priceRange: "$95–$150",
          matchScore: 70,
          reason: "Similar refined, versatile profile. Ginger adds freshness.",
          differences: "More ginger-forward, slightly younger vibe.",
          bestFor: ["YSL fans", "Fresh preference", "Younger demographic"],
          image: "https://fimgs.net/mdimg/perfume/375x500.50049.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/y-eau-de-parfum-P432682" }
          ]
        },
        {
          name: "Afnan Supremacy Silver",
          brand: "Afnan",
          priceRange: "$25–$40",
          matchScore: 75,
          reason: "Affordable clone with similar DNA. Surprisingly refined.",
          differences: "Less refined transitions, shorter longevity.",
          bestFor: ["Budget option", "Clone curious", "Daily beater"],
          image: "https://fimgs.net/mdimg/perfume/375x500.42316.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Afnan-Supremacy-Silver-Parfum-Spray/dp/B07C5HHFPV" }
          ]
        }
      ]
    },
    {
      id: "acqua-di-gio",
      name: "Acqua di Giò",
      brand: "Giorgio Armani",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$85–$140",
      description: "Bergamot, neroli, jasmine, cedar. The aquatic that defined a generation.",
      image: "https://fimgs.net/mdimg/perfume/375x500.410.jpg",
      aliases: ["acqua di gio", "adg", "armani aqua", "aqua di gio"],
      appeal: "The 90s/2000s equivalent of Sauvage. Still holds up beautifully.",
      dupes: [
        {
          name: "Nautica Voyage",
          brand: "Nautica",
          priceRange: "$15–$25",
          matchScore: 70,
          reason: "Apple and aquatic notes give similar fresh vibe at budget price.",
          differences: "More apple, less refined. But remarkably good for price.",
          bestFor: ["Best budget dupe", "Summer scent", "Gym bag"],
          image: "https://fimgs.net/mdimg/perfume/375x500.1756.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Nautica-Voyage-Spray-Men-Ounce/dp/B000P22TII" },
            { name: "Walmart", url: "https://www.walmart.com/ip/Nautica-Voyage-Eau-de-Toilette/14965582" }
          ]
        },
        {
          name: "Acqua di Giò Profumo",
          brand: "Giorgio Armani",
          priceRange: "$100–$165",
          matchScore: 90,
          reason: "Same line, more sophisticated. Patchouli and amber add depth.",
          differences: "Deeper, longer-lasting, more mature.",
          bestFor: ["Original lovers", "Night version", "Adult upgrade"],
          image: "https://fimgs.net/mdimg/perfume/375x500.27379.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/acqua-di-gio-profumo-P398716" }
          ]
        }
      ]
    },
    {
      id: "dunhill-icon",
      name: "Icon",
      brand: "Dunhill",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$95–$130",
      description: "Black pepper, neroli, cardamom, vetiver, oud, leather. Sophisticated British masculine.",
      image: "https://fimgs.net/mdimg/perfume/375x500.27394.jpg",
      aliases: ["dunhill icon", "icon dunhill", "alfred dunhill icon"],
      appeal: "A modern British gentleman's fragrance. Professional yet distinctive.",
      honestNote: "Fairly priced for quality. The dupes below are for budget-conscious, but the original is reasonable.",
      dupes: [
        {
          name: "L'Homme Ideal",
          brand: "Guerlain",
          priceRange: "$65–$90",
          matchScore: 72,
          reason: "Similar sophisticated masculine with spicy-woody structure.",
          differences: "More gourmand almond note. French interpretation.",
          bestFor: ["Guerlain fans", "Gourmand edge", "Designer alternative"],
          image: "https://fimgs.net/mdimg/perfume/375x500.26047.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/l-homme-ideal-eau-de-toilette-P398406" }
          ]
        },
        {
          name: "Bentley for Men Intense",
          brand: "Bentley",
          priceRange: "$25–$45",
          matchScore: 75,
          reason: "Excellent budget leather-woody option. Rich and substantial.",
          differences: "Heavier rum/boozy notes. More evening-oriented.",
          bestFor: ["Best value", "Evening wear", "Leather lovers"],
          image: "https://fimgs.net/mdimg/perfume/375x500.17912.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Bentley-Intense-Parfum-Spray-Ounce/dp/B00FHPK6TW" }
          ]
        }
      ]
    },
    {
      id: "dunhill-desire-blue",
      name: "Desire Blue",
      brand: "Dunhill",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$45–$75",
      description: "Apple, grapefruit, jasmine, musk. Fresh aquatic-floral masculine.",
      image: "https://fimgs.net/mdimg/perfume/375x500.1009.jpg",
      aliases: ["dunhill desire blue", "desire blue", "dunhill blue"],
      appeal: "Clean, safe, versatile blue fragrance. Office-appropriate.",
      dupes: [
        {
          name: "Nautica Voyage",
          brand: "Nautica",
          priceRange: "$15–$25",
          matchScore: 70,
          reason: "Classic aquatic-fresh at drugstore price.",
          differences: "More ozonic. Less floral complexity.",
          bestFor: ["Summer scent", "Everyday casual", "Best value"],
          image: "https://fimgs.net/mdimg/perfume/375x500.1756.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Nautica-Voyage-Spray-Men-Ounce/dp/B000P22TII" }
          ]
        },
        {
          name: "360 Blue",
          brand: "Perry Ellis",
          priceRange: "$20–$35",
          matchScore: 68,
          reason: "Budget blue fragrance with similar fresh profile.",
          differences: "Simpler composition. Good office scent.",
          bestFor: ["Budget seekers", "Office rotation", "TJ Maxx find"],
          image: "https://fimgs.net/mdimg/perfume/375x500.1755.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Perry-Ellis-360-Blue-Spray/dp/B001FWXU82" }
          ]
        }
      ]
    },
    {
      id: "versace-eros",
      name: "Eros",
      brand: "Versace",
      category: "fragrance",
      subcategory: "eau de toilette",
      price: "$85–$130",
      description: "Mint, green apple, vanilla, tonka. Sweet, fresh, club-ready.",
      image: "https://fimgs.net/mdimg/perfume/375x500.16tried829.jpg",
      aliases: ["versace eros", "eros", "blue versace"],
      appeal: "The date night powerhouse. Projects confidence and attracts attention.",
      dupes: [
        {
          name: "Invictus",
          brand: "Paco Rabanne",
          priceRange: "$70–$110",
          matchScore: 72,
          reason: "Similar fresh-sweet powerhouse energy. Grapefruit and ambroxan.",
          differences: "More aquatic, less vanilla. Different but same vibe.",
          bestFor: ["Club scent", "Paco fans", "Sports vibe"],
          image: "https://fimgs.net/mdimg/perfume/375x500.18471.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/invictus-P381517" }
          ]
        },
        {
          name: "Club de Nuit Urban Man",
          brand: "Armaf",
          priceRange: "$25–$40",
          matchScore: 78,
          reason: "Very close Eros clone at budget price.",
          differences: "Slightly less refined, shorter longevity.",
          bestFor: ["Budget option", "Clone curious", "Daily wear"],
          image: "https://fimgs.net/mdimg/perfume/375x500.64139.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Armaf-Club-Nuit-Urban-Man/dp/B08BTTNZLC" }
          ]
        }
      ]
    },
    {
      id: "parfums-de-marly-layton",
      name: "Layton",
      brand: "Parfums de Marly",
      category: "fragrance",
      subcategory: "eau de parfum",
      price: "$295–$345",
      description: "Apple, lavender, vanilla, cardamom. Sweet, spicy, universally loved niche.",
      image: "https://fimgs.net/mdimg/perfume/375x500.43466.jpg",
      aliases: ["layton", "pdm layton", "parfums de marly layton"],
      appeal: "The crowd-pleaser of niche fragrances. Apple pie meets sophistication.",
      dupes: [
        {
          name: "Percival",
          brand: "Parfums de Marly",
          priceRange: "$250–$295",
          matchScore: 70,
          reason: "Same house, similar vibe. More fresh, less sweet.",
          differences: "Lighter, fresher, more office-appropriate.",
          bestFor: ["Layton owners wanting variety", "Summer option", "Office wear"],
          image: "https://fimgs.net/mdimg/perfume/375x500.52361.jpg",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/percival-P449632" }
          ]
        },
        {
          name: "Khamrah",
          brand: "Lattafa",
          priceRange: "$30–$50",
          matchScore: 82,
          reason: "Incredible Layton clone. Cinnamon-vanilla-apple done excellently.",
          differences: "More cinnamon, less refined. But shockingly close.",
          bestFor: ["Best budget dupe", "Clone curious", "Blind buy"],
          image: "https://fimgs.net/mdimg/perfume/375x500.73909.jpg",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Lattafa-Khamrah-Eau-Parfum-Unisex/dp/B09X4Y8N2V" }
          ]
        }
      ]
    },

    // ============================================
    // SKINCARE — SERUMS
    // ============================================
    {
      id: "skinceuticals-ce",
      name: "C E Ferulic",
      brand: "SkinCeuticals",
      category: "skincare",
      subcategory: "serum",
      price: "$182",
      description: "The gold standard vitamin C serum. 15% L-ascorbic acid, vitamin E, ferulic acid.",
      image: "https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dw6b7e8c4f/products/SK-1/SK-1_1200x1200.jpg",
      aliases: ["ce ferulic", "skinceuticals vitamin c", "skinceuticals ce", "vitamin c serum"],
      appeal: "Dermatologist gold standard. Patented formula with decades of research behind it.",
      honestNote: "The patent expired. Several brands now make nearly identical formulas for less.",
      dupes: [
        {
          name: "C-Firma Fresh Day Serum",
          brand: "Drunk Elephant",
          priceRange: "$78",
          matchScore: 80,
          reason: "Similar formula with fresh packaging to prevent oxidation.",
          differences: "Added fruit enzymes. Requires mixing before use.",
          bestFor: ["Drunk Elephant fans", "Fresh formula preference", "Luxury but less"],
          image: "https://images.ulta.com/is/image/Ulta/2579096",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/c-firma-fresh-day-serum-P479917" }
          ]
        },
        {
          name: "15% Vitamin C + E Ferulic Serum",
          brand: "Timeless",
          priceRange: "$25",
          matchScore: 88,
          reason: "Nearly identical formula at fraction of price. Highly regarded dupe.",
          differences: "Less elegant packaging, may oxidize faster.",
          bestFor: ["Best value dupe", "Formula-focused", "Budget conscious"],
          image: "https://www.timelessha.com/cdn/shop/products/20vitcfeatured.png",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Timeless-Skin-Care-Vitamin-Serum/dp/B0036BI56G" },
            { name: "Timeless", url: "https://www.timelessha.com" }
          ]
        },
        {
          name: "Vitamin C Suspension 23%",
          brand: "The Ordinary",
          priceRange: "$7",
          matchScore: 60,
          reason: "Incredibly affordable vitamin C. Different form but effective.",
          differences: "Silicone suspension, gritty texture. Different delivery system.",
          bestFor: ["Extreme budget", "The Ordinary fans", "Experimentation"],
          image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw8a7b3b1a/Images/products/The%20Ordinary/rdn-vitamin-c-suspension-23pct-ha-spheres-2pct-30ml.png",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/the-ordinary-vitamin-c-suspension-23-ha-spheres-2-P442563" },
            { name: "Ulta", url: "https://www.ulta.com/p/vitamin-c-suspension-23-ha-spheres-2-pimprod2007100" }
          ]
        },
        {
          name: "Pure Vitamin C10 Serum",
          brand: "La Roche-Posay",
          priceRange: "$45",
          matchScore: 70,
          reason: "Pharmacy brand with dermatologist credibility.",
          differences: "10% concentration (lower). Different supporting ingredients.",
          bestFor: ["Sensitive skin", "Pharmacy accessibility", "LRP fans"],
          image: "https://www.laroche-posay.us/-/media/project/loreal/brand-sites/lrp/americas/us/products/vitamin-c-serum/pure-vitamin-c-face-serum/3337875660570-lrp-serum-vit-c-30ml.png",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/pure-vitamin-c10-serum-pimprod2018118" },
            { name: "Amazon", url: "https://www.amazon.com/Roche-Posay-Vitamin-Anti-Aging-Sensitive/dp/B07XQHWCP5" }
          ]
        }
      ]
    },
    {
      id: "sunday-riley-good-genes",
      name: "Good Genes All-In-One Lactic Acid Treatment",
      brand: "Sunday Riley",
      category: "skincare",
      subcategory: "serum",
      price: "$85–$122",
      description: "Cult-favorite lactic acid exfoliant. Brightening, smoothing, instant glow.",
      image: "https://images.ulta.com/is/image/Ulta/2293515",
      aliases: ["good genes", "sunday riley lactic acid", "sr good genes"],
      appeal: "The instant-glow serum. Results visible immediately. Skincare influencer staple.",
      honestNote: "Lactic acid is lactic acid. The alternatives get you 80% there for much less.",
      dupes: [
        {
          name: "Lactic Acid 10% + HA",
          brand: "The Ordinary",
          priceRange: "$8",
          matchScore: 78,
          reason: "Straightforward lactic acid at impossible-to-beat price.",
          differences: "Simpler formula, no licorice. More gradual improvement.",
          bestFor: ["Best value", "The Ordinary fans", "Simple routines"],
          image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw6b3b3b1a/Images/products/The%20Ordinary/rdn-lactic-acid-10pct-ha-2pct-30ml.png",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/the-ordinary-lactic-acid-10-ha-P427418" },
            { name: "Ulta", url: "https://www.ulta.com/p/lactic-acid-10-ha-2-pimprod2007105" }
          ]
        },
        {
          name: "Overnight Resurfacing Peel",
          brand: "Glow Recipe",
          priceRange: "$45",
          matchScore: 72,
          reason: "AHA/BHA blend with fruit extracts. Fun packaging, solid results.",
          differences: "Different acid blend. Watermelon aesthetic.",
          bestFor: ["Glow Recipe fans", "Gentler approach", "Aesthetic preference"],
          image: "https://images.ulta.com/is/image/Ulta/2565619",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/glow-recipe-watermelon-glow-aha-night-treatment-P460289" }
          ]
        }
      ]
    },
    {
      id: "estee-lauder-anr",
      name: "Advanced Night Repair Serum",
      brand: "Estée Lauder",
      category: "skincare",
      subcategory: "serum",
      price: "$80–$140",
      description: "The 'brown bottle.' Hyaluronic acid, peptides, antioxidants. Anti-aging icon.",
      image: "https://images.ulta.com/is/image/Ulta/2585925",
      aliases: ["advanced night repair", "anr", "estee lauder serum", "brown bottle"],
      appeal: "Decades of loyal users. Reliable anti-aging that your mom probably used.",
      dupes: [
        {
          name: "Snail Mucin 96% Essence",
          brand: "COSRX",
          priceRange: "$25",
          matchScore: 70,
          reason: "K-beauty repair essence with cult following. Similar repair/hydration goal.",
          differences: "Snail mucin vs peptides. Different texture and philosophy.",
          bestFor: ["K-beauty fans", "Snail mucin believers", "Hydration focus"],
          image: "https://images.ulta.com/is/image/Ulta/2551273",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/COSRX-Advanced-Snail-Mucin-Essence/dp/B00PBX3L7K" },
            { name: "Ulta", url: "https://www.ulta.com/p/advanced-snail-96-mucin-power-essence-pimprod2007101" }
          ]
        },
        {
          name: "Multi-Peptide + HA Serum",
          brand: "The Ordinary",
          priceRange: "$18",
          matchScore: 72,
          reason: "Peptide-focused serum at budget price.",
          differences: "Less elegant texture. Different supporting ingredients.",
          bestFor: ["Budget-conscious", "The Ordinary fans", "Peptide preference"],
          image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw7b3b3b1a/Images/products/The%20Ordinary/rdn-multi-peptide-ha-serum-30ml.png",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/the-ordinary-multi-peptide-ha-serum-P460713" }
          ]
        },
        {
          name: "Midnight Recovery Concentrate",
          brand: "Kiehl's",
          priceRange: "$58",
          matchScore: 68,
          reason: "Botanical night oil with similar overnight repair positioning.",
          differences: "Oil vs serum. Lavender-scented botanical approach.",
          bestFor: ["Kiehl's fans", "Oil preference", "Aromatherapy appeal"],
          image: "https://images.ulta.com/is/image/Ulta/2535379",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/midnight-recovery-concentrate-P411389" }
          ]
        }
      ]
    },

    // ============================================
    // SKINCARE — MOISTURIZERS
    // ============================================
    {
      id: "la-mer-cream",
      name: "Crème de la Mer",
      brand: "La Mer",
      category: "skincare",
      subcategory: "moisturizer",
      price: "$200–$395",
      description: "The iconic luxury moisturizer. Miracle Broth™, rich texture, celebrity favorite.",
      image: "https://images.ulta.com/is/image/Ulta/2539527",
      aliases: ["la mer", "creme de la mer", "la mer cream", "miracle broth"],
      appeal: "The Rolls-Royce of moisturizers. Whether it works better than CeraVe is debated, but the experience is undeniable.",
      honestNote: "Dermatologists are divided. Many say equivalent hydration is achievable for less. You're paying for luxury experience.",
      dupes: [
        {
          name: "Ultra Repair Cream",
          brand: "First Aid Beauty",
          priceRange: "$42",
          matchScore: 55,
          reason: "Rich, repairing cream for dry skin. Colloidal oatmeal soothes.",
          differences: "Completely different formula. Practical vs luxurious.",
          bestFor: ["Sensitive skin", "Practical approach", "Eczema-prone"],
          image: "https://images.ulta.com/is/image/Ulta/2247053",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/ultra-repair-cream-intense-hydration-P248407" },
            { name: "Ulta", url: "https://www.ulta.com/p/ultra-repair-cream-intense-hydration-xlsImpprod5540071" }
          ]
        },
        {
          name: "Nivea Crème",
          brand: "Nivea",
          priceRange: "$8–$15",
          matchScore: 45,
          reason: "Classic rich moisturizer. Some claim similar results.",
          differences: "Completely different ingredients. No Miracle Broth.",
          bestFor: ["Extreme budget", "Nostalgic", "Body use too"],
          image: "https://images.ulta.com/is/image/Ulta/2089445",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/NIVEA-Cr%C3%A8me-Moisturizing-Cream-13-5/dp/B00DEG8N4U" },
            { name: "Target", url: "https://www.target.com/p/nivea-creme-body-face-and-hand-moisturizing-cream/-/A-12852977" }
          ]
        },
        {
          name: "Weleda Skin Food",
          brand: "Weleda",
          priceRange: "$20",
          matchScore: 50,
          reason: "Cult-classic rich balm. Different texture but intense hydration.",
          differences: "Thick balm vs cream. Natural/botanical approach.",
          bestFor: ["Natural beauty fans", "Very dry skin", "Multipurpose"],
          image: "https://images.ulta.com/is/image/Ulta/2509382",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Weleda-Skin-Food-Original-Ultra-Rich/dp/B000ORV3NC" },
            { name: "Target", url: "https://www.target.com/p/weleda-skin-food-2-5oz/-/A-14778628" }
          ]
        }
      ]
    },
    {
      id: "drunk-elephant-protini",
      name: "Protini Polypeptide Cream",
      brand: "Drunk Elephant",
      category: "skincare",
      subcategory: "moisturizer",
      price: "$68",
      description: "Peptide-packed moisturizer. Firming, anti-aging, protein-rich formula.",
      image: "https://images.ulta.com/is/image/Ulta/2531963",
      aliases: ["drunk elephant protini", "de protini", "protini cream"],
      appeal: "The thinking person's moisturizer. Peptides for anti-aging without retinol sensitivity.",
      dupes: [
        {
          name: "Peptide Moisturizer",
          brand: "The INKEY List",
          priceRange: "$15",
          matchScore: 75,
          reason: "Similar peptide focus at remarkable value.",
          differences: "Lighter texture, fewer peptide varieties.",
          bestFor: ["Budget-conscious", "Simple routines", "Peptide curious"],
          image: "https://images.ulta.com/is/image/Ulta/2574175",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/the-inkey-list-peptide-moisturizer-P460737" }
          ]
        },
        {
          name: "Buffet",
          brand: "The Ordinary",
          priceRange: "$18",
          matchScore: 70,
          reason: "Serum with excellent peptide delivery. Layer under moisturizer.",
          differences: "Serum format, not cream. Different texture.",
          bestFor: ["Serum lovers", "The Ordinary fans", "Customizers"],
          image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw5b3b3b1a/Images/products/The%20Ordinary/rdn-buffet-30ml.png",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/the-ordinary-buffet-P427420" }
          ]
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
      image: "https://images.ulta.com/is/image/Ulta/2551162",
      aliases: ["tatcha dewy", "dewy skin cream", "tatcha cream"],
      appeal: "The glass skin enabler. Delivers that lit-from-within glow.",
      dupes: [
        {
          name: "Water Cream",
          brand: "COSRX",
          priceRange: "$25",
          matchScore: 70,
          reason: "K-beauty alternative with similar dewy finish.",
          differences: "Lighter texture, different botanical profile.",
          bestFor: ["K-beauty lovers", "Oily skin", "Lighter hydration"],
          image: "https://images.ulta.com/is/image/Ulta/2551272",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/COSRX-Oil-Free-Ultra-Moisturizing-Lotion/dp/B01N2FB0U3" }
          ]
        },
        {
          name: "Holy Hydration! Face Cream",
          brand: "e.l.f.",
          priceRange: "$12",
          matchScore: 68,
          reason: "Hyaluronic acid-based rich cream. Surprising quality for drugstore.",
          differences: "Less luxurious texture, different botanicals.",
          bestFor: ["Budget-conscious", "HA lovers", "Simple needs"],
          image: "https://images.ulta.com/is/image/Ulta/2563315",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/holy-hydration-face-cream-pimprod2011972" },
            { name: "Target", url: "https://www.target.com/p/e-l-f-holy-hydration-face-cream/-/A-79601422" }
          ]
        }
      ]
    },
    {
      id: "augustinus-bader-rich-cream",
      name: "The Rich Cream",
      brand: "Augustinus Bader",
      category: "skincare",
      subcategory: "moisturizer",
      price: "$170–$290",
      description: "Ultra-luxury moisturizer with TFC8® technology. Celebrity skincare secret.",
      image: "https://images.ulta.com/is/image/Ulta/2566833",
      aliases: ["augustinus bader", "the rich cream", "ab cream", "tfc8"],
      appeal: "The celebrities-actually-use-it cream. TFC8 allegedly supports cellular renewal.",
      honestNote: "TFC8 is patented — no true dupe exists. You're paying for proprietary technology and luxe experience.",
      dupes: [
        {
          name: "Ceramide Cream",
          brand: "Good Molecules",
          priceRange: "$14",
          matchScore: 55,
          reason: "Barrier-supporting ceramide cream at drugstore price.",
          differences: "No TFC8. Different ingredient philosophy entirely.",
          bestFor: ["Budget seekers", "Ceramide lovers", "Simple routines"],
          image: "https://images.ulta.com/is/image/Ulta/2577789",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/ceramide-cream-pimprod2024507" }
          ]
        },
        {
          name: "No true dupe exists",
          brand: "—",
          priceRange: "—",
          matchScore: 0,
          reason: "TFC8 is patented. Alternative moisturizers hydrate well but can't replicate the exact technology.",
          differences: "Wanting the AB experience means buying AB.",
          bestFor: ["Those comfortable with alternatives that hydrate differently"]
        }
      ]
    },

    // ============================================
    // SKINCARE — TREATMENTS
    // ============================================
    {
      id: "paula-choice-bha",
      name: "Skin Perfecting 2% BHA Liquid Exfoliant",
      brand: "Paula's Choice",
      category: "skincare",
      subcategory: "exfoliant",
      price: "$35",
      description: "The internet's favorite BHA. Salicylic acid for pores and texture.",
      image: "https://images.ulta.com/is/image/Ulta/2527836",
      aliases: ["paula's choice bha", "2% bha liquid", "pc bha", "paula choice exfoliant"],
      appeal: "TikTok, Reddit, and dermatologists all agree. The gold standard BHA.",
      dupes: [
        {
          name: "Salicylic Acid 2% Solution",
          brand: "The Ordinary",
          priceRange: "$6",
          matchScore: 80,
          reason: "Same active concentration at fraction of price.",
          differences: "Simpler formula. Some find PC more elegant.",
          bestFor: ["Best value", "The Ordinary fans", "Budget-conscious"],
          image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw4b3b3b1a/Images/products/The%20Ordinary/rdn-salicylic-acid-2pct-solution-30ml.png",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/the-ordinary-salicylic-acid-2-solution-P427417" }
          ]
        },
        {
          name: "BHA Blackhead Power Liquid",
          brand: "COSRX",
          priceRange: "$22",
          matchScore: 75,
          reason: "K-beauty BHA with willow bark. Gentler approach.",
          differences: "Betaine salicylate vs salicylic acid. Milder.",
          bestFor: ["Sensitive skin", "K-beauty fans", "Gentle approach"],
          image: "https://images.ulta.com/is/image/Ulta/2551271",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/COSRX-Blackhead-Power-Liquid-100ml/dp/B00OZEJ8R8" }
          ]
        }
      ]
    },
    {
      id: "sk-ii-essence",
      name: "Facial Treatment Essence",
      brand: "SK-II",
      category: "skincare",
      subcategory: "essence",
      price: "$185–$240",
      description: "The 'miracle water.' Pitera™ essence for radiance and texture.",
      image: "https://images.ulta.com/is/image/Ulta/2539503",
      aliases: ["sk-ii essence", "pitera essence", "sk2", "facial treatment essence"],
      appeal: "Asian beauty icon. Fermented sake byproduct that allegedly transforms skin.",
      honestNote: "Pitera is proprietary galactomyces ferment. Similar fermented essences exist but aren't identical.",
      dupes: [
        {
          name: "Galactomyces 95 Tone Balancing Essence",
          brand: "COSRX",
          priceRange: "$25",
          matchScore: 72,
          reason: "95% galactomyces filtrate. Very similar fermented essence approach.",
          differences: "Different fermentation process. Still excellent results.",
          bestFor: ["K-beauty fans", "Budget option", "Ferment curious"],
          image: "https://images.ulta.com/is/image/Ulta/2551274",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/COSRX-Galactomyces-Tone-Balancing-Essence/dp/B00OZEJ6LY" },
            { name: "Ulta", url: "https://www.ulta.com/p/galactomyces-95-tone-balancing-essence-pimprod2007099" }
          ]
        },
        {
          name: "Time Revolution First Treatment Essence",
          brand: "Missha",
          priceRange: "$30–$45",
          matchScore: 78,
          reason: "The famous SK-II dupe. Very similar ferment technology.",
          differences: "Different proprietary yeast. Loyal fanbase.",
          bestFor: ["Best known dupe", "K-beauty preference", "Long-time alternative"],
          image: "https://images.ulta.com/is/image/Ulta/2526177",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Missha-Revolution-First-Treatment-Essence/dp/B01N1LLVCR" }
          ]
        }
      ]
    },

    // ============================================
    // MAKEUP — LIPS
    // ============================================
    {
      id: "charlotte-tilbury-pillow-talk",
      name: "Pillow Talk",
      brand: "Charlotte Tilbury",
      category: "makeup",
      subcategory: "lipstick",
      price: "$34–$38",
      description: "The universal nude-pink. Matte Revolution formula. Celebrity makeup bag staple.",
      image: "https://images.ulta.com/is/image/Ulta/2556837",
      aliases: ["pillow talk", "charlotte tilbury pillow talk", "ct pillow talk", "pillow talk lipstick"],
      appeal: "The 'my lips but better' shade that works on everyone. Matte but comfortable.",
      dupes: [
        {
          name: "Velvet Teddy",
          brand: "MAC",
          priceRange: "$23",
          matchScore: 75,
          reason: "Classic matte nude. Very similar 'my lips but better' territory.",
          differences: "Slightly browner, drier formula.",
          bestFor: ["MAC fans", "Matte preference", "Warmer undertones"],
          image: "https://images.ulta.com/is/image/Ulta/2249279",
          retailers: [
            { name: "MAC", url: "https://www.maccosmetics.com/product/13854/310/Products/Makeup/Lips/Lipstick/Matte-Lipstick" },
            { name: "Ulta", url: "https://www.ulta.com/p/matte-lipstick-xlsImpprod10791243" }
          ]
        },
        {
          name: "Lip Lingerie XXL",
          brand: "NYX",
          priceRange: "$10",
          matchScore: 72,
          reason: "Liquid lip in similar nude-pink territory. Long-wearing.",
          differences: "Liquid formula. More drying but longer wear.",
          bestFor: ["Budget option", "Drugstore accessible", "Long wear needed"],
          image: "https://images.ulta.com/is/image/Ulta/2571157",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/lip-lingerie-xxl-matte-liquid-lipstick-pimprod2018107" },
            { name: "Target", url: "https://www.target.com/p/nyx-professional-makeup-lip-lingerie-xxl-matte-liquid-lipstick/-/A-79589832" }
          ]
        },
        {
          name: "Super Lustrous Lipstick in Pink in the Afternoon",
          brand: "Revlon",
          priceRange: "$8",
          matchScore: 68,
          reason: "Drugstore classic in similar nude-pink shade.",
          differences: "Cream finish vs matte. Different formula feel.",
          bestFor: ["Extreme budget", "Drugstore preference", "Cream finish lovers"],
          image: "https://images.ulta.com/is/image/Ulta/2243015",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Revlon-Super-Lustrous-Lipstick-Afternoon/dp/B004DCMZV4" },
            { name: "Target", url: "https://www.target.com/p/revlon-super-lustrous-lipstick/-/A-11233728" }
          ]
        }
      ]
    },
    {
      id: "mac-ruby-woo",
      name: "Ruby Woo",
      brand: "MAC",
      category: "makeup",
      subcategory: "lipstick",
      price: "$23",
      description: "The iconic blue-red matte. The red lipstick against which all others are measured.",
      image: "https://images.ulta.com/is/image/Ulta/2249279",
      aliases: ["ruby woo", "mac ruby woo", "mac red"],
      appeal: "Hollywood red. The shade makeup artists reach for. Universally flattering.",
      dupes: [
        {
          name: "Red Velvet",
          brand: "Maybelline",
          priceRange: "$8",
          matchScore: 80,
          reason: "Very similar blue-red at drugstore price. SuperStay Matte Ink formula.",
          differences: "Liquid formula, different texture. Actually longer wearing.",
          bestFor: ["Budget option", "Long wear needed", "Drugstore accessible"],
          image: "https://images.ulta.com/is/image/Ulta/2521631",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/superstay-matte-ink-liquid-lipstick-xlsImpprod17081073" },
            { name: "Target", url: "https://www.target.com/p/maybelline-super-stay-matte-ink-liquid-lipstick/-/A-52600159" }
          ]
        },
        {
          name: "Always Red",
          brand: "Smashbox",
          priceRange: "$24",
          matchScore: 75,
          reason: "Similar blue-red in comfortable cream formula.",
          differences: "Creamier, less matte. More comfortable wear.",
          bestFor: ["Cream finish preference", "Similar price point", "Comfort"],
          image: "https://images.ulta.com/is/image/Ulta/2298037",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/be-legendary-lipstick-P283908" }
          ]
        }
      ]
    },
    {
      id: "fenty-gloss-bomb",
      name: "Gloss Bomb Universal Lip Luminizer",
      brand: "Fenty Beauty",
      priceRange: "$22",
      category: "makeup",
      subcategory: "lip gloss",
      price: "$22",
      description: "The universal gloss. Non-sticky, shimmery, works on all skin tones.",
      image: "https://images.ulta.com/is/image/Ulta/2530775",
      aliases: ["gloss bomb", "fenty gloss", "fenty lip gloss"],
      appeal: "Rihanna's genius. Actually universal, actually non-sticky, actually worth it.",
      dupes: [
        {
          name: "Lip Injection Extreme",
          brand: "Too Faced",
          priceRange: "$32",
          matchScore: 55,
          reason: "High-shine gloss with plumping effect. Different but popular.",
          differences: "Plumping formula, tingles. Not truly a dupe.",
          bestFor: ["Plumping wanted", "Extra shine", "Too Faced fans"],
          image: "https://images.ulta.com/is/image/Ulta/2530098",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/lip-injection-extreme-P404236" }
          ]
        },
        {
          name: "Lifter Gloss",
          brand: "Maybelline",
          priceRange: "$10",
          matchScore: 72,
          reason: "Hyaluronic acid gloss with similar non-sticky shine.",
          differences: "Less shimmer, more hydrating. Budget alternative.",
          bestFor: ["Budget option", "Drugstore accessible", "Hydrating formula"],
          image: "https://images.ulta.com/is/image/Ulta/2563011",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/lifter-gloss-hydrating-lip-gloss-with-hyaluronic-acid-pimprod2012778" },
            { name: "Target", url: "https://www.target.com/p/maybelline-lifter-gloss/-/A-79589744" }
          ]
        }
      ]
    },

    // ============================================
    // MAKEUP — FACE
    // ============================================
    {
      id: "nars-orgasm",
      name: "Orgasm Blush",
      brand: "NARS",
      category: "makeup",
      subcategory: "blush",
      price: "$32",
      description: "The most popular blush in the world. Peachy-pink with golden shimmer.",
      image: "https://images.ulta.com/is/image/Ulta/2524979",
      aliases: ["nars orgasm", "orgasm blush", "nars blush"],
      appeal: "Named provocatively, performs beautifully. Works on virtually everyone.",
      dupes: [
        {
          name: "Luminoso",
          brand: "Milani",
          priceRange: "$10",
          matchScore: 85,
          reason: "Famous drugstore dupe. Nearly identical peachy-golden shimmer.",
          differences: "Slightly more orange, similar shimmer level.",
          bestFor: ["Best budget dupe", "Drugstore fans", "TikTok famous"],
          image: "https://images.ulta.com/is/image/Ulta/2265299",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Milani-Baked-Blush-Luminoso-0-12/dp/B00518N5IM" },
            { name: "Target", url: "https://www.target.com/p/milani-baked-blush/-/A-14494291" },
            { name: "CVS", url: "https://www.cvs.com/shop/milani-baked-blush" }
          ]
        },
        {
          name: "Peach Nectar",
          brand: "e.l.f.",
          priceRange: "$6",
          matchScore: 70,
          reason: "Affordable peachy-pink option. e.l.f. punching above weight.",
          differences: "Less shimmer, more matte. Different texture.",
          bestFor: ["Extreme budget", "Matte preference", "e.l.f. fans"],
          image: "https://images.ulta.com/is/image/Ulta/2585093",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/primer-infused-blush-pimprod2018975" },
            { name: "Target", url: "https://www.target.com/p/e-l-f-primer-infused-blush/-/A-79601421" }
          ]
        }
      ]
    },
    {
      id: "rare-beauty-blush",
      name: "Soft Pinch Liquid Blush",
      brand: "Rare Beauty",
      category: "makeup",
      subcategory: "blush",
      price: "$23",
      description: "The viral liquid blush. Incredibly pigmented — a tiny dot lasts forever.",
      image: "https://images.ulta.com/is/image/Ulta/2571609",
      aliases: ["rare beauty blush", "soft pinch", "selena blush"],
      appeal: "Selena Gomez hit gold. One tube lasts a year. Seamless, skin-like finish.",
      dupes: [
        {
          name: "Serum Blush",
          brand: "e.l.f.",
          priceRange: "$7",
          matchScore: 78,
          reason: "Very similar lightweight liquid formula. Great shade range.",
          differences: "Slightly less pigmented, similar finish.",
          bestFor: ["Budget option", "e.l.f. fans", "Drugstore accessible"],
          image: "https://images.ulta.com/is/image/Ulta/2587907",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/camo-liquid-blush-pimprod2023456" },
            { name: "Target", url: "https://www.target.com/p/e-l-f-camo-liquid-blush/-/A-82831426" }
          ]
        },
        {
          name: "Flush Balm",
          brand: "Merit",
          priceRange: "$28",
          matchScore: 70,
          reason: "Cream-to-powder blush stick. Similar natural finish philosophy.",
          differences: "Stick format, different application. Same minimalist vibe.",
          bestFor: ["Stick preference", "Clean beauty", "On-the-go application"],
          image: "https://images.ulta.com/is/image/Ulta/2580841",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/merit-flush-balm-P470097" }
          ]
        }
      ]
    },
    {
      id: "hourglass-ambient",
      name: "Ambient Lighting Powder",
      brand: "Hourglass",
      category: "makeup",
      subcategory: "powder",
      price: "$52",
      description: "The soft-focus finishing powder. Photoluminescent technology for ethereal glow.",
      image: "https://images.ulta.com/is/image/Ulta/2504315",
      aliases: ["hourglass powder", "ambient lighting", "hourglass ambient"],
      appeal: "Makes everyone look airbrushed. The finishing powder makeup artists swear by.",
      dupes: [
        {
          name: "Meteorites",
          brand: "Guerlain",
          priceRange: "$68",
          matchScore: 65,
          reason: "Similar soft-focus finish with violet scent. Luxury alternative.",
          differences: "More expensive, different packaging. Iconic in its own right.",
          bestFor: ["Guerlain fans", "Different luxury option", "Violet scent lovers"],
          image: "https://images.ulta.com/is/image/Ulta/2565813",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/meteorites-light-revealing-pearls-of-powder-P1457" }
          ]
        },
        {
          name: "Candlelight Pressed Illuminating Powder",
          brand: "Too Faced",
          priceRange: "$30",
          matchScore: 68,
          reason: "Soft-focus illuminating powder at lower price point.",
          differences: "More obvious shimmer, different formula.",
          bestFor: ["Budget option", "More glow wanted", "Too Faced fans"],
          image: "https://images.ulta.com/is/image/Ulta/2542098",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/born-this-way-turn-up-the-light-skin-centric-highlighting-palette-P434840" }
          ]
        }
      ]
    },
    {
      id: "too-faced-mascara",
      name: "Better Than Sex Mascara",
      brand: "Too Faced",
      category: "makeup",
      subcategory: "mascara",
      price: "$29",
      description: "The bestselling prestige mascara. Intense black, volumizing, hourglass wand.",
      image: "https://images.ulta.com/is/image/Ulta/2278015",
      aliases: ["better than sex", "too faced mascara", "bts mascara"],
      appeal: "The name that launched a thousand purchases. Dramatic volume and length.",
      dupes: [
        {
          name: "Lash Sensational",
          brand: "Maybelline",
          priceRange: "$10",
          matchScore: 78,
          reason: "Fan brush creates similar fanned-out volume. Drugstore favorite.",
          differences: "Different brush shape, similar results.",
          bestFor: ["Budget option", "Drugstore accessible", "Similar results"],
          image: "https://images.ulta.com/is/image/Ulta/2287171",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/lash-sensational-full-fan-effect-waterproof-mascara-xlsImpprod13631125" },
            { name: "Amazon", url: "https://www.amazon.com/Maybelline-New-York-Sensational-Washable/dp/B00PFCSC7I" }
          ]
        },
        {
          name: "Telescopic Lift Mascara",
          brand: "L'Oréal",
          priceRange: "$15",
          matchScore: 72,
          reason: "Viral drugstore mascara. Lengthening and lifting.",
          differences: "More lengthening vs volumizing. Different effect.",
          bestFor: ["Length preference", "TikTok viral", "Budget option"],
          image: "https://images.ulta.com/is/image/Ulta/2581631",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/telescopic-lift-washable-mascara-pimprod2025456" },
            { name: "Target", url: "https://www.target.com/p/l-oreal-paris-telescopic-lift-mascara/-/A-82686871" }
          ]
        }
      ]
    },

    // ============================================
    // MAKEUP — EYES
    // ============================================
    {
      id: "urban-decay-naked",
      name: "Naked Palette",
      brand: "Urban Decay",
      category: "makeup",
      subcategory: "eyeshadow",
      price: "$54",
      description: "The palette that changed the game. Neutral eye looks made easy.",
      image: "https://images.ulta.com/is/image/Ulta/2531567",
      aliases: ["naked palette", "urban decay naked", "ud naked"],
      appeal: "Started the nude palette revolution. Still relevant after all these years.",
      dupes: [
        {
          name: "The Needs",
          brand: "Maybelline",
          priceRange: "$12",
          matchScore: 75,
          reason: "Budget neutral palette with excellent formula.",
          differences: "Fewer shades, different color selection.",
          bestFor: ["Budget option", "Drugstore accessible", "Basic needs"],
          image: "https://images.ulta.com/is/image/Ulta/2547931",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/the-nudes-eyeshadow-palette-xlsImpprod12011191" },
            { name: "Amazon", url: "https://www.amazon.com/Maybelline-Eyeshadow-Palette-Makeup-Nudes/dp/B00NR2WRTK" }
          ]
        },
        {
          name: "Nude Attitude",
          brand: "e.l.f.",
          priceRange: "$14",
          matchScore: 70,
          reason: "Affordable neutral palette. Surprisingly good formula.",
          differences: "Less pigmented, different shade range.",
          bestFor: ["Extreme budget", "e.l.f. fans", "Beginners"],
          image: "https://images.ulta.com/is/image/Ulta/2538115",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/bite-size-eyeshadow-pimprod2004550" },
            { name: "Target", url: "https://www.target.com/p/e-l-f-bite-size-eyeshadow/-/A-76617731" }
          ]
        }
      ]
    },
    {
      id: "pat-mcgrath-mothership",
      name: "Mothership Palette",
      brand: "Pat McGrath Labs",
      category: "makeup",
      subcategory: "eyeshadow",
      price: "$128",
      description: "Ultra-luxury eyeshadow. The makeup artist's dream palette.",
      image: "https://images.ulta.com/is/image/Ulta/2550787",
      aliases: ["mothership", "pat mcgrath palette", "pmg mothership"],
      appeal: "The Rolls-Royce of eyeshadow. Buttery, pigmented, editorial-worthy.",
      honestNote: "Genuinely exceptional formula. But the drugstore has come a long way.",
      dupes: [
        {
          name: "Color Icon Eyeshadow 10-Pan",
          brand: "Wet n Wild",
          priceRange: "$5",
          matchScore: 50,
          reason: "Shockingly good formula for $5. Different but solid.",
          differences: "Less buttery, less variety. But excellent value.",
          bestFor: ["Extreme budget", "Drugstore curious", "Beginners"],
          image: "https://images.ulta.com/is/image/Ulta/2534939",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/wet-wild-Color-Icon-Eyeshadow/dp/B01N9H8WA7" },
            { name: "Target", url: "https://www.target.com/p/wet-n-wild-color-icon-10-pan-eyeshadow-palette/-/A-52619044" }
          ]
        },
        {
          name: "Soft Glam Palette",
          brand: "Anastasia Beverly Hills",
          priceRange: "$45",
          matchScore: 72,
          reason: "Excellent quality at lower luxury price point.",
          differences: "Different color story, still prestige quality.",
          bestFor: ["ABH fans", "Similar quality", "More affordable luxury"],
          image: "https://images.ulta.com/is/image/Ulta/2529900",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/soft-glam-eyeshadow-palette-P67980046" },
            { name: "Ulta", url: "https://www.ulta.com/p/soft-glam-eyeshadow-palette-pimprod2006703" }
          ]
        }
      ]
    },

    // ============================================
    // HAIRCARE
    // ============================================
    {
      id: "olaplex-no3",
      name: "No. 3 Hair Perfector",
      brand: "Olaplex",
      category: "haircare",
      subcategory: "treatment",
      price: "$30",
      description: "Bond-building treatment. Repairs damaged, color-treated hair.",
      image: "https://images.ulta.com/is/image/Ulta/2523016",
      aliases: ["olaplex 3", "olaplex no 3", "olaplex treatment", "bond repair"],
      appeal: "The treatment that actually works. Salon technology for home use.",
      dupes: [
        {
          name: "8-Second Wonder Water",
          brand: "L'Oréal",
          priceRange: "$10",
          matchScore: 60,
          reason: "Quick rinse-out treatment for smoother hair.",
          differences: "Not bond-building, just conditioning. Different technology.",
          bestFor: ["Quick results", "Budget option", "Convenience"],
          image: "https://images.ulta.com/is/image/Ulta/2573185",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/elvive-8-second-wonder-water-lamellar-rinse-out-pimprod2014739" },
            { name: "Amazon", url: "https://www.amazon.com/LOr%C3%A9al-Paris-Elvive-Wonder-Lamellar/dp/B08K8LC6G5" }
          ]
        },
        {
          name: "K18 Leave-In Repair Mask",
          brand: "K18",
          priceRange: "$75",
          matchScore: 70,
          reason: "Different bond-repair technology. Bioactive peptides.",
          differences: "Leave-in vs rinse-out. Actually more expensive.",
          bestFor: ["Alternative technology", "Leave-in preference", "Severely damaged hair"],
          image: "https://images.ulta.com/is/image/Ulta/2568103",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/k18-leave-in-molecular-repair-hair-mask-P470080" }
          ]
        }
      ]
    },
    {
      id: "dyson-airwrap",
      name: "Airwrap Multi-Styler",
      brand: "Dyson",
      category: "haircare",
      subcategory: "tools",
      price: "$600",
      description: "The Coandă effect styler. Curls, waves, smooths without extreme heat.",
      image: "https://images.ulta.com/is/image/Ulta/2585507",
      aliases: ["dyson airwrap", "airwrap", "dyson curler"],
      appeal: "Engineering marvel. Makes styling look effortless (with practice).",
      honestNote: "Learning curve is real. Many return it. But those who love it, really love it.",
      dupes: [
        {
          name: "AireBrush Duo",
          brand: "Shark",
          priceRange: "$100",
          matchScore: 65,
          reason: "Similar blow-dry brush concept at fraction of price.",
          differences: "No curling barrels. Different technology.",
          bestFor: ["Budget conscious", "Blow-dry focus", "Shark fans"],
          image: "https://images.ulta.com/is/image/Ulta/2586171",
          retailers: [
            { name: "Ulta", url: "https://www.ulta.com/p/flexstyle-air-styling-drying-system-pimprod2031531" },
            { name: "Amazon", url: "https://www.amazon.com/Shark-HD430-FlexStyle-Styling-Drying/dp/B0B5YD4Z3X" }
          ]
        },
        {
          name: "AirStyle",
          brand: "Revlon",
          priceRange: "$50",
          matchScore: 55,
          reason: "Affordable multi-styler option. Different results.",
          differences: "Less powerful, different attachments. Budget tier.",
          bestFor: ["Extreme budget", "Testing concept", "Basic needs"],
          image: "https://images.ulta.com/is/image/Ulta/2580607",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/Revlon-One-Step-Volumizer-PLUS-Dryer/dp/B09P38PJGS" }
          ]
        }
      ]
    },
    {
      id: "kerastase-elixir",
      name: "Elixir Ultime Oil Serum",
      brand: "Kérastase",
      category: "haircare",
      subcategory: "treatment",
      price: "$58",
      description: "Luxury hair oil. Argan, camellia, marula oils for shine and softness.",
      image: "https://images.ulta.com/is/image/Ulta/2571529",
      aliases: ["kerastase oil", "elixir ultime", "kerastase elixir"],
      appeal: "The salon-quality oil that smells divine and transforms hair.",
      dupes: [
        {
          name: "Argan Oil of Morocco",
          brand: "OGX",
          priceRange: "$8",
          matchScore: 70,
          reason: "Drugstore argan oil that works. Similar smoothing effect.",
          differences: "Simpler formula, less refined. But effective.",
          bestFor: ["Budget option", "Drugstore accessible", "Argan fans"],
          image: "https://images.ulta.com/is/image/Ulta/2244671",
          retailers: [
            { name: "Amazon", url: "https://www.amazon.com/OGX-Renewing-Morocco-Penetrating-Oil/dp/B003TY0B9M" },
            { name: "Target", url: "https://www.target.com/p/ogx-renewing-argan-oil-of-morocco-penetrating-oil/-/A-13294462" }
          ]
        },
        {
          name: "Moroccanoil Treatment",
          brand: "Moroccanoil",
          priceRange: "$48",
          matchScore: 75,
          reason: "The original viral hair oil. Similar results, iconic scent.",
          differences: "Different oil blend, signature scent. Still luxury tier.",
          bestFor: ["Moroccanoil fans", "Original viral oil", "Salon-quality"],
          image: "https://images.ulta.com/is/image/Ulta/2248753",
          retailers: [
            { name: "Sephora", url: "https://www.sephora.com/product/moroccanoil-treatment-P379873" },
            { name: "Ulta", url: "https://www.ulta.com/p/moroccanoil-treatment-xlsImpprod10271083" }
          ]
        }
      ]
    }
  ]
};
