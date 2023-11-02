"use client";
import { UserAuthForm } from "@/app/(auth)/components/UserAuthForm";
import { supabase } from "@/lib/ClientSupabase";
import { AuthResponse } from "@supabase/supabase-js";
import axios from "axios";

const SignUp = () => {
  const handleAuthSignup = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const data = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (data) {
      const dataTableIntegration = await axios.post(
        "/api/supabase/integrationTable",
        {
          userId: data.data.user?.id,
        }
      );
      const result = dataTableIntegration.data;
      console.log(result,"data table");
    }
    return data;
  };
  return <UserAuthForm handleAuth={handleAuthSignup} />;
};

export default SignUp;
