import axios from "axios";
import { redirect } from "next/navigation";

// let SCOPES = ["crm.objects.contacts.read"];
export async function GET(request: Request) {
  const { pathname, searchParams, search } = new URL(request.url);

  if (search?.includes("code")) {
    const code = searchParams.get("code");
    const clientId = process.env.HUBSPOT_CLIENT_ID;
    const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
    const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

    try {
      const response: any = await axios.post(
        "https://api.hubapi.com/oauth/v1/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: clientId ,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token } = response.data;

      //   Aquí puedes guardar los tokens en la base de datos o en una cookie.

       redirect("/")
    } catch (error) {
      return Response.json({
        error: "Hubo un error al obtener el token de acceso.",
      });
    }
  } else {
    return Response.json({ error: "Falta el código de autorización." });
  }
}

