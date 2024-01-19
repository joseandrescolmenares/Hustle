import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import { renewToken } from "@/service/renewToken";
import { supabase } from "@/lib/ClientSupabase";
import { ZodObject, string, z } from "zod";
import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { NextResponse } from "next/server";

// export const runtime = "edge";

export async function GET(request: Request) {
  // const requestBody = await request.json();

  const { data, error } = await supabase
    .from("teams")
    .select(
      `id_integrations (
      refresh_token
      )`
    )
    .eq("hubspotAccount", 44497831);
  if (data == null) return;

  const { refresh_token }: any = data[0]?.id_integrations;

  if(!refresh_token) return

  const token = await renewToken(refresh_token);

  console.log(token, "data");

  const tools = [
    new DynamicStructuredTool({
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
        closedate: z
          .string()
          .describe("The date the deal was closed")
          .optional(),
      }),
      func: async ({
        amount,
        dealname,
        dealstage,
        closedate,
      }): Promise<any> => {
        const url = "https://api.hubapi.com/crm/v3/objects/deals";

        const requestBody = {
          properties: {
            amount,
            dealstage,
            dealname,
            closedate,
          },
        };
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          const data = await response.json();
          console.log(data);
          return `se ha creado con exito, puedes ver mas detalle https://app.hubspot.com/contacts/44497831/record/0-3/${data.id}`;
        } catch (error: any) {
          if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
            return "token expired";
          }
          return "error, por favor vuelva a intentarlo";
        }
      },
    }),

    new DynamicStructuredTool({
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
    }),

    new DynamicStructuredTool({
      name: "createDealBusinessAssociation",
      description:
        "this function creates associations between deal and business.",
      schema: z.object({
        amount: z
          .number()
          .describe(
            "represents the monetary amount associated with the deal being created."
          )
          .optional(),
      }),
      func: async ({ amount }) => {
        const url = `https://api.hubapi.com/crm/v4/objects/deal/16213921559/associations/default/company/18209854732`;

        const requestBody = {
          properties: {
            amount,
            // dealstage,
            // dealname,
            // closedate,
          },
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        return "";
      },
    }),
  ];

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
    input: "crea un negocio que se llame josecito y que de monto de 10000$",
    chat_history: [],
  });

  console.log(result);

  return NextResponse.json({ sucess: result });
}
