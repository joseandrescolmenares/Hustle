import axios from "axios";
import { agentAi } from "../agentAi/agentAi";

interface DATAMESSAGES {
  phoneNumber: string;
  messageResponse: string;
}

export async function sendMessage(dataMessage: DATAMESSAGES) {
  try {
    const accessToken = process.env.WHATSAPP_TOKEN;
    console.log(dataMessage.phoneNumber,"number")

    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_ID_NUMBER}/messages`;

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: '541126336301', // dataMessage.phoneNumber,
      type: "text",
      text: {
        preview_url: false,
        body: dataMessage.messageResponse,
      },
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, data, { headers });

    return true;
  } catch (error) {
    console.error(`Error al enviar el mensaje: ${error}`);
    return false;
  }
}

export async function reply(dataMessage: any) {
  if('statuses' in dataMessage.entry[0]?.changes[0]?.value){
    return;
  }
  const phoneNumber =
      dataMessage.entry[0].changes[0].value.messages[0].from;
    const messageBody =
      dataMessage.entry[0].changes[0].value.messages[0].text.body;
    const responseBotWhatsapp = await agentAi(messageBody);
    const messageResponse = responseBotWhatsapp.output;
    // const messageResponse = "Hola!! en unos pocos minutos estaremos liberando el asistente!"
    const response = { phoneNumber, messageResponse };
    const success = await sendMessage(response);
}
