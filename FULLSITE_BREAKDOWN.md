# Caribbean Carnival Planner (BandOS / Soca Passport) — Full System Breakdown

This document provides a comprehensive technical and functional breakdown of the Caribbean Carnival Planner platform. It is designed for AI developers, agents, and administrators to understand the entire ecosystem, feature set, system architecture, data models, and service integrations.

---

## 📌 Executive Summary

**Caribbean Carnival Planner** is an all-in-one Progressive Web Application (PWA) and mobile platform (Web + Android via Capacitor) built specifically for the global Caribbean Carnival ecosystem. It serves four distinct user personas:
1. **Masqueraders & Travelers:** End-to-end trip planning, budget management, costume tracking, squad live sync, crowd intelligence, and digital passport gamification.
2. **Band Leaders (BandOS):** Enterprise CRM, costume section builder, distribution time-slot scheduling, registration approval workflows, and financial analytics.
3. **Event Promoters:** Event ticketing, ticket sales management, promoter reward programs, and QR code gate check-ins.
4. **Marketplace Sellers:** Peer-to-peer costume and ticket resale with 3D/AR preview models and Stripe Connect automated payouts.

---

## 🛠️ Technology Stack & System Architecture

### Frontend
- **Framework:** React 18, Vite (dev server & production bundler)
- **Styling:** Tailwind CSS with custom glassmorphism design system (`.glass-panel`, `.glass-btn-primary`), Framer Motion micro-animations
- **Typography:** Display: `Outfit`, Body: `Plus Jakarta Sans` / `Inter`
- **Interactive & 3D:** Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/xr` (Augmented Reality & WebXR)
- **Mapping:** Leaflet & `react-leaflet` with custom map tile markers and distance calculations
- **Audio & Media:** Web Audio API, HTML5 QR Code Scanner, HTML2Canvas, Canvas Confetti
- **Mobile Native Bridge:** Capacitor JS (`@capacitor/core`, `@capacitor/android`, `@capacitor/status-bar`, `@capacitor/splash-screen`)

### Backend & Cloud Infrastructure
- **Primary BaaS:** Firebase (Authentication, Firestore Database, Firebase Storage, Firebase Hosting)
- **Serverless Backend:** Firebase Cloud Functions v2 (Node.js 20 runtime in `/functions2`)
- **Secondary Relational DB:** Supabase (`band_profiles`, CRM registrations, discount structures)
- **Payments Engine:** Stripe Checkout (Subscriptions) & Stripe Connect (Marketplace P2P Seller Payouts)
- **Decentralized & Web3:** Base Network smart contracts via Ethers.js / Thirdweb SDK; Nostr protocol bridge (`nostr-tools`) for Bitchat / decentralized badge attestation
- **Scraper Infrastructure:** Automated scheduled Node.js scrapers (`functions2/scraper.js`) fetching event listings from Fetelist, IslandETickets, and FrontlineTicketing

---

## 🚀 Complete Feature Breakdown by Navigation Tab & Module

---

### 1. 🏠 Home Hub (`HomeHub.jsx`)
- **Carnival Selector:** Switch between 25+ global carnivals (Trinidad & Tobago, Jamaica, St. Lucia, Antigua, Miami, Notting Hill, Crop Over/Barbados, Grenada Spicemas, Toronto Caribana, etc.).
- **Parade Day Countdown:** Dynamic real-time countdown timer to carnival Monday/Tuesday.
- **Trip Dashboard Summary:** Snapshot of budget status, costume readiness, scheduled fetes, and squad member status.
- **Flight Deals Integration (`FlightDealsWidget.jsx`):** Live flight search and deals helper for carnival destinations.

---

### 2. 💰 Budget Planner (`App.jsx` - Budget Tab)
- **Expense Categorization:** Track spending across Flights, Accommodation, Costume, Fetes, Transportation, Emergency Fund, and Miscellaneous.
- **Budget Targets vs. Actuals:** Visual progress bars, total spend breakdown, remaining balances, and expense editing/deletion.
- **Multi-Currency / Multi-Carnival:** Separate budgets per saved carnival destination.

---

### 3. 🎭 Costume Band & Section Tracker (`CostumeDirectory.jsx`, Costume Tab)
- **Costume Band Directory:** Browse official bands, sections, and section details.
- **Payment & Milestone Tracker:** Track deposit paid, installment schedules, balance due date, and distribution pickup confirmation.
- **Try-On Checklist:** Size verification (bra, bottom, collar, belt, wrist/leg pieces) and fitting notes.

---

### 4. 📅 Fete & Event Scheduler (`App.jsx` - Schedule Tab)
- **Curated Event Catalog:** Browse popular fetes filtered by date, time, and type (J'ouvert, All-Inclusive, Boat Ride, Breakfast Party, Cooler Fete, Parade).
- **Custom Event Creator:** Add private squad parties, custom flight arrivals, or house fetes to personal itineraries.
- **Live Scraped Fete Feed (Premium Feature):** Daily auto-scraped event feeds from Fetelist.com, IslandETickets.com, and FrontlineTicketing.com via `scheduledScrapeEvents`.
- **Voice Scheduler (`VoiceScheduler.jsx`):** Hands-free voice-to-text scheduling for adding events on the go.

---

### 5. 👥 Squad Coordination & Road Mode (`SquadChat.jsx`, `SquadVoice.jsx`, `SquadLiveStream.jsx`, `SquadVault.jsx`)
- **Squad Share Codes:** Generate and join squads with unique 6-character access codes (`createSquadShareCode`, `joinSquadByCode`).
- **Real-Time Squad Chat:** In-app group chat powered by Firestore listeners and Nostr bridge.
- **WebRTC Squad Voice Chat (`webrtcService.js`):** Peer-to-peer encrypted voice rooms for squad coordination without cellular phone calls.
- **P2P Live Streaming (`SquadLiveStream.jsx`):** Stream live video from the band route to squad members in real-time.
- **Squad Shared Vault (`SquadVault.jsx`):** Centralized storage for squad house rules, house rental links, group tickets, and shared itineraries.
- **Squad Wagers (`SquadWagerModal.jsx`):** Gamified squad challenges and friendly wagers (e.g. "First squad member on the stage").
- **Road Ready Mode (Live Parade Utilities):**
  - **Mesh Radar / GPS Broadcast:** Broadcasts geolocation coordinates every 30 seconds via `watchPosition` to keep track of squad members in crowded parades.
  - **Bluetooth LE Fallback (`bluetoothService.js`):** Mesh proximity detection when cellular towers are overloaded during peak parade hours.
  - **Emergency SOS & Safety Alerts (`sendSafetyAlert`):** High-priority panic trigger that flashes a full-screen emergency modal with exact GPS coordinates to all connected squad devices.

---

### 6. 🗺️ Interactive Fete Map (`FeteMap.jsx` — Premium Feature)
- **Geospatial Mapping:** Interactive map tailored to each carnival destination using Leaflet.
- **Category Pins:** Filter markers for Accommodations, Fetes, Band Launch Sites, Costume Distribution Centers, and Squad Meetup Points.
- **Distance Calculations:** Compute travel distance and estimated transit time from user's current location.

---

### 7. 📁 Media Vault (`MediaVault.jsx` — Premium Feature)
- **Document & Ticket Storage:** Upload and store event PDF tickets, barcoded passes, flight confirmations, and costume receipts.
- **Offline Access:** Local caching via Firebase Storage & Firestore to access tickets without cell service inside fete venues.

---

### 8. 🎫 Soca Digital Passport & Gamification (`DigitalPassport.jsx`, `PassportHome.jsx`, `StampCollection.jsx`, `AchievementList.jsx`)
- **Web3 Digital Passport Profile:** Auto-provisioned Web3 wallet address on the Base network (`ensureWallet`) paired with a unique Passport ID.
- **Digital Stamps (NFT / On-Chain Attestations):** Mint collectible digital stamps for attending key carnivals, fetes, or completing quests.
- **Bounty Board & Crowd Intelligence (`BountyBoard.jsx`):**
  - Masqueraders report live wait times, bar lines, and upload live crowd photos.
  - Automatically awards passport credits and mints digital stamps via `awardBountyPassportReward`.
- **Flash Quests & Achievements:** Time-based carnival quests and badges (e.g. "J'ouvert Survivor", "Sunrise Fete Master", "Road Ready Pro").
- **Global & Squad Leaderboards (`Leaderboard.jsx`, `SquadLeaderboard.jsx`):** Rank masqueraders based on passport points, stamps, and crowd contributions.

---

### 9. 🛍️ Costume & Ticket Resale Marketplace (`src/components/marketplace/`)
- **P2P Marketplace Grid (`MarketplaceGrid.jsx`):** Buy and sell verified carnival costumes, section tickets, and fete passes.
- **3D / AR Costume Viewer (`CostumeViewerAR.jsx`, `ModelViewer.jsx`):** Interactive 3D model viewer and WebXR Augmented Reality overlay to preview costumes in real-world environments.
- **Stripe Connect Seller Onboarding (`SellerOnboarding.jsx`):** Secure seller verification, express account setup (`createConnectAccount`), and automated payout routing (`createMarketplaceCheckout`).
- **Order History & Management (`OrderHistory.jsx`):** Buyer/seller order status tracking, digital transfer confirmations, and transaction receipts.

---

### 10. 🎺 BandOS — Band Leader Operating System (`src/components/bandos/`)
- **Band Onboarding & Approvals (`BandOSApprovals.jsx`, `BandSignup.jsx`):** Band leader application system with admin vetting.
- **Costume Builder (`CostumeBuilder.jsx`):** Design costume sections, define options (Frontline, Backline, Male, Individual, Feather Upgrades), set deposit tiers and stock inventory counts.
- **Band CRM (`BandCRM.jsx`):** Masquerader registration database, status management (Pending, Approved, Paid, Distribution Ready), and email/FCM notifications.
- **Distribution Time Slot Manager (`TimeSlotManager.jsx`):** Manage costume pickup time slots to streamline band distribution center flow.
- **Financial Analytics (`BandFinancials.jsx`):** Real-time tracking of deposit revenue, total projected sales, outstanding balances, and sales conversions.

---

### 11. 🎤 Promoter Portal & Ticketing (`PromoterDashboard.jsx`)
- **Event Creation & Management:** Create events, set ticket tiers (Early Bird, GA, VIP), define inventory, and generate digital tickets.
- **Revenue Analytics & Payouts:** Real-time tickets sold counter, gross revenue tracking, and Stripe Connect payout management.
- **QR Gate Check-In (`QRCodeScanner.jsx`):** In-app camera QR code scanner for event staff to validate ticket authenticity at the gate.
- **Promoter Rewards Program:** Create custom attendee incentives and reward redemptions (`createPromoterReward`, `redeemPromoterReward`).

---

### 12. 📱 Telecom Store & eSIM Marketplace (`TelecomStore.jsx`, `MyEsims.jsx`)
- **Airalo API Integration:** Browse regional Caribbean eSIM mobile data packages (Trinidad, Jamaica, Barbados, UK, US).
- **Direct Purchase & Provisioning:** Initiate eSIM purchase (`initiateAiraloPurchase`) and view active eSIM installation QR codes in `MyEsims.jsx`.

---

### 13. 🤖 AI Carnival Concierge (`CarnivalConcierge.jsx`)
- **Google Gemini Integration:** Powered by `@google/generative-ai` (Gemini 1.5/2.0 Flash).
- **Personalized Recommendations:** Get tailored answers on fete recommendations, costume section advice, carnival budgets, and safety guidelines.

---

### 14. 🎵 Soca Vibes & Visualizer (`VibesPlayer.jsx`, `SocaVoid.jsx`)
- **In-App Music Player:** Play curated Soca mixes (`soca_drum_beat.mp3`).
- **Dynamic 3D Shader Background (`SocaVoid.jsx`):** Three.js audio-reactive animated particle nebula rendering seamlessly behind dark mode glassmorphism panels.

---

### 15. 🔒 Premium Subscriptions & Admin Tools (`AdminAnalytics.jsx`, `AdManager.jsx`, `SponsorshipManager.jsx`)
- **Freemium vs Premium Tier:**
  - Core features are 100% Free.
  - **Premium ($4.99/mo or $39.99/yr):** Unlocks Ad-Free Experience, Interactive Fete Map, Media Vault, Daily Scraped Live Events, FCM Squad Push Alerts.
- **Admin Control Panel (`djkrss1@gmail.com`):**
  - **Admin Analytics (`AdminAnalytics.jsx`):** View total user count, free vs. premium breakdown, toggle premium status manually.
  - **Ad Manager (`AdManager.jsx`):** Upload promotional banners (up to 5MB), set destination URLs, toggle active status, and track impression analytics (`ReviveAdZone.jsx`).
  - **Sponsorship Manager (`SponsorshipManager.jsx`):** Track sponsored events, featured band placements, and affiliate links (`AffiliateDashboard.jsx`).

---

## 🔒 Security & Data Safety Rules

1. **Firebase Security Rules (`firestore.rules`):** Enforces strict document ownership checks. Admin users (`isAdmin()`) have elevated privileges for user profile approvals and analytics access.
2. **Firestore Indexes (`firestore.indexes.json`):** Optimized compound indexes for query efficiency across events, squads, and marketplace listings.
3. **Storage Security Rules (`storage.rules`):** Enforces file type and size restrictions (5MB max for ads/avatars, 10MB for Media Vault documents).
4. **Environment & Keys:** Sensitive API keys (Stripe Secret Key, Airalo API, Firebase Admin credentials) are restricted to Firebase Functions secret manager environment variables.

---

## 📁 Repository Directory Map

```
/
├── src/
│   ├── App.jsx                         # Main Application Shell, Routes & Tab State (~4500 lines)
│   ├── firebase.js                      # Firebase Initialization ('squad-db' Firestore)
│   ├── carnivals.js                     # Static Carnival Master Catalog (25+ carnivals)
│   ├── components/
│   │   ├── AccountSettings.jsx          # Profile management & account deletion
│   │   ├── AdminAnalytics.jsx           # Admin stats & user management dashboard
│   │   ├── AdminDashboard.jsx           # Platform oversight dashboard
│   │   ├── AdManager.jsx                # Promotional ad manager
│   │   ├── ARCanvas.jsx / ARScene.jsx   # WebXR AR Engine & Waypoints
│   │   ├── BandOSApprovals.jsx          # Band leader approval workflow
│   │   ├── BountyBoard.jsx              # Crowd intelligence reporting
│   │   ├── CarnivalConcierge.jsx        # Google Gemini AI assistant
│   │   ├── DigitalPassport.jsx          # Web3 Digital Passport profile
│   │   ├── FeteMap.jsx                  # Interactive Leaflet map (Premium)
│   │   ├── HomeHub.jsx                  # Main home screen & countdown
│   │   ├── Leaderboard.jsx              # Passport points & badges leaderboard
│   │   ├── MediaVault.jsx               # Document & ticket vault (Premium)
│   │   ├── PassportHome.jsx             # Passport stamps, quests & rewards hub
│   │   ├── PromoterDashboard.jsx        # Event promoter ticketing portal
│   │   ├── QRCodeScanner.jsx            # Event ticket QR gate scanner
│   │   ├── SocaVoid.jsx                 # Dynamic WebGL background nebula
│   │   ├── SplashPage.jsx               # Multi-section marketing landing page
│   │   ├── SquadChat.jsx / SquadVoice   # Squad chat, WebRTC voice, live stream
│   │   ├── bandos/                      # BandOS components (CRM, Costume Builder, TimeSlots)
│   │   ├── marketplace/                 # Costume/Ticket P2P Marketplace & AR Viewers
│   │   └── telecom/                     # Airalo eSIM Store & Management
│   ├── services/
│   │   ├── bandOSService.js             # Supabase / BandOS API handlers
│   │   ├── bluetoothService.js          # BLE offline proximity mesh
│   │   ├── nostrService.js              # Nostr protocol integration
│   │   ├── squadService.js              # Real-time squad state management
│   │   ├── web3Service.js               # Base network wallet & smart contract helpers
│   │   └── webrtcService.js             # P2P WebRTC data & voice connection
├── functions2/                          # Firebase Cloud Functions (Node.js 20)
│   ├── index.js                         # Serverless endpoints (Stripe, Passport, Squads, Marketplace)
│   ├── scraper.js                       # Daily web scrapers for carnival event listings
│   └── vibeEngine.js                    # Crowd vibe calculation engine
├── firebase.json                        # Firebase Hosting & Functions configuration
├── firestore.rules                      # Security access rules for Firestore
├── storage.rules                        # Security access rules for Firebase Storage
├── capacitor.config.ts                  # Capacitor native mobile config
├── package.json                         # Dependencies & npm scripts
└── CLAUDE.md                            # Operational guide for developers & AI agents
```

---

## ⚡ Quick Reference Commands for AI Agents

- **Start Local Server:** `npm run dev` (Runs Vite on `http://localhost:5173`)
- **Production Build:** `npm run build`
- **Deploy Hosting:** `npx firebase deploy --only hosting`
- **Deploy Functions:** `npx firebase deploy --only functions`
- **Deploy Rules:** `npx firebase deploy --only firestore:rules`
