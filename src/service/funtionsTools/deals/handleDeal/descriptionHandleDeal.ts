import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleDeal } from "./handleDeal";
import { schema } from "../../schemaDescription/schema";

export interface PropsCredential {
  token: string;
  idAccount: string;
  propertiesOwnerid?: Promise<string> | string;
}

export const descriptionHandleDeal = async ({
  token,
  idAccount,
  propertiesOwnerid,
}: PropsCredential) => {
  let defaultProperties: { [key: string]: any } = {
    amount: z
      .number()
      .describe("represents the monetary amount or monetary value"),
    dealname: z.string().describe("represents the name of the deal(negocio)."),
    dealstage: z
      .string()
      .nullable()
      .describe(
        "The stage or status of the deal is not required unless specifically needed. In that case, it's important to retrieve the status or stage using the 'getStageForDeal' function if necessary"
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
  };

  const object = "deals";
  return new DynamicStructuredTool({
    name: "handleNewAndUpdatedDeals",
    description:
      "Creates or updates a deal(negocio) in HubSpot. This function performs two actions: Create or Update. If the action is Update, the dealId is required to successfully complete the update, and it is important to modify only the parameters that the user wants to modify or change.",
    schema: await schema({ token, defaultProperties, object }),
    func: async ({
      amount,
      dealname,
      dealstage,
      closedate,
      dealId,
      ownerId,
      ...dynamicProps
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
        ...dynamicProps,
      };
      return await handleDeal(dataParams);
    },
  });
};
