"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { supabase } from "@/lib/ClientSupabase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function AuthGoogle() {
  const router = useRouter();
  useEffect(() => {
    // Get the current URL
    const currentURL = window.location.href;

    // Split the URL into parts using the '#' character as a separator
    const urlParts = currentURL.split("#");

    // Check if there are enough parts
    if (urlParts.length >= 2) {
      // Get the second part, which contains the parameters
      const params = urlParts[1];

      // Split the parameters into key-value pairs using the '&' character as a separator
      const pairs = params.split("&");

      // Initialize a variable to store the value of access_token
      let accessToken = "";

      // Iterate through the pairs to find the access_token
      for (const pair of pairs) {
        const [key, value] = pair.split("=");

        if (key === "access_token") {
          // We found the access_token, store it in the variable
          accessToken = value;
          break;
        }
      }

      if (accessToken) {
        Cookies.set("access_token", accessToken);
        const getUser = async () => {
          const {
            data: { user },
          }: any = await supabase.auth.getUser();

          if (user) {
            router.push("/onboarding");
          }
        };

        getUser();
      } else {
        console.log("Access_token not found in the URL.");
      }
    } else {
      console.log("The URL does not contain a fragment with parameters.");
    }
  }, [router]);

  return <p>Loanding...</p>;
}
