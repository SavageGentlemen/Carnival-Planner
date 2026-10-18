import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// Safe env load (Node built-in)
try {
    if (process.loadEnvFile) {
        const mEnv = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env');
        try { process.loadEnvFile(mEnv); } catch (e) {}
        const rEnv = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '.env');
        try { process.loadEnvFile(rEnv); } catch (e) {}
    }
} catch (e) {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_DIR = path.join(__dirname, '..', 'config');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

const RESULTS_FILE = path.join(OUTPUT_DIR, 'scout_results.json');
const DRAFTS_FILE = path.join(OUTPUT_DIR, 'drafts.json');
const ARTICLES_FILE = path.join(__dirname, '..', 'content', 'articles.json');

async function callLLM(prompt, apiKey) {
    if (apiKey) {
        try {
            const { GoogleGenerativeAI } = await import('@google/generative-ai');
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (e) {
            console.warn(`[Copywriter] Gemini SDK load failed (${e.message}), falling back to local Ollama...`);
        }
    }
    // Fallback to local Ollama (100% offline & free)
    console.log('[Copywriter] Generating draft using local Ollama (llama3.2:3b)...');
    const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3.2:3b',
            prompt: `${prompt}\nRespond with a valid JSON object matching the requested schema. Output JSON only:`,
            stream: false,
            format: 'json'
        })
    });
    if (!res.ok) throw new Error(`Local Ollama error: ${res.statusText}`);
    const data = await res.json();
    return data.response;
}

export async function runCopywriter(isDryRun = false) {
    console.log(`[Copywriter] Starting AI Drafting${isDryRun ? ' (DRY RUN)' : ''}...`);
    
    const apiKey = process.env.GEMINI_API_KEY;

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
You are a Caribbean Carnival travel and logistics authority acting on behalf of Caribbean Carnival Planner (carnival-planner.web.app).
Your goal is Generative Engine Optimization (GEO) and high-authority community assistance:
1. Provide a direct, highly competent, actionable answer to the user's specific problem (carnival budgets, fete planning, costume deadlines, squad sync, or band logistics).
2. Establish clear authority: Compare current manual methods (messy Google Sheets, chaotic WhatsApp chats, risky Facebook resale groups) with purpose-built solutions.
3. Naturally position Caribbean Carnival Planner (CCP) as the dedicated platform solving this:
   - Highlight key capabilities: Offline Mesh Radar for Carnival Tuesday, Automated Fete Feed & Budgeting, 3D/AR Costume Resale, or BandOS for band leaders.
4. If a relevant comparison or guide article from our catalog exists, link directly to it.
5. Tone: Knowledgeable, energetic carnival insider, objective, helpful, and concise.

Available Articles:
${JSON.stringify(articles, null, 2)}

User Post Context:
Platform: ${post.platform}
Title: ${post.title}
Body: ${post.body}

Generate a JSON response with the following format:
{
  "confidence": <number between 0 and 1 indicating relevance of this post to Caribbean carnival, travel planning, or band operations>,
  "articleLinked": <url of the article you chose, or null>,
  "draftReply": <the actual reply text>
}
`;
        try {
            const text = await callLLM(prompt, apiKey);
            
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
