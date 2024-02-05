import { agentAi } from "../../agentAi/agentAi";
import { sendMessage } from "../sendMessage";
import { validateNumber } from "@/lib/validateNumber";

export async function reply(dataMessage: any) {
  if ("statuses" in dataMessage.entry[0]?.changes[0]?.value) {
    return;
  }

  console.log(dataMessage.entry[0].changes[0].value.messages[0], "message");

  if (dataMessage.entry[0].changes[0].value.messages[0].type === "audio") {
    const phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
    const messageResponse =
      "Estamos actualmente enfocados en el desarrollo de esta nueva característica. Pronto podrás disfrutar de la capacidad de enviar mensajes de audio para enriquecer aún más tu experiencia con nuestra plataforma. Mientras tanto, agradecemos tu comprensión y te invitamos a continuar utilizando la función actual de mensajes en texto.🤘💥";

    const obj = { phoneNumber, messageResponse };
    return sendMessage(obj);
  }

  const phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
  const messageBody = dataMessage.entry[0].changes[0].value.messages[0].text.body;

  if (!(await validateNumber(phoneNumber)).validate.status) {
    const message = await validateNumber(phoneNumber);
    const response = { phoneNumber, messageResponse: message.validate.message };
    return sendMessage(response);
  }

  let messageResponse = "¡Lo tengo! Procesando...";
  const obj2 = { messageResponse, phoneNumber };
  sendMessage(obj2);

  const responseBotWhatsapp = await agentAi(messageBody, phoneNumber);
  messageResponse = responseBotWhatsapp.output;

  console.log("llegue hasta abajo en reply");
  
  const response = { phoneNumber, messageResponse };
  sendMessage(response);

  return;
}
