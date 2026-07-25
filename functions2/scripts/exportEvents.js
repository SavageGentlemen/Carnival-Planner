const fs = require('fs');
const path = require('path');

async function exportEvents() {
    try {
        console.log("Fetching fete directory from live CaribPulse AI export endpoint...");
        
        const EXPORT_SECRET = "CCP-Video-Export-Token-2026-Secure";
        const url = `https://us-central1-carnival-planner.cloudfunctions.net/publicEventsExport?key=${EXPORT_SECRET}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${await response.text()}`);
        }
        
        const allEvents = await response.json();
        console.log(`Successfully fetched ${allEvents.length} events from cloud directory.`);

        // Save events to root directory
        const outputPath = path.join(__dirname, '../../events.json');
        fs.writeFileSync(outputPath, JSON.stringify(allEvents, null, 2), 'utf-8');
        console.log(`Successfully exported events to ${outputPath}`);
    } catch (err) {
        console.error("Failed to export events:", err);
        process.exit(1);
    }
}

exportEvents();
