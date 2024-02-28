"use client";

import { supabase } from "@/lib/ClientSupabase";
import { AuthResponse } from "@supabase/supabase-js";
import { UserAuthForm } from "@/app/(auth)/components/UserAuthForm";

const login = () => {
  const handleAuthLogin = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const data = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data,"dataLOgin")
    return data;
  };

  return <UserAuthForm handleAuth={handleAuthLogin} login={true} />;
};

export default login;
