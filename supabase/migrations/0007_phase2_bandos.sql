-- =====================================================
-- Phase 2: BandOS Operations & Warehouse Management
-- Adds component-level inventory tracking and live
-- distribution audit logs.
-- =====================================================

-- === 1. Component Inventory Table ===
CREATE TABLE IF NOT EXISTS band_component_inventory (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  band_id TEXT REFERENCES band_profiles(id) ON DELETE CASCADE,
  section_id TEXT REFERENCES band_costume_sections(id) ON DELETE CASCADE,
  component_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'accessory', -- 'headpiece', 'backpack', 'bra', 'bottom', 'collar', 'accessory'
  size TEXT DEFAULT 'Standard',
  total_stock INT NOT NULL DEFAULT 0,
  assigned_count INT NOT NULL DEFAULT 0,
  low_stock_threshold INT DEFAULT 10,
  unit_cost DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- === 2. Distribution Activity Logs Table ===
CREATE TABLE IF NOT EXISTS band_distribution_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  band_id TEXT REFERENCES band_profiles(id) ON DELETE CASCADE,
  order_id TEXT REFERENCES band_orders(id) ON DELETE CASCADE,
  distributed_by TEXT,
  pickup_method TEXT DEFAULT 'qr_scan', -- 'qr_scan', 'manual_lookup', 'proxy_squad'
  distributed_at TIMESTAMPTZ DEFAULT NOW()
);

-- === 3. Performance Indexes ===
CREATE INDEX IF NOT EXISTS idx_band_component_inventory_band_id ON band_component_inventory(band_id);
CREATE INDEX IF NOT EXISTS idx_band_component_inventory_section_id ON band_component_inventory(section_id);
CREATE INDEX IF NOT EXISTS idx_band_distribution_logs_band_id ON band_distribution_logs(band_id);
CREATE INDEX IF NOT EXISTS idx_band_distribution_logs_distributed_at ON band_distribution_logs(distributed_at);
