import axios from "axios";

interface Props {
  token: string;
  callTitle: string;
  callBody: string;
  // callDuration: string;
  // callFromNumber: string;
  // callToNumber: string;
  // callRecordingUrl: string;
  // callStatus: string;
  callId?: string;
  idAccount: string;
  object: string;
  objectId: string;
  propertiesOwnerid?: Promise<string>;
  ownerId?: string;
}
export const handleCall = async (props: Props) => {
  const {
    token,
    callTitle,
    callBody,
    object,
    propertiesOwnerid,
    ownerId,
    // callDuration,
    // callFromNumber,
    // callRecordingUrl,
    // callToNumber,
    // callStatus,
    idAccount,
    objectId,
  } = props;

  const objectName = object.charAt(0).toLowerCase() + object.slice(1);

  let typeId;
  if (objectName == "contact" || objectName == "contacto") {
    typeId = 194;
  } else if (objectName == "company " || objectName == "empresa") {
    typeId = 182;
  } else if (objectName == "deal" || objectName == "negocio") {
    typeId = 206;
  }
  const getCurrentDate = () => {
    return new Date().toISOString();
  };
  const timestamp = getCurrentDate();

  const apiUrl = "https://api.hubapi.com/crm/v3/objects/calls";

  const body = {
    properties: {
      hs_timestamp: timestamp,
      hs_call_title: callTitle,
      hs_call_body: callBody,
      hubspot_owner_id: ownerId ? ownerId : propertiesOwnerid,
    },
    associations: [
      {
        to: {
          id: objectId,
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

    return `registro de llamada  creada con exito, se asocio al negocio correctamente lo puedes ver aca : https://app.hubspot.com/contacts/${idAccount}/${
      objectName == "company" ? "companies" : objectName
    }/${objectId}`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding call. Please try again later. We apologize for the inconvenience.";
  }
};
