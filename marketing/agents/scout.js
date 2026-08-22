import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_DIR = path.join(__dirname, '..', 'config');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

const KEYWORDS_FILE = path.join(CONFIG_DIR, 'keywords.json');
const SEEN_POSTS_FILE = path.join(OUTPUT_DIR, 'seen_posts.json');
const RESULTS_FILE = path.join(OUTPUT_DIR, 'scout_results.json');

const SUBREDDITS = ['parenting', 'teachers', 'eventplanning', 'birthday', 'party', 'carnival', 'trinidadandtobago', 'caribbean', 'weddingplanning', 'kidsparties', 'Cooking'];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function ensureDirs() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(CONFIG_DIR, { recursive: true });
}

async function loadKeywords() {
  try {
    const data = await fs.readFile(KEYWORDS_FILE, 'utf-8');
    const keywordsConfig = JSON.parse(data);
    return keywordsConfig.reddit_queries || [
      ...(keywordsConfig.primary || []),
      ...(keywordsConfig.secondary || [])
    ];
  } catch (e) {
    console.warn('[Scout] Warning: keywords.json not found, using defaults.');
    return ['carnival planning', 'party planning', 'event planning', 'caribbean carnival'];
  }
}

async function loadSeenPosts() {
  try {
    const data = await fs.readFile(SEEN_POSTS_FILE, 'utf-8');
    return new Set(JSON.parse(data));
  } catch (e) {
    return new Set();
  }
}

async function saveSeenPosts(seenPosts) {
  await fs.writeFile(SEEN_POSTS_FILE, JSON.stringify(Array.from(seenPosts), null, 2));
}

// Parse basic XML RSS feed using regex (avoids external XML parser dependency)
function parseRedditRSS(xml) {
  const entries = [];
  const entryBlocks = xml.split('<entry>').slice(1); // Skip the header before first <entry>
  
  for (const block of entryBlocks) {
    const getTag = (tag) => {
      const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
      return match ? match[1].trim() : '';
    };
    
    const getLinkHref = () => {
      const match = block.match(/<link href="([^"]+)"/);
      return match ? match[1] : '';
    };
    
    const getAuthor = () => {
      const match = block.match(/<name>\/u\/([^<]+)<\/name>/);
      return match ? match[1] : '';
    };
    
    const title = getTag('title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    const link = getLinkHref();
    const updated = getTag('updated');
    const author = getAuthor();
    
    // Extract body from the HTML content
    const contentHtml = getTag('content');
    const bodyText = contentHtml
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      .replace(/<[^>]+>/g, ' ') // Strip HTML tags
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 500);
    
    // Extract subreddit from link
    const subredditMatch = link.match(/\/r\/([^/]+)\//);
    const subreddit = subredditMatch ? subredditMatch[1] : '';
    
    // Generate a stable ID from the URL
    const idMatch = link.match(/\/comments\/([^/]+)\//);
    const id = idMatch ? idMatch[1] : link.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
    
    if (title && link) {
      entries.push({
        id,
        title,
        body: bodyText,
        url: link,
        subreddit,
        author,
        timestamp: new Date(updated).getTime() / 1000 || Date.now() / 1000
      });
    }
  }
  
  return entries;
}

export async function runScout(isDryRun = false) {
  console.log(`[Scout] Starting Reddit RSS scan${isDryRun ? ' (DRY RUN)' : ''}...`);
  await ensureDirs();
  const keywords = await loadKeywords();
  const seenPosts = await loadSeenPosts();
  const results = [];

  const userAgent = 'carnival-planner-scout/1.0.0 (by u/carnival-planner)';
  const oneDayAgo = Date.now() / 1000 - 24 * 60 * 60;

  // Limit to first 8 keywords to keep rate-limited
  const searchKeywords = keywords.slice(0, 8);

  for (const query of searchKeywords) {
    console.log(`[Scout] Searching Reddit RSS for "${query}"`);
    const url = `https://www.reddit.com/search.rss?q=${encodeURIComponent(query)}&sort=new&limit=25&t=day`;
    
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': userAgent }
        });
        
        if (!response.ok) {
            console.error(`[Scout] Error fetching: ${response.status} ${response.statusText}`);
            continue;
        }
        
        const xml = await response.text();
        const entries = parseRedditRSS(xml);
        
        console.log(`[Scout]   → Found ${entries.length} entries`);
        
        for (const entry of entries) {
            // Optional: filter by known subreddits (loose — RSS search spans all subreddits)
            // if (entry.subreddit && !SUBREDDITS.includes(entry.subreddit.toLowerCase())) continue;
            
            if (entry.timestamp < oneDayAgo) continue; // recency check
            if (seenPosts.has(entry.id)) continue; // dedup
            
            results.push({
                id: entry.id,
                platform: 'reddit',
                subreddit: entry.subreddit,
                title: entry.title,
                body: entry.body,
                url: entry.url,
                score: 0, // RSS doesn't include scores
                commentCount: 0,
                timestamp: entry.timestamp,
                keywords_matched: [query]
            });
            
            seenPosts.add(entry.id);
        }
    } catch (e) {
        console.error(`[Scout] Fetch exception: ${e.message}`);
    }
    
    // Rate limit: 1 request per 4 seconds (Reddit is strict)
    await sleep(4000);
  }

  console.log(`[Scout] Found ${results.length} new relevant posts.`);
  
  if (!isDryRun) {
      await fs.writeFile(RESULTS_FILE, JSON.stringify(results, null, 2));
      await saveSeenPosts(seenPosts);
      console.log(`[Scout] Saved results to ${RESULTS_FILE}`);
  }
  
  return results;
}

if (process.argv[1] === __filename) {
  const isDryRun = process.argv.includes('--dry-run');
  runScout(isDryRun);
}
