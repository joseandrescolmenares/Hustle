import axios from "axios";
import { agentAi } from "../agentAi/agentAi";

interface DATAMESSAGES {
  phoneNumber: string;
  messageResponse: string;
}

export async function sendMessage(dataMessage: DATAMESSAGES) {
  try {
    const accessToken = process.env.WHATSAPP_TOKEN;

    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_ID_NUMBER}/messages`;

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: dataMessage?.phoneNumber,
      type: "text",
      text: {
        preview_url: false,
        body: dataMessage?.messageResponse,
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
