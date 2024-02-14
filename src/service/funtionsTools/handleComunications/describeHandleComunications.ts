import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleComunications } from "./handleComunications";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";

export const describeHandleComunications = ({
  token,
  idAccount,
  propertiesOwnerid
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "registerMessageAndAssociateWithObjects",
    description:
      "This tool is designed to solely register message activities with clients across various channels like LinkedIn, WhatsApp, and SMS. It enables the seamless recording of message interactions and their association with relevant company(empresa), deal(negocio), or contact(contacto) objects.",
    schema: z.object({
      channelType: z
        .string()
        .describe(
          "The type of communication channel. Supported values ​​are 'WHATS_APP', 'LINKEDIN_MESSAGE', or 'SMS'. You must select the one you believe corresponds to what the user requires."
        ),
      idObject: z
        .string()
        .describe(
          "The ID of the object (company(empresa), deal(negocio), or contact(contacto)) to which the message activity will be associated"
        ),
      textBody: z.string().describe("The content of the message"),
      object: z
        .string()
        .describe(
          "The type of object (e.g., company(empresa), deal(negocio), contact(contacto)"
        ),
        ownerId:z.string().describe("").optional()
    }),
    func: async ({ object, idObject, textBody, channelType,ownerId }) => {
      const props = {
        token,
        idAccount,
        object,
        idObject,
        textBody,
        channelType,
        ownerId,
        propertiesOwnerid
      };

      return await handleComunications(props);
    },
  });
};
