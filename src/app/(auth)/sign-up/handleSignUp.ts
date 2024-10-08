"use client";
import { UserAuthForm } from "@/app/(auth)/components/UserAuthForm";
import { supabase } from "@/lib/ClientSupabase";
import { AuthResponse } from "@supabase/supabase-js";

export const handleAuthSignup = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  return data;
};
