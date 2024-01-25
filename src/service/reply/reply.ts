import { agentAi } from "../agentAi/agentAi";
import { sendMessage } from "../whatsapp/sendMessage";
import { validateNumber } from "@/lib/validateNumber";

export async function reply(dataMessage: any) {
  if ("statuses" in dataMessage.entry[0]?.changes[0]?.value) {
    return;
  }
  console.log(dataMessage.entry[0].changes[0].value.messages[0], "message");
  if (dataMessage.entry[0].changes[0].value.messages[0].type === "audio") {
    let phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
    let messageResponse = "¡Lo tengo! Procesando... 🎧";
    const obj = { phoneNumber, messageResponse };
    sendMessage(obj);
    // await handleAudioMessage(dataMessage);

    setTimeout(async () => {
      messageResponse =
        "Hemos creado el negocio 'WhatsApp' con éxito. ¡Listo para seguir optimizando tu experiencia!";
      const obj1 = { phoneNumber, messageResponse };
      await sendMessage(obj1);
    }, 8000);

    return;
  }

  let phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
  let messageBody = dataMessage.entry[0].changes[0].value.messages[0].text.body;

  if (!(await validateNumber(phoneNumber)).validate.status) {
    const message = await validateNumber(phoneNumber);
    const response = { phoneNumber, messageResponse: message.validate.message };
    return await sendMessage(response);
  }
  let messageResponse = "¡Lo tengo! Procesando...";
  const obj2 = { messageResponse, phoneNumber };

  sendMessage(obj2);

  const responseBotWhatsapp = await agentAi(messageBody, phoneNumber);

  messageResponse = responseBotWhatsapp.output;
  // const messageResponse = "Hola!! en unos pocos minutos estaremos liberando el asistente!"
  const response = { phoneNumber, messageResponse };
  const success = await sendMessage(response);
}
