# 🏝️ Fete Drop & Flight Alert Tracker (Headless IG Engine)

A 100% free, headless Instagram engine built for **Caribbean Carnival Planner** that automatically tracks sold-out fete ticket drops and flight price drops, generates vibrant social media graphics, and publishes directly to Instagram.

---

## 🛠️ The Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **The Brain** | Google Sheets / `sample_alerts.json` | Stores pending fete drops, dates, ticket tiers, and flight routes. |
| **The Server** | GitHub Actions | Runs the Python tracker script on a scheduled cron timer ($0/mo). |
| **The Creative** | Python `Pillow` (PIL) | Auto-generates branded 1080x1080 (Feed) and 1080x1920 (Story) graphics. |
| **The Publisher** | Instagram Graph API | Automatically posts images and formatted captions to Instagram. |

---

## 🚀 Quick Start (Local Testing / Dry-Run)

### 1. Install Dependencies
```bash
cd ig_engine
pip install -r requirements.txt
```

### 2. Run Dry-Run Preview
Generate graphics locally without publishing to Instagram:
```bash
python tracker.py --dry-run
```
Output graphics are created in `ig_engine/output/`:
- `fete_001_feed.png` (1080x1080 Feed graphic)
- `fete_001_story.png` (1080x1920 Story graphic)
- `flight_001_feed.png` (1080x1080 Flight Alert graphic)

---

## 📊 Google Sheets Setup (The Brain)

1. Create a Google Sheet with the following column headers:
   `id, type, title, subtitle, carnival, price, tier, travel_dates, airline, details, event_date`
2. File -> Share -> **Publish to web** -> Choose format **CSV**.
3. Copy the CSV URL and add it to your environment variables or GitHub Secrets as `GOOGLE_SHEET_CSV_URL`.

---

## 🔑 Environment Variables & GitHub Secrets

For live Instagram posting via GitHub Actions, add these secrets to your repository (`Settings -> Secrets and variables -> Actions`):

| Secret Name | Description |
| :--- | :--- |
| `IG_USER_ID` | Instagram Business Account ID from Meta Graph API |
| `IG_ACCESS_TOKEN` | Long-lived Meta Graph API Access Token |
| `GOOGLE_SHEET_CSV_URL` | Public CSV export URL of your Google Sheet tracker |
| `DRY_RUN` | Set to `false` for live Instagram posting (`true` for dry-run) |

---

## 🤖 GitHub Actions Workflow

The workflow at `.github/workflows/fete-flight-alert-tracker.yml` runs every 30 minutes automatically. You can also trigger it manually from the **Actions** tab on GitHub.
