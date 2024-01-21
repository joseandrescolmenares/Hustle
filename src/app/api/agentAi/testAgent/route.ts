import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";

import axios from "axios";

export async function GET(request: Request) {
  //  const tes =  await getIdDeals()
  // const tes = await getAllCompanies();

  // const { data, error } = await supabase
  //   .from("teams")
  //   .select(
  //     `id_integrations (
  //     refresh_token
  //     )`
  //   )
  //   .eq("hubspotAccount", 44543727);
  // if (data == null) return;

  // const { refresh_token }: any = data[0]?.id_integrations;
  // const token = await renewToken(refresh_token);

  // const url = `https://api.hubapi.com/crm-associations/v1/associations`

  // // `https://api.hubapi.com/crm/v4/objects/Deal/16290810165/associations/default/company/18283140931`; // Replace "dealId" with the actual ID of the deal you want to update  //   properties: {

  // // const requestBody = {
  // //     amount: 0,
  // //     dealname: "jose test",
  // //     // dealstage: "",
  // //     closedate: "",
  // //   },
  // // };

  try {
    //   const response = await axios.put(
    //     url,
    //     {
    //       "fromObjectId": `${idDeal}`,
    //       "toObjectId": `${idCompany}`,
    //       "category": "HUBSPOT_DEFINED",
    //       "definitionId": 5
    //     },

    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   const data = response.data;
    //   console.log(data,"data");

    const url = "https://api.hubapi.com/crm/v3/objects/companies/search";

    const data = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "name",
              operator: "EQ",
              value: "mo*",
            },
          ],
        },
      ],
    };

    const headers = {
      Authorization: `Bearer COj7ptzSMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFH4umj98T7bZMRoYD0Kz8vs4jlULOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhQzJWOTRWJRMwLxT4nvvh76VB7Sq0oDbmExUgBaAA`,
      "Content-Type": "application/json",
    };

  const res =  await axios
      .post(url, data, { headers })

      const dataurl = res.data
    
    return NextResponse.json({ ok:dataurl});
  } catch (error) {
    console.error("Error updating deal:", error);
    return NextResponse.json({ ok: false });
  }
}
// export async function GET(request: Request) {
//   return Response.json({jose:"ok"})
// }
