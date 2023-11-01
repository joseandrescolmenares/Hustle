import axios from "axios";
import { redirect } from "next/navigation";


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

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const apiUrl ="https://api.hubapi.com/crm/v3/objects/contacts";

    const responseData: any = await axios.get(apiUrl, { headers });

    console.log("responseData", responseData.data);


  } catch (error) {
    return Response.json({
      error: "Hubo un error al obtener el token de acceso.",
    });
  }
  redirect("/dashboard");
}
