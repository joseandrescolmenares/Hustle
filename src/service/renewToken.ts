import { cookies } from "next/headers";
import axios from "axios";
import Cookies from "js-cookie";
const refresh_token = Cookies.get("refresh_token");
console.log(refresh_token)
const leadTimeInSeconds = 120;

const activationTimeInSeconds = 1800 - leadTimeInSeconds;

const clientId = process.env.HUBSPOT_CLIENT_ID;
const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

export async function renewToken() {
  try {
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

    if (response.data.access_token) {
      Cookies.set("access_token", response.data.access_token);
      Cookies.set("refresh_token", response.data.refresh_token);
      Cookies.set("expires_in", response.data.expires_in);
    }
    console.log("se esjecuto")
  } catch (error) {
    console.error("Error al renovar el token de acceso:", error);
  }
}
