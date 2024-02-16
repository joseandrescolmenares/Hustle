import axios from "axios";

interface Props {
  idAccount: string;
  token: string;
  ownerId?: string;
  messageBody: string;
  time: string;
  status: string;
  title: string;
  priority: string;
  type: string;
  idDeal: number;
  propertiesOwnerid?: Promise<string>;
}
export const createtaskDeals = async (props: Props) => {
  const {
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
    propertiesOwnerid,
  } = props;
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/tasks";

  const body = {
    properties: {
      hs_task_body: messageBody,
      hs_timestamp: time,
      hs_task_status: status,
      hs_task_subject: title,
      hs_task_priority: priority,
      hubspot_owner_id: ownerId?  ownerId:  propertiesOwnerid,
      hs_task_type: type,
    },
    associations: [
      {
        to: {
          id: idDeal,
        },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 216,
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
    return `Tarea añadida correctamente.  Puede ver los detalles en:  https://app.hubspot.com/contacts/${idAccount}/deal/${idDeal}.`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding note. Please try again later. We apologize for the inconvenience.";
  }
};
