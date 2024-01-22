import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import axios from "axios";
import { renewToken } from "@/service/renewToken";
import { supabase } from "@/lib/ClientSupabase";
import { tools } from "@/service/funtionsTools/tools";


import { NextResponse } from "next/server";
import { Value } from "@radix-ui/react-select";

// export const runtime = "edge";

export async function GET(request: Request) {
  // const requestBody = await request.json();

 
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
    input: "crea un negocio que se llame ROJOO con monto de 10000",
    chat_history: [],
  });


  return NextResponse.json({ sucess: result });
}
// export async function GET(request: Request) {
//     return Response.json({ok: "oj"})
// }
