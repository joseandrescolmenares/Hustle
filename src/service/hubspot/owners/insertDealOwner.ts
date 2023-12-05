import axios from "axios";
import { cookies } from "next/headers";

export const insertDealowner = async (
  idOwner?: string,
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
  num_contacted_notes?: string,
  token?: string,
  idTeam?:string,
  resultScore?: any
) => {

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    if (!idOwner) {
      const data = {
        nameOnwer: "",
        dealname: dealsName,
        id_deals: dealsId,
        dealContacts: num_associated_contacts,
        amount: amount,
        idOwner: idOwner,
        closed_lost_reason: closed_lost_reason,
        closed_won_reason: closed_won_reason,
        closedate: closedate,
        createdate: createdate,
        dealstage: dealstage,
        description: description,
        hs_all_collaborator_owner_ids: hs_all_collaborator_owner_ids,
        hs_deal_stage_probability: hs_deal_stage_probability,
        hs_forecast_probability: hs_forecast_probability,
        hs_is_closed_won: hs_is_closed_won,
        hs_lastmodifieddate: hs_lastmodifieddate,
        hs_next_step: hs_next_step,
        hs_priority: hs_priority,
        num_contacted_notes: num_contacted_notes,
        id_team: idTeam,
        score: resultScore?.score,
        scoreFlag: resultScore?.flag,
        scoreReason: resultScore?.shortReason.join(", "),
        scoreDetails: resultScore?.detailedReason,
      };
      return data;
    }
    const urlOwner = `https://api.hubapi.com/crm/v3/owners/${idOwner}`;

    const responseData: any = await axios.get(urlOwner, { headers });
    const dataDeals = responseData?.data;

    if (dealsName) {
      const newDataDeals = {
        nameOnwer: `${dataDeals.firstName} ${dataDeals.lastName}`,
        idOwner: idOwner,
        dealname: dealsName,
        id_deals: dealsId,
        dealContacts: num_associated_contacts,
        amount: amount,
        closed_lost_reason: closed_lost_reason,
        closed_won_reason: closed_won_reason,
        closedate: closedate,
        createdate: createdate,
        dealstage: dealstage,
        description: description,
        hs_all_collaborator_owner_ids: hs_all_collaborator_owner_ids,
        hs_deal_stage_probability: hs_deal_stage_probability,
        hs_forecast_probability: hs_forecast_probability,
        hs_is_closed_won: hs_is_closed_won,
        hs_lastmodifieddate: hs_lastmodifieddate,
        hs_next_step: hs_next_step,
        hs_priority: hs_priority,
        num_contacted_notes: num_contacted_notes,
        id_team: idTeam,
        score: resultScore?.score,
        scoreFlag: resultScore?.flag,
        scoreReason: resultScore?.shortReason.join(", "),
        scoreDetails: resultScore?.detailedReason,
      };
      return newDataDeals;
    }

    return dataDeals;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
