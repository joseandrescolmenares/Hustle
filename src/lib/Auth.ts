import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("La clave de Supabase no está definida.");
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

const handleAuthSignup = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: "someone@email.com",
      password: "JXbKUioCesmlllxLshzK",
    });
    console.log(data)
  };

  const handleAuthLogin = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: 'josenardescolmenares02@gmail.com',
        password: 'JXbKUioCesmlllxLshzK'
      })
      console.log( error)
  }

  export {handleAuthLogin, handleAuthSignup}