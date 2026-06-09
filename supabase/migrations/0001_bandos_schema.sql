-- Phase 1: BandOS Schema Setup
-- Creating tables for BandOS Enterprise Overhaul

-- 1. Band Profiles
CREATE TABLE IF NOT EXISTS public.band_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    tax_id TEXT,
    support_email TEXT NOT NULL,
    logo_url TEXT,
    stripe_account_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.band_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for Band Profiles
CREATE POLICY "Public profiles are viewable by everyone." 
    ON public.band_profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert their own profile." 
    ON public.band_profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." 
    ON public.band_profiles FOR UPDATE 
    USING (auth.uid() = id);

-- 2. Band Costume Sections
CREATE TABLE IF NOT EXISTS public.band_costume_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    band_id UUID REFERENCES public.band_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    deposit_amount DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.band_costume_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sections are viewable by everyone." 
    ON public.band_costume_sections FOR SELECT 
    USING (true);

CREATE POLICY "Bands can manage their own sections." 
    ON public.band_costume_sections FOR ALL 
    USING (auth.uid() = band_id);

-- 3. Band Inventory Variants (Handling Matrix Modifiers)
CREATE TABLE IF NOT EXISTS public.band_inventory_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.band_costume_sections(id) ON DELETE CASCADE,
    variant_type TEXT NOT NULL, -- e.g., 'bra_size', 'panty_style', 'meal', 'add_on'
    variant_value TEXT NOT NULL, -- e.g., '34B', 'High-Waist', 'Vegan', 'Wire Bra'
    additional_cost DECIMAL(10,2) DEFAULT 0.00,
    inventory_cap INTEGER, -- NULL means unlimited
    quantity_sold INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.band_inventory_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variants are viewable by everyone." 
    ON public.band_inventory_variants FOR SELECT 
    USING (true);

CREATE POLICY "Bands can manage their own variants." 
    ON public.band_inventory_variants FOR ALL 
    USING (
        auth.uid() IN (
            SELECT band_id FROM public.band_costume_sections WHERE id = section_id
        )
    );

-- 4. Distribution Time Slots
CREATE TABLE IF NOT EXISTS public.distribution_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    band_id UUID REFERENCES public.band_profiles(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    capacity INTEGER NOT NULL,
    booked_count INTEGER DEFAULT 0,
    location_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.distribution_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Slots are viewable by everyone." 
    ON public.distribution_slots FOR SELECT 
    USING (true);

CREATE POLICY "Bands can manage their own slots." 
    ON public.distribution_slots FOR ALL 
    USING (auth.uid() = band_id);

-- 5. Band Orders (Ticketing/Costume Purchases)
CREATE TABLE IF NOT EXISTS public.band_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    band_id UUID REFERENCES public.band_profiles(id) ON DELETE CASCADE,
    section_id UUID REFERENCES public.band_costume_sections(id) ON DELETE RESTRICT,
    buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    buyer_name TEXT NOT NULL,
    buyer_email TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    stripe_payment_intent_id TEXT,
    distribution_status TEXT DEFAULT 'Pending' CHECK (distribution_status IN ('Pending', 'Distributed', 'Refunded')),
    distribution_slot_id UUID REFERENCES public.distribution_slots(id) ON DELETE SET NULL,
    distributed_at TIMESTAMP WITH TIME ZONE,
    distributed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- the admin who scanned it
    warehouse_location TEXT, -- Denormalized helper for easy picking
    selected_variants JSONB, -- Stores the user's specific choices
    proxy_pickup_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- For squad pickup
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.band_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers can view their own orders." 
    ON public.band_orders FOR SELECT 
    USING (auth.uid() = buyer_id OR auth.uid() = proxy_pickup_id);

CREATE POLICY "Bands can view and update their own orders." 
    ON public.band_orders FOR ALL 
    USING (auth.uid() = band_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_band_profiles_updated_at
    BEFORE UPDATE ON public.band_profiles
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_band_costume_sections_updated_at
    BEFORE UPDATE ON public.band_costume_sections
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_band_orders_updated_at
    BEFORE UPDATE ON public.band_orders
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
