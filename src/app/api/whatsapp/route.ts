import { Reply } from "lucide-react";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import { sendMessage } from "@/service/whatsapp/sendMessage";
import { agentAi } from "@/service/agentAi/agentAi";
import { reply } from "@/service/whatsapp/reply/reply";

// export const runtime = "edge"

export async function GET(request: Request) {
  // const verificationToken = process.env.WHATSAPP_VERIFICATION_TOKEN;
  const verificationToken = "keco45rV7FsgAiG2ogj!!YsKUay@ageB2dw9A9";
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
    Response.json({ status: 200 });
    reply(dataMessage);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(`Error : ${error}`);
    return NextResponse.json({ status: 500 });
  }
}
// export async function POST(request: Request) {
//   try {
//     const dataMessage = await request.json();

//     // Enviar la respuesta con el estado 200
//     const responsePromise = new Promise((resolve) => {
//       resolve(new Response("OK", { status: 200 }));
//     });

//     // Ejecutar la función reply en segundo plano
//   reply(dataMessage);

//     // Esperar a que la respuesta se haya enviado antes de continuar
//     await responsePromise;

//     // Continuar con el resto del código después de enviar la respuesta

//     return new Response("Reply en progreso", { status: 200 });
//   } catch (error) {
//     console.error(`Error : ${error}`);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
// export async function POST(request: Request) {
//   try {
//     const dataMessage = await request.json();

//     // Responder inmediatamente con un código de estado 200
//     return  NextResponse.json({ status: 200 });

//     // Crear una promesa que se resuelva inmediatamente con la respuesta inicial
//     const initialResponsePromise = Promise.resolve(initialResponse);

//     // Esperar tanto la respuesta inicial como las operaciones adicionales
//     await Promise.all([initialResponsePromise, reply(dataMessage)]);

//     // Si es necesario, puedes enviar otra respuesta aquí
//     // await sendAdditionalResponse(dataMessage);

//   } catch (error) {
//     console.error(`Error: ${error}`);
//     return NextResponse.json({ status: 500 });
//   }
// }

// Crear una caché para almacenar los ID de los mensajes

// export async function POST(request: Request) {
//   try {
//     const dataMessage = await request.json();

//     // Verificar si el ID del mensaje ya está en la caché

//     // Agregar el ID del mensaje a la caché

//     // Enviar la respuesta con el estado 200
//     const responsePromise = new Promise((resolve) => {
//       resolve(new Response("OK", { status: 200 }));
//     });

//     // Ejecutar la función reply en segundo plano
//     await reply(dataMessage);

//     // Esperar a que la respuesta se haya enviado antes de continuar
//     await responsePromise;

//     // Eliminar el ID del mensaje de la caché después de procesarlo

//     // Continuar con el resto del código después de enviar la respuesta

//     return new Response("Reply en progreso", { status: 200 });
//   } catch (error) {
//     console.error(`Error : ${error}`);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
