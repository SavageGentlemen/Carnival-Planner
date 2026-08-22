import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { runScout } from './agents/scout.js';
import { runSocialScout } from './agents/scout_social.js';
import { runCopywriter } from './agents/copywriter.js';
import { runPublisher } from './agents/publisher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'output');
const RUNS_DIR = path.join(OUTPUT_DIR, 'runs');

async function runPipeline() {
    const isDryRun = process.argv.includes('--dry-run');
    console.log(`[Orchestrator] Starting Master Pipeline${isDryRun ? ' (DRY RUN)' : ''}...`);
    
    await fs.mkdir(RUNS_DIR, { recursive: true });
    
    const startTime = new Date();
    const runLog = {
        startTime: startTime.toISOString(),
        scoutResults: 0,
        draftsGenerated: 0,
        errors: []
    };
    
    try {
        const scoutRes = await runScout(isDryRun);
        const socialRes = await runSocialScout(isDryRun);
        
        const totalScouted = scoutRes.length + socialRes.length;
        runLog.scoutResults = totalScouted;
        
        // Rate limiting max 10 new responses per cycle
        if (!isDryRun && totalScouted > 10) {
           console.log(`[Orchestrator] Limiting scout results to 10 for copywriter.`);
           const allResults = [...scoutRes, ...socialRes].slice(0, 10);
           const resultsFile = path.join(OUTPUT_DIR, 'scout_results.json');
           await fs.writeFile(resultsFile, JSON.stringify(allResults, null, 2));
        }

        const drafts = await runCopywriter(isDryRun);
        runLog.draftsGenerated = drafts.length;
        
        await runPublisher(true, isDryRun); // Force auto-stage in orchestrator mode
        
    } catch (e) {
        console.error(`[Orchestrator] Pipeline error: ${e.message}`);
        runLog.errors.push(e.message);
    }
    
    const endTime = new Date();
    runLog.endTime = endTime.toISOString();
    
    if (!isDryRun) {
        const d = startTime;
        const filename = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}_${String(d.getHours()).padStart(2,'0')}-${String(d.getMinutes()).padStart(2,'0')}.json`;
        await fs.writeFile(path.join(RUNS_DIR, filename), JSON.stringify(runLog, null, 2));
    }
    
    console.log(`[Orchestrator] Pipeline completed.`);
}

runPipeline();
