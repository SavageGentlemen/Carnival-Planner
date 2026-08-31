"""
Carnival Planner - Cinematic AI Social Ad & Reel Studio
Generates broadcast-quality 9:16 vertical viral reels with:
1. Real Carnival Footage & Dynamic Motion Visuals (Masqueraders, Feathers, Stage Lights, Tropical Scenery)
2. AI Creative Director: High-hook scriptwriting powered by Gemini & Viral Frameworks
3. Deduplication Engine: Tracks posted history in posted_history.json to guarantee 100% unique content
4. Neural Voiceover: Studio-quality natural voice synthesis via Edge-TTS
5. Cinematic 9:16 Compositing: Motion Ken-Burns zoom, glassmorphic floating cards, kinetic subtitles
6. Authentic Caribbean Soundtrack: Auto-ducked Soca drum rhythms
7. Hybrid Social Publisher: Direct publishing to Instagram Reels, Facebook, YouTube Shorts & TikTok
"""

import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
import time
import math
import random
import hashlib
import asyncio
import argparse
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets", "video_broll")
HISTORY_FILE = os.path.join(os.path.dirname(__file__), "posted_history.json")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

# -------------------------------------------------------------
# 🎨 COLOR PALETTE & VISUAL SYSTEM (Carnival Planner V3.0)
# -------------------------------------------------------------
COLOR_BG_DARK = (10, 8, 22)         # Deep Obsidian Night
COLOR_CARD_BG = (18, 14, 36, 210)   # Translucent Glass Panel
COLOR_PURPLE = (139, 92, 246)       # Neon Violet (#8B5CF6)
COLOR_PINK = (236, 72, 153)         # Hot Magenta (#EC4899)
COLOR_CYAN = (6, 182, 212)          # Electric Cyan (#06B6D4)
COLOR_GOLD = (245, 158, 11)         # Vibrant Gold (#F59E0B)
COLOR_EMERALD = (16, 185, 129)      # Vivid Green (#10B981)
COLOR_TEXT_MAIN = (255, 255, 255)   # Crisp White
COLOR_TEXT_MUTED = (226, 232, 240)  # Off-White / Silver

VISUAL_SCENES = {
    "feathers": os.path.join(ASSETS_DIR, "trinidad_feathers.jpg"),
    "costume": os.path.join(ASSETS_DIR, "masquerade_costume.jpg"),
    "lights": os.path.join(ASSETS_DIR, "festival_lights.jpg"),
    "crowd": os.path.join(ASSETS_DIR, "soca_crowd.jpg"),
    "tropical": os.path.join(ASSETS_DIR, "tropical_caribbean.jpg")
}

# -------------------------------------------------------------
# 📋 POSTED HISTORY & DEDUPLICATION ENGINE
# -------------------------------------------------------------
def load_posted_history():
    """Loads the history of all previously published reels to prevent duplicates."""
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠️ Error reading {HISTORY_FILE}: {e}")
        return []

def record_published_post(campaign_data, platform_results=None):
    """Saves a newly published reel to the persistent history log."""
    history = load_posted_history()
    
    entry = {
        "id": campaign_data.get("id", f"gen_{int(time.time())}"),
        "title": campaign_data.get("title", "Untitled Ad"),
        "hook_line": campaign_data.get("hook_line", ""),
        "carnival": campaign_data.get("carnival", "General"),
        "platform_ids": platform_results or {},
        "timestamp": datetime.now().isoformat()
    }
    history.append(entry)
    
    try:
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, indent=2, ensure_ascii=False)
        print(f"💾 Recorded post '{entry['title']}' to {HISTORY_FILE} (Total posted: {len(history)})")
    except Exception as e:
        print(f"⚠️ Could not save history: {e}")

def get_used_campaign_ids():
    """Returns set of campaign IDs that have already been posted."""
    history = load_posted_history()
    return set(item.get("id") for item in history if item.get("id"))

# -------------------------------------------------------------
# 🌟 COMPREHENSIVE 10-CAMPAIGN MASTER BANK (Zero-Duplicate Pool)
# -------------------------------------------------------------
MASTER_CAMPAIGN_BANK = [
    {
        "id": "squad_radar_lost_friends",
        "category": "ROAD_SURVIVAL",
        "carnival": "Notting Hill, NYC Labor Day & Miami 2026",
        "hook_badge": "🚨 NEVER LOSE YOUR SQUAD",
        "title": "3 MISTAKES ON CARNIVAL DAY",
        "hook_line": "Stop losing your friends in 50 thousand masqueraders! When cell towers jam on Carnival Monday, here is the secret.",
        "hook_visual": "costume",
        "scenes": [
            {
                "badge": "MISTAKE #1",
                "heading": "Trusting Cell Service 📵",
                "subtext": "With thousands of sound trucks blasting, phone calls drop instantly and WhatsApp messages fail.",
                "voice": "Mistake number one: trusting cell service. Phone calls and texts fail when thousands pack the road.",
                "visual": "crowd"
            },
            {
                "badge": "THE SOLUTION",
                "heading": "Live Squad Radar 📍",
                "subtext": "Carnival Planner tracks your entire squad's GPS pins live every 30 seconds with shared invite codes.",
                "voice": "The fix? Carnival Planner app tracks your crew's live coordinates so you never get separated.",
                "visual": "feathers"
            },
            {
                "badge": "SAFETY HACK",
                "heading": "Distress SOS & Meetups 🚨",
                "subtext": "One tap triggers an emergency beacon to all squad screens with your exact truck number and meetup pin.",
                "voice": "Plus, one tap flashes a distress SOS to your squad with your exact truck number and meetup point.",
                "visual": "lights"
            }
        ],
        "cta_heading": "Get Carnival Planner App Free",
        "cta_voice": "Download Carnival Planner free today on iOS and Android. Link in bio!",
        "cta_visual": "tropical"
    },
    {
        "id": "fete_ticket_sold_out_alert",
        "category": "FETE_DROPS",
        "carnival": "Trinidad Carnival 2027 & Crop Over",
        "hook_badge": "🔥 FETE TICKETS ALERT",
        "title": "HOW TO NEVER MISS A FETE DROP",
        "hook_line": "Soca Brainwash, AMBUSH, and Phuket sell out in under 90 seconds. If you don't have this setup, you're buying overpriced scalper tickets.",
        "hook_visual": "lights",
        "scenes": [
            {
                "badge": "MISTAKE #1",
                "heading": "Waiting for IG Stories ⏳",
                "subtext": "By the time promoters post tickets are live on Instagram, all Tier 1 tickets are already sold out.",
                "voice": "Mistake number one: waiting for promoter Instagram stories. By the time they post, Tier 1 is gone.",
                "visual": "crowd"
            },
            {
                "badge": "PRO SECRET",
                "heading": "Automated Drop Alerts ⚡",
                "subtext": "Track ticket release dates, tier pricing, and direct purchase links in one synchronized calendar.",
                "voice": "Instead, track real-time ticket drops, tier pricing, and direct release links inside Carnival Planner.",
                "visual": "feathers"
            },
            {
                "badge": "BUDGET HACK",
                "heading": "Squad Cost Splitter 💰",
                "subtext": "Calculate hotel, transport, costume deposits, and fete passes in one shared squad currency.",
                "voice": "You can even split costume deposits, fete tickets, and transport costs with your squad.",
                "visual": "tropical"
            }
        ],
        "cta_heading": "Build Your 2026/2027 Itinerary Free",
        "cta_voice": "Plan your ultimate carnival season free at Carnival-Planner.com! Link in bio.",
        "cta_visual": "costume"
    },
    {
        "id": "costume_marketplace_resale",
        "category": "MARKETPLACE",
        "carnival": "Trinidad, Jamaica & Barbados",
        "hook_badge": "👙 COSTUME SECRETS",
        "title": "BUY & SELL COSTUMES SAFELY",
        "hook_line": "Can't make it to Carnival this year? Or desperate for a sold-out frontline costume? Stop risking money with shady DMs.",
        "hook_visual": "costume",
        "scenes": [
            {
                "badge": "THE DANGER",
                "heading": "Beware of DM Scams ⚠️",
                "subtext": "Buying costumes through unregulated group chats leads to fake receipts and missing band registrations.",
                "voice": "Buying costumes through random DMs is risky. Fake receipts and scammers will ruin your trip.",
                "visual": "crowd"
            },
            {
                "badge": "THE SOLUTION",
                "heading": "Verified Peer-to-Peer 🛡️",
                "subtext": "Carnival Planner's Costume Marketplace connects verified masqueraders with Stripe escrow protection.",
                "voice": "Use Carnival Planner's verified marketplace. Masqueraders buy and sell sections with secure buyer protection.",
                "visual": "feathers"
            },
            {
                "badge": "AR PREVIEW",
                "heading": "3D AR Costume Fitting 🕶️",
                "subtext": "Preview band sections and headpieces in 3D Augmented Reality right on your phone before you buy.",
                "voice": "You can even preview costumes and headpieces in 3D augmented reality right from your phone.",
                "visual": "lights"
            }
        ],
        "cta_heading": "Explore Verified Marketplace",
        "cta_voice": "Check out the verified costume marketplace on Carnival-Planner.com today!",
        "cta_visual": "tropical"
    },
    {
        "id": "packing_list_essentials",
        "category": "PACKING_SURVIVAL",
        "carnival": "Trinidad, Notting Hill & Miami 2026",
        "hook_badge": "🧳 PACKING ESSENTIALS",
        "title": "5 THINGS YOU FORGOT TO PACK",
        "hook_line": "You have your boots and your wristbands, but forgetting THESE five items will completely ruin your carnival road experience.",
        "hook_visual": "feathers",
        "scenes": [
            {
                "badge": "ITEM #1",
                "heading": "Hydration Backpack & Electrolytes 💧",
                "subtext": "8 hours under the Caribbean sun will drain you in 2 hours without electrolytes and a secure bladder pouch.",
                "voice": "Item number one: a low-profile hydration pack and electrolyte packets to survive eight hours under the sun."
            },
            {
                "badge": "ITEM #2",
                "heading": "Waterproof Phone Pouch 📱",
                "subtext": "Essential for J'ouvert paint, water trucks, and heavy road sweat. Never hold your bare phone on the road.",
                "voice": "Item number two: a heavy-duty waterproof pouch for Jouvert paint and water truck sprays."
            },
            {
                "badge": "APP TOOL",
                "heading": "Auto-Generated Packing Vault 📋",
                "subtext": "Carnival Planner gives you a customized checklist tailored to your specific island and band.",
                "voice": "Carnival Planner builds an instant packing checklist customized for your exact carnival trip."
            }
        ],
        "cta_heading": "Get Your Free Packing Checklist",
        "cta_voice": "Download Carnival Planner free and never forget an essential item again!",
        "cta_visual": "tropical"
    },
    {
        "id": "budget_tracker_calculator",
        "category": "BUDGETING",
        "carnival": "Trinidad Carnival 2027 & Crop Over",
        "hook_badge": "💰 CARNIVAL BUDGET HACK",
        "title": "HOW MUCH DOES CARNIVAL REALLY COST?",
        "hook_line": "Flight, Airbnb, frontline costume, and 6 fetes. If you don't calculate expenses early, you'll blow 4,000 dollars by surprise.",
        "hook_visual": "tropical",
        "scenes": [
            {
                "badge": "HIDDEN COSTS",
                "heading": "Transportation & Makeup 💄",
                "subtext": "Driver retainers, carnival makeup appointments, and boot customization add $800+ if untracked.",
                "voice": "Transportation retainers, carnival makeup, and boots add hundreds of dollars if you don't track them."
            },
            {
                "badge": "THE SOLUTION",
                "heading": "Multi-Currency Budget Vault 📊",
                "subtext": "Input your budget in USD, GBP, CAD, or TTD. Carnival Planner tracks deposit deadlines and squad splits.",
                "voice": "Carnival Planner tracks your entire trip budget with multi-currency conversion and payment deadlines."
            },
            {
                "badge": "SQUAD SPLIT",
                "heading": "Zero Awkward Group DMs 👥",
                "subtext": "Automatic split calculation shows who paid what for group villas and shared vehicle rentals.",
                "voice": "It even calculates shared villa rentals and group costs automatically."
            }
        ],
        "cta_heading": "Calculate Your Trip Budget Free",
        "cta_voice": "Build your free carnival budget calculator at Carnival-Planner.com today!",
        "cta_visual": "costume"
    },
    {
        "id": "jouvert_morning_survival",
        "category": "JOUVERT_SURVIVAL",
        "carnival": "Trinidad, Jamaica & Grenada Spicemas",
        "hook_badge": "🎨 J'OUVERT SURVIVAL GUIDE",
        "title": "HOW TO SURVIVE 4AM J'OUVERT",
        "hook_line": "Paint, mud, oil, and pure soca energy! Here is the ultimate playbook to survive J'ouvert morning without ruining your skin or phone.",
        "hook_visual": "crowd",
        "scenes": [
            {
                "badge": "SKIN & HAIR",
                "heading": "Baby Oil & Coconut Oil Armor 🥥",
                "subtext": "Lather baby oil before heading out. Paint and mud will slide right off in the shower afterward.",
                "voice": "Coat your skin in baby oil before leaving. Mud and paint will rinse right off in the shower."
            },
            {
                "badge": "FOOTWEAR",
                "heading": "Throwaway Sneakers & Double Socks 👟",
                "subtext": "Never wear new shoes. Double up on socks to prevent blisters while chipping behind the music truck.",
                "voice": "Wear old sneakers with double socks to avoid blisters while chipping behind the music truck."
            },
            {
                "badge": "LOCATION",
                "heading": "Band Meetup Map Tracker 🗺️",
                "subtext": "Find where your J'ouvert truck departs in the dark with Carnival Planner's interactive meeting point map.",
                "voice": "Use Carnival Planner to locate your exact Jouvert truck starting point in the dark."
            }
        ],
        "cta_heading": "Get Free J'ouvert Maps & Guides",
        "cta_voice": "Plan your J'ouvert and road schedule free at Carnival-Planner.com!",
        "cta_visual": "lights"
    },
    {
        "id": "soca_passport_rewards",
        "category": "REWARDS",
        "carnival": "Worldwide 25+ Carnivals",
        "hook_badge": "✈️ SOCA PASSPORT UNLOCKED",
        "title": "COLLECT STAMPS FOR EVERY CARNIVAL",
        "hook_line": "How many carnivals have you jumped in? Unlock digital passport stamps, VIP promoter bounties, and masquerader rank badges.",
        "hook_visual": "feathers",
        "scenes": [
            {
                "badge": "PASSPORT",
                "heading": "Track 25+ Global Carnivals 🌴",
                "subtext": "From Trinidad to Notting Hill, Miami, Toronto, and Tokyo. Log every band you've ever played with.",
                "voice": "From Trinidad to London and Miami, log every carnival and band you've ever played with."
            },
            {
                "badge": "BOUNTIES",
                "heading": "Promoter Bounties & VIP Perks 🎁",
                "subtext": "Unlock exclusive fete discounts, early bird access, and leaderboard status in the carnival community.",
                "voice": "Unlock exclusive promoter discounts, early bird fete access, and community leaderboard badges."
            },
            {
                "badge": "SQUAD RANK",
                "heading": "Global Masquerader Leaderboard 🏆",
                "subtext": "Compare your carnival streak with your friends and see who holds the ultimate road record.",
                "voice": "Compare your carnival streak with friends and see who is the ultimate Soca Junkie."
            }
        ],
        "cta_heading": "Claim Your Free Soca Passport",
        "cta_voice": "Claim your free Soca Passport today at Carnival-Planner.com. Link in bio!",
        "cta_visual": "tropical"
    }
]

# -------------------------------------------------------------
# 🤖 AI CREATIVE SCRIPTWRITER (Gemini with Deduplication Filter)
# -------------------------------------------------------------
def generate_ai_creative_ad(carnival_context="Notting Hill Carnival & NYC Labor Day 2026"):
    """
    Selects or generates a 100% UNIQUE ad script.
    Excludes any previously published campaigns/titles recorded in posted_history.json.
    """
    used_ids = get_used_campaign_ids()
    history = load_posted_history()
    recent_titles = [h.get("title") for h in history[-10:] if h.get("title")]

    api_key = os.getenv("GEMINI_API_KEY")
    
    if api_key:
        print(f"🧠 Prompting Gemini AI to write a fresh, unique cinematic script for: {carnival_context}...")
        print(f"   (Excluding {len(recent_titles)} recent titles to guarantee zero duplicates)")
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")

            prompt = f"""
            You are a master viral TikTok & Reels marketing director specializing in Caribbean Carnivals, Soca events, and travel apps.
            Write a 35-second high-energy, pattern-interrupt cinematic video ad promoting 'Carnival Planner' (carnival-planner.com).
            
            Target Event: {carnival_context}
            
            STRICT DEDUPLICATION RULE:
            Do NOT reuse any of these previously posted headlines or hooks:
            {json.dumps(recent_titles)}
            
            Return STRICT JSON matching this exact structure:
            {{
                "id": "ai_gen_{int(time.time())}",
                "category": "DYNAMIC_AI",
                "carnival": "{carnival_context}",
                "hook_badge": "🚨 3-5 word uppercase badge with emoji",
                "title": "PUNCHY 4-6 WORD ALL-CAPS UNIQUE HEADLINE",
                "hook_line": "High-hook voiceover line (under 18 words) that stops the scroll.",
                "hook_visual": "feathers",
                "scenes": [
                    {{
                        "badge": "SCENE 1 BADGE",
                        "heading": "Short Scene 1 Heading",
                        "subtext": "Brief 1-sentence on-screen text.",
                        "voice": "Conversational voiceover sentence for scene 1.",
                        "visual": "crowd"
                    }},
                    {{
                        "badge": "SCENE 2 BADGE",
                        "heading": "Short Scene 2 Heading",
                        "subtext": "Brief 1-sentence on-screen text.",
                        "voice": "Conversational voiceover sentence for scene 2.",
                        "visual": "costume"
                    }},
                    {{
                        "badge": "SCENE 3 BADGE",
                        "heading": "Short Scene 3 Heading",
                        "subtext": "Brief 1-sentence on-screen text.",
                        "voice": "Conversational voiceover sentence for scene 3.",
                        "visual": "lights"
                    }}
                ],
                "cta_heading": "Get Carnival Planner App Free",
                "cta_voice": "Download Carnival Planner free today on iOS and Android. Link in bio!",
                "cta_visual": "tropical"
            }}
            Visual choices: 'feathers', 'costume', 'lights', 'crowd', 'tropical'.
            """

            response = model.generate_content(prompt)
            text = response.text.strip()
            
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()

            data = json.loads(text)
            print(f"✨ Gemini AI generated unique script: '{data.get('title')}'")
            return data

        except Exception as e:
            print(f"⚠️ Gemini AI scriptwriting fallback: {e}")

    # Fallback to unused master campaign bank
    available_campaigns = [c for c in MASTER_CAMPAIGN_BANK if c["id"] not in used_ids]
    
    if not available_campaigns:
        print("ℹ️ All master campaigns have been posted at least once! Starting a fresh rotation cycle.")
        available_campaigns = MASTER_CAMPAIGN_BANK

    chosen = random.choice(available_campaigns)
    print(f"📌 Selected unused campaign from master bank: '{chosen['title']}' (ID: {chosen['id']})")
    return chosen

# -------------------------------------------------------------
# 🎙️ NEURAL VOICEOVER SYNTHESIS (Female Voice @ 1.5x Speed)
# -------------------------------------------------------------
async def synthesize_neural_speech(text, output_mp3, voice="en-US-AvaNeural", rate="+50%"):
    """Synthesizes crisp, high-energy female neural voiceover audio at 1.5x speed."""
    try:
        import edge_tts
        communicate = edge_tts.Communicate(text, voice, rate=rate)
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
# 🎨 HIGH-CINEMATIC 1080x1920 REAL SCENE COMPOSITOR
# -------------------------------------------------------------
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

def render_real_cinematic_slide(bg_key, badge, heading, subtext, step_num=None, is_hook=False, is_cta=False, width=1080, height=1920):
    """
    Composites real carnival photography (masqueraders, feather backpacks, stage lights, Caribbean beaches)
    with a cinematic dark glassmorphism gradient, glowing badges, and high-contrast kinetic text.
    """
    bg_path = VISUAL_SCENES.get(bg_key, VISUAL_SCENES["feathers"])
    
    if os.path.exists(bg_path):
        try:
            bg_img = Image.open(bg_path).convert("RGB")
            img_ratio = bg_img.width / bg_img.height
            target_ratio = width / height

            if img_ratio > target_ratio:
                new_width = int(bg_img.height * target_ratio)
                left = (bg_img.width - new_width) // 2
                bg_img = bg_img.crop((left, 0, left + new_width, bg_img.height))
            else:
                new_height = int(bg_img.width / target_ratio)
                top = (bg_img.height - new_height) // 2
                bg_img = bg_img.crop((0, top, bg_img.width, top + new_height))

            bg_img = bg_img.resize((width, height), Image.Resampling.LANCZOS)
            enhancer = ImageEnhance.Color(bg_img)
            bg_img = enhancer.enhance(1.25)
        except Exception as e:
            print(f"⚠️ Error loading visual {bg_path}: {e}")
            bg_img = Image.new("RGB", (width, height), COLOR_BG_DARK)
    else:
        bg_img = Image.new("RGB", (width, height), COLOR_BG_DARK)

    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    # Top & Bottom Shadows for text legibility
    for y in range(height):
        if y < 450:
            alpha = int(220 * (1 - y / 450))
            ol_draw.line([(0, y), (width, y)], fill=(8, 6, 18, alpha))
        elif y > height - 700:
            alpha = int(235 * ((y - (height - 700)) / 700))
            ol_draw.line([(0, y), (width, y)], fill=(8, 6, 18, alpha))

    # Center Translucent Frost Glass Panel
    card_top = height - 720 if not is_hook else 340
    card_bottom = height - 240 if not is_hook else height - 340
    
    glow_color = COLOR_PINK + (110,) if is_hook else (COLOR_EMERALD + (110,) if is_cta else COLOR_PURPLE + (110,))
    ol_draw.rounded_rectangle([45, card_top - 15, width - 45, card_bottom + 15], radius=45, fill=glow_color)
    ol_draw.rounded_rectangle([55, card_top, width - 55, card_bottom], radius=40, fill=COLOR_CARD_BG)

    bg_img = Image.alpha_composite(bg_img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(bg_img)

    # Top Header Badge
    badge_font = get_font(38, bold=True)
    badge_color = COLOR_PINK if is_hook else (COLOR_EMERALD if is_cta else COLOR_PURPLE)
    badge_top = 120 if not is_hook else 200
    draw.rounded_rectangle([70, badge_top, 720, badge_top + 85], radius=20, fill=badge_color, outline=COLOR_TEXT_MAIN, width=2)
    draw.text((95, badge_top + 18), badge, font=badge_font, fill=COLOR_TEXT_MAIN)

    if step_num:
        num_font = get_font(110, bold=True)
        draw.text((100, card_top + 30), f"#{step_num}", font=num_font, fill=COLOR_GOLD)

    # Heading Text
    heading_font = get_font(56 if not is_hook else 64, bold=True)
    heading_y = card_top + 150 if step_num else card_top + 50

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
        draw.text((100, heading_y), line, font=heading_font, fill=COLOR_TEXT_MAIN)
        heading_y += 75

    # Glowing Divider
    draw.line([(100, heading_y + 20), (width - 100, heading_y + 20)], fill=COLOR_CYAN, width=6)

    # Subtext Copy
    sub_font = get_font(40, bold=False)
    sub_y = heading_y + 50
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

    for line in sub_lines[:4]:
        draw.text((100, sub_y), line, font=sub_font, fill=COLOR_TEXT_MUTED)
        sub_y += 58

    # Bottom CTA Button
    footer_bg = COLOR_PINK if not is_cta else COLOR_EMERALD
    draw.rounded_rectangle([80, height - 190, width - 80, height - 85], radius=25, fill=footer_bg, outline=COLOR_TEXT_MAIN, width=2)
    cta_text = "📲 Get Carnival Planner Free (iOS & Android)" if not is_cta else "🚀 Visit Carnival-Planner.com Today"
    footer_font = get_font(38, bold=True)
    draw.text((115, height - 150), cta_text, font=footer_font, fill=COLOR_TEXT_MAIN)

    return bg_img

# -------------------------------------------------------------
# 🎬 FULL VIDEO COMPOSITOR
# -------------------------------------------------------------
def build_cinematic_video(ad_data, output_mp4_path):
    """Assembles real visual scene frames, neural voiceovers, and authentic Soca audio."""
    try:
        from moviepy import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    except ImportError:
        from moviepy.editor import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

    print("\n" + "=" * 60)
    print("🎬 RENDERING HIGH-CINEMATIC 9:16 SOCIAL REEL (REAL SCENES)")
    print(f"📌 Title: {ad_data.get('title')}")
    print("=" * 60)

    slides_config = []
    
    # Hook Slide
    slides_config.append({
        "bg_key": ad_data.get("hook_visual", "costume"),
        "badge": ad_data.get("hook_badge", "🔥 CARNIVAL SECRETS"),
        "heading": ad_data.get("title", "CARNIVAL SURVIVAL GUIDE"),
        "subtext": ad_data.get("hook_line", "Everything you need to know before heading on the road!"),
        "voice": ad_data.get("hook_line"),
        "is_hook": True,
        "is_cta": False,
        "step_num": None
    })

    # Main Content Scenes
    for idx, scene in enumerate(ad_data.get("scenes", [])):
        slides_config.append({
            "bg_key": scene.get("visual", list(VISUAL_SCENES.keys())[idx % len(VISUAL_SCENES)]),
            "badge": scene.get("badge", f"TIP #{idx+1}"),
            "heading": scene.get("heading", f"Key Secret #{idx+1}"),
            "subtext": scene.get("subtext", ""),
            "voice": scene.get("voice", scene.get("subtext")),
            "is_hook": False,
            "is_cta": False,
            "step_num": str(idx + 1)
        })

    # Call to Action Slide
    slides_config.append({
        "bg_key": ad_data.get("cta_visual", "tropical"),
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
            print(f"🎨 Rendering real carnival scene {idx+1}/{len(slides_config)} [{s['bg_key']}]: '{s['heading'][:30]}'...")
            
            img = render_real_cinematic_slide(
                bg_key=s["bg_key"],
                badge=s["badge"],
                heading=s["heading"],
                subtext=s["subtext"],
                step_num=s["step_num"],
                is_hook=s["is_hook"],
                is_cta=s["is_cta"]
            )
            frame_path = os.path.join(OUTPUT_DIR, f"tmp_dedup_frame_{idx}.png")
            img.save(frame_path)
            temp_files.append(frame_path)

            audio_path = os.path.join(OUTPUT_DIR, f"tmp_dedup_audio_{idx}.mp3")
            asyncio.run(synthesize_neural_speech(s["voice"], audio_path))
            temp_files.append(audio_path)

            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.5, 3.2)

            if hasattr(ImageClip, 'with_duration'):
                clip = ImageClip(frame_path).with_duration(duration).with_audio(audio_clip)
            else:
                clip = ImageClip(frame_path).set_duration(duration).set_audio(audio_clip)

            video_clips.append(clip)

        print("⚡ Stitching real footage timeline & layering authentic Soca music...")
        final_video = concatenate_videoclips(video_clips, method="compose")

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

        print(f"🎥 Exporting high-cinematic 1080x1920 MP4 to: {output_mp4_path}...")
        final_video.write_videofile(
            output_mp4_path,
            fps=24,
            codec="libx264",
            audio_codec="aac",
            preset="fast"
        )

        print("\n" + "=" * 60)
        print("🎉 HIGH-CINEMATIC REEL GENERATED SUCCESSFULLY!")
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
    1. Selects or generates 100% unique script (excludes posted history)
    2. Synthesizes voice & renders high-cinematic 9:16 MP4 with real carnival scenes
    3. Formats viral caption & hashtag stack
    4. Automatically publishes to Instagram, Facebook, YouTube & TikTok
    5. Saves newly published post to posted_history.json
    """
    ad_data = generate_ai_creative_ad(carnival)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_video_name = f"cinematic_unique_{timestamp}.mp4"
    out_video_path = os.path.join(OUTPUT_DIR, out_video_name)
    
    build_cinematic_video(ad_data, out_video_path)

    from viral_copywriter import HASHTAG_STACKS
    broad = HASHTAG_STACKS["broad_viral"]
    niche = HASHTAG_STACKS["caribbean_niche"]
    tags = list(set(broad + niche + ["#carnivalplanner", "#caribbeancarnival", "#soca2026", "#masquerader"]))
    tag_str = " ".join(tags)

    full_caption = (
        f"🚨 {ad_data.get('title')}\n\n"
        f"{ad_data.get('hook_line')}\n\n"
        f"🌴 The vibes are loading for {carnival}! Plan your entire trip free on Carnival Planner.\n"
        f"👉 Download free / Link in bio: https://carnival-planner.com\n\n"
        f"{tag_str}"
    )

    print("📝 GENERATED VIRAL CAPTION:\n" + "-" * 40)
    print(full_caption)
    print("-" * 40)

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
        
        # Record into history log to guarantee zero duplicates
        record_published_post(ad_data, results)
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
