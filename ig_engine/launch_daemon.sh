#!/bin/bash
# Carnival Planner - 24/7 Social Media Auto-Poster Daemon (macOS / Linux)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "================================================================"
echo "🚀 LAUNCHING CARNIVAL PLANNER 24/7 SOCIAL MEDIA DAEMON (macOS)"
echo "================================================================"
echo "⏰ Schedule: 3x Daily (09:00 AM, 03:00 PM, 09:00 PM local time)"
echo "🎬 Engine: MoneyPrinterTurbo AI Sidecar (Port 8090) + Studio Canvas"
echo "🌐 Distribution: Make.com Webhook + Native Meta Graph API"
echo "================================================================"

# Ensure Python dependencies
python3 -m pip install --quiet -r requirements.txt || true

# Run daemon
python3 scheduler_daemon.py
