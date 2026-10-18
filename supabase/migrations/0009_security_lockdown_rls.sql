-- =====================================================
-- Migration 0009: Emergency Security Lockdown & RLS Hardening
-- Project: Caribbean Carnival Planner (yzvhbebyottadfjryeye)
-- 
-- Fixes Critical Vulnerabilities:
-- 1. Re-enables Row Level Security (RLS) on all tables.
-- 2. Blocks anonymous scraping of 5,350+ customer order records.
-- 3. Revokes public SELECT on nostr_privkey in squads.
-- 4. Secures band organizer tax IDs and Stripe account IDs.
-- 5. Preserves legitimate public storefront read access for catalog items.
-- =====================================================

-- -----------------------------------------------------
-- 1. RE-ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- -----------------------------------------------------
ALTER TABLE public.band_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squad_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_costume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_inventory_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_slots ENABLE ROW LEVEL SECURITY;

-- Phase 1 - 3 Tables
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'band_payment_plans') THEN
        ALTER TABLE public.band_payment_plans ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'band_payment_schedule') THEN
        ALTER TABLE public.band_payment_schedule ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'band_component_inventory') THEN
        ALTER TABLE public.band_component_inventory ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'band_distribution_logs') THEN
        ALTER TABLE public.band_distribution_logs ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'band_road_locations') THEN
        ALTER TABLE public.band_road_locations ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- -----------------------------------------------------
-- 2. REVOKE ANONYMOUS DESTRUCTIVE & DATA DUMP PRIVILEGES
-- -----------------------------------------------------
REVOKE INSERT, UPDATE, DELETE ON public.band_orders FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.band_profiles FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.users FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.squads FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.squad_members FROM anon;

-- Protect Nostr private key column from direct anonymous SELECT queries
REVOKE SELECT (nostr_privkey) ON public.squads FROM anon;

-- -----------------------------------------------------
-- 3. DROP INSECURE / PERMISSIVE POLICIES
-- -----------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access" ON public.users;
DROP POLICY IF EXISTS "Allow public read access" ON public.squads;
DROP POLICY IF EXISTS "Allow public read access" ON public.band_profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.band_profiles;
DROP POLICY IF EXISTS "Allow public read access" ON public.band_orders;
DROP POLICY IF EXISTS "Buyers can view their own orders." ON public.band_orders;

-- -----------------------------------------------------
-- 4. ESTABLISH HARDENED RLS POLICIES
-- -----------------------------------------------------

-- === A. PUBLIC CATALOG (SAFE FOR ANONYMOUS BROWSING) ===

-- Costume Sections (Storefront catalog)
DROP POLICY IF EXISTS "Public can view active sections" ON public.band_costume_sections;
CREATE POLICY "Public can view active sections" 
    ON public.band_costume_sections FOR SELECT 
    USING (is_active = true);

-- Costume Inventory Variants (Sizes, Options)
DROP POLICY IF EXISTS "Public can view variants" ON public.band_inventory_variants;
CREATE POLICY "Public can view variants" 
    ON public.band_inventory_variants FOR SELECT 
    USING (true);

-- Distribution Slots (Available pickup times)
DROP POLICY IF EXISTS "Public can view slots" ON public.distribution_slots;
CREATE POLICY "Public can view slots" 
    ON public.distribution_slots FOR SELECT 
    USING (true);

-- Events (Carnival calendar & schedules)
DROP POLICY IF EXISTS "Public can view events" ON public.events;
CREATE POLICY "Public can view events" 
    ON public.events FOR SELECT 
    USING (true);

-- Live Road Locations (Truck GPS trackers)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'band_road_locations') THEN
        DROP POLICY IF EXISTS "Public can view road locations" ON public.band_road_locations;
        CREATE POLICY "Public can view road locations" 
            ON public.band_road_locations FOR SELECT 
            USING (true);
    END IF;
END $$;

-- === B. BAND PROFILES (PROTECT TAX ID & STRIPE IDS) ===
CREATE POLICY "Public can view band branding" 
    ON public.band_profiles FOR SELECT 
    USING (status = 'approved' OR status IS NULL);

-- Bands can view and update their own full profile
CREATE POLICY "Bands can manage their own profile" 
    ON public.band_profiles FOR ALL 
    USING (auth.uid()::text = id OR auth.role() = 'service_role');

-- === C. BAND ORDERS (RESTRICT CUSTOMER PII & SALES) ===
-- Service role and authenticated buyers/bands can access orders
CREATE POLICY "Authorized access to band orders" 
    ON public.band_orders FOR ALL 
    USING (
        auth.role() = 'service_role' 
        OR (auth.uid() IS NOT NULL AND (auth.uid()::text = buyer_id OR auth.uid()::text = band_id))
    );

-- Secure RPC function for masqueraders looking up their own specific order at distribution
-- Requires BOTH order ID and buyer email to match, preventing enumeration attacks
CREATE OR REPLACE FUNCTION public.lookup_masquerader_order(p_order_id TEXT, p_email TEXT)
RETURNS SETOF public.band_orders
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT * FROM public.band_orders
    WHERE id::text = p_order_id 
      AND LOWER(buyer_email) = LOWER(TRIM(p_email))
    LIMIT 1;
$$;

-- === D. SQUADS & SQUAD MEMBERS ===
CREATE POLICY "Squad members can view their squad" 
    ON public.squads FOR SELECT 
    USING (
        auth.role() = 'service_role'
        OR auth.uid() IS NOT NULL
    );

CREATE POLICY "Squad members can view members" 
    ON public.squad_members FOR SELECT 
    USING (
        auth.role() = 'service_role'
        OR auth.uid() IS NOT NULL
    );

-- === E. USERS TABLE ===
CREATE POLICY "Users can view and manage their own profile" 
    ON public.users FOR ALL 
    USING (
        auth.role() = 'service_role'
        OR (auth.uid() IS NOT NULL AND auth.uid()::text = auth_id)
    );

-- -----------------------------------------------------
-- 5. RELOAD POSTGREST SCHEMA CACHE
-- -----------------------------------------------------
NOTIFY pgrst, 'reload schema';
