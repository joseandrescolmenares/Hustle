import axios from "axios";

interface Props {
  idContact?: string;
  idDeal?: string;
  token?: string;
  idAccoun?: string;
}

export const contactDealAssociation = async (props: Props) => {
  try {
    const { idContact, idDeal, token, idAccoun } = props;

    const url = `https://api.hubapi.com/crm-associations/v1/associations`;

    const response = await axios.put(
      url,
      {
        fromObjectId: `${idDeal}`,
        toObjectId: `${idContact}`,
        category: "HUBSPOT_DEFINED",
        definitionId: 3,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return `Asociaciones creadas con éxito. Puede ver los detalles en: https://app.hubspot.com/contacts/${idAccoun}/contact/${idContact}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    throw new Error("Error creating associations. Please try again later.");
  }
};
