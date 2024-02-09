import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleCompany } from "./handleCompany";
import { PropsCredential } from "../../deals/handleDeal/descriptionHandleDeal";

export const descriptionHandleCompany = ({token, idAccount}:PropsCredential ) => {
  return new DynamicStructuredTool({
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
}
