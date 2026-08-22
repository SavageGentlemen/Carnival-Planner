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
                const stageFile = path.join(STAGING_DIR, `${Date.now()}_${draft.originalPost.id}.json`);
                await fs.writeFile(stageFile, JSON.stringify(draft, null, 2));
            }
            console.log(`[Publisher] Draft Approved & Staged.`);
            activityLog.push({ action: 'APPROVED', draft, timestamp: new Date().toISOString() });
        } else {
            console.log(`[Publisher] Draft Skipped.`);
            activityLog.push({ action: 'SKIPPED', draft, timestamp: new Date().toISOString() });
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
