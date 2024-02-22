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
import { string, z, Schema } from "zod";
import { getDataCompany } from "../funtionsTools/company/getDataCompany";

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

export const agentAi = async (
  message: string | undefined,
  phoneNumber: string,
  email: string
) => {
  const validateDataAccount = await renewTokenAgent(phoneNumber);

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

  const handleNewAndUpdatedContact = descriptionHandleContact(propsCredential);

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

  const handleNewAndUpdatedCompany = descriptionHandleCompany(propsCredential);

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
    name:"registerNoteForDeal",
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

  const handleNewAndUpdatedDeals = descriptionHandleDeal(propsCredential);

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
  //   modelName: "gpt-4-turbo-preview",
  //   temperature: 0,
  // });

  // const prePromptTemplate = await pull<ChatPromptTemplate>(
  //   "hustle/openai-tools-agent"
  // );


  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4-turbo-preview",
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
    handleParsingErrors:
      "Please try again, paying special attention to the values of the parameters and the user input.",
  });

  const result = await agentExecutor.invoke({
    input: message,
    chat_history: [],
    tools,
  });

  return result;
};
