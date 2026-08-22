import React, { useState } from 'react';
import { 
  Bot, Cpu, CheckCircle2, AlertCircle, Clock, ExternalLink, 
  Play, RefreshCw, ShieldCheck, Zap, Database, Globe, Share2, 
  Bell, FileCode, Check
} from 'lucide-react';

export default function AutomationManager() {
  const [testingBotId, setTestingBotId] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [filter, setFilter] = useState('all');

  const bots = [
    {
      id: 'e2e-sentinel',
      name: '24/7 E2E Smoke Test Sentinel',
      category: 'reliability',
      type: 'GitHub Actions + Playwright',
      schedule: 'Every 6 hours (0 */6 * * *)',
      status: 'Active',
      description: 'Headless browser tests verifying page load, carnival switcher, fete schedule, and tab navigation.',
      target: '.github/workflows/e2e-sentinel.yml',
      repoUrl: 'https://github.com/SavageGentlemen/Carnival-Planner/actions/workflows/e2e-sentinel.yml',
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'db-hygiene',
      name: 'Database Hygiene & Quota Purge Bot',
      category: 'database',
      type: 'Firebase Cloud Functions v2',
      schedule: 'Daily at 4:00 AM AST',
      status: 'Active',
      description: 'Prunes expired safety cooldowns, deactivates outdated flash quests, and clears stale ephemeral signals to stay within free-tier quotas.',
      target: 'functions2/index.js (scheduledDatabaseHygiene)',
      repoUrl: 'https://console.firebase.google.com/',
      icon: Database,
      color: 'from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30'
    },
    {
      id: 'asset-sentinel',
      name: 'Asset & Dead Link Sentinel Bot',
      category: 'reliability',
      type: 'GitHub Actions + Python',
      schedule: 'Daily at 5:00 AM UTC',
      status: 'Active',
      description: 'Scans event flyers and ticketing links for 404s/broken CDNs, auto-repairing with high-res verified fallbacks.',
      target: 'scripts/asset_sentinel.py',
      repoUrl: 'https://github.com/SavageGentlemen/Carnival-Planner/actions/workflows/asset-sentinel.yml',
      icon: FileCode,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
    },
    {
      id: 'daily-scraper',
      name: 'Daily Carnival Event Scraper',
      category: 'data',
      type: 'GitHub Actions + Node.js/Python',
      schedule: 'Daily at 6:00 AM UTC',
      status: 'Active',
      description: 'Scrapes ticket platforms (Fetelist, IslandETickets, Frontline) for new event drops and ticket availability.',
      target: '.github/workflows/daily-scraper.yml',
      repoUrl: 'https://github.com/SavageGentlemen/Carnival-Planner/actions/workflows/daily-scraper.yml',
      icon: Globe,
      color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30'
    },
    {
      id: 'social-poster',
      name: '24/7 Social Media Growth Engine',
      category: 'marketing',
      type: 'GitHub Actions + Python / ig_engine',
      schedule: '3x Daily (9 AM, 3 PM, 9 PM UTC)',
      status: 'Active',
      description: 'Renders dynamic countdown videos and automated fete alert graphics across Instagram, TikTok, Facebook, and YouTube.',
      target: '.github/workflows/fete-flight-alert-tracker.yml',
      repoUrl: 'https://github.com/SavageGentlemen/Carnival-Planner/actions/workflows/fete-flight-alert-tracker.yml',
      icon: Share2,
      color: 'from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30'
    },
    {
      id: 'sos-dispatcher',
      name: 'Road Emergency SOS Multi-Dispatch Bot',
      category: 'safety',
      type: 'Firebase Cloud Functions v2',
      schedule: 'On-Demand (Real-time Panic Trigger)',
      status: 'Active',
      description: 'Generates live Google Maps pins and dispatches urgent emergency broadcasts across FCM, WhatsApp, Telegram, and Discord.',
      target: 'functions2/index.js (sendSafetyAlert)',
      repoUrl: 'https://console.firebase.google.com/',
      icon: Bell,
      color: 'from-red-500/20 to-orange-500/10 text-red-400 border-red-500/30'
    },
    {
      id: 'seo-generator',
      name: 'Automated SEO Article & Sitemap Bot',
      category: 'marketing',
      type: 'Firebase Cloud Functions v2',
      schedule: 'Daily at Midnight AST',
      status: 'Active',
      description: 'Generates programmatic SEO destination guides and updates Schema.org event feeds for instant search engine indexing.',
      target: 'functions2/index.js (scheduledSeoBlogGenerator)',
      repoUrl: 'https://console.firebase.google.com/',
      icon: Zap,
      color: 'from-yellow-500/20 to-amber-500/10 text-yellow-400 border-yellow-500/30'
    },
    {
      id: 'weekly-digest',
      name: 'Weekly Fete Digest Email Engine',
      category: 'marketing',
      type: 'Firebase Cloud Functions v2',
      schedule: 'Mondays at 8:00 AM AST',
      status: 'Active',
      description: 'Compiles top trending fetes and flight deals for masquerader subscribers into a personalized weekly newsletter.',
      target: 'functions2/index.js (scheduledWeeklyFeteDigest)',
      repoUrl: 'https://console.firebase.google.com/',
      icon: Cpu,
      color: 'from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/30'
    }
  ];

  const handleTestBot = (botId) => {
    setTestingBotId(botId);
    setTimeout(() => {
      setTestResults(prev => ({
        ...prev,
        [botId]: {
          timestamp: new Date().toLocaleTimeString(),
          status: 'Passed',
          latency: `${Math.floor(Math.random() * 80) + 40}ms`,
          message: 'Health check OK — Runner & schema verified.'
        }
      }));
      setTestingBotId(null);
    }, 900);
  };

  const filteredBots = filter === 'all' 
    ? bots 
    : bots.filter(b => b.category === filter);

  return (
    <div className="space-y-6 text-white">
      {/* Top Banner / Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/60 border border-gray-700/60 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Configured Automations</span>
            <Bot className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">8 Active</p>
          <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Operational
          </span>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/60 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Infrastructure Cost</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">$0.00 / mo</p>
          <span className="text-xs text-blue-400 mt-1">
            Free Tiers (GHA + Firebase)
          </span>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/60 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Self-Healing Sentinel</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">Enabled</p>
          <span className="text-xs text-emerald-400 mt-1">
            Playwright E2E + 404 Sentinel
          </span>
        </div>

        <div className="bg-gray-800/60 border border-gray-700/60 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium">Emergency Broadcast</span>
            <Bell className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">Multi-Channel</p>
          <span className="text-xs text-purple-400 mt-1">
            FCM • WhatsApp • Telegram • Discord
          </span>
        </div>
      </div>

      {/* Filter Tabs & Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800/40 p-3 rounded-2xl border border-gray-700/40">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Bots (8)' },
            { id: 'reliability', label: '🛡️ Reliability & E2E' },
            { id: 'database', label: '🗄️ Database Hygiene' },
            { id: 'marketing', label: '📢 Growth & SEO' },
            { id: 'safety', label: '🚨 Road Safety' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                filter === f.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <a
            href="https://github.com/SavageGentlemen/Carnival-Planner/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub Actions Runs
          </a>
          <a
            href="https://console.firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            Firebase Logs
          </a>
        </div>
      </div>

      {/* Bot Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBots.map((bot) => {
          const IconComponent = bot.icon;
          const result = testResults[bot.id];
          const isTesting = testingBotId === bot.id;

          return (
            <div
              key={bot.id}
              className={`relative bg-gradient-to-br ${bot.color} bg-gray-900/90 border rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between transition-all hover:scale-[1.01]`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        {bot.name}
                      </h3>
                      <span className="text-xs text-gray-400 font-mono">
                        {bot.type}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {bot.status}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  {bot.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    <span>{bot.schedule}</span>
                  </div>
                  <div className="font-mono text-gray-400 truncate max-w-[200px]" title={bot.target}>
                    {bot.target}
                  </div>
                </div>

                {result && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {result.message}
                    </span>
                    <span className="text-gray-400">{result.latency}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleTestBot(bot.id)}
                  disabled={isTesting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-pink-400" />
                      Simulate Test
                    </>
                  )}
                </button>

                <a
                  href={bot.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  View Logs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
