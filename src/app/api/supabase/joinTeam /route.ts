import axios from "axios";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/ClientSupabase";

export async function POST(request: Request) {
  const { link } = await request.json();
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  console.log(link)
  // const { data, error } = await supabase
  //   .from("")
  //   .insert({
  //     id_team: link,
  //     id_user: userId,
  //   })
  //   .select();

  return new NextResponse(JSON.stringify({ response: "success" }), {
    status: 200,
  });
}
