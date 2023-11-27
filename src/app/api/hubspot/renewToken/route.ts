import axios from "axios";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request : Request){

  const clientId = process.env.HUBSPOT_CLIENT_ID;
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

  const cookieStore = cookies();
  const refresh_token = cookieStore.get("refresh_token")?.value;

  try {
    const response = await axios.post(
      "https://api.hubapi.com/oauth/v1/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: "http://localhost:3000/api/hubspot/oauth-callback",
          refresh_token: refresh_token,
        },
      }
    );

    if (response.data.access_token) {
      cookieStore.set("accessTokenHubspot", response.data.access_token);
      cookieStore.set("refresh_token", response.data.refresh_token);
      cookieStore.set("expires_in", response.data.expires_in);
    }
    cookieStore.set("jose", "jose");
    console.log(response, "res");
  

  } catch (error) {
    console.error("Error al renovar el token de acceso:", error);
  }
  redirect("/dashboard")
}
