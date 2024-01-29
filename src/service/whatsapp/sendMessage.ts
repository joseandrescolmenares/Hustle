import axios from "axios";
import { agentAi } from "../agentAi/agentAi";

interface DATAMESSAGES {
  phoneNumber: string;
  messageResponse: string;
}

export async function sendMessage(dataMessage: DATAMESSAGES) {
  try {

    console.log("estou funcionandogit ")
    // const accessToken = process.env.WHATSAPP_TOKEN;
    const accessToken = "EAAKJGUoai2ABOwhwMQhyTPjXUapY0fxfsfILouNZBVUvKBK3PGvOFZCRBqDw0SUlCS3RH7KErLWKeCEW0eZBErUxWygjaolnZC9ZASaQCmkoqCJm6gWB8yAH9uMeYKb2IEdAN3xRLZCELkqBMOZBCEZBDzzCnXL7qoZApR7ZAHqqHhKpZCeWB54v8oelZC3MHPcWJIvT";
    // const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_ID_NUMBER}/messages`;
    const url = `https://graph.facebook.com/v18.0/216808618182077/messages`;
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

    return ;
  } catch (error) {
    console.error(`Error al enviar el mensaje: ${error}`);
    return;
  }
}
