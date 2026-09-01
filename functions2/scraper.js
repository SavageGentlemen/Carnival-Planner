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
    if (event._forceCarnivalId) return event._forceCarnivalId;
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

// --- Scraper: linktr.ee (e.g., ohzeenjm for Jamaica Carnival) ---

async function scrapeLinktree() {
    const events = [];
    const baseUrl = 'https://linktr.ee/ohzeenjm';

    console.log('Scraping linktr.ee/ohzeenjm...');
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);

    try {
        const nextDataScript = $('#__NEXT_DATA__').html();
        if (nextDataScript) {
            const nextData = JSON.parse(nextDataScript);
            const links = nextData?.props?.pageProps?.links || [];
            
            for (const link of links) {
                if (link.url && link.title) {
                    events.push({
                        title: link.title,
                        url: link.url,
                        date_raw: null,
                        venue: null,
                        image: link.thumbnail || null,
                        source: 'linktr.ee/ohzeenjm',
                        _forceCarnivalId: 'jamaica',
                        scraped_at: new Date().toISOString()
                    });
                }
            }
        } else {
            // Fallback HTML parsing
            $('a').each(function() {
                const el = $(this);
                const href = el.attr('href');
                if (href && href.startsWith('http')) {
                    if (href.includes('instagram.com') || href.includes('twitter.com') || href.includes('facebook.com') || href.includes('tiktok.com')) return;
                    
                    let title = el.text().trim();
                    if (title) {
                        events.push({
                            title,
                            url: href,
                            date_raw: null,
                            venue: null,
                            source: 'linktr.ee/ohzeenjm',
                            _forceCarnivalId: 'jamaica',
                            scraped_at: new Date().toISOString()
                        });
                    }
                }
            });
        }
    } catch (err) {
        console.log(`Error parsing Linktree NEXT_DATA: ${err.message}`);
    }

    // Deduplicate by URL
    const seen = new Set();
    const uniqueEvents = events.filter(e => {
        if (seen.has(e.url)) return false;
        seen.add(e.url);
        return true;
    });

    console.log(`Found ${uniqueEvents.length} events from linktr.ee/ohzeenjm`);
    return uniqueEvents;
}

// --- Scraper: hjexperience.com ---

async function scrapeHJExperience() {
    const events = [];
    const baseUrl = 'https://hjexperience.com';

    console.log('Scraping hjexperience.com...');
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    const seen = new Set();

    $('a').each(function () {
        const el = $(this);
        const href = el.attr('href') || '';
        const title = el.text().trim();

        if (title.length > 3 && href.includes('hjexperience.com')) {
            const ignores = ['/events', '/about', '/contact', '/rewind', '/nyc-events'];
            const isIgnored = ignores.some(ig => href.endsWith(ig) || href.endsWith(ig + '/'));
            if (isIgnored || href === 'https://hjexperience.com/' || href === 'https://hjexperience.com') {
                return;
            }

            if (!seen.has(href)) {
                seen.add(href);
                events.push({
                    title,
                    url: href,
                    date_raw: null,
                    venue: 'Guyana',
                    source: 'hjexperience.com',
                    _forceCarnivalId: 'guyana',
                    scraped_at: new Date().toISOString()
                });
            }
        }
    });

    console.log(`Found ${events.length} events from hjexperience.com`);
    return events;
}

// --- Scraper: feteishgy.com ---

async function scrapeFeteishGy() {
    const events = [];
    const baseUrl = 'https://feteishgy.com';

    console.log('Scraping feteishgy.com...');
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    const titleEl = $('title').first();
    const title = titleEl.length ? titleEl.text().trim() : 'Fete-ish MAS';

    events.push({
        title,
        url: baseUrl,
        date_raw: null,
        venue: 'Georgetown, Guyana',
        source: 'feteishgy.com',
        _forceCarnivalId: 'guyana',
        scraped_at: new Date().toISOString()
    });

    console.log(`Found ${events.length} events from feteishgy.com`);
    return events;
}

// --- Scraper: euphoriamas.com ---

async function scrapeEuphoriaMas() {
    const events = [];
    const baseUrl = 'https://euphoriamas.com';

    console.log('Scraping euphoriamas.com...');
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    const titleEl = $('title').first();
    const title = titleEl.length ? titleEl.text().trim() : 'Euphoria Mas';

    events.push({
        title,
        url: baseUrl,
        date_raw: null,
        venue: 'Georgetown, Guyana',
        source: 'euphoriamas.com',
        _forceCarnivalId: 'guyana',
        scraped_at: new Date().toISOString()
    });

    console.log(`Found ${events.length} events from euphoriamas.com`);
    return events;
}

// --- Scraper: savgent.com ---

async function scrapeSavgent() {
    const events = [];
    const baseUrl = 'https://www.savgent.com';

    console.log('Scraping savgent.com...');
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    const titleEl = $('title').first();
    const title = titleEl.length ? titleEl.text().trim() : 'Savage Gentlemen Events';

    events.push({
        title,
        url: `${baseUrl}/events`,
        date_raw: null,
        venue: null,
        source: 'savgent.com',
        scraped_at: new Date().toISOString()
    });

    console.log(`Found ${events.length} events from savgent.com`);
    return events;
}

// --- Scraper: eventpass24.com ---

async function scrapeEventPass24() {
    const events = [];
    const baseUrl = 'https://eventpass24.com';

    console.log('Scraping eventpass24.com...');
    const html = await fetchPage(baseUrl);
    if (html) {
        const $ = cheerio.load(html);
        $('a').each(function () {
            const el = $(this);
            const href = el.attr('href') || '';
            const title = el.text().trim();

            if (title && href.includes('/events/')) {
                const url = resolveUrl(baseUrl, href);
                events.push({
                    title,
                    url,
                    date_raw: null,
                    venue: 'Guyana',
                    source: 'eventpass24.com',
                    _forceCarnivalId: 'guyana',
                    scraped_at: new Date().toISOString()
                });
            }
        });
    }

    console.log(`Found ${events.length} events from eventpass24.com`);
    return events;
}

// --- Scraper: globalcarnivalist.com ---

async function scrapeGlobalCarnivalist() {
    const events = [];
    console.log('Scraping globalcarnivalist.com...');
    const feedUrl = 'https://globalcarnivalist.com/feed/';
    const feedXml = await fetchPage(feedUrl);
    if (!feedXml) return events;

    try {
        const $ = cheerio.load(feedXml, { xmlMode: true });
        const items = $('item');

        for (let i = 0; i < items.length; i++) {
            const item = $(items[i]);
            const title = item.find('title').text().trim();
            const link = item.find('link').text().trim();

            if (!title || !link) continue;

            const lowerLink = link.toLowerCase();
            if (lowerLink.includes('fete-list') || lowerLink.includes('where-to-party')) {
                console.log(`Found fete list article: ${title} (${link})`);
                const artHtml = await fetchPage(link);
                if (!artHtml) continue;

                const $art = cheerio.load(artHtml);
                let entryContent = $art('.entry-content, .elementor-widget-container');
                if (entryContent.length === 0) {
                    entryContent = $art('body');
                }

                let currentDate = null;
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

                entryContent.find('h2, p, li').each(function () {
                    const child = $art(this);
                    const text = child.text().trim();
                    if (!text) return;

                    const lowerText = text.toLowerCase();
                    const hasDay = days.some(day => lowerText.includes(day));

                    if (this.tagName.toLowerCase() === 'h2' && hasDay) {
                        currentDate = text;
                        return;
                    }

                    if (currentDate && ['pm', 'am', 'purchase', 'ticket'].some(kw => lowerText.includes(kw))) {
                        const linkEl = child.find('a');
                        const url = (linkEl.length && linkEl.attr('href')) ? linkEl.attr('href') : link;

                        const cleanedTitle = text.replace(/– Purchase tickets here/i, '')
                            .replace(/– purchase here/i, '')
                            .trim();

                        const event = {
                            title: `${title.split(':')[0].trim()} - ${cleanedTitle}`,
                            url: url,
                            date_raw: currentDate,
                            venue: lowerLink.includes('jamaica') ? 'Kingston' : lowerLink.includes('trinidad') ? 'Port of Spain' : null,
                            source: 'globalcarnivalist.com',
                            scraped_at: new Date().toISOString()
                        };

                        try {
                            const parts = currentDate.split('|');
                            let datePart = parts[parts.length - 1].trim();

                            const currYear = new Date().getFullYear();
                            if (!datePart.includes(String(currYear))) {
                                datePart += ` ${currYear}`;
                            }

                            const parsed = parseDate(datePart);
                            if (parsed.date) {
                                event.date = parsed.date;
                            }
                        } catch (err) {
                            // ignore
                        }

                        try {
                            const timeMatch = cleanedTitle.match(/^(\d+)(AM|PM|am|pm)/i);
                            if (timeMatch) {
                                event.time = `${timeMatch[1]}:00`;
                            }
                        } catch (err) {
                            // ignore
                        }

                        events.push(event);
                    }
                });
            }
        }
    } catch (err) {
        console.log(`Error parsing globalcarnivalist feed: ${err.message}`);
    }

    console.log(`Found ${events.length} events from globalcarnivalist.com`);
    return events;
}

// --- Scraper: fogangels.com ---

async function scrapeFogAngels() {
    const events = [];
    console.log('Scraping fogangels.com...');
    const baseUrl = 'https://fogangels.com';

    const eventsData = [
        {
            title: 'Fog Angels: Wave & Rave Boat Party',
            date: '2026-10-22',
            time: '13:00',
            venue: 'Pigeon Point, Tobago',
            url: `${baseUrl}/register/`,
            _forceCarnivalId: 'tobago'
        },
        {
            title: "Fog Angels: J'ouvert (Paint, Mud & Powder)",
            date: '2026-10-23',
            time: '04:00',
            venue: 'Bon Accord, Tobago',
            url: `${baseUrl}/register/`,
            _forceCarnivalId: 'tobago'
        },
        {
            title: 'Fog Angels: Beach to Beach Parade',
            date: '2026-10-24',
            time: '11:00',
            venue: 'Scarborough to Pigeon Point, Tobago',
            url: `${baseUrl}/register/`,
            _forceCarnivalId: 'tobago'
        },
        {
            title: 'Fog Angels: Pretty Mas Parade',
            date: '2026-10-25',
            time: '10:00',
            venue: 'Scarborough, Tobago',
            url: `${baseUrl}/register/`,
            _forceCarnivalId: 'tobago'
        }
    ];

    for (const evt of eventsData) {
        evt.source = 'fogangels.com';
        evt.date_raw = evt.date;
        evt.scraped_at = new Date().toISOString();
        events.push(evt);
    }

    console.log(`Found ${events.length} events from fogangels.com`);
    return events;
}

// --- Generic Heuristic Scraper ---

async function scrapeGenericPlatform(baseUrl, platformName, eventPath = '/events/') {
    const events = [];
    console.log(`Scraping ${platformName} ...`);
    const html = await fetchPage(baseUrl);
    if (!html) return events;

    const $ = cheerio.load(html);
    $('a').each(function () {
        const el = $(this);
        const href = el.attr('href') || '';
        const title = el.text().trim();

        if (title && href.includes(eventPath)) {
            const url = resolveUrl(baseUrl, href);
            events.push({
                title,
                url,
                date_raw: null,
                venue: null,
                source: platformName,
                scraped_at: new Date().toISOString()
            });
        }
    });

    console.log(`Found ${events.length} events from ${platformName}`);
    return events;
}

// --- Autonomous Geo-Coder & Venue Database ---
const CARNIVAL_DEFAULT_COORDS = {
    'trinidad': [10.6695, -61.5168],
    'jamaica': [18.0179, -76.8099],
    'barbados': [13.1939, -59.5432],
    'stlucia': [14.0101, -60.9875],
    'grenada': [12.1165, -61.6790],
    'antigua': [17.1274, -61.8468],
    'bahamas': [25.0343, -77.3963],
    'bermuda': [32.3078, -64.7505],
    'vincymas': [13.1587, -61.2248],
    'tobago': [11.1683, -60.8406],
    'stkitts-sugar-mas': [17.3026, -62.7177],
    'stmaarten': [18.0425, -63.0548],
    'dominica': [15.4150, -61.3710],
    'guyana': [6.8013, -58.1551],
    'miami': [25.7617, -80.1918],
    'toronto': [43.6532, -79.3832],
    'ny-labor-day': [40.6710, -73.9636],
};

const CARIBBEAN_VENUE_COORDINATES = [
    // Trinidad & Tobago
    { terms: ['queen\'s park savannah', 'savannah', 'grand stand', 'qps'], coords: [10.6695, -61.5168] },
    { terms: ['hasely crawford', 'stadium'], coords: [10.6601, -61.5306] },
    { terms: ['brian lara', 'tarouba'], coords: [10.3156, -61.4286] },
    { terms: ['o2 park', 'chaguaramas'], coords: [10.6868, -61.6441] },
    { terms: ['anchorage', 'hart\'s cut'], coords: [10.6872, -61.6375] },
    { terms: ['pier 1', 'pier one'], coords: [10.6845, -61.6310] },
    { terms: ['sound forge', 'mucurapo'], coords: [10.6658, -61.5298] },
    { terms: ['hyatt regency', 'waterfront', 'port of spain'], coords: [10.6508, -61.5167] },
    { terms: ['pigeon point', 'store bay', 'crown point'], coords: [11.1683, -60.8406] },
    { terms: ['shaw park', 'scarborough'], coords: [11.1856, -60.7417] },

    // Jamaica
    { terms: ['hope gardens', 'hope zoo'], coords: [18.0189, -76.7554] },
    { terms: ['national stadium', 'stadium east', 'arthur wint'], coords: [18.0039, -76.7725] },
    { terms: ['mas camp', 'stadium north'], coords: [18.0052, -76.7744] },
    { terms: ['devon house'], coords: [18.0175, -76.7925] },
    { terms: ['sabina park'], coords: [17.9806, -76.7786] },
    { terms: ['kingston waterfront', 'downtown kingston'], coords: [17.9691, -76.7947] },

    // Barbados
    { terms: ['kensington oval', 'fontabelle'], coords: [13.1042, -59.6225] },
    { terms: ['oistins', 'christ church'], coords: [13.0694, -59.5444] },
    { terms: ['bushy park', 'st philip'], coords: [13.1364, -59.4892] },
    { terms: ['carlisle bay', 'copacabana', 'bay street'], coords: [13.0883, -59.6094] },
    { terms: ['national botanical gardens', 'waterford'], coords: [13.1189, -59.5933] },

    // St. Lucia
    { terms: ['pigeon island', 'national landmark'], coords: [14.0906, -60.9575] },
    { terms: ['daren sammy', 'beausejour'], coords: [14.0722, -60.9528] },
    { terms: ['rodney bay', 'gros islet'], coords: [14.0728, -60.9542] },

    // Grenada
    { terms: ['kirani james', 'national athletic stadium'], coords: [12.0603, -61.7486] },
    { terms: ['port louis', 'st george\'s'], coords: [12.0469, -61.7511] },

    // Antigua
    { terms: ['sir vivian richards', 'north sound'], coords: [17.1039, -61.7844] },
    { terms: ['antigua recreation ground', 'st john\'s'], coords: [17.1219, -61.8419] },

    // Miami / Diaspora
    { terms: ['central broward', 'lauderhill'], coords: [26.1558, -80.2072] },
    { terms: ['miami fairgrounds', 'tamiami'], coords: [25.7489, -80.3756] },
    { terms: ['eastern parkway', 'brooklyn museum'], coords: [40.6710, -73.9636] },
];

function enrichEventMetadata(event, carnivalId) {
    // 1. Assign Geospatial Coordinates
    if (!event.lat || !event.lng) {
        const textToSearch = `${event.venue || ''} ${event.title || ''}`.toLowerCase();
        let matchedCoords = null;

        for (const venue of CARIBBEAN_VENUE_COORDINATES) {
            for (const term of venue.terms) {
                if (textToSearch.includes(term)) {
                    matchedCoords = venue.coords;
                    break;
                }
            }
            if (matchedCoords) break;
        }

        if (matchedCoords) {
            event.lat = matchedCoords[0];
            event.lng = matchedCoords[1];
            event.geoSource = 'exact_venue_match';
        } else if (CARNIVAL_DEFAULT_COORDS[carnivalId]) {
            // Apply slight deterministic micro-jitter based on event title hash so pins don't overlap completely
            const base = CARNIVAL_DEFAULT_COORDS[carnivalId];
            const hash = (event.title || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const jitterLat = ((hash % 20) - 10) * 0.0015;
            const jitterLng = (((hash * 7) % 20) - 10) * 0.0015;
            event.lat = Number((base[0] + jitterLat).toFixed(5));
            event.lng = Number((base[1] + jitterLng).toFixed(5));
            event.geoSource = 'regional_center_approx';
        }
    }

    // 2. Ticket Scarcity & Sold-Out Sentinel
    const checkText = `${event.price || ''} ${event.title || ''}`.toLowerCase();
    if (checkText.includes('sold out') || checkText.includes('soldout') || checkText.includes('tickets closed') || checkText.includes('waitlist only')) {
        event.isSoldOut = true;
        event.scarcityLevel = 'SOLD_OUT';
    } else if (checkText.includes('limited') || checkText.includes('final tier') || checkText.includes('tier 3') || checkText.includes('tier 4') || checkText.includes('last chance') || checkText.includes('almost gone')) {
        event.isSoldOut = false;
        event.scarcityLevel = 'CRITICAL';
    } else if (checkText.includes('tier 2') || checkText.includes('advance') || checkText.includes('late bird')) {
        event.isSoldOut = false;
        event.scarcityLevel = 'LIMITED';
    } else {
        event.isSoldOut = false;
        event.scarcityLevel = 'AVAILABLE';
    }

    return event;
}

// --- Save to Firestore ---

async function saveToFirebase(events, db) {
    const categorized = {};

    for (const event of events) {
        const carnivalId = categorizeEvent(event);
        if (carnivalId) {
            event.id = generateEventId(event);
            enrichEventMetadata(event, carnivalId);
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

    const linktreeEvents = await scrapeLinktree();
    allEvents.push(...linktreeEvents);

    const hjEvents = await scrapeHJExperience();
    allEvents.push(...hjEvents);

    const feteishEvents = await scrapeFeteishGy();
    allEvents.push(...feteishEvents);

    const euphoriaEvents = await scrapeEuphoriaMas();
    allEvents.push(...euphoriaEvents);

    const savgentEvents = await scrapeSavgent();
    allEvents.push(...savgentEvents);

    const ep24Events = await scrapeEventPass24();
    allEvents.push(...ep24Events);

    const gcEvents = await scrapeGlobalCarnivalist();
    allEvents.push(...gcEvents);

    const faEvents = await scrapeFogAngels();
    allEvents.push(...faEvents);

    // New Heuristic Platforms
    const heuristicPlatforms = [
        ["https://www.ticketgateway.com", "ticketgateway.com", "/events/"],
        ["https://ticketlinkz.com", "ticketlinkz.com", "/events/"],
        ["https://www.go2fete.com", "go2fete.com", "/events/"],
        ["https://ticketingevents.com", "ticketingevents.com", "/events/"],
        ["https://caribetickets.com", "caribetickets.com", "/events/"],
        ["https://kwiktix.net", "kwiktix.net", "/events/"],
        ["https://caribbeanticketshop.com", "caribbeanticketshop.com", "/events/"],
        ["https://myfetetickets.com", "myfetetickets.com", "/events/"],
        ["https://www.eventbrite.com", "eventbrite.com", "/e/"],
        ["https://www.caribtix.com", "caribtix.com", "/event/"]
    ];

    for (const [baseUrl, name, path] of heuristicPlatforms) {
        const pEvents = await scrapeGenericPlatform(baseUrl, name, path);
        allEvents.push(...pEvents);
    }

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

async function runStandalone() {
    console.log('[Scraper Runner] Initializing standalone runner...');
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            try {
                const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
                admin.initializeApp({ credential: admin.credential.cert(creds) });
            } catch (err) {
                console.warn('[Scraper Runner] Could not parse FIREBASE_SERVICE_ACCOUNT, initializing default app:', err.message);
                admin.initializeApp();
            }
        } else {
            admin.initializeApp();
        }
    }
    const db = admin.firestore();
    return await runScraper(db);
}

module.exports = {
    runScraper,
    runStandalone,
    categorizeEvent,
    generateEventId,
    enrichEventMetadata,
    CARNIVAL_SEARCH_TERMS,
    CARIBBEAN_VENUE_COORDINATES,
};
