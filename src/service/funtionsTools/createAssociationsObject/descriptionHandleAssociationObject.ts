import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { createAssociationObject } from "./createAssociationObject";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";

export const descriptionHandleAssociationObject = ({token, idAccount}:PropsCredential) => {
  return new DynamicStructuredTool({
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

}
