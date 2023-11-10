import axios from "axios";
import { renewToken } from "../../renewToken";
import { cookies } from "next/headers";

export const getIOwner = async (idOwner: string) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlOwner = `https://api.hubapi.com/crm/v3/owners/${idOwner}`;

    const responseData: any = await axios.get(urlOwner, { headers });
    const dataCompanies = responseData?.data;
    return dataCompanies;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
