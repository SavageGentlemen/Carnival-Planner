-- =====================================================
-- Phase 3: Multi-Currency, Road Radar & Discovery
-- Adds multi-currency preferences to band_profiles and
-- creates the real-time road truck GPS tracking table.
-- =====================================================

-- === 1. Multi-Currency Settings on band_profiles ===
ALTER TABLE band_profiles
  ADD COLUMN IF NOT EXISTS default_currency TEXT DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS accepted_currencies TEXT[] DEFAULT '{"USD", "TTD", "JMD", "BBD", "XCD", "CAD", "GBP", "EUR"}',
  ADD COLUMN IF NOT EXISTS is_featured_in_directory BOOLEAN DEFAULT true;

-- === 2. Live Road Locations Table ===
CREATE TABLE IF NOT EXISTS band_road_locations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  band_id TEXT REFERENCES band_profiles(id) ON DELETE CASCADE,
  truck_name TEXT NOT NULL,
  truck_type TEXT NOT NULL DEFAULT 'music', -- 'music', 'drinks', 'food', 'restroom', 'medical'
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  heading DOUBLE PRECISION DEFAULT 0,
  status_message TEXT,
  last_updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- === 3. Indexes for Fast Directory & Geolocation Lookups ===
CREATE INDEX IF NOT EXISTS idx_band_road_locations_band_id ON band_road_locations(band_id);
CREATE INDEX IF NOT EXISTS idx_band_profiles_carnival_city ON band_profiles(carnival_city);
CREATE INDEX IF NOT EXISTS idx_band_profiles_is_featured ON band_profiles(is_featured_in_directory);
