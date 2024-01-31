import axios from "axios";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // try {
  //   const cookieStore = cookies();
  //   const supabaseClient = createRouteHandlerClient({
  //     cookies: () => cookieStore,
  //   });
  //   const { searchParams } = new URL(request.url);
  //   const clientId = process.env.HUBSPOT_CLIENT_ID;
  //   const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
  //   const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

  //   const refresh_token = searchParams.get("refresh_token");
  

  //   const response = await axios.post(
  //     "https://api.hubapi.com/oauth/v1/token",
  //     null,
  //     {
  //       params: {
  //         grant_type: "refresh_token",
  //         client_id: clientId,
  //         client_secret: clientSecret,
  //         redirect_uri: redirectUri,
  //         refresh_token: refresh_token,
  //       },
  //     }
  //   );
  //   return NextResponse.json({ success: response?.data.access_token });
  // } catch (error) {
  //   console.error("Error al renovar el token de acceso:", error);
  //   return NextResponse.json(
  //     { error: "Hubo un error al renovar el token de acceso." },
  //     { status: 500 }
  //   );
  // }

  return NextResponse.json({ status: 200 });
}
