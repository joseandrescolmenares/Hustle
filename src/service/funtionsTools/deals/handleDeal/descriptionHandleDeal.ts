import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleDeal } from "./handleDeal";

export interface PropsCredential {
  token: string;
  idAccount: string;
  propertiesOwnerid?: Promise<string>;
}

export const descriptionHandleDeal = ({
  token,
  idAccount,
  propertiesOwnerid,
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "handleNewAndUpdatedDeals",
    description:
      "Creates or updates a deal(negocio) in HubSpot. This function performs two actions: Create or Update. If the action is Update, the dealId is required to successfully complete the update, and it is important to modify only the parameters that the user wants to modify or change.",
    schema: z.object({
      amount: z
        .number()
        .describe("represents the monetary amount or monetary value"),
      dealname: z
        .string()
        .describe("represents the name of the deal(negocio)."),
      dealstage: z
        .string()
        .nullable()
        .describe(
          "Current stage of a deal(negocio) or commercial negotiation within the sales process. No identifier is required unless explicitly needed. Retrieve it using the 'getStageForDeal' function if necessary"
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
      ownerId: z
        .string()
        .describe(
          `Owner ID associated with the deal(negocio). This field determines the ID of the user who appears as the owner of the deal.`
        )
        .optional(),
    }),
    func: async ({
      amount,
      dealname,
      dealstage,
      closedate,
      dealId,
      ownerId,
    }): Promise<string> => {
      const dataParams = {
        amount,
        dealname,
        dealstage,
        closedate,
        token,
        idAccount,
        dealId,
        ownerId,
        propertiesOwnerid,
      };
      return await handleDeal(dataParams);
    },
  });
};
