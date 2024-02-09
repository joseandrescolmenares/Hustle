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
  dealId: string | undefined;
  callId: string | undefined;
  idAccount: string;
}
export const handleCall = async (props: Props) => {
  const {
    token,
    callTitle,
    callBody,
    // callDuration,
    // callFromNumber,
    // callRecordingUrl,
    // callToNumber,
    // callStatus,
    dealId,
    idAccount,
  } = props;

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
      // hs_call_duration: callDuration,
      // hs_call_from_number: callFromNumber,
      // hs_call_to_number: callToNumber,
      // hs_call_recording_url: callRecordingUrl,
      // hs_call_status: callStatus,
      // "hubspot_owner_id": "11349275740",
    },
    associations: [
      {
        to: {
          id: dealId,
        },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 206,
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
    const data = result.data;
    const id = data.id;
    console.log(id, "caleandodod");
    return `registro de llamada  creada con exito, se asocio al negocio correctamente lo puedes ver aca,https://app.hubspot.com/contacts/${idAccount}/deal/${dealId}`;
  } catch (error) {
    console.error("Error creating note:", error);
    return "Error adding note. Please try again later. We apologize for the inconvenience.";
  }
};
