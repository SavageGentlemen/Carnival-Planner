-- 1. Drop foreign key constraints referencing auth.users since the app uses Firebase Auth
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_auth_id_fkey;
ALTER TABLE public.band_profiles DROP CONSTRAINT IF EXISTS band_profiles_id_fkey;
ALTER TABLE public.band_orders DROP CONSTRAINT IF EXISTS band_orders_buyer_id_fkey;
ALTER TABLE public.band_orders DROP CONSTRAINT IF EXISTS band_orders_distributed_by_fkey;
ALTER TABLE public.band_orders DROP CONSTRAINT IF EXISTS band_orders_proxy_pickup_id_fkey;

-- 2. Disable RLS on all tables to allow direct anonymous queries from the client app
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.squads DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.squad_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bounties DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_costume_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_inventory_variants DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_slots DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.band_orders DISABLE ROW LEVEL SECURITY;
