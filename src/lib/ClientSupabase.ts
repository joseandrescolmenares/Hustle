
import { AuthResponse, createClient } from "@supabase/supabase-js";
require("dotenv").config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("La clave de Supabase no está definida.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);


