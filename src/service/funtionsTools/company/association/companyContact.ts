import axios from "axios";

interface Props {
idCompany: string;
  idContact: string;
  token: string;
  idAccount: string;
}

export const companyContactAssociations = async (props: Props) => {
  try {
    const { idContact, idCompany, token, idAccount } = props;

    const url = `https://api.hubapi.com/crm-associations/v1/associations`;

    const response = await axios.put(
      url,
      {
        fromObjectId: `${idCompany}`,
        toObjectId: `${idContact}`,
        category: "HUBSPOT_DEFINED",
        definitionId: 2,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );


    return `Asociaciones creadas con éxito. Puede ver los detalles en: https://app.hubspot.com/contacts/${idAccount}/companies/${idCompany}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    throw new Error("Error creating associations. Please try again later.");
  }
};
