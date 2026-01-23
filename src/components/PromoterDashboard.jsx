import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Calendar, Plus, BarChart3, Settings,
    Ticket, Users, MapPin, Clock, Search, Filter,
    ChevronRight, ArrowUpRight, Copy, Check, MoreVertical,
    Sparkles, ShieldCheck, AlertCircle, Loader2, DollarSign, Gift,
    Image as ImageIcon, Download
} from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

// Stripe Price ID for Promoter Pro ($9.99/mo)
const PROMOTER_PRO_PRICE_ID = 'price_1SsDVdJR9xpdRiXiMw7dGtpC';

export default function PromoterDashboard({ user, isPremium, onExit }) {
    const [activeTab, setActiveTab] = useState('overview'); // overview, events, create, analytics
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPromoterPro, setIsPromoterPro] = useState(false); // Mock for now
    const [isUpgrading, setIsUpgrading] = useState(false);

    // Create Event Form State
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        type: 'fete',
        description: ''
    });
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState('');

    // Reward Form State
    const [newReward, setNewReward] = useState({ title: '', cost: '', description: '', quantity: '' });
    const [creatingReward, setCreatingReward] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, [user]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const functions = getFunctions(app);
            const getStats = httpsCallable(functions, 'getPromoterStats');
            const result = await getStats();

            setStats(result.data.stats);
            setEvents(result.data.events);
            setIsPromoterPro(result.data.isPro || false);

            // Fetch Rewards
            try {
                const getRewards = httpsCallable(functions, 'getPromoterRewards');
                const rewardsResult = await getRewards();
                setRewards(rewardsResult.data.rewards || []);
            } catch (e) {
                console.warn("Failed to fetch rewards", e);
                setRewards([]);
            }
        } catch (err) {
            console.error("Failed to load promoter data:", err);
            // Mock data for development if backend fails or doesn't exist yet
            setStats({
                totalCheckins: 142,
                activeEvents: 2,
                totalRevenue: 0, // Placeholder
                todayCheckins: 12
            });
            setEvents([
                {
                    id: 'evt-1',
                    title: 'Soca Sunset',
                    date: '2026-02-14',
                    checkins: 85,
                    capacity: 200,
                    status: 'active',
                    accessCode: 'SUNSET-14'
                },
                {
                    id: 'evt-2',
                    title: 'Cooler Fete',
                    date: '2026-02-20',
                    checkins: 57,
                    capacity: 500,
                    status: 'active',
                    accessCode: 'COOLER-20'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setCreating(true);
        setCreateError('');

        // Free tier limit check
        const activeEventsCount = events.filter(e => e.status === 'active').length;
        if (!isPromoterPro && activeEventsCount >= 3) {
            setCreateError('Free limit reached (3 events). Upgrade to Pro to create more.');
            setCreating(false);
            return;
        }

        try {
            const functions = getFunctions(app);
            const createEvent = httpsCallable(functions, 'createPromoterEvent');
            await createEvent(newEvent);

            // Success
            setActiveTab('events');
            loadDashboardData(); // Refresh list
            setNewEvent({ title: '', date: '', time: '', location: '', capacity: '', type: 'fete', description: '' });
        } catch (err) {
            console.error("Create event error:", err);
            setCreateError(err.message || "Failed to create event");
        } finally {
            setCreating(false);
        }
    };

    const handleCreateReward = async (e) => {
        e.preventDefault();
        setCreatingReward(true);
        try {
            const functions = getFunctions(app);
            const createReward = httpsCallable(functions, 'createPromoterReward');
            await createReward(newReward);

            // Refresh
            const getRewards = httpsCallable(functions, 'getPromoterRewards');
            const rewardsResult = await getRewards();
            setRewards(rewardsResult.data.rewards || []);

            setNewReward({ title: '', cost: '', description: '', quantity: '' });
        } catch (err) {
            console.warn("Failed to create reward (backend may be offline), using mock:", err);
            // Mock success for demo
            setRewards([...rewards, { ...newReward, id: `mock-${Date.now()}` }]);
            setNewReward({ title: '', cost: '', description: '', quantity: '' });
        } finally {
            setCreatingReward(false);
        }
    };

    // Handle upgrade to Promoter Pro
    const handleUpgrade = async () => {
        if (!user) {
            alert("You must be signed in to upgrade.");
            return;
        }

        if (PROMOTER_PRO_PRICE_ID === 'price_PROMOTER_PRO_999') {
            alert("Promoter Pro pricing is being configured. Please try again later.");
            return;
        }

        setIsUpgrading(true);
        try {
            const functions = getFunctions(app);
            const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");

            const result = await createCheckoutSession({
                priceId: PROMOTER_PRO_PRICE_ID,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });

            const { data } = result || {};
            if (data && (data.url || data.checkoutUrl)) {
                window.location.href = data.url || data.checkoutUrl;
            } else {
                alert("Unable to start checkout. Please try again.");
            }
        } catch (error) {
            console.error("Error starting checkout:", error);
            alert("There was a problem starting your checkout: " + error.message);
        } finally {
            setIsUpgrading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="p-2 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg">
                        <Ticket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 dark:text-white">Promoter</h2>
                        <span className="text-xs text-uppercase bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 font-medium">
                            {isPromoterPro ? 'PRO' : 'FREE'}
                        </span>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavButton
                        active={activeTab === 'overview'}
                        label="Overview"
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        onClick={() => setActiveTab('overview')}
                    />
                    <NavButton
                        active={activeTab === 'events'}
                        label="My Events"
                        icon={<Calendar className="w-5 h-5" />}
                        onClick={() => setActiveTab('events')}
                    />
                    <NavButton
                        active={activeTab === 'create'}
                        label="Create Event"
                        icon={<Plus className="w-5 h-5" />}
                        onClick={() => setActiveTab('create')}
                    />
                    <NavButton
                        active={activeTab === 'rewards'}
                        label="Rewards"
                        icon={<Gift className="w-5 h-5" />}
                        onClick={() => setActiveTab('rewards')}
                    />
                    <NavButton
                        active={activeTab === 'resources'}
                        label="Resources"
                        icon={<ImageIcon className="w-5 h-5" />}
                        onClick={() => setActiveTab('resources')}
                    />
                    <NavButton
                        active={activeTab === 'analytics'}
                        label="Analytics"
                        icon={<BarChart3 className="w-5 h-5" />}
                        onClick={() => setActiveTab('analytics')}
                        pro={!isPromoterPro}
                    />
                </nav>

                {!isPromoterPro && (
                    <div className="mt-8 p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white">
                        <h3 className="font-bold mb-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            Go Pro
                        </h3>
                        <p className="text-sm opacity-90 mb-3">Unlimited events & custom codes.</p>
                        <button
                            onClick={handleUpgrade}
                            disabled={isUpgrading}
                            className="w-full py-2 bg-white text-purple-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isUpgrading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                'Upgrade $9.99/mo'
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h1>
                    <button onClick={onExit} className="text-sm text-gray-500 hover:text-gray-700"> Back to Profile</button>
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard label="Total Check-ins" value={stats?.totalCheckins} icon={<Users className="text-blue-500" />} />
                            <StatCard label="Active Events" value={stats?.activeEvents} icon={<Calendar className="text-teal-500" />} />
                            <StatCard label="Today's Activity" value={`+${stats?.todayCheckins || 0}`} icon={<ArrowUpRight className="text-green-500" />} />
                            <StatCard label="Revenue Est." value="-" icon={<DollarSign className="text-gray-400" />} />
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Recent Events</h2>
                            <EventsList events={events.slice(0, 3)} />
                        </div>
                    </div>
                )}

                {/* EVENTS TAB */}
                {activeTab === 'events' && (
                    <div>
                        <EventsList events={events} full />
                    </div>
                )}

                {/* CREATE TAB */}
                {activeTab === 'create' && (
                    <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4">Create New Event</h2>

                        {!isPromoterPro && (
                            <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-500" />
                                <div className="text-sm">
                                    <span className="font-bold text-blue-700 dark:text-blue-300">Free Tier Status:</span>
                                    <span className="text-blue-600 dark:text-blue-400 ml-1">
                                        {events.filter(e => e.status === 'active').length} / 3 active events used.
                                    </span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleCreateEvent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                    placeholder="e.g. Soca Brainwash"
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                        value={newEvent.date}
                                        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                        value={newEvent.time}
                                        onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location / Venue</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                        placeholder="e.g. O2 Park"
                                        value={newEvent.location}
                                        onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                        placeholder="e.g. 500"
                                        value={newEvent.capacity}
                                        onChange={e => setNewEvent({ ...newEvent, capacity: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                                    <select
                                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                                        value={newEvent.type}
                                        onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                                    >
                                        <option value="fete">Fete / Party</option>
                                        <option value="jouvert">J'ouvert</option>
                                        <option value="boat_ride">Boat Ride</option>
                                        <option value="concert">Concert</option>
                                    </select>
                                </div>
                            </div>

                            {createError && (
                                <p className="text-red-500 text-sm">{createError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={creating}
                                className="w-full py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                            >
                                {creating ? <Loader2 className="animate-spin" /> : <Plus className="w-5 h-5" />}
                                Create Event
                            </button>
                        </form>
                    </div>
                )}

                {/* REWARDS TAB */}
                {activeTab === 'rewards' && (
                    <div className="space-y-6">
                        {/* Create Reward Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Gift className="w-5 h-5 text-pink-500" /> Create Reward
                            </h2>
                            <form onSubmit={handleCreateReward} className="grid md:grid-cols-2 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reward Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                                        placeholder="e.g. Free Rum & Coke"
                                        value={newReward.title}
                                        onChange={e => setNewReward({ ...newReward, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cost (Credits)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                                        placeholder="e.g. 500"
                                        value={newReward.cost}
                                        onChange={e => setNewReward({ ...newReward, cost: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                                        placeholder="Details for redemption..."
                                        value={newReward.description}
                                        onChange={e => setNewReward({ ...newReward, description: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={creatingReward}
                                        className="w-full py-2.5 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {creatingReward ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        Add Reward
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Rewards List */}
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white mb-4">Active Rewards</h2>
                            {rewards.length === 0 ? (
                                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                                    <Gift className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500">No rewards created yet.</p>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {rewards.map(reward => (
                                        <div key={reward.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{reward.title}</h3>
                                                <p className="text-sm text-gray-500">{reward.description}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-bold text-pink-600 bg-pink-50 dark:bg-pink-900/20 px-2 py-0.5 rounded-full">
                                                        {reward.cost} Credits
                                                    </span>
                                                    {reward.quantity && (
                                                        <span className="text-xs text-gray-500">
                                                            Limit: {reward.quantity}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-red-500">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* RESOURCES TAB */}
                {activeTab === 'resources' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-8 text-white mb-6">
                            <h2 className="text-2xl font-bold mb-2">Promoter Toolkit</h2>
                            <p className="opacity-90 max-w-xl">
                                High-quality visual assets to help you promote your events and the Carnival Planner app.
                                Download and share on your social media channels.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Square Ad */}
                            <ResourceCard
                                title="Instagram Post"
                                description="Square format (1:1) perfect for Feed posts."
                                image="/assets/promoter-ads/ad-social-square.png"
                                type="Social Media"
                            />

                            {/* Portrait Ad */}
                            <ResourceCard
                                title="Story / Reel"
                                description="Portrait format (9:16) for Stories and TikTok."
                                image="/assets/promoter-ads/ad-story-portrait.png"
                                type="Social Media"
                                portrait
                            />

                            {/* Landscape Ad */}
                            <ResourceCard
                                title="Web Banner"
                                description="Landscape format for banners and headers."
                                image="/assets/promoter-ads/ad-banner-landscape.png"
                                type="Web Asset"
                                className="lg:col-span-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ResourceCard({ title, description, image, type, portrait, className = "" }) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col ${className}`}>
            <div className={`relative bg-gray-100 dark:bg-gray-900 group ${portrait ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <a
                        href={image}
                        download
                        className="px-4 py-2 bg-white text-gray-900 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                        <Download className="w-4 h-4" /> Download
                    </a>
                </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {type}
                    </span>
                </div>
            </div>
        </div>
    );
}

function NavButton({ active, label, icon, onClick, pro }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${active
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {pro && <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded uppercase font-bold">PRO</span>}
        </button>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">{icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
}

function EventsList({ events, full }) {
    if (!events?.length) {
        return (
            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No events found.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {events.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-center">
                            <div>
                                <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">
                                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                </p>
                                <p className="text-lg font-black text-purple-800 dark:text-purple-200 leading-none">
                                    {new Date(event.date).getDate()}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{event.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {event.checkins} checked-in</span>

                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{event.accessCode}</span>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
