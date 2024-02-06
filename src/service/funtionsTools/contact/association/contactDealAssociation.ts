import axios from "axios";

interface Props {
  contactId: string;
  dealId: string;
  token?: string;
  idAccoun?: string;
}

export const contactDealAssociation = async (props: Props) => {
  try {
    const { contactId, dealId, token, idAccoun } = props;
    console.log(contactId, dealId, token, idAccoun )

    const url = `https://api.hubapi.com/crm-associations/v1/associations`;

    const response = await axios.put(
      url,
      {
        fromObjectId: contactId ,
        toObjectId: dealId  ,
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

 

    return `Asociaciones creadas con éxito. Puede ver los detalles en: https://app.hubspot.com/contacts/${idAccoun}/contact/${contactId}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    throw new Error("Error creating associations. Please try again later.");
  }
};
