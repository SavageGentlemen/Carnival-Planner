import React, { useState, useRef } from 'react';
import { generateMarketingContent, generateMarketingImage, isSimulationMode } from '../services/marketingService';
import { Helmet } from "react-helmet";
import html2canvas from 'html2canvas';

// Helper components if UI lib is missing
const Button = ({ children, onClick, disabled, className, variant = 'primary' }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center";
    const styles = {
        primary: "bg-purple-600 hover:bg-purple-700 text-white",
        secondary: "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600",
        ghost: "bg-transparent hover:bg-gray-800 text-purple-400"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${styles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
};

const Textarea = ({ value, onChange, placeholder, className }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 ${className}`}
    />
);

const Checkbox = ({ id, checked, onCheckedChange }) => (
    <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="w-5 h-5 text-purple-600 rounded bg-gray-700 border-gray-600 focus:ring-purple-500"
    />
);

export default function MarketingDashboard() {
    const [vibeInput, setVibeInput] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState(['IG']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState([]);
    const [flyerStyle, setFlyerStyle] = useState('vibrant');
    const [aiImage, setAiImage] = useState(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    // Flyer Styles Configuration
    const flyerStyles = {
        vibrant: {
            name: "Vibrant",
            bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
            text: "text-white",
            accent: "bg-white/10",
            border: "border-white/10"
        },
        midnight: {
            name: "Midnight",
            bg: "bg-gray-950",
            text: "text-white",
            accent: "bg-purple-900/30",
            border: "border-gray-800"
        },
        gold: {
            name: "Carnival Gold",
            bg: "bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-700",
            text: "text-white",
            accent: "bg-black/20",
            border: "border-white/20"
        }
    };

    // Ref for the flyer element
    const flyerRef = useRef(null);

    const platforms = ['IG', 'FB', 'TikTok', 'X'];

    const togglePlatform = (platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };

    const handleGenerate = async () => {
        if (!vibeInput.trim()) {
            alert("Please tell us what you want to post about!");
            return;
        }

        if (selectedPlatforms.length === 0) {
            alert("Please select at least one platform.");
            return;
        }

        setIsGenerating(true);
        try {
            const generatedContent = await generateMarketingContent(vibeInput, selectedPlatforms);
            // Ensure specific structure if fallback returns different format
            setResults(generatedContent);
        } catch (error) {
            console.error("Generation error:", error);
            alert("Something went wrong generating the content.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const downloadFlyer = async (result) => {
        // We target the specific flyer element for this result
        const element = document.getElementById(`flyer-${result.platform}`);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#1f2937', // dark bg
                useCORS: true
            });

            // Use blob for better download handling
            canvas.toBlob((blob) => {
                if (!blob) {
                    alert("Could not generate flyer image.");
                    return;
                }
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `carnival-flyer-${result.platform}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // clean up after a delay to ensure mobile browsers handle it
                setTimeout(() => URL.revokeObjectURL(url), 100);
            }, 'image/png');
        } catch (err) {
            console.error("Flyer generation failed:", err);
            alert("Could not generate flyer image.");
        }
    };

    // Generate AI Image
    const handleGenerateAiImage = async () => {
        if (!vibeInput.trim()) {
            alert("Please enter a topic/idea first!");
            return;
        }

        setIsGeneratingImage(true);
        setAiImage(null);

        try {
            const result = await generateMarketingImage(vibeInput, flyerStyle);

            if (result.success) {
                setAiImage({
                    data: result.imageData,
                    mimeType: result.mimeType
                });
            } else {
                alert(result.error || "Failed to generate image. Try a different prompt.");
            }
        } catch (error) {
            console.error("AI image generation error:", error);
            alert("Failed to generate image. Please try again.");
        } finally {
            setIsGeneratingImage(false);
        }
    };

    // Download AI generated image
    const downloadAiImage = () => {
        if (!aiImage) return;

        const link = document.createElement('a');
        link.download = `carnival-ai-image-${Date.now()}.png`;
        link.href = `data:${aiImage.mimeType};base64,${aiImage.data}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openAiImageInNewTab = () => {
        if (!aiImage) return;
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`<img src="data:${aiImage.mimeType};base64,${aiImage.data}" style="max-width: 100%; height: auto;">`);
            newWindow.document.title = "AI Generated Image";
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 space-y-8">
            <Helmet>
                <title>Carnival Marketing Agent | Carnival Planner</title>
            </Helmet>

            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Carnival Marketing Agent 🎭</h1>
                    <p className="text-gray-400 text-lg">
                        Turn your fete updates into viral vibes. Powered by Google Gemini AI & Carnival Brand Engine.
                    </p>
                </div>
                {isSimulationMode && (
                    <div className="bg-yellow-900/30 text-yellow-500 text-xs p-2 rounded border border-yellow-800 max-w-[200px]">
                        ⚠️ Simulation Mode. Add VITE_GOOGLE_API_KEY to .env for Real AI.
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1 h-fit border border-purple-900/50 bg-gray-900/60 p-6 rounded-xl backdrop-blur">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-1">Input Your Vibe</h2>
                        <p className="text-sm text-gray-500">What's happening? (e.g., "Costume pickup starts tomorrow")</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Topic / Idea</label>
                            <Textarea
                                placeholder="Ex: New fete added to the lineup! It's a cooler fete..."
                                className="min-h-[150px] resize-none"
                                value={vibeInput}
                                onChange={(e) => setVibeInput(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-300">Target Platforms</label>
                            <div className="grid grid-cols-2 gap-2">
                                {platforms.map((platform) => (
                                    <div key={platform} className="flex items-center space-x-2 border border-gray-700 rounded-md p-3 hover:bg-gray-800 cursor-pointer" onClick={() => togglePlatform(platform)}>
                                        <Checkbox
                                            id={platform}
                                            checked={selectedPlatforms.includes(platform)}
                                            onCheckedChange={() => togglePlatform(platform)}
                                        />
                                        <label
                                            htmlFor={platform}
                                            className="text-sm font-medium cursor-pointer"
                                        >
                                            {platform}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 text-lg"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                                    Generating...
                                </span>
                            ) : (
                                "Generate Content 🚀"
                            )}
                        </Button>

                        {/* AI Image Generation */}
                        <div className="pt-4 border-t border-gray-700 mt-4">
                            <Button
                                className="w-full h-10"
                                variant="secondary"
                                onClick={handleGenerateAiImage}
                                disabled={isGeneratingImage || isSimulationMode}
                            >
                                {isGeneratingImage ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                                        Creating Image...
                                    </span>
                                ) : (
                                    "✨ Generate AI Image"
                                )}
                            </Button>
                            {isSimulationMode && (
                                <p className="text-xs text-gray-500 mt-2 text-center">AI Image requires API key</p>
                            )}
                        </div>

                        {/* AI Image Preview */}
                        {aiImage && (
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-semibold text-gray-300">AI Generated Image</h3>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" className="px-2 py-1 text-xs" onClick={openAiImageInNewTab} title="Open in new tab to save">
                                            Open ↗
                                        </Button>
                                        <Button variant="secondary" className="px-3 py-1 text-xs" onClick={downloadAiImage}>
                                            Download 📥
                                        </Button>
                                    </div>
                                </div>
                                <div className="rounded-lg overflow-hidden border border-purple-500/50">
                                    <img
                                        src={`data:${aiImage.mimeType};base64,${aiImage.data}`}
                                        alt="AI Generated Carnival Image"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Section */}
                <div className="lg:col-span-2 space-y-6">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div key={index} className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900">
                                <div className="bg-purple-900/20 p-3 border-b border-gray-800 flex justify-between items-center">
                                    <span className="font-bold text-purple-400 flex items-center gap-2">
                                        {result.platform === 'IG' && 'Instagram'}
                                        {result.platform === 'FB' && 'Facebook'}
                                        {result.platform === 'TikTok' && 'TikTok'}
                                        {result.platform === 'X' && 'X (Twitter)'}
                                    </span>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Text Content */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Caption</h3>
                                                <button className="text-xs text-purple-400 hover:text-purple-300 font-medium" onClick={() => copyToClipboard(result.caption + "\n\n" + result.hashtags.join(" "))}>
                                                    Copy Text
                                                </button>
                                            </div>

                                            <textarea
                                                className="w-full bg-gray-800/50 p-4 rounded-md text-sm leading-relaxed border border-gray-700/50 h-[250px] focus:ring-2 focus:ring-purple-600 focus:outline-none resize-none"
                                                value={result.caption}
                                                onChange={(e) => {
                                                    const newResults = [...results];
                                                    newResults[index].caption = e.target.value;
                                                    setResults(newResults);
                                                }}
                                            />
                                            <div className="text-xs text-gray-500">
                                                Hashtags: <span className="text-purple-400/80">{result.hashtags.join(" ")}</span>
                                            </div>
                                        </div>

                                        {/* Flyer Preview / Visual Strategy */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Flyer Preview</h3>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => {
                                                        const element = document.getElementById(`flyer-${result.platform}`);
                                                        if (element) {
                                                            html2canvas(element, { scale: 2, backgroundColor: '#1f2937', useCORS: true })
                                                                .then(canvas => {
                                                                    const win = window.open();
                                                                    if (win) {
                                                                        win.document.write(`<img src="${canvas.toDataURL()}" style="max-width: 100%; height: auto;">`);
                                                                        win.document.title = "Carnival Flyer";
                                                                    }
                                                                });
                                                        }
                                                    }} title="Open in new tab">
                                                        Open ↗
                                                    </Button>
                                                    <Button variant="secondary" className="px-3 py-1 text-xs" onClick={() => downloadFlyer(result)}>
                                                        Download 📥
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Style Selector */}
                                            <div className="flex gap-2">
                                                {Object.entries(flyerStyles).map(([key, style]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setFlyerStyle(key)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${flyerStyle === key
                                                            ? 'bg-white text-purple-900 ring-2 ring-purple-500'
                                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {style.name}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* This is the element we will capture */}
                                            <div
                                                id={`flyer-${result.platform}`}
                                                className={`relative aspect-[4/5] ${flyerStyles[flyerStyle].bg} rounded-lg p-6 flex flex-col justify-between overflow-hidden shadow-2xl border ${flyerStyles[flyerStyle].border}`}
                                            >
                                                {/* Background Decorations */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl"></div>
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>

                                                {/* Header */}
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className={`w-8 h-8 rounded-full ${flyerStyles[flyerStyle].accent} flex items-center justify-center text-lg`}>🎭</div>
                                                        <span className={`text-xs font-bold tracking-widest uppercase ${flyerStyles[flyerStyle].text} opacity-70`}>Carnival Planner</span>
                                                    </div>
                                                    <h2 className={`text-2xl font-black ${flyerStyles[flyerStyle].text} leading-tight drop-shadow-lg`}>
                                                        {vibeInput.length > 30 ? vibeInput.substring(0, 30) + "..." : vibeInput}
                                                    </h2>
                                                </div>

                                                {/* Body - Snippet of caption */}
                                                <div className={`relative z-10 my-4 ${flyerStyles[flyerStyle].accent} backdrop-blur-sm p-3 rounded border ${flyerStyles[flyerStyle].border}`}>
                                                    <p className={`text-sm font-medium ${flyerStyles[flyerStyle].text} opacity-90 leading-relaxed line-clamp-4`}>
                                                        {result.caption ? result.caption.split('\n')[0] : "Enjoy the vibes!"}
                                                    </p>
                                                </div>

                                                {/* Footer */}
                                                <div className="relative z-10 text-center">
                                                    <div className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold text-xs uppercase tracking-wider rounded-full shadow-lg">
                                                        Download App 📲
                                                    </div>
                                                    <p className="mt-2 text-[10px] text-white/50">www.carnival-planner.com</p>
                                                </div>
                                            </div>

                                            {/* Visual Strategy Note */}
                                            <div className="text-xs text-gray-400 italic">
                                                💡 AI Suggestion: {result.visualStrategy}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl bg-gray-900/20 p-8 text-center">
                            <div className="bg-purple-900/20 p-4 rounded-full mb-4 text-purple-400">
                                <span className="text-4xl">✨</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-300">Ready to Promote?</h3>
                            <p className="max-w-md">Enter your event details or update on the left, select your platforms, and let the AI handle the rest.</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
