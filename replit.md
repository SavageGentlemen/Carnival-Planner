# Caribbean Carnival Planner

## Overview

Caribbean Carnival Planner is a Progressive Web App (PWA) designed to help users discover, plan, and track Caribbean carnival events. The application provides carnival countdown features, event information, and premium subscription capabilities through Stripe integration.

The app is built as a React single-page application with Firebase as the backend-as-a-service platform, providing authentication, Firestore database, and hosting.

## Freemium Model

**All core planning features are FREE:**
- Google and Email/Password authentication
- Carnival selection (25 carnivals)
- Multi-carnival planning
- Budget planner
- Costume tracker
- Event scheduler with curated popular events
- Packing list
- Squad coordination with share codes
- Road Ready Mode
- Export itinerary

**Premium subscription provides:**
- Ad-free experience (removes promotional ads and the "Unlock Premium Features" banner)
- Premium Supporter badge displayed in the header
- Live Event Listings - Daily-scraped fete/event data from fetelist.com, frontlineticketing.com, and islandetickets.com shown in Schedule tab
- Interactive Fete Map (Map tab) - country-specific maps with pins for accommodation, fetes, costume pickup, meetup spots with distance calculations
- Media Vault (Media tab) - upload and store tickets, photos, and important documents for each carnival with view/download/delete capabilities
- Offline Mode - Firestore data cached locally for use without internet connection
- Road Ready Squad Alerts - Push notifications to squad members when you go Road Ready (toggle in Squad tab)

**Admin Features (djkrss1@gmail.com only):**
- Ad Manager - Upload and manage promotional ads/flyers shown to free users
  - Located in Info tab
  - Upload images up to 5MB
  - Set optional title and click-through URL
  - Toggle ads active/inactive
  - Auto-rotation for multiple ads
- Admin Analytics Dashboard (`src/components/AdminAnalytics.jsx`)
  - Located in Info tab (admin only)
  - User statistics: total users, premium vs free breakdown
  - Searchable user list with profile details
  - Expandable user cards showing signup date, carnival count
  - Toggle premium status for individual users (writes to `users/{uid}/apps/{appId}.premiumActive`)
  - Visual distinction for email-override premium users (purple "Admin" badge)

**Default Premium Promo Ads:**
- When no admin-uploaded ads exist, the app displays built-in premium feature promotions
- Four rotating banner images promoting: Fete Map, Media Vault, Offline Mode, Ad-Free Experience
- Clicking default ads takes users to the Info tab to upgrade
- Images stored in `public/images/promo/`

The premium model provides enhanced features for travelers while keeping core planning functionality free.

## User Preferences

Preferred communication style: Simple, everyday language.

## Design Notes

### Splash Page (Dec 2025 - Redesigned)
New multi-section scrollable splash page (`src/components/SplashPage.jsx`):
- **Hero Section**: Animated parallax background orbs, logo with glow effect, "Plan Your Perfect Carnival" gradient title, "Get Started Free" CTA button
- **Carnival Carousel**: Auto-rotating showcase of 6 featured carnivals (Trinidad, Jamaica, St. Lucia, Antigua, Miami, Notting Hill) with colorful gradient cards
- **Free Features Section**: 6 feature cards with icons (Budget Planner, Costume Tracker, Event Scheduler, Squad Coordination, Packing List, Road Ready Mode) - marked as "100% FREE"
- **Premium Features Section**: 4 premium feature cards (Interactive Fete Map, Media Vault, Offline Mode, Ad-Free Experience) with pricing ($4.99/month or $39.99/year)
- **Final CTA Section**: "Ready to Plan Your Best Carnival Yet?" with large action button
- **Footer**: Logo, tagline, legal links (Privacy Policy, Terms of Service, Cookie Policy, Refund Policy), and copyright

### Legal Pages (Dec 2025)
Comprehensive legal documentation in `src/components/LegalPages.jsx`:
- **Privacy Policy**: GDPR/CCPA compliant, covers Google Auth data, Firebase storage, Stripe payments, user rights
- **Terms of Service**: User accounts, premium subscriptions, user content, acceptable use, liability
- **Cookie Policy**: Essential cookies (Firebase Auth), functional cookies, third-party cookies, management instructions
- **Refund Policy**: Subscription cancellation terms, refund eligibility, process for requesting refunds

Legal pages are accessible from footer links on both the splash page and main app view.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with Vite as the build tool and dev server
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer for utility-first styling
- **Dark Mode**: Dark mode enabled by default, user preference persisted per user in Firestore, toggleable via header button
- **PWA Support**: Full Progressive Web App setup with manifest.json, service worker support, and mobile-optimized meta tags
- **Icons**: Lucide React for iconography
- **Utilities**: clsx and tailwind-merge for conditional class handling

### Backend Architecture

- **Platform**: Firebase (Authentication, Firestore, Hosting, Cloud Functions)
- **Cloud Functions**: Node.js 20 runtime in `functions2/` directory
- **Payment Processing**: Stripe integration for premium subscriptions
  - Checkout session creation
  - Webhook handling for subscription events
  - Premium status management in Firestore

### Data Storage

- **Database**: Firebase Firestore
- **Data Model**: User premium status stored under app-specific paths using `APP_ID = "carnival-planner-v1"`
- **Static Data**: Carnival events stored in `src/carnivals.js` as a JavaScript array with name and date fields

### Authentication

- **Provider**: Firebase Authentication
- **Methods**: 
  - Google Sign-In (OAuth popup)
  - Email/Password authentication with email verification
- **Email Auth Features** (`src/components/EmailAuthForm.jsx`):
  - Sign-up with email verification
  - Login with password
  - Password reset via email
  - Email verification banner for unverified users
- **Integration**: Firebase Auth SDK initialized in `src/firebase.js`

### Additional Features (Dec 2025)

- **PWA Install Prompt** (`src/components/InstallPrompt.jsx`):
  - Detects `beforeinstallprompt` event
  - Shows non-intrusive install banner
  - "Add to Home Screen" button for mobile users
  
- **Contact/Support** (`src/components/ContactSupport.jsx`):
  - Contact form that saves to Firestore `support-requests` collection
  - Admin view in Info tab (djkrss1@gmail.com only)
  - Support request management interface
  
- **Account Settings & Profile** (`src/components/AccountSettings.jsx`):
  - User profile with avatar, display name, and bio
  - Avatar upload to Firebase Storage
  - Profile data stored in `users/{uid}/profile/info`
  - Account deletion with confirmation (type "DELETE")
  - Deletes all user data from Firestore, Storage, and Auth
  - Removes user from shared squad plans

- **User Theme Preferences**:
  - Dark mode enabled by default for all users
  - Theme preference persisted per user in Firestore (`users/{uid}/preferences/theme`)
  - Preference synced across sessions and devices
  - Resets to dark on logout
  
- **Cloud Functions** (`functions2/index.js`):
  - `deleteUserAccount`: Complete account deletion with data cleanup

### Build and Deployment

- **Development**: `vite` dev server on port 5000, accessible from all hosts
- **Production Build**: Outputs to `dist/` directory
- **Hosting**: Firebase Hosting with SPA rewrite rules (all routes to index.html)
- **Deployment Command**: `npm run deploy` builds and deploys to Firebase

## External Dependencies

### Firebase Services
- **Firebase Authentication**: User sign-in/sign-up
- **Cloud Firestore**: NoSQL database for user data and premium status
- **Firebase Storage**: File uploads for Media Vault feature (tickets, photos, documents)
- **Firebase Hosting**: Static file hosting with CDN
- **Cloud Functions**: Serverless backend for Stripe integration and push notifications
- **Firebase Cloud Messaging (FCM)**: Push notifications for Road Ready squad alerts (premium feature)

### Stripe Integration
- **Purpose**: Premium subscription payments
- **Configuration**: Secrets managed via Firebase Functions secrets
  - `STRIPE_SECRET_KEY`: API key for Stripe
  - `STRIPE_WEBHOOK_SECRET`: Webhook signature verification
- **API Version**: 2024-04-10

### NPM Packages (Frontend)
- `firebase`: ^10.7.1 - Firebase SDK
- `react` / `react-dom`: ^18.2.0 - UI framework
- `lucide-react`: ^0.303.0 - Icon library
- `clsx`: ^2.1.0 - Class name utility
- `tailwind-merge`: ^2.2.0 - Tailwind class merging

### NPM Packages (Cloud Functions)
- `firebase-admin`: ^13.6.0 - Admin SDK
- `firebase-functions`: ^7.0.1 - Functions framework
- `stripe`: ^16.12.0 - Stripe API client