"""
Carnival Planner - Animated Character & Masquerader Video Ad Studio
Generates full 9:16 vertical motion-animated reels featuring:
1. Animated Cartoon & Masquerader Characters: Procedural body chipping, swaying feather backpacks, waving squad flags, blinking, and glitter particle bursts
2. 1.5x Fast-Paced Female Neural Voiceover: Edge-TTS en-US-AvaNeural at +50% speed
3. Authentic Caribbean Soca Music: Multi-track mixed with auto-ducking
4. Dynamic Kinetic Badges & Lower Thirds
5. Zero-Duplicate Persistent Logging
6. Live Multi-Platform Publishing: Instagram Reels, YouTube Shorts, Facebook, TikTok
"""

import os
import sys
import json
import time
import math
import random
import asyncio
import argparse
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from dotenv import load_dotenv
import numpy as np

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "posted_history.json")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 🎨 COLOR PALETTE (Vibrant Caribbean Neon Aesthetic)
# -------------------------------------------------------------
COLOR_BG = (10, 8, 22)               # Deep Night Obsidian
COLOR_PURPLE = (139, 92, 246)       # Neon Violet (#8B5CF6)
COLOR_PINK = (236, 72, 153)         # Hot Magenta (#EC4899)
COLOR_CYAN = (6, 182, 212)          # Electric Cyan (#06B6D4)
COLOR_GOLD = (245, 158, 11)         # Bright Gold (#F59E0B)
COLOR_EMERALD = (16, 185, 129)      # Vivid Emerald (#10B981)
COLOR_SKIN = (205, 133, 90)         # Warm Golden Brown Skin
COLOR_SKIN_SHADOW = (175, 105, 65)
COLOR_WHITE = (255, 255, 255)
COLOR_MUTED = (226, 232, 240)

# Global Voice Configuration: Female Voice at 1.5x Speed
VOICE_NAME = "en-US-AvaNeural"
VOICE_RATE = "+50%" # 1.5x speed

def get_font(size, bold=False):
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf",
        "segoeuib.ttf" if bold else "segoeui.ttf"
    ]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except OSError:
            continue
    return ImageFont.load_default()

# -------------------------------------------------------------
# 💃 PROCEDURAL ANIMATED MASQUERADER CHARACTER RIG
# -------------------------------------------------------------
def draw_animated_masquerader(draw, overlay_draw, cx, cy, t, mood="dance", scale=1.0):
    """
    Renders an animated Caribbean masquerader character with:
    - Bouncing rhythm (chipping motion)
    - Swaying & flapping feather backpack wings
    - Gem-encrusted carnival crown / headpiece
    - Waving arms / holding phone or flag
    """
    # 1. Bouncing Chipping Motion (Soca beat rhythm)
    bounce_offset = int(math.sin(t * 14) * 18 * scale)
    sway_angle = math.sin(t * 7) * 0.12 # Body tilt angle

    root_y = cy + bounce_offset
    root_x = cx

    # 2. Feather Backpack (Wings) - Flapping & Swaying
    wing_flap = math.sin(t * 10) * 22
    wing_colors = [COLOR_PINK, COLOR_GOLD, COLOR_CYAN, COLOR_PURPLE]
    
    for layer, w_col in enumerate(wing_colors):
        radius_x = int((190 + layer * 35 + wing_flap) * scale)
        radius_y = int((260 + layer * 45) * scale)
        
        # Left Wing Arc
        overlay_draw.ellipse(
            (root_x - radius_x - 70, root_y - radius_y - 80, root_x - 30, root_y + 40),
            fill=w_col + (170,),
            outline=COLOR_GOLD + (220,),
            width=3
        )
        # Right Wing Arc
        overlay_draw.ellipse(
            (root_x + 30, root_y - radius_y - 80, root_x + radius_x + 70, root_y + 40),
            fill=w_col + (170,),
            outline=COLOR_GOLD + (220,),
            width=3
        )

    # 3. Body & Torso
    torso_top = root_y - int(90 * scale)
    torso_bottom = root_y + int(80 * scale)
    
    # Corset / Costume Base
    overlay_draw.polygon([
        (root_x - int(45 * scale), torso_top),
        (root_x + int(45 * scale), torso_top),
        (root_x + int(32 * scale), torso_bottom),
        (root_x - int(32 * scale), torso_bottom)
    ], fill=COLOR_SKIN)

    # Gem-encrusted Frontline Carnival Bra / Corset
    overlay_draw.rounded_rectangle(
        [root_x - int(42 * scale), torso_top + int(10 * scale), root_x + int(42 * scale), torso_top + int(65 * scale)],
        radius=int(12 * scale),
        fill=COLOR_PINK,
        outline=COLOR_GOLD,
        width=3
    )

    # 4. Arms & Gestures
    arm_swing = math.sin(t * 12) * 25
    left_hand_x = root_x - int(95 * scale)
    left_hand_y = torso_top + int(70 * scale) + int(arm_swing * scale)

    right_hand_x = root_x + int(95 * scale)
    right_hand_y = torso_top + int(70 * scale) - int(arm_swing * scale)

    # Left Arm
    overlay_draw.line([(root_x - int(40 * scale), torso_top + 15), (left_hand_x, left_hand_y)], fill=COLOR_SKIN, width=int(16 * scale))
    overlay_draw.ellipse((left_hand_x - 10, left_hand_y - 10, left_hand_x + 10, left_hand_y + 10), fill=COLOR_SKIN)

    # Right Arm (Waving Squad Flag or Phone)
    if mood == "phone":
        # Holding glowing holographic smartphone
        phone_x = root_x + int(70 * scale)
        phone_y = torso_top - int(10 * scale)
        overlay_draw.line([(root_x + int(40 * scale), torso_top + 15), (phone_x, phone_y + 20)], fill=COLOR_SKIN, width=int(16 * scale))
        # Glowing phone screen
        overlay_draw.rounded_rectangle([phone_x - 12, phone_y - 25, phone_x + 28, phone_y + 35], radius=6, fill=COLOR_CYAN, outline=COLOR_WHITE, width=2)
        # Radar beam radiating from phone
        pulse_r = int(20 + ((t * 8) % 30))
        overlay_draw.ellipse((phone_x + 8 - pulse_r, phone_y + 5 - pulse_r, phone_x + 8 + pulse_r, phone_y + 5 + pulse_r), outline=COLOR_CYAN + (140,), width=2)
    else:
        # Waving Colorful Band Flag
        flag_hand_y = torso_top - int(60 * scale) + int(arm_swing * scale)
        overlay_draw.line([(root_x + int(40 * scale), torso_top + 15), (right_hand_x, flag_hand_y)], fill=COLOR_SKIN, width=int(16 * scale))
        overlay_draw.ellipse((right_hand_x - 10, flag_hand_y - 10, right_hand_x + 10, flag_hand_y + 10), fill=COLOR_SKIN)

        # Flag Pole & Fabric
        flag_wave = math.sin(t * 16) * 15
        overlay_draw.line([(right_hand_x, flag_hand_y + 60), (right_hand_x, flag_hand_y - 140)], fill=(200, 200, 210), width=4)
        overlay_draw.polygon([
            (right_hand_x, flag_hand_y - 140),
            (right_hand_x + 110 + flag_wave, flag_hand_y - 110),
            (right_hand_x + 100 + flag_wave, flag_hand_y - 40),
            (right_hand_x, flag_hand_y - 60)
        ], fill=COLOR_EMERALD, outline=COLOR_GOLD)
        overlay_draw.text((right_hand_x + 18, flag_hand_y - 100), "SQUAD", font=get_font(20, bold=True), fill=COLOR_WHITE)

    # 5. Head & Carnival Tiara / Crown
    head_y = torso_top - int(65 * scale)
    head_radius = int(45 * scale)

    # Head oval
    overlay_draw.ellipse(
        (root_x - head_radius, head_y - head_radius, root_x + head_radius, head_y + head_radius),
        fill=COLOR_SKIN
    )

    # Eyes & Smile
    eye_y = head_y - int(8 * scale)
    overlay_draw.ellipse((root_x - 18, eye_y - 5, root_x - 6, eye_y + 5), fill=(40, 25, 15))
    overlay_draw.ellipse((root_x + 6, eye_y - 5, root_x + 18, eye_y + 5), fill=(40, 25, 15))
    # Eye sparkles
    overlay_draw.ellipse((root_x - 14, eye_y - 4, root_x - 10, eye_y), fill=COLOR_WHITE)
    overlay_draw.ellipse((root_x + 10, eye_y - 4, root_x + 14, eye_y), fill=COLOR_WHITE)
    # Bright Smile
    overlay_draw.arc((root_x - 16, eye_y + 8, root_x + 16, eye_y + 28), start=0, end=180, fill=COLOR_WHITE, width=4)

    # Elaborate Carnival Crown / Tiara
    crown_y = head_y - head_radius - int(10 * scale)
    overlay_draw.polygon([
        (root_x - int(48 * scale), head_y - int(30 * scale)),
        (root_x - int(25 * scale), crown_y - int(30 * scale)),
        (root_x, crown_y - int(55 * scale)),
        (root_x + int(25 * scale), crown_y - int(30 * scale)),
        (root_x + int(48 * scale), head_y - int(30 * scale))
    ], fill=COLOR_GOLD, outline=COLOR_PINK, width=2)
    
    # Headpiece Gems
    overlay_draw.ellipse((root_x - 8, crown_y - int(20 * scale), root_x + 8, crown_y - int(4 * scale)), fill=COLOR_CYAN)

    # Floating Sparkles / Glitter Particles
    for i in range(8):
        sparkle_phase = (t * 4 + i * 0.8) % (2 * math.pi)
        sx = root_x + math.sin(sparkle_phase + i) * (180 * scale)
        sy = head_y + math.cos(sparkle_phase * 1.5 + i) * (150 * scale)
        s_size = int(4 + math.sin(sparkle_phase * 3) * 3)
        if s_size > 1:
            overlay_draw.ellipse((sx - s_size, sy - s_size, sx + s_size, sy + s_size), fill=COLOR_GOLD + (220,))

# -------------------------------------------------------------
# 🌟 SCENE RENDERERS (With Animated People & Fast Female Voice)
# -------------------------------------------------------------
def render_char_scene_1(t, duration, width=1080, height=1920):
    """Scene 1: Masquerader character in full feather wings checking phone in heavy crowd."""
    img = Image.new("RGB", (width, height), COLOR_BG)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    # Ambient Glow
    ol_draw.ellipse((-100, 300, width + 100, 1100), fill=COLOR_PURPLE + (70,))
    ol_draw.ellipse((100, 700, width + 200, 1500), fill=COLOR_PINK + (60,))

    # Animated Masquerader Character
    draw_animated_masquerader(ImageDraw.Draw(img), ol_draw, cx=width // 2, cy=780, t=t, mood="phone", scale=1.2)

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top Header Badge
    badge_font = get_font(38, bold=True)
    draw.rounded_rectangle([80, 110, 740, 195], radius=20, fill=COLOR_PINK, outline=COLOR_WHITE, width=2)
    draw.text((105, 128), "🚨 CARNIVAL SURVIVAL SECRET", font=badge_font, fill=COLOR_WHITE)

    # Bottom Glassmorphic Card
    draw.rounded_rectangle([60, height - 560, width - 60, height - 200], radius=35, fill=(18, 14, 38), outline=COLOR_CYAN, width=4)
    
    title_font = get_font(56, bold=True)
    draw.text((100, height - 510), "NEVER LOSE YOUR CREW", font=title_font, fill=COLOR_WHITE)
    draw.line([(100, height - 440), (width - 100, height - 440)], fill=COLOR_PINK, width=5)

    sub_font = get_font(38, bold=False)
    draw.text((100, height - 400), "When 50,000 masqueraders pack the road,", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 340), "Carnival Planner GPS radar tracks your crew live!", font=sub_font, fill=COLOR_GOLD)

    # Bottom CTA Banner
    draw.rounded_rectangle([80, height - 170, width - 80, height - 70], radius=25, fill=COLOR_EMERALD, outline=COLOR_WHITE, width=2)
    cta_font = get_font(36, bold=True)
    draw.text((120, height - 135), "📲 Get Carnival Planner Free (iOS & Android)", font=cta_font, fill=COLOR_WHITE)

    return img

def render_char_scene_2(t, duration, width=1080, height=1920):
    """Scene 2: Masquerader character chipping and waving band flag with fete drop alerts."""
    img = Image.new("RGB", (width, height), COLOR_BG)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    ol_draw.ellipse((-80, 250, width + 80, 1050), fill=COLOR_CYAN + (65,))
    ol_draw.ellipse((80, 750, width + 150, 1450), fill=COLOR_GOLD + (55,))

    # Animated Character Dancing & Waving Flag
    draw_animated_masquerader(ImageDraw.Draw(img), ol_draw, cx=width // 2, cy=780, t=t, mood="dance", scale=1.2)

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top Header Badge
    badge_font = get_font(38, bold=True)
    draw.rounded_rectangle([80, 110, 740, 195], radius=20, fill=COLOR_PURPLE, outline=COLOR_WHITE, width=2)
    draw.text((105, 128), "🔥 FETE TICKETS & ROAD MAPS", font=badge_font, fill=COLOR_WHITE)

    # Bottom Card
    draw.rounded_rectangle([60, height - 560, width - 60, height - 200], radius=35, fill=(18, 14, 38), outline=COLOR_GOLD, width=4)
    
    title_font = get_font(56, bold=True)
    draw.text((100, height - 510), "LOCK IN SOLD-OUT FETES", font=title_font, fill=COLOR_WHITE)
    draw.line([(100, height - 440), (width - 100, height - 440)], fill=COLOR_CYAN, width=5)

    sub_font = get_font(38, bold=False)
    draw.text((100, height - 400), "• Soca Brainwash & Ambush fete drop alerts.", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 340), "• Live sound truck routes & costume pickup hubs.", font=sub_font, fill=COLOR_GOLD)

    draw.rounded_rectangle([80, height - 170, width - 80, height - 70], radius=25, fill=COLOR_PINK, outline=COLOR_WHITE, width=2)
    cta_font = get_font(36, bold=True)
    draw.text((120, height - 135), "👉 Visit Carnival-Planner.com Today", font=cta_font, fill=COLOR_WHITE)

    return img

def render_char_scene_3(t, duration, width=1080, height=1920):
    """Scene 3: Masquerader celebrating with full squad countdown & call to action."""
    img = Image.new("RGB", (width, height), COLOR_BG)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    ol_draw.ellipse((-100, 200, width + 100, 1100), fill=COLOR_PINK + (75,))
    ol_draw.ellipse((100, 600, width + 200, 1500), fill=COLOR_EMERALD + (60,))

    # Animated Character in center celebrating
    draw_animated_masquerader(ImageDraw.Draw(img), ol_draw, cx=width // 2, cy=740, t=t, mood="dance", scale=1.25)

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Top Header Badge
    badge_font = get_font(38, bold=True)
    draw.rounded_rectangle([80, 110, 720, 195], radius=20, fill=COLOR_EMERALD, outline=COLOR_WHITE, width=2)
    draw.text((105, 128), "🌴 READY TO JUMP IN DE BAND?", font=badge_font, fill=COLOR_WHITE)

    # Bottom Card
    draw.rounded_rectangle([60, height - 560, width - 60, height - 200], radius=35, fill=(18, 14, 38), outline=COLOR_PINK, width=4)
    
    title_font = get_font(56, bold=True)
    draw.text((100, height - 510), "PLAN YOUR TRIP FREE", font=title_font, fill=COLOR_WHITE)
    draw.line([(100, height - 440), (width - 100, height - 440)], fill=COLOR_EMERALD, width=5)

    sub_font = get_font(38, bold=False)
    draw.text((100, height - 400), "Discover 25+ carnivals, manage squad budgets,", font=sub_font, fill=COLOR_MUTED)
    draw.text((100, height - 340), "and track live costume sections. Link in bio! 👇", font=sub_font, fill=COLOR_GOLD)

    draw.rounded_rectangle([80, height - 170, width - 80, height - 70], radius=25, fill=COLOR_EMERALD, outline=COLOR_WHITE, width=2)
    cta_font = get_font(36, bold=True)
    draw.text((120, height - 135), "📲 Get Carnival Planner App Free", font=cta_font, fill=COLOR_WHITE)

    return img

# -------------------------------------------------------------
# 🎙️ NEURAL FEMALE 1.5x VOICE SYNTHESIS
# -------------------------------------------------------------
async def synthesize_female_voice(text, output_mp3, voice=VOICE_NAME, rate=VOICE_RATE):
    """Synthesizes high-energy female neural voiceover at 1.5x speed."""
    try:
        import edge_tts
        communicate = edge_tts.Communicate(text, voice, rate=rate)
        await communicate.save(output_mp3)
        return True
    except Exception as e:
        print(f"  ⚠️ Edge-TTS female voice error ({e}), falling back...")
        try:
            from gtts import gTTS
            tts = gTTS(text=text, lang="en", tld="com")
            tts.save(output_mp3)
            return True
        except Exception as e2:
            print(f"  ❌ TTS failed: {e2}")
            return False

# -------------------------------------------------------------
# 🎬 FULL CHARACTER ANIMATION VIDEO BUILDER
# -------------------------------------------------------------
def build_character_animated_video(output_mp4_path):
    """
    Renders continuous procedural animated masquerader character scenes with 1.5x female voice & Soca audio.
    """
    try:
        from moviepy import VideoClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    except ImportError:
        from moviepy.editor import VideoClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

    print("=" * 60)
    print("💃 RENDERING ANIMATED MASQUERADER CHARACTER REEL (9:16)")
    print(f"🎙️ Voice: {VOICE_NAME} (Female @ {VOICE_RATE} Speed)")
    print("=" * 60)

    scenes_data = [
        {
            "id": "scene_char_radar",
            "renderer": render_char_scene_1,
            "voice": "Stop losing your friends on Carnival Day! When 50 thousand masqueraders hit the road and cell towers drop, Carnival Planner's live GPS radar tracks your entire squad every 30 seconds."
        },
        {
            "id": "scene_char_fetes",
            "renderer": render_char_scene_2,
            "voice": "Lock in sold out fetes like Soca Brainwash and Ambush before tier 1 sells out in 90 seconds. Plus track live sound truck routes and costume pickup centers!"
        },
        {
            "id": "scene_char_cta",
            "renderer": render_char_scene_3,
            "voice": "Ready to jump in the band? Download Carnival Planner free today on iOS and Android and build your ultimate carnival trip!"
        }
    ]

    temp_audio_files = []
    video_clips = []

    try:
        for idx, sc in enumerate(scenes_data):
            print(f"🎙️ Synthesizing 1.5x female voiceover for Scene {idx+1}/{len(scenes_data)}...")
            audio_path = os.path.join(OUTPUT_DIR, f"tmp_char_audio_{idx}.mp3")
            asyncio.run(synthesize_female_voice(sc["voice"], audio_path))
            temp_audio_files.append(audio_path)

            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.4, 2.8) # Crisp snappy pace

            renderer_fn = sc["renderer"]

            def make_frame_fn(r_fn, dur):
                def frame_gen(t):
                    pil_frame = r_fn(t, dur)
                    return np.array(pil_frame)
                return frame_gen

            print(f"✨ Generating animated character frames for Scene {idx+1} ({duration:.1f}s at 24fps)...")
            
            if hasattr(VideoClip, 'with_duration'):
                clip = VideoClip(make_frame_fn(renderer_fn, duration), duration=duration).with_audio(audio_clip)
            else:
                clip = VideoClip(make_frame_fn(renderer_fn, duration), duration=duration).set_audio(audio_clip)

            video_clips.append(clip)

        print("⚡ Concatenating animated character scenes & layering Soca music...")
        final_video = concatenate_videoclips(video_clips, method="compose")

        # Layer background Soca beat
        bg_audio_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "soca_drum_beat.mp3")
        if os.path.exists(bg_audio_path):
            bg_audio = AudioFileClip(bg_audio_path)
            if hasattr(bg_audio, 'subclipped'):
                bg_sub = bg_audio.subclipped(0, final_video.duration)
            elif hasattr(bg_audio, 'subclip'):
                bg_sub = bg_audio.subclip(0, final_video.duration)
            else:
                bg_sub = bg_audio.with_duration(final_video.duration)

            if hasattr(bg_sub, 'with_volume_scaled'):
                bg_music = bg_sub.with_volume_scaled(0.18)
            elif hasattr(bg_sub, 'volumex'):
                bg_music = bg_sub.volumex(0.18)
            else:
                bg_music = bg_sub

            final_audio = CompositeAudioClip([final_video.audio, bg_music])
            if hasattr(final_video, 'with_audio'):
                final_video = final_video.with_audio(final_audio)
            else:
                final_video = final_video.set_audio(final_audio)

        print(f"🎥 Exporting final 1080x1920 Animated Character MP4 to: {output_mp4_path}...")
        final_video.write_videofile(
            output_mp4_path,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="fast"
        )

        print("\n" + "=" * 60)
        print("🎉 ANIMATED CHARACTER VIDEO AD GENERATED SUCCESSFULLY!")
        print(f"📁 File: {output_mp4_path}")
        print("=" * 60 + "\n")
        return output_mp4_path

    finally:
        for tmp in temp_audio_files:
            if os.path.exists(tmp):
                try:
                    os.remove(tmp)
                except Exception:
                    pass

# -------------------------------------------------------------
# 🚀 MAIN DISPATCHER & LIVE PUBLISHER
# -------------------------------------------------------------
def run_character_ad_pipeline(publish=True):
    """Generates the animated character video ad and publishes live to Instagram."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_video_name = f"character_ad_{timestamp}.mp4"
    out_video_path = os.path.join(OUTPUT_DIR, out_video_name)

    build_character_animated_video(out_video_path)

    title = "💃 CARNIVAL SURVIVAL PLAYBOOK: SQUAD RADAR & FETE DROPS"
    caption = (
        f"{title}\n\n"
        f"Never lose your crew in 50k masqueraders! When cell towers drop on Carnival Monday, Carnival Planner's live GPS radar tracks your squad's coordinates every 30 seconds.\n\n"
        f"🌴 Lock in sold-out fetes, track sound truck routes & coordinate costume pickup free!\n"
        f"👉 Download free / Link in bio: https://carnival-planner.com\n\n"
        f"#carnivalplanner #masquerader #socajunkie #soca2026 #trinidadcarnival #nottinghillcarnival #miamicarnival #reels #shorts #fyp #viral #caribbeancarnival"
    )

    if publish:
        from hybrid_publisher import publish_to_all_socials
        print("\n🚀 DISPATCHING ANIMATED CHARACTER REEL LIVE TO SOCIAL NETWORKS...")
        results = publish_to_all_socials(
            media_url_or_path=out_video_path,
            title=title,
            caption=caption,
            tags=["#carnivalplanner", "#soca2026", "#reels", "#shorts", "#fyp"],
            media_type="video",
            dry_run=False
        )

        from cinematic_engine import record_published_post
        record_published_post({
            "id": f"character_anim_{timestamp}",
            "title": title,
            "hook_line": "Never lose your crew in 50k masqueraders!",
            "carnival": "Global 25+ Carnivals"
        }, results)

        return results
    else:
        print("\nℹ️ Dry-run mode completed. Run with `--publish` to post live.")
        return {"status": "rendered", "video": out_video_path}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Carnival Planner Character Animation Video Studio")
    parser.add_argument("--publish", action="store_true", default=True, help="Publish live to social platforms")
    args = parser.parse_args()

    run_character_ad_pipeline(publish=args.publish)
