import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const idIntegrations = cookieStore.get("idIntegrations")?.value;
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    try {
      const responseToken: any = await axios.post(
        "https://slack.com/api/oauth.v2.access",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: code,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const result = responseToken?.data;
      const { data, error } = await supabase
        .from("integrations")
        .update({
          isSlack: true,
          webhookUrlSlack: result?.incoming_webhook?.url,
          accessTokenSlack: result?.access_token,
          channelSlack: result?.incoming_webhook?.channel,
          teamSlack: result?.team,
        })
        .eq("id_integrations", idIntegrations)
        .select();
      const dataMessage = {
        text: "¡Gracias por conectar Hustle a Slack! Estaré enviándote alertas por aquí. ¡Gracias!"
      };
      const resultSlack: any = await axios.post(
        result?.incoming_webhook?.url,
        dataMessage,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (error) return NextResponse.json({ error: "error" });
    } catch (error) {
      console.log(error);
      return Response.json({
        error: "Hubo un error al obtener el token de acceso.",
      });
    }
  }

  redirect("/dashboard");
}
