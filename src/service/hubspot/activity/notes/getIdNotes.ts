import axios from "axios";
import { cookies } from "next/headers";

export const getIdNotes = async (idNotes: string) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlDeals = `https://api.hubapi.com/crm/v3/objects/notes/${idNotes}?properties=hs_note_body`;
    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;
    return dataCompanies;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};