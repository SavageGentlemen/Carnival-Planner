import json
import os
from scraper.scraper import init_firebase

db = init_firebase()
docs = db.collection('carnivalEvents').stream()

found_pins = False
print("Checking for events with coordinates...")
for doc in docs:
    data = doc.to_dict()
    events = data.get('events', [])
    carnival_id = data.get('carnivalId')
    
    geocoded = [e for e in events if e.get('lat') and e.get('lng')]
    if geocoded:
        found_pins = True
        print(f"Carnival: {carnival_id}")
        print(f"  Total events: {len(events)}")
        print(f"  Pins with coordinates: {len(geocoded)}")
        for e in geocoded[:3]:
            print(f"    - {e['title']} ({e['source']}) at [{e['lat']}, {e['lng']}]")

if not found_pins:
    print("No events with coordinates found yet. Need to run the scraper to populate them.")
