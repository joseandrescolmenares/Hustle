import axios from "axios";
import { renewToken } from "../../renewToken";
import { cookies } from "next/headers";

export const getAllDeals = async () => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlDeals = "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,num_associated_contacts";

    const responseData: any = await axios.get(urlDeals,{ headers});
    const dataCompanies = responseData?.data;
    return  dataCompanies;
  } catch (error) {
    console.log(error)
    throw new Error();
  }
};