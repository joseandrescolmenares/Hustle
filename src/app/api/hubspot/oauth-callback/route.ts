import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const clientId = process.env.HUBSPOT_CLIENT_ID;
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri) {
    return Response.json({ error: "Faltan variables de configuración." });
  }
  try {
    const responseToken: any = await axios.post(
      "https://api.hubapi.com/oauth/v1/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: "http://localhost:3000/api/hubspot/oauth-callback",
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(responseToken.data, "dataaaa");
    const { access_token, refresh_token, expires_in } = responseToken.data;
    const cookieStore = cookies();
    cookieStore.set("refresh_token", refresh_token);
    cookieStore.set("accessTokenHubspot", access_token);
    cookieStore.set("expires_in", expires_in);
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const userId = cookieStore.get("userId");

    const { data, error } = await supabase
      .from("integrations")
      .update({ isHubspot: true })
      .eq("userId", userId?.value)
      .select();

    if (error) {
      return "hubo un error al integrar hubspot";
    }
  } catch (error) {
    return Response.json({
      error: "Hubo un error al obtener el token de acceso.",
    });
  }
  redirect("/dashboard");
}
