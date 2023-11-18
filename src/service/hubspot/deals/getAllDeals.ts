import axios from "axios";
import { Console } from "console";
import { cookies } from "next/headers";

export const getAllDeals = async (url: string) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlDeals = url;

    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;

    return dataCompanies;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
