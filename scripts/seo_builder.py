#!/usr/bin/env python3
"""
Autonomous SEO Content Studio (BlogPilot Integration)
Generates high-converting, cluster-focused SEO articles for Caribbean Carnivals using Gemini API.
"""

import os
import sys
import json
import argparse
import datetime
import random
import requests

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CARNIVAL_TOPICS = [
    {"island": "trinidad", "name": "Trinidad Carnival", "airport": "POS", "keywords": ["fetes", "doubles", "band launch", "costume pickup", "soca brainwash"]},
    {"island": "jamaica", "name": "Jamaica Carnival", "airport": "KIN", "keywords": ["xodus", "yard mas", "sunrise breakfast party", "kingston fetes", "jerk chicken"]},
    {"island": "barbados", "name": "Barbados Crop Over", "airport": "BBD", "keywords": ["grand kadooment", "foreday morning", "mimosa", "oistins", "bajan rum punch"]},
    {"island": "stlucia", "name": "St. Lucia Carnival", "airport": "UVF", "keywords": ["dennery segment", "jab jab", "piton", "gros islet street party", "remedy"]},
    {"island": "grenada", "name": "Grenada Spicemas", "airport": "GND", "keywords": ["jab jab", "oil mas", "spice island", "monday night mas", "jouvert"]},
    {"island": "antigua", "name": "Antigua Carnival", "airport": "ANU", "keywords": ["j'ouvert", "party monarch", "t-shirt mas", "caribbean party"]}
]

def generate_article_with_gemini(topic, api_key):
    """Generates an SEO blog article via Gemini API."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    prompt = f"""
    You are an expert Caribbean travel journalist and carnival enthusiast writing for Carnival Planner (carnival-planner.web.app).
    Write a high-ranking, engaging SEO travel guide for: {topic['name']}.
    Incorporate key topics: {', '.join(topic['keywords'])}.

    Respond STRICTLY in JSON format matching this schema (no markdown blocks around the json):
    {{
      "title": "Catchy SEO Title with year 2026",
      "slug": "url-friendly-slug-2026",
      "metaDescription": "150-160 char compelling meta description with call to action",
      "island": "{topic['island']}",
      "readTime": "5 min read",
      "author": "CaribPulse AI Travel Team",
      "heroImage": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
      "content": "Full HTML string with <h2>, <h3>, <p>, <ul>, <li> elements detailing top fetes, local food, transportation, costume pickup advice, and safety tips.",
      "schemaJson": {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Title here",
        "description": "Meta description here",
        "author": {{ "@type": "Organization", "name": "CaribPulse AI Travel Team" }},
        "publisher": {{ "@type": "Organization", "name": "Carnival Planner", "url": "https://carnival-planner.web.app" }}
      }}
    }}
    """

    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        res_data = response.json()
        raw_text = res_data["candidates"][0]["content"]["parts"][0]["text"].strip()
        
        # Clean json formatting if Gemini added ```json wrappers
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        
        article = json.loads(raw_text.strip())
        article["publishDate"] = datetime.date.today().isoformat()
        article["id"] = article["slug"]
        return article
    except Exception as e:
        print(f"⚠️ Gemini generation failed: {e}. Using fallback generator.")
        return generate_fallback_article(topic)

def generate_fallback_article(topic):
    """Fallback generator if Gemini API key is missing or fails."""
    slug = f"{topic['island']}-carnival-2026-ultimate-guide"
    title = f"{topic['name']} 2026: Fete List, Costume Pickup & Essential Travel Guide"
    desc = f"Discover top fetes, local food spots, costume pickup tips, and flight secrets for {topic['name']} 2026."
    
    content = f"""
    <h2>Welcome to {topic['name']} 2026</h2>
    <p>Planning your journey to {topic['name']}? From vibrant street fetes to late-night J'ouvert celebrations, here is everything you need to know before touching down.</p>
    
    <h3>Top Highlight Events & Fetes</h3>
    <ul>
      <li><strong>Sunrise Breakfast Fetes:</strong> High energy, all-inclusive drinks, and premium Caribbean cuisine as the sun comes up.</li>
      <li><strong>J'ouvert Jam:</strong> Paint, powder, oil, and mud street bands marching before dawn.</li>
      <li><strong>Grand Road March Parade:</strong> Masqueraders in full feather and gem costumes taking the stage.</li>
    </ul>

    <h3>Must-Try Local Food & Eats</h3>
    <p>Make sure to fuel up between fetes with local favorites including street food vendors, fresh coconut water, and local rum punch.</p>

    <h3>Costume Pickup & Flight Tips</h3>
    <p>Book flights early into <strong>{topic['airport']}</strong>, collect your costume distribution receipt, and download the Carnival Planner app for offline squad radar!</p>
    """

    return {
        "id": slug,
        "slug": slug,
        "title": title,
        "metaDescription": desc,
        "island": topic['island'],
        "readTime": "5 min read",
        "author": "CaribPulse AI Travel Team",
        "publishDate": datetime.date.today().isoformat(),
        "heroImage": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
        "content": content,
        "schemaJson": {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": desc,
            "author": {"@type": "Organization", "name": "CaribPulse AI Travel Team"},
            "publisher": {"@type": "Organization", "name": "Carnival Planner", "url": "https://carnival-planner.web.app"}
        }
    }

def save_to_firestore(article):
    """Saves generated article into Firebase Firestore `seoArticles` collection if credentials exist."""
    cred_env = os.getenv("FIREBASE_SERVICE_ACCOUNT")
    if not cred_env:
        print("ℹ️ FIREBASE_SERVICE_ACCOUNT not found in env. Skipping Firestore push.")
        return False
    
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore
        
        if not firebase_admin._apps:
            cred_dict = json.loads(cred_env)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
        
        db = firestore.client()
        db.collection("seoArticles").document(article["slug"]).set(article, merge=True)
        print(f"✅ Saved article '{article['slug']}' to Firestore collection 'seoArticles'.")
        return True
    except Exception as e:
        print(f"⚠️ Error saving to Firestore: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Autonomous SEO Content Studio")
    parser.add_argument("--dry-run", action="store_true", help="Run without API calls or Firestore writes")
    args = parser.parse_args()

    topic = random.choice(CARNIVAL_TOPICS)
    print(f"🚀 Starting Autonomous SEO Content Generation for: {topic['name']}")

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
    
    if args.dry_run or not api_key:
        if not api_key:
            print("ℹ️ GEMINI_API_KEY not found. Operating in fallback mode.")
        article = generate_fallback_article(topic)
    else:
        article = generate_article_with_gemini(topic, api_key)

    print("\n--- Generated SEO Article Preview ---")
    print(f"Title: {article['title']}")
    print(f"Slug: {article['slug']}")
    print(f"Island: {article['island']}")
    print(f"Publish Date: {article['publishDate']}")

    # Write to local static backup JSON for site fallback
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "data")
    os.makedirs(output_dir, exist_ok=True)
    out_file = os.path.join(output_dir, "latest_seo_articles.json")
    
    existing = []
    if os.path.exists(out_file):
        try:
            with open(out_file, "r") as f:
                existing = json.load(f)
        except Exception:
            existing = []

    # Update or insert
    existing = [a for a in existing if a.get("slug") != article["slug"]]
    existing.insert(0, article)
    existing = existing[:20]  # keep top 20 articles

    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2)

    print(f"📁 Updated local static file: {out_file}")

    if not args.dry_run:
        save_to_firestore(article)

    print("✨ SEO Article Pipeline completed successfully!")

if __name__ == "__main__":
    main()
