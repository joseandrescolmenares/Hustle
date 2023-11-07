import axios from "axios";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {

    const { userId:id } = await request.json()
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data: integrations, error } = await supabase
    .from("integrations")
    .insert([
      {
        userId: id,
        isHubspot: false,
        isSlack: false,
        webhookUrlSlack: "",
        accessTokenSlack : "",
         channelSlack: "",
        teamSlack: {},
     

      },
    ])
    .select();
    console.log(integrations,"dataaa");

console.log(error, "errorr")
  return new NextResponse(
    JSON.stringify({ response: "success" }),
    { status: 200 }
  );
}
