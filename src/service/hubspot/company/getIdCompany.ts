import axios from "axios";
import { cookies } from "next/headers";

export const getIdCompanies = async (idCompany: string) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;

  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };

    const getAllCompanies = `https://api.hubapi.com/crm/v3/objects/companies/${idCompany}?properties=hubspot_owner_id`;

    const responseData: any = await axios.get(getAllCompanies, { headers });
    const dataCompanies = responseData.data;
    return dataCompanies;
  } catch (error) {
    throw new Error();
  }
};
