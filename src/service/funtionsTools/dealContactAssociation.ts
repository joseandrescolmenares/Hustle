import axios from "axios";
interface Props {
  token: string;
  dealId: string;
  contactId: string;
  idAccoun: string;
}

export const dealContactAssociation = async (props: Props) => {
  const { dealId,  contactId, token, idAccoun } = props;
 
  const url = `https://api.hubapi.com/crm-associations/v1/associations`;

  const response = await axios.put(
    url,
    {
      fromObjectId: `${contactId}`,
      toObjectId: `${dealId}`,
      category: "HUBSPOT_DEFINED",
      definitionId: 4,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return `Puedes ver los detalles en el siguiente enlace : https://app.hubspot.com/contacts/${idAccoun}/record/0-3/${dealId}`;
 
};

