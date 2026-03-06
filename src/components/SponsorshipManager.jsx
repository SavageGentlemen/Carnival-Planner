/**
 * SponsorshipManager.jsx — Admin panel for managing direct sponsorships.
 *
 * Supports advertiser profiles, campaign management with date ranges
 * and impression caps, zone assignments, and performance analytics.
 */
import { useState, useEffect, useRef } from 'react';
import {
    collection, addDoc, deleteDoc, doc, updateDoc, setDoc, Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import {
    subscribeToSponsoredAds, subscribeToAdvertisers, AD_ZONES
} from '../services/adService';
import {
    Plus, Trash2, ExternalLink, Image, Video, ToggleLeft, ToggleRight,
    Loader2, Users, BarChart3, Target, Calendar, DollarSign, TrendingUp,
    Building2, ChevronDown, ChevronUp, X, Eye, MousePointer
} from 'lucide-react';

// ── Sub-views ──
const VIEWS = ['campaigns', 'advertisers', 'analytics'];

export default function SponsorshipManager() {
    const [view, setView] = useState('campaigns');
    const [ads, setAds] = useState([]);
    const [advertisers, setAdvertisers] = useState([]);
    const [showCampaignForm, setShowCampaignForm] = useState(false);
    const [showAdvertiserForm, setShowAdvertiserForm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const fileInputRef = useRef(null);

    const [newCampaign, setNewCampaign] = useState({
        title: '', linkUrl: '', zone: 'banner-top', advertiserId: '',
        startDate: '', endDate: '', impressionCap: '', weight: 1,
    });

    const [newAdvertiser, setNewAdvertiser] = useState({
        name: '', contact: '', email: '', notes: '', budget: '',
    });

    // ── Subscriptions ──
    useEffect(() => {
        const unsub1 = subscribeToSponsoredAds(setAds);
        const unsub2 = subscribeToAdvertisers(setAdvertisers);
        return () => { unsub1(); unsub2(); };
    }, []);

    // ── Advertiser CRUD ──
    const handleCreateAdvertiser = async (e) => {
        e.preventDefault();
        if (!newAdvertiser.name.trim()) return;
        try {
            await addDoc(collection(db, 'advertisers'), {
                ...newAdvertiser,
                budget: newAdvertiser.budget ? parseFloat(newAdvertiser.budget) : 0,
                createdAt: Timestamp.now(),
            });
            setNewAdvertiser({ name: '', contact: '', email: '', notes: '', budget: '' });
            setShowAdvertiserForm(false);
        } catch (err) {
            console.error('Create advertiser error:', err);
            alert('Failed to create advertiser: ' + err.message);
        }
    };

    const deleteAdvertiser = async (adv) => {
        if (!confirm(`Delete advertiser "${adv.name}"?`)) return;
        try {
            await deleteDoc(doc(db, 'advertisers', adv.id));
        } catch (err) {
            console.error('Delete advertiser error:', err);
        }
    };

    // ── Campaign (Sponsored Ad) CRUD ──
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isVideoFile = file.type.startsWith('video/');
        const maxSize = isVideoFile ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert(`File too large. Max: ${isVideoFile ? '10MB' : '5MB'}.`);
            return;
        }

        setIsUploading(true);
        setUploadStatus('Uploading...');

        try {
            const ts = Date.now();
            const ext = file.name.split('.').pop();
            const path = `sponsoredAds/${ts}.${ext}`;
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            const advertiser = advertisers.find(a => a.id === newCampaign.advertiserId);

            const adData = {
                title: newCampaign.title || '',
                linkUrl: newCampaign.linkUrl || '',
                zone: newCampaign.zone,
                advertiserId: newCampaign.advertiserId || null,
                advertiserName: advertiser?.name || '',
                imageUrl: url,
                mediaType: isVideoFile ? 'video' : 'image',
                storagePath: path,
                active: true,
                weight: parseInt(newCampaign.weight) || 1,
                impressionCap: newCampaign.impressionCap ? parseInt(newCampaign.impressionCap) : null,
                startDate: newCampaign.startDate ? Timestamp.fromDate(new Date(newCampaign.startDate)) : null,
                endDate: newCampaign.endDate ? Timestamp.fromDate(new Date(newCampaign.endDate)) : null,
                impressions: 0,
                clicks: 0,
                createdAt: Timestamp.now(),
            };

            await addDoc(collection(db, 'sponsoredAds'), adData);
            alert('Sponsored ad campaign created!');
            setNewCampaign({ title: '', linkUrl: '', zone: 'banner-top', advertiserId: '', startDate: '', endDate: '', impressionCap: '', weight: 1 });
            setShowCampaignForm(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            console.error('Upload error:', err);
            alert('Failed to create campaign: ' + err.message);
        }

        setIsUploading(false);
        setUploadStatus('');
    };

    const toggleCampaignActive = async (ad) => {
        try {
            await updateDoc(doc(db, 'sponsoredAds', ad.id), { active: !ad.active });
        } catch (err) {
            console.error('Toggle error:', err);
        }
    };

    const deleteCampaign = async (ad) => {
        if (!confirm(`Delete campaign "${ad.title || 'Untitled'}"?`)) return;
        try {
            if (ad.storagePath) {
                await deleteObject(ref(storage, ad.storagePath)).catch(() => { });
            }
            await deleteDoc(doc(db, 'sponsoredAds', ad.id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    // ── Stats helpers ──
    const totalImpressions = ads.reduce((s, a) => s + (a.impressions || 0), 0);
    const totalClicks = ads.reduce((s, a) => s + (a.clicks || 0), 0);
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
    const activeCampaigns = ads.filter(a => a.active).length;

    // ────────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    Sponsorship Manager
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sell premium ad space directly to Mas Bands, Promoters & Hotels — keep 100% revenue
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Active Campaigns', value: activeCampaigns, icon: Target, color: 'text-purple-500' },
                    { label: 'Total Impressions', value: totalImpressions.toLocaleString(), icon: Eye, color: 'text-blue-500' },
                    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: MousePointer, color: 'text-green-500' },
                    { label: 'CTR', value: `${ctr}%`, icon: TrendingUp, color: 'text-orange-500' },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
                        <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* View Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {VIEWS.map(v => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md capitalize transition ${view === v
                                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                            }`}
                    >
                        {v}
                    </button>
                ))}
            </div>

            {/* ── Campaigns View ── */}
            {view === 'campaigns' && (
                <div className="space-y-4">
                    <button
                        onClick={() => setShowCampaignForm(!showCampaignForm)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                    >
                        <Plus className="w-4 h-4" /> New Campaign
                    </button>

                    {showCampaignForm && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 space-y-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <input
                                    type="text" placeholder="Campaign title"
                                    value={newCampaign.title}
                                    onChange={e => setNewCampaign({ ...newCampaign, title: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <input
                                    type="url" placeholder="Click-through URL"
                                    value={newCampaign.linkUrl}
                                    onChange={e => setNewCampaign({ ...newCampaign, linkUrl: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <select
                                    value={newCampaign.zone}
                                    onChange={e => setNewCampaign({ ...newCampaign, zone: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    {Object.entries(AD_ZONES).map(([id, z]) => (
                                        <option key={id} value={id}>{z.label} ({z.size})</option>
                                    ))}
                                </select>
                                <select
                                    value={newCampaign.advertiserId}
                                    onChange={e => setNewCampaign({ ...newCampaign, advertiserId: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">Select Advertiser (optional)</option>
                                    {advertisers.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="date" placeholder="Start date"
                                    value={newCampaign.startDate}
                                    onChange={e => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <input
                                    type="date" placeholder="End date"
                                    value={newCampaign.endDate}
                                    onChange={e => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <input
                                    type="number" placeholder="Impression cap (optional)"
                                    value={newCampaign.impressionCap}
                                    onChange={e => setNewCampaign({ ...newCampaign, impressionCap: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <input
                                    type="number" placeholder="Weight (1-10)" min="1" max="10"
                                    value={newCampaign.weight}
                                    onChange={e => setNewCampaign({ ...newCampaign, weight: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            <input
                                ref={fileInputRef} type="file"
                                accept="image/*,video/mp4,video/webm"
                                onChange={handleFileUpload}
                                className="hidden" id="sponsored-upload"
                            />
                            <label
                                htmlFor="sponsored-upload"
                                className={`flex flex-col items-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition ${isUploading
                                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                                        : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                                    }`}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                                        <span className="text-purple-600">{uploadStatus}</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Image className="w-5 h-5 text-purple-500" />
                                            <Video className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <span className="text-purple-600 font-medium">Upload ad creative</span>
                                        <span className="text-xs text-gray-500">Images max 5MB · Videos max 10MB</span>
                                    </>
                                )}
                            </label>
                        </div>
                    )}

                    {/* Campaign List */}
                    {ads.length > 0 ? (
                        <div className="space-y-3">
                            {ads.map(ad => {
                                const impressions = ad.impressions || 0;
                                const clicks = ad.clicks || 0;
                                const adCtr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : '0.0';
                                const capPct = ad.impressionCap ? Math.round((impressions / ad.impressionCap) * 100) : null;

                                return (
                                    <div
                                        key={ad.id}
                                        className={`flex items-center gap-4 p-3 rounded-lg border transition ${ad.active
                                                ? 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                                : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
                                            }`}
                                    >
                                        {ad.mediaType === 'video' ? (
                                            <video src={ad.imageUrl} className="w-20 h-14 object-cover rounded" muted />
                                        ) : (
                                            <img src={ad.imageUrl} alt={ad.title || 'Ad'} className="w-20 h-14 object-cover rounded" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 dark:text-white truncate">
                                                {ad.title || 'Untitled Campaign'}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {AD_ZONES[ad.zone]?.label || ad.zone}
                                                {ad.advertiserName && ` · ${ad.advertiserName}`}
                                            </p>
                                            <div className="flex gap-3 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" /> {impressions.toLocaleString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MousePointer className="w-3 h-3" /> {clicks.toLocaleString()}
                                                </span>
                                                <span>{adCtr}% CTR</span>
                                                {capPct !== null && (
                                                    <span className={capPct >= 90 ? 'text-red-500' : ''}>{capPct}% of cap</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => toggleCampaignActive(ad)}
                                                className={`p-2 rounded-lg transition ${ad.active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                                title={ad.active ? 'Active' : 'Inactive'}
                                            >
                                                {ad.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                            </button>
                                            {ad.linkUrl && (
                                                <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer"
                                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            <button onClick={() => deleteCampaign(ad)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Target className="w-16 h-16 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No sponsored campaigns yet</p>
                            <p className="text-sm">Create your first campaign to sell premium ad space</p>
                        </div>
                    )}
                </div>
            )}

            {/* ── Advertisers View ── */}
            {view === 'advertisers' && (
                <div className="space-y-4">
                    <button
                        onClick={() => setShowAdvertiserForm(!showAdvertiserForm)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                    >
                        <Plus className="w-4 h-4" /> Add Advertiser
                    </button>

                    {showAdvertiserForm && (
                        <form onSubmit={handleCreateAdvertiser}
                            className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 space-y-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <input type="text" placeholder="Business name *" required
                                    value={newAdvertiser.name}
                                    onChange={e => setNewAdvertiser({ ...newAdvertiser, name: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                <input type="text" placeholder="Contact person"
                                    value={newAdvertiser.contact}
                                    onChange={e => setNewAdvertiser({ ...newAdvertiser, contact: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                <input type="email" placeholder="Email"
                                    value={newAdvertiser.email}
                                    onChange={e => setNewAdvertiser({ ...newAdvertiser, email: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                <input type="number" placeholder="Budget ($)"
                                    value={newAdvertiser.budget}
                                    onChange={e => setNewAdvertiser({ ...newAdvertiser, budget: e.target.value })}
                                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <textarea placeholder="Notes" rows={2}
                                value={newAdvertiser.notes}
                                onChange={e => setNewAdvertiser({ ...newAdvertiser, notes: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            <button type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                                Save Advertiser
                            </button>
                        </form>
                    )}

                    {advertisers.length > 0 ? (
                        <div className="space-y-3">
                            {advertisers.map(adv => {
                                const advAds = ads.filter(a => a.advertiserId === adv.id);
                                const advImpressions = advAds.reduce((s, a) => s + (a.impressions || 0), 0);
                                const advClicks = advAds.reduce((s, a) => s + (a.clicks || 0), 0);

                                return (
                                    <div key={adv.id}
                                        className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white flex items-center gap-2">
                                                    <Building2 className="w-4 h-4 text-purple-500" />
                                                    {adv.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {adv.contact && `${adv.contact} · `}
                                                    {adv.email && `${adv.email} · `}
                                                    {advAds.length} campaign{advAds.length !== 1 ? 's' : ''}
                                                    {adv.budget ? ` · $${adv.budget} budget` : ''}
                                                </p>
                                                <div className="flex gap-3 mt-1 text-xs text-gray-500">
                                                    <span>{advImpressions.toLocaleString()} impressions</span>
                                                    <span>{advClicks.toLocaleString()} clicks</span>
                                                </div>
                                            </div>
                                            <button onClick={() => deleteAdvertiser(adv)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Building2 className="w-16 h-16 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No advertisers yet</p>
                            <p className="text-sm">Add Mas Bands, Promoters, or Hotels as advertisers</p>
                        </div>
                    )}
                </div>
            )}

            {/* ── Analytics View ── */}
            {view === 'analytics' && (
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-3">
                            <BarChart3 className="w-4 h-4 text-purple-500" />
                            Campaign Performance
                        </h4>
                        {ads.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-600">
                                            <th className="pb-2 font-medium">Campaign</th>
                                            <th className="pb-2 font-medium">Zone</th>
                                            <th className="pb-2 font-medium text-right">Impressions</th>
                                            <th className="pb-2 font-medium text-right">Clicks</th>
                                            <th className="pb-2 font-medium text-right">CTR</th>
                                            <th className="pb-2 font-medium text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-gray-600">
                                        {ads.map(ad => {
                                            const imp = ad.impressions || 0;
                                            const clk = ad.clicks || 0;
                                            const r = imp > 0 ? ((clk / imp) * 100).toFixed(2) : '0.00';
                                            return (
                                                <tr key={ad.id} className="text-gray-700 dark:text-gray-300">
                                                    <td className="py-2 truncate max-w-[120px]">{ad.title || 'Untitled'}</td>
                                                    <td className="py-2 text-xs">{AD_ZONES[ad.zone]?.label || ad.zone}</td>
                                                    <td className="py-2 text-right font-mono">{imp.toLocaleString()}</td>
                                                    <td className="py-2 text-right font-mono">{clk.toLocaleString()}</td>
                                                    <td className="py-2 text-right font-mono">{r}%</td>
                                                    <td className="py-2 text-right">
                                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ad.active
                                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                                            }`}>
                                                            {ad.active ? 'Active' : 'Paused'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-6">No campaign data yet</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
