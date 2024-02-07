import axios from "axios";

interface Props {
  fromObjectType: string;
  fromObjectId: string;
  toObjectId: string;
  toObjectType: string;
  token?: string;
  idAccount?: string;
}

export const createAssociationObject = async (props: Props) => {
  try {
    const {
      fromObjectType,
      fromObjectId,
      toObjectId,
      toObjectType,
      token,
      idAccount,
    } = props;
    console.log(
      fromObjectType,
      fromObjectId,
      toObjectId,
      toObjectType,
      token,
      idAccount
    );

    // const url = `https://api.hubapi.com/crm-associations/v1/associations`;
    const url = `https://api.hubapi.com/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/default/${toObjectType}/${toObjectId}

    `;

    const response = await axios.put(
      url,
      {
        fromObjectId: fromObjectId,
        toObjectId: toObjectId,
      
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return `Asociaciones creadas con éxito. Puede ver los detalles en: https://app.hubspot.com/contacts/${idAccount}/${toObjectType == "company" ? "companies": toObjectType}/${toObjectId}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    throw new Error("Error creating associations. Please try again later.");
  }
};
