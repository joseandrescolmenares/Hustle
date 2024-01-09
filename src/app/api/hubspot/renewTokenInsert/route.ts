import axios from "axios";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabaseClient = createRouteHandlerClient({ cookies: () => cookieStore });
    const { searchParams } = new URL(request.url);
    const clientId = "a3f99a23-910e-4b62-abae-40826a0a8bd3"
    const clientSecret = "d0d396d5-1047-4d95-9516-292d8befa83a"
    const redirectUri = "https://hustle-beta.vercel.app/api/hubspot/oauth-callback"

    const refresh_token = searchParams.get("refresh_token");
    const id_integrations = searchParams.get("id_integrations");

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
    return NextResponse.json({ success:  response?.data.access_token });

  } catch (error) {
    console.error("Error al renovar el token de acceso:", error);
    return NextResponse.json({ error: "Hubo un error al renovar el token de acceso." }, { status: 500 });
  }

  return NextResponse.json({ success:  "vemos" });
}
