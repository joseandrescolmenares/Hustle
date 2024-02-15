import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { handleOwners } from "./handleOwner";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";

export const descriptionGetOwnerData = ({
  token,
  idAccount,
  propertiesOwnerid,
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "getOwnersData",
    description:
      "This function allows you to search for an owner by their name or email, providing complete information including the unique identifier (ID), owner's name, and email.",
    schema: z.object({}),
    func: async () => {
      const prop = { token };
      return await handleOwners(prop);
    },
  });
};
