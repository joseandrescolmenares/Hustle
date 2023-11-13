import axios from "axios";
import { cookies } from "next/headers";

export const getIOwner = async (
  idOwner: string,
  dealsName?: string,
  dealsId?: string,
  num_associated_contacts?: any
) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlOwner = `https://api.hubapi.com/crm/v3/owners/${idOwner}`;

    const responseData: any = await axios.get(urlOwner, { headers });
    const dataDeals = responseData?.data;
    if (dealsName) {
      const newDataDeals = {
        ...dataDeals,
        dealname: dealsName,
        dealsId: dealsId,
        partnerContact: num_associated_contacts,
      };
      return newDataDeals;
    }

    return dataDeals;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
