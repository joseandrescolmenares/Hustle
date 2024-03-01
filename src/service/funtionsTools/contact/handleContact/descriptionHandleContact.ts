import React from "react";
import { handleContact } from "./handleContact";
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { PropsCredential } from "../../deals/handleDeal/descriptionHandleDeal";
import { schema } from "../../schemaDescription/schema";

export const descriptionHandleContact = async ({
  token,
  idAccount,
  propertiesOwnerid,
}: PropsCredential) => {
  let defaultProperties: { [key: string]: any } = {
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
    email: z.string().describe("The email address of the contact.").optional(),
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
      .describe("Position or Job title of a contact")
      .optional(),
    ownerId: z
      .string()
      .describe(
        "Identifier of the contact owner or creator. It is the ID of the user responsible for the contact in HubSpot."
      )
      .optional(),
  };
  const object = "contacts";

  return new DynamicStructuredTool({
    name: "handleNewAndUpdatedContact",
    description:
      "Creates or updates a contact(contacto) in HubSpot, allowing configuration of fields such as the contact's phone number, first name, last name, company, email address, website, and lifecyclestage. Performs Create or Update action. If the action is Update, contactId is required to successfully complete the update.",
    schema: await schema({ token, defaultProperties, object }),
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
      ownerId,
      ...dynamicProps
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
        ownerId,
        propertiesOwnerid,
        ...dynamicProps,
      };
      return await handleContact(props);
    },
  });
};
