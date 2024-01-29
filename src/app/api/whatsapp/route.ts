import { Reply } from "lucide-react";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import {  sendMessage } from "@/service/whatsapp/sendMessage";
import { agentAi } from "@/service/agentAi/agentAi";
import { reply } from "@/service/whatsapp/reply/reply";

export async function GET(request: Request) {
  // const verificationToken = process.env.WHATSAPP_VERIFICATION_TOKEN;
  const verificationToken = "keco45rV7FsgAiG2ogj!!YsKUay@ageB2dw9A9"
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
   await reply(dataMessage);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(`Error : ${error}`);
    return NextResponse.json({ status: 500 });
  }
}

// export async function POST(event: any) {
//   try {
//     const dataMessage  = await event.request.json();
//     // Enviar el estado 200 como respuesta inmediata
//     event.waitUntil(
//       // Ejecutar la función después de enviar la respuesta 200
//       new Promise<void>((resolve) => {
//         setTimeout(async () => {
//           // Ejecutar la función que tarda mucho
//           // ...
//           // Una vez que la función haya terminado, enviar la respuesta real
//           await reply(dataMessage);
//           resolve();
//         }, 1000); // Tiempo de espera simulado (en milisegundos)
//       })
//     );
//     return new Response(JSON.stringify({ status: 200 }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(`Error en la función principal: ${error}`);
//     return new Response(JSON.stringify({ status: 500 }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }