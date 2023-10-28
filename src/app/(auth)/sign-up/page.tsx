"use client";
import { UserAuthForm } from "@/app/(auth)/components/UserAuthForm";
import { handleAuthSignup } from "@/lib/Auth";

const SignUp = () => {
  return (
    <UserAuthForm auth="signup"/>
  );
};

export default SignUp;
