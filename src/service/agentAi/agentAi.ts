import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";
import { pull } from "langchain/hub";
import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { renewTokenAgent } from "../funtionsTools/renewTokenAgent";
import { AnyZodTuple, ZodObject, string, z } from "zod";
import { getDataCompany } from "../funtionsTools/getDataCompany";
import { createNewDeals } from "../funtionsTools/createDeals";
import { dealBusinessAssociation } from "../funtionsTools/createDealBusinessAssociation";
import { getSearchContacts } from "../funtionsTools/getSearchContact";
import { getStage } from "../funtionsTools/getStage";

export const agentAi = async (message: string, phoneNumber: string) => {
  const validateDataAccount = await renewTokenAgent(phoneNumber);

  const getContactInfoByName = new DynamicStructuredTool({
    name: "getCotactInfoByName",
    description:
      "This function allows you to search for contacts by name and provides detailed information about the contact, including their e-mail address, unique identifier (ID) and name. This information can be used in other functions, for example, to establish associations between other entities.",
    schema: z.object({
      contactName: string().describe(""),
    }),
    func: async ({ contactName }) => {
      const token = validateDataAccount?.token;
      const dataProp = { token, contactName };
      return await getSearchContacts(dataProp);
    },
  });

  const getCompanyInfoByName = new DynamicStructuredTool({
    name: "getCompanyInfoByName",
    description:
      "This function allows you to search for companies by name and provides detailed information about the company, including its unique identifier (ID) and name. This information can be used in other functions, for example, to establish partnerships between other entities.",
    schema: z.object({
      nameCompany: z
        .string()
        .describe("company name to search for the id")
        .default(""),
    }),
    func: async ({ nameCompany }): Promise<string> => {
      const token = validateDataAccount?.token;
      const dataConpany = { token, nameCompany };
      return await getDataCompany(dataConpany);
    },
  });

  const associateDealWithBusiness = new DynamicStructuredTool({
    name: "associateDealWithBusiness",
    description:
      "this function creates associations between deal and business.",
    schema: z.object({
      idDeals: z
        .string()
        .describe("represents the company's id to perform the association.")
        .default(""),
      idCompany: z
        .string()
        .describe("represents the company identifier ")
        .default(""),
    }),
    func: async ({ idDeals, idCompany }) => {
      const token = validateDataAccount?.token;
      const idAccoun = validateDataAccount?.idAccount;
      const props = { idCompany, idDeals, token, idAccoun };
      return await dealBusinessAssociation(props);
    },
  });
  const getDealStage = new DynamicTool({
    name: "getDealStage",
    description:
      "This function is used to call the stages or phases that are in the CRM.  Prior knowledge of the available stages is required to make the appropriate selections. In addition, this function provides both the values and their corresponding ids, allowing you to capture the ID of the selected value and create a successful operation.",
    func: async () => {
      return await getStage(validateDataAccount?.token);
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
          "This property describes the phase in which an agreement or commercial negotiation is in a sales process. To set this parameter, consult the 'getDealStage' function to understand the available stages. Make sure to select a stage based on user input, emphasizing the importance of capturing both the stage value and its corresponding id for accurate assignment"
        )
        .optional()
        .default(""),
      closedate: z
        .string()
        .describe(
          "this property defines the date on which the operation was closed, for this property it is important to follow this format, for example: '2019-12-07T16:50:06.678Z'"
        )
        .optional(),
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
    associateDealWithBusiness,
    getDealStage
    // getContactInfoByName,
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
