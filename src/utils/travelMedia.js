/**
 * Travel Media Fallbacks & URL Resolution Utility
 * 
 * Protects travel packages and Moy Meets World pages from broken images or
 * delinquent Google Cloud / Firebase Storage endpoints (HTTP 402).
 * Serves authentic high-resolution assets locally via high-speed CDN.
 */

export const TRAVEL_ASSETS = {
  thailandCard: '/images/travel/thailand_card.jpeg',
  thailandHero: '/images/travel/thailand_hero.jpeg',
  stluciaCard: '/images/travel/stlucia_card.jpeg',
  stluciaHero: '/images/travel/stlucia_hero.jpeg',
  moyLifestyle: '/images/travel/moy_lifestyle.jpeg',
  moyHeadshot: '/images/travel/moy_headshot.jpeg',
  logo: '/images/moymeetsworld_logo.jpg'
};

export function getTravelImageFallback(context = {}) {
  const dest = `${context.country || ''} ${context.location || ''} ${context.title || ''}`.toLowerCase();
  const isHero = Boolean(context.isHero);

  if (context.type === 'avatar' || context.type === 'headshot' || context.type === 'photo') {
    return TRAVEL_ASSETS.moyHeadshot;
  }
  if (context.type === 'lifestyle' || context.type === 'banner' || context.type === 'heroArtwork' || context.type === 'background') {
    return TRAVEL_ASSETS.moyLifestyle;
  }
  if (dest.includes('thailand') || dest.includes('thai')) {
    return isHero ? TRAVEL_ASSETS.thailandHero : TRAVEL_ASSETS.thailandCard;
  }
  return isHero ? TRAVEL_ASSETS.stluciaHero : TRAVEL_ASSETS.stluciaCard;
}

export function resolveTravelImageUrl(url, context = {}) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return getTravelImageFallback(context);
  }

  const trimmed = url.trim();

  // If already a web-safe Data URL (client-side compressed upload), return immediately
  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  // If pointing to delinquent or failing carnival-planner Firebase Storage, map to authentic local CDN asset
  if (
    trimmed.includes('carnival-planner.firebasestorage.app') ||
    (trimmed.includes('firebasestorage.googleapis.com') && trimmed.includes('carnival-planner'))
  ) {
    if (trimmed.includes('1787630604') || trimmed.includes('4f8c36a3')) {
      return TRAVEL_ASSETS.thailandCard;
    }
    if (trimmed.includes('1787630264') || (trimmed.includes('WhatsApp_Image_2026-08-24') && trimmed.includes('11.55.45'))) {
      return TRAVEL_ASSETS.thailandHero;
    }
    if (trimmed.includes('1787630878') || trimmed.includes('1787630888') || trimmed.includes('7f8c93d1')) {
      return context.isHero ? TRAVEL_ASSETS.stluciaHero : TRAVEL_ASSETS.stluciaCard;
    }
    if (trimmed.includes('1787632241') || trimmed.includes('ce0a511f')) {
      return TRAVEL_ASSETS.moyHeadshot;
    }
    if (trimmed.includes('1787674458') || trimmed.includes('WhatsApp_Image_2026-08-25')) {
      return TRAVEL_ASSETS.moyLifestyle;
    }
    return getTravelImageFallback(context);
  }

  return trimmed;
}

export function sanitizePackageData(pkg) {
  if (!pkg || typeof pkg !== 'object') return pkg;
  const country = pkg.country || pkg.location || pkg.title || '';
  return {
    ...pkg,
    cardImage: resolveTravelImageUrl(pkg.cardImage, { country, title: pkg.title, isHero: false }),
    heroImage: resolveTravelImageUrl(pkg.heroImage, { country, title: pkg.title, isHero: true })
  };
}
