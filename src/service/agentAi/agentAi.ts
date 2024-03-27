import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
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
import { string, z, Schema } from "zod";
import { getDataCompany } from "../funtionsTools/company/getDataCompany";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { getSearchContacts } from "../funtionsTools/contact/getSearchContact";
import { getStage } from "../funtionsTools/deals/getStage";

import { createActivityNotes } from "../funtionsTools/deals/activityDeal/createActivityNotes";
import { getDataDeal } from "../funtionsTools/deals/getDataDeal";

import { createActivitytaskCompany } from "../funtionsTools/company/activityCompany/createTaskCompany";
import { createActivitytaskContact } from "../funtionsTools/contact/activityContact/createTaskContact";

import { descriptionHandleDeal } from "../funtionsTools/deals/handleDeal/descriptionHandleDeal";
import { descriptionHandleCall } from "../funtionsTools/handleCall/descriptionHandleCall";
import { descriptionHandleTask } from "../funtionsTools/handleTask/descriptionHandleTask";
import { descriptionHandleCompany } from "../funtionsTools/company/handleCompany/descriptionHandleCompany";
import { descriptionHandleAssociationObject } from "../funtionsTools/createAssociationsObject/descriptionHandleAssociationObject";
import { descriptionHandleContact } from "../funtionsTools/contact/handleContact/descriptionHandleContact";
import { describeHandleComunications } from "../funtionsTools/handleComunications/describeHandleComunications";
import { descriptionHandleMeeting } from "../funtionsTools/handleMeeting/descriptionHandleMeeting";
import { getOwners } from "../funtionsTools/owner/getOwners";
import { descriptionGetOwnerData } from "../funtionsTools/owner/describeHandleOwner";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import {
  RunnableConfig,
  RunnableSequence,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";

export const agentAi = async (
  message: string,
  phoneNumber: string,
  email: string
) => {
  const validateDataAccount: any = await renewTokenAgent(phoneNumber);

  const token = validateDataAccount?.token;
  const idAccount = validateDataAccount?.idAccount;
  const propertiesOwnerid = await getOwners(token, email);
  const propsCredential = { token, idAccount, propertiesOwnerid };

  if (!idAccount || !token) {
    return;
  }

  const createTaskAndAssociateWithContact = new DynamicStructuredTool({
    name: "createTaskAndAssociateWithContact",
    description: `Creates a new task and directly associates it with a specific contact(Contacto). For the association, it is essential to provide the contact identifier (id), which must be a numerical value.
    `,
    schema: z.object({
      contactId: z
        .number()
        .describe(
          "The identifier (id) specifies the contact (Contacto) to which the task should be associated. This property is essential and must be provided for the successful association."
        ),
      type: z
        .string()
        .describe(
          "The type of task. Values include EMAIL, CALL, or TODO. Choose the one that best fits based on user input."
        ),
      time: z
        .string()
        .describe(
          "Required. This field marks the task's due date. You can use a Unix timestamp in milliseconds or UTC format."
        ),
      title: z.string().describe("The title of the task."),
      priority: z
        .string()
        .describe(
          "The priority of the task. Values include LOW, MEDIUM, or HIGH. Choose the one that best fits based on user input."
        ),
      status: z
        .string()
        .describe(
          "The status of the task, either COMPLETED or NOT_STARTED. Choose one based on user input."
        ),
      messageBody: z.string().describe("Body of the note or message."),
      ownerId: z.string().describe("ID of the task owner.").optional(),
    }),
    func: async ({
      contactId,
      messageBody,
      time,
      title,
      status,
      type,
      priority,
      ownerId,
    }) => {
      const props = {
        token,
        contactId,
        idAccount,
        messageBody,
        time,
        title,
        status,
        type,
        priority,
        ownerId,
        propertiesOwnerid,
      };

      return await createActivitytaskContact(props);
    },
  });

  const handleNewAndUpdatedContact = await descriptionHandleContact(
    propsCredential
  );

  const createAssociation = descriptionHandleAssociationObject(propsCredential);

  const getContactInfoByName = new DynamicStructuredTool({
    name: "getContactInfoByName",
    description:
      "This function enables you to search for a contact by name, providing comprehensive information, including their email address, unique identifier (id), and name. The details retrieved can be utilized in various functions, such as establishing associations with other entities",
    schema: z.object({
      contactName: string()
        .describe("contact name to search for the id")
        .optional(),
      email: z
        .string()
        .email()
        .describe("Contact email for second option search")
        .optional(),
    }),
    func: async ({ contactName, email }) => {
      const dataProp = { token, contactName, email };
      return await getSearchContacts(dataProp);
    },
  });

  const createTaskAndAssociateWithCompany = new DynamicStructuredTool({
    name: "createTaskAndAssociateWithCompany",
    description: `Creates a new task and directly associates it with a specific company (Empresa). For the association, it is essential to provide the Company identifier (id), which must be a numerical value.
    `,
    schema: z.object({
      idCompany: z
        .number()
        .describe(
          "The identifier (id) specifies the company (Empresa) to which the task should be associated. This property is essential and must be provided for the successful association."
        ),
      type: z
        .string()
        .describe(
          "The type of task. Values include EMAIL, CALL, or TODO. Choose the one that best fits based on user input."
        ),
      time: z
        .string()
        .describe(
          "Required. This field marks the task's due date. You can use a Unix timestamp in milliseconds or UTC format."
        ),
      title: z.string().describe("The title of the task."),
      priority: z
        .string()
        .describe(
          "The priority of the task. Values include LOW, MEDIUM, or HIGH. Choose the one that best fits based on user input."
        ),
      status: z
        .string()
        .describe(
          "The status of the task, either COMPLETED or NOT_STARTED. Choose one based on user input."
        ),
      messageBody: z.string().describe("Body of the note or message."),
      ownerId: z.string().describe("ID of the task owner.").optional(),
    }),
    func: async ({
      idCompany,
      messageBody,
      time,
      title,
      status,
      type,
      priority,
      ownerId,
    }) => {
      const props = {
        token,
        idCompany,
        idAccount,
        messageBody,
        time,
        title,
        status,
        type,
        priority,
        ownerId,
        propertiesOwnerid,
      };

      return await createActivitytaskCompany(props);
    },
  });

  const handleNewAndUpdatedCompany = await descriptionHandleCompany(
    propsCredential
  );

  const getCompanyInfoByName = new DynamicStructuredTool({
    name: "getCompanyInfoByName",
    description:
      "This function allows searching for companies(empresas) by their name, providing detailed information, including the unique identifier (ID) and the company(empresa) name. The retrieved data can be used in other functions.",
    schema: z.object({
      nameCompany: z
        .string()
        .describe("company(Empresa)  name to search for the id")
        .default(""),
      domain: z
        .string()
        .describe("company's domain for the search of the second option")
        .optional(),
    }),
    func: async ({ nameCompany, domain }): Promise<string> => {
      const dataConpany = { token, nameCompany, domain };
      return await getDataCompany(dataConpany);
    },
  });

  const addNoteWithDeal = new DynamicStructuredTool({
    name: "registerNoteForDeal",
    description:
      "Registers and creates a new note and directly associates it with a specific deal(Negocio). Providing the deal(Negocio)'s id is essential for the association. The note may include a customizable message.",
    schema: z.object({
      ownerId: z
        .string()
        .describe(
          "Owner ID associated with the note. You can obtain it from getOwnerData."
        )
        .optional()
        .default(""),
      messageNotesBody: z
        .string()
        .describe("Body of the note or message.")
        .default("esto es una nota"),
      dealId: z
        .string()
        .describe(
          "Identifier of the deal(Negocio) to which the note is to be associated. this property is mandatory to associate"
        ),
    }),
    func: async ({ messageNotesBody, ownerId, dealId }) => {
      const props = {
        token,
        messageNotesBody,
        ownerId,
        dealId,
        idAccount,
        propertiesOwnerid,
      };
      return await createActivityNotes(props);
    },
  });

  const createTaskAndAssociateWithDeal = descriptionHandleTask(propsCredential);

  const getStageForDeal = new DynamicTool({
    name: "getStageForDeal",
    description:
      "This function is designed to retrieve the stages available within the CRM. It provides both the stage values and their corresponding IDs, allowing you to accurately capture the id associated with a selected stage. This ensures accurate and efficient use of the id obtained when assigning a stage to a new deal(Negocio).",
    func: async () => {
      return await getStage(validateDataAccount?.token);
    },
  });

  const getOwnerData = descriptionGetOwnerData(propsCredential);

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
      const prop = { token, dealName };
      return await getDataDeal(prop);
    },
  });

  const manageMeetingRecord = descriptionHandleMeeting(propsCredential);

  const createOrUpdateCallRecord = descriptionHandleCall(propsCredential);

  const registerMessageAndAssociateWithObjects =
    describeHandleComunications(propsCredential);

  const handleNewAndUpdatedDeals = await descriptionHandleDeal(propsCredential);

  const tools = [
    createOrUpdateCallRecord,
    handleNewAndUpdatedDeals,
    getCompanyInfoByName,
    getStageForDeal,
    getContactInfoByName,
    createAssociation,
    addNoteWithDeal,
    getDealInfoByName,
    handleNewAndUpdatedCompany,
    handleNewAndUpdatedContact,
    createTaskAndAssociateWithDeal,
    createTaskAndAssociateWithCompany,
    createTaskAndAssociateWithContact,
    registerMessageAndAssociateWithObjects,
    manageMeetingRecord,
    getOwnerData,
  ];

  // const models = new ChatOpenAI({
  //   openAIApiKey: process.env.OPENAI_API_KEY,
  //   modelName: "gpt-3.5-turbo-0125",
  //   temperature: 0,
  // });
  // const outputParser = new StringOutputParser();

//   const plannerPrompt = ChatPromptTemplate.fromTemplate(`
//   Your function is to understand the user-provided {input}, without adding or inventing information. Do not include superfluous steps. Follow these instructions to provide the correct result and formatted text:

//   Detailed Reading: Read the entire message carefully to understand all the requests and details provided.
  
//   Task Breakdown: Divide the message into individual tasks and address them one by one to avoid confusion or errors. Clearly identify each action that needs to be taken and the order in which they should be carried out.
  
//   Plan the Execution Order: Organize the tasks in a logical order, taking into account possible dependencies between them.
  
//   Consult the following examples:
  
//   Input:
//   Create a deal named Meta and associate it with the company named Whatsapp, then create the contact for Mark Zuckerberg and associate it with the deal.
  
//   Output:
//   Create the deal named Meta.
//   Search for the company named Whatsapp.
//   Associate the deal named Meta with the company Whatsapp.
//   Create the contact for Mark Zuckerberg.
//   Associate the deal named Meta with the contact for Mark Zuckerberg.,
  
//   Input:
//   Create a deal Amazon.
  
//   Output:
//   Create a deal named Amazon.
  
//   Input:
//   Associate the contact named Max with the deal named Redix.
  
//   Output:
//   Search for the contact named Max.
//   Search for the deal named Redix.
//   Associate the contact named Max with the deal named Redix.
  
//   Input:
//   Register or add a note to the deal for OpenAI that says tomorrow I have a meeting.
  
//   Output:
//   Create a note for the deal named OpenAI that says: "Tomorrow I have a meeting".
  
//   Input:
//   Register a meeting with the deal for Amazon that says: we had a meeting for onboarding.
  
//   Output:
//   Register a meeting with the deal named Amazon that says: "We had a meeting for onboarding.

//   Input:
//   hola
  
//   Output:
//   hola

//   Input:
//   Create a strike deal for Cabak company.
  
//   Output:
//   Create a deal named strike, 
//   associate it with the company named Cabak..


// ###IMPORTANT: Do not add any additional text. It is crucial not to complete any text. In the final response, provide only the output result, without any additional information. It is fundamental to provide only the formatted text without any extra details. Provide the response according to the language corresponding to the user input. Note that when "Negocio" is written, it refers to "Deal", and when "empresa" is written, it refers to "Company".
// Identify the language of the {input} and respond in that language.
// No inventar nada y no utilizar ejemplos como respuesta, simplemente dar el mismo texto del input formateado.`);

  // const llmChain = plannerPrompt.pipe(models).pipe(outputParser);

  // const step = await llmChain.invoke({
  //   input: message,
  // });

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4-0125-preview",
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
  const messageHistory = new ChatMessageHistory();

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    handleParsingErrors:
      "Please try again, paying special attention to the values of the parameters and the user input.",
  });

  const config: RunnableConfig = { configurable: { sessionId: phoneNumber } };
  const withHistory = new RunnableWithMessageHistory({
    runnable: agentExecutor,
    getMessageHistory: (_sessionId: string) => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
    config,
  });

  const result = await withHistory.invoke({
    input: message,
    chat_history: [],
    tools,
    config,
  });

  return result;
};
