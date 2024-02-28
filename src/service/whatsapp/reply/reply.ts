import { agentAi } from "../../agentAi/agentAi";
import { sendMessage } from "../sendMessage";
import { validateNumber } from "@/lib/validateNumber";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { transcribeAudio } from "../transcribeAudio/transcribeAudio";
import { supabase } from "@/lib/ClientSupabase";

export async function reply(dataMessage: any) {
  const cookieStore = cookies();
  const supabaseClient = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  if ("statuses" in dataMessage.entry[0]?.changes[0]?.value) {
    return;
  }

  const phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
  const messageTextStart =
    dataMessage?.entry[0]?.changes[0]?.value.messages[0]?.text?.body;

  if (!(await validateNumber(phoneNumber))?.validate.status) {
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

  if (dataMessage.entry[0]?.changes[0]?.value?.messages[0]?.type == "audio") {
    let messageResponseAudio = "¡Lo tengo! Procesando... 🎧🎧";
    const messageAudio = {
      messageResponseAudio,
      phoneNumber,
      typeMessage: "audio",
    };
    sendMessage(messageAudio);

    const id = dataMessage?.entry[0]?.changes[0]?.value?.messages[0].audio.id;

    const transcribedText: string = await transcribeAudio(id);

    messageResponseAudio = `🎧 Audio transcrito:
  ${transcribedText}`;
    const messageResponseTranscribed = {
      messageResponseAudio,
      phoneNumber,
      typeMessage: "audio",
    };
    sendMessage(messageResponseTranscribed);

    const responseBotWhatsappAudio = await agentAi(
      transcribedText,
      phoneNumber,
      email
    );
    messageResponseAudio = responseBotWhatsappAudio?.output;
    console.log(transcribedText, "transcribedText");
    const messageResponseAudioAgent = {
      messageResponseAudio,
      phoneNumber,
      typeMessage: "audio",
    };
    sendMessage(messageResponseAudioAgent);
    return;
  }
  if (dataMessage.entry[0]?.changes[0]?.value?.messages[0]?.type == "audio")
    return;

  const parts = messageTextStart?.split(" ");
  if (parts.length > 0 && parts[0] === "start/") {
    const afterStart = parts.slice(1).join(" ");

    const validatecode = async () => {
      const { data: dataUser, error } = await supabase
        .from("users")
        .update({ phoneNumber: phoneNumber })
        .eq("codeTeam", afterStart)
        .select();
      const user = dataUser?.[0].id_user;

      if (!user) {
        sendMessage({
          phoneNumber,
          typeMessage: "text",
          messageResponse: "hubo un error con su codigo",
        });
        return;
      } else {
        return sendMessage({
          phoneNumber,
          typeMessage: "text",
          messageResponse: `Bienvenido a Hustle 🎊🎊

          Desde ahora, puedes olvidarte de la operación (y el tiempo) que conlleva el CRM 
          Puedes hacer acciones como: 
          ➕ Crear un nuevo contacto,Max Velasco
          🔄 Asociar el contacto al negocio Hustle 
          📞 Registrar una llamada a Jose Colmenares “Buscar en dos días”
          📅 Registrar una reunión con el negocio Hustle “Aregar minuta”
          ⏰ Agregar una tarea al negocio Hustle para enviar la propuesta antes de mañana a las 2 PM 
          📑 Hacer cargas/cambios masivos (Crear 10 empresas)

          Ya sea con una nota de voz o en texto, 
          se reflejará en tu CRM en segundos ⏱️
          
          ¡Disfruta tu nuevo copiloto! 🫂`,
        });
      }
    };
    return validatecode();
  }

  const messageBody =
    dataMessage?.entry[0]?.changes[0]?.value.messages[0]?.text?.body;
  let messageResponse = "¡Lo tengo! Procesando...";
  const obj2 = { messageResponse, phoneNumber, typeMessage: "text" };
  sendMessage(obj2);

  console.log(email, email);
  const responseBotWhatsapp = await agentAi(messageBody, phoneNumber, email);
  messageResponse = responseBotWhatsapp?.output;

  console.log("llegue hasta abajo en reply");

  const response = { phoneNumber, messageResponse, typeMessage: "text" };
  sendMessage(response);

  return;
}
