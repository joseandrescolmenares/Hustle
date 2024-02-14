import axios from "axios";

interface PropsComunication {
  token: string;
  idAccount: string;
  channelType: string;
  textBody: string;
  idObject: string;
  object: string;
  propertiesOwnerid?:Promise<string>
  ownerId?:string
}

export const handleComunications = async (props: PropsComunication) => {
  const { token, idAccount, channelType, textBody, idObject, object,propertiesOwnerid } = props;
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/communications";

  const objectName = object.charAt(0).toLowerCase() + object.slice(1);

  let typeId;
  if (objectName == "contact" || objectName == "contacto") {
    typeId = 81;
  } else if (objectName == "company" || objectName == "empresa") {
    typeId = 87;
  } else if (objectName == "deal" || objectName == "negocio") {
    typeId = 85;
  }

  const getCurrentDate = () => {
    return new Date().toISOString();
  };

  const time = getCurrentDate();

  const body = {
    properties: {
      hs_communication_channel_type: channelType,
      hs_communication_logged_from: "CRM",
      hs_communication_body: textBody,
      hs_timestamp: time,
      hubspot_owner_id: propertiesOwnerid,
    },

    associations: [
      {
        to: {
          id: idObject,
        },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: typeId,
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
    return `El registro se creo  correctamente.  Puede ver los detalles en:  https://app.hubspot.com/contacts/${idAccount}/${
      objectName == "company" ? "companies" : objectName
    }/${idObject}`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding registro. Please try again later. We apologize for the inconvenience.";
  }
};
