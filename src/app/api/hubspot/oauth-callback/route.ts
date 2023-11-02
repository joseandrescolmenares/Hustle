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
          redirect_uri: redirectUri,
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = responseToken.data;

    // const headers = {
    //   Authorization: `Bearer ${access_token}`,
    //   "Content-Type": "application/json",
    // };
    // const apiUrl = "https://api.hubapi.com/crm/v3/objects/contacts";

    // const responseData: any = await axios.get(apiUrl, { headers });
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });


    // const { data, error } = await supabase
    //   .from("integrations")
    //   .update({ isHubspot: true, tokenHubspot: access_token })
    //   .eq("userId", "4e76bc6a-79a1-4d91-a27f-af5f33ffabb0")
    //   .select();

    // console.log(data, "table", error);
  } catch (error) {
    return Response.json({
      error: "Hubo un error al obtener el token de acceso.",
    });
  }
  redirect("/dashboard");
}
