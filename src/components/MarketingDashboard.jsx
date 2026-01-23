import React, { useState } from 'react';
import { generateMarketingContent } from '../services/marketingService';
import { Helmet } from "react-helmet";
// Assuming lucide-react and tailwind classes are available/compatible.
// Note: Adapting to standard React/Tailwind without the specific "ui" folder components from shadcn/ui unless they exist.
// If shadcn/ui is not present, I will use standard HTML/Tailwind for now or check for existing UI components.

// Helper components if UI lib is missing
const Button = ({ children, onClick, disabled, className }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </button>
);

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

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 space-y-8">
            <Helmet>
                <title>Carnival Marketing Agent | Carnival Planner</title>
            </Helmet>

            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-purple-400">Carnival Marketing Agent 🎭</h1>
                <p className="text-gray-400 text-lg">
                    Turn your fete updates into viral vibes. Powered by the Carnival Brand Engine.
                </p>
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
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg h-12 flex items-center justify-center"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <span>Cooking up Vibes...</span>
                            ) : (
                                "Generate Content 🚀"
                            )}
                        </Button>
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

                                    {/* Copy Section */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Caption</h3>
                                            <button className="text-xs text-purple-400 hover:text-purple-300 font-medium" onClick={() => copyToClipboard(result.caption + "\n\n" + result.hashtags.join(" "))}>
                                                Copy Full Post
                                            </button>
                                        </div>
                                        <div className="bg-gray-800/50 p-4 rounded-md whitespace-pre-wrap text-sm leading-relaxed border border-gray-700/50">
                                            {result.caption}
                                            <br /><br />
                                            <span className="text-purple-400/80">{result.hashtags.join(" ")}</span>
                                        </div>
                                    </div>

                                    {/* Visual Strategy */}
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Visual Strategy</h3>
                                        <div className="bg-teal-900/20 p-4 rounded-md text-sm border-l-4 border-teal-500 text-gray-300">
                                            {result.visualStrategy}
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
        </div>
    );
}
