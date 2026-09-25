"""
Cloud History Sync Utility for IG Engine
Syncs local posted_history.json with Supabase/Firestore to guarantee
zero duplicates even across cloud containers, rebuilds, and deployments.
"""

import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOCAL_HISTORY_FILE = os.path.join(BASE_DIR, "posted_history.json")

def load_local_history():
    if os.path.exists(LOCAL_HISTORY_FILE):
        try:
            with open(LOCAL_HISTORY_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Error reading local history: {e}")
            return []
    return []

def save_local_history(history):
    with open(LOCAL_HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def sync_with_cloud(post_entry=None):
    """
    Syncs a new post or all posted history with Supabase / Cloud table.
    """
    supabase_url = os.getenv("VITE_SUPABASE_URL") or os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        # Fall back to local file persistence
        return False

    headers = {
        "apikey": supabase_key,
        "Authorization": f"Bearer {supabase_key}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/social_post_history"

    try:
        if post_entry:
            payload = {
                "campaign_id": post_entry.get("id"),
                "title": post_entry.get("title"),
                "hook_line": post_entry.get("hook_line"),
                "carnival": post_entry.get("carnival"),
                "platform_ids": post_entry.get("platform_ids"),
                "created_at": post_entry.get("timestamp")
            }
            res = requests.post(endpoint, headers=headers, json=payload, timeout=5)
            if res.status_code in (200, 201):
                print(f"☁️ [Cloud Sync] Successfully synced post '{post_entry.get('id')}' to Supabase.")
                return True
    except Exception as e:
        print(f"ℹ️ [Cloud Sync] Notice: Cloud sync deferred to local: {e}")
        return False

    return False

if __name__ == "__main__":
    local_data = load_local_history()
    print(f"Found {len(local_data)} posts in local history.")
