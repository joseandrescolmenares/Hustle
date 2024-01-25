import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { renewTokenAgent } from "../funtionsTools/renewTokenAgent";
import { ZodObject, string, z } from "zod";
import { getDataCompany } from "../funtionsTools/getDataCompany";
import { createNewDeals } from "../funtionsTools/createDeals";
import { dealBusinessAssociation } from "../funtionsTools/createDealBusinessAssociation";

export const agentAi = async (message: string, phoneNumber: string) => {
  const validateDataAccount = await renewTokenAgent(phoneNumber);

  const getCompanyInfoByName = new DynamicStructuredTool({
    name: "getCompanyInfoByName",
    description:
      "This function allows you to search for companies by name and provides detailed information about the company, including its unique identifier (ID) and name. This information can be used in other functions, for example, to establish partnerships between other entities. ",
    schema: z.object({
      companyNameToSearch: z
        .string()
        .describe("company name to search for the id")
        .default(""),
    }),
    func: async ({ companyNameToSearch }): Promise<string> => {
      return await getDataCompany(
        validateDataAccount?.token,
        companyNameToSearch
      );
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
      const token = validateDataAccount?.token;
      const props = { idCompany, idDeal, token };
      return await dealBusinessAssociation(props);
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
    func: async ({
      amount,
      dealname,
      dealstage,
      closedate,
    }): Promise<string> => {
      const token = validateDataAccount?.token;
      const idAccount = validateDataAccount?.idAccount;
      const dataParams = {
        amount,
        dealname,
        dealstage,
        closedate,
        token,
        idAccount,
      };
      return await createNewDeals(dataParams);
    },
  });

  const tools = [
    createDeals,
    getCompanyInfoByName,
    createDealBusinessAssociation,
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
    input: message,
    chat_history: [],
  });

  return result;
};
