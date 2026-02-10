
-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create bots table (separate from bot_flows, stores token per bot per user)
CREATE TABLE public.bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL DEFAULT 'Meu Bot',
  telegram_token text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bots" ON public.bots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bots" ON public.bots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bots" ON public.bots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own bots" ON public.bots FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_bots_updated_at BEFORE UPDATE ON public.bots
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add user_id and bot_id to bot_flows
ALTER TABLE public.bot_flows ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.bot_flows ADD COLUMN bot_id uuid REFERENCES public.bots(id) ON DELETE CASCADE;

-- Update RLS on bot_flows to be user-scoped
DROP POLICY IF EXISTS "Allow public delete of flows" ON public.bot_flows;
DROP POLICY IF EXISTS "Allow public insert of flows" ON public.bot_flows;
DROP POLICY IF EXISTS "Allow public read of active flows" ON public.bot_flows;
DROP POLICY IF EXISTS "Allow public update of flows" ON public.bot_flows;

CREATE POLICY "Users can view own flows" ON public.bot_flows FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own flows" ON public.bot_flows FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own flows" ON public.bot_flows FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own flows" ON public.bot_flows FOR DELETE USING (auth.uid() = user_id);

-- Allow service role to read active flows (for webhook)
CREATE POLICY "Service can read active flows" ON public.bot_flows FOR SELECT USING (is_active = true);

-- Also allow service role access to bots for webhook token lookup
CREATE POLICY "Service can read active bots" ON public.bots FOR SELECT USING (is_active = true);
