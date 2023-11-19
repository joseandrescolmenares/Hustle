import axios from "axios";
import { cookies } from "next/headers";

export const getIOwner = async (
  idOwner: string,
  dealsName?: string,
  dealsId?: string,
  num_associated_contacts?: string,
  amount?: string,
  closed_lost_reason?: any,
  closed_won_reason?: any,
  closedate?: any,
  createdate?: string,
  dealstage?: string,
  description?: string,
  hs_all_collaborator_owner_ids?: any,
  hs_deal_stage_probability?: string,
  hs_forecast_probability?: any,
  hs_is_closed_won?: string,
  hs_lastmodifieddate?: string,
  hs_next_step?: string,
  hs_priority?: string,
  num_contacted_notes?: string
) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
      "Content-Type": "application/json",
    };
    if (!idOwner) {
      const data = {
        dealname: dealsName,
        dealsId: dealsId,
        partnerContact: num_associated_contacts,
        id: idOwner,
      };
      return data;
    }
    const urlOwner = `https://api.hubapi.com/crm/v3/owners/${idOwner}`;

    const responseData: any = await axios.get(urlOwner, { headers });
    const dataDeals = responseData?.data;

    if (dealsName) {
      const newDataDeals = {
        ...dataDeals,
        dealname: dealsName,
        dealsId: dealsId,
        partnerContact: num_associated_contacts,
      };
      return newDataDeals;
    }

    return dataDeals;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
