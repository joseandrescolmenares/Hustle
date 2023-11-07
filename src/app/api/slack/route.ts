import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  try {
    const responseToken: any = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.SLACK_CLIENT_ID,
          client_secret: process.env.SLACK_CLIENT_SECRET,
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const result = responseToken.data;
    const userId = cookieStore.get("userId")?.value;
    console.log(userId, "id")
    const { data, error } = await supabase
      .from("integrations")
      .update({
        isSlack: true,
        webhookUrlSlack: result?.incoming_webhook?.url,
        teamSlack: result?.team,
        channelSlack: result?.incoming_webhook?.channel,
      })
      .eq("userId", userId)
      .select();
    console.log(data, "slack");
    console.log(error, "error")
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ funca: "dsdsd" });
}
