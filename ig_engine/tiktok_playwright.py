"""
Carnival Planner & MoneyPrinterTurbo - Free Standalone TikTok Playwright Uploader
Uploads videos directly to TikTok without requiring Postiz Cloud or paid APIs.
"""

import os
import sys
import time

def upload_tiktok_video(video_path, caption, session_cookie_path="tiktok_cookies.json", headless=False):
    """
    Automates uploading a short video to TikTok using Playwright.
    :param video_path: Local path to MP4 video file
    :param caption: Text caption with hashtags
    :param session_cookie_path: Saved session cookies file
    :param headless: Run browser in background (False recommended for first login)
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("\n📦 Installing playwright...")
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright"])
        subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
        from playwright.sync_api import sync_playwright

    if not os.path.exists(video_path):
        print(f"❌ Video file not found: {video_path}")
        return {"status": "error", "message": "Video file not found"}

    print(f"🚀 Launching Playwright TikTok Uploader for video: {video_path}")

    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=headless)
        
        # Load cookies if available
        if os.path.exists(session_cookie_path):
            context = browser.new_context(storage_state=session_cookie_path)
            print(f"🔑 Loaded saved session cookies from {session_cookie_path}")
        else:
            context = browser.new_context()
            print("⚠️ No session cookies found. Please log in manually on the browser window.")

        page = context.new_page()

        # Navigate to TikTok upload creator center
        page.goto("https://www.tiktok.com/creator-center/upload?from=upload", wait_until="networkidle")

        # Save cookies after manual login if needed
        if not os.path.exists(session_cookie_path):
            print("\n⏳ Please log in to TikTok in the opened browser window...")
            print("Press ENTER in this terminal once you are logged in to save cookies!")
            input("Press ENTER after login: ")
            context.storage_state(path=session_cookie_path)
            print(f"✅ Saved session cookies to {session_cookie_path}!")

        # File upload input
        print("📤 Uploading video file...")
        file_input = page.locator('input[type="file"]')
        file_input.set_input_files(os.path.abspath(video_path))

        time.sleep(5)

        # Enter caption
        print(f"📝 Entering caption: {caption[:50]}...")
        caption_box = page.locator('div[contenteditable="true"]').first
        caption_box.fill(caption)

        time.sleep(3)

        # Click Post button
        print("🚀 Clicking Post button...")
        post_btn = page.locator('button:has-text("Post")').first
        if post_btn.is_enabled():
            post_btn.click()
            print("🎉 Video successfully posted to TikTok!")
            time.sleep(5)
            browser.close()
            return {"status": "success", "platform": "tiktok"}
        else:
            print("❌ Post button not ready/enabled yet.")
            browser.close()
            return {"status": "error", "message": "Post button disabled"}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        vid = sys.argv[1]
        cap = sys.argv[2] if len(sys.argv) > 2 else "Trinidad Carnival 2026 #Carnival2026 #Soca"
        upload_tiktok_video(vid, cap)
    else:
        print("Usage: python tiktok_playwright.py <path_to_video.mp4> <caption_text>")
