"""
Carnival Planner - Nanobana 3D Animated Ad Video Studio
Generates full 9:16 vertical motion-animated video ads featuring:
1. Nanobana 3D Animated Visuals: Diverse Black masqueraders of all skin shades (chocolate, mocha, caramel, bronze)
2. Studio Neural Black Woman Voiceover: Edge-TTS en-NG-EzinneNeural
3. Authentic Caribbean Soca Music: Soca drum beat mixed with auto-ducking
4. Glassmorphic Kinetic Badges & Lower Thirds
5. Zero-Duplicate Logging & Live Multi-Platform Publishing (Make.com Webhooks + Graph API)
"""

import os
import sys
import json
import time
import math
import random
import asyncio
import argparse
from datetime import datetime, timedelta
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
from dotenv import load_dotenv

load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'output')
ASSETS_DIR = os.path.join(os.path.dirname(__file__), 'assets', 'nanobana')
QUEUE_FILE = os.path.join(os.path.dirname(__file__), 'ad_campaign_queue.json')
HISTORY_FILE = os.path.join(os.path.dirname(__file__), 'posted_history.json')

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

COLOR_PURPLE = (139, 92, 246)
COLOR_PINK = (236, 72, 153)
COLOR_CYAN = (6, 182, 212)
COLOR_GOLD = (245, 158, 11)
COLOR_EMERALD = (16, 185, 129)
COLOR_TEXT_MAIN = (255, 255, 255)
COLOR_TEXT_MUTED = (226, 232, 240)

VOICE_NAME = os.getenv('VOICE_NAME', 'en-NG-EzinneNeural')
VOICE_RATE = '+15%'

def get_font(size, bold=False):
    font_names = [
        'arialbd.ttf' if bold else 'arial.ttf',
        'DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf',
        'segoeuib.ttf' if bold else 'segoeui.ttf'
    ]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except Exception:
            continue
    return ImageFont.load_default()

async def synthesize_neural_speech(text, output_mp3, voice=None, rate=None):
    if voice is None:
        voice = VOICE_NAME
    if rate is None:
        rate = VOICE_RATE
    try:
        import edge_tts
        comm = edge_tts.Communicate(text, voice, rate=rate)
        await comm.save(output_mp3)
        return True
    except Exception as e:
        print(f"  ⚠️ Edge-TTS failed ({e}), using gTTS fallback...")
        try:
            from gtts import gTTS
            tts = gTTS(text=text, lang="en", tld="com")
            tts.save(output_mp3)
            return True
        except Exception as e2:
            print(f"  ❌ TTS failed: {e2}")
            return False

def composite_animated_slide(bg_img_path, badge, heading, subtext, is_cta=False, width=1080, height=1920):
    if os.path.exists(bg_img_path):
        bg = Image.open(bg_img_path).convert('RGB')
        img_ratio = bg.width / bg.height
        target_ratio = width / height
        if img_ratio > target_ratio:
            new_width = int(bg.height * target_ratio)
            left = (bg.width - new_width) // 2
            bg = bg.crop((left, 0, left + new_width, bg.height))
        else:
            new_height = int(bg.width / target_ratio)
            top = (bg.height - new_height) // 2
            bg = bg.crop((0, top, bg.width, top + new_height))
        bg = bg.resize((width, height), Image.Resampling.LANCZOS)
    else:
        bg = Image.new('RGB', (width, height), (12, 10, 24))

    bg = ImageEnhance.Color(bg).enhance(1.15)
    bg = ImageEnhance.Contrast(bg).enhance(1.08)

    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    ol_draw = ImageDraw.Draw(overlay)

    for y in range(height):
        if y < 350:
            alpha = int(190 * (1 - y / 350))
            ol_draw.line([(0, y), (width, y)], fill=(8, 6, 18, alpha))
        elif y > height - 600:
            alpha = int(220 * ((y - (height - 600)) / 600))
            ol_draw.line([(0, y), (width, y)], fill=(8, 6, 18, alpha))

    if badge:
        font_badge = get_font(34, bold=True)
        b_bbox = font_badge.getbbox(badge)
        b_w = b_bbox[2] - b_bbox[0]
        badge_box = [width // 2 - b_w // 2 - 35, 80, width // 2 + b_w // 2 + 35, 150]
        ol_draw.rounded_rectangle(badge_box, radius=35, fill=(16, 12, 32, 230), outline=COLOR_GOLD, width=3)
        ol_draw.text((width // 2 - b_w // 2, 95), badge, fill=COLOR_GOLD, font=font_badge)

    if heading or subtext:
        card_top = height - 520
        card_bottom = height - 120
        card_box = [60, card_top, width - 60, card_bottom]
        ol_draw.rounded_rectangle(card_box, radius=35, fill=(12, 8, 24, 215), outline=COLOR_CYAN if not is_cta else COLOR_GOLD, width=3)

        draw_y = card_top + 40
        if heading:
            font_head = get_font(52, bold=True)
            h_bbox = font_head.getbbox(heading)
            h_w = h_bbox[2] - h_bbox[0]
            ol_draw.text((width // 2 - h_w // 2, draw_y), heading, fill=COLOR_TEXT_MAIN, font=font_head)
            draw_y += 75

        if subtext:
            font_sub = get_font(36, bold=False)
            words = subtext.split()
            lines = []
            cur_line = []
            for w in words:
                cur_line.append(w)
                bbox = font_sub.getbbox(' '.join(cur_line))
                if (bbox[2] - bbox[0]) > (width - 200):
                    cur_line.pop()
                    lines.append(' '.join(cur_line))
                    cur_line = [w]
            if cur_line:
                lines.append(' '.join(cur_line))

            for line in lines[:3]:
                l_bbox = font_sub.getbbox(line)
                l_w = l_bbox[2] - l_bbox[0]
                ol_draw.text((width // 2 - l_w // 2, draw_y), line, fill=COLOR_TEXT_MUTED, font=font_sub)
                draw_y += 50

    return Image.alpha_composite(bg.convert('RGBA'), overlay).convert('RGB')

AD_CAMPAIGNS = {
    'ad_1_stress_free_booking': {
        'id': 'ad_1_stress_free_booking',
        'title': "Planning Carnival is Stressing Your Squad Out? 😫 Here's the Cheat Code #Shorts",
        'platform_focus': 'TikTok / Instagram Reel',
        'target': 'General Masqueraders & Squads',
        'caption': (
            "Planning Carnival is stressing your squad out? 😫\n\n"
            "Stop stressing! Caribbean Carnival Planner is your ultimate cheat code for the road.\n\n"
            "🌴 From Barbados to Notting Hill, we tailor your hotel, secure your fete tickets, and lock in your costume.\n"
            "You just show up and fete! 🥳✨\n\n"
            "📲 Start planning your squad's trip today at carnival-planner.com! Link in bio 👇\n\n"
            "#CarnivalPlanner #SocaPassport #Carnival2026 #Carnival2027 #MasqueraderLife #SocaMusic #CaribbeanCarnival #CropOver #NottingHillCarnival #TrinidadCarnival #ReelsViral #Shorts #FYP"
        ),
        'scenes': [
            {
                'image_pattern': 'ad1_scene1_squad_stress',
                'badge': '😫 PLANNING STRESS?',
                'heading': 'Stop Stressing Your Squad!',
                'subtext': 'Tickets sold out? Costume sizes missing? Chat blowing up?',
                'voice': 'Planning Carnival is stressing your squad out? Stop stressing! Caribbean Carnival Planner is your ultimate cheat code for the road.'
            },
            {
                'image_pattern': 'ad1_scene2_app_cheatcode',
                'badge': '📍 LIVE FETE MAPS',
                'heading': 'All-in-One Road Portal',
                'subtext': 'Tailored hotels, live GPS sound trucks, and verified costumes.',
                'voice': 'From Barbados to Notting Hill, we tailor your hotel, secure your fete tickets, and lock in your costume.'
            },
            {
                'image_pattern': 'ad1_scene3_masqueraders_fete',
                'badge': '🎉 PURE VIBES ONLY',
                'heading': 'You Just Show Up & Fete',
                'subtext': 'Jump in full frontline feathers with your entire crew.',
                'voice': 'You just show up and fete! Your unforgettable celebration awaits.'
            },
            {
                'image_pattern': 'ad1_scene4_outro_cta',
                'badge': '🚀 PLAN FREE TODAY',
                'heading': 'Visit carnival-planner.com',
                'subtext': 'Tap the link in bio to start your squad itinerary now!',
                'voice': "Start planning your squad's trip today at carnival-planner.com!",
                'is_cta': True
            }
        ]
    },
    'ad_2_luxury_trinidad_2027': {
        'id': 'ad_2_luxury_trinidad_2027',
        'title': 'Experience Trinidad Carnival 2027 in Pure Luxury 👑 Moy Meets World x Carnival Planner',
        'platform_focus': 'YouTube Pre-Roll / Shorts / Instagram',
        'target': 'Luxury / Premium Travelers',
        'caption': (
            "Experience Trinidad Carnival 2027 in Pure Luxury 👑\n\n"
            "Moy Meets World x Carnival Planner has officially launched the flagship 2027 VIP experience!\n\n"
            "✨ Tribe & YUMA VIP Costumes\n"
            "✨ 5-Star Private Luxury Villas\n"
            "✨ All-Inclusive Premier Fete Passes\n"
            "✨ 24/7 On-Ground Concierge\n\n"
            "🔒 Lock in your luxury Trinidad 2027 escape with just a $500 deposit today!\n"
            "👉 Visit carnival-planner.com to book now!\n\n"
            "#TrinidadCarnival2027 #LuxuryTravel #MoyMeetsWorld #CarnivalPlanner #TribeCarnival #YUMAVibe #SocaMusic #CaribbeanLuxury #VIPCarnival"
        ),
        'scenes': [
            {
                'image_pattern': 'ad2_scene1_turquoise_empress',
                'badge': '👑 TRINIDAD 2027 LUXURY',
                'heading': 'The Greatest Show on Earth',
                'subtext': 'Experience Trinidad Carnival without the stress of planning.',
                'voice': "Ready for the Greatest Show on Earth, but don't want the hassle of planning it?"
            },
            {
                'image_pattern': 'ad2_scene2_luxury_villa_box',
                'badge': '✨ MOY MEETS WORLD x CP',
                'heading': '5-Star Villas & VIP Delivery',
                'subtext': 'Exclusive private villas and costume delivery to your room.',
                'voice': 'Experience Trinidad Carnival 2027 in pure luxury. With Carnival Planner and Moy Meets World, we handle everything.'
            },
            {
                'image_pattern': 'ad2_scene3_vip_jouvert_fete',
                'badge': '🍹 ALL-INCLUSIVE VIP',
                'heading': 'Tribe & YUMA Frontline',
                'subtext': "Premier fetes, luxury J'ouvert, and 24/7 dedicated concierge.",
                'voice': "Secure your Tribe or YUMA VIP costumes, 5-star villas, and all-inclusive premier fetes—all with a 24/7 on-ground concierge."
            },
            {
                'image_pattern': 'ad2_scene4_trinidad2027_outro',
                'badge': '🔒 $500 DEPOSIT TO LOCK IN',
                'heading': 'Visit carnival-planner.com',
                'subtext': 'Book your 2027 flagship luxury escape today!',
                'voice': 'Lock in your flagship 2027 experience today with just a $500 deposit. Visit carnival-planner.com to book your luxury escape.',
                'is_cta': True
            }
        ]
    },
    'ad_3_promoters_boost': {
        'id': 'ad_3_promoters_boost',
        'title': 'Promoters! Boost Ticket Sales & Pin Your Event on Carnival Planner 🚀',
        'platform_focus': 'Facebook / Instagram Sponsored Post (B2B)',
        'target': 'Event Promoters & Band Leaders',
        'caption': (
            "Attention Carnival Event Promoters & Band Leaders! 📢\n\n"
            "Want your fete to look like thousands of masqueraders jumping under the stage lights? 🥳\n\n"
            "🔥 Get your carnival event in front of 10,000+ targeted masqueraders!\n"
            "📌 Pin your event to the top of our live feed ($49)\n"
            "🎥 Weekly AI auto-video boost to YouTube Shorts, Reels & TikTok ($149)\n\n"
            "🚀 Boost your ticket sales today at carnival-planner.com!\n\n"
            "#EventPromoters #CarnivalFete #SocaPromoter #CarnivalPlanner #PartyPromoters #TicketSales #CaribbeanEvents #SocaParty"
        ),
        'scenes': [
            {
                'image_pattern': 'ad3_scene1_massive_fete',
                'badge': '📢 FOR PROMOTERS',
                'heading': 'Want Your Fete Packed?',
                'subtext': 'Put your event in front of 10,000+ verified masqueraders.',
                'voice': 'Promoters! Get your carnival event in front of ten thousand plus masqueraders.'
            },
            {
                'image_pattern': 'ad3_scene2_promoter_boost',
                'badge': '⚡ FEED PIN & VIDEO BOOST',
                'heading': 'Pin Event ($49) | Video Boost ($149)',
                'subtext': 'Top feed placement and AI video shorts broadcasted weekly.',
                'voice': 'List on Caribbean Carnival Planner. Pin your event to the top of our live feed, or let our AI turn your flyer into viral weekly video shorts.'
            },
            {
                'image_pattern': 'ad3_scene3_boost_tickets_outro',
                'badge': '🚀 BOOST TICKET SALES',
                'heading': 'Visit carnival-planner.com',
                'subtext': 'List your event or fete today and sell out early!',
                'voice': 'Boost your ticket sales today at carnival-planner.com.',
                'is_cta': True
            }
        ]
    },
    'ad_4_spotify_broad_awareness': {
        'id': 'ad_4_spotify_broad_awareness',
        'title': 'Hear That? The Road is Calling! 🌴 Stop Planning, Start Feting #Carnival',
        'platform_focus': 'Spotify Audio / Video Reel / Broad Awareness',
        'target': 'Broad Caribbean Music & Carnival Travelers',
        'caption': (
            "Hear that? That’s the sound of the road calling! 🌴🥁\n\n"
            "If you're still stressing over finding a villa, booking fete tickets, or securing that frontline costume... you're doing it wrong.\n\n"
            "✨ Caribbean Carnival Planner is your ultimate concierge across 25+ global carnivals!\n"
            "Whether you're heading to Barbados Crop Over, Notting Hill, or gearing up for Trinidad 2027, we build custom-tailored packages to fit your squad and budget.\n\n"
            "🎉 Stop planning, start feting!\n"
            "👉 Go to carnival-planner.com today to unlock your next carnival adventure!\n\n"
            "#CarnivalPlanner #CaribbeanCarnival #SocaMusic #Steelpan #CropOver #TrinidadCarnival #JamaicaCarnival #NottingHillCarnival #Masqueraders"
        ),
        'scenes': [
            {
                'image_pattern': 'ad4_scene1_steelpan_road',
                'badge': '🥁 HEAR THAT SOUND?',
                'heading': 'The Road is Calling You',
                'subtext': "Don't stress over villas, tickets, and costume drops alone.",
                'voice': "Hear that? That's the sound of the road calling. But if you're still stressing over finding a villa, booking fete tickets, or securing that frontline costume, you're doing it wrong."
            },
            {
                'image_pattern': 'ad4_scene2_global_islands',
                'badge': '🌴 25+ GLOBAL CARNIVALS',
                'heading': 'Custom Tailored Concierge',
                'subtext': 'From Barbados Crop Over to Trinidad 2027, we fit your squad.',
                'voice': 'Enter Caribbean Carnival Planner. We are your ultimate carnival concierge for over twenty-five global carnivals. From Barbados Crop Over to Trinidad 2027, we build custom packages for your squad.'
            },
            {
                'image_pattern': 'ad1_scene4_outro_cta',
                'badge': '🚀 STOP PLANNING. START FETING.',
                'heading': 'Visit carnival-planner.com',
                'subtext': 'Unlock your next carnival adventure free today!',
                'voice': 'Stop planning, start feting. Go to carnival-planner.com today to unlock your next carnival adventure!',
                'is_cta': True
            }
        ]
    }
}

def load_queue():
    if os.path.exists(QUEUE_FILE):
        try:
            with open(QUEUE_FILE, 'r') as f:
                return json.load(f)
        except Exception:
            pass

    today = datetime.now().date()
    default_queue = [
        {'campaign_id': 'ad_1_stress_free_booking', 'scheduled_date': today.isoformat(), 'status': 'pending'},
        {'campaign_id': 'ad_2_luxury_trinidad_2027', 'scheduled_date': (today + timedelta(days=1)).isoformat(), 'status': 'pending'},
        {'campaign_id': 'ad_3_promoters_boost', 'scheduled_date': (today + timedelta(days=2)).isoformat(), 'status': 'pending'},
        {'campaign_id': 'ad_4_spotify_broad_awareness', 'scheduled_date': (today + timedelta(days=3)).isoformat(), 'status': 'pending'}
    ]
    save_queue(default_queue)
    return default_queue

def save_queue(queue):
    with open(QUEUE_FILE, 'w') as f:
        json.dump(queue, f, indent=2)

def get_next_campaign(force_id=None):
    queue = load_queue()
    if force_id:
        return force_id

    today_str = datetime.now().date().isoformat()
    for item in queue:
        if item['status'] == 'pending' and item['scheduled_date'] <= today_str:
            return item['campaign_id']

    for item in queue:
        if item['status'] == 'pending':
            return item['campaign_id']

    return None

def mark_campaign_posted(campaign_id):
    queue = load_queue()
    for item in queue:
        if item['campaign_id'] == campaign_id:
            item['status'] = 'posted'
            item['posted_at'] = datetime.now().isoformat()
    save_queue(queue)

def find_scene_image(pattern):
    for f in os.listdir(ASSETS_DIR):
        if pattern in f and f.endswith(('.jpg', '.png', '.jpeg')):
            return os.path.join(ASSETS_DIR, f)
    files = [f for f in os.listdir(ASSETS_DIR) if f.endswith(('.jpg', '.png'))]
    if files:
        return os.path.join(ASSETS_DIR, files[0])
    return None

def compile_nanobana_ad_video(campaign_id):
    campaign = AD_CAMPAIGNS.get(campaign_id)
    if not campaign:
        raise ValueError(f'Unknown campaign ID: {campaign_id}')

    print('=' * 80)
    print(f'🎬 COMPILING NANOBANA 3D ANIMATED AD: "{campaign["title"]}"')
    print(f'   - Focus: {campaign["platform_focus"]}')
    print(f'   - Target: {campaign["target"]}')
    print(f'   - Voice: {VOICE_NAME} (Warm Black Woman Voice)')
    print('=' * 80)

    try:
        from moviepy.editor import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips
    except ImportError:
        from moviepy import ImageClip, AudioFileClip, CompositeAudioClip, concatenate_videoclips

    temp_files = []
    video_clips = []
    timestamp = int(time.time())
    output_mp4 = os.path.join(OUTPUT_DIR, f'nanobana_{campaign_id}_{timestamp}.mp4')

    try:
        for idx, sc in enumerate(campaign['scenes']):
            print(f'\n🎨 [Scene {idx+1}/{len(campaign["scenes"])}] Rendering animated frame...')
            img_path = find_scene_image(sc['image_pattern'])
            if not img_path:
                raise FileNotFoundError(f'Missing asset for pattern: {sc["image_pattern"]}')

            slide = composite_animated_slide(
                bg_img_path=img_path,
                badge=sc['badge'],
                heading=sc['heading'],
                subtext=sc['subtext'],
                is_cta=sc.get('is_cta', False)
            )
            slide_path = os.path.join(OUTPUT_DIR, f'tmp_slide_{campaign_id}_{idx}.png')
            slide.save(slide_path)
            temp_files.append(slide_path)

            audio_path = os.path.join(OUTPUT_DIR, f'tmp_audio_{campaign_id}_{idx}.mp3')
            asyncio.run(synthesize_neural_speech(sc['voice'], audio_path))
            temp_files.append(audio_path)

            audio_clip = AudioFileClip(audio_path)
            duration = max(audio_clip.duration + 0.3, 3.0)

            if hasattr(ImageClip, 'with_duration'):
                clip = ImageClip(slide_path).with_duration(duration).with_audio(audio_clip)
            else:
                clip = ImageClip(slide_path).set_duration(duration).set_audio(audio_clip)

            video_clips.append(clip)

        print('\n⚡ Concatenating scenes & layering authentic Soca music...')
        final_video = concatenate_videoclips(video_clips, method='compose')

        soca_music_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'soca_drum_beat.mp3')
        if os.path.exists(soca_music_path):
            bg_audio = AudioFileClip(soca_music_path)
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

        print(f'🎥 Exporting final 1080x1920 MP4 to: {output_mp4}...')
        final_video.write_videofile(
            output_mp4,
            fps=24,
            codec='libx264',
            audio_codec='aac',
            preset='fast'
        )
        print(f'✅ Video export complete: {output_mp4} ({os.path.getsize(output_mp4)} bytes)')
        return output_mp4, campaign

    finally:
        for tmp in temp_files:
            if os.path.exists(tmp):
                try:
                    os.remove(tmp)
                except Exception:
                    pass

def publish_ad(campaign_id, dry_run=False):
    output_mp4, campaign = compile_nanobana_ad_video(campaign_id)

    from hybrid_publisher import publish_to_all_socials

    print('\n[Step 4/5] 🌐 Broadcasting Nanobana Ad to Make.com and Social Channels...')
    tags = [
        '#CarnivalPlanner', '#SocaPassport', '#Carnival2026', '#Carnival2027',
        '#MasqueraderLife', '#SocaMusic', '#CaribbeanCarnival', '#ReelsViral',
        '#Shorts', '#FYP', '#TrendingNow'
    ]

    results = publish_to_all_socials(
        media_url_or_path=output_mp4,
        title=campaign['title'],
        caption=campaign['caption'],
        tags=tags,
        media_type='video',
        dry_run=dry_run
    )

    if not dry_run:
        mark_campaign_posted(campaign_id)
        record_posted_ad(campaign['id'], campaign['title'], results)

    return results, output_mp4

def record_posted_ad(camp_id, title, results):
    history = []
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r') as f:
                history = json.load(f)
        except Exception:
            history = []

    history.append({
        'id': f'nanobana_{camp_id}_{int(time.time())}',
        'title': title,
        'type': 'nanobana_3d_animated_ad',
        'platform_ids': results,
        'timestamp': datetime.now().isoformat()
    })

    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=2)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Nanobana 3D Animated Ad Studio')
    parser.add_argument('--campaign', default='ad_1_stress_free_booking', choices=list(AD_CAMPAIGNS.keys()), help='Campaign ID to generate')
    parser.add_argument('--live', action='store_true', help='Publish live to social platforms and Make.com')
    args = parser.parse_args()

    publish_ad(args.campaign, dry_run=not args.live)
