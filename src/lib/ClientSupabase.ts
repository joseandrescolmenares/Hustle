
import { AuthResponse, createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log("VARIABLE, ", process.env)
console.log("VARIABLE DUPABASE , ", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("VARIABLE  ANO, ", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

if (!supabaseKey || !supabaseUrl) {
  throw new Error("La clave de Supabase no está definida.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);


