import { Reply } from "lucide-react";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import { reply, sendMessage } from "@/service/whatsapp/sendMessage";
import { agentAi } from "@/service/agentAi/agentAi";

export async function GET(request: Request) {
  const verificationToken = process.env.WHATSAPP_VERIFICATION_TOKEN;
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (verificationToken === token) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("bad toke400");
}

export async function POST(request: Request) {
  try {
    const dataMessage = await request.json();
    reply(dataMessage);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(`Error en la función principal: ${error}`);
    return NextResponse.json({ status: 500 });
  }
}
