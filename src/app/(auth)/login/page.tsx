'use client'
import { handleAuthLogin } from "@/lib/Auth";
import { UserAuthForm } from "@/app/(auth)/components/UserAuthForm"
const login = () => {

  return <UserAuthForm handleAuth={handleAuthLogin }/>
};

export default login;
