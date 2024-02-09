import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";
import { handleCall } from "./handleCall";

export const descriptionHandleCall = ({token, idAccount}:PropsCredential) => {
  return new DynamicStructuredTool({
    name: "createOrUpdateCallRecordForDeal",
    description:
      "Creates or updates a call record. If updating, provide the callId. If creating, associate with a deal(negocio). Ensure to provide the dealId for association",
    schema: z.object({
      callTitle: z.string().describe("The title of the call."),
      callBody: z
        .string()
        .describe(
          "The description of the call, including any notes that you want to add."
        ),
      callDuration: z
        .string()
        .describe("The duration of the call in milliseconds."),
      callFromNumber: z
        .string()
        .describe("The phone number that the call was made from."),
      callRecordingUrl: z
        .string()
        .describe(
          "The URL that stores the call recording. URLS to .mp3 or .wav files can be played back on CRM records. Only HTTPS,  secure URLs will be accepted"
        ),
      callStatus: z
        .string()
        .describe(
          "The status of the call. The statuses are: BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED, IN_PROGRESS, NO_ANSWER, QUEUED, and RINGING, choose only one, the one you think corresponds."
        ),
      callToNumber: z
        .string()
        .describe("The phone number that received the call."),

      callId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
      dealId: z
        .string()
        .describe(
          "Deal(negocio) identifier to associate. It is very important and mandatory to pass this parameter."
        )
        .optional(),
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
      dealId,
    }) => {
      const props = {
        token,
        idAccount,
        callBody,
        // callDuration,
        // callFromNumber,
        // callStatus,
        // callRecordingUrl,
        // callToNumber,
        callTitle,
        callId,
        dealId,
      };
      return await handleCall(props);
    },
  });
};
