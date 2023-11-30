import { supabase } from "@/lib/ClientSupabase";
import { insertIdDeals } from "@/service/hubspot/deals/insertDeals";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const cookiesStore = cookies();
  const teamId = cookiesStore.get("team")?.value;
  // associationType

  const event = requestBody[0];

  const { data: dataTeam, error: errorTeam } = await supabase
    .from("teams")
    .select(
      `
   id_team,
    id_integrations (
      tokenHubspot,
      refresh_token
    )
  `
    )
    .eq("hubspotAccount", event?.portalId);


  if (dataTeam == null) return;
  const token = dataTeam[0]?.id_integrations[0].tokenHubspot;
  const refresh_token = dataTeam[0].id_integrations[0].refresh_token;

  console.log(token, "token")

  // if (event?.subscriptionType == "deal.creation") {
  //   const id = event.objectId;


  //   const deals = await insertIdDeals(id, token);
  //   if (deals == "expired_token") {
  //     const clientId = process.env.HUBSPOT_CLIENT_ID;
  //     const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
  //     const redirectUri = process.env.HUBSPOT_REDIRECT_URI;

  //     try {
  //       const response = await axios.post(
  //         "https://api.hubapi.com/oauth/v1/token",
  //         null,
  //         {
  //           params: {
  //             grant_type: "refresh_token",
  //             client_id: clientId,
  //             client_secret: clientSecret,
  //             redirect_uri: redirectUri,
  //             refresh_token: refresh_token,
  //           },
  //         }
  //       );

  //       if (response.data.access_token) {
  //         const { data: dataTeam, error: errorTeam } = await supabase
  //           .from("integrations")
  //           .update({
  //             tokenHubspot: response.data.access_token,
  //             refresh_token: response.data.refresh_token,
  //           })
  //           .eq("id_team", teamId);
  //       }
  //     } catch (error) {
  //       console.error("Error al renovar el token de acceso:", error);
  //     }
  //   }
  // }
 
  return Response.json({ hola: "hola" });
}
