import axios from "axios";
import { Flag, Type } from "lucide-react";
import { cookies } from "next/headers";
// export const runtime = "edge"


export const getIOwner = async (token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const urlOwner = `https://api.hubapi.com/crm/v3/owners`;

    const responseData: any = await axios.get(urlOwner,{ headers });
    const dataDeals = responseData?.data;

    console.log(dataDeals);

    return dataDeals;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
