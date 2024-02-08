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
import { handleDeal } from "../funtionsTools/deals/handleDeal";
import { dealCompanyAssociation } from "../funtionsTools/deals/association/createDealCompanyAssociation";
import { getSearchContacts } from "../funtionsTools/contact/getSearchContact";
import { getStage } from "../funtionsTools/deals/getStage";
import { dealContactAssociation } from "../funtionsTools/deals/association/dealContactAssociation";
import { createActivityNotes } from "../funtionsTools/deals/activityDeal/createActivityNotes";
import { getDataDeal } from "../funtionsTools/deals/getDataDeal";

import { handleCompany } from "../funtionsTools/company/handleCompany";
import { updateDeal } from "../funtionsTools/deals/updateDeal";
import { handleContact } from "../funtionsTools/contact/handleContact";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

import { createAssociationObject } from "../funtionsTools/createAssociationObject";
import { companyContactAssociations } from "../funtionsTools/company/association/companyContact";
import { MessagesPlaceholder } from "@langchain/core/prompts";

import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { Input } from "@/app/components/ui/Input";
import { createtaskDeals } from "../funtionsTools/deals/activityDeal/createTaskDeal";
import { title } from "process";
import { createActivitytaskCompany } from "../funtionsTools/company/activityCompany/createTaskCompany";
import { createActivitytaskContact } from "../funtionsTools/contact/activityContact/createTaskContact";
import { handleCall } from "../funtionsTools/handleCall";

export const agentAi = async (message: string, phoneNumber: string) => {
  const validateDataAccount = await renewTokenAgent(phoneNumber);
  const token = validateDataAccount?.token;
  const idAccount = validateDataAccount?.idAccount;

  if (!idAccount || !token) {
    return;
  }

  // funrtion contact

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
      };

      return await createActivitytaskContact(props);
    },
  });

  const handleNewAndUpdatedContact = new DynamicStructuredTool({
    name: "handleNewAndUpdatedContact",
    description:
      "Creates or updates a contact(contacto) in HubSpot, allowing configuration of fields such as the contact's phone number, first name, last name, company, email address, website, and lifecyclestage. Performs Create or Update action. If the action is Update, contactId is required to successfully complete the update.",
    schema: z.object({
      phone: z.string().describe("The contact's phone number").optional(),
      firstname: z
        .string()
        .describe("The first name of the contact.")
        .optional()
        .default(""),
      lastname: z.string().describe("The last name of the contact.").optional(),
      company: z
        .string()
        .describe("The name of the company associated with the contact.")
        .optional()
        .default(""),
      website: z
        .string()
        .describe("The website linked to the contact.")
        .optional()
        .default(""),
      email: z
        .string()
        .describe("The email address of the contact.")
        .optional(),
      lifecyclestage: z
        .string()
        .describe("The current stage in the contact's lifecycle.")
        .optional(),

      contactId: z
        .string()
        .describe(
          "Identifier of the contact(contacto) to update. It is very important and mandatory to pass this parameter when executing the update action."
        )
        .optional(),
      jobtitle: z
        .string()
        .describe(`"Position" or "Job title" of a contact"`)
        .optional(),
    }),
    func: async ({
      phone,
      firstname,
      lastname,
      company,
      email,
      lifecyclestage,
      website,
      contactId,
      jobtitle,
    }) => {
      const props = {
        token,
        idAccount,
        phone,
        firstname,
        lastname,
        company,
        email,
        lifecyclestage,
        website,
        contactId,
        jobtitle,
      };
      return await handleContact(props);
    },
  });

  const createAssociation = new DynamicStructuredTool({
    name: "createAssociation",
    description:
      "This function facilitates the creation of associations between objects within HubSpot, such as creating associations between a business and a contact(contacto), between a contact and a company(empresa), or between a company and a deal(negocio). To ensure the success of the association process, it is critical to provide unique identifiers for both the source record and the target object. In addition, specifying the object name is essential for the correct execution of this operation, to execute this function successfully you must first provide the parameters.",

    schema: z.object({
      fromObjectType: z
        .string()
        .describe(
          'This parameter represents the type of object from which the association is established. Use the object name (e.g. "contact" for contacts, "company" for companies, "deal" for deals).'
        ),

      fromObjectId: z
        .string()
        .describe(
          "This parameter represents the ID of the record from which the association is established. For example, it can be the ID of a contact(contacto), the ID of a deal(negocio) or the ID of a company(empresa)."
        ),
      toObjectType: z
        .string()
        .describe(
          "This parameter represents the type of object to which the record is being associated. You should provide the name of the object type to which you are associating the record. Similar to fromObjectType, the options are contact(contacto), company(empresa) and deal(negocio)."
        ),
      toObjectId: z
        .string()
        .describe(
          "This parameter represents the ID of the record to which the record from fromObjectId is being associated. You should provide the specific ID of the record to which you want to associate the record from fromObjectId, such as the ID of a company, deal or contact."
        ),
    }),
    func: async ({
      fromObjectType,
      fromObjectId,
      toObjectId,
      toObjectType,
    }) => {
      const props = {
        token,
        idAccount,

        fromObjectType,
        fromObjectId,
        toObjectId,
        toObjectType,
      };
      return await createAssociationObject(props);
    },
  });

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

  // funtion company

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
      };

      return await createActivitytaskCompany(props);
    },
  });

  const handleNewAndUpdatedCompany = new DynamicStructuredTool({
    name: "handleNewAndUpdatedCompany",
    description:
      "Creates or updates a company(empresa) in HubSpot, allowing configuration of fields such as the company(empresa) name, phone number, city, domain, and industry. Performs Create or Update action. If the action is Update, companyId is required to successfully complete the update. Only modifies the properties specified by the user.",
    schema: z.object({
      phone: z
        .number()
        .describe("Contact phone number of the company")
        .optional(),
      name: z
        .string()
        .describe("Full name of the company")
        .optional()
        .default(""),
      city: z
        .string()
        .describe("Location or city where the company is based.")
        .optional()
        .default(""),
      industry: z
        .string()
        .describe("Industry to which the company belongs")
        .optional()
        .default(""),
      domain: z
        .string()
        .describe("Primary web domain of the company.")
        .optional()
        .default(""),
      companyId: z
        .string()
        .describe(
          "Identifier of the company(empresa) to update. It is very important and mandatory to pass this parameter when executing the update action"
        )
        .optional(),
    }),
    func: async ({ phone, name, city, industry, domain, companyId }) => {
      const props = {
        token,
        idAccount,
        phone,
        name,
        city,
        industry,
        domain,
        companyId,
      };
      return await handleCompany(props);
    },
  });

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
        .describe("Body of the note or message. ")
        .default("esto es una nota"),
      dealId: z
        .string()
        .describe(
          "Identifier of the deal(Negocio) to which the note is to be associated. this property is mandatory to associate"
        ),
    }),
    func: async ({ messageNotesBody, onwerId, dealId }) => {
      const props = { token, messageNotesBody, onwerId, dealId, idAccount };
      return await createActivityNotes(props);
    },
  });

  // funtions deals :

  const createTaskAndAssociateWithDeal = new DynamicStructuredTool({
    name: "createTaskAndAssociateWithDeal",
    description: `Creates a new task and directly associates it with a specific deal (Negocio). For the association, it is essential to provide the deal's identifier (id), which must be a numerical value.
    `,
    schema: z.object({
      idDeal: z
        .number()
        .describe(
          "The identifier (id) specifies the deal (Negocio) to which the task should be associated. This property is essential and must be provided for the successful association."
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
      idDeal,
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
        idDeal,
        idAccount,
        messageBody,
        time,
        title,
        status,
        type,
        priority,
        ownerId,
      };

      return await createtaskDeals(props);
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
      const prop = { token, dealName };
      return await getDataDeal(prop);
    },
  });

  const createOrUpdateCallRecordForDeal = new DynamicStructuredTool({
    name: "createOrUpdateCallRecordForDeal",
    description:
      "Creates or updates a call record. If updating, provide the callId. If creating, associate with a deal(negocio). Ensure to provide the dealId for association",
    schema: z.object({
      callTitle: z.string().describe("The title of the call."),
      callBody: z
        .string()
        .describe(
          "The description of the call, including any notes that you want to add."
        ),
      callDuration: z
        .string()
        .describe("The duration of the call in milliseconds."),
      callFromNumber: z
        .string()
        .describe("The phone number that the call was made from."),
      callRecordingUrl: z
        .string()
        .describe(
          "The URL that stores the call recording. URLS to .mp3 or .wav files can be played back on CRM records. Only HTTPS,  secure URLs will be accepted"
        ),
      callStatus: z
        .string()
        .describe(
          "The status of the call. The statuses are: BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED, IN_PROGRESS, NO_ANSWER, QUEUED, and RINGING, choose only one, the one you think corresponds."
        ),
      callToNumber: z
        .string()
        .describe("The phone number that received the call."),

      callId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
      dealId: z
        .string()
        .describe(
          "Deal(negocio) identifier to associate. It is very important and mandatory to pass this parameter."
        )
        .optional(),
    }),
    func: async ({
      callBody,
      callDuration,
      callFromNumber,
      callStatus,
      callRecordingUrl,
      callTitle,
      callToNumber,
      callId,
      dealId,
    }) => {
      const props = {
        token,
        idAccount,
        callBody,
        callDuration,
        callFromNumber,
        callStatus,
        callRecordingUrl,
        callTitle,
        callToNumber,
        callId,
        dealId,
      };
      return await handleCall(props);
    },
  });

  const createCallRecordForContact = new DynamicStructuredTool({
    name: "createCallRecordForContact",
    description:
      "Creates or updates a call record in the HubSpot CRM. In case the action is update please provide the callId to complete the execution successfully.",
    schema: z.object({
      callTitle: z.string().describe("The title of the call."),
      callBody: z
        .string()
        .describe(
          "The description of the call, including any notes that you want to add."
        ),
      callDuration: z
        .string()
        .describe("The duration of the call in milliseconds."),
      callFromNumber: z
        .string()
        .describe("The phone number that the call was made from."),
      callRecordingUrl: z
        .string()
        .describe(
          "The URL that stores the call recording. URLS to .mp3 or .wav files can be played back on CRM records. Only HTTPS,  secure URLs will be accepted"
        ),
      callStatus: z
        .string()
        .describe(
          "The status of the call. The statuses are: BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED, IN_PROGRESS, NO_ANSWER, QUEUED, and RINGING, choose only one, the one you think corresponds."
        ),
      callToNumber: z
        .string()
        .describe("The phone number that received the call."),

      callId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
    }),
    func: async ({
      callBody,
      callDuration,
      callFromNumber,
      callStatus,
      callRecordingUrl,
      callTitle,
      callToNumber,
      callId,
    }) => {
      const props = {
        token,
        idAccount,
        callBody,
        callDuration,
        callFromNumber,
        callStatus,
        callRecordingUrl,
        callTitle,
        callToNumber,
        callId,
      };
      return "";
    },
  });

  const createCallRecordForCompany = new DynamicStructuredTool({
    name: "createCallRecordForCompany",
    description:
      "Creates or updates a call record in the HubSpot CRM. In case the action is update please provide the callId to complete the execution successfully.",
    schema: z.object({
      callTitle: z.string().describe("The title of the call."),
      callBody: z
        .string()
        .describe(
          "The description of the call, including any notes that you want to add."
        ),
      callDuration: z
        .string()
        .describe("The duration of the call in milliseconds."),
      callFromNumber: z
        .string()
        .describe("The phone number that the call was made from."),
      callRecordingUrl: z
        .string()
        .describe(
          "The URL that stores the call recording. URLS to .mp3 or .wav files can be played back on CRM records. Only HTTPS,  secure URLs will be accepted"
        ),
      callStatus: z
        .string()
        .describe(
          "The status of the call. The statuses are: BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED, IN_PROGRESS, NO_ANSWER, QUEUED, and RINGING, choose only one, the one you think corresponds."
        ),
      callToNumber: z
        .string()
        .describe("The phone number that received the call."),

      callId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
    }),
    func: async ({
      callBody,
      callDuration,
      callFromNumber,
      callStatus,
      callRecordingUrl,
      callTitle,
      callToNumber,
      callId,
    }) => {
      const props = {
        token,
        idAccount,
        callBody,
        callDuration,
        callFromNumber,
        callStatus,
        callRecordingUrl,
        callTitle,
        callToNumber,
        callId,
      };
      return "";
    },
  });

  const handleNewAndUpdatedCommunication = new DynamicStructuredTool({
    name: "handleNewAndUpdatedCommunication",
    description:
      "Programa o actualiza una reunión en HubSpot, con detalles como el nombre de la reunión, la descripción, la ubicación, la hora de inicio y fin, etc.",
    schema: z.object({}),
    func: async () => {
      return "";
    },
  });

  const handleNewAndUpdatedMeeting = new DynamicStructuredTool({
    name: "handleNewAndUpdatedMeeting",
    description:
      "Programa o actualiza una reunión en HubSpot, con detalles como el nombre de la reunión, la descripción, la ubicación, la hora de inicio y fin, etc.",
    schema: z.object({}),
    func: async () => {
      return " ";
    },
  });

  const handleNewAndUpdatedDeals = new DynamicStructuredTool({
    name: "handleNewAndUpdatedDeals",
    description:
      "Creates or Updates a deal(Negocio) in HubSpot, allowing setting fields such as dealname, amount, closedate, and dealstage. This function performs two actions: Create or Update. If the action is Update, the dealId is required to successfully complete the update.",
    schema: z.object({
      amount: z
        .number()
        .describe("represents the monetary amount or monetary value"),
      dealname: z
        .string()
        .describe("represents the name of the deal(Negocio)."),
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
      dealId: z
        .string()
        .describe(
          "Identifier of the deal(Negocio) to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
    }),
    func: async ({
      amount,
      dealname,
      dealstage,
      closedate,
      dealId,
    }): Promise<string> => {
      const dataParams = {
        amount,
        dealname,
        dealstage,
        closedate,
        token,
        idAccount,
        dealId,
      };
      return await handleDeal(dataParams);
    },
  });

  const tools = [
    createOrUpdateCallRecordForDeal,
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
  ];

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
  });

  const result = await agentExecutor.invoke({
    input: message,
    chat_history: [],
  });

  return result;
};
