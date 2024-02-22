"use client";
import { UserAuthForm } from "@/app/(auth)/components/UserAuthForm";
import { supabase } from "@/lib/ClientSupabase";
import { AuthResponse } from "@supabase/supabase-js";
import axios from "axios";
import { handleAuthSignup } from "./handleSignUp";

const SignUp = () => {
  return <UserAuthForm handleAuth={handleAuthSignup} login={false} />;
};

export default SignUp;
