import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co")
  : (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co");

const SUPABASE_ANON_KEY = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key")
  : (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key");

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
