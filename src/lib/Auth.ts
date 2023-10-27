import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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