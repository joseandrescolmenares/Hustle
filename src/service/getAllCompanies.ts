import axios from "axios";
import { renewToken } from "./renewToken";

export const getAllCompanies = async (cookieToken: string | undefined) => {
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };

    const getAllCompanies = "https://api.hubapi.com/crm/v3/objects/companies/contact/types";

    const responseData: any = await axios.get(getAllCompanies, { headers });
    const dataCompanies = responseData.data;
    return dataCompanies;
  } catch (error) {
    throw new Error();
  }
};
