import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  createOpenAIToolsAgent,
  AgentExecutor,
  createStructuredChatAgent,
} from "langchain/agents";
import { pull } from "langchain/hub";
import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { renewTokenAgent } from "../funtionsTools/renewTokenAgent";
import { AnyZodTuple, ZodObject, string, z } from "zod";
import { getDataCompany } from "../funtionsTools/getDataCompany";
import { createNewDeals } from "../funtionsTools/createDeals";
import { dealCompanyAssociation } from "../funtionsTools/createDealCompanyAssociation";
import { getSearchContacts } from "../funtionsTools/getSearchContact";
import { getStage } from "../funtionsTools/getStage";
import { dealContactAssociation } from "../funtionsTools/dealContactAssociation";
import { createActivityNotes } from "../funtionsTools/createActivityNotes";
import { getDataDeal } from "../funtionsTools/getDataDeal";
import { updateDeal } from "../funtionsTools/updateDeal";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { MongoClient, ObjectId } from "mongodb";
import { BufferMemory } from "langchain/memory";

import { ConversationChain } from "langchain/chains";
import { MongoDBChatMessageHistory } from "@langchain/community/stores/message/mongodb";

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
      "This function allows searching for companies by their name, providing detailed information, including the unique identifier (ID) and the company (compañía) name. The retrieved data can be used in other functions.",
    schema: z.object({
      nameCompany: z
        .string()
        .describe("company(empresa)  name to search for the id")
        .default(""),
    }),
    func: async ({ nameCompany }): Promise<string> => {
      const token = validateDataAccount?.token;
      const dataConpany = { token, nameCompany };
      return await getDataCompany(dataConpany);
    },
  });

  const addNoteWithDeal = new DynamicStructuredTool({
    name: "addNoteWithDeal",
    description:
      "Registers or creates a new note and directly associates it with a specific deal(Negocio). Providing the deal(Negocio)'s id is essential for the association. The note may include a customizable message.",
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
        .describe(
          "Identifier of the deal(Negocio) to which the note is to be associated. this property is mandatory to associate"
        ),
    }),
    func: async ({ messageNotesBody, onwerId, dealId }) => {
      const token = validateDataAccount?.token;
      const idAccount = validateDataAccount?.idAccount;
      const props = { token, messageNotesBody, onwerId, dealId, idAccount };
      return await createActivityNotes(props);
    },
  });

  // funtions deals :

  const associateContactWithDeal = new DynamicStructuredTool({
    name: "associateContactWithDeal",
    description:
      "This function is used to associate deals(Negocio) with contacts, and it is crucial to provide the unique identifiers of both for the association to be successful. Obtaining the specific ids of both deals(Negocio) and contacts is of paramount importance for the proper functioning of this operation.",
    schema: z.object({
      contactId: z.string().describe("represents the contact identifier"),
      dealId: z
        .string()
        .describe("represents the deal(Negocio) id to perform the association"),
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
      "The function establishes associations between a deal(Negocio) and a company(empresa). By specifying the unique identifiers of the deal(Negocio) and the company(empresa), this function allows to establish a seamless link between these entities within the CRM system. The company(empresa) identifier and the transaction identifier are essential to make this association.",
    schema: z.object({
      idDeals: z
        .string()
        .describe(
          "represents the company(empresa)'s id to perform the association."
        )
        .default(""),
      idCompany: z
        .string()
        .describe("represents the company(empresa) identifier ")
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
    description:
      "This function is designed to retrieve the stages available within the CRM. It provides both the stage values and their corresponding IDs, allowing you to accurately capture the id associated with a selected stage. This ensures accurate and efficient use of the id obtained when assigning a stage to a new deal(Negocio).",
    func: async () => {
      return await getStage(validateDataAccount?.token);
    },
  });

  const getDealInfoByName = new DynamicStructuredTool({
    name: "getDealInfoByName",
    description:
      "This function allows you to search for a deal(Negocio) by its name, providing comprehensive information that includes the unique identifier (id) and the name of the deal(Negocio). ",
    schema: z.object({
      dealName: z
        .string()
        .describe(
          "represents the name of the deal(Negocio) for which the associated identifier (id) is to be obtained."
        ),
    }),
    func: async ({ dealName }) => {
      const token = validateDataAccount?.token;
      const prop = { token, dealName };
      return await getDataDeal(prop);
    },
  });

  const updateDealInformation = new DynamicStructuredTool({
    name: "updateDealInformation",
    description:
      "This function is designed to update the details of a deal(negocio), allowing for modifications to various aspects such as dates, values,name,  and other relevant properties.",
    schema: z.object({
      amount: z
        .number()
        .describe("Represents the monetary amount or monetary value."),

      dealname: z
        .string()
        .describe("Represents the name of the deal(Negocio)."),

      dealstage: z
        .string()
        .describe(
          "Current stage of a deal(Negocio) or commercial negotiation within the sales process. "
        ),

      closedate: z
        .string()
        .describe(
          "This property defines the date on which the operation will be closed. Follow the format, for example: '2019-12-07T16:50:06.678Z'."
        ),

      dealId: z
        .string()
        .describe("Identifier of the deal(Negocio) to be updated."),
    }),
    func: async ({
      amount,
      dealname,
      dealstage,
      closedate,
      dealId,
    }): Promise<string> => {
      const token = validateDataAccount?.token;
      const idAccount = validateDataAccount?.idAccount;
      const props = {
        amount,
        dealname,
        dealstage,
        closedate,
        dealId,
        token,
        idAccount,
      };
      return await updateDeal(props);
    },
  });

  const createDeals = new DynamicStructuredTool({
    name: "createDeals",
    description:
      "This function creates a new deal (Negocio) with the specified properties, ensuring accurate recording of information for effective management and tracking. Optional parameters include monetary amount, deal name, deal stage, and standardized closing date format. Additionally, this function provides information, such as the id and name of the created deal (Negocio), which can be utilized in other functions.",
    schema: z.object({
      amount: z
        .number()
        .describe("represents the monetary amount or monetary value")
        .optional()
        .default(0),
      dealname: z
        .string()
        .describe("represents the name of the deal(Negocio).")
        .optional()
        .default(""),
      dealstage: z
        .string()
        .nullable()
        .describe(
          "Current stage of a deal(Negocio) or commercial negotiation within the sales process. No identifier is required unless explicitly needed. Retrieve it using the 'getDealStage' function if necessary"
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
    addNoteWithDeal,
    getDealInfoByName,
    updateDealInformation,
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

  // const client = new MongoClient(
  //   "mongodb+srv://joseandrescolmenares02:wiMLUGo61Id5upfc@cluster0.zpvhlte.mongodb.net/?retryWrites=true&w=majority" ||
  //     ""
  // );
  // await client.connect();
  // const collection = client.db("langchain").collection("memory");

  // generate a new sessionId string
  // const sessionId = "dea";

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  // const messageHistory = new ChatMessageHistory();

  // const  chatHistory = new MongoDBChatMessageHistory({
  //     collection,
  //     sessionId,
  //   })

  // const agentWithChatHistory = new RunnableWithMessageHistory({
  //   runnable: agentExecutor,
  //   // This is needed because in most real world scenarios, a session id is needed per user.
  //   // It isn't really used here because we are using a simple in memory ChatMessageHistory.

  //   getMessageHistory: (sessionId) => messageHistory,

  //   inputMessagesKey: "input",
  //   historyMessagesKey: "chat_history",
  // });

  // const chainWithHistory = new RunnableWithMessageHistory({
  //   runnable: agentExecutor,
  //   getMessageHistory: (sessionId) =>
  //     new UpstashRedisChatMessageHistory({
  //       sessionId,
  //       config: {
  //         url: "https://relative-tetra-37107.upstash.io",
  //         token:
  //           "AZDzACQgMmM1Mzc5ZTUtM2MxNy00YjE5LWEyZmUtM2U2YzEyM2Y1NTIwNzBjNWI5NjUzNGY4NGE2MjhiMWQ0NzE4MjRmZmY3MDQ=",
  //       },
  //     }),
  //   historyMessagesKey: "chat_history",
  //   inputMessagesKey: "input",
  // });

  const result = await agentExecutor.invoke({
    input: message,
  });

  return result;
};

// const result = await agentExecutor.invoke({
//   input: message,
//   memory,
// });
