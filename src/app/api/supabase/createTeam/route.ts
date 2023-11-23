import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  try {
    const { nameTeam, statusAccout } = await request.json();
    const cookieStore = cookies();
    const userId = cookieStore.get("userId")?.value;
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Inserción en la tabla "integrations"
    const { data: dataIntegrations, error: errorIntegrations } = await supabase
      .from("integrations")
      .insert([{ isHubspot: false, isSlack: false }])
      .select();

      

    if (errorIntegrations) {
      throw new Error(`Error during integration insertion: ${errorIntegrations.message}`);
    }

    console.log(dataIntegrations, "Integration ID");
    cookieStore.set("idIntegrations",  dataIntegrations[0]?.id_integrations);
    // Inserción en la tabla "teams"
    const { data: dataTeam, error: errorTeam } = await supabase
      .from("teams")
      .insert([
        {
          id_integrations: dataIntegrations[0]?.id_integrations,
          nameTeam: nameTeam,
          statusAccount: statusAccout,
        },
      ])
      .select();

    if (errorTeam) {
      throw new Error(`Error during team insertion: ${errorTeam.message}`);
    }

    console.log(dataTeam, "Team Data");

    // Inserción en la tabla "users"
    const { data: dataUser, error: errorUser } = await supabase
      .from("users")
      .insert([
        {
          id_user: userId,
          id_team: dataTeam[0]?.id_team,
          rol: "creator",
        },
      ])

    if (errorUser) {
      throw new Error(`Error during user insertion: ${errorUser.message}`);
    }

    console.log(dataUser, "User Data");

    // Establecer la cookie "team"
    if (dataTeam) {
      cookieStore.set("team", dataTeam[0].id_team);
    }

    return new NextResponse(JSON.stringify({ response: "success" }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
