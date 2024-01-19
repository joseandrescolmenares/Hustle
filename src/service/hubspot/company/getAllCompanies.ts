import axios from "axios";
import { cookies } from "next/headers";

export const getAllCompanies = async () => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer CKeCh_zRMRIUAAEAUAAA-SIAAED8BwkA4AcgAAQYp_ebFSD3hJkdKMXiigEyFF5RzYPHsz0WwbNnufZZaZk9HxXdOj8AAABBAAAAAAAAAAAAAAAAAIYAAAAAAAAAAAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAgAEAAOABAAhCFHspzw5bLBNYLE2VlaosiFSvtZuISgNuYTFSAFoA`,
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
