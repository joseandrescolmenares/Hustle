import axios from "axios";
import { renewToken } from "../../renewToken";
import { cookies } from "next/headers";

export const getIdDeals = async (idDeals: string) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlDeals = `https://api.hubapi.com/crm/v3/objects/deals/${idDeals}?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,priority,description`;
    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;
    return dataCompanies;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
