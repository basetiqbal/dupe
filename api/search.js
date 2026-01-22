/**
 * THE DUPE EDIT — Real-Time Search API
 * Vercel Serverless Function
 * 
 * Fetches dupe information from multiple sources in real-time
 */

const https = require('https');

// Configuration
const CONFIG = {
  timeout: 5000, // 5 second timeout per source
  userAgent: 'TheDupeEdit/1.0 (https://thedupeedit.com)',
};

/**
 * Make HTTPS GET request with timeout
 */
function fetchURL(url, timeout = CONFIG.timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, timeout);

    const options = {
      headers: { 
        'User-Agent': CONFIG.userAgent,
        'Accept': 'application/json',
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        clearTimeout(timer);
        resolve({ status: res.statusCode, data });
      });
      res.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    }).on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

/**
 * Search YouTube via Invidious API - with fallback to search link
 */
async function searchYouTube(query) {
  const searchQuery = encodeURIComponent(`${query} dupe affordable alternative`);
  
  // Try multiple Invidious instances (updated list)
  const instances = [
    'https://inv.nadeko.net',
    'https://invidious.io.lol',
    'https://yewtu.be',
    'https://invidious.privacydev.net',
    'https://vid.puffyan.us',
  ];
  
  for (const instance of instances) {
    try {
      const url = `${instance}/api/v1/search?q=${searchQuery}&type=video&sort=relevance`;
      const response = await fetchURL(url, 2500);
      
      if (response.status === 200) {
        const results = JSON.parse(response.data);
        if (Array.isArray(results) && results.length > 0) {
          return {
            videos: results.slice(0, 5).map(video => ({
              platform: 'youtube',
              videoId: video.videoId,
              title: video.title,
              author: video.author,
              views: video.viewCount,
              thumbnail: video.videoThumbnails?.[4]?.url || video.videoThumbnails?.[0]?.url,
              url: `https://youtube.com/watch?v=${video.videoId}`,
              duration: video.lengthSeconds,
            })),
            searchUrl: `https://www.youtube.com/results?search_query=${searchQuery}`
          };
        }
      }
    } catch (e) {
      continue; // Try next instance
    }
  }
  
  // Return search URL even if API fails
  return {
    videos: [],
    searchUrl: `https://www.youtube.com/results?search_query=${searchQuery}`
  };
}

/**
 * Search Reddit for discussions - with fallback to search link
 */
async function searchReddit(query) {
  const searchQuery = encodeURIComponent(`${query} dupe`);
  
  const results = [];
  
  // Try global Reddit search first
  try {
    const url = `https://www.reddit.com/search.json?q=${searchQuery}&limit=10&sort=relevance&t=all`;
    const response = await fetchURL(url, 4000);
    
    if (response.status === 200) {
      const data = JSON.parse(response.data);
      const posts = data.data?.children || [];
      
      for (const post of posts) {
        if (post.data && post.data.score > 0) {
          results.push({
            platform: 'reddit',
            subreddit: post.data.subreddit,
            title: post.data.title,
            url: `https://reddit.com${post.data.permalink}`,
            score: post.data.score,
            comments: post.data.num_comments,
            created: new Date(post.data.created_utc * 1000).toISOString(),
          });
        }
      }
    }
  } catch (e) {
    console.log('[Reddit] Error:', e.message);
  }
  
  return {
    posts: results.sort((a, b) => b.score - a.score).slice(0, 5),
    searchUrl: `https://www.reddit.com/search/?q=${searchQuery}`
  };
}

/**
 * Get Google autocomplete suggestions
 */
async function getGoogleSuggestions(query) {
  const searches = [
    `${query} dupe`,
    `${query} affordable alternative`,
  ];
  
  const suggestions = new Set();
  
  for (const search of searches) {
    try {
      const q = encodeURIComponent(search);
      const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${q}`;
      const response = await fetchURL(url, 2000);
      
      if (response.status === 200) {
        const data = JSON.parse(response.data);
        const results = data[1] || [];
        results.slice(0, 5).forEach(s => suggestions.add(s));
      }
    } catch (e) {
      continue;
    }
  }
  
  return Array.from(suggestions).slice(0, 10);
}

/**
 * Generate TikTok search info (no API, just construct URLs)
 */
function getTikTokInfo(query) {
  const searchQuery = encodeURIComponent(`${query} dupe`);
  const hashtag = query.replace(/\s+/g, '').toLowerCase();
  
  return {
    platform: 'tiktok',
    searchUrl: `https://www.tiktok.com/search?q=${searchQuery}`,
    hashtags: [
      `#${hashtag}dupe`,
      '#beautydupe',
      '#makeupdupe',
      '#drugstoredupe',
    ],
  };
}

/**
 * Main handler
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { q: query } = req.query;
  
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Query parameter "q" is required (min 2 chars)' });
  }
  
  console.log(`[Search API] Query: "${query}"`);
  
  try {
    // Fetch from all sources in parallel
    const [youtube, reddit, suggestions] = await Promise.all([
      searchYouTube(query).catch(() => ({ videos: [], searchUrl: '' })),
      searchReddit(query).catch(() => ({ posts: [], searchUrl: '' })),
      getGoogleSuggestions(query).catch(() => []),
    ]);
    
    const tiktok = getTikTokInfo(query);
    
    const response = {
      query,
      timestamp: new Date().toISOString(),
      sources: {
        youtube: {
          found: youtube.videos.length > 0,
          count: youtube.videos.length,
          results: youtube.videos,
          searchUrl: youtube.searchUrl,
        },
        reddit: {
          found: reddit.posts.length > 0,
          count: reddit.posts.length,
          results: reddit.posts,
          searchUrl: reddit.searchUrl,
        },
        tiktok: {
          found: true,
          info: tiktok,
        },
        suggestions: {
          found: suggestions.length > 0,
          count: suggestions.length,
          results: suggestions,
        },
      },
    };
    
    console.log(`[Search API] Found: YT=${youtube.videos.length}, Reddit=${reddit.posts.length}, Suggestions=${suggestions.length}`);
    
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('[Search API] Error:', error);
    return res.status(500).json({ error: 'Search failed', message: error.message });
  }
};
