import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { supabase } from "@/lib/ClientSupabase";
import { renewTokenAgent } from "./renewTokenAgent";

import { ZodObject, string, z } from "zod";

export const createDeals = new DynamicStructuredTool({
  name: "createDeals",
  description:
    "This function creates a deal with the given properties. The function ensures that all information is accurately recorded to enable effective management and tracking of the newly created deal.",
  schema: z.object({
    amount: z
      .number()
      .describe(
        "represents the monetary amount associated with the deal being created."
      )
      .optional()
      .default(0),
    dealname: z
      .string()
      .describe("represents the name of the deal.")
      .optional()
      .default(""),
    dealstage: z
      .string()
      .describe(
        "The stage of the deal. The business stages allow you to classify and monitor the progress of the businesses you are working on."
      )
      .optional()
      .default(""),
    closedate: z.string().describe("The date the deal was closed").optional(),
  }),
  func: async ({ amount, dealname, dealstage, closedate }): Promise<any> => {
    const dataAccount = await renewTokenAgent();
    console.log(dataAccount,"dataACCOUNT")

    const url = "https://api.hubapi.com/crm/v3/objects/deals";

    const requestBody = {
      properties: {
        amount,
        // dealstage,
        dealname,
        closedate,
      },
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dataAccount?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(dataAccount?.idAccount,"id")
      const data = await response.json();
      console.log(data);
      return `se ha creado con exito, puedes ver mas detalle https://app.hubspot.com/contacts/${dataAccount?.idAccount}/record/0-3/${data.id}`;
    } catch (error: any) {
      if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
        return "token expired";
      }
      return "error, por favor vuelva a intentarlo";
    }
  },
});
