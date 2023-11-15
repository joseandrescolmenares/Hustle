"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/lib/formValidateSchema";
import { UserAuthFormProp } from "@/lib/types/authForm";
import { supabase } from "@/lib/ClientSupabase";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { Icons } from "@/app/components/Icons/IconsAuth/IconsAuth";
import axios from "axios";
import { Toaster, toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";
import { redirect } from "next/dist/server/api-utils";

export default function UserAuthForm({ handleAuth, login }: UserAuthFormProp) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuthGoogleProvider = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://hustle-beta.vercel.app/authGoogle",
      },
    });
    if (data) {
      toast.success("Welcome to Hustle");
    } else {
      toast.error("Invalid login");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { email, password } = values;
    const dataAuth: any = await handleAuth(email, password);
    if (dataAuth?.data?.user) {
      Cookies.set("access_token", dataAuth?.data?.session.access_token);
      Cookies.set("userId", dataAuth?.data.user?.id);
      toast.success("Welcome to Hustle");
      router.push("/dashboard");
    } else {
      toast.error(
        login ? "Invalid login credentials" : "User already registered"
      );
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className=" absolute">
        <Toaster richColors position="top-right" />{" "}
      </div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {login ? "Welcome to Hustle" : "Create an account "}
        </h1>
        <p className="text-sm text-muted-foreground">
          {login
            ? "Enter your email and password to log in to your account"
            : "Enter your email and password to create your account "}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleAuthGoogleProvider}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </>
  );
}
