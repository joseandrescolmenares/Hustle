
import { AuthResponse, createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("La clave de Supabase no está definida.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const handleAuthSignup = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return data;
};

const handleAuthLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return data;
};

const handleAuthGoogle = async () => {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google"
  });
  console.log(data, error)
};

export { handleAuthLogin, handleAuthSignup, handleAuthGoogle };
