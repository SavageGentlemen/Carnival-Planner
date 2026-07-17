import React from 'react';

export default function AndroidBetaPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen w-full">
        
        {/* Logo/Header */}
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-gray-700/50">
             <span className="text-4xl">🎭</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Carnival Planner: Android Beta Access
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Bypass the app store limits. Download the official, uncensored native app directly to your device.
          </p>
        </div>

        {/* Hero CTA */}
        <div className="mb-16 w-full flex justify-center">
          <a 
            href="/CarnivalPlanner.apk" 
            download="CarnivalPlanner.apk"
            className="group relative flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-bold text-xl shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Android APK</span>
          </a>
        </div>

        {/* Instructions Grid */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-8 text-center text-white/90">Frictionless Installation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-700 text-white font-bold text-xs px-3 py-1 rounded-bl-xl opacity-80">STEP 1</div>
              <div className="text-3xl mb-4">📥</div>
              <h3 className="text-xl font-bold text-white mb-3">Download & Open</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Tap the download button above. Once finished, open your file manager or notification panel and tap <strong className="text-white">CarnivalPlanner.apk</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-700 text-white font-bold text-xs px-3 py-1 rounded-bl-xl opacity-80">STEP 2</div>
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-white mb-3">Allow Unknown Sources</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                If your phone blocks the installation, tap <strong>Settings</strong> on the popup and toggle on "Allow from this source." Hit the back button and tap <strong>Install</strong>.
              </p>
            </div>

            {/* Step 3 (Crucial) */}
            <div className="bg-amber-900/20 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden transform md:-translate-y-2">
              <div className="absolute top-0 right-0 bg-amber-600 text-white font-bold text-xs px-3 py-1 rounded-bl-xl">CRUCIAL</div>
              <div className="text-3xl mb-4 text-amber-500">🛡️</div>
              <h3 className="text-xl font-bold text-amber-400 mb-3">Bypass Beta Warning</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Because we are distributing this Beta outside of the Google Play Store, Google Play Protect may show a red "Unsafe App" warning. <strong className="text-white">Do not click "Got it."</strong> Instead, tap the small arrow that says <strong className="text-amber-400 border-b border-amber-400/50 pb-0.5">"More details"</strong>, then tap <strong>"Install anyway."</strong>
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
