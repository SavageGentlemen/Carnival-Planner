import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { X } from 'lucide-react';

const DEFAULT_PREMIUM_ADS = [
  {
    id: 'default-fete-map-banner',
    title: 'Unlock Interactive Fete Map',
    imageUrl: '/images/promo/premium_fete_map_promo_banner.png',
    placement: 'banner',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-media-vault-banner',
    title: 'Store Your Tickets & Photos',
    imageUrl: '/images/promo/premium_media_vault_promo_banner.png',
    placement: 'banner',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-offline-banner',
    title: 'Plan Offline, Anywhere',
    imageUrl: '/images/promo/premium_offline_mode_promo_banner.png',
    placement: 'banner',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-premium-banner',
    title: 'Go Premium - Ad Free Experience',
    imageUrl: '/images/promo/premium_subscription_promo_banner.png',
    placement: 'banner',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-fete-map-inline',
    title: 'Unlock Interactive Fete Map',
    imageUrl: '/images/promo/premium_fete_map_promo_banner.png',
    placement: 'inline',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-media-vault-inline',
    title: 'Store Your Tickets & Photos',
    imageUrl: '/images/promo/premium_media_vault_promo_banner.png',
    placement: 'inline',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-offline-inline',
    title: 'Plan Offline, Anywhere',
    imageUrl: '/images/promo/premium_offline_mode_promo_banner.png',
    placement: 'inline',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'default-premium-inline',
    title: 'Go Premium - Ad Free Experience',
    imageUrl: '/images/promo/premium_subscription_promo_banner.png',
    placement: 'inline',
    mediaType: 'image',
    linkUrl: null,
    isDefault: true,
  },
  {
    id: 'madd-colors-banner-v2',
    title: 'Madd Colors Carnival - Atlanta',
    imageUrl: 'https://www.atlanta-carnival.com/uploads/2/6/6/0/26602334/madd-logo26.jpg',
    placement: 'banner',
    mediaType: 'image',
    linkUrl: 'https://maddcolorscarnival.com/',
    isDefault: false,
  },
  {
    id: 'madd-colors-inline-v2',
    title: 'Madd Colors Carnival - Atlanta',
    imageUrl: 'https://www.atlanta-carnival.com/uploads/2/6/6/0/26602334/madd-logo26.jpg',
    placement: 'inline',
    mediaType: 'image',
    linkUrl: 'https://maddcolorscarnival.com/',
    isDefault: false,
  },
];

export default function PromoAd({ placement = 'banner', className = '', onUpgradeClick }) {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const adsRef = collection(db, 'promoAds');
    const q = query(adsRef, where('active', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allAds = [];
      snapshot.forEach((doc) => {
        allAds.push({ id: doc.id, ...doc.data() });
      });
      const filteredAds = allAds.filter(ad => ad.placement === placement);

      // ALWAYS append Madd Colors if it matches placement
      // Just check if we already have it to avoid duplication? The logic below overwrites.
      // Better strategy: Use the default list as BASE if filteredAds is empty, 
      // BUT specifically for Madd Colors, force inject it if 'allAds' didn't have it.

      const maddColorsAd = DEFAULT_PREMIUM_ADS.find(ad => ad.id.includes('madd-colors') && ad.placement === placement);

      let finalAds = filteredAds;
      if (filteredAds.length === 0) {
        finalAds = DEFAULT_PREMIUM_ADS.filter(ad => ad.placement === placement);
      } else if (maddColorsAd) {
        // If we have ads but not Madd Colors, add it
        const hasMadd = filteredAds.some(ad => ad.id.includes('madd-colors'));
        if (!hasMadd) {
          finalAds = [...filteredAds, { ...maddColorsAd, isDefault: false }];
        }
      }

      if (finalAds.length > 0) {
        setAds(finalAds);
      } else {
        // Fallback to purely default
        const defaultAds = DEFAULT_PREMIUM_ADS.filter(ad => ad.placement === placement);
        setAds(defaultAds);
      }
      setLoading(false);
    }, (err) => {
      console.error(`PromoAd [${placement}] error:`, err);
      const defaultAds = DEFAULT_PREMIUM_ADS.filter(ad => ad.placement === placement);
      setAds(defaultAds);
      setError(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [placement]);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [ads.length]);

  if (loading) return null;

  if (dismissed || ads.length === 0) return null;

  const safeIndex = Math.min(currentAdIndex, ads.length - 1);
  const currentAd = ads[safeIndex];

  if (!currentAd || !currentAd.imageUrl) return null;

  const isVideo = currentAd.mediaType === 'video';
  // FORCE OVERRIDE: Ensure Madd Colors is NEVER treated as default/premium upgrade
  const isDefaultAd = currentAd.id.includes('madd-colors') ? false : currentAd.isDefault;
  const linkUrl = currentAd.id.includes('madd-colors') ? 'https://maddcolorscarnival.com/' : currentAd.linkUrl;

  const handleClick = () => {
    if (isDefaultAd && onUpgradeClick) {
      onUpgradeClick();
    } else if (currentAd.linkUrl) {
      window.open(currentAd.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`p-4 relative ${className}`}>
      <div
        onClick={handleClick}
        className={`relative overflow-hidden rounded-lg shadow-md ${(currentAd.linkUrl || isDefaultAd) ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      >
        {isVideo ? (
          <video
            src={currentAd.imageUrl}
            className="w-full h-auto object-cover"
            style={{ maxHeight: placement === 'banner' ? '120px' : '250px' }}
            autoPlay
            muted
            loop
            playsInline
            onError={(e) => console.error('Video load error:', e)}
          />
        ) : (
          <img
            src={currentAd.imageUrl}
            alt={currentAd.title || 'Promotion'}
            className="w-full h-auto object-cover"
            style={{ maxHeight: placement === 'banner' ? '120px' : '250px' }}
            onError={(e) => {
              console.error('Image load error:', currentAd.imageUrl);
              e.target.style.display = 'none';
            }}
          />
        )}
        {currentAd.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white text-sm font-bold truncate">{currentAd.title}</p>
            {isDefaultAd && (
              <p className="text-yellow-300 text-xs font-medium">Tap to upgrade to Premium</p>
            )}
          </div>
        )}
        <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">
          {isDefaultAd ? 'PREMIUM' : 'AD'}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
          <X className="w-3 h-3" />
        </button>
        {ads.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {ads.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition ${idx === currentAdIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
