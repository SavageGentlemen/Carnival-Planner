-- 1. Drop all RLS policies from all tables to clear column dependencies
DROP POLICY IF EXISTS "Allow public read access" ON public.users;
DROP POLICY IF EXISTS "Allow individual update access" ON public.users;

DROP POLICY IF EXISTS "Allow public read access" ON public.squads;
DROP POLICY IF EXISTS "Allow authenticated insert access" ON public.squads;
DROP POLICY IF EXISTS "Allow leader update access" ON public.squads;

DROP POLICY IF EXISTS "Allow public read access" ON public.squad_members;
DROP POLICY IF EXISTS "Allow authenticated insert access" ON public.squad_members;
DROP POLICY IF EXISTS "Allow members update access" ON public.squad_members;

DROP POLICY IF EXISTS "Allow public read access" ON public.events;
DROP POLICY IF EXISTS "Allow edge function to insert" ON public.events;

DROP POLICY IF EXISTS "Allow public read access" ON public.bounties;
DROP POLICY IF EXISTS "Allow authenticated insert access" ON public.bounties;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.band_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.band_profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.band_profiles;

DROP POLICY IF EXISTS "Sections are viewable by everyone." ON public.band_costume_sections;
DROP POLICY IF EXISTS "Bands can manage their own sections." ON public.band_costume_sections;

DROP POLICY IF EXISTS "Variants are viewable by everyone." ON public.band_inventory_variants;
DROP POLICY IF EXISTS "Bands can manage their own variants." ON public.band_inventory_variants;

DROP POLICY IF EXISTS "Slots are viewable by everyone." ON public.distribution_slots;
DROP POLICY IF EXISTS "Bands can manage their own slots." ON public.distribution_slots;

DROP POLICY IF EXISTS "Buyers can view their own orders." ON public.band_orders;
DROP POLICY IF EXISTS "Bands can view and update their own orders." ON public.band_orders;

-- 2. Drop foreign key constraints referencing the UUID fields we need to modify
ALTER TABLE public.band_costume_sections DROP CONSTRAINT IF EXISTS band_costume_sections_band_id_fkey;
ALTER TABLE public.distribution_slots DROP CONSTRAINT IF EXISTS distribution_slots_band_id_fkey;
ALTER TABLE public.band_orders DROP CONSTRAINT IF EXISTS band_orders_band_id_fkey;
ALTER TABLE public.bounties DROP CONSTRAINT IF EXISTS bounties_user_id_fkey;

-- 3. Clear out any dummy UUID test data to avoid schema mutation/casting issues
DELETE FROM public.band_profiles WHERE id = '11111111-1111-1111-1111-111111111111';

-- 4. Alter column types to TEXT to support 28-character Firebase UIDs
ALTER TABLE public.users ALTER COLUMN auth_id TYPE TEXT;
ALTER TABLE public.band_profiles ALTER COLUMN id TYPE TEXT;
ALTER TABLE public.band_costume_sections ALTER COLUMN band_id TYPE TEXT;
ALTER TABLE public.distribution_slots ALTER COLUMN band_id TYPE TEXT;
ALTER TABLE public.band_orders ALTER COLUMN band_id TYPE TEXT;
ALTER TABLE public.band_orders ALTER COLUMN buyer_id TYPE TEXT;
ALTER TABLE public.band_orders ALTER COLUMN distributed_by TYPE TEXT;
ALTER TABLE public.band_orders ALTER COLUMN proxy_pickup_id TYPE TEXT;
ALTER TABLE public.bounties ALTER COLUMN user_id TYPE TEXT;

-- 5. Re-establish foreign key constraints between the updated TEXT fields
ALTER TABLE public.band_costume_sections 
    ADD CONSTRAINT band_costume_sections_band_id_fkey 
    FOREIGN KEY (band_id) REFERENCES public.band_profiles(id) ON DELETE CASCADE;

ALTER TABLE public.distribution_slots 
    ADD CONSTRAINT distribution_slots_band_id_fkey 
    FOREIGN KEY (band_id) REFERENCES public.band_profiles(id) ON DELETE CASCADE;

ALTER TABLE public.band_orders 
    ADD CONSTRAINT band_orders_band_id_fkey 
    FOREIGN KEY (band_id) REFERENCES public.band_profiles(id) ON DELETE CASCADE;
