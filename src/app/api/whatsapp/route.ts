import { Reply } from "lucide-react";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import { sendMessage } from "@/service/whatsapp/sendMessage";
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
    const dataMessageWhatsapp = await request.json();
    const phoneNumber = dataMessageWhatsapp.entry[0].changes[0].value.messages[0].from;
    const messageBody =  dataMessageWhatsapp.entry[0].changes[0].value.messages[0].text.body;
    const responseBotWhatsapp = await agentAi(messageBody)
    const messageResponse = responseBotWhatsapp.output
    const dataMessage = { phoneNumber,messageResponse}
    const success = await sendMessage(dataMessage);
    return NextResponse.json({ status: success ? 200 : 500 });
  } catch (error) {
    console.error(`Error en la función principal: ${error}`);
    return NextResponse.json({ status: 500 });
  }
}
