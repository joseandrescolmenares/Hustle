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
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("access_token")?.value
  const code = getCodeFromQueryString(link);

  const { data: dataTeam, error } = await supabase
    .from("teams")
    .select(
      `
    id_team,
    id_integrations (
      id_integrations,
       tokenHubspot,
       refresh_token
      )
    `
    )
    .eq("inviteCode", code);

  if (dataTeam) {
    const { tokenHubspot, id_integrations, refresh_token }: any =
      dataTeam[0].id_integrations;
    cookieStore.set("refresh_token", refresh_token);
    cookieStore.set("accessTokenHubspot", tokenHubspot);
    cookieStore.set("team", dataTeam[0].id_team);
    cookieStore.set("idIntegrations", id_integrations);
    const {
      data: { user },
    }: any = await supabase.auth.getUser(token);
    
    const { data: dataUser, error: errorUser } = await supabase
      .from("users")
      .insert([
        {
          id_user: userId,
          rol: "guest",
          id_team: dataTeam[0].id_team,
          isOnboarding: true,
          correo: user.email
        },
      ])
      .select();
  }

  return new NextResponse(JSON.stringify({ response: "success" }), {
    status: 200,
  });
}
