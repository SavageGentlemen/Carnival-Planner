import brandConfig from '../data/brand_config.json';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
let genAI = null;

// Debug logging for production
console.log('[MarketingService] API_KEY exists:', !!API_KEY);
console.log('[MarketingService] API_KEY value (first 10 chars):', API_KEY ? API_KEY.substring(0, 10) + '...' : 'undefined');

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    console.log('[MarketingService] genAI initialized:', !!genAI);
}

// Export for component use
export const isSimulationMode = !genAI;
console.log('[MarketingService] isSimulationMode:', isSimulationMode);

// Fallback Simulation (Original Code)
const getSimulatedResponse = async (vibeInput, platforms) => {
    // Agent A: The Copywriter
    function generateCaption(platform) {
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
    function generateVisualStrategy() {
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

    await new Promise(resolve => setTimeout(resolve, 1500));

    return platforms.map(platform => ({
        platform,
        caption: generateCaption(platform),
        visualStrategy: generateVisualStrategy(),
        hashtags: generateHashtags()
    }));
}


export async function generateMarketingContent(vibeInput, platforms) {
    // If no API key, use simulation
    if (!genAI) {
        console.warn("No Google API Key found (VITE_GOOGLE_API_KEY). Using simulation mode.");
        return getSimulatedResponse(vibeInput, platforms);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are the "Carnival Marketing Agent" for a Caribbean Carnival Planner app. 
      Your Brand Voice: ${JSON.stringify(brandConfig.voice_profile)}
      Your Config/Vocabulary: ${JSON.stringify(brandConfig.vocabulary)}
      
      Task: Generate social media content for the following user input: "${vibeInput}"
      Target Platforms: ${platforms.join(", ")}

      Return a JSON array where each object has these keys:
      - "platform": (one of the requested platforms)
      - "caption": (A high-energy, authentic Caribbean dialect carnival caption. Use emojis. Add a Call to Action.)
      - "visualStrategy": (A description of what the image/video should look like)
      - "hashtags": (Array of 5 relevant hashtags)

      Ensure the JSON is valid and strictly follows the schema. Do not include markdown formatting blocks (like \`\`\`json). Just the raw JSON.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up if the AI returned markdown
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);

    } catch (error) {
        console.error("Gemini Generation Error:", error);
        // Fallback to simulation on error
        return getSimulatedResponse(vibeInput, platforms);
    }
}
