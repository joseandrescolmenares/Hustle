import axios from "axios";

export async function POST(request: Request) {
  const { webUrl, redFlags, greenFlags, neutralFlags } = await request.json();

  const dataMessage = {
    text: ` 

    Queremos informarte sobre el estado actual de tus negocios. Hemos identificado que:
    
    - ${redFlags} negocios se encuentran en riesgo.
    - ${neutralFlags} negocios están en una situación moderada.
    - Hemos identificado ${greenFlags} oportunidad para mejorar y crecer las ventas.
    
    Estamos trabajando activamente en estrategias para mitigar los riesgos y maximizar las oportunidades. Nuestro equipo está comprometido en brindarte el mejor apoyo posible.
    
    Si tienes alguna pregunta o necesitas más detalles sobre la situación específica de cada negocio, no dudes en ponerte en contacto con nosotros.
    
    Agradecemos tu confianza en nosotros y estamos aquí para ayudarte a lograr el éxito.`,
  };
  const resultSlack: any = await axios.post(webUrl, dataMessage, {
    headers: {
      "Content-type": "application/json",
    },
  });

  console.log(resultSlack,"slack")

  console.log(webUrl,redFlags,neutralFlags,greenFlags,'backent slack')

  return Response.json({ ok: "ok" });
}
