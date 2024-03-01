import axios from "axios";
import { renewToken } from "../../renewToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getIdDeals = async (token: string) => {

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const urlDeals = `https://api.hubapi.com/crm/v3/properties/companies`;
    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;
   
    return dataCompanies;
  } catch (error : any) {
    
    console.log(error);
    throw new Error();
  }
};
