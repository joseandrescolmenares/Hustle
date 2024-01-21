import {
    DynamicTool,
    DynamicStructuredTool,
  } from "@langchain/community/tools/dynamic";
  import { supabase } from "@/lib/ClientSupabase";
  import { renewTokenAgent } from "./renewTokenAgent";
  import axios from "axios";
  
  import { ZodObject, string, z } from "zod";
   
   
  export  const updateDealData = new DynamicStructuredTool({
      name: "updateDealData",
      description: "This function is responsible for updating the crm data.",
      schema: z.object({
        amount: z
          .number()
          .describe(
            "represents the monetary amount associated with the deal being created."
          )
          .optional(),
      }),
      func: async ({ amount }) => `este es se actulizo `,
    })