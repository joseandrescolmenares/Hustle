import axios from "axios";

interface Props {
  token: string;
  onwerId?: string;
  messageNotesBody: string;
  dealId?: string;
}
export const createActivityNotes = async (props: Props) => {
  const { onwerId, token, messageNotesBody, dealId } = props;
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/notes";

  const body = {
    properties: {
      hs_timestamp: "2021-11-12T15:48:22Z",
      hs_note_body: messageNotesBody,
      hubspot_owner_id: onwerId,
      hs_attachment_ids: "",
    },
    associations: [
      {
        to: {
          id: dealId,
        },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 214,
          },
        ],
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const result = await axios.post(apiUrl, body, { headers });
    const data = result.data;
    return "Note added successfully.";
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding note. Please try again later. We apologize for the inconvenience.";

  }
};
