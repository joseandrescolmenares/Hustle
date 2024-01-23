import { agentAi } from "../agentAi/agentAi";
import { sendMessage } from "../whatsapp/sendMessage";
import { validateNumber } from "@/lib/validateNumber";

export async function reply(dataMessage: any) {
  if ("statuses" in dataMessage.entry[0]?.changes[0]?.value) {
    return;
  }
  let phoneNumber = dataMessage.entry[0].changes[0].value.messages[0].from;
  let messageBody =
    dataMessage.entry[0].changes[0].value.messages[0].text.body;
  // Validate the number before processing it
console.log(!(await validateNumber(phoneNumber)).validate.status,"verr")
  if (!(await validateNumber(phoneNumber)).validate.status) {

    const message = await validateNumber(phoneNumber)
    const response = { phoneNumber : '', messageResponse :  message.validate.message};
    return await sendMessage(response)
  }

  const responseBotWhatsapp = await agentAi(messageBody, phoneNumber);

  const messageResponse = responseBotWhatsapp.output;
  // const messageResponse = "Hola!! en unos pocos minutos estaremos liberando el asistente!"
  const response = { phoneNumber, messageResponse };
  const success = await sendMessage(response);
}
