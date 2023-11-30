import axios from "axios";
import { renewToken } from "../../renewToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/ClientSupabase";


export const insertIdDeals = async (idDeals: string, token: string) => {
//   const cookiesStore = cookies();
//   const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const urlDeals = `https://api.hubapi.com/crm/v3/objects/deals/${idDeals}?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability,engagements_last_meeting_booked,&associations=notes`;
    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;
   
    return dataCompanies;
  } catch (error : any) {
    if(error.response.data.category == 'EXPIRED_AUTHENTICATION'){
     return "expired_token"
    }
    console.log(error);
    throw new Error();
  }
};
