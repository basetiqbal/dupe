/**
 * THE DUPE EDIT — Research API
 * 
 * Serverless function that gathers real-time dupe intelligence
 * from multiple sources. Used for research purposes to inform
 * the curated database — NOT for frontend search results.
 * 
 * Endpoint: /api/research?q=Product+Name
 */

const https = require('https');

// ============================================
// Configuration
// ============================================
const REDDIT_SUBREDDITS = [
  'fragrance', 'SkincareAddiction', 'MakeupAddiction', 
  'FrugalFemaleFashion', 'drugstoreMUA', 'AsianBeauty'
];

const INVIDIOUS_INSTANCES = [
  'vid.puffyan.us', 'invidious.snopyta.org', 'yewtu.be'
];

// ============================================
// Fetch Helper
// ============================================
function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'TheDupeEdit/1.0',
        'Accept': 'application/json',
        ...options.headers
      },
      timeout: 8000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ ok: res.statusCode < 400, data: JSON.parse(data) });
        } catch {
          resolve({ ok: false, data: null });
        }
      });
    });
    req.on('error', () => resolve({ ok: false, data: null }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, data: null }); });
    req.end();
  });
}

// ============================================
// Reddit Search
// ============================================
async function searchReddit(query) {
  const results = [];
  
  for (const subreddit of REDDIT_SUBREDDITS.slice(0, 3)) { // Limit for speed
    try {
      const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query + ' dupe')}&restrict_sr=1&limit=10&sort=relevance`;
      const { ok, data } = await fetchJSON(url);
      
      if (ok && data?.data?.children) {
        for (const post of data.data.children) {
          const p = post.data;
          if (p.score >= 5) {
            results.push({
              source: 'reddit',
              subreddit,
              title: p.title,
              score: p.score,
              url: `https://reddit.com${p.permalink}`
            });
          }
        }
      }
    } catch (e) {
      // Continue on error
    }
  }
  
  return results;
}

// ============================================
// YouTube Search (via Invidious)
// ============================================
async function searchYouTube(query) {
  const results = [];
  
  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      const url = `https://${instance}/api/v1/search?q=${encodeURIComponent(query + ' dupe')}&type=video`;
      const { ok, data } = await fetchJSON(url);
      
      if (ok && Array.isArray(data)) {
        for (const video of data.slice(0, 5)) {
          results.push({
            source: 'youtube',
            title: video.title,
            channel: video.author,
            views: video.viewCount,
            url: `https://youtube.com/watch?v=${video.videoId}`
          });
        }
        break; // Success, stop trying other instances
      }
    } catch (e) {
      // Try next instance
    }
  }
  
  return results;
}

// ============================================
// Google Suggestions
// ============================================
async function getGoogleSuggestions(query) {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query + ' dupe')}`;
    const { ok, data } = await fetchJSON(url);
    
    if (ok && Array.isArray(data) && data[1]) {
      return data[1].slice(0, 10);
    }
  } catch (e) {
    // Return empty on error
  }
  return [];
}

// ============================================
// Main Handler
// ============================================
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const query = req.query.q;
  
  if (!query || query.length < 2) {
    return res.status(400).json({ 
      error: 'Query parameter "q" is required (min 2 characters)' 
    });
  }
  
  console.log(`[Research API] Researching: "${query}"`);
  
  try {
    // Gather from all sources in parallel
    const [reddit, youtube, suggestions] = await Promise.all([
      searchReddit(query),
      searchYouTube(query),
      getGoogleSuggestions(query)
    ]);
    
    // Analyze for top mentioned products
    const allText = JSON.stringify([...reddit, ...youtube]).toLowerCase();
    const mentionedProducts = {};
    
    // Common product patterns
    const patterns = [
      /(\b[a-z]+(?:\s+[a-z]+){0,2})\s+(?:is\s+)?(?:a\s+)?(?:great|good|perfect|best)\s+dupe/gi,
      /(?:try|get|use)\s+(\b[a-z]+(?:\s+[a-z]+){0,2})\s+instead/gi,
      /(\b[a-z]+(?:\s+[a-z]+){0,2})\s+(?:works|smells|looks)\s+(?:just\s+)?like/gi
    ];
    
    for (const pattern of patterns) {
      const matches = allText.matchAll(pattern);
      for (const match of matches) {
        const product = match[1]?.trim();
        if (product && product.length > 3) {
          mentionedProducts[product] = (mentionedProducts[product] || 0) + 1;
        }
      }
    }
    
    const topMentions = Object.entries(mentionedProducts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, mentions: count }));
    
    return res.status(200).json({
      query,
      timestamp: new Date().toISOString(),
      summary: {
        redditPosts: reddit.length,
        youtubeVideos: youtube.length,
        suggestions: suggestions.length
      },
      topMentions,
      googleSuggestions: suggestions,
      sources: {
        reddit: reddit.slice(0, 10),
        youtube: youtube.slice(0, 5)
      },
      note: 'This is research data. Curate and verify before adding to the database.'
    });
    
  } catch (error) {
    console.error('[Research API] Error:', error);
    return res.status(500).json({ 
      error: 'Research failed', 
      message: error.message 
    });
  }
};
