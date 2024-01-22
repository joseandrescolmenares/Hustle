import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";

import axios from "axios";

// export async function GET(request: Request) {
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

  // try {
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

//     const url = "https://api.hubapi.com/crm/v3/objects/contacts/search";

//     const data = {
//       filterGroups: [
//         {
//           filters: [
//             {
//               propertyName: "firstname",
//               operator: "EQ",
//               value: `j*`,
//             },
//           ],
//         },
//       ],
//     };

//     const headers = {
//       Authorization: `Bearer COjctujSMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFPfdO07imw24qsCTCVoMc5f3zQq8Oj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhRu2A6_f_ZfgIC96IrMf9-6zM2ScEoDbmExUgBaAA`,
//       "Content-Type": "application/json",
//     };

//   const res =  await axios
//       .post(url, data, { headers })

//       const dataurl = res.data
    
//     return NextResponse.json({ ok:dataurl});
//   } catch (error) {
//     console.error("Error updating deal:", error);
//     return NextResponse.json({ ok: false });
//   }
// }
export async function GET(request: Request) {
  return Response.json({jose:"ok"})
}
