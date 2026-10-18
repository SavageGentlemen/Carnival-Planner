#!/bin/bash
set -euo pipefail

# Ensure node from mise is in PATH
export PATH="/home/sav/.local/share/mise/installs/node/26.8.2/bin:$PATH"

CDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$CDIR"

mkdir -p "$CDIR/marketing/output"
LOGFILE="$CDIR/marketing/output/orchestrator.log"

echo "=== [$(date --iso-8601=seconds)] Starting CCP Marketing Pipeline ===" >> "$LOGFILE"
node marketing/orchestrator.js >> "$LOGFILE" 2>&1
echo "=== [$(date --iso-8601=seconds)] Pipeline Completed Successfully ===" >> "$LOGFILE"
