/**
 * Vibe Engine — Server-Side AI Scoring
 * Generates 1-10 Vibe Scores for carnival events using Gemini Flash.
 * Signals: scraped event data, ticket scarcity, Soca Passport check-in velocity.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Generate Vibe Scores for all carnivals that have scraped events.
 * @param {FirebaseFirestore.Firestore} db - Firestore instance (squad-db)
 * @param {string} apiKey - Gemini API key
 * @returns {Object} - Summary of scores generated
 */
async function generateVibeScores(db, apiKey) {
    if (!apiKey) {
        console.log('Vibe Engine: No GEMINI_API_KEY configured, skipping vibe scoring.');
        return { scored: 0, error: 'No API key' };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    console.log('Vibe Engine: Starting score generation...');

    // 1. Get all carnival event documents
    const carnivalEventsSnap = await db.collection('carnivalEvents').get();
    if (carnivalEventsSnap.empty) {
        console.log('Vibe Engine: No carnival events found.');
        return { scored: 0 };
    }

    // 2. Get Soca Passport check-in data for crowd signals
    const checkinData = await getRecentCheckins(db);

    let totalScored = 0;

    for (const doc of carnivalEventsSnap.docs) {
        const carnivalId = doc.id;
        const data = doc.data();
        const events = data.events || [];

        if (events.length === 0) continue;

        try {
            // 3. Build context for AI scoring
            const eventSummaries = events.slice(0, 20).map(evt => {
                const checkins = checkinData[evt.id] || 0;
                const priceText = evt.price || 'unknown';
                const soldOutHint = (priceText.toLowerCase().includes('sold out') || priceText.toLowerCase().includes('limited'))
                    ? ' [SOLD OUT / LIMITED]'
                    : '';

                return `- "${evt.title}" | Date: ${evt.date || 'TBD'} | Venue: ${evt.venue || 'TBD'} | Price: ${priceText}${soldOutHint} | Check-ins: ${checkins} | Source: ${evt.source}`;
            }).join('\n');

            const prompt = `You are the Vibe Engine for a Caribbean Carnival Planner app. Analyze these events for "${carnivalId}" carnival and assign each a Vibe Score from 1-10.

Scoring criteria:
- 8-10: Sold out / limited tickets, high check-in count, legendary promoter, must-attend
- 5-7: Popular event, good venue, moderate interest
- 3-4: Average event, generic or unknown promoter
- 1-2: Low interest, no check-ins, unclear details

Events:
${eventSummaries}

Return ONLY a valid JSON array, no markdown, no code blocks. Each item must have:
- "eventId": the event title (exact match from above)
- "score": integer 1-10
- "reason": one short sentence explaining the score

Example: [{"eventId":"Soca Brainwash","score":9,"reason":"Legendary fete, always sells out early."}]`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            // Parse the AI response
            let scores = [];
            try {
                // Clean any markdown wrapping
                const cleaned = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
                scores = JSON.parse(cleaned);
            } catch (parseErr) {
                console.log(`Vibe Engine: Failed to parse AI response for ${carnivalId}: ${parseErr.message}`);
                // Fallback: assign default scores based on available signals
                scores = events.slice(0, 20).map(evt => {
                    const checkins = checkinData[evt.id] || 0;
                    const hasSoldOut = (evt.price || '').toLowerCase().includes('sold out');
                    const baseScore = hasSoldOut ? 8 : (checkins > 5 ? 7 : (checkins > 0 ? 5 : 4));
                    return {
                        eventId: evt.title,
                        score: baseScore,
                        reason: 'Score estimated from available data signals.',
                    };
                });
            }

            // 4. Map scores back to event IDs and write to Firestore
            const scoredEvents = events.slice(0, 20).map(evt => {
                const aiScore = scores.find(s =>
                    s.eventId === evt.title ||
                    s.eventId === evt.id
                );
                const checkins = checkinData[evt.id] || 0;

                return {
                    eventId: evt.id,
                    title: evt.title,
                    score: aiScore ? Math.min(10, Math.max(1, parseInt(aiScore.score) || 5)) : 5,
                    reason: aiScore?.reason || 'No AI score available.',
                    checkins,
                    venue: evt.venue || null,
                    date: evt.date || null,
                    time: evt.time || null,
                    url: evt.url || null,
                    image: evt.image || null,
                    source: evt.source || null,
                    updatedAt: new Date().toISOString(),
                };
            });

            // 5. Write to vibeScores/{carnivalId}
            await db.collection('vibeScores').doc(carnivalId).set({
                carnivalId,
                scores: scoredEvents,
                generatedAt: new Date().toISOString(),
                eventCount: scoredEvents.length,
                avgScore: scoredEvents.length > 0
                    ? Math.round((scoredEvents.reduce((sum, s) => sum + s.score, 0) / scoredEvents.length) * 10) / 10
                    : 0,
            });

            totalScored += scoredEvents.length;
            console.log(`Vibe Engine: Scored ${scoredEvents.length} events for ${carnivalId} (avg: ${(scoredEvents.reduce((s, e) => s + e.score, 0) / scoredEvents.length).toFixed(1)})`);

        } catch (err) {
            console.error(`Vibe Engine: Error scoring ${carnivalId}: ${err.message}`);
        }
    }

    console.log(`Vibe Engine: Completed. Total events scored: ${totalScored}`);
    return { scored: totalScored };
}

/**
 * Get recent Soca Passport check-ins aggregated by event.
 * Returns a map of eventId -> check-in count.
 */
async function getRecentCheckins(db) {
    const checkinMap = {};

    try {
        // Query recent check-ins (last 24 hours)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const checkinsSnap = await db.collection('passportCheckins')
            .where('checkedInAt', '>=', oneDayAgo)
            .limit(500)
            .get();

        checkinsSnap.forEach(doc => {
            const data = doc.data();
            const eventId = data.eventId;
            if (eventId) {
                checkinMap[eventId] = (checkinMap[eventId] || 0) + 1;
            }
        });

        console.log(`Vibe Engine: Found ${Object.keys(checkinMap).length} events with recent check-ins`);
    } catch (err) {
        // passportCheckins collection might not exist yet — that's fine
        console.log(`Vibe Engine: Check-in query note: ${err.message}`);
    }

    return checkinMap;
}

module.exports = { generateVibeScores };
