// --- CONFIGURATION ---
export const appId = 'carnival-planner-v1';

// ✅ STRIPE PRICE IDs (Updated from your request)
export const STRIPE_MONTHLY_PRICE_ID = 'price_1SanHUJR9xpdRiXijLesRPVt';
export const STRIPE_YEARLY_PRICE_ID = 'price_1SanMhJR9xpdRiXinv2F9knM';

// Curated Fete Database (Free for all users)
export const POPULAR_EVENTS = {
  trinidad: [
    { title: "Soca Brainwash", note: "The main event. Bring drinks." },
    { title: "AM Bush", note: "J'ouvert style. Wear old clothes." },
    { title: "Phuket", note: "All inclusive." },
    { title: "Soaka Street Festival", note: "Iron park." },
  ],
  stlucia: [
    { title: "Remedy", note: "Beachside." },
    { title: "Mess", note: "Paint and Powder." },
    { title: "Indulgence", note: "Breakfast fete." },
  ],
  default: [
    { title: "Catamaran Cruise", note: "Boat ride." },
    { title: "J'ouvert", note: "Paint and powder." },
    { title: "Monday Mas", note: "On the road." },
  ]
};

// Hub Navigation Maps
export const TAB_TO_HUB = {
  Budget: 'plan',
  Costume: 'plan',
  Bands: 'plan',
  Schedule: 'plan',
  Packing: 'plan',
  Guides: 'plan',
  Squad: 'squad',
  Vault: 'squad',
  Map: 'squad',
  Passport: 'passport',
  Bounties: 'passport',
  Leaderboard: 'passport',
  Marketplace: 'store',
  Profile: 'profile',
  Media: 'profile',
  Promoter: 'profile',
  Info: 'profile',
};

export const HUB_DEFAULT_TAB = {
  plan: 'Budget',
  squad: 'Squad',
  passport: 'Passport',
  store: 'Marketplace',
  profile: 'Profile',
};
