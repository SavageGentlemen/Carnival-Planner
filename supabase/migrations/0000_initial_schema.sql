-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_address TEXT UNIQUE,
    display_name TEXT NOT NULL,
    current_squad_id UUID,
    total_credits INTEGER DEFAULT 0,
    total_events INTEGER DEFAULT 0,
    countries_visited TEXT[] DEFAULT '{}',
    unlocked_achievements TEXT[] DEFAULT '{}',
    current_tier TEXT DEFAULT 'BRONZE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SQUADS TABLE
CREATE TABLE IF NOT EXISTS public.squads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    invite_code TEXT UNIQUE NOT NULL,
    leader_id UUID REFERENCES public.users(id),
    target_carnival_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SQUAD MEMBERS (Junction Table)
CREATE TABLE IF NOT EXISTS public.squad_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    squad_id UUID REFERENCES public.squads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'MEMBER',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(squad_id, user_id)
);

-- Add foreign key constraint back to users for current_squad_id
ALTER TABLE public.users 
ADD CONSTRAINT fk_current_squad 
FOREIGN KEY (current_squad_id) 
REFERENCES public.squads(id) 
ON DELETE SET NULL;

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    carnival_id TEXT NOT NULL,
    name TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE,
    venue TEXT,
    source_url TEXT,
    image_url TEXT,
    raw_data JSONB,
    vibe_score NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOUNTIES TABLE (Gamification tasks tied to events)
CREATE TABLE IF NOT EXISTS public.bounties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    bounty_type TEXT NOT NULL, -- e.g., 'PHOTO_UPLOAD', 'WAIT_TIME_REPORT'
    status TEXT DEFAULT 'PENDING',
    reward_credits INTEGER DEFAULT 10,
    evidence_url TEXT,
    sentiment_score NUMERIC, -- Extracted sentiment from wait time or text
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.squad_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;

-- Basic Policies
CREATE POLICY "Allow public read access" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow individual update access" ON public.users FOR UPDATE USING (auth.uid() = auth_id);

CREATE POLICY "Allow public read access" ON public.squads FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access" ON public.squads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow leader update access" ON public.squads FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM public.users WHERE id = leader_id)
);

CREATE POLICY "Allow public read access" ON public.squad_members FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access" ON public.squad_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow members update access" ON public.squad_members FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM public.users WHERE id = user_id)
);

CREATE POLICY "Allow public read access" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow edge function to insert" ON public.events FOR ALL USING (true);

CREATE POLICY "Allow public read access" ON public.bounties FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert access" ON public.bounties FOR INSERT WITH CHECK (auth.role() = 'authenticated');
