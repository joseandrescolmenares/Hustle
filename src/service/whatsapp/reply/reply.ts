import { agentAi } from "../../agentAi/agentAi";
import { sendMessage } from "../sendMessage";
import { validateNumber } from "@/lib/validateNumber";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { transcribeAudio } from "../transcribeAudio/transcribeAudio";
import { supabase } from "@/lib/ClientSupabase";

export async function reply(dataMessage: any) {
  const cookieStore = cookies();
  const supabaseClient = createRouteHandlerClient({ cookies: () => cookieStore });

  const messageEntry = dataMessage?.entry[0]?.changes[0]?.value;
  if ("statuses" in messageEntry) {
    return;
  }

  const phoneNumber = messageEntry.messages[0].from;
  const messageTextStart = messageEntry.messages[0]?.text?.body;
  const isTextMessage = messageEntry.messages[0]?.type === "text";

  if (isTextMessage) {
    const parts = messageTextStart?.split(" ");
    if (parts.length > 0 && parts[0] === "start/") {
      const afterStart = parts.slice(1).join(" ");
      const validateCode = async () => {
        const { data: dataUser, error } = await supabase
          .from("users")
          .update({ phoneNumber: phoneNumber })
          .eq("codeTeam", afterStart)
          .select();
        
        const user = dataUser?.[0]?.id_user;

        if (!user) {
          sendMessage({
            phoneNumber,
            typeMessage: "text",
            messageResponse: "Hubo un error con su código",
          });
        } else {
          sendMessage({
            phoneNumber,
            typeMessage: "text",
            messageResponse: `Bienvenido a Hustle 🎊🎊

Desde ahora, puedes olvidarte de la operación (y el tiempo) que conlleva el CRM.
Puedes hacer acciones como:
➕ Crear un nuevo contacto, Max Velasco
🔄 Asociar el contacto al negocio Hustle
📞 Registrar una llamada a Jose Colmenares “Buscar en dos días”
📅 Registrar una reunión con el negocio Hustle “Agregar minuta”
⏰ Agregar una tarea al negocio Hustle para enviar la propuesta antes de mañana a las 2 PM
📑 Hacer cargas/cambios masivos (Crear 10 empresas)

Ya sea con una nota de voz o en texto, se reflejará en tu CRM en segundos ⏱️

¡Disfruta tu nuevo copiloto! 🫂`,
          });
        }
      };
      return validateCode();
    }
  }

  if (!(await validateNumber(phoneNumber))?.validate?.status) {
    const message = await validateNumber(phoneNumber);
    const response = {
      phoneNumber,
      messageResponse: message?.validate?.message,
      typeMessage: "text",
    };
    return sendMessage(response);
  }

  const { data: dataEmail, error } = await supabaseClient
    .from("users")
    .select("emailCrm")
    .eq("phoneNumber", phoneNumber);

  if (dataEmail == null) return;

  const email = dataEmail[0]?.emailCrm;

  if (messageEntry.messages[0]?.type === "audio") {
    let messageResponseAudio = "¡Lo tengo! Procesando... 🎧🎧";
    const messageAudio = {
      messageResponseAudio,
      phoneNumber,
      typeMessage: "audio",
    };
    sendMessage(messageAudio);

    const id = messageEntry.messages[0]?.audio?.id;
    const transcribedText: string = await transcribeAudio(id);

    messageResponseAudio = `🎧 Audio transcrito:\n${transcribedText}`;
    sendMessage({
      messageResponseAudio,
      phoneNumber,
      typeMessage: "audio",
    });

    const responseBotWhatsappAudio = await agentAi(transcribedText, phoneNumber, email);
    messageResponseAudio = responseBotWhatsappAudio?.output;
    sendMessage({
      messageResponseAudio,
      phoneNumber,
      typeMessage: "audio",
    });
    return;
  }

  const messageBody = messageEntry.messages[0]?.text?.body;
  sendMessage({
    messageResponse: "¡Lo tengo! Procesando...",
    phoneNumber,
    typeMessage: "text",
  });

  const responseBotWhatsapp = await agentAi(messageBody, phoneNumber, email);
  const messageResponse = responseBotWhatsapp?.output;
  sendMessage({
    messageResponse,
    phoneNumber,
    typeMessage: "text",
  });
}
