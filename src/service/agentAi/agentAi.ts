import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import axios from "axios";
import { supabase } from "@/lib/ClientSupabase";
import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { renewTokenAgent } from "../funtionsTools/renewTokenAgent";
import { ZodObject, string, z } from "zod";

export const agentAi = async (message: string, phoneNumber: string) => {
  const validateDataAccount = await renewTokenAgent(phoneNumber);

  const getSearchCompany = new DynamicStructuredTool({
    name: "getCompany",
    description: "this function helps to search the companies by name",
    schema: z.object({
      valueNameCompany: z
        .string()
        .describe("company name to search for the id")
        .default("jose"),
    }),
    func: async ({ valueNameCompany }) => {
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
        Authorization: `Bearer ${validateDataAccount?.token}`,
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

  const createDealBusinessAssociation = new DynamicStructuredTool({
    name: "createDealBusinessAssociation",
    description:
      "this function creates associations between deal and business.",
    schema: z.object({
      idDeal: z
        .string()
        .describe("represents the agreement identifier.")
        .default("16290810165"),
      idCompany: z
        .string()
        .describe(
          "represents the company identifier that can be obtained from getCompany"
        )
        .default("18794584604"),
    }),
    func: async ({ idDeal, idCompany }) => {
      const url = `https://api.hubapi.com/crm-associations/v1/associations`;

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
            Authorization: `Bearer ${validateDataAccount?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      return "se ha creado con exitos";
    },
  });

  const createDeals = new DynamicStructuredTool({
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
            Authorization: `Bearer ${validateDataAccount?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        console.log(validateDataAccount?.idAccount, "id");
        const data = await response.json();
        console.log(data);
        return `se ha creado con exito, Puedes ver los detalles en el siguiente enlace : https://app.hubspot.com/contacts/${validateDataAccount?.idAccount}/record/0-3/${data.id}`;
      } catch (error: any) {
        if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
          return "token expired";
        }
        return "error, por favor vuelva a intentarlo";
      }
    },
  });

  const tools = [createDeals, getSearchCompany, createDealBusinessAssociation];

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
  });
  const prompt = await pull<ChatPromptTemplate>("jose/openai-tools-agent");

  const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const result = await agentExecutor.invoke({
    input: message,
    chat_history: [],
  });

  return result;
};
