"""
Carnival Planner - Cinematic AI Social Ad & Reel Studio
Generates broadcast-quality 9:16 vertical viral reels with:
1. AI Creative Director: High-hook scriptwriting powered by Gemini & Viral Frameworks
2. Neural Voiceover: High-energy natural voice synthesis via Edge-TTS
3. Cinematic 9:16 Compositing: Glassmorphic motion graphics, kinetic subtitles, & dynamic B-roll
4. Authentic Caribbean Soundtrack: Auto-ducked Soca drum rhythms
5. Hybrid Social Publisher: Direct publishing to Instagram Reels, Facebook, YouTube Shorts & TikTok
"""

import os
import sys
import json
import time
import random
import asyncio
import tempfile
import argparse
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

# -------------------------------------------------------------
# 🎨 COLOR PALETTE & VISUAL SYSTEM (Carnival Planner V3.0)
# -------------------------------------------------------------
COLOR_BG_DARK = (10, 8, 22)         # Deep Obsidian Night
COLOR_CARD_BG = (22, 18, 42)        # Glassmorphic container
COLOR_PURPLE = (139, 92, 246)       # Neon Violet (#8B5CF6)
COLOR_PINK = (236, 72, 153)         # Hot Magenta (#EC4899)
COLOR_CYAN = (6, 182, 212)          # Electric Cyan (#06B6D4)
COLOR_GOLD = (245, 158, 11)         # Vibrant Gold (#F59E0B)
COLOR_EMERALD = (16, 185, 129)      # Vivid Green (#10B981)
COLOR_TEXT_MAIN = (255, 255, 255)   # Crisp White
COLOR_TEXT_MUTED = (203, 213, 225)  # Silver Slate

# -------------------------------------------------------------
# 🌟 HIGH-CONVERTING CINEMATIC SCRIPT TEMPLATES (AI Fallback / Core Bank)
# -------------------------------------------------------------
VIRAL_AD_CAMPAIGNS = [
    {
        "id": "squad_radar_lost_friends",
        "category": "APP_FEATURE",
        "carnival": "Notting Hill, NYC & Miami 2026",
        "hook_badge": "🚨 MASQUERADER SURVIVAL HACK",
        "title": "NEVER LOSE YOUR SQUAD ON THE ROAD",
        "hook_line": "Stop losing your friends on Carnival Day! When 50 thousand people pack the road and cell service drops, here is how you stay connected.",
        "scenes": [
            {
                "badge": "THE PROBLEM",
                "heading": "Cell Towers Jammed 📵",
                "subtext": "You turn around for 2 seconds to grab a drink, and your entire squad vanished into a sea of feathers.",
                "voice": "You turn around for two seconds to grab a drink, and your whole squad is gone in a sea of feathers."
            },
            {
                "badge": "THE FIX",
                "heading": "Live Squad Mesh Radar 📍",
                "subtext": "Carnival Planner broadcasts live GPS pins between squad members every 30 seconds, even in heavy crowds.",
                "voice": "The fix? Carnival Planner app has a live squad radar that tracks your crew's coordinates every 30 seconds."
            },
            {
                "badge": "BONUS",
                "heading": "Emergency Distress SOS 🚨",
                "subtext": "One tap flashes an emergency alert to all squad screens with your exact venue and meetup point.",
                "voice": "Plus, one tap sends a distress SOS to your crew with your exact location and meetup point."
            }
        ],
        "cta_heading": "Get Carnival Planner App Free",
        "cta_voice": "Download Carnival Planner free today on iOS and Android. Link in bio!"
    },
    {
        "id": "fete_ticket_sold_out_alert",
        "category": "FETE_DROPS",
        "carnival": "Trinidad Carnival 2027 & Crop Over",
        "hook_badge": "🔥 FETE TICKETS ALERT",
        "title": "HOW TO NEVER MISS A FETE DROP",
        "hook_line": "Soca Brainwash, AMBUSH, and Phuket sell out in under 90 seconds. If you don't have this setup, you're buying overpriced scalper tickets.",
        "scenes": [
            {
                "badge": "MISTAKE #1",
                "heading": "Waiting for IG Stories ⏳",
                "subtext": "By the time promoters post tickets are live on Instagram, all Tier 1 tickets are already sold out.",
                "voice": "Mistake number one: waiting for promoter Instagram stories. By the time they post, Tier 1 is gone."
            },
            {
                "badge": "PRO SECRET",
                "heading": "Automated Drop Alerts ⚡",
                "subtext": "Track ticket release dates, tier pricing, and direct purchase links in one synchronized calendar.",
                "voice": "Instead, track real-time ticket drops, tier pricing, and direct release links inside Carnival Planner."
            },
            {
                "badge": "BUDGET HACK",
                "heading": "Squad Cost Splitter 💰",
                "subtext": "Calculate hotel, transport, costume deposits, and fete passes in one shared squad currency.",
                "voice": "You can even split costume deposits, fete tickets, and transport costs with your squad."
            }
        ],
        "cta_heading": "Build Your 2026/2027 Itinerary Free",
        "cta_voice": "Plan your ultimate carnival season free at Carnival-Planner.com! Link in bio."
    },
    {
        "id": "costume_marketplace_resale",
        "category": "MARKETPLACE",
        "carnival": "Trinidad, Jamaica & Barbados",
        "hook_badge": "👙 COSTUME SECRETS",
        "title": "BUY & SELL CARNIVAL COSTUMES SAFELY",
        "hook_line": "Can't make it to Carnival this year? Or desperate for a sold-out frontline costume? Stop risking money with shady DMs.",
        "scenes": [
            {
                "badge": "THE DANGER",
                "heading": "Beware of DM Scams ⚠️",
                "subtext": "Buying costumes through unregulated group chats leads to fake receipts and missing band registrations.",
                "voice": "Buying costumes through random DMs is risky. Fake receipts and scammers will ruin your trip."
            },
            {
                "badge": "THE SOLUTION",
                "heading": "Verified Peer-to-Peer 🛡️",
                "subtext": "Carnival Planner's Costume Marketplace connects verified masqueraders with Stripe escrow protection.",
                "voice": "Use Carnival Planner's verified marketplace. Masqueraders buy and sell sections with secure buyer protection."
            },
            {
                "badge": "AR PREVIEW",
                "heading": "3D AR Costume Fitting 🕶️",
                "subtext": "Preview band sections and headpieces in 3D Augmented Reality right on your phone before you buy.",
                "voice": "You can even preview costumes and headpieces in 3D augmented reality right from your phone."
            }
        ],
        "cta_heading": "Explore Verified Marketplace",
        "cta_voice": "Check out the verified costume marketplace on Carnival-Planner.com today!"
    }
]

# -------------------------------------------------------------
# 🤖 AI CREATIVE SCRIPTWRITER (Gemini Generative AI Integration)
# -------------------------------------------------------------
def generate_ai_creative_ad(carnival_context="Notting Hill Carnival & NYC Labor Day 2026"):
    """
    Uses Google Gemini Generative AI to author a dynamic, hyper-engaging viral ad script.
    Falls back gracefully to high-converting campaign bank if API key is not configured.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("ℹ️ GEMINI_API_KEY not found in env — selecting from top-tier viral ad campaign bank.")
        return random.choice(VIRAL_AD_CAMPAIGNS)

    print(f"🧠 Prompting Gemini AI to write a high-converting cinematic ad for: {carnival_context}...")
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
        You are a master viral TikTok & Reels marketing director specializing in Caribbean Carnivals, Soca events, and travel apps.
        Write a 35-second high-energy, pattern-interrupt cinematic video ad promoting 'Carnival Planner' (carnival-planner.com).
        
        Target Event: {carnival_context}
        Key App Features to pick from:
        - Live Squad Radar (GPS locator on the road even in heavy crowds)
        - Fete Drop Alerts & Ticket Tracker (Soca Brainwash, AMBUSH, etc.)
        - Budget & Expense Splitter (Costume deposits, flights, fetes)
        - Peer-to-Peer Costume Marketplace (with Stripe protection & 3D AR previews)
        - Soca Passport & Bounties
        
        Return STRICT JSON matching this exact structure:
        {{
            "id": "ai_generated_ad",
            "category": "DYNAMIC_AI",
            "carnival": "{carnival_context}",
            "hook_badge": "🚨 3-5 word uppercase badge with emoji",
            "title": "PUNCHY 4-6 WORD ALL-CAPS HEADLINE",
            "hook_line": "High-hook voiceover line (under 18 words) that stops the scroll.",
            "scenes": [
                {{
                    "badge": "SCENE 1 BADGE",
                    "heading": "Short Scene 1 Heading",
                    "subtext": "Brief 1-sentence on-screen text.",
                    "voice": "Conversational voiceover sentence for scene 1."
                }},
                {{
                    "badge": "SCENE 2 BADGE",
                    "heading": "Short Scene 2 Heading",
                    "subtext": "Brief 1-sentence on-screen text.",
                    "voice": "Conversational voiceover sentence for scene 2."
                }},
                {{
                    "badge": "SCENE 3 BADGE",
                    "heading": "Short Scene 3 Heading",
                    "subtext": "Brief 1-sentence on-screen text.",
                    "voice": "Conversational voiceover sentence for scene 3."
                }}
            ],
            "cta_heading": "Get Carnival Planner App Free",
            "cta_voice": "Download Carnival Planner free today on iOS and Android. Link in bio!"
        }}
        """

        response = model.generate_content(prompt)
        text = response.text.strip()
        
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()

        data = json.loads(text)
        print("✨ Gemini AI successfully composed a brand-new cinematic script!")
        return data

    except Exception as e:
        print(f"⚠️ Gemini AI scriptwriting fallback: {e}")
        return random.choice(VIRAL_AD_CAMPAIGNS)

# -------------------------------------------------------------
# 🎙️ NEURAL VOICEOVER SYNTHESIS (Edge-TTS Studio Quality)
# -------------------------------------------------------------
async def synthesize_neural_speech(text, output_mp3, voice="en-US-ChristopherNeural"):
    """
    Synthesizes crisp, studio-grade neural voiceover audio using Edge-TTS with fallback to gTTS.
    """
    try:
        import edge_tts
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(output_mp3)
        return True
    except Exception as e:
        print(f"  ⚠️ Edge-TTS unavailable ({e}), falling back to gTTS...")
        try:
            from gtts import gTTS
            tts = gTTS(text=text, lang="en", tld="com")
            tts.save(output_mp3)
            return True
        except Exception as e2:
            print(f"  ❌ TTS synthesis failed: {e2}")
            return False

# -------------------------------------------------------------
# 🎨 1080x1920 CINEMATIC FRAME RENDERER
# -------------------------------------------------------------
def get_font(size, bold=False):
    """Loads system TrueType font with fallbacks."""
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

def render_cinematic_slide(badge, heading, subtext, step_num=None, is_hook=False, is_cta=False, width=1080, height=1920):
    """
    Renders a vertical 1080x1920 high-contrast, glassmorphism frame with vibrant Caribbean ambient lighting.
    """
    img = Image.new("RGB", (width, height), COLOR_BG_DARK)
    
    # 1. Vibrant Ambient Nebula Glows
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)
    
    # Dual colorful glowing orbs
    glow_color_1 = COLOR_PINK + (130,) if not is_cta else COLOR_EMERALD + (130,)
    glow_color_2 = COLOR_PURPLE + (110,)
    glow_color_3 = COLOR_CYAN + (90,)
    
    ol_draw.ellipse((-180, -150, width // 2 + 250, height // 3 + 100), fill=glow_color_1)
    ol_draw.ellipse((width // 3, height // 2, width + 250, height + 250), fill=glow_color_2)
    ol_draw.ellipse((50, height // 3, width - 50, height * 2 // 3), fill=glow_color_3)

    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # 2. Top Header Badge
    badge_font = get_font(36, bold=True)
    badge_color = COLOR_PINK if is_hook else (COLOR_EMERALD if is_cta else COLOR_PURPLE)
    
    draw.rounded_rectangle([70, 140, 680, 220], radius=18, fill=badge_color, outline=COLOR_TEXT_MAIN, width=2)
    draw.text((95, 158), badge, font=badge_font, fill=COLOR_TEXT_MAIN)

    # 3. Main Glassmorphic Card Container
    card_top = 280
    card_bottom = height - 260
    draw.rounded_rectangle([60, card_top, width - 60, card_bottom], radius=40, fill=COLOR_CARD_BG, outline=badge_color, width=4)

    # Decorative Step Highlight
    if step_num:
        num_font = get_font(130, bold=True)
        draw.text((110, card_top + 40), f"#{step_num}", font=num_font, fill=COLOR_GOLD)

    # 4. Heading
    heading_font = get_font(60 if not is_hook else 68, bold=True)
    heading_y = card_top + 200 if step_num else card_top + 80
    
    # Word wrap heading
    words = heading.split()
    heading_lines = []
    curr = ""
    for w in words:
        if len(curr + " " + w) < 22:
            curr += (" " + w if curr else w)
        else:
            heading_lines.append(curr)
            curr = w
    if curr:
        heading_lines.append(curr)

    for line in heading_lines[:3]:
        draw.text((110, heading_y), line, font=heading_font, fill=COLOR_TEXT_MAIN)
        heading_y += 85

    # Glowing Accent Divider
    draw.line([(110, heading_y + 30), (width - 110, heading_y + 30)], fill=COLOR_CYAN, width=6)

    # 5. Subtext Copy
    sub_font = get_font(42, bold=False)
    sub_y = heading_y + 70
    
    sub_words = subtext.split()
    sub_lines = []
    curr = ""
    for w in sub_words:
        if len(curr + " " + w) < 28:
            curr += (" " + w if curr else w)
        else:
            sub_lines.append(curr)
            curr = w
    if curr:
        sub_lines.append(curr)

    for line in sub_lines[:6]:
        draw.text((110, sub_y), line, font=sub_font, fill=COLOR_TEXT_MUTED)
        sub_y += 65

    # 6. Bottom Call to Action Footer
    footer_bg = COLOR_PINK if not is_cta else COLOR_EMERALD
    draw.rounded_rectangle([90, height - 210, width - 90, height - 90], radius=25, fill=footer_bg, outline=COLOR_TEXT_MAIN, width=2)
    
    cta_text = "📲 Get Carnival Planner Free (iOS & Android)" if not is_cta else "🚀 Visit Carnival-Planner.com Today"
    footer_font = get_font(38, bold=True)
    draw.text((120, height - 165), cta_text, font=footer_font, fill=COLOR_TEXT_MAIN)

    return img

# -------------------------------------------------------------
# 🎬 FULL VIDEO COMPOSITOR (MoviePy 2.x & 1.x Compatible)
# -------------------------------------------------------------
def build_cinematic_video(ad_data, output_mp4_path):
    """
    Assembles voiceovers, animated slide frames, and background Soca music into a crisp 1080x1920 vertical MP4.
    """
    try:
        from moviepy import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    except ImportError:
        from moviepy.editor import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

    print("\n" + "=" * 60)
    print("🎬 RENDERING CINEMATIC 9:16 SOCIAL REEL")
    print(f"📌 Campaign: {ad_data.get('title')}")
    print("=" * 60)

    slides_config = []
    
    # 1. Hook Slide
    slides_config.append({
        "badge": ad_data.get("hook_badge", "🔥 CARNIVAL SECRETS"),
        "heading": ad_data.get("title", "CARNIVAL SURVIVAL GUIDE"),
        "subtext": ad_data.get("hook_line", "Everything you need to know before heading on the road!"),
        "voice": ad_data.get("hook_line"),
        "is_hook": True,
        "is_cta": False,
        "step_num": None
    })

    # 2. Main Content Scenes
    for idx, scene in enumerate(ad_data.get("scenes", [])):
        slides_config.append({
            "badge": scene.get("badge", f"TIP #{idx+1}"),
            "heading": scene.get("heading", f"Key Secret #{idx+1}"),
            "subtext": scene.get("subtext", ""),
            "voice": scene.get("voice", scene.get("subtext")),
            "is_hook": False,
            "is_cta": False,
            "step_num": str(idx + 1)
        })

    # 3. Call to Action Slide
    slides_config.append({
        "badge": "🚀 READY FOR DE ROAD?",
        "heading": ad_data.get("cta_heading", "Plan Your Trip Free"),
        "subtext": "Discover 25+ carnivals, manage squad budgets, and track live fete drops.\n\nLink in bio / description! 👇",
        "voice": ad_data.get("cta_voice", "Download Carnival Planner free today and build your ultimate carnival trip!"),
        "is_hook": False,
        "is_cta": True,
        "step_num": None
    })

    video_clips = []
    temp_files = []

    try:
        for idx, s in enumerate(slides_config):
            print(f"🎨 Rendering scene {idx+1}/{len(slides_config)}: '{s['heading'][:30]}'...")
            
            # Frame image
            img = render_cinematic_slide(
                badge=s["badge"],
                heading=s["heading"],
                subtext=s["subtext"],
                step_num=s["step_num"],
                is_hook=s["is_hook"],
                is_cta=s["is_cta"]
            )
            frame_path = os.path.join(OUTPUT_DIR, f"tmp_cine_frame_{idx}.png")
            img.save(frame_path)
            temp_files.append(frame_path)

            # Neural TTS Audio
            audio_path = os.path.join(OUTPUT_DIR, f"tmp_cine_audio_{idx}.mp3")
            asyncio.run(synthesize_neural_speech(s["voice"], audio_path))
            temp_files.append(audio_path)

            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.5, 3.2)

            if hasattr(ImageClip, 'with_duration'):
                clip = ImageClip(frame_path).with_duration(duration).with_audio(audio_clip)
            else:
                clip = ImageClip(frame_path).set_duration(duration).set_audio(audio_clip)

            video_clips.append(clip)

        print("⚡ Stitching video timeline & layering Soca audio...")
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

            # Auto-ducking (soft 18% background volume)
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

        print(f"🎥 Exporting final 1080x1920 MP4 to: {output_mp4_path}...")
        final_video.write_videofile(
            output_mp4_path,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="fast"
        )

        print("\n" + "=" * 60)
        print("🎉 CINEMATIC REEL GENERATED SUCCESSFULLY!")
        print(f"📁 Video Location: {output_mp4_path}")
        print("=" * 60 + "\n")
        return output_mp4_path

    finally:
        for tmp in temp_files:
            if os.path.exists(tmp):
                try:
                    os.remove(tmp)
                except Exception:
                    pass

# -------------------------------------------------------------
# 🚀 MAIN PIPELINE DISPATCHER
# -------------------------------------------------------------
def run_cinematic_pipeline(carnival="Notting Hill & NYC Carnival 2026", publish=False):
    """
    Full pipeline execution:
    1. AI generates script & hook
    2. Synthesizes voice & renders cinematic 9:16 MP4
    3. Formats viral caption & hashtag stack
    4. Automatically publishes to Instagram, Facebook, YouTube & TikTok
    """
    # 1. Generate Script
    ad_data = generate_ai_creative_ad(carnival)
    
    # 2. Render Video
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_video_name = f"cinematic_reel_{timestamp}.mp4"
    out_video_path = os.path.join(OUTPUT_DIR, out_video_name)
    
    build_cinematic_video(ad_data, out_video_path)

    # 3. Assemble Captions & Tags
    from viral_copywriter import HASHTAG_STACKS
    broad = HASHTAG_STACKS["broad_viral"]
    niche = HASHTAG_STACKS["caribbean_niche"]
    tags = list(set(broad + niche + ["#carnivalplanner", "#caribbeancarnival", "#soca2026"]))
    tag_str = " ".join(tags)

    full_caption = (
        f"🚨 {ad_data.get('title')}\n\n"
        f"{ad_data.get('hook_line')}\n\n"
        f"📲 Plan your entire trip free on Carnival Planner! Discover 25+ carnivals, coordinate squads & lock in fetes.\n"
        f"👉 Download free / Link in bio: https://carnival-planner.com\n\n"
        f"{tag_str}"
    )

    print("📝 GENERATED VIRAL CAPTION:\n" + "-" * 40)
    print(full_caption)
    print("-" * 40)

    # 4. Multi-Platform Auto-Publish
    if publish:
        from hybrid_publisher import publish_to_all_socials
        print("\n🚀 DISPATCHING LIVE POST TO ALL SOCIAL NETWORKS...")
        results = publish_to_all_socials(
            media_url_or_path=out_video_path,
            title=ad_data.get("title", "Carnival Planner Ad"),
            caption=full_caption,
            tags=tags,
            media_type="video",
            dry_run=False
        )
        return results
    else:
        print("\nℹ️ Dry-run mode completed. Run with `--publish` to post live across social channels.")
        return {"status": "rendered", "video": out_video_path}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Carnival Planner Cinematic Video Studio")
    parser.add_argument("--carnival", default="Notting Hill & NYC Carnival 2026", help="Target Carnival Event")
    parser.add_argument("--publish", action="store_true", help="Post live to connected social platforms")
    args = parser.parse_args()

    run_cinematic_pipeline(carnival=args.carnival, publish=args.publish)
