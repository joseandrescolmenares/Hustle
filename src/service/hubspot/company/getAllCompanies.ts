import axios from "axios";
import { cookies } from "next/headers";

export const getAllCompanies = async () => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer CKG0t9vSMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFGQUUPiocFajF7qROAEJfOpGUC5IOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhSwLT1IwIx9aYnXSsj5c5Vm0qfj5UoDbmExUgBaAA`,
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
