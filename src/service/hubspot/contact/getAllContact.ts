import axios from "axios";
import { cookies } from "next/headers";

export const getAllContact = async () => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    //  asociasones
    ("    crm/v4/associations/contact/company/labels");
    const Urldeal = "https://api.hubapi.com/crm/v3/objects/deals";
    const getAllContact = "https://api.hubapi.com/crm/v3/objects/contacts";
    const propiedadesObject =
      "https://api.hubapi.com/crm/v3/properties/{objectType}";
    const flowWork = "https://api.hubapi.com/automation/v3/workflows";
    const pronosticoVentas = "https://api.hubapi.com/crm/v3/objects/forecasts";
    const interacciones =
      "https://api.hubapi.com/conversations/v3/interactions";
    const GetAllAsosiaciones =
      "https://api.hubapi.com//crm/v3/associations/{fromObjectType}/{toObjectType}/types";
    //  : Lista las propiedades para un tipo de objeto específico (como contactos, empresas, tratos, etc.).
    const asociaciones =
      "https://api.hubapi.com/crm/v3/objects/{objectType}/{objectId}/associations/{toObjectType}";
    // : Obtiene las asociaciones de un objeto a otro tipo de objeto.
    const responseData: any = await axios.get(getAllContact, { headers });
    const dataContact = responseData.data;
    return dataContact;
  } catch (error) {
    throw new Error();
  }
};
