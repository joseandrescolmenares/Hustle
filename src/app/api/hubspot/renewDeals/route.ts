import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
import axios from "axios";
import { insertIdDeals } from "@/service/hubspot/deals/insertDeals";
import { insertDealowner } from "@/service/hubspot/owners/insertDealOwner";
import { score } from "@/app/ai/score/score";


let isExecuting = false; 
let lock = false;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllDeals(token: any, idTeam: any): Promise<any[]> {
  try {
    if (isExecuting) {
      console.log("Otra instancia en curso, abortando...");
      return [];
    }

    isExecuting = true;

    if (lock) {
      console.log("Esperando a que se libere el bloqueo...");
      while (lock) {
        await sleep(1000);
      }
    }

    lock = true;

    let allData: any[] = [];
    let url =
      "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability&associations=notes&limit=15";

    let requestCount = 0;
    const maxRequestsPerInterval = 100;
    const intervalDuration = 10 * 1000;

    while (url) {
      const resultDeals = await insertIdDeals(url, token);
      const results = resultDeals?.results;

      for (const deal of results) {
        const resultScore: any = score({
          numberOfContacts: deal.properties.num_associated_contacts,
          numberOfSalesActivities: deal.properties.num_contacted_notes,
        });
        console.log(deal,"deal")
        const ownerInfo = await insertDealowner(
          deal.properties.hubspot_owner_id || "",
          deal.properties.dealname || "",
          deal.properties.hs_object_id || "",
          deal.properties.num_associated_contacts || "",
          deal.properties.amount || "",
          deal.properties.closed_lost_reason || "",
          deal.properties.closed_won_reason || "",
          deal.properties.closedate || "",
          deal.properties.createdate || "",
          deal.properties.dealstage || "",
          deal.properties.description || "",
          deal.properties.hs_all_collaborator_owner_ids || "",
          deal.properties.hs_deal_stage_probability || "",
          deal.properties.hs_forecast_probability || "",
          deal.properties.hs_is_closed_won || "",
          deal.properties.hs_lastmodifieddate,
          deal.properties.hs_next_step || "",
          deal.properties.hs_priority || "",
          deal.properties.num_contacted_notes || 0,
          token,
          idTeam,
          resultScore
        );
        allData.push(ownerInfo);
      }

      url = resultDeals?.paging?.next?.link || "";

      requestCount++;
      if (requestCount >= maxRequestsPerInterval) {
        await sleep(intervalDuration);
        requestCount = 0;
      }

      if (!url) {
        break;
      }
    }

    return allData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Hubo un error al obtener las negociaciones");
  } finally {
    isExecuting = false;
    lock = false;
  }
}

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { searchParams } = new URL(request.url);
  const idTeam = searchParams.get("team");
  const idIntegrations = searchParams.get("idItegrations");
  const urlSlack: any = searchParams.get("urlSlack");
  const token = searchParams.get("token");
  console.log(idTeam,"yeam")

  try {
    const { error } = await supabase
      .from("deals")
      .delete()
      .eq("id_team", idTeam);
    console.log(error, "errorSUPABASE");

    const result = await fetchAllDeals(token, idTeam);

    if(!error){
    if (result) {
      const { data: insertData, error: insertError } = await supabase
        .from("deals")
        .insert(result)
        .eq("id_team", idTeam)
        .select();

        console.log(insertData,"DATA", insertError,"error")

      if (insertData) {
        const { data: updateData, error: updateError } = await supabase
          .from("integrations")
          .update({
            dealsAlll: true,
          })
          .eq("id_integrations", idIntegrations)
          .select();
          
          
      }

      const dataMessage = {
        text: "¡Gracias por conectar Hustle a Slack! Estaré enviándote alertas por aquí. ¡Gracias!",
      };
      if (urlSlack) {
        const resultSlack  = await axios.post(urlSlack, dataMessage, {
          headers: {
            "Content-type": "application/json",
          },
        });
        console.log(resultSlack);
      }

    }
  }


    return NextResponse.json({
      dealsData: "tes",
    });
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
