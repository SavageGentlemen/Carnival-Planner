# 📸 Pixel RAG Web Scraper (Proof-of-Concept)

A visual-first web scraping and data extraction engine based on the **Pixel RAG** paradigm (pioneered by UC Berkeley Sky Computing Lab / BAIR).

Instead of parsing fragile, minified HTML/DOM trees, this scraper renders web pages in a headless browser, breaks the rendered raster into overlapping visual tiles, and passes them to a Vision-Language Model (VLM) like **Gemini Vision** to extract structured JSON data.

---

## ⚡ Why Pixel RAG for Scraping?

| Traditional DOM Scraping | Pixel RAG (Visual Scraping) |
| :--- | :--- |
| Breaks on CSS/class changes or framework re-renders | Immune to underlying code changes; reads rendered pixels |
| Flattens 2D grids, tables, and sidebars into raw text | Preserves table alignment, column headers, and layout context |
| Ignores visual badges, pill tags, and color-coded statuses | Accurately interprets "SOLD OUT", "FEW LEFT", and checkmarks (`✓`/`✕`) |
| Consumes tens of thousands of tokens of HTML clutter | Sends compact image tiles with fixed, predictable token usage |

---

## 🚀 Quickstart

### 1. Dry Run (Render & Tile Inspection)
Renders the page to a full-page PNG and generates visual tiles in `scripts/output_tiles/` without calling the Gemini API:

```bash
python3 scripts/pixel_rag_scraper.py --file scripts/sample_carnival_page.html --dry-run
```

You can inspect the generated visual tiles:
- `scripts/output_tiles/full_screenshot.png` (full rendered page)
- `scripts/output_tiles/tile_0.png` (top half: packages grid, pricing badges)
- `scripts/output_tiles/tile_1.png` (bottom half: comparison table, route details)

---

### 2. Live Extraction (with Gemini Vision)
To run live multimodal extraction, provide your Gemini API key via argument or environment variable:

```bash
# Option A: Pass directly via CLI argument
python3 scripts/pixel_rag_scraper.py --file scripts/sample_carnival_page.html --api-key <YOUR_GEMINI_API_KEY>

# Option B: Set in .env or shell environment
export GEMINI_API_KEY="your-gemini-api-key"
python3 scripts/pixel_rag_scraper.py --file scripts/sample_carnival_page.html
```

The output JSON will be written to `scripts/extracted_carnival_data.json`.

---

### 3. Scraping a Live Website URL
You can scrape any live URL directly:

```bash
python3 scripts/pixel_rag_scraper.py --url "https://example-carnival-band.com/costumes" --output data/costumes.json
```

---

## ⚙️ CLI Reference & Parameters

| Flag | Default | Description |
| :--- | :--- | :--- |
| `--file <path>` | — | Path to a local HTML file to scrape |
| `--url <url>` | — | Target URL to scrape |
| `--output <path>` | `scripts/extracted_carnival_data.json` | Destination path for the extracted JSON |
| `--tiles-dir <dir>` | `scripts/output_tiles` | Directory to save rendered screenshot & tiles |
| `--dry-run` | `False` | Renders and slices tiles without calling the AI API |
| `--api-key <key>` | From `.env` / env | Gemini API key |
| `--model <name>` | `gemini-1.5-flash` | Gemini model name (`gemini-1.5-flash`, `gemini-1.5-pro`, etc.) |
| `--viewport-width` | `1280` | Viewport width in pixels for Headless Chrome |
| `--viewport-height` | `1400` | Initial viewport height in pixels |
| `--tile-height` | `900` | Vertical height in pixels of each visual chunk |
| `--overlap` | `150` | Overlap margin in pixels between consecutive tiles |

---

## 🧩 Architecture Details

1. **Renderer (`render_page_to_screenshot`)**:
   Invokes Google Chrome (`/Applications/Google Chrome.app` on macOS or `google-chrome` on Linux) in `--headless=new` mode with an isolated user profile.
2. **Visual Tiler (`generate_pixel_tiles`)**:
   Uses Python's `PIL` (Pillow) to slice tall full-page screenshots into overlapping vertical chunks. The overlap ensures that rows, cards, or paragraphs spanning tile borders are not truncated.
3. **Multimodal Extractor (`extract_structured_data_from_tile`)**:
   Sends each tile to Gemini Vision along with a structured JSON schema. The VLM reads text, spatial relationships, and status pill badges directly from pixels.
4. **Aggregator (`merge_extracted_results`)**:
   Merges and deduplicates entities across tiles (e.g. sections and comparison rows), returning a single unified JSON document.
