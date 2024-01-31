
import { AuthResponse, createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://vgiqwxcbhyuspfkxvwfe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaXF3eGNiaHl1c3Bma3h2d2ZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Nzg2NDY0NywiZXhwIjoyMDEzNDQwNjQ3fQ.-89CIVc7b-sxSvfebSzOF3UOZiLx8xXVu8Y7sxJfzt0";
console.log("VARIABLE, ", process.env)
console.log("VARIABLE DUPABASE , ", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("VARIABLE  ANO, ", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

if (!supabaseKey || !supabaseUrl) {
  throw new Error("La clave de Supabase no está definida.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);


