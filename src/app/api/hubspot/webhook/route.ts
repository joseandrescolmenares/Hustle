import { supabase } from "@/lib/ClientSupabase";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const cookiesStore = cookies();
  const teamId = cookiesStore.get("team")?.value;
  // associationType

  const event  = requestBody[0]

    const { data: dataTeam, error: errorTeam } = await supabase
      .from("teams")
      .select("hubspotAccount, id_team")
      .eq("hubspotAccount", event.portalId);

    // if (dataTeam ) {
    //   const { data: dataTeam, error: errorTeam } = await supabase
    //   .from("")
    //   .update({
    //     hubspotAccount: portalId,
    //   })
    //   .eq("id_team", teamId);
    // }
  console.log(event, "bodu");
  console.log(requestBody , "result");
  // console.log(dataTeam, "supabase");

  return Response.json({ hola: "hola" });
}
