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
import { AnyZodTuple, Schema, ZodObject, object, string, z } from "zod";
import { getDataCompany } from "../funtionsTools/company/getDataCompany";
import { createNewDeals } from "../funtionsTools/deals/createDeals";
import { dealCompanyAssociation } from "../funtionsTools/deals/association/createDealCompanyAssociation";
import { getSearchContacts } from "../funtionsTools/contact/getSearchContact";
import { getStage } from "../funtionsTools/deals/getStage";
import { dealContactAssociation } from "../funtionsTools/deals/association/dealContactAssociation";
import { createActivityNotes } from "../funtionsTools/deals/activityDeal/createActivityNotes";
import { getDataDeal } from "../funtionsTools/deals/getDataDeal";

import { createCompany } from "../funtionsTools/company/createCompany";
import { updateDeal } from "../funtionsTools/deals/updateDeal";
import { createContact } from "../funtionsTools/contact/createContact";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

import { contactDealAssociation } from "../funtionsTools/contact/association/contactDealAssociation";
import { companyContactAssociations } from "../funtionsTools/company/association/companyContact";
import { MessagesPlaceholder } from "@langchain/core/prompts";

import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { Input } from "@/app/components/ui/Input";
import { createtaskDeals } from "../funtionsTools/deals/activityDeal/createTaskDeal";
import { title } from "process";
import { createActivitytaskCompany } from "../funtionsTools/company/activityCompany/createTaskCompany";
import { createActivitytaskContact } from "../funtionsTools/contact/activityContact/createTaskContact";

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

  const createNewContact = new DynamicStructuredTool({
    name: "createContact",
    description:
      " creates a new contact with the specified properties. Additionally, this function provides information, such as the id and name of the created contact, which can be used in other functions.",
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
    }),
    func: async ({
      phone,
      firstname,
      lastname,
      company,
      email,
      lifecyclestage,
      website,
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
      };
      return await createContact(props);
    },
  });

  const associateContactWithDeal = new DynamicStructuredTool({
    name: "associateContactWithDeal",
    description:
      "This function serves to associate a deal(Negocio) with contacts, and it is crucial to provide unique identifiers for both to ensure the success of the association. Obtaining specific identifiers for both deals and contacts is of vital importance for the proper functioning of this operation.",
    schema: z.object({
      contactId: z.string().describe("represents the contact identifier"),
      dealId: z
        .string()
        .describe("represents the deal(Negocio) id to perform the association"),
    }),
    func: async ({ contactId, dealId }) => {
      const props = { token, idAccount, contactId, dealId };
      return await contactDealAssociation(props);
    },
  });

  const getContactInfoByName = new DynamicStructuredTool({
    name: "getContactInfoByName",
    description:
      "This function enables you to search for a contact by name, providing comprehensive information, including their email address, unique identifier (id), and name. The details retrieved can be utilized in various functions, such as establishing associations with other entities",
    schema: z.object({
      contactName: string().describe("contact name to search for the id"),
      email: z
        .string()
        .describe("Contact email for second option search")
        .optional(),
    }),
    func: async ({ contactName, email }) => {
      const emailContact = email;
      const dataProp = { token, contactName, emailContact };
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

  const createNewCompany = new DynamicStructuredTool({
    name: "createCompany",
    description:
      "This function creates a new company with the specified properties. Additionally, this function provides information, such as the id and name of the created company, that can be used in other functions.",
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
    }),
    func: async ({ phone, name, city, industry, domain }) => {
      const props = { token, idAccount, phone, name, city, industry, domain };
      return await createCompany(props);
    },
  });

  const associateContactWithCompany = new DynamicStructuredTool({
    name: "associateContactWithCompany",
    description:
      "This function is responsible for establishing associations between companies(empresas) and contacts, and it is crucial to provide unique identifiers for both to ensure the success of the association.",
    schema: z.object({
      idCompany: z
        .string()
        .describe("represents the company(empresa) identifier "),
      idContact: z.string().describe("represents the contact identifier"),
    }),
    func: async ({ idCompany, idContact }) => {
      const props = { token, idAccount, idCompany, idContact };
      return await companyContactAssociations(props);
    },
  });

  const getCompanyInfoByName = new DynamicStructuredTool({
    name: "getCompanyInfoByName",
    description:
      "This function allows searching for companies by their name, providing detailed information, including the unique identifier (ID) and the company (compañía) name. The retrieved data can be used in other functions.",
    schema: z.object({
      nameCompany: z
        .string()
        .describe("company(Empresa)  name to search for the id")
        .default(""),
      domain: z.string().describe("company's domain for the search of the second option").optional(),
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

  const associateDealWithContact = new DynamicStructuredTool({
    name: "associateDealWithContact",
    description:
      "This function associates Contacts(Contacto) with a deal (Negocio), and it is crucial to provide unique identifiers for both to ensure the success of the association. Obtaining specific identifiers for both deals and contacts is of vital importance for the proper functioning of this operation.",

    schema: z.object({
      contactId: z.string().describe("represents the contact identifier"),
      dealId: z
        .string()
        .describe("represents the deal(Negocio) id to perform the association"),
    }),
    func: async ({ contactId, dealId }) => {
      const props = { token, idAccount, contactId, dealId };
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
      const props = { idCompany, idDeals, token, idAccount };
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
      const prop = { token, dealName };
      return await getDataDeal(prop);
    },
  });

  const updateDealInformation = new DynamicStructuredTool({
    name: "updateDealInformation",
    description:
      "This function is responsible for updating the details of a deal (Negocio), allowing modification of various aspects such as dates, values, name, and other relevant properties. It is mandatory to provide the dealId parameter for the correct execution of the function",
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
        .describe(
          "Identifier of the deal(Negocio) to update. it is very important and mandatory to pass this parameter."
        ),
    }),
    func: async ({
      amount,
      dealname,
      dealstage,
      closedate,
      dealId,
    }): Promise<string> => {
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
    associateDealWithContact,
    associateContactWithDeal,
    addNoteWithDeal,
    getDealInfoByName,
    updateDealInformation,
    createNewCompany,
    createNewContact,
    associateContactWithCompany,
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

  // const chainWithHistory = new RunnableWithMessageHistory({
  //   runnable: agentExecutor,
  //   getMessageHistory: (sessionId: string) =>
  //     new UpstashRedisChatMessageHistory({
  //       sessionId,
  //       config: {
  //         url: "https://relative-tetra-37107.upstash.io",
  //         token:
  //           "AZDzACQgMmM1Mzc5ZTUtM2MxNy00YjE5LWEyZmUtM2U2YzEyM2Y1NTIwNzBjNWI5NjUzNGY4NGE2MjhiMWQ0NzE4MjRmZmY3MDQ=",
  //       },
  //     }),

  //   inputMessagesKey: "input",
  //   historyMessagesKey: "chat_history",

  // });

  const result = await agentExecutor.invoke({
    input: message,
    chat_history: [],
    tools,
  });

  //   const result = await chainWithHistory.invoke(
  //     {
  //       input: message,
  //     },
  //     {
  //       configurable: {
  //         sessionId: "baa",
  //       },
  //     }
  //   );

  return result;
};

// const result = await agentExecutor.invoke({
//   input: message,
//   memory,
// });
