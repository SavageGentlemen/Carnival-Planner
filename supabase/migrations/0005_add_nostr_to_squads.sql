ALTER TABLE public.squads 
ADD COLUMN IF NOT EXISTS nostr_pubkey TEXT,
ADD COLUMN IF NOT EXISTS nostr_privkey TEXT;
