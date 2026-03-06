/**
 * ReviveAdZone.jsx — Sponsored ad zone component
 *
 * Renders a sponsored ad from the ad service. Falls back to the existing
 * PromoAd component when no sponsored ad is available. Premium users
 * see nothing (no ads).
 *
 * Usage:
 *   <ReviveAdZone zone="banner-top" isPremium={isPremium} onUpgradeClick={fn} />
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchAdForZone, recordImpression, recordClick } from '../services/adService';
import PromoAd from './PromoAd';
import { ExternalLink } from 'lucide-react';

const PLACEMENT_MAP = {
    'banner-top': 'banner',
    'sidebar-right': 'sidebar',
    'inline-feed': 'inline',
    'fete-map': 'inline',
};

export default function ReviveAdZone({
    zone = 'banner-top',
    isPremium = false,
    onUpgradeClick,
    className = '',
}) {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [impressionRecorded, setImpressionRecorded] = useState(false);
    const containerRef = useRef(null);

    // Fetch a sponsored ad for this zone
    useEffect(() => {
        if (isPremium) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        fetchAdForZone(zone).then((result) => {
            if (!cancelled) {
                setAd(result);
                setLoading(false);
            }
        });
        return () => { cancelled = true; };
    }, [zone, isPremium]);

    // Track impression when ad enters viewport
    useEffect(() => {
        if (!ad || impressionRecorded || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    recordImpression(ad.id);
                    setImpressionRecorded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [ad, impressionRecorded]);

    // Handle click tracking
    const handleClick = useCallback(() => {
        if (!ad) return;
        recordClick(ad.id);
        if (ad.linkUrl) {
            window.open(ad.linkUrl, '_blank', 'noopener,noreferrer');
        }
    }, [ad]);

    // Premium users see nothing
    if (isPremium) return null;

    // Still loading
    if (loading) return null;

    // No sponsored ad — fall back to existing PromoAd
    if (!ad) {
        const placement = PLACEMENT_MAP[zone] || 'banner';
        return <PromoAd placement={placement} className={className} onUpgradeClick={onUpgradeClick} />;
    }

    // ── Render the sponsored ad ──
    const isVideo = ad.mediaType === 'video';

    return (
        <div
            ref={containerRef}
            className={`relative group cursor-pointer overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg ${className}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            {/* Sponsored badge */}
            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                Sponsored
            </div>

            {/* Ad content */}
            {isVideo ? (
                <video
                    src={ad.imageUrl}
                    className="w-full h-auto max-h-[200px] object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <img
                    src={ad.imageUrl}
                    alt={ad.title || 'Sponsored'}
                    className="w-full h-auto max-h-[200px] object-cover"
                    loading="lazy"
                />
            )}

            {/* Title overlay */}
            {ad.title && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center justify-between">
                        <p className="text-white text-sm font-medium truncate">{ad.title}</p>
                        {ad.linkUrl && (
                            <ExternalLink className="w-3.5 h-3.5 text-white/70 flex-shrink-0 ml-2" />
                        )}
                    </div>
                    {ad.advertiserName && (
                        <p className="text-white/60 text-xs mt-0.5">{ad.advertiserName}</p>
                    )}
                </div>
            )}
        </div>
    );
}
