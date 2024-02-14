import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";
import { handleCall } from "./handleCall";

export const descriptionHandleCall = ({
  token,
  idAccount,
  propertiesOwnerid
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "createOrUpdateCallRecord",
    description:
      "Create or update a call record. If updating, provide the call identifier. If creating, it is associated with a company(empresa), deal(negocio), or contact(contacto) object. Ensure to provide the objectId for the association.",
    schema: z.object({
      callTitle: z.string().describe("The title of the call."),
      callBody: z
        .string()
        .describe(
          "The description of the call, including any notes that you want to add."
        ),
      // callDuration: z
      //   .string()
      //   .describe("The duration of the call in milliseconds."),
      // callFromNumber: z
      //   .string()
      //   .describe("The phone number that the call was made from."),
      // callRecordingUrl: z
      //   .string()
      //   .describe(
      //     "The URL that stores the call recording. URLS to .mp3 or .wav files can be played back on CRM records. Only HTTPS,  secure URLs will be accepted"
      //   ),
      // callToNumber: z
      // .string()
      // .describe("The phone number that received the call."),

      // callStatus: z
      //   .string()
      //   .describe(
      //     "The status of the call. The statuses are: BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED, IN_PROGRESS, NO_ANSWER, QUEUED, and RINGING, choose only one, the one you think corresponds."
      //   ),
     
      callId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
      objectId: z
        .string()
        .describe(
          "The ID of the object (company(empresa), deal(negocio), or contact(contacto)) to which the message activity will be associated"
        ),
      object: z
        .string()
        .describe(
          "The type of object (e.g., company(empresa), deal(negocio), contact(contacto)"
        ),

        ownerId: z.string().describe("").optional()
    }),
    func: async ({
      // callDuration,
      // callFromNumber,
      // callStatus,
      // callRecordingUrl,
      // callToNumber,
      callTitle,
      callBody,
      callId,
      objectId,
      object,
      ownerId
    }) => {
      const props = {
        token,
        idAccount,
        callBody,
        objectId,
        ownerId,
        propertiesOwnerid,
        object,
        // callDuration,
        // callFromNumber,
        // callStatus,
        // callRecordingUrl,
        // callToNumber,
        callTitle,
        callId,
      };
      return await handleCall(props);
    },
  });
};
