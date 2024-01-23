import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { supabase } from "@/lib/ClientSupabase";
import { renewTokenAgent } from "./renewTokenAgent";
import axios from "axios";

import { ZodObject, string, z } from "zod";

export const getSearchCompany = new DynamicStructuredTool({
  name: "getCompany",
  description: "this function helps to search the companies by name",
  schema: z.object({
    valueNameCompany: z
      .string()
      .describe("company name to search for the id")
      .default("jose"),
  }),
  func: async ({ valueNameCompany }) => {
    const token = await renewTokenAgent();
    console.log(token);
    const url = "https://api.hubapi.com/crm/v3/objects/companies/search";

    const data = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "name",
              operator: "EQ",
              value: `${valueNameCompany}*`,
            },
          ],
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${token?.token}`,
      "Content-Type": "application/json",
    };

    const res = await axios.post(url, data, { headers });

    const dataResult = res.data;
    const idCompany = dataResult.results[0].id;
    const nameCompany = dataResult.results[0].properties.name;
    console.log(nameCompany, idCompany, "data resulll");

    return `el id de empresa es : ${idCompany} y el nombre : ${nameCompany}`;
  },
});
