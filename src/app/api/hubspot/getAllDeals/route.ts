import axios from "axios";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
import { NextResponse } from "next/server";

const RATE_LIMIT = 100;
const TIME_INTERVAL = 10 * 1000; // 10 segundos en milisegundos

// Promesa que se resolverá cuando la ejecución actual haya terminado
let executionPromise: Promise<any> | null = null;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllDeals(): Promise<any> {
  try {
    // Verificar si ya hay una ejecución en curso
    if (executionPromise) {
      console.log("Otra instancia en curso, esperando...");
      // Esperar a que la ejecución actual termine y devolver sus resultados
      return await executionPromise;
    }

    // Crear una nueva promesa para la ejecución actual
    executionPromise = new Promise(async (resolve, reject) => {
      let allData: any[] = [];
      let url =
        "https://api.hubapi.com/crm/v3/objects/deals?properties=hubspot_owner_id,dealname,dealstage,num_associated_contacts&limit=20";

      try {
        while (url) {
          const resultDeals = await getAllDeals(url);
          const results = resultDeals.results;

          for (const deal of results) {
            const ownerInfo = await getIOwner(
              deal.properties.hubspot_owner_id || "",
              deal.properties.dealname,
              deal.properties.hs_object_id,
              deal.properties.num_associated_contacts
            );

            allData.push(ownerInfo);
          }

          url = resultDeals?.paging?.next?.link || "";

          if (!url) {
            break;
          }

          await sleep(TIME_INTERVAL / RATE_LIMIT);
        }

        console.log(allData, "data");
        // Resolver la promesa con los datos recopilados
       resolve( Response.json(({ dealsData: allData })));
      } catch (error) {
        console.error("Error:", error);
        // Rechazar la promesa en caso de error
        reject(new Error("Hubo un error al obtener las negociaciones"));
      } finally {
        // Limpiar la promesa después de completar la ejecución
        executionPromise = null;
      }
    });

    // Devolver la promesa actual para que otras instancias puedan esperar sus resultados
    return await executionPromise;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Hubo un error al obtener las negociaciones");
  }
}

export async function POST(request: Request) {
  const params = await request.json();
  console.log(params, "info");
  console.log(params?.lastDealId);

  try {
    return await fetchAllDeals();
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
