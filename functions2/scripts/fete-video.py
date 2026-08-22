import os
import sys
import subprocess
import json
import io
from datetime import datetime

# ==========================================
# BOOTSTRAP DEPS
# ==========================================
def install_and_import(package, import_name=None):
    if import_name is None:
        import_name = package
    try:
        __import__(import_name)
    except ImportError:
        print(f"[*] Bootstrapping missing library: {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install_and_import("pillow", "PIL")
install_and_import("numpy")
install_and_import("requests")
install_and_import("moviepy")

from PIL import Image, ImageDraw, ImageFont
import numpy as np
import requests

try:
    from moviepy.editor import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
except ImportError:
    from moviepy import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

def set_clip_duration(clip, duration):
    if hasattr(clip, "with_duration"):
        return clip.with_duration(duration)
    return clip.set_duration(duration)

def set_clip_audio(clip, audio):
    if hasattr(clip, "with_audio"):
        return clip.with_audio(audio)
    return clip.set_audio(audio)

def set_audio_volume(audio_clip, volume_factor):
    if hasattr(audio_clip, "with_volume_scaled"):
        return audio_clip.with_volume_scaled(volume_factor)
    if hasattr(audio_clip, "multiply_volume"):
        return audio_clip.multiply_volume(volume_factor)
    if hasattr(audio_clip, "volumex"):
        return audio_clip.volumex(volume_factor)
    return audio_clip

def get_subclip(audio_clip, t_start, t_end):
    if hasattr(audio_clip, "subclipped"):
        return audio_clip.subclipped(t_start, t_end)
    if hasattr(audio_clip, "subclip"):
        return audio_clip.subclip(t_start, t_end)
    return audio_clip

# ==========================================
# NATURAL VOICE ENGINE (TTS) — 100% FREE
# ==========================================
# Priority: edge-tts (Microsoft Neural, free) → Kokoro-82M (local AI) → gTTS (fallback)
# No API keys needed for any engine!

import asyncio

def speak_edge_tts(text, output_path):
    """
    edge-tts — Microsoft Edge Neural voices. FREE, no API key, human-quality.
    Uses the same Azure Neural voices as paid Azure TTS but via Edge's free endpoint.
    Requires internet connection.
    """
    try:
        install_and_import("edge-tts", "edge_tts")
        import edge_tts

        # Caribbean-friendly warm voices (pick one):
        # en-US-AriaNeural    — Young female, expressive & energetic
        # en-US-GuyNeural     — Male, warm & friendly
        # en-GB-SoniaNeural   — British female, warm tone
        # en-JM-AishaNeural   — Jamaican English female (if available)
        # en-TT-SamanthaNeural — Trinidad English female (if available)
        voice = os.environ.get("EDGE_TTS_VOICE", "en-US-AriaNeural")

        async def _generate():
            communicate = edge_tts.Communicate(text, voice, rate="+5%", pitch="+2Hz")
            await communicate.save(output_path)

        # Handle event loop — works in both sync scripts and async contexts
        try:
            loop = asyncio.get_running_loop()
            # Already in an async context, create a task
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                loop.run_in_executor(pool, lambda: asyncio.run(_generate()))
        except RuntimeError:
            # No running loop — normal script execution
            asyncio.run(_generate())

        if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
            print(f"  [Voice] edge-tts ({voice}) — natural neural voice ✓")
            return True
    except Exception as e:
        print(f"  [Voice] edge-tts error: {e}")
    return False

def speak_kokoro(text, output_path):
    """
    Kokoro-82M — Free, open-weight local AI TTS. Apache 2.0 license.
    Runs on CPU, no internet needed. Requires espeak-ng system dependency.
    """
    try:
        install_and_import("kokoro")
        install_and_import("soundfile")
        from kokoro import KPipeline
        import soundfile as sf

        pipeline = KPipeline(lang_code='a')  # American English
        generator = pipeline(text, voice='af_heart')  # Warm female voice

        # Kokoro yields chunks — concatenate all audio
        all_audio = []
        for gs, ps, audio in generator:
            all_audio.append(audio)

        if all_audio:
            import numpy as np_audio
            combined = np_audio.concatenate(all_audio)
            # Save as WAV first, then we'll use it (MoviePy handles WAV fine)
            wav_path = output_path.replace('.mp3', '.wav')
            sf.write(wav_path, combined, 24000)
            # Rename to expected path (or just use wav)
            if wav_path != output_path:
                os.rename(wav_path, output_path)
            print(f"  [Voice] Kokoro-82M — local AI voice ✓")
            return True
    except Exception as e:
        print(f"  [Voice] Kokoro error (needs espeak-ng installed): {e}")
    return False

def speak_gtts_fallback(text, output_path):
    """gTTS — free, always available fallback. Robotic but functional."""
    try:
        install_and_import("gTTS", "gtts")
        from gtts import gTTS
        tts = gTTS(text=text, lang="en", tld="co.uk")  # UK accent sounds slightly warmer
        tts.save(output_path)
        print(f"  [Voice] gTTS fallback ✓")
        return True
    except Exception as e:
        print(f"  [Voice] gTTS error: {e}")
    return False

def generate_speech(text, output_path):
    """Try free voice engines in priority order, fall back gracefully."""
    return (
        speak_edge_tts(text, output_path) or
        speak_kokoro(text, output_path) or
        speak_gtts_fallback(text, output_path)
    )


# ==========================================
# CONFIGURATION & UTILITIES
# ==========================================
FONT_TITLE = "impact.ttf"
FONT_BODY = "arialbd.ttf"
WIDTH = 720
HEIGHT = 1280
CENTER_X = 360

def get_font(font_name, size):
    try:
        windows_font_path = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts", font_name)
        if os.path.exists(windows_font_path):
            return ImageFont.truetype(windows_font_path, size)
    except Exception as e:
        print(f"Font loading error: {e}")
    return ImageFont.load_default()

def draw_neon_background(width, height):
    img = Image.new("RGBA", (width, height), (7, 5, 18, 255))
    draw = ImageDraw.Draw(img)
    
    draw.ellipse([(-100, -100), (width + 100, 300)], fill=(74, 14, 78, 40))
    draw.ellipse([(-100, height - 300), (width + 100, height + 100)], fill=(14, 78, 92, 40))
    draw.rectangle([(15, 15), (width - 15, height - 15)], outline=(188, 52, 250, 40), width=3)
    return img

def download_audio_track(url, dest_path):
    if os.path.exists(dest_path):
        return True
    try:
        print(f"Downloading background audio track: {url}...")
        r = requests.get(url, timeout=15)
        if r.status_code == 200:
            with open(dest_path, "wb") as f:
                f.write(r.content)
            return True
    except Exception as e:
        print(f"Failed to download background music: {e}")
    return False

# ==========================================
# MULTI-PLATFORM SOCIAL PUBLISHER
# ==========================================
def publish_to_n8n(video_path, location_filter, webhook_url):
    """
    Sends video + rich metadata to n8n for multi-platform distribution.
    n8n workflow should route to: YouTube Shorts, Instagram Reels, TikTok, Facebook.
    """
    if not webhook_url:
        print("[*] No N8N_WEBHOOK_URL specified. Skipping n8n auto-upload.")
        return False
        
    print(f"[*] Posting compiled Short to n8n Webhook (multi-platform): {webhook_url}...")
    try:
        now = datetime.utcnow().strftime("%Y-%m-%d")
        island_title = location_filter.replace("_", " ").title()
        
        # --- Platform-specific content ---
        yt_title = f"Top Fetes This Weekend in {island_title}! 🌴 #Shorts #Carnival #CaribPulse"
        yt_description = (
            f"🌴 Your weekly fete guide for {island_title}!\n\n"
            f"Discover upcoming fetes, buy tickets, and book travel on CaribPulse AI:\n"
            f"👉 https://carnival-planner.web.app\n\n"
            f"#Carnival #Fete #Caribbean #SocaMusic #{island_title.replace(' ', '')} #CaribPulse"
        )
        
        ig_caption = (
            f"🔥 TOP FETES THIS WEEKEND — {island_title.upper()} 🌴\n\n"
            f"Swipe through the hottest events dropping this weekend!\n"
            f"🎟️ Tickets + travel booking → link in bio\n\n"
            f"#CaribbeanCarnival #Fete #{island_title.replace(' ', '')} "
            f"#SocaMusic #CarnivalPlanner #CaribPulse #IslandLife "
            f"#PartyVibes #CarnivalSeason #WestIndies"
        )
        
        tiktok_description = (
            f"Top fetes this weekend in {island_title} 🌴🔥 "
            f"Which one yuh hittin? 🎟️ Link in bio for tickets! "
            f"#carnival #fete #{island_title.lower().replace(' ', '')} "
            f"#soca #caribbean #caribbeanvibes #fyp #foryou"
        )
        
        fb_message = (
            f"🌴 WEEKEND FETE GUIDE — {island_title.upper()} 🌴\n\n"
            f"Here are the TOP fetes happening this weekend!\n"
            f"🎟️ Buy tickets & book travel: https://carnival-planner.web.app\n\n"
            f"Drop a 🔥 if you going!\n"
            f"Tag your crew! 👇"
        )
        
        tags_list = [
            "carnival", "fete", location_filter.lower(), "caribbean",
            "socamusic", "party", "caribpulse", "islandlife",
            "carnivalseason", "westindies", "trini", "soca"
        ]
        
        with open(video_path, "rb") as f:
            files = {"video": (os.path.basename(video_path), f, "video/mp4")}
            data = {
                # Core metadata
                "location": location_filter,
                "date_generated": now,
                "source": "caribpulse_ai_auto",
                
                # Multi-platform flag — tells n8n to route to ALL platforms
                "platforms": "youtube,instagram,tiktok,facebook",
                
                # YouTube Shorts
                "youtube_title": yt_title,
                "youtube_description": yt_description,
                "youtube_tags": ",".join(tags_list),
                "youtube_category": "24",          # Entertainment
                "youtube_privacy": "public",
                "youtube_shorts": "true",
                
                # Instagram Reels
                "instagram_caption": ig_caption,
                "instagram_share_to_feed": "true",
                
                # TikTok
                "tiktok_description": tiktok_description,
                "tiktok_allow_comments": "true",
                "tiktok_allow_duet": "true",
                "tiktok_allow_stitch": "true",
                
                # Facebook Groups / Page
                "facebook_message": fb_message,
                "facebook_type": "video",
            }
            res = requests.post(webhook_url, files=files, data=data, timeout=120)
            
        if res.status_code in [200, 201, 202]:
            print(f"[SUCCESS] Multi-platform payload sent to n8n! Response: {res.text}")
            return True
        else:
            print(f"[!] n8n Webhook returned status {res.status_code}: {res.text}")
    except Exception as e:
        print(f"[!] Failed to post to n8n Webhook: {e}")
    return False

# ==========================================
# COMPILER PIPELINE
# ==========================================
def compile_fete_video(location_filter="barbados"):
    print("=" * 60)
    print(f"CaribPulse AI — Video Compiler ({location_filter.upper()})")
    print("=" * 60)
    
    # Detect voice engine — all FREE, no API keys needed
    print(f"[*] Voice engine: edge-tts (Microsoft Neural) → Kokoro-82M → gTTS fallback")

    # 1. Load events
    json_path = os.path.join(os.path.dirname(__file__), "../../events.json")
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found. Please run the exporter first.")
        sys.exit(1)
        
    with open(json_path, "r", encoding="utf-8") as f:
        events = json.load(f)

    # Filter events for location
    filtered = []
    for evt in events:
        loc = evt.get("location", "").lower()
        title = evt.get("title", "").lower()
        venue = evt.get("venue", "").lower()
        
        if (location_filter.lower() in loc or 
            location_filter.lower() in title or 
            location_filter.lower() in venue):
            filtered.append(evt)

    if not filtered:
        print(f"No events found matching: {location_filter}. Using top 5 events as fallback.")
        filtered = events[:5]
    else:
        filtered = filtered[:5]

    print(f"Selected {len(filtered)} events for video compile.")

    clips = []
    temp_files = []
    
    font_large = get_font(FONT_TITLE, 60)
    font_medium = get_font(FONT_TITLE, 42)
    font_body_bold = get_font(FONT_BODY, 28)
    font_small = get_font(FONT_BODY, 22)

    # --- SLIDE 1: INTRO ---
    intro_img = draw_neon_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(intro_img)
    draw.text((CENTER_X, 300), "🌴", font=get_font(FONT_TITLE, 90), fill=(255, 255, 255), anchor="mm")
    draw.text((CENTER_X, 460), "CARIBPULSE AI", font=font_large, fill=(236, 72, 153), anchor="mm")
    draw.text((CENTER_X, 560), "WEEKEND FETE GUIDE", font=font_medium, fill=(0, 240, 255), anchor="mm")
    draw.text((CENTER_X, 700), f"{location_filter.upper()} EDITION", font=font_body_bold, fill=(245, 158, 11), anchor="mm")
    draw.text((CENTER_X, 1080), "SWIPE FOR DETAILS", font=font_small, fill=(156, 163, 175), anchor="mm")

    intro_file = "intro_speech.mp3"
    generate_speech(
        f"What's good! Here's your CaribPulse weekend fete guide for {location_filter}. Let's see what's hot!",
        intro_file
    )
    temp_files.append(intro_file)
    
    intro_audio = AudioFileClip(intro_file)
    intro_duration = intro_audio.duration
    
    intro_clip = set_clip_duration(ImageClip(np.array(intro_img)), intro_duration)
    intro_clip = set_clip_audio(intro_clip, intro_audio)
    clips.append(intro_clip)

    # --- SLIDES 2-6: EVENTS ---
    for idx, evt in enumerate(filtered):
        event_img = draw_neon_background(WIDTH, HEIGHT)
        draw = ImageDraw.Draw(event_img)
        
        draw.text((CENTER_X, 200), f"0{idx + 1}", font=get_font(FONT_TITLE, 150), fill=(188, 52, 250, 80), anchor="mm")
        
        title_text = evt.get("title", "Fete Party")
        if len(title_text) > 24:
            lines = [title_text[:24], title_text[24:]]
            draw.text((CENTER_X, 430), lines[0], font=font_medium, fill=(255, 255, 255), anchor="mm")
            draw.text((CENTER_X, 500), lines[1], font=font_medium, fill=(255, 255, 255), anchor="mm")
        else:
            draw.text((CENTER_X, 460), title_text, font=font_medium, fill=(255, 255, 255), anchor="mm")
            
        draw.text((CENTER_X, 650), f"DATE: {evt.get('date', 'TBD')}", font=font_body_bold, fill=(0, 240, 255), anchor="mm")
        draw.text((CENTER_X, 730), f"VENUE: {evt.get('venue', 'TBD')}", font=font_body_bold, fill=(245, 158, 11), anchor="mm")
        draw.text((CENTER_X, 810), f"TICKETS: {evt.get('price', 'TBD')}", font=font_body_bold, fill=(16, 185, 129), anchor="mm")
        draw.text((CENTER_X, 1080), f"Source: {evt.get('source', 'CCP')}", font=font_small, fill=(107, 114, 128), anchor="mm")

        clean_title = title_text.replace("&", "and")
        speech_text = f"Number {idx + 1}! {clean_title}, going down at {evt.get('venue', 'a venue to be announced')}, {evt.get('date', 'date coming soon')}. You don't want to miss this one!"
        evt_audio_file = f"evt_{idx}_speech.mp3"
        generate_speech(speech_text, evt_audio_file)
        temp_files.append(evt_audio_file)
        
        evt_audio = AudioFileClip(evt_audio_file)
        evt_duration = evt_audio.duration
        
        evt_clip = set_clip_duration(ImageClip(np.array(event_img)), evt_duration)
        evt_clip = set_clip_audio(evt_clip, evt_audio)
        clips.append(evt_clip)

    # --- SLIDE 7: OUTRO ---
    outro_img = draw_neon_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(outro_img)
    draw.text((CENTER_X, 320), "🔗", font=get_font(FONT_TITLE, 90), fill=(255, 255, 255), anchor="mm")
    draw.text((CENTER_X, 480), "BUY TICKETS NOW", font=font_large, fill=(0, 240, 255), anchor="mm")
    draw.text((CENTER_X, 580), "BOOK HOLIDAYS", font=font_medium, fill=(236, 72, 153), anchor="mm")
    draw.text((CENTER_X, 720), "CARIB-PLANNER.WEB.APP", font=font_body_bold, fill=(245, 158, 11), anchor="mm")
    draw.text((CENTER_X, 1080), "Chat with our AI Concierge", font=font_small, fill=(156, 163, 175), anchor="mm")

    outro_file = "outro_speech.mp3"
    generate_speech(
        "Grab your tickets and book your trip now on Carib Planner! Follow for more weekend fete guides. Link in bio!",
        outro_file
    )
    temp_files.append(outro_file)
    
    outro_audio = AudioFileClip(outro_file)
    outro_duration = outro_audio.duration
    
    outro_clip = set_clip_duration(ImageClip(np.array(outro_img)), outro_duration)
    outro_clip = set_clip_audio(outro_clip, outro_audio)
    clips.append(outro_clip)

    # 3. Concatenate video segments
    print("[*] Concatenating slides...")
    final_video = concatenate_videoclips(clips, method="compose")

    # 4. Background Beat Mix
    music_file = "soca_drum_beat.mp3"
    bg_music_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    has_bg_music = download_audio_track(bg_music_url, music_file)

    if has_bg_music and os.path.exists(music_file):
        try:
            print("[*] Mixing background Soca instrumental...")
            bg_music = AudioFileClip(music_file)
            bg_music = get_subclip(bg_music, 0, final_video.duration)
            bg_music = set_audio_volume(bg_music, 0.08)
            
            combined_audio = CompositeAudioClip([final_video.audio, bg_music])
            final_video = set_clip_audio(final_video, combined_audio)
            temp_files.append(music_file)
        except Exception as e:
            print(f"Warning: Failed to mix background music: {e}")

    # 5. Output Video
    output_filename = f"fete_guide_{location_filter.lower()}.mp4"
    output_path = os.path.join(os.path.dirname(__file__), f"../../{output_filename}")
    
    print(f"[*] Rendering final 720p 9:16 vertical video Short to {output_filename}...")
    final_video.write_videofile(
        output_path,
        fps=15,
        codec="libx264",
        audio_codec="aac",
        preset="ultrafast",
        threads=4,
        temp_audiofile="temp-audio.m4a",
        remove_temp=True
    )

    # Clean up temp speech files
    print("[*] Cleaning up temporary files...")
    for f in temp_files:
        try:
            if os.path.exists(f) and f != music_file:
                os.remove(f)
        except:
            pass

    print("=" * 60)
    print(f"[SUCCESS] Hype Short compiled successfully: {output_path}")
    print("=" * 60)
    return output_path

if __name__ == "__main__":
    loc = sys.argv[1] if len(sys.argv) > 1 else "barbados"
    default_n8n_url = "https://sgx.app.n8n.cloud/webhook/36e6bf2c-0f5a-41ca-b639-eb8f9bcc81ae"
    webhook_url = os.environ.get("N8N_WEBHOOK_URL") or (sys.argv[2] if len(sys.argv) > 2 else default_n8n_url)
    
    print("\n[*] CaribPulse AI Video Engine")
    print(f"   Location:  {loc}")
    print(f"   Webhook:   {webhook_url}")
    print(f"   Voice:     edge-tts (Microsoft Neural) -- FREE, no API key")
    print(f"   Platforms: YouTube, Instagram, TikTok, Facebook")
    print()
    
    mp4_path = compile_fete_video(loc)
    if webhook_url:
        publish_to_n8n(mp4_path, loc, webhook_url)
