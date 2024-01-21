import {
    DynamicTool,
    DynamicStructuredTool,
  } from "@langchain/community/tools/dynamic";
  import { supabase } from "@/lib/ClientSupabase";
  import { renewTokenAgent } from "./renewTokenAgent";
  import axios from "axios";

  import { ZodObject, string, z } from "zod";
   
   
 export  const createDealBusinessAssociation =  new DynamicStructuredTool({
      name: "createDealBusinessAssociation",
      description:
        "this function creates associations between deal and business.",
      schema: z.object({
        idDeal: z
          .number()
          .describe(
            "represents the monetary amount associated with the deal being created."
          ),
        idCompany: z.number().describe(""),
      }),
      func: async ({ idDeal, idCompany }) => {

    const token = await renewTokenAgent()

        const url = `https://api.hubapi.com/crm-associations/v1/associations`;

        const requestBody = {
          properties: {
            idDeal,
            idCompany,
          },
        };

        const response = await axios.put(
          url,
          {
            fromObjectId: `${idDeal}`,
            toObjectId: `${idCompany}`,
            category: "HUBSPOT_DEFINED",
            definitionId: 5,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return "";
      },
    })