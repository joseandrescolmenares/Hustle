import axios from "axios";
import { Flag, Type } from "lucide-react";
import { cookies } from "next/headers";
// export const runtime = "edge"

type ResultScore = {
  flag: string;
  shortReason: string[];
  detailedReason: string;
  score: number;
}

export const getIOwner = async (
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
  notes_last_contacted?: string,
  resultScore?: any,
) => {
  const cookiesStore = cookies();
  const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
  const idTeam = cookiesStore.get("team")?.value;
  try {
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
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
        last_activity: notes_last_contacted,

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
        last_activity: notes_last_contacted,
      };
      return newDataDeals;
    }

    return dataDeals;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

// import { Flag, Type } from "lucide-react";
// import { cookies } from "next/headers";

// export const runtime = "edge";

// type ResultScore = {
//   flag: string;
//   shortReason: string[];
//   detailedReason: string;
//   score: number;
// };

// export const getIOwner = async (
//   idOwner?: string,
//   dealsName?: string,
//   dealsId?: string,
//   num_associated_contacts?: string,
//   amount?: string,
//   closed_lost_reason?: any,
//   closed_won_reason?: any,
//   closedate?: any,
//   createdate?: string,
//   dealstage?: string,
//   description?: string,
//   hs_all_collaborator_owner_ids?: any,
//   hs_deal_stage_probability?: string,
//   hs_forecast_probability?: any,
//   hs_is_closed_won?: string,
//   hs_lastmodifieddate?: string,
//   hs_next_step?: string,
//   hs_priority?: string,
//   num_contacted_notes?: string,
//   notes_last_contacted?: string,
//   resultScore?: any
// ) => {
//   const cookiesStore = cookies();
//   const cookieToken = cookiesStore.get("accessTokenHubspot")?.value;
//   const idTeam = cookiesStore.get("team")?.value;
//   try {
//     const headers = {
//       Authorization: `Bearer ${cookieToken}`,
//       "Content-Type": "application/json",
//     };

//     if (!idOwner) {
//       const data = {
//         nameOnwer: "",
//         dealname: dealsName,
//         id_deals: dealsId,
//         dealContacts: num_associated_contacts,
//         amount: amount,
//         idOwner: idOwner,
//         closed_lost_reason: closed_lost_reason,
//         closed_won_reason: closed_won_reason,
//         closedate: closedate,
//         createdate: createdate,
//         dealstage: dealstage,
//         description: description,
//         hs_all_collaborator_owner_ids: hs_all_collaborator_owner_ids,
//         hs_deal_stage_probability: hs_deal_stage_probability,
//         hs_forecast_probability: hs_forecast_probability,
//         hs_is_closed_won: hs_is_closed_won,
//         hs_lastmodifieddate: hs_lastmodifieddate,
//         hs_next_step: hs_next_step,
//         hs_priority: hs_priority,
//         num_contacted_notes: num_contacted_notes,
//         id_team: idTeam,
//         score: resultScore?.score,
//         scoreFlag: resultScore?.flag,
//         scoreReason: resultScore?.shortReason.join(", "),
//         scoreDetails: resultScore?.detailedReason,
//         last_activity: notes_last_contacted,
//       };
//       return data;
//     }

//     const urlOwner = `https://api.hubapi.com/crm/v3/owners/${idOwner}`;

//     const response = await fetch(urlOwner, { headers });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const dataDeals = await response.json();

//     if (dealsName) {
//       const newDataDeals = {
//         nameOnwer: `${dataDeals.firstName} ${dataDeals.lastName}`,
//         idOwner: idOwner,
//         dealname: dealsName,
//         id_deals: dealsId,
//         dealContacts: num_associated_contacts,
//         amount: amount,
//         closed_lost_reason: closed_lost_reason,
//         closed_won_reason: closed_won_reason,
//         closedate: closedate,
//         createdate: createdate,
//         dealstage: dealstage,
//         description: description,
//         hs_all_collaborator_owner_ids: hs_all_collaborator_owner_ids,
//         hs_deal_stage_probability: hs_deal_stage_probability,
//         hs_forecast_probability: hs_forecast_probability,
//         hs_is_closed_won: hs_is_closed_won,
//         hs_lastmodifieddate: hs_lastmodifieddate,
//         hs_next_step: hs_next_step,
//         hs_priority: hs_priority,
//         num_contacted_notes: num_contacted_notes,
//         id_team: idTeam,
//         score: resultScore?.score,
//         scoreFlag: resultScore?.flag,
//         scoreReason: resultScore?.shortReason.join(", "),
//         scoreDetails: resultScore?.detailedReason,
//         last_activity: notes_last_contacted,
//       };
//       return newDataDeals;
//     }

//     return dataDeals;
//   } catch (error) {
//     console.log(error);
//     throw new Error();
//   }
// };
