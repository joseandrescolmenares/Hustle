import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {
  try {
    const {
      nameCompany,
      firstname,
      phone,
      organizationSize,
      crmName,
      email,
      codeNumber
    } = await request.json();
    const cookieStore = cookies();
    const token = cookieStore.get("access_token")?.value;
    const userId = cookieStore.get("userId")?.value;
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    // const newValueNumber = codeNumber.replace(/\+/g, '') + phone;
 
    const { data: dataIntegrations, error: errorIntegrations } = await supabase
      .from("integrations")
      .insert([{ isHubspot: false, isSlack: false }])
      .select();

    if (errorIntegrations) {
      throw new Error(
        `Error during integration insertion: ${errorIntegrations.message}`
      );
    }

    cookieStore.set("idIntegrations", dataIntegrations[0]?.id_integrations);

    const { data: dataTeam, error: errorTeam } = await supabase
      .from("teams")
      .insert([
        {
          id_integrations: dataIntegrations[0]?.id_integrations,
          nameCompany: nameCompany,
          firstname: firstname,
          // phone: newValueNumber,
          organizationSize: organizationSize,
          crmName: crmName,
        },
      ])
      .select();

    if (errorTeam) {
      throw new Error(`Error during team insertion: ${errorTeam.message}`);
    }
    const {
      data: { user },
    }: any = await supabase.auth.getUser(token);
    console.log(user, "user");

    const { data: dataUser, error: errorUser } = await supabase
      .from("users")
      .insert([
        {
          id_user: userId,
          id_team: dataTeam[0]?.id_team,
          rol: "creator",
          isOnboarding: true,
          correo: user.email,
          // phoneNumber: newValueNumber,
          emailCrm: email,
        },
      ]);

    if (errorUser) {
      throw new Error(`Error during user insertion: ${errorUser.message}`);
    }

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
