import axios from "axios";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/ClientSupabase";

const getCodeFromQueryString = (link: string) => {
  const codeParam = link.split("?")[1];
  if (codeParam) {
    return codeParam;
  }
  return null;
};

export async function POST(request: Request) {
  const { link } = await request.json();
  console.log(link);
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const code = getCodeFromQueryString(link);

  const { data: dataTeam, error } = await supabase
    .from("teams")
    .select("id_team,nameTeam, id_integrations")
    .eq("inviteCode", code);

  if (dataTeam) {
    cookieStore.set("team", dataTeam[0].id_team);
    cookieStore.set("idIntegrations", dataTeam[0].id_integrations);
    const { data: dataUser, error: errorUser } = await supabase
      .from("users")
      .insert([{ id_user: userId, rol: "guest", id_team: dataTeam[0].id_team }])
      .select();
    console.log(dataUser, "datauser", errorUser,"erro");
  }

  return new NextResponse(JSON.stringify({ response: "success" }), {
    status: 200,
  });
}
