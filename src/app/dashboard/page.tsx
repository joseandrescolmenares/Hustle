import React from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
import { TableItem } from "./components/Contact";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";

const dashboard = async () => {
  const Cookies = cookies();
  const userId = Cookies.get("userId")?.value;
  let { data, error } = await supabase
    .from("integrations")
    .select("isHubspot")
    .eq("userId", userId);
  if (data == null) return;
  let dataHubspot = data[0]?.isHubspot;
  if (dataHubspot) {
 
    return (
      <div className=" w-full flex  justify-center items-center ml-7 flex-col">
        <TableItem />
      </div>
    );
  }

  // const all = await getAllDeals("https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability,&associations=notes")
  // console.log(all.results[0],"tes")
  return (
    <div className="w-full flex  justify-center items-center">
      <Dialog />
    </div>
  );
};
export default dashboard;
