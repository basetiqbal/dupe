#!/usr/bin/env node

/**
 * THE DUPE EDIT — Data Fetching Script
 * 
 * Run locally to gather dupe information from various sources.
 * This script helps curate data that gets added to dupes.js
 * 
 * Usage: node scripts/fetch-dupe-data.js "Baccarat Rouge 540"
 * 
 * Sources:
 * - YouTube (via unofficial search)
 * - Google Search suggestions
 * - Reddit (via JSON endpoints)
 */

const https = require('https');
const fs = require('fs');

// Configuration
const CONFIG = {
  outputDir: './scripts/output',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
};

/**
 * Make HTTPS GET request
 */
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': CONFIG.userAgent }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Search YouTube for dupe videos (via Invidious public API)
 */
async function searchYouTube(query) {
  console.log('\n📺 Searching YouTube for dupe videos...');
  
  const searchQuery = encodeURIComponent(`${query} dupe affordable alternative`);
  
  // Using Invidious (privacy-friendly YouTube frontend with API)
  const instances = [
    'https://vid.puffyan.us',
    'https://invidious.snopyta.org',
    'https://yewtu.be'
  ];
  
  for (const instance of instances) {
    try {
      const url = `${instance}/api/v1/search?q=${searchQuery}&type=video`;
      const response = await fetchURL(url);
      
      if (response.status === 200) {
        const results = JSON.parse(response.data);
        const videos = results.slice(0, 5).map(video => ({
          title: video.title,
          videoId: video.videoId,
          author: video.author,
          views: video.viewCount,
          url: `https://youtube.com/watch?v=${video.videoId}`,
          embed: `https://www.youtube.com/embed/${video.videoId}`,
          thumbnail: video.videoThumbnails?.[0]?.url || null
        }));
        
        console.log(`  ✓ Found ${videos.length} videos`);
        return videos;
      }
    } catch (e) {
      continue; // Try next instance
    }
  }
  
  console.log('  ✗ YouTube search unavailable');
  return [];
}

/**
 * Search Reddit for dupe discussions
 */
async function searchReddit(query) {
  console.log('\n💬 Searching Reddit for discussions...');
  
  const searchQuery = encodeURIComponent(`${query} dupe`);
  const subreddits = ['MakeupAddiction', 'SkincareAddiction', 'fragrance', 'Frugal'];
  
  const results = [];
  
  for (const sub of subreddits) {
    try {
      const url = `https://www.reddit.com/r/${sub}/search.json?q=${searchQuery}&restrict_sr=1&limit=3&sort=relevance`;
      const response = await fetchURL(url);
      
      if (response.status === 200) {
        const data = JSON.parse(response.data);
        const posts = data.data?.children || [];
        
        for (const post of posts) {
          results.push({
            subreddit: sub,
            title: post.data.title,
            url: `https://reddit.com${post.data.permalink}`,
            score: post.data.score,
            comments: post.data.num_comments,
            created: new Date(post.data.created_utc * 1000).toISOString()
          });
        }
      }
    } catch (e) {
      continue;
    }
  }
  
  console.log(`  ✓ Found ${results.length} Reddit discussions`);
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

/**
 * Get Google autocomplete suggestions for dupe ideas
 */
async function getGoogleSuggestions(query) {
  console.log('\n🔍 Getting search suggestions...');
  
  const searches = [
    `${query} dupe`,
    `${query} affordable alternative`,
    `${query} drugstore dupe`,
  ];
  
  const suggestions = new Set();
  
  for (const search of searches) {
    try {
      const q = encodeURIComponent(search);
      const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${q}`;
      const response = await fetchURL(url);
      
      if (response.status === 200) {
        const data = JSON.parse(response.data);
        const results = data[1] || [];
        results.forEach(s => suggestions.add(s));
      }
    } catch (e) {
      continue;
    }
  }
  
  console.log(`  ✓ Found ${suggestions.size} search suggestions`);
  return Array.from(suggestions);
}

/**
 * Search for TikTok videos (via unofficial endpoints)
 */
async function searchTikTok(query) {
  console.log('\n🎵 Searching TikTok...');
  
  // TikTok doesn't have a public API, so we return search URL
  const searchQuery = encodeURIComponent(`${query} dupe`);
  const searchUrl = `https://www.tiktok.com/search?q=${searchQuery}`;
  
  console.log(`  ℹ TikTok search URL: ${searchUrl}`);
  console.log('  (Manual review required - no public API available)');
  
  return {
    searchUrl,
    hashtags: [
      `#${query.replace(/\s+/g, '').toLowerCase()}dupe`,
      '#beautydupe',
      '#makeupdupe',
      '#perfumedupe',
      '#drugstoredupe'
    ]
  };
}

/**
 * Compile all data into a structured report
 */
async function gatherDupeData(productName) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🔎 Researching dupes for: ${productName}`);
  console.log(`${'='.repeat(50)}`);
  
  const data = {
    query: productName,
    timestamp: new Date().toISOString(),
    youtube: await searchYouTube(productName),
    reddit: await searchReddit(productName),
    suggestions: await getGoogleSuggestions(productName),
    tiktok: await searchTikTok(productName),
  };
  
  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Save to file
  const filename = `${CONFIG.outputDir}/${productName.replace(/\s+/g, '-').toLowerCase()}.json`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Data saved to: ${filename}`);
  console.log(`${'='.repeat(50)}`);
  
  // Print summary
  printSummary(data);
  
  return data;
}

/**
 * Print human-readable summary
 */
function printSummary(data) {
  console.log('\n📊 SUMMARY\n');
  
  if (data.youtube.length > 0) {
    console.log('Top YouTube Videos:');
    data.youtube.forEach((v, i) => {
      console.log(`  ${i + 1}. "${v.title}" by ${v.author}`);
      console.log(`     ${v.url}`);
    });
  }
  
  if (data.reddit.length > 0) {
    console.log('\nTop Reddit Discussions:');
    data.reddit.forEach((r, i) => {
      console.log(`  ${i + 1}. [r/${r.subreddit}] ${r.title}`);
      console.log(`     Score: ${r.score} | Comments: ${r.comments}`);
    });
  }
  
  if (data.suggestions.length > 0) {
    console.log('\nSearch Suggestions:');
    data.suggestions.slice(0, 10).forEach(s => console.log(`  • ${s}`));
  }
  
  console.log('\nTikTok Hashtags to check:');
  data.tiktok.hashtags.forEach(h => console.log(`  • ${h}`));
  console.log(`  Search: ${data.tiktok.searchUrl}`);
}

/**
 * Generate dupes.js entry template from gathered data
 */
function generateTemplate(data) {
  const template = `
// Suggested entry for dupes.js based on research
// Review and edit before adding to database

{
  id: "${data.query.toLowerCase().replace(/\s+/g, '-')}",
  name: "${data.query}",
  brand: "BRAND_HERE",
  category: "CATEGORY",
  subcategory: "SUBCATEGORY",
  price: "$XX",
  description: "DESCRIPTION",
  image: "IMAGE_URL",
  aliases: [],
  
  // Video content for this product
  videos: [
${data.youtube.slice(0, 3).map(v => `    {
      platform: "youtube",
      title: "${v.title.replace(/"/g, '\\"')}",
      videoId: "${v.videoId}",
      author: "${v.author}",
      url: "${v.url}"
    }`).join(',\n')}
  ],
  
  // Social references
  social: {
    reddit: [
${data.reddit.slice(0, 2).map(r => `      { subreddit: "${r.subreddit}", url: "${r.url}", title: "${r.title.replace(/"/g, '\\"').substring(0, 60)}..." }`).join(',\n')}
    ],
    tiktok: {
      searchUrl: "${data.tiktok.searchUrl}",
      hashtags: ${JSON.stringify(data.tiktok.hashtags)}
    }
  },
  
  dupes: [
    // Add dupes here based on research
  ]
}
`;
  
  const filename = `${CONFIG.outputDir}/${data.query.replace(/\s+/g, '-').toLowerCase()}-template.js`;
  fs.writeFileSync(filename, template);
  console.log(`\n📝 Template saved to: ${filename}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
THE DUPE EDIT — Data Fetching Script

Usage:
  node scripts/fetch-dupe-data.js "Product Name"

Examples:
  node scripts/fetch-dupe-data.js "Baccarat Rouge 540"
  node scripts/fetch-dupe-data.js "Charlotte Tilbury Pillow Talk"
  node scripts/fetch-dupe-data.js "Drunk Elephant Protini"

This will search YouTube, Reddit, and other sources for dupe recommendations.
Results are saved to ./scripts/output/
  `);
  process.exit(0);
}

const productName = args.join(' ');

gatherDupeData(productName)
  .then(data => generateTemplate(data))
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
