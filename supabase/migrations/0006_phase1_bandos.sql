-- =====================================================
-- Phase 1: BandOS Competitive Features Migration
-- Adds white-label branding, section capacity, payment
-- plans, payment schedules, and enhanced order fields.
-- =====================================================

-- === 1. White-Label Branding Fields on band_profiles ===
ALTER TABLE band_profiles
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
  ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#ec4899',
  ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '#8b5cf6',
  ADD COLUMN IF NOT EXISTS custom_domain TEXT,
  ADD COLUMN IF NOT EXISTS carnival_city TEXT,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
  ADD COLUMN IF NOT EXISTS facebook_url TEXT;

-- === 2. Section Capacity on band_costume_sections ===
ALTER TABLE band_costume_sections
  ADD COLUMN IF NOT EXISTS capacity_limit INT,
  ADD COLUMN IF NOT EXISTS registration_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_sold_out BOOLEAN DEFAULT false;

-- === 3. Payment Plans Table ===
CREATE TABLE IF NOT EXISTS band_payment_plans (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  band_id TEXT REFERENCES band_profiles(id) ON DELETE CASCADE,
  section_id TEXT REFERENCES band_costume_sections(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  installments JSONB NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- === 4. Payment Schedule per Order ===
CREATE TABLE IF NOT EXISTS band_payment_schedule (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  order_id TEXT REFERENCES band_orders(id) ON DELETE CASCADE,
  installment_label TEXT NOT NULL,
  amount_due DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  stripe_payment_intent_id TEXT,
  status TEXT CHECK (status IN ('pending', 'paid', 'overdue', 'waived')) DEFAULT 'pending',
  reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- === 5. Enhanced order fields ===
ALTER TABLE band_orders
  ADD COLUMN IF NOT EXISTS buyer_phone TEXT,
  ADD COLUMN IF NOT EXISTS sizing_data JSONB,
  ADD COLUMN IF NOT EXISTS payment_plan_id TEXT,
  ADD COLUMN IF NOT EXISTS order_qr_code TEXT,
  ADD COLUMN IF NOT EXISTS registration_source TEXT DEFAULT 'manual';

-- === 6. Auto-generate slug from business_name for existing bands ===
UPDATE band_profiles
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(business_name, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL AND business_name IS NOT NULL;

-- === 7. Indexes for performance ===
CREATE INDEX IF NOT EXISTS idx_band_profiles_slug ON band_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_band_orders_band_id ON band_orders(band_id);
CREATE INDEX IF NOT EXISTS idx_band_payment_schedule_order_id ON band_payment_schedule(order_id);
CREATE INDEX IF NOT EXISTS idx_band_payment_schedule_due_date ON band_payment_schedule(due_date, status);
CREATE INDEX IF NOT EXISTS idx_band_costume_sections_band_id ON band_costume_sections(band_id);
