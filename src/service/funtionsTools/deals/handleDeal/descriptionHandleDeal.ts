import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleDeal } from "./handleDeal";

export interface PropsCredential {
  token: string;
  idAccount: string;
}

export const descriptionHandleDeal = ({
  token,
  idAccount,
}: PropsCredential) => {
  return new DynamicStructuredTool({
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
};
