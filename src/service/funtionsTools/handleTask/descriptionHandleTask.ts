import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { createtaskDeals } from "../deals/activityDeal/createTaskDeal";

import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";

export const descriptionHandleTask = ({
  token,
  idAccount,
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "createTaskAndAssociateWithDeal",
    description: `Creates a new task and directly associates it with a specific deal (Negocio). For the association, it is essential to provide the deal's identifier (id), which must be a numerical value.
    `,
    schema: z.object({
      idDeal: z
        .number()
        .describe(
          "The identifier (id) specifies the deal (Negocio) to which the task should be associated. This property is essential and must be provided for the successful association."
        ),
      type: z
        .string()
        .describe(
          "The type of task. Values include EMAIL, CALL, or TODO. Choose the one that best fits based on user input."
        ),
      time: z
        .string()
        .describe(
          "Required. This field marks the task's due date. You can use a Unix timestamp in milliseconds or UTC format."
        ),
      title: z.string().describe("The title of the task."),
      priority: z
        .string()
        .describe(
          "The priority of the task. Values include LOW, MEDIUM, or HIGH. Choose the one that best fits based on user input."
        ),
      status: z
        .string()
        .describe(
          "The status of the task, either COMPLETED or NOT_STARTED. Choose one based on user input."
        ),
      messageBody: z.string().describe("Body of the note or message."),
      ownerId: z.string().describe("ID of the task owner.").optional(),
    }),
    func: async ({
      idDeal,
      messageBody,
      time,
      title,
      status,
      type,
      priority,
      ownerId,
    }) => {
      const props = {
        token,
        idDeal,
        idAccount,
        messageBody,
        time,
        title,
        status,
        type,
        priority,
        ownerId,
      };

      return await createtaskDeals(props);
    },
  });
};
