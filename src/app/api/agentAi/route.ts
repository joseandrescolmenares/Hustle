import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

import axios from "axios";

export async function GET(request: Request) {

  const jose = await renewTokenAgent("+541126336301")

 return NextResponse.json({jose:jose})
}
// export async function GET(request: Request) {
//   return Response.json({jose:"ok"})
// }



// const token = renewTokenAgent();
// const url = "https://api.hubapi.com/crm/v3/objects/companies/search";

// const data = {
//   filterGroups: [
//     {
//       filters: [
//         {
//           propertyName: "name",
//           operator: "EQ",
//           value: `jo*`,
//         },
//       ],
//     },
//   ],
// };

// const headers = {
//   Authorization: `Bearer ${token}`,
//   "Content-Type": "application/json",
// };

// const res = await axios.post(url, data, { headers });

// const dataResult = res.data;
// const idCompany = dataResult.results[0].id
// const nameCompany = dataResult.results[0].properties.name
// console.log(nameCompany,idCompany ,"data resulll")

// return `el id de empresa es : ${idCompany} y el nombre : ${nameCompany}`;