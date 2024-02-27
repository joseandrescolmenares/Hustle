import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";
import { handleMeeting } from "./handleMeeting";

export const descriptionHandleMeeting = ({
  token,
  idAccount,
  propertiesOwnerid,
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "manageMeetingRecord",
    description:
      "This function is specifically designed to create or register meeting records. It allows creating or updating meeting records, associating them with objects such as company(empresa), deal(negocio), or contact(contacto). In case of an update, the meetingId must be provided. Do not invent or add any additional text.",
    schema: z.object({
      title: z
        .string()
        .describe("The title of the meeting. If it doesn't have a title, do not invent any title.")
        .optional()
        .default(""),
      textBody: z
        .string()
        .describe("The meeting description")
        .optional()
        .default(""),
      meetingId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
      idObject: z
        .string()
        .describe(
          "The ID of the object company(Empresa), deal(Negocio), or contact(Contacto) to which the message activity will be associated"
        ),
      object: z
        .string()
        .describe(
          "The type of object (e.g., company(Empresa), deal(Negocio), contact(Contacto)"
        ),
      timeStamp: z
        .string()
        .describe(
          "Required. This field marks the date and time that the meeting occurred. You can use either a Unix timestamp in milliseconds or UTC format."
        ),
      meetingNotes: z
        .string()
        .describe(
          "The internal notes you take for your team during a meeting that are not included in the attendee meeting description"
        ).optional().default(""),
      ownerId: z
        .string()
        .describe(
          "Owner ID associated with the meeting record. You can obtain it from getOwnerData."
        )
        .optional(),
    }),
    func: async ({
      // callDuration,
      // callFromNumber,
      // callStatus,
      // callRecordingUrl,
      // callToNumber,
      textBody,
      meetingId,
      object,
      title,
      idObject,
      timeStamp,
      meetingNotes,
      ownerId,
    }) => {
      const props = {
        token,
        idAccount,
        textBody,
        idObject,
        object,
        timeStamp,
        meetingNotes,
        ownerId,
        // callDuration,
        // callFromNumber,
        // callStatus,
        // callRecordingUrl,
        // callToNumber
        propertiesOwnerid,
        title,
        meetingId,
      };
      return await handleMeeting(props);
    },
  });
};
