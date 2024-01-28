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
import { dealContactAssociation } from "../funtionsTools/dealContactAssociation";
import { createActivityNotes } from "../funtionsTools/createActivityNotes";

export const agentAi = async (message: string, phoneNumber: string) => {
  const validateDataAccount = await renewTokenAgent(phoneNumber);

  const getContactInfoByName = new DynamicStructuredTool({
    name: "getContactInfoByName",
    description:
      "This function allows you to search for contact by name and provides detailed information about the contact, including their e-mail address, unique identifier (id) and name. This information can be used in other functions, for example, to establish associations between other entities.",
    schema: z.object({
      contactName: string().describe("contact name to search for the id"),
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
      "This function allows you to search for companies by name and provides detailed information about the company, including its unique identifier (id) and name. This information can be used in other functions, for example, to establish partnerships between other entities.",
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

  const addNoteToDeal = new DynamicStructuredTool({
    name: "addNoteToDeal",
    description:
      "This function is responsible for registering or creating a new note in HubSpot and associating it directly to a specific deal.",
    schema: z.object({
      onwerId: z
        .string()
        .describe("Identifier of the owner associated with the note.")
        .optional()
        .default(""),
      messageNotesBody: z
        .string()
        .describe(" Body of the note or message. ")
        .default("esto es una nota"),
      dealId: z
        .string()
        .describe("Identifier of the deal to which the note is associated."),
    }),
    func: async ({ messageNotesBody, onwerId, dealId }) => {
      const token = validateDataAccount?.token;
      const props = { token, messageNotesBody, onwerId, dealId };
      return await createActivityNotes(props);
    },
  });

  // funtions deals :

  const associateContactWithDeal = new DynamicStructuredTool({
    name: "associateContactWithDeal",
    description: "this function creates associations between contact and deals",
    schema: z.object({
      contactId: z.string().describe("represents the contact identifier"),
      dealId: z
        .string()
        .describe("represents the deal id to perform the association"),
    }),
    func: async ({ contactId, dealId }) => {
      const token = validateDataAccount?.token;
      const idAccoun = validateDataAccount?.idAccount;
      const props = { token, idAccoun, contactId, dealId };
      return await dealContactAssociation(props);
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
      "This function is used to retrieve the stages available in the CRM. The function provides both the values and their corresponding ids, allowing the accurate capture of the id of the selected value, ensuring that the id is accurately passed to the dealstage when required.",
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
        .describe("represents the monetary amount or monetary value")
        .optional()
        .default(0),
      dealname: z
        .string()
        .describe("represents the name of the deal.")
        .optional()
        .default(""),
      dealstage: z
        .string()
        .nullable()
        .describe(
          "This property describes the stage in which a deal or commercial negotiation is currently positioned within a sales process. Please refrain from adding any id unless it is explicitly required."
        )
        .optional()
        .default(null),

      closedate: z
        .string()
        .describe(
          "this property defines the date on which the operation will be closed, for this property it is important to follow this format, for example: '2019-12-07T16:50:06.678Z'."
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
    getDealStage,
    getContactInfoByName,
    associateContactWithDeal,
    addNoteToDeal
  ];

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
  });
  const promptTemplate = await pull<ChatPromptTemplate>(
    "hustle/openai-tools-agent"
  );

  const getCurrentDate = () => {
    return new Date().toISOString();
  };
  const prompt = await promptTemplate.partial({
    currentDateAndTime: getCurrentDate,
  });

  const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    returnIntermediateSteps: true,
  });

  const result = await agentExecutor.invoke({
    input: message,
    chat_history: [],
  });

  return result;
};
