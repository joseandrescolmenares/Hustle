import axios from "axios";

interface PropsMeeting {
  token: string;
  idAccount: string;
  meetingNotes: string;
  title: string;
  textBody: string;
  idObject: string;
  object: string;
  timeStamp: string;
  meetingId?: string;
  propertiesOwnerid?: Promise<string>;
  ownerId?: string;
}

export const handleMeeting = async (props: PropsMeeting) => {
  const {
    token,
    idAccount,
    meetingNotes,
    title,
    textBody,
    idObject,
    object,
    timeStamp,
    propertiesOwnerid,
    ownerId,
  } = props;
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/meetings";

  const objectName = object.charAt(0).toLowerCase() + object.slice(1);

  let typeId;
  if (objectName == "contact" || objectName == "contacto") {
    typeId = 200;
  } else if (objectName == "company" || objectName == "empresa") {
    typeId = 188;
  } else if (objectName == "deal" || objectName == "negocio") {
    typeId = 212;
  }

  const getCurrentDate = () => {
    return new Date().toISOString();
  };

  let time = timeStamp;
  const currentTime = getCurrentDate();

  if (!timeStamp) {
    time = currentTime;
  }
  const body = {
    properties: {
      hs_timestamp: time,
      hubspot_owner_id: ownerId ? ownerId : propertiesOwnerid,
      hs_meeting_title: title,
      hs_meeting_body: textBody,
      hs_internal_meeting_notes: meetingNotes,
      // hs_meeting_external_url:
      // https://Zoom.com/0000",
      hs_meeting_location: "Remote",
      //   hs_meeting_start_time: "2021-03-23T01:02:44.872Z",
      //   hs_meeting_end_time: "2021-03-23T01:52:44.872Z",
      hs_meeting_outcome: "SCHEDULED",
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
      objectName == "company" || objectName == "empresa"
        ? "companies"
        : objectName
    }/${idObject}`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding registro. Please try again later. We apologize for the inconvenience.";
  }
};
