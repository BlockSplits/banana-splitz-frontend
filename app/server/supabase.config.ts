import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

// Abstract this away
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

invariant(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);

invariant(
  supabaseServiceRoleKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);