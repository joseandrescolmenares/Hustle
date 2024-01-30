import { agentAi } from "../../agentAi/agentAi";
import { sendMessage } from "../sendMessage";
import { validateNumber } from "@/lib/validateNumber";

const cache = new Set();


export async function reply(dataMessage: any) {
  if ("statuses" in dataMessage.entry[0]?.changes[0]?.value) {
    return;
  }
  if (cache.has(dataMessage.id)) {
    return new Response("El mensaje ya se está procesando", { status: 200 });
  }

  cache.add(dataMessage.entry[0].changes[0].value.messages[0].id);

  console.log(dataMessage.entry[0].changes[0].value.messages[0], "message");
  
  if (dataMessage.entry[0].changes[0].value.messages[0].type === "audio") {
    let phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
    let messageResponse =
      "Estamos actualmente enfocados en el desarrollo de esta nueva característica. Pronto podrás disfrutar de la capacidad de enviar mensajes de audio para enriquecer aún más tu experiencia con nuestra plataforma. Mientras tanto, agradecemos tu comprensión y te invitamos a continuar utilizando la función actual de mensajes en texto.🤘💥";
    const obj = { phoneNumber, messageResponse };
    return sendMessage(obj);
    // await handleAudioMessage(dataMessage);

    // setTimeout(async () => {
    //   messageResponse =
    //     "Hemos creado el negocio 'WhatsApp' con éxito. ¡Listo para seguir optimizando tu experiencia!";
    //   const obj1 = { phoneNumber, messageResponse };
    //   await sendMessage(obj1);
    // }, 8000);
  }

  let phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
  let messageBody = dataMessage.entry[0].changes[0].value.messages[0].text.body;
  console.log("estoyyy en reply");
  if (!(await validateNumber(phoneNumber)).validate.status) {
    const message = await validateNumber(phoneNumber);
    const response = { phoneNumber, messageResponse: message.validate.message };
    sendMessage(response);

  }
  let messageResponse = "¡Lo tengo! Procesando...";
  const obj2 = { messageResponse, phoneNumber };

  sendMessage(obj2);

  const responseBotWhatsapp = await agentAi(messageBody, phoneNumber);
 
  messageResponse = responseBotWhatsapp.output;
  console.log("llegue hasyta abajo de en reply");
  const response = { phoneNumber, messageResponse };
  sendMessage(response);
  cache.delete(dataMessage.id);
  return
  
}
