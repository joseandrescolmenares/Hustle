import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleDeal } from "./handleDeal";
import { schema } from "./schema";

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
  return new DynamicStructuredTool({
    name: "handleNewAndUpdatedDeals",
    description:
      "Creates or updates a deal(negocio) in HubSpot. This function performs two actions: Create or Update. If the action is Update, the dealId is required to successfully complete the update, and it is important to modify only the parameters that the user wants to modify or change.",
    schema: await schema(token),
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
