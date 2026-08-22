import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load .env from marketing dir first, then project root as fallback
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env') });
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_DIR = path.join(__dirname, '..', 'config');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

const RESULTS_FILE = path.join(OUTPUT_DIR, 'scout_results.json');
const DRAFTS_FILE = path.join(OUTPUT_DIR, 'drafts.json');
const ARTICLES_FILE = path.join(__dirname, '..', 'content', 'articles.json');

export async function runCopywriter(isDryRun = false) {
    console.log(`[Copywriter] Starting AI Drafting${isDryRun ? ' (DRY RUN)' : ''}...`);
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error(`[Copywriter] Error: GEMINI_API_KEY not found in environment.`);
        return [];
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let posts = [];
    try {
        posts = JSON.parse(await fs.readFile(RESULTS_FILE, 'utf-8'));
    } catch (e) {
        console.log(`[Copywriter] No scout results found or error reading: ${e.message}`);
        return [];
    }

    let articles = [];
    try {
        articles = JSON.parse(await fs.readFile(ARTICLES_FILE, 'utf-8'));
    } catch (e) {
        console.warn(`[Copywriter] Warning: articles.json not found, using dummy articles.`);
        articles = [{ title: 'Ultimate Carnival Planning Guide', url: 'https://carnival-planner.com/guide' }];
    }

    const drafts = [];

    for (const post of posts) {
        console.log(`[Copywriter] Processing post: ${post.id}`);
        
        const prompt = `
You are a helpful event planning expert acting on behalf of carnival-planner.com.
Follow the 80/20 rule strictly:
- 80% of your response MUST be genuinely helpful, detailed advice answering the person's question based on their post.
- 20% should naturally mention carnival-planner.com and include a relevant article link, without being pushy.
Also include the Amazon affiliate tag (vivalmap-20) if you recommend any Amazon products.

Available Articles:
${JSON.stringify(articles, null, 2)}

User Post Context:
Platform: ${post.platform}
Title: ${post.title}
Body: ${post.body}

Generate a JSON response with the following format:
{
  "confidence": <number between 0 and 1 indicating relevance of this post to our site>,
  "articleLinked": <url of the article you chose, or null>,
  "draftReply": <the actual reply text>
}
`;
        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            
            const match = text.match(/\{[\s\S]*\}/);
            if (!match) throw new Error("Failed to parse JSON from AI response.");
            
            const aiData = JSON.parse(match[0]);
            
            if (aiData.confidence < 0.5) {
                console.log(`[Copywriter] Skipping post ${post.id} due to low confidence (${aiData.confidence})`);
                continue;
            }
            
            drafts.push({
                originalPost: post,
                draftReply: aiData.draftReply,
                targetUrl: post.url,
                platform: post.platform,
                confidence: aiData.confidence,
                articleLinked: aiData.articleLinked
            });
            console.log(`[Copywriter] Draft created for ${post.id} with confidence ${aiData.confidence}`);
            
        } catch (e) {
            console.error(`[Copywriter] Error generating draft for ${post.id}: ${e.message}`);
        }
    }
    
    console.log(`[Copywriter] Generated ${drafts.length} drafts.`);
    
    if (!isDryRun) {
        await fs.writeFile(DRAFTS_FILE, JSON.stringify(drafts, null, 2));
        await fs.writeFile(RESULTS_FILE, '[]'); // Clear scout results
        console.log(`[Copywriter] Saved drafts to ${DRAFTS_FILE}`);
    }
    
    return drafts;
}

if (process.argv[1] === __filename) {
    const isDryRun = process.argv.includes('--dry-run');
    runCopywriter(isDryRun);
}
