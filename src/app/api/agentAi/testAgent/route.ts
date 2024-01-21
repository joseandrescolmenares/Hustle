// import { supabase } from "@/lib/ClientSupabase";
// import { NextResponse } from "next/server";
// import { renewToken } from "@/service/renewToken";
// import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";

// import axios from "axios";

// export async function GET(request: Request) {
// //  const tes =  await getAllCompanies()

//   const { data, error } = await supabase
//     .from("teams")
//     .select(
//       `id_integrations (
//       refresh_token
//       )`
//     )
//     .eq("hubspotAccount", 44543727);
//   if (data == null) return;

//   const { refresh_token }: any = data[0]?.id_integrations;
//   const token = await renewToken(refresh_token);
//   console.log(token, "data");

//   const url = `https://api.hubapi.com/crm/v4/objects/deal/16290810165/associations/default/company/18209854732`; // Replace "dealId" with the actual ID of the deal you want to update  //   properties: {

//   // const requestBody = {
//   //     amount: 0,
//   //     dealname: "jose test",
//   //     // dealstage: "",
//   //     closedate: "",
//   //   },
//   // };

//   try {
//     const response = await axios.put(
//       url,
//       // requestBody,

//       {
//         headers: {
//           Authorization: `Bearer `,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = response.data;
//     console.log(data);
//   return NextResponse.json({ ok: "test" });
//   } catch (error) {
//     console.error("Error updating deal:", error);
//     return NextResponse.json({ ok: false });
//   }
// }
export async function GET(request: Request) {
  return Response.json({jose:"ok"})
}