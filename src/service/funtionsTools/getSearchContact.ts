// import {
//     DynamicTool,
//     DynamicStructuredTool,
//   } from "@langchain/community/tools/dynamic";
//   import { supabase } from "@/lib/ClientSupabase";
//   import { renewTokenAgent } from "./renewTokenAgent";
//   import axios from "axios";
  
//   import { ZodObject, string, z } from "zod";
  
//   export const getSearchContacts = new DynamicStructuredTool({
//     name: "getCompany",
//     description: "Get company information by its id",
//     schema: z.object({
//       valueNameContact: z.string().describe("dsdsdsdd"),
//     }),
//     func: async ({ valueNameContact }) => {
//       // const token = renewTokenAgent();
//       const url = "https://api.hubapi.com/crm/v3/objects/contacts/search";
  
//       const data = {
//         filterGroups: [
//           {
//             filters: [
//               {
//                 propertyName: "firstname",
//                 operator: "EQ",
//                 value: `${valueNameContact}*`,
//               },
//             ],
//           },
//         ],
//       };
  
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };
  
//       const res = await axios.post(url, data, { headers });
  
//       const dataurl = res.data;
  
//       return "";
//     },
//   });
  