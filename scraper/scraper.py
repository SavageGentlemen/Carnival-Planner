#!/usr/bin/env python3
"""
Caribbean Carnival Event Scraper
Scrapes fetelist.com, frontlineticketing.com, and islandetickets.com daily and stores events in Firebase.
"""

import os
import re
import json
import time
import hashlib
from datetime import datetime, timezone
from typing import List, Dict, Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from dateutil import parser as date_parser
import firebase_admin
from firebase_admin import credentials, firestore

RATE_LIMIT_DELAY = 2
USER_AGENT = "CarnivalPlannerBot/1.0 (https://carnival-planner.web.app; contact@carnival-planner.web.app)"

CARNIVAL_SEARCH_TERMS = {
    'trinidad': ['trinidad', 'trini', 'port of spain'],
    'jamaica': ['jamaica', 'kingston', 'montego bay'],
    'barbados': ['barbados', 'crop over', 'bridgetown'],
    'antigua': ['antigua', "antigua carnival"],
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
}

def init_firebase():
    """Initialize Firebase Admin SDK."""
    if firebase_admin._apps:
        return firestore.client()
    
    cred_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    if cred_path and os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
    else:
        cred_json = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
        if cred_json:
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
        else:
            raise ValueError("No Firebase credentials found. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT")
    
    firebase_admin.initialize_app(cred, {
        'projectId': 'carnival-planner'
    })
    return firestore.client(database_id='squad-db')


def fetch_page(url: str, session: requests.Session) -> Optional[str]:
    """Fetch a page with rate limiting and error handling."""
    try:
        time.sleep(RATE_LIMIT_DELAY)
        response = session.get(url, timeout=30)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None


def get_coordinates(venue: str, carnival_id: str) -> Dict[str, Optional[float]]:
    """Get lat/lng for a venue using Nominatim Geocoding."""
    if not venue or len(venue) < 3:
        return {'lat': None, 'lng': None}
        
    # Add carnival context for better accuracy (e.g. "Queens Park Oval, Trinidad")
    carnival_name = CARNIVAL_SEARCH_TERMS.get(carnival_id, [carnival_id])[0]
    query = f"{venue}, {carnival_name}"
    
    session = requests.Session()
    session.headers.update({'User-Agent': USER_AGENT})
    url = f"https://nominatim.openstreetmap.org/search?q={query}&format=json&limit=1"
    
    try:
        # Nominatim requires strict rate limiting (1 request per second)
        time.sleep(1.1)
        response = session.get(url, timeout=10)
        data = response.json()
        if data:
            return {
                'lat': float(data[0]['lat']),
                'lng': float(data[0]['lon'])
            }
    except Exception as e:
        print(f"Geocoding error for {query}: {e}")
        
    return {'lat': None, 'lng': None}


def scrape_fetelist() -> List[Dict]:
    """Scrape events from fetelist.com."""
    events = []
    session = requests.Session()
    session.headers.update({'User-Agent': USER_AGENT})
    
    base_url = "https://fetelist.com"
    events_url = f"{base_url}/events"
    
    print(f"Scraping fetelist.com...")
    html = fetch_page(events_url, session)
    if not html:
        return events
    
    soup = BeautifulSoup(html, 'lxml')
    
    event_cards = soup.select('.event-card, .event-item, article.event, .fete-card, [data-event]')
    
    if not event_cards:
        event_cards = soup.find_all(['article', 'div'], class_=lambda x: x and ('event' in x.lower() or 'fete' in x.lower() or 'party' in x.lower()))
    
    for card in event_cards[:50]:
        try:
            title_el = card.select_one('h2, h3, h4, .event-title, .title, a[href*="event"]')
            title = title_el.get_text(strip=True) if title_el else None
            
            if not title:
                continue
            
            link_el = card.select_one('a[href]')
            link = urljoin(base_url, link_el['href']) if link_el and link_el.get('href') else None
            
            date_el = card.select_one('.date, .event-date, time, [datetime]')
            date_str = None
            if date_el:
                date_str = date_el.get('datetime') or date_el.get_text(strip=True)
            
            venue_el = card.select_one('.venue, .location, .event-location, address')
            venue = venue_el.get_text(strip=True) if venue_el else None
            
            price_el = card.select_one('.price, .ticket-price, .cost')
            price = price_el.get_text(strip=True) if price_el else None
            
            img_el = card.select_one('img')
            image = urljoin(base_url, img_el['src']) if img_el and img_el.get('src') else None
            
            event = {
                'title': title,
                'url': link,
                'date_raw': date_str,
                'venue': venue,
                'price': price,
                'image': image,
                'source': 'fetelist.com',
                'scraped_at': datetime.now(timezone.utc).isoformat()
            }
            
            if date_str:
                try:
                    parsed_date = date_parser.parse(date_str, fuzzy=True)
                    event['date'] = parsed_date.strftime('%Y-%m-%d')
                    event['time'] = parsed_date.strftime('%H:%M') if parsed_date.hour != 0 else None
                except:
                    pass
            
            events.append(event)
            
        except Exception as e:
            print(f"Error parsing fetelist event: {e}")
            continue
    
    print(f"Found {len(events)} events from fetelist.com")
    return events


def scrape_frontline_ticketing() -> List[Dict]:
    """Scrape events from frontlineticketing.com."""
    events = []
    session = requests.Session()
    session.headers.update({'User-Agent': USER_AGENT})
    
    base_url = "https://frontlineticketing.com"
    
    search_urls = [
        f"{base_url}/events",
        f"{base_url}/caribbean",
        f"{base_url}/carnival",
    ]
    
    print(f"Scraping frontlineticketing.com...")
    
    for url in search_urls:
        html = fetch_page(url, session)
        if not html:
            continue
        
        soup = BeautifulSoup(html, 'lxml')
        
        event_cards = soup.select('.event, .event-card, .ticket-event, article, .product-item')
        
        for card in event_cards[:30]:
            try:
                title_el = card.select_one('h2, h3, h4, .event-name, .title, a')
                title = title_el.get_text(strip=True) if title_el else None
                
                if not title:
                    continue
                
                link_el = card.select_one('a[href]')
                link = urljoin(base_url, link_el['href']) if link_el and link_el.get('href') else None
                
                date_el = card.select_one('.date, .event-date, time, [datetime], .when')
                date_str = None
                if date_el:
                    date_str = date_el.get('datetime') or date_el.get_text(strip=True)
                
                venue_el = card.select_one('.venue, .location, address, .where')
                venue = venue_el.get_text(strip=True) if venue_el else None
                
                price_el = card.select_one('.price, .ticket-price, .amount')
                price = price_el.get_text(strip=True) if price_el else None
                
                img_el = card.select_one('img')
                image = urljoin(base_url, img_el['src']) if img_el and img_el.get('src') else None
                
                event = {
                    'title': title,
                    'url': link,
                    'date_raw': date_str,
                    'venue': venue,
                    'price': price,
                    'image': image,
                    'source': 'frontlineticketing.com',
                    'scraped_at': datetime.now(timezone.utc).isoformat()
                }
                
                if date_str:
                    try:
                        parsed_date = date_parser.parse(date_str, fuzzy=True)
                        event['date'] = parsed_date.strftime('%Y-%m-%d')
                        event['time'] = parsed_date.strftime('%H:%M') if parsed_date.hour != 0 else None
                    except:
                        pass
                
                events.append(event)
                
            except Exception as e:
                print(f"Error parsing frontline event: {e}")
                continue
    
    print(f"Found {len(events)} events from frontlineticketing.com")
    return events


def scrape_islandetickets() -> List[Dict]:
    """Scrape events from islandetickets.com homepage calendar."""
    events = []
    session = requests.Session()
    session.headers.update({'User-Agent': USER_AGENT})
    
    base_url = "https://islandetickets.com"
    
    print(f"Scraping islandetickets.com...")
    
    html = fetch_page(base_url, session)
    if not html:
        return events
    
    soup = BeautifulSoup(html, 'lxml')
    
    current_month_year = None
    month_pattern = re.compile(r'^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}$')
    
    all_elements = soup.find_all(['h5', 'a'])
    
    for el in all_elements:
        if el.name == 'h5':
            month_text = el.get_text(strip=True)
            if month_pattern.match(month_text):
                current_month_year = month_text
            continue
        
        if el.name == 'a':
            href = el.get('href', '')
            if '/event/' not in href:
                continue
            
            try:
                link_text = el.get_text(separator='\n', strip=True)
                
                if len(link_text) < 10:
                    continue
                
                event_url = urljoin(base_url, href)
                
                bold_el = el.select_one('strong, b')
                title = bold_el.get_text(strip=True) if bold_el else None
                
                if not title:
                    lines = [l.strip() for l in link_text.split('\n') if l.strip()]
                    for line in lines:
                        if len(line) > 5:
                            if re.match(r'^\d+(st|nd|rd|th)$', line):
                                continue
                            if re.match(r'^\d+:\d+[ap]m', line, re.I):
                                continue
                            if line.startswith('Hosted by'):
                                continue
                            if line.startswith('@'):
                                continue
                            if re.match(r'^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)', line):
                                continue
                            title = line
                            break
                
                if not title or len(title) < 3:
                    continue
                
                venue = None
                venue_match = re.search(r'@\s*([^@\n]+?)(?:\s*\d+:\d+|$)', link_text)
                if venue_match:
                    venue = venue_match.group(1).strip()
                
                time_str = None
                time_match = re.search(r'(\d{1,2}:\d{2}[ap]m)\s*-\s*(\d{1,2}:\d{2}[ap]m)', link_text, re.I)
                if time_match:
                    time_str = f"{time_match.group(1)} - {time_match.group(2)}"
                
                date_str = None
                day_match = re.search(r'(\d{1,2})(st|nd|rd|th)', link_text)
                if day_match and current_month_year:
                    day = day_match.group(1)
                    date_str = f"{day} {current_month_year}"
                
                img_el = el.select_one('img')
                image = img_el.get('src') if img_el else None
                if image and not image.startswith('http'):
                    image = urljoin(base_url, image)
                
                host = None
                host_match = re.search(r'Hosted by\s+([^\n@]+)', link_text)
                if host_match:
                    host = host_match.group(1).strip()
                
                event = {
                    'title': title,
                    'url': event_url,
                    'date_raw': date_str,
                    'venue': venue,
                    'host': host,
                    'time': time_str,
                    'image': image,
                    'source': 'islandetickets.com',
                    'scraped_at': datetime.now(timezone.utc).isoformat()
                }
                
                if date_str:
                    try:
                        parsed_date = date_parser.parse(date_str, fuzzy=True)
                        event['date'] = parsed_date.strftime('%Y-%m-%d')
                    except:
                        pass
                
                events.append(event)
                
            except Exception as e:
                print(f"Error parsing islandetickets event: {e}")
                continue
    
    seen_urls = set()
    unique_events = []
    for event in events:
        if event['url'] not in seen_urls:
            seen_urls.add(event['url'])
            unique_events.append(event)
    
    print(f"Found {len(unique_events)} events from islandetickets.com")
    return unique_events


def scrape_ticketfederation() -> List[Dict]:
    """Scrape events from ticketfederation.com/upcoming-events/."""
    events = []
    session = requests.Session()
    session.headers.update({'User-Agent': USER_AGENT})
    
    base_url = "https://www.ticketfederation.com"
    events_url = f"{base_url}/upcoming-events/"
    
    print(f"Scraping ticketfederation.com...")
    html = fetch_page(events_url, session)
    if not html:
        return events
    
    soup = BeautifulSoup(html, 'lxml')
    
    # EventOn plugin structure
    event_cards = soup.select('.eventon_list_event')
    
    for card in event_cards[:50]:
        try:
            title_el = card.select_one('.evcal_event_title')
            title = title_el.get_text(strip=True) if title_el else None
            
            if not title:
                continue
            
            # Link is in a schema element (hidden) or data attribute on the <a> itself
            # Based on outerHTML, the <a> tag itself has the title in a child span
            link_el = card.select_one('.evo_event_schema a[itemprop="url"]')
            link = link_el['href'] if link_el and link_el.get('href') else None
            
            # If no schema link, it might be in data-exurl or we have to guess it/use the card ID
            if not link:
                link = card.get('data-exurl')
            
            if link and not link.startswith('http'):
                link = urljoin(base_url, link)
            
            # Date structure from EventOn plugin
            day_el = card.select_one('.evo_start .date')
            month_el = card.select_one('.evo_start .month')
            
            if day_el and month_el:
                date_str = f"{day_el.get_text(strip=True)} {month_el.get_text(strip=True)}"
            else:
                # Fallback to data attributes on the dayblock
                dayblock = card.select_one('.evoet_dayblock')
                if dayblock:
                    smon = dayblock.get('data-smon')
                    syr = dayblock.get('data-syr')
                    # We might still need the day number
                    day_num = card.select_one('.evo_start .date')
                    day_str = day_num.get_text(strip=True) if day_num else "01"
                    date_str = f"{day_str} {smon} {syr}"
                else:
                    date_str = None
            
            # Venue
            venue_el = card.select_one('.evcal_location')
            venue = venue_el.get('data-name') or venue_el.get_text(strip=True) if venue_el else None
            
            # Image
            img_el = card.select_one('.ev_ftImg')
            image = img_el.get('data-img') if img_el else None
            
            event = {
                'title': title,
                'url': link,
                'date_raw': date_str,
                'venue': venue,
                'image': image,
                'source': 'ticketfederation.com',
                'scraped_at': datetime.now(timezone.utc).isoformat()
            }
            
            if date_str:
                try:
                    # Append current year if missing
                    curr_year = datetime.now().year
                    if str(curr_year) not in date_str:
                        date_str += f" {curr_year}"
                    parsed_date = date_parser.parse(date_str, fuzzy=True)
                    event['date'] = parsed_date.strftime('%Y-%m-%d')
                except:
                    pass
            
            events.append(event)
            
        except Exception as e:
            print(f"Error parsing ticketfederation event: {e}")
            continue
    
    print(f"Found {len(events)} events from ticketfederation.com")
    return events


def scrape_trini_jungle_juice() -> List[Dict]:
    """Scrape events from trinijunglejuice.com using their internal API."""
    events = []
    session = requests.Session()
    session.headers.update({'User-Agent': USER_AGENT})
    
    # We found their staging API endpoint which seems current
    api_url = "https://staging.trinijunglejuice.com/api/events?page=1&items=50&type=all&orderDirection=asc&timestamped=true"
    
    print(f"Scraping trinijunglejuice.com (via API)...")
    
    try:
        time.sleep(RATE_LIMIT_DELAY)
        response = session.get(api_url, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        # TJJ API returns events grouped by date
        groups = data.get('events', [])
        for group in groups:
            # group example: {'timestamp': 'Thursday, January 1, 2026', 'events': [...]}
            for item in group.get('events', []):
                try:
                    title = item.get('title')
                    if not title:
                        continue
                    
                    # Construct URL (TJJ slugs are often title-based)
                    # Use the registration_url if available, otherwise fallback
                    link = item.get('registration_url') or f"https://trinijunglejuice.com/events/{item.get('id')}"
                    
                    start_dt = item.get('start_datetime')
                    venue_data = item.get('location', {})
                    venue = venue_data.get('address') or venue_data.get('city')
                    
                    event = {
                        'title': title,
                        'url': link,
                        'date_raw': item.get('timestamp') or start_dt,
                        'venue': venue,
                        'image': item.get('poster_url'),
                        'lat': float(venue_data.get('latitude')) if venue_data.get('latitude') else None,
                        'lng': float(venue_data.get('longitude')) if venue_data.get('longitude') else None,
                        'source': 'trinijunglejuice.com',
                        'scraped_at': datetime.now(timezone.utc).isoformat()
                    }
                    
                    if start_dt:
                        try:
                            parsed_date = date_parser.parse(start_dt)
                            event['date'] = parsed_date.strftime('%Y-%m-%d')
                            event['time'] = parsed_date.strftime('%H:%M') if parsed_date.hour != 0 else None
                        except:
                            pass
                    
                    events.append(event)
                except Exception as e:
                    print(f"Error parsing TJJ event item: {e}")
                    continue
                    
    except Exception as e:
        print(f"Error fetching/parsing TJJ API: {e}")
    
    print(f"Found {len(events)} events from trinijunglejuice.com")
    return events


def categorize_event(event: Dict) -> Optional[str]:
    """Determine which carnival an event belongs to based on title/venue."""
    text_to_search = f"{event.get('title', '')} {event.get('venue', '')}".lower()
    
    for carnival_id, search_terms in CARNIVAL_SEARCH_TERMS.items():
        for term in search_terms:
            if term.lower() in text_to_search:
                return carnival_id
    
    return None


def generate_event_id(event: Dict) -> str:
    """Generate a unique ID for an event based on its content."""
    unique_str = f"{event.get('title', '')}-{event.get('date', '')}-{event.get('source', '')}"
    return hashlib.md5(unique_str.encode()).hexdigest()[:16]


def save_to_firebase(events: List[Dict], db):
    """Save categorized events to Firebase Firestore."""
    categorized = {}
    
    for event in events:
        carnival_id = categorize_event(event)
        if carnival_id:
            # Attempt geocoding if lat/lng is missing (TJJ usually has them)
            if not event.get('lat') or not event.get('lng'):
                coords = get_coordinates(event.get('venue'), carnival_id)
                event['lat'] = coords['lat']
                event['lng'] = coords['lng']
                
            if carnival_id not in categorized:
                categorized[carnival_id] = []
            event['id'] = generate_event_id(event)
            categorized[carnival_id].append(event)
    
    print(f"\nCategorized events by carnival:")
    for carnival_id, carnival_events in categorized.items():
        print(f"  {carnival_id}: {len(carnival_events)} events")
    
    for carnival_id, carnival_events in categorized.items():
        doc_ref = db.collection('carnivalEvents').document(carnival_id)
        
        doc_ref.set({
            'carnivalId': carnival_id,
            'lastScrapedAt': datetime.now(timezone.utc).isoformat(),
            'eventCount': len(carnival_events),
            'events': carnival_events,
            'sources': list(set(e.get('source') for e in carnival_events))
        }, merge=True)
        
        print(f"Saved {len(carnival_events)} events for {carnival_id}")
    
    return categorized


def main():
    """Main scraper entry point."""
    print("=" * 50)
    print("Caribbean Carnival Event Scraper")
    print(f"Started at: {datetime.now(timezone.utc).isoformat()}")
    print("=" * 50)
    
    db = init_firebase()
    
    all_events = []
    
    fetelist_events = scrape_fetelist()
    all_events.extend(fetelist_events)
    
    frontline_events = scrape_frontline_ticketing()
    all_events.extend(frontline_events)
    
    islandetickets_events = scrape_islandetickets()
    all_events.extend(islandetickets_events)
    
    tf_events = scrape_ticketfederation()
    all_events.extend(tf_events)
    
    tjj_events = scrape_trini_jungle_juice()
    all_events.extend(tjj_events)
    
    print(f"\nTotal events scraped: {len(all_events)}")
    
    if all_events:
        categorized = save_to_firebase(all_events, db)
        print(f"\nEvents saved to {len(categorized)} carnival categories")
    else:
        print("\nNo events found to save")
    
    print("\n" + "=" * 50)
    print(f"Scraper completed at: {datetime.now(timezone.utc).isoformat()}")
    print("=" * 50)


if __name__ == "__main__":
    main()
