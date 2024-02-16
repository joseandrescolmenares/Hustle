import axios from "axios";

interface Props {
  idAccount: string;
  token: string;
  ownerId?: string;
  messageNotesBody: string;
  dealId?: string;
  propertiesOwnerid?: Promise<string>;
}
export const createActivityNotes = async (props: Props) => {
  const {
    ownerId,
    token,
    messageNotesBody,
    dealId,
    idAccount,
    propertiesOwnerid,
  } = props;
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/notes";

  const getCurrentDate = () => {
    return new Date().toISOString();
  };

  const data = getCurrentDate();

  const body = {
    properties: {
      hs_timestamp: data,
      hs_note_body: messageNotesBody,
      hubspot_owner_id:  ownerId ?  ownerId : propertiesOwnerid,
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
    const data = result?.data;
    return `Nota añadida correctamente.  Puede ver los detalles en:  https://app.hubspot.com/contacts/${idAccount}/deal/${dealId}.`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding note. Please try again later. We apologize for the inconvenience.";
  }
};
