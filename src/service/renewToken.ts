import { cookies } from "next/headers";
import axios from "axios";

const clientId = process.env.HUBSPOT_CLIENT_ID;
const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

export async function renewToken() {
  const cookieStore = cookies()
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
      cookieStore.set("access_token", response.data.access_token);
      cookieStore.set("refresh_token", response.data.refresh_token);
      cookieStore.set("expires_in", response.data.expires_in);
    }

  } catch (error) {
    console.error("Error al renovar el token de acceso:", error);
  }
}
