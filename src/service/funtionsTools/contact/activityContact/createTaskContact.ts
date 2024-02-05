import axios from "axios";

interface Props {
  idAccount?: string;
  token?: string;
  onwerId?: string;
  messageBody: string;
  time?: string;
  status?: string;
  title?: string;
  priority?: string;
  type?: string;
  contactId?: number;
}
export const createActivitytaskContact = async (props: Props) => {
  const {
    token,
    contactId,
    idAccount,
    messageBody,
    time,
    title,
    status,
    type,
    priority,
    onwerId,
  } = props;
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/tasks";

  const body = {
    properties: {
      hs_task_body: messageBody,
      hs_timestamp: time,
      hs_task_status: status,
      hs_task_subject: title,
      hs_task_priority: priority,
      hubspot_owner_id: onwerId,
      hs_task_type: type,
    },
    associations: [
      {
        to: {
          id: contactId,
        },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 204,
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
    return `Tarea añadida correctamente.  Puede ver los detalles en:  https://app.hubspot.com/contacts/${idAccount}/contact/${contactId}.`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding note. Please try again later. We apologize for the inconvenience.";
  }
};
