import axios from "axios";
import { cookies } from "next/headers";

export const getAllCompanies = async () => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer CI7Yn5vSMRIUAAEAUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFFPpN6P0Q96_6ERgkHXOsJ3Es_GOOj0AAABBAAAAAAAAAAAAAAAAAIYAAAAAAAAAAAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhTUAzv_R2cOwytPZkKUufBdn509H0oDbmExUgBaAA`,
      "Content-Type": "application/json",
    };
    const getAllCompanies = "https://api.hubapi.com/crm/v3/objects/companies";
    
    const responseData: any = await axios.get(getAllCompanies,{ headers});
    const dataCompanies = responseData?.data;
    return  dataCompanies;
  } catch (error) {
    console.log(error)
    throw new Error();
  }
};
