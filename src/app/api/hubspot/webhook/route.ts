import { supabase } from "@/lib/ClientSupabase";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { portalId } = requestBody;
  const cookiesStore = cookies();
  const teamId = cookiesStore.get("team")?.value;

  const { data: dataTeam, error: errorTeam } = await supabase
    .from("teams")
    .select("hubspotAccount")
    .eq("hubspotAccount", portalId);

  // if (dataTeam) {
  //   const { data: dataTeam, error: errorTeam } = await supabase
  //   .from("")
  //   .update({
  //     hubspotAccount: portalId,
  //   })
  //   .eq("id_team", teamId);
  // }

  console.log(portalId, "result");
  console.log(dataTeam, "supabase")

  return Response.json({ hola: "hola" });
}
