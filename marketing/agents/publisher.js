import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const DRAFTS_FILE = path.join(OUTPUT_DIR, 'drafts.json');
const LOG_FILE = path.join(OUTPUT_DIR, 'activity_log.json');
const STAGING_DIR = path.join(OUTPUT_DIR, 'staged');

export async function runPublisher(autoStage = false, isDryRun = false) {
    console.log(`[Publisher] Starting Staging Pipeline${isDryRun ? ' (DRY RUN)' : ''}...`);
    
    await fs.mkdir(STAGING_DIR, { recursive: true });
    
    let drafts = [];
    try {
        drafts = JSON.parse(await fs.readFile(DRAFTS_FILE, 'utf-8'));
    } catch (e) {
        console.log(`[Publisher] No drafts found or error reading: ${e.message}`);
        return;
    }
    
    if (drafts.length === 0) {
        console.log(`[Publisher] No drafts to process.`);
        return;
    }
    
    let rl;
    if (!autoStage) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));
    const activityLog = [];
    
    for (let i = 0; i < drafts.length; i++) {
        const draft = drafts[i];
        console.log(`\n--- Draft ${i + 1}/${drafts.length} ---`);
        console.log(`Platform: ${draft.platform}`);
        console.log(`Target URL: ${draft.targetUrl}`);
        console.log(`Confidence: ${draft.confidence}`);
        console.log(`Reply:\n${draft.draftReply}\n-----------------------`);
        
        let decision = 'A';
        if (!autoStage) {
            let valid = false;
            while (!valid) {
                const answer = (await askQuestion(`[A]pprove / [E]dit / [S]kip ? `)).toUpperCase();
                if (['A', 'E', 'S'].includes(answer)) {
                    decision = answer;
                    valid = true;
                }
            }
            if (decision === 'E') {
                const newReply = await askQuestion(`Enter new reply: `);
                draft.draftReply = newReply;
                decision = 'A'; // Auto approve after edit
            }
        }
        
        if (decision === 'A') {
            if (!isDryRun) {
                const stageFile = path.join(STAGING_DIR, `${Date.now()}_${draft.originalPost?.id || i}.json`);
                await fs.writeFile(stageFile, JSON.stringify(draft, null, 2));
                // Optional mobile notification to Telegram bot
                await dispatchTelegramApproval(draft);
            }
            console.log(`[Publisher] Draft Approved & Staged.`);
            activityLog.push({ action: 'APPROVED', draft, timestamp: new Date().toISOString() });
        } else {
            console.log(`[Publisher] Draft Skipped.`);
            activityLog.push({ action: 'SKIPPED', draft, timestamp: new Date().toISOString() });
        }
    }

async function dispatchTelegramApproval(draft) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return false;
    
    try {
        const text = `📢 *[Marketing Swarm] New Draft Staged*\n\n*Platform:* ${draft.platform || 'Reddit/Web'}\n*Confidence:* ${draft.confidence || 'N/A'}\n*Target:* ${draft.targetUrl || '#'}\n\n*Draft Reply:*\n${(draft.draftReply || '').slice(0, 350)}...`;
        const reply_markup = {
            inline_keyboard: [
                ...(draft.targetUrl ? [[{ text: "🔗 View Target Post", url: draft.targetUrl }]] : []),
                [
                    { text: "🌐 Open Carnival Planner", url: "https://carnival-planner.web.app" }
                ]
            ]
        };
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: 'Markdown',
                reply_markup
            })
        });
        console.log(`[Publisher] Telegram notification sent for draft.`);
        return true;
    } catch (e) {
        console.warn(`[Publisher] Telegram alert failed: ${e.message}`);
        return false;
    }
}
    
    if (rl) rl.close();
    
    if (!isDryRun) {
        let existingLog = [];
        try { existingLog = JSON.parse(await fs.readFile(LOG_FILE, 'utf-8')); } catch (e) {}
        await fs.writeFile(LOG_FILE, JSON.stringify([...existingLog, ...activityLog], null, 2));
        
        await fs.writeFile(DRAFTS_FILE, '[]'); // Clear processed drafts
    }
    
    console.log(`[Publisher] Pipeline completed.`);
}

if (process.argv[1] === __filename) {
    const autoStage = process.argv.includes('--auto-stage');
    const isDryRun = process.argv.includes('--dry-run');
    runPublisher(autoStage, isDryRun);
}
