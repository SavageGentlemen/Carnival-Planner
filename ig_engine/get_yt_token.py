"""
Carnival Planner - YouTube OAuth Refresh Token Generator
Run this script locally to open a browser window and generate your YOUTUBE_REFRESH_TOKEN automatically.
"""

import os
import sys

CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET", "")

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube"
]


def main():
    print("=" * 60)
    print("🔑 YOUTUBE REFRESH TOKEN GENERATOR")
    print("=" * 60)
    
    try:
        from google_auth_oauthlib.flow import InstalledAppFlow
    except ImportError:
        print("\n📦 Installing google-auth-oauthlib package...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "google-auth-oauthlib"])
        from google_auth_oauthlib.flow import InstalledAppFlow

    client_id = CLIENT_ID or input("Enter your YouTube OAuth Client ID: ").strip()
    client_secret = CLIENT_SECRET or input("Enter your YouTube OAuth Client Secret: ").strip()

    if not client_id or not client_secret:
        print("❌ Error: Client ID and Client Secret are required.")
        return

    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost:8080/"]
        }
    }

    flow = InstalledAppFlow.from_client_config(client_config, scopes=SCOPES)
    print("\n🌐 Opening browser for Google login & authorization...")
    print("👉 Log in with the YouTube account you want to post to, then click 'Allow'.\n")

    credentials = flow.run_local_server(port=8080, prompt="consent", access_type="offline")

    print("\n" + "=" * 60)
    print("🎉 SUCCESS! YOUR YOUTUBE REFRESH TOKEN IS BELOW:")
    print("=" * 60)
    print(f"\nYOUTUBE_REFRESH_TOKEN={credentials.refresh_token}\n")
    print("=" * 60)

    # Auto-update .env file
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            content = f.read()

        import re
        if "YOUTUBE_REFRESH_TOKEN=" in content:
            new_content = re.sub(r'YOUTUBE_REFRESH_TOKEN=.*', f'YOUTUBE_REFRESH_TOKEN={credentials.refresh_token}', content)
        else:
            new_content = content.strip() + f"\nYOUTUBE_REFRESH_TOKEN={credentials.refresh_token}\n"

        with open(env_path, "w", encoding="utf-8") as f:
            f.write(new_content)

        print(f"✅ Automatically updated {env_path} with your new YOUTUBE_REFRESH_TOKEN!")
    print("=" * 60)

if __name__ == "__main__":
    main()
