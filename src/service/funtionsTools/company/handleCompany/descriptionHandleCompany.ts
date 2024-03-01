import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { object, z } from "zod";
import { handleCompany } from "./handleCompany";
import { PropsCredential } from "../../deals/handleDeal/descriptionHandleDeal";
import { schema } from "../../schemaDescription/schema";

export const descriptionHandleCompany = async ({
  token,
  idAccount,
  propertiesOwnerid,
}: PropsCredential) => {
  let defaultProperties: { [key: string]: any } = {
    phone: z
      .number()
      .describe("Contact phone number of the company")
      .optional(),
    name: z
      .string()
      .describe("Full name of the company")
      .optional(),
    city: z
      .string()
      .describe("Location or city where the company is based.")
      .optional(),
    industry: z
      .string()
      .describe("Industry to which the company belongs")
      .optional(),
    domain: z
      .string()
      .describe("Primary web domain of the company.")
      .optional(),
    companyId: z
      .string()
      .describe(
        "Identifier of the company(empresa) to update. It is very important and mandatory to pass this parameter when executing the update action"
      )
      .optional(),
    ownerId: z
      .string()
      .describe(
        "Owner ID associated with the company(empresa). This field determines the ID of the user who appears as the owner of the company."
      )
      .optional(),
  };

  const object = "companies";

  return new DynamicStructuredTool({
    name: "handleNewAndUpdatedCompany",
    description:
      "Creates or updates a company(empresa) in HubSpot, allowing configuration of fields such as the company(empresa) name, phone number, city, domain, and industry. Performs Create or Update action. If the action is Update, companyId is required to successfully complete the update. Only modifies the properties specified by the user.",
    schema: await schema({ token, defaultProperties, object }),
    func: async ({
      phone,
      name,
      city,
      industry,
      domain,
      companyId,
      ownerId,
      ...dynamicProps
    }) => {
      const props = {
        token,
        idAccount,
        phone,
        name,
        city,
        industry,
        domain,
        companyId,
        propertiesOwnerid,
        ownerId,
        ...dynamicProps,
      };
      return await handleCompany(props);
    },
  });
};
