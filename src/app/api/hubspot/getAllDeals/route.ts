import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import axios from "axios";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
import { NextResponse } from "next/server";

let isExecuting = false; // Variable de estado compartida

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllDeals(): Promise<any> {
  try {
    // Verificar si otra instancia está en ejecución
    if (isExecuting) {
      console.log("Otra instancia en curso, abortando...");
      return; // Abortar la ejecución actual
    }

    isExecuting = true; // Marcar que esta instancia está en ejecución

    let allData: any[] = [];
    let url =
      "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability&associations=notes&limit=20";

    while (url) {
      const resultDeals = await getAllDeals(url);
      const results = resultDeals.results;
    

      for (const deal of results) {
        const ownerInfo = await getIOwner(
          deal.properties.hubspot_owner_id || "",
          deal.properties.dealname,
          deal.properties.hs_object_id,
          deal.properties.num_associated_contacts,
          deal.properties.amount,
          deal.properties.closed_lost_reason,
          deal.properties.closed_won_reason,
          deal.properties.closedate,
          deal.properties.createdate,
          deal.properties.dealstage,
          deal.properties.description,
          deal.properties.hs_all_collaborator_owner_ids,
          deal.properties.hs_deal_stage_probability,
          deal.properties.hs_forecast_probability,
          deal.properties.hs_is_closed_won,
          deal.properties.hs_lastmodifieddate,
          deal.properties.hs_next_step,
          deal.properties.hs_priority,
          deal.properties.num_contacted_notes
        );

        allData.push(ownerInfo);
      }

      url = resultDeals?.paging?.next?.link || "";

      if (!url) {
        break;
      }

      await sleep(1000); // Simulación de trabajo
    }
  console.log(allData,'all')
    return allData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Hubo un error al obtener las negociaciones");
  } finally {
    isExecuting = false; // Liberar la instancia al finalizar
  }
}

export async function GET(request: Request) {
  // const params = await request.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const userId = cookieStore.get("userId")?.value;

  try {
    const result = await fetchAllDeals();
    if(result){
      const { data:dataAllDeals, error } = await supabase
      .from("deals")
      .insert(result).eq("userId",userId)
      .select();
      console.log(dataAllDeals,"dataa", error,"error")

      if(dataAllDeals){
        const { data, error } = await supabase
        .from("integrations")
        .update({
          dealsAlll: true
        })
        .eq("userId", userId)
        .select();
        console.log(data,"tre",error, "error")
      }
     
      
   
    }
 
  
    return NextResponse.json({
      dealsData: result,
    });
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
