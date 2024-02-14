import { DynamicStructuredTool } from "@langchain/community/tools/dynamic";
import { z } from "zod";
import { PropsCredential } from "../deals/handleDeal/descriptionHandleDeal";
import { handleMeeting } from "./handleMeeting";

export const descriptionHandleMeeting = ({
  token,
  idAccount,
  propertiesOwnerid 
}: PropsCredential) => {
  return new DynamicStructuredTool({
    name: "manageMeetingRecord",
    description:
      "This tool is specifically designed to register meeting details, ensuring smooth management of meetings across different contexts. It allows for the creation or update of meeting records, associating them with objects such as company(empresa), deal(negocio), or contact(contacto). In case of updating, the meetingId must be provided.",
    schema: z.object({
      title: z.string().describe("The title of the meeting."),
      textBody: z.string().describe("The meeting description"),
      meetingId: z
        .string()
        .describe(
          "Identifier of the call to update. it is very important and mandatory to pass this parameter."
        )
        .optional(),
      idObject: z
        .string()
        .describe(
          "The ID of the object (company(empresa), deal(negocio), or contact(contacto)) to which the message activity will be associated"
        ),
      object: z
        .string()
        .describe(
          "The type of object (e.g., company(empresa), deal(negocio), contact(contacto)"
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
        ),
        ownerId: z.string().describe("").optional()
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
      ownerId
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
        propertiesOwnerid ,
        title,
        meetingId,
      };
      return await handleMeeting(props);
    },
  });
};
