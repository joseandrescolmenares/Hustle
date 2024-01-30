import axios from "axios";
interface Props {
  token: string;
  dealId: string;
  contactId: string;
  idAccoun: string;
}

export const dealContactAssociation = async (props: Props) => {
  const { dealId, contactId, token, idAccoun } = props;

  try {
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

    return `Las asociaciones entre contacto y negocio se han creado con éxito. puede ver los detalles en el siguiente link : https://app.hubspot.com/contacts/${idAccoun}/deal/${dealId}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    throw new Error("Error creating associations. Please try again later.");
  }
};
