import axios from "axios";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: Request) {

    const { nameTeam, statusAccout } = await request.json()
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  console.timeLog(nameTeam, statusAccout, "status")
  // const { data , error } = await supabase
  //   .from("integrations")
  //   .insert([
  //     {
     

  //     },
  //   ])
  //   .select();


  return new NextResponse(
    JSON.stringify({ response: "success" }),
    { status: 200 }
  );
}
