/**
 * Caribbean Carnival Event Scraper (Node.js)
 * Port of scraper.py — scrapes fetelist.com, frontlineticketing.com,
 * islandetickets.com, ticketfederation.com, and trinijunglejuice.com
 * then stores categorized events in Firebase Firestore.
 */

const cheerio = require('cheerio');
const crypto = require('crypto');

const RATE_LIMIT_DELAY = 2000; // ms
const USER_AGENT = 'CarnivalPlannerBot/1.0 (https://carnival-planner.web.app; contact@carnival-planner.web.app)';

const CARNIVAL_SEARCH_TERMS = {
    'trinidad': ['trinidad', 'trini', 'port of spain'],
    'jamaica': ['jamaica', 'kingston', 'montego bay'],
    'barbados': ['barbados', 'crop over', 'bridgetown'],
    'antigua': ['antigua', 'antigua carnival'],
    'stlucia': ['st lucia', 'saint lucia', 'st. lucia'],
    'grenada': ['grenada', 'spicemas', 'spice mas'],
    'bahamas': ['bahamas', 'nassau'],
    'bermuda': ['bermuda'],
    'miami': ['miami', 'miami carnival'],
    'ny-labor-day': ['brooklyn', 'new york carnival', 'labor day', 'eastern parkway'],
    'toronto': ['toronto', 'caribana'],
    'vincymas': ['vincy', 'st vincent', 'saint vincent'],
    'tobago': ['tobago'],
    'stkitts-sugar-mas': ['st kitts', 'saint kitts', 'sugar mas'],
    'stmaarten': ['st maarten', 'saint maarten', 'sint maarten'],
    'dominica': ['dominica', 'mas domnik'],
    'guyana': ['guyana', 'mashramani'],
    'stthomas': ['st thomas', 'saint thomas', 'usvi'],
    'stcroix': ['st croix', 'saint croix'],
    'nevis': ['nevis', 'culturama'],
    'hollywood': ['hollywood carnival', 'hollywood florida'],
    'tampa': ['tampa', 'tampa bay carnival'],
    'caymas': ['caymas', 'austin'],
    'cayman-batabano': ['cayman', 'batabano'],
    'japan': ['japan caribbean', 'tokyo carnival'],
};

// --- Utility functions ---

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPage(url) {
    try {
        await sleep(RATE_LIMIT_DELAY);
        const response = await fetch(url, {
            headers: { 'User-Agent': USER_AGENT },
            signal: AbortSignal.timeout(30000),
        });
        if (!response.ok) {
            console.log(`HTTP ${response.status} for ${url}`);
            return null;
        }
        return await response.text();
    } catch (err) {
        console.log(`Error fetching ${url}: ${err.message}`);
        return null;
    }
}

function parseDate(dateStr) {
    if (!dateStr) return { date: null, time: null };
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return { date: null, time: null };
        const date = d.toISOString().split('T')[0]; // YYYY-MM-DD
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const time = (hours !== 0 || minutes !== 0)
            ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
            : null;
        return { date, time };
    } catch {
        return { date: null, time: null };
    }
}

function categorizeEvent(event) {
    const text = `${event.title || ''} ${event.venue || ''}`.toLowerCase();
    for (const [carnivalId, terms] of Object.entries(CARNIVAL_SEARCH_TERMS)) {
        for (const term of terms) {
            if (text.includes(term.toLowerCase())) return carnivalId;
        }
    }
    return null;
}

function generateEventId(event) {
    const str = `${event.title || ''}-${event.date || ''}-${event.source || ''}`;
    return crypto.createHash('md5').update(str).digest('hex').slice(0, 16);
}

function resolveUrl(base, path) {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    try {
        return new URL(path, base).href;
    } catch {
        return null;
    }
}

// --- Scraper: fetelist.com ---

async function scrapeFetelist() {
    const events = [];
    const baseUrl = 'https://fetelist.com';
    const eventsUrl = `${baseUrl}/events`;

    console.log('Scraping fetelist.com...');
    const html = await fetchPage(eventsUrl);
    if (!html) return events;

    const $ = cheerio.load(html);

    let cards = $('.event-card, .event-item, article.event, .fete-card, [data-event]');
    if (cards.length === 0) {
        cards = $('article, div').filter(function () {
            const cls = ($(this).attr('class') || '').toLowerCase();
            return cls.includes('event') || cls.includes('fete') || cls.includes('party');
        });
    }

    cards.slice(0, 50).each(function () {
        try {
            const card = $(this);
            const titleEl = card.find('h2, h3, h4, .event-title, .title, a[href*="event"]').first();
            const title = titleEl.text().trim();
            if (!title) return;

            const linkEl = card.find('a[href]').first();
            const link = linkEl.length ? resolveUrl(baseUrl, linkEl.attr('href')) : null;

            const dateEl = card.find('.date, .event-date, time, [datetime]').first();
            const dateStr = dateEl.length ? (dateEl.attr('datetime') || dateEl.text().trim()) : null;

            const venueEl = card.find('.venue, .location, .event-location, address').first();
            const venue = venueEl.length ? venueEl.text().trim() : null;

            const priceEl = card.find('.price, .ticket-price, .cost').first();
            const price = priceEl.length ? priceEl.text().trim() : null;

            const imgEl = card.find('img').first();
            const image = imgEl.length ? resolveUrl(baseUrl, imgEl.attr('src')) : null;

            const event = {
                title, url: link, date_raw: dateStr, venue, price, image,
                source: 'fetelist.com',
                scraped_at: new Date().toISOString(),
            };

            const parsed = parseDate(dateStr);
            if (parsed.date) event.date = parsed.date;
            if (parsed.time) event.time = parsed.time;

            events.push(event);
        } catch (err) {
            console.log(`Error parsing fetelist event: ${err.message}`);
        }
    });

    console.log(`Found ${events.length} events from fetelist.com`);
    return events;
}

// --- Scraper: frontlineticketing.com ---

async function scrapeFrontlineTicketing() {
    const events = [];
    const baseUrl = 'https://frontlineticketing.com';
    const searchUrls = [`${baseUrl}/events`, `${baseUrl}/caribbean`, `${baseUrl}/carnival`];

    console.log('Scraping frontlineticketing.com...');

    for (const url of searchUrls) {
        const html = await fetchPage(url);
        if (!html) continue;

        const $ = cheerio.load(html);
        const cards = $('.event, .event-card, .ticket-event, article, .product-item');

        cards.slice(0, 30).each(function () {
            try {
                const card = $(this);
                const titleEl = card.find('h2, h3, h4, .event-name, .title, a').first();
                const title = titleEl.text().trim();
                if (!title) return;

                const linkEl = card.find('a[href]').first();
                const link = linkEl.length ? resolveUrl(baseUrl, linkEl.attr('href')) : null;

                const dateEl = card.find('.date, .event-date, time, [datetime], .when').first();
                const dateStr = dateEl.length ? (dateEl.attr('datetime') || dateEl.text().trim()) : null;

                const venueEl = card.find('.venue, .location, address, .where').first();
                const venue = venueEl.length ? venueEl.text().trim() : null;

                const priceEl = card.find('.price, .ticket-price, .amount').first();
                const price = priceEl.length ? priceEl.text().trim() : null;

                const imgEl = card.find('img').first();
                const image = imgEl.length ? resolveUrl(baseUrl, imgEl.attr('src')) : null;

                const event = {
                    title, url: link, date_raw: dateStr, venue, price, image,
                    source: 'frontlineticketing.com',
                    scraped_at: new Date().toISOString(),
                };

                const parsed = parseDate(dateStr);
                if (parsed.date) event.date = parsed.date;
                if (parsed.time) event.time = parsed.time;

                events.push(event);
            } catch (err) {
                console.log(`Error parsing frontline event: ${err.message}`);
            }
        });
    }

    console.log(`Found ${events.length} events from frontlineticketing.com`);
    return events;
}

// --- Scraper: islandetickets.com ---

async function scrapeIslandeTickets() {
    const events = [];
    const baseUrl = 'https://islandetickets.com';

    console.log('Scraping islandetickets.com...');
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    const monthPattern = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}$/;
    let currentMonthYear = null;

    $('h5, a').each(function () {
        const el = $(this);
        const tagName = this.tagName.toLowerCase();

        if (tagName === 'h5') {
            const text = el.text().trim();
            if (monthPattern.test(text)) currentMonthYear = text;
            return;
        }

        if (tagName === 'a') {
            const href = el.attr('href') || '';
            if (!href.includes('/event/')) return;

            try {
                const linkText = el.text().trim();
                if (linkText.length < 10) return;

                const eventUrl = resolveUrl(baseUrl, href);

                // Extract title
                const boldEl = el.find('strong, b').first();
                let title = boldEl.length ? boldEl.text().trim() : null;

                if (!title) {
                    const lines = linkText.split('\n').map(l => l.trim()).filter(l => l);
                    for (const line of lines) {
                        if (line.length <= 5) continue;
                        if (/^\d+(st|nd|rd|th)$/.test(line)) continue;
                        if (/^\d+:\d+[ap]m/i.test(line)) continue;
                        if (line.startsWith('Hosted by')) continue;
                        if (line.startsWith('@')) continue;
                        if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/.test(line)) continue;
                        title = line;
                        break;
                    }
                }

                if (!title || title.length < 3) return;

                // Venue
                const venueMatch = linkText.match(/@\s*([^@\n]+?)(?:\s*\d+:\d+|$)/);
                const venue = venueMatch ? venueMatch[1].trim() : null;

                // Time
                const timeMatch = linkText.match(/(\d{1,2}:\d{2}[ap]m)\s*-\s*(\d{1,2}:\d{2}[ap]m)/i);
                const timeStr = timeMatch ? `${timeMatch[1]} - ${timeMatch[2]}` : null;

                // Date
                let dateStr = null;
                const dayMatch = linkText.match(/(\d{1,2})(st|nd|rd|th)/);
                if (dayMatch && currentMonthYear) {
                    dateStr = `${dayMatch[1]} ${currentMonthYear}`;
                }

                // Image
                const imgEl = el.find('img').first();
                let image = imgEl.length ? imgEl.attr('src') : null;
                if (image && !image.startsWith('http')) image = resolveUrl(baseUrl, image);

                // Host
                const hostMatch = linkText.match(/Hosted by\s+([^\n@]+)/);
                const host = hostMatch ? hostMatch[1].trim() : null;

                const event = {
                    title, url: eventUrl, date_raw: dateStr, venue, host,
                    time: timeStr, image,
                    source: 'islandetickets.com',
                    scraped_at: new Date().toISOString(),
                };

                if (dateStr) {
                    const parsed = parseDate(dateStr);
                    if (parsed.date) event.date = parsed.date;
                }

                events.push(event);
            } catch (err) {
                console.log(`Error parsing islandetickets event: ${err.message}`);
            }
        }
    });

    // Deduplicate by URL
    const seen = new Set();
    const unique = events.filter(e => {
        if (seen.has(e.url)) return false;
        seen.add(e.url);
        return true;
    });

    console.log(`Found ${unique.length} events from islandetickets.com`);
    return unique;
}

// --- Scraper: ticketfederation.com ---

async function scrapeTicketFederation() {
    const events = [];
    const baseUrl = 'https://www.ticketfederation.com';
    const eventsUrl = `${baseUrl}/upcoming-events/`;

    console.log('Scraping ticketfederation.com...');
    const html = await fetchPage(eventsUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    const cards = $('.eventon_list_event');

    cards.slice(0, 50).each(function () {
        try {
            const card = $(this);
            const titleEl = card.find('.evcal_event_title').first();
            const title = titleEl.text().trim();
            if (!title) return;

            // Link from schema or data attribute
            let link = null;
            const schemaLink = card.find('.evo_event_schema a[itemprop="url"]').first();
            if (schemaLink.length) {
                link = schemaLink.attr('href');
            } else {
                link = card.attr('data-exurl');
            }
            if (link && !link.startsWith('http')) link = resolveUrl(baseUrl, link);

            // Date from EventOn plugin
            const dayEl = card.find('.evo_start .date').first();
            const monthEl = card.find('.evo_start .month').first();
            let dateStr = null;

            if (dayEl.length && monthEl.length) {
                dateStr = `${dayEl.text().trim()} ${monthEl.text().trim()}`;
            } else {
                const dayblock = card.find('.evoet_dayblock').first();
                if (dayblock.length) {
                    const smon = dayblock.attr('data-smon');
                    const syr = dayblock.attr('data-syr');
                    const dayNum = card.find('.evo_start .date').first();
                    const dayStr = dayNum.length ? dayNum.text().trim() : '01';
                    dateStr = `${dayStr} ${smon} ${syr}`;
                }
            }

            // Venue
            const venueEl = card.find('.evcal_location').first();
            const venue = venueEl.length
                ? (venueEl.attr('data-name') || venueEl.text().trim())
                : null;

            // Image
            const imgEl = card.find('.ev_ftImg').first();
            const image = imgEl.length ? imgEl.attr('data-img') : null;

            const event = {
                title, url: link, date_raw: dateStr, venue, image,
                source: 'ticketfederation.com',
                scraped_at: new Date().toISOString(),
            };

            if (dateStr) {
                // Append current year if missing
                let parseable = dateStr;
                const currYear = new Date().getFullYear();
                if (!parseable.includes(String(currYear))) {
                    parseable += ` ${currYear}`;
                }
                const parsed = parseDate(parseable);
                if (parsed.date) event.date = parsed.date;
            }

            events.push(event);
        } catch (err) {
            console.log(`Error parsing ticketfederation event: ${err.message}`);
        }
    });

    console.log(`Found ${events.length} events from ticketfederation.com`);
    return events;
}

// --- Scraper: trinijunglejuice.com (API) ---

async function scrapeTriniJungleJuice() {
    const events = [];
    const apiUrl = 'https://staging.trinijunglejuice.com/api/events?page=1&items=50&type=all&orderDirection=asc&timestamped=true';

    console.log('Scraping trinijunglejuice.com (via API)...');

    try {
        await sleep(RATE_LIMIT_DELAY);
        const response = await fetch(apiUrl, {
            headers: { 'User-Agent': USER_AGENT },
            signal: AbortSignal.timeout(30000),
        });
        if (!response.ok) {
            console.log(`TJJ API returned ${response.status}`);
            return events;
        }

        const data = await response.json();
        const groups = data.events || [];

        for (const group of groups) {
            for (const item of (group.events || [])) {
                try {
                    const title = item.title;
                    if (!title) continue;

                    const link = item.registration_url || `https://trinijunglejuice.com/events/${item.id}`;
                    const startDt = item.start_datetime;
                    const venueData = item.location || {};
                    const venue = venueData.address || venueData.city || null;

                    const event = {
                        title, url: link,
                        date_raw: item.timestamp || startDt,
                        venue,
                        image: item.poster_url || null,
                        lat: venueData.latitude ? parseFloat(venueData.latitude) : null,
                        lng: venueData.longitude ? parseFloat(venueData.longitude) : null,
                        source: 'trinijunglejuice.com',
                        scraped_at: new Date().toISOString(),
                    };

                    if (startDt) {
                        const parsed = parseDate(startDt);
                        if (parsed.date) event.date = parsed.date;
                        if (parsed.time) event.time = parsed.time;
                    }

                    events.push(event);
                } catch (err) {
                    console.log(`Error parsing TJJ event item: ${err.message}`);
                }
            }
        }
    } catch (err) {
        console.log(`Error fetching/parsing TJJ API: ${err.message}`);
    }

    console.log(`Found ${events.length} events from trinijunglejuice.com`);
    return events;
}

// --- Save to Firestore ---

async function saveToFirebase(events, db) {
    const categorized = {};

    for (const event of events) {
        const carnivalId = categorizeEvent(event);
        if (carnivalId) {
            event.id = generateEventId(event);
            if (!categorized[carnivalId]) categorized[carnivalId] = [];
            categorized[carnivalId].push(event);
        }
    }

    console.log('\nCategorized events by carnival:');
    for (const [carnivalId, carnivalEvents] of Object.entries(categorized)) {
        console.log(`  ${carnivalId}: ${carnivalEvents.length} events`);
    }

    for (const [carnivalId, carnivalEvents] of Object.entries(categorized)) {
        const docRef = db.collection('carnivalEvents').doc(carnivalId);
        await docRef.set({
            carnivalId,
            lastScrapedAt: new Date().toISOString(),
            eventCount: carnivalEvents.length,
            events: carnivalEvents,
            sources: [...new Set(carnivalEvents.map(e => e.source))],
        }, { merge: true });

        console.log(`Saved ${carnivalEvents.length} events for ${carnivalId}`);
    }

    return categorized;
}

// --- Main entry point ---

async function runScraper(db) {
    console.log('='.repeat(50));
    console.log('Caribbean Carnival Event Scraper (Node.js)');
    console.log(`Started at: ${new Date().toISOString()}`);
    console.log('='.repeat(50));

    const allEvents = [];

    const fetelistEvents = await scrapeFetelist();
    allEvents.push(...fetelistEvents);

    const frontlineEvents = await scrapeFrontlineTicketing();
    allEvents.push(...frontlineEvents);

    const islandeEvents = await scrapeIslandeTickets();
    allEvents.push(...islandeEvents);

    const tfEvents = await scrapeTicketFederation();
    allEvents.push(...tfEvents);

    const tjjEvents = await scrapeTriniJungleJuice();
    allEvents.push(...tjjEvents);

    console.log(`\nTotal events scraped: ${allEvents.length}`);

    let categorized = {};
    if (allEvents.length > 0) {
        categorized = await saveToFirebase(allEvents, db);
        console.log(`\nEvents saved to ${Object.keys(categorized).length} carnival categories`);
    } else {
        console.log('\nNo events found to save');
    }

    console.log('\n' + '='.repeat(50));
    console.log(`Scraper completed at: ${new Date().toISOString()}`);
    console.log('='.repeat(50));

    return {
        totalScraped: allEvents.length,
        categorizedCount: Object.keys(categorized).length,
        breakdown: Object.fromEntries(
            Object.entries(categorized).map(([k, v]) => [k, v.length])
        ),
    };
}

module.exports = {
    runScraper,
    categorizeEvent,
    generateEventId,
    CARNIVAL_SEARCH_TERMS,
};
