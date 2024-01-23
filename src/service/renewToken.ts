import axios from "axios";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export  async function renewToken(refresh_token: string) {
  console.log(refresh_token, "refresh route");

  try {
    const cookieStore = cookies();
    const supabaseClient = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
    const clientId = process.env.HUBSPOT_CLIENT_ID;
    const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
    const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

    const response = await axios.post(
      "https://api.hubapi.com/oauth/v1/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          refresh_token: refresh_token,
        },
      }
    );
    return response?.data.access_token;
  } catch (error) {
    console.error("Error al renovar el token de acceso:", error);
    return "Hubo un error al renovar el token de acceso";
  }
}
