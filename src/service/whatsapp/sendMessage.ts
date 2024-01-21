import axios from "axios";

 export async function sendMessage(value: any) {
    try {
      const phoneNumber = value.entry[0].changes[0].value.messages[0].from;
      const accessToken = process.env.WHATSAPP_TOKEN;
  
      const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_ID_NUMBER}/messages`;
  
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: `541126336301`,
        type: "text",
        text: {
          preview_url: false,
          body: "Estamos trabajando en esto, espere un momento",
        },
      };
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
  
      const response = await axios.post(url, data, { headers });
  
      console.log("Mensaje enviado con éxito:", response.data);
      return true;
    } catch (error) {
      console.error(`Error al enviar el mensaje: ${error}`);
      return false;
    }
  }