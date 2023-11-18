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
    const getAllContact = "https://api.hubapi.com/crm/v3/objects/contacts";
    // : Obtiene las asociaciones de un objeto a otro tipo de objeto.
    const responseData: any = await axios.get(getAllContact, { headers });
    const dataContact = responseData.data;
    return dataContact;
  } catch (error) {
    throw new Error();
  }
};
