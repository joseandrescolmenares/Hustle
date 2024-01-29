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
import {  dealCompanyAssociation } from "../funtionsTools/createDealCompanyAssociation";
import { getSearchContacts } from "../funtionsTools/getSearchContact";
import { getStage } from "../funtionsTools/getStage";
import { dealContactAssociation } from "../funtionsTools/dealContactAssociation";
import { createActivityNotes } from "../funtionsTools/createActivityNotes";

export const agentAi = async (message: string, phoneNumber: string) => {
  
  const validateDataAccount = await renewTokenAgent(phoneNumber);

  const getContactInfoByName = new DynamicStructuredTool({
    name: "getContactInfoByName",
    description:
      "This function enables you to search for a contact by name, providing comprehensive information, including their email address, unique identifier (id), and name. The details retrieved can be utilized in various functions, such as establishing associations with other entities",
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
      "This function allows you to search for companies by name, offering detailed information, including the unique identifier (id) and name of the company. The obtained data can be used in other functions, such as forming partnerships between different entities.",
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

  const associateNoteWithDeal = new DynamicStructuredTool({
    name: "associateNoteWithDeal",
    description:
   "Registers or creates a new note and directly associates it with a specific deal. Providing the deal's id is essential for the association. The note may include a customizable message.",
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
        .describe("Identifier of the deal to which the note is to be associated. this property is mandatory to associate")
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
    description: "This function is used to associate deals with contacts, and it is crucial to provide the unique identifiers of both for the association to be successful. Obtaining the specific ids of both deals and contacts is of paramount importance for the proper functioning of this operation.",
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

  const associateDealWithCompany = new DynamicStructuredTool({
    name: "associateDealWithCompany",
    description:
      "The function establishes associations between a deal and a company. By specifying the unique identifiers of the deal and the company, this function allows to establish a seamless link between these entities within the CRM system. The company identifier and the transaction identifier are essential to make this association.",
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
      return await dealCompanyAssociation(props);
    },
  });

  const getStageForDeal = new DynamicTool({
    name: "getStageForDeal",
    description:"This function is designed to retrieve the stages available within the CRM. It provides both the stage values and their corresponding ids, allowing you to accurately capture the id associated with a selected stage. This ensures accurate and efficient use of the id obtained when assigning a stage to a new deal.",
    func: async () => {
      return await getStage(validateDataAccount?.token);
    },
  });

  const createDeals = new DynamicStructuredTool({
    name: "createDeals",
    description:
      "This function creates a new deal with specified properties. It ensures accurate recording of information for effective management and tracking. Optional parameters include monetary amount, deal name, deal stage, and closing date in a standardized format",
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
          "Current stage of a deal or commercial negotiation within the sales process. No identifier is required unless explicitly needed. Retrieve it using the 'getDealStage' function if necessary"
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
    associateDealWithCompany,
    getStageForDeal,
    getContactInfoByName,
    associateContactWithDeal,
    associateNoteWithDeal
  ];

  const llm = new ChatOpenAI({
    openAIApiKey:"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",
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
