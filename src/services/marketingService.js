import brandConfig from '../data/brand_config.json';

// Agent A: The Copywriter
function generateCaption(vibeInput, platform) {
    const emojis = ['🔥', '🎭', '📍', '🥂', '🇹🇹', '💃🏽'];
    const openers = [
        "Ready for de road?",
        "Yuh not ready yet?",
        "The countdown is ON!",
        "Who drinking with we?",
        "Mas is life!",
    ];

    const cta = brandConfig.cta_library[Math.floor(Math.random() * brandConfig.cta_library.length)];
    const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

    // Simple template logic for now
    let caption = `${openers[Math.floor(Math.random() * openers.length)]} ${randomEmoji()}\n\n`;
    caption += `${vibeInput} We making sure your carnival experience is seamless. No stress, just vibes. ${randomEmoji()}\n\n`;

    if (platform === 'TikTok' || platform === 'IG') {
        caption += `tap the link in bio! ${cta}`;
    } else {
        caption += `${cta}`;
    }

    return caption;
}

// Agent B: The Visual Strategist
function generateVisualStrategy(vibeInput) {
    const elements = brandConfig.visual_style.imagery_keywords;
    const suggestion = elements[Math.floor(Math.random() * elements.length)];

    return `Focus on: ${suggestion}. \n\nIdea: Show a high-energy clip related to "${vibeInput}" with a ${brandConfig.visual_style.colors.royal_purple} and ${brandConfig.visual_style.colors.metallic_gold} overlay. Keep it under 15s for high retention.`;
}

// Agent C: The Hashtag Expert
function generateHashtags() {
    const baseTags = ["#Carnival2026", "#CarnivalPlanner", "#Soca", "#Mas", "#FeteList"];
    const dynamicTags = ["#TrinidadCarnival", "#CropOver", "#MiamiCarnival", "#Spicemas", "#VincyMas"];

    // Shuffle and pick a few
    const shuffled = dynamicTags.sort(() => 0.5 - Math.random());
    return [...baseTags, ...shuffled.slice(0, 3)];
}

export async function generateMarketingContent(vibeInput, platforms) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return platforms.map(platform => ({
        platform,
        caption: generateCaption(vibeInput, platform),
        visualStrategy: generateVisualStrategy(vibeInput),
        hashtags: generateHashtags()
    }));
}
