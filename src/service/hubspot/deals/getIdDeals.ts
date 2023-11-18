import axios from "axios";
import { renewToken } from "../../renewToken";
import { cookies } from "next/headers";

export const getIdDeals = async (idDeals: string) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    const urlDeals = `https://api.hubapi.com/crm/v3/objects/deals/${idDeals}?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability,&associations=notes`;
    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;
    return dataCompanies;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
