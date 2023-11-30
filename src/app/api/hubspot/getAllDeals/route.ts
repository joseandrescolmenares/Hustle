// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import axios from "axios";
// import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";
// import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
// import { NextResponse } from "next/server";

// let isExecuting = false; // Variable de estado compartida

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function fetchAllDeals(): Promise<any> {
//   try {
//     // Verificar si otra instancia está en ejecución
//     if (isExecuting) {
//       console.log("Otra instancia en curso, abortando...");
//       return; // Abortar la ejecución actual
//     }

//     isExecuting = true; // Marcar que esta instancia está en ejecución

//     let allData: any[] = [];
//     let url =
//       "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability&associations=notes&limit=20";

//     let requestCount = 0;
//     const maxRequestsPerInterval = 100;
//     const intervalDuration = 10 * 1000; // 10 segundos en milisegundos

//     while (url) {
//       const resultDeals = await getAllDeals(url);
//       const results = resultDeals.results;

//       for (const deal of results) {
//         const ownerInfo = await getIOwner(
//           deal.properties.hubspot_owner_id || "",
//           deal.properties.dealname,
//           deal.properties.hs_object_id,
//           deal.properties.num_associated_contacts,
//           deal.properties.amount,
//           deal.properties.closed_lost_reason,
//           deal.properties.closed_won_reason,
//           deal.properties.closedate,
//           deal.properties.createdate,
//           deal.properties.dealstage,
//           deal.properties.description,
//           deal.properties.hs_all_collaborator_owner_ids,
//           deal.properties.hs_deal_stage_probability,
//           deal.properties.hs_forecast_probability,
//           deal.properties.hs_is_closed_won,
//           deal.properties.hs_lastmodifieddate,
//           deal.properties.hs_next_step,
//           deal.properties.hs_priority,
//           deal.properties.num_contacted_notes
//         );

//         allData.push(ownerInfo);
//       }

//       url = resultDeals?.paging?.next?.link || "";

//       requestCount++;
//       if (requestCount >= maxRequestsPerInterval) {
//         // Esperar 10 segundos después de cada 100 solicitudes
//         await sleep(intervalDuration);
//         requestCount = 0; // Reiniciar el contador de solicitudes
//       }

//       if (!url) {
//         break;
//       }
//     }

//     return allData;
//   } catch (error) {
//     console.error("Error:", error);
//     throw new Error("Hubo un error al obtener las negociaciones");
//   } finally {
//     isExecuting = false; // Liberar la instancia al finalizar
//   }
// }

// export async function GET(request: Request) {
//   // const params = await request.json();
//   const cookieStore = cookies();
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
//   const idTeam  = cookieStore.get("team")?.value;
//   const idIntegrations = cookieStore.get("idIntegrations")?.value

//   try {
//     const result = await fetchAllDeals();
//     if(result){
//       const { data:dataAllDeals, error } = await supabase
//       .from("deals")
//       .insert(result).eq("id_team", idTeam )
//       .select();

//       if(dataAllDeals){
//         const { data, error } = await supabase
//         .from("integrations")
//         .update({
//           dealsAlll: true
//         })
//         .eq("id_integrations",idIntegrations )
//         .select();
//       }

//     }

//     return NextResponse.json({
//       dealsData: result,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     throw new Error();
//   }
// }

// import axios from "axios";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { getIOwner } from "@/service/hubspot/owners/getIdOwner";

// const MAX_REQUESTS_PER_INTERVAL = 100;
// const INTERVAL_DURATION = 10 * 1000; // 10 segundos en milisegundos

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function fetchDealsPage(url: string, supabase: any) {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer YOUR_HUBSPOT_API_KEY`, // Reemplaza con tu clave API de HubSpot
//       },
//     });
//     const resultDeals = response.data;
//     const results = resultDeals.results;
//     const allData: any = [];

//     for (const deal of results) {
//       await getIOwner(
//         deal.properties.hubspot_owner_id || "",
//         deal.properties.dealname,
//         deal.properties.hs_object_id,
//         deal.properties.num_associated_contacts,
//         deal.properties.amount,
//         deal.properties.closed_lost_reason,
//         deal.properties.closed_won_reason,
//         deal.properties.closedate,
//         deal.properties.createdate,
//         deal.properties.dealstage,
//         deal.properties.description,
//         deal.properties.hs_all_collaborator_owner_ids,
//         deal.properties.hs_deal_stage_probability,
//         deal.properties.hs_forecast_probability,
//         deal.properties.hs_is_closed_won,
//         deal.properties.hs_lastmodifieddate,
//         deal.properties.hs_next_step,
//         deal.properties.hs_priority,
//         deal.properties.num_contacted_notes
//       );

//       // if (error) {
//       //   console.error("Error al insertar en Supabase:", error);
//       // }
//     }

//     return { allData, nextUrl: resultDeals?.paging?.next?.link || null };
//   } catch (error: any) {
//     throw new Error("Error al obtener datos de acuerdos: " + error.message);
//   }
// }

// async function fetchAllDeals(supabase: any) {
//   const initialUrl =
//     "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability&associations=notes&limit=20";

//   let url = initialUrl;
//   let requestCount = 0;
//   const allData = [];

//   while (url) {
//     if (requestCount >= MAX_REQUESTS_PER_INTERVAL) {
//       await sleep(INTERVAL_DURATION);
//       requestCount = 0;
//     }

//     const { allData: pageData, nextUrl } = await fetchDealsPage(url, supabase);
//     allData.push(...pageData);
//     url = nextUrl;
//     requestCount++;
//   }

//   return allData;
// }

// export async function GET(request: Request) {
//   const cookieStore = cookies();
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
//   const idTeam = cookieStore.get("team")?.value;
//   const idIntegrations = cookieStore.get("idIntegrations")?.value;

//   try {
//     const result = await fetchAllDeals(supabase);

//     if (result.length > 0) {
//       const { data: dataAllDeals, error } = await supabase
//         .from("deals")
//         .upsert(result); // Ajusta la inserción según tu estructura de datos y necesidades

//       if (error) {
//         console.error("Error al insertar en Supabase:", error);
//       }

//       const { data: dataIntegrations, error: integrationError } = await supabase
//         .from("integrations")
//         .update({
//           dealsAlll: true,
//         })
//         .eq("id_integrations", idIntegrations)
//         .select();

//       if (integrationError) {
//         console.error(
//           "Error al actualizar integrations en Supabase:",
//           integrationError
//         );
//       }
//     }

//     return NextResponse.json({
//       dealsData: result,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     throw new Error();
//   }
// }

// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import axios from "axios";
// import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";
// import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
// import { NextResponse } from "next/server";

// const RATE_LIMIT_INTERVAL = 10000; // Intervalo de espera de 10 segundos entre solicitudes
// const MAX_REQUESTS_PER_INTERVAL = 100;

// let isExecuting = false; // Variable de estado compartida
// let requestCount = 0;
// let lastRequestTime = 0;

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function fetchAllDeals(): Promise<any> {
//   try {
//     // Verificar si otra instancia está en ejecución
//     if (isExecuting) {
//       console.log("Otra instancia en curso, abortando...");
//       return; // Abortar la ejecución actual
//     }

//     isExecuting = true; // Marcar que esta instancia está en ejecución

//     let allData: any[] = [];
//     let url =
//       "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability&associations=notes&limit=20";

//     while (url) {
//       // Verificar límite de tasa
//       if (requestCount >= MAX_REQUESTS_PER_INTERVAL) {
//         const currentTime = Date.now();
//         const timeSinceLastRequest = currentTime - lastRequestTime;

//         if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {

//           await sleep(RATE_LIMIT_INTERVAL - timeSinceLastRequest);
//         }

//         // Reiniciar contador de solicitudes
//         requestCount = 0;
//       }

//       const resultDeals = await getAllDeals(url);
//       const results = resultDeals.results;

//       for (const deal of results) {
//         const ownerInfo = await getIOwner(
//           deal.properties.hubspot_owner_id || "",
//           deal.properties.dealname || '',
//           deal.properties.hs_object_id || '',
//           deal.properties.num_associated_contacts,
//           deal.properties.amount || '',
//           deal.properties.closed_lost_reason || '',
//           deal.properties.closed_won_reason || '',
//           deal.properties.closedate || '',
//           deal.properties.createdate || '',
//           deal.properties.dealstage || '',
//           deal.properties.description || '',
//           deal.properties.hs_all_collaborator_owner_ids || '',
//           deal.properties.hs_deal_stage_probability || '',
//           deal.properties.hs_forecast_probability || '',
//           deal.properties.hs_is_closed_won || '',
//           deal.properties.hs_lastmodifieddate || '',
//           deal.properties.hs_next_step || '',
//           deal.properties.hs_priority || '',
//           deal.properties.num_contacted_notes
//         );

//         allData.push(ownerInfo);
//       }

//       url = resultDeals?.paging?.next?.link || "";

//       // Actualizar contador y tiempo de la última solicitud
//       requestCount++;
//       lastRequestTime = Date.now();

//       if (!url) {
//         break;
//       }
//     }

//     return allData;
//   } catch (error) {
//     console.error("Error:", error);
//     throw new Error("Hubo un error al obtener las negociaciones");
//   } finally {
//     isExecuting = false; // Liberar la instancia al finalizar
//   }
// }

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";

let isExecuting = false; // Variable de estado compartida
let lock = false;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


async function fetchAllDeals(): Promise<any[]> {
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
      "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,amount,num_associated_contacts,closedate,hs_priority,notes_last_contacted,hs_all_collaborator_owner_ids,hs_is_closed_won,description,hubspot_owner_assigneddate,notes_last_updated,closed_won_reason,closed_lost_reason,num_contacted_notes,hs_next_step,hs_forecast_probability,hs_deal_stage_probability&associations=notes&limit=20";

    let requestCount = 0;
    const maxRequestsPerInterval = 100;
    const intervalDuration = 10 * 1000;

    while (url) {
      const resultDeals = await getAllDeals(url);
      const results = resultDeals.results;

      for (const deal of results) {
        const ownerInfo = await getIOwner(
          deal.properties.hubspot_owner_id || "",
          deal.properties.dealname || "",
          deal.properties.hs_object_id || "",
          deal.properties.num_associated_contacts,
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
          deal.properties.hs_lastmodifieddate || "",
          deal.properties.hs_next_step || "",
          deal.properties.hs_priority || "",
          deal.properties.num_contacted_notes
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
  const idTeam = cookieStore.get("team")?.value;
  const idIntegrations = cookieStore.get("idIntegrations")?.value;

  try {
    const result = await fetchAllDeals();

    if (result) {
      const { data: dataAllDeals, error } = await supabase
        .from("deals")
        .insert(result)
        .eq("id_team", idTeam)
        .select();

      if (dataAllDeals) {
        const { data, error } = await supabase
          .from("integrations")
          .update({
            dealsAlll: true,
          })
          .eq("id_integrations", idIntegrations)
          .select();
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

// export async function GET(request: Request) {
//   const cookieStore = cookies();
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
//   const idTeam = cookieStore.get("team")?.value;
//   const idIntegrations = cookieStore.get("idIntegrations")?.value;

//   try {
//     const result = await fetchAllDeals();
//     console.log(result,"resulr")

//     if (result) {
//       const { data: dataAllDeals, error } = await supabase
//         .from("deals")
//         .insert(result)
//         .eq("id_team", idTeam)
//         .select();

//       if (dataAllDeals) {
//         const { data, error } = await supabase
//           .from("integrations")
//           .update({
//             dealsAlll: true,
//           })
//           .eq("id_integrations", idIntegrations)
//           .select();
//       }
//     }

//     return NextResponse.json({
//       dealsData: result,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     throw new Error();
//   }
// }
