import axios from "axios";
import { cookies } from "next/headers";

export const getAllCompanies = async () => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const getAllCompanies = "https://api.hubapi.com/crm/v3/objects/companies/";
    
    const responseData: any = await axios.get(getAllCompanies,{ headers});
    const dataCompanies = responseData?.data;
    return  dataCompanies;
  } catch (error) {
    console.log(error)
    throw new Error();
  }
};
