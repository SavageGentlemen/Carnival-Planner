import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

const VoiceScheduler = ({ onScheduleDetected }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');

    // Browser Compatibility Check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        return null; // Hide if browser doesn't support it
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    const startListening = () => {
        setIsListening(true);
        setFeedback('Listening... Say "Add [Event] for [Day] at [Time]"');
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setFeedback('Processing...');
        parseCommand(text);
        setIsListening(false);
    };

    recognition.onerror = (event) => {
        console.error("Voice Error:", event.error);
        setIsListening(false);
        setFeedback('Error listening. Try again.');
    };

    const parseCommand = (text) => {
        // Simple Heuristic Parser
        // Pattern: "Add [Event Name] for [Day] at [Time]"
        // Example: "Add Soca Brainwash for Friday at 3pm"

        let eventName = text;
        let eventDay = '';
        let eventTime = '';
        let eventNote = 'Added via Voice';

        const lower = text.toLowerCase();

        // 1. Detect Keyword "Add"
        if (lower.startsWith('add') || lower.startsWith('schedule') || lower.startsWith('remind me to')) {
            // Strip the command verb
            eventName = text.replace(/^(Add|Schedule|Remind me to)\s+/i, '');
        }

        // 2. Extract Day (Monday-Sunday)
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        for (const day of days) {
            if (lower.includes(day.toLowerCase())) {
                eventDay = day;
                // Remove day from name to clean it up
                eventName = eventName.replace(new RegExp(`(on|for)?\\s*${day}`, 'i'), '');
            }
        }

        // 3. Extract Time (simple regex for 1-12am/pm)
        const timeMatch = eventName.match(/(\d{1,2}(?::\d{2})?\s?(?:am|pm)?)/i);
        if (timeMatch) {
            // Check if it looks like a time (has am/pm or colon)
            if (timeMatch[0].toLowerCase().includes('am') || timeMatch[0].toLowerCase().includes('pm') || timeMatch[0].includes(':')) {
                eventTime = timeMatch[0];
                eventName = eventName.replace(timeMatch[0], ''); // Remove time from name
            }
        }

        // Cleanup Name (remove trailing "at", "for", "on")
        eventName = eventName.replace(/\s+(at|for|on)\s*$/i, '').trim();
        eventName = eventName.replace(/^\s+(at|for|on)\s+/i, '').trim();

        if (eventName) {
            setFeedback(`Found: ${eventName} (${eventDay || 'No Day'} @ ${eventTime || 'No Time'})`);
            onScheduleDetected({
                name: eventName,
                day: eventDay || 'Friday', // Default assumption or leave blank
                time: eventTime || '12:00 PM',
                note: `Voice: "${text}"`
            });
        } else {
            setFeedback('Could not understand event name.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 mt-4">
            <button
                onClick={isListening ? stopListening : startListening}
                className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105
            ${isListening
                        ? 'bg-red-500 text-white animate-pulse shadow-red-500/50 shadow-lg'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'}
        `}
            >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isListening ? 'Stop Listening' : 'Voice Add Event (Free)'}
            </button>

            {/* Visual Feedback */}
            {(transcript || feedback) && (
                <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {transcript && `"${transcript}"`}
                    </p>
                    <p className="text-xs text-blue-500 mt-1 font-mono">
                        {feedback}
                    </p>
                </div>
            )}
        </div>
    );
};

export default VoiceScheduler;
