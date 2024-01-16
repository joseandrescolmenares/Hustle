import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import { ZodObject, string, z } from "zod";
import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { NextResponse } from "next/server";

export const runtime = "edge"

export async function GET(request: Request) {
  const tools = [
    new DynamicStructuredTool({
      name: "createDeals",
      description:
        "This function orchestrates the process of creating a new business within CRM. The function ensures that all information is accurately recorded to enable effective management and tracking of the newly created business.",
      schema: z.object({
        amount: z
          .number()
          .describe(
            "represents the monetary amount associated with the deal being created."
          )
          .optional()
          .default(0),
      }),
      func: async ({ amount }) => `este es tu amoun ${amount} lo puedes ver en huspot`,
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
    input: "crea un negocio",
    chat_history: [],
  });

  console.log(result);

  return NextResponse.json({ sucess: result });
}
