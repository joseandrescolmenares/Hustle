// import {
//   DynamicTool,
//   DynamicStructuredTool,
// } from "@langchain/community/tools/dynamic";
// import { supabase } from "@/lib/ClientSupabase";
// import { renewTokenAgent } from "./renewTokenAgent";
// import axios from "axios";

// import { ZodObject, string, z } from "zod";

// export const createDealBusinessAssociation = new DynamicStructuredTool({
//   name: "createDealBusinessAssociation",
//   description: "this function creates associations between deal and business.",
//   schema: z.object({
//     idDeal: z
//       .string()
//       .describe("represents the agreement identifier.")
//       .default("16290810165"),
//     idCompany: z
//       .string()
//       .describe(
//         "represents the company identifier that can be obtained from getCompany"
//       )
//       .default("18794584604"),
//   }),
//   func: async ({ idDeal, idCompany }) => {
//     const token = await renewTokenAgent();

//     const url = `https://api.hubapi.com/crm-associations/v1/associations`;

//     const response = await axios.put(
//       url,
//       {
//         fromObjectId: `${idDeal}`,
//         toObjectId: `${idCompany}`,
//         category: "HUBSPOT_DEFINED",
//         definitionId: 5,
//       },

//       {
//         headers: {
//           Authorization: `Bearer ${token?.token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(response.data);
//     return "se ha creado con exitos";
//   },
// });
