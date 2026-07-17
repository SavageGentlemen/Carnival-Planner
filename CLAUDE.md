# CLAUDE.md — Caribbean Carnival Planner Operating System
This file serves as the system rules, context, and operational guide for both the AI Developer Agent and the platform administrators/users.
---
## 🛠️ Developer Commands & Scripts
Always use these exact commands for testing, compiling, and deploying:
*   **Start Local Dev Server:** `npm run dev` (Runs Vite server on port `5173`)
*   **Compile Production Build:** `npm run build` (Builds static assets to `/dist` with Gzip & Brotli compression)
*   **Deploy UI to Live Hosting:** `npx firebase deploy --only hosting` (Pushes build to [carnival-planner.web.app](https://carnival-planner.web.app))
*   **Deploy Backend Cloud Functions:** `npx firebase deploy --only functions` (Deploys Node.js v20 endpoints)
*   **Deploy Firestore Security Rules:** `npx firebase deploy --only firestore:rules`
---
## 🎨 Visual Design Guidelines (V3.0 Glassmorphism)
All UI modifications must strictly adhere to the premium design system:
1.  **Typography:**
    *   Headings / Display Elements: `'Outfit', sans-serif` (`font-display`)
    *   Body Copy / Labels: `'Plus Jakarta Sans', sans-serif` (`font-body`)
2.  **Glass Panel Classes:**
    *   Containers: Use `.glass-panel` (has default `backdrop-filter: blur(20px)` and semi-transparent border).
    *   Interactive Cards: Combine `.glass-panel` with `.glass-panel-hover` for lift transitions and neon-pink glows.
    *   Primary Action Buttons: Use `.glass-btn-primary` (gradient from `#ec4899` to `#8b5cf6`).
3.  **Background Layout:**
    *   In dark mode, the main wrapper must use `bg-transparent` to let the animated `<SocaVoid />` nebula canvas render through.
    *   Text inside glass panels must remain high-contrast (`text-white` or `text-white/80`). Avoid dark text on dark glass.
---
## ⚡ Core Systems Architecture & Workflows
### 1. BandOS Onboarding & Approvals
*   **Applicant Flow:** Masquerader submits an application through their profile. This creates a record in the Supabase `band_profiles` table with `status = 'pending'`. The UI disables duplicate submissions by reading this state.
*   **Admin Flow:** Admin reviews applications on the Admin Console. Approving an applicant updates their status in Supabase and writes `{ isBandLeader: true }` to their Firestore profile at `userProfiles/{userId}`.
*   **Databases:**
    *   Supabase holds band profiles, CRM registrations, sections, and discount structures.
    *   Firestore holds user profiles, budget data, and classic planning docs.
### 2. Digital Passport & Bounty Gamification
*   **Earning Rewards:** Reporting wait times or uploading crowd photos in [BountyBoard.jsx](file:///workspace/src/components/BountyBoard.jsx) triggers the `awardBountyPassportReward` Cloud Function.
*   **Gamified Minting:** The cloud function automatically mints a new digital stamp (with `checkinMethod: 'BOUNTY_REPORT'`) to the user's base-network-connected Web3 Wallet and awards flat passport credits.
### 3. Road Mode (Live Parade Utilities)
*   **Mesh Radar:** Broadcasts user coordinate packets every 30 seconds via `watchPosition` to squad members.
*   **Emergency SOS:** The distress button broadcasts a full-screen red warning modal with safety alerts to all active squad screens.
---
## ❓ User & Admin Troubleshooting Guide
*   **Q: Why does a user get a "Duplicate Key" error during BandOS application?**
    *   *A:* They already have a pending or processed application in the database. The app profile state should sync status from Supabase to disable the application button.
*   **Q: Why do approvals fail with "Missing or insufficient permissions" in Firestore?**
    *   *A:* The Firestore security rules must allow super-admins to modify other users' profile documents. Ensure `firestore.rules` is updated with `isAdmin()` write access.
*   **Q: Where do I manage promo codes and costume sections?**
    *   *A:* Band leaders can access the "Discounts & Promos" and "Costume Builder" tabs directly inside the **Band Leader Dashboard** when logged in with an approved band leader account.

---

## 🏗️ Project Structure & Key Files
- `src/App.jsx` — Main app component (~4500 lines). Contains all routes, state, and views.
- `src/firebase.js` — Firebase config (uses 'squad-db' Firestore database)
- `src/services/` — Service modules for API calls
- `src/components/` — Reusable UI components
- `src/hooks/` — Custom React hooks
- `src/nostrService.js` — Nostr protocol bridge for Bitchat integration
- `vite.config.js` — Vite config with PWA, compression plugins
- `.agent/backlog.md` — Feature backlog and TODO items

## 🔒 Agent Safety Rules
1. **DO NOT** modify Firebase credentials or configuration in `src/firebase.js`
2. **DO NOT** delete or overwrite existing user data files
3. **DO NOT** run `npm install` for new packages without asking first
4. **DO NOT** modify `package.json` scripts without permission
5. **DO NOT** push to git or deploy to Firebase
6. Keep all changes within `/workspace` (the project directory)
7. Use Tailwind CSS classes for styling (project uses Tailwind)
8. Test changes by verifying the Vite dev server doesn't crash
9. When editing `App.jsx`, be careful — it's a very large file. Make targeted edits.

## 📋 Current Backlog
See `.agent/backlog.md` for pending features (Nostr/Bitchat bridge integration).
