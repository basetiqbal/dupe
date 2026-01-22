#!/usr/bin/env node
/**
 * THE DUPE EDIT — Data Gathering & Research Tool
 * 
 * Gathers dupe intelligence from multiple sources:
 * - Reddit (r/fragrance, r/SkincareAddiction, r/MakeupAddiction, r/FrugalFemaleFashion)
 * - YouTube (via Invidious instances)
 * - TikTok (via unofficial API)
 * - Google Search suggestions
 * - Beauty blogs & forums
 * 
 * Usage: node scripts/gather-data.js "Baccarat Rouge 540"
 * 
 * Output: JSON with aggregated dupe recommendations for manual curation
 */

const https = require('https');
const http = require('http');

// ============================================
// Configuration
// ============================================
const CONFIG = {
  reddit: {
    subreddits: [
      'fragrance',
      'SkincareAddiction', 
      'MakeupAddiction',
      'FrugalFemaleFashion',
      'Indiemakeupandmore',
      'drugstoreMUA',
      'AsianBeauty',
      'beauty',
      'BeautyGuruChatter'
    ],
    userAgent: 'TheDupeEdit/1.0 (Research Tool)',
    limit: 25
  },
  youtube: {
    // Multiple Invidious instances for redundancy
    instances: [
      'vid.puffyan.us',
      'invidious.snopyta.org',
      'yewtu.be',
      'invidious.kavin.rocks'
    ]
  },
  tiktok: {
    // Unofficial TikTok search endpoint
    searchUrl: 'https://www.tiktok.com/api/search/general/full/'
  },
  google: {
    suggestUrl: 'https://suggestqueries.google.com/complete/search'
  },
  timeout: 10000
};

// ============================================
// HTTP Helper
// ============================================
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const lib = isHttps ? https : http;
    
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': CONFIG.reddit.userAgent,
        'Accept': 'application/json',
        ...options.headers
      },
      timeout: CONFIG.timeout
    };

    const req = lib.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ 
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            data: data,
            json: () => JSON.parse(data)
          });
        } catch (e) {
          resolve({ ok: false, status: res.statusCode, data, json: () => ({}) });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

// ============================================
// Reddit Search
// ============================================
async function searchReddit(query) {
  console.log('\n📱 Searching Reddit...');
  const results = [];
  
  for (const subreddit of CONFIG.reddit.subreddits) {
    try {
      const searchTerms = [
        `${query} dupe`,
        `${query} alternative`,
        `${query} cheaper`
      ];
      
      for (const term of searchTerms) {
        const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(term)}&restrict_sr=1&limit=${CONFIG.reddit.limit}&sort=relevance`;
        
        const response = await fetch(url);
        if (!response.ok) continue;
        
        const data = response.json();
        if (!data.data?.children) continue;
        
        for (const post of data.data.children) {
          const p = post.data;
          if (p.score < 5) continue; // Filter low-quality posts
          
          results.push({
            source: 'reddit',
            subreddit: subreddit,
            title: p.title,
            text: p.selftext?.substring(0, 500),
            score: p.score,
            comments: p.num_comments,
            url: `https://reddit.com${p.permalink}`,
            created: new Date(p.created_utc * 1000).toISOString()
          });
        }
        
        // Rate limiting
        await sleep(100);
      }
      
      console.log(`  ✓ r/${subreddit}: ${results.filter(r => r.subreddit === subreddit).length} posts`);
    } catch (e) {
      console.log(`  ✗ r/${subreddit}: ${e.message}`);
    }
  }
  
  return results;
}

// ============================================
// YouTube Search (via Invidious)
// ============================================
async function searchYouTube(query) {
  console.log('\n📺 Searching YouTube...');
  const results = [];
  
  const searchTerms = [
    `${query} dupe`,
    `${query} alternative`,
    `${query} drugstore dupe`,
    `best ${query} dupes`
  ];
  
  for (const instance of CONFIG.youtube.instances) {
    try {
      for (const term of searchTerms) {
        const url = `https://${instance}/api/v1/search?q=${encodeURIComponent(term)}&type=video`;
        
        const response = await fetch(url);
        if (!response.ok) continue;
        
        const videos = response.json();
        if (!Array.isArray(videos)) continue;
        
        for (const video of videos.slice(0, 10)) {
          results.push({
            source: 'youtube',
            title: video.title,
            channel: video.author,
            views: video.viewCount,
            published: video.publishedText,
            url: `https://youtube.com/watch?v=${video.videoId}`,
            thumbnail: video.videoThumbnails?.[0]?.url
          });
        }
      }
      
      console.log(`  ✓ ${instance}: ${results.length} videos`);
      break; // Success, don't try other instances
    } catch (e) {
      console.log(`  ✗ ${instance}: ${e.message}`);
    }
  }
  
  return results;
}

// ============================================
// Google Suggestions
// ============================================
async function getGoogleSuggestions(query) {
  console.log('\n🔍 Getting Google suggestions...');
  const results = [];
  
  const searchTerms = [
    `${query} dupe`,
    `${query} alternative`,
    `${query} cheaper version`,
    `best dupe for ${query}`
  ];
  
  for (const term of searchTerms) {
    try {
      const url = `${CONFIG.google.suggestUrl}?client=firefox&q=${encodeURIComponent(term)}`;
      
      const response = await fetch(url);
      if (!response.ok) continue;
      
      const data = response.json();
      if (Array.isArray(data) && data[1]) {
        for (const suggestion of data[1]) {
          if (!results.includes(suggestion)) {
            results.push(suggestion);
          }
        }
      }
    } catch (e) {
      // Silently continue
    }
  }
  
  console.log(`  ✓ ${results.length} suggestions found`);
  return results;
}

// ============================================
// Web Scraping - Beauty Blogs
// ============================================
async function scrapeBeautyBlogs(query) {
  console.log('\n📰 Scraping beauty blogs...');
  const results = [];
  
  const blogs = [
    {
      name: 'Temptalia',
      searchUrl: `https://www.temptalia.com/?s=${encodeURIComponent(query + ' dupe')}`
    },
    {
      name: 'Makeup Alley',
      searchUrl: `https://www.makeupalley.com/product/searching?SearchQuery=${encodeURIComponent(query)}`
    },
    {
      name: 'Fragrantica',
      searchUrl: `https://www.fragrantica.com/search/?query=${encodeURIComponent(query)}`
    },
    {
      name: 'Beautypedia',
      searchUrl: `https://www.beautypedia.com/search?q=${encodeURIComponent(query)}`
    }
  ];
  
  for (const blog of blogs) {
    try {
      const response = await fetch(blog.searchUrl, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      
      if (response.ok) {
        // Extract product mentions using regex patterns
        const html = response.data;
        const productPattern = /(?:dupe|alternative|similar to|comparable|instead of)[^<]{0,200}?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi;
        const matches = html.match(productPattern) || [];
        
        results.push({
          source: blog.name,
          url: blog.searchUrl,
          mentions: matches.slice(0, 10)
        });
        
        console.log(`  ✓ ${blog.name}: ${matches.length} mentions`);
      }
    } catch (e) {
      console.log(`  ✗ ${blog.name}: ${e.message}`);
    }
    
    await sleep(200);
  }
  
  return results;
}

// ============================================
// Product Database APIs
// ============================================
async function searchProductAPIs(query) {
  console.log('\n🛍️ Searching product APIs...');
  const results = [];
  
  // Sephora product search (unofficial)
  try {
    const sephoraUrl = `https://www.sephora.com/api/catalog/search?keyword=${encodeURIComponent(query)}&currentPage=1`;
    const response = await fetch(sephoraUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    if (response.ok) {
      const data = response.json();
      if (data.products) {
        for (const product of data.products.slice(0, 10)) {
          results.push({
            source: 'sephora',
            name: product.displayName,
            brand: product.brandName,
            price: product.currentSku?.listPrice,
            rating: product.rating,
            reviews: product.reviews,
            url: `https://www.sephora.com${product.targetUrl}`
          });
        }
        console.log(`  ✓ Sephora: ${results.length} products`);
      }
    }
  } catch (e) {
    console.log(`  ✗ Sephora: ${e.message}`);
  }
  
  // Ulta product search
  try {
    const ultaUrl = `https://www.ulta.com/api/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(ultaUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    if (response.ok) {
      const data = response.json();
      if (data.products) {
        for (const product of data.products.slice(0, 10)) {
          results.push({
            source: 'ulta',
            name: product.name,
            brand: product.brand,
            price: product.price,
            rating: product.rating,
            url: product.url
          });
        }
        console.log(`  ✓ Ulta: ${results.filter(r => r.source === 'ulta').length} products`);
      }
    }
  } catch (e) {
    console.log(`  ✗ Ulta: ${e.message}`);
  }
  
  return results;
}

// ============================================
// TikTok Search (experimental)
// ============================================
async function searchTikTok(query) {
  console.log('\n🎵 Searching TikTok...');
  const results = [];
  
  try {
    // TikTok web search scraping
    const searchTerms = [`${query} dupe`, `${query} dupe viral`];
    
    for (const term of searchTerms) {
      const url = `https://www.tiktok.com/search?q=${encodeURIComponent(term)}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'text/html',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      
      if (response.ok) {
        // Extract video data from HTML
        const html = response.data;
        const videoPattern = /"desc":"([^"]+)"/g;
        let match;
        while ((match = videoPattern.exec(html)) !== null) {
          if (match[1].toLowerCase().includes('dupe')) {
            results.push({
              source: 'tiktok',
              description: match[1].substring(0, 200),
              searchTerm: term
            });
          }
        }
      }
    }
    
    console.log(`  ✓ TikTok: ${results.length} videos`);
  } catch (e) {
    console.log(`  ✗ TikTok: ${e.message}`);
  }
  
  return results;
}

// ============================================
// Analysis & Aggregation
// ============================================
function analyzeResults(allResults, query) {
  console.log('\n📊 Analyzing results...');
  
  const dupeFrequency = {};
  const sources = {};
  
  // Extract product names mentioned
  const productPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,4})/g;
  
  for (const result of allResults) {
    const text = JSON.stringify(result).toLowerCase();
    
    // Track sources
    if (!sources[result.source]) {
      sources[result.source] = 0;
    }
    sources[result.source]++;
    
    // Common dupe product patterns
    const dupePatterns = [
      /(\w+(?:\s+\w+){0,3})\s+(?:is|as)\s+(?:a\s+)?(?:great|good|best|perfect)\s+dupe/gi,
      /(?:try|get|buy)\s+(\w+(?:\s+\w+){0,3})\s+instead/gi,
      /(\w+(?:\s+\w+){0,3})\s+(?:dupes?|alternatives?)\s+(?:for|to)/gi
    ];
    
    for (const pattern of dupePatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const productName = match[1]?.trim();
        if (productName && productName.length > 3) {
          if (!dupeFrequency[productName]) {
            dupeFrequency[productName] = { count: 0, sources: new Set() };
          }
          dupeFrequency[productName].count++;
          dupeFrequency[productName].sources.add(result.source);
        }
      }
    }
  }
  
  // Sort by frequency
  const sortedDupes = Object.entries(dupeFrequency)
    .map(([name, data]) => ({
      name,
      mentions: data.count,
      sources: Array.from(data.sources)
    }))
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 20);
  
  return {
    query,
    timestamp: new Date().toISOString(),
    totalResults: allResults.length,
    sourceBreakdown: sources,
    topDupes: sortedDupes,
    rawData: allResults
  };
}

// ============================================
// Helpers
// ============================================
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// Main
// ============================================
async function main() {
  const query = process.argv[2];
  
  if (!query) {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║          THE DUPE EDIT — Data Gathering Tool               ║
╠════════════════════════════════════════════════════════════╣
║  Gathers dupe intelligence from multiple sources:          ║
║  • Reddit (9 subreddits)                                   ║
║  • YouTube (via Invidious)                                 ║
║  • TikTok (web scraping)                                   ║
║  • Google Suggestions                                      ║
║  • Beauty Blogs (Temptalia, Fragrantica, etc.)             ║
║  • Product APIs (Sephora, Ulta)                            ║
╠════════════════════════════════════════════════════════════╣
║  Usage: node scripts/gather-data.js "Product Name"         ║
║                                                            ║
║  Examples:                                                 ║
║    node scripts/gather-data.js "Baccarat Rouge 540"        ║
║    node scripts/gather-data.js "Charlotte Tilbury Pillow"  ║
║    node scripts/gather-data.js "Drunk Elephant Protini"    ║
╚════════════════════════════════════════════════════════════╝
`);
    process.exit(0);
  }
  
  console.log(`\n🔬 Researching dupes for: "${query}"\n`);
  console.log('═'.repeat(50));
  
  // Gather from all sources in parallel where possible
  const [
    redditResults,
    youtubeResults,
    googleSuggestions,
    blogResults,
    productResults,
    tiktokResults
  ] = await Promise.all([
    searchReddit(query).catch(e => []),
    searchYouTube(query).catch(e => []),
    getGoogleSuggestions(query).catch(e => []),
    scrapeBeautyBlogs(query).catch(e => []),
    searchProductAPIs(query).catch(e => []),
    searchTikTok(query).catch(e => [])
  ]);
  
  // Combine all results
  const allResults = [
    ...redditResults,
    ...youtubeResults.map(v => ({ ...v, source: 'youtube' })),
    ...blogResults,
    ...productResults,
    ...tiktokResults
  ];
  
  // Add google suggestions as context
  const analysis = analyzeResults(allResults, query);
  analysis.googleSuggestions = googleSuggestions;
  
  // Output results
  console.log('\n' + '═'.repeat(50));
  console.log('\n📋 RESEARCH SUMMARY\n');
  console.log(`Total data points gathered: ${analysis.totalResults}`);
  console.log('\nSource breakdown:');
  for (const [source, count] of Object.entries(analysis.sourceBreakdown)) {
    console.log(`  • ${source}: ${count}`);
  }
  
  if (analysis.topDupes.length > 0) {
    console.log('\n🏆 TOP DUPE CANDIDATES (by mention frequency):\n');
    for (let i = 0; i < Math.min(10, analysis.topDupes.length); i++) {
      const dupe = analysis.topDupes[i];
      console.log(`  ${i + 1}. ${dupe.name}`);
      console.log(`     Mentions: ${dupe.mentions} | Sources: ${dupe.sources.join(', ')}`);
    }
  }
  
  if (googleSuggestions.length > 0) {
    console.log('\n🔍 GOOGLE AUTOCOMPLETE SIGNALS:\n');
    for (const suggestion of googleSuggestions.slice(0, 10)) {
      console.log(`  • ${suggestion}`);
    }
  }
  
  // Save full data to file
  const outputPath = `./scripts/research-${query.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
  const fs = require('fs');
  fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2));
  
  console.log(`\n💾 Full research data saved to: ${outputPath}`);
  console.log('\n✅ Use this data to curate entries in data/dupes.js\n');
}

main().catch(console.error);
