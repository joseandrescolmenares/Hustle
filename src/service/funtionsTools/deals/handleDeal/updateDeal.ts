import axios from "axios";
import { DataProps } from "./handleDeal";
export const updateDeal = async (props: DataProps) => {
  const {
    dealId,
    amount,
    token,
    closedate,
    dealname,
    dealstage,
    idAccount,
    ownerId,
    propertiesOwnerid,
  } = props;

  const url = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

  const response = await axios.patch(
    url,
    {
      properties: {
        amount: amount,
        closedate: closedate,
        dealname: dealname,
        dealstage: dealstage,
        hubspot_owner_id: ownerId ? ownerId : propertiesOwnerid,
      },
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response?.data);
  return `se actualizo con exitos, lo puedes ver en el siguiente link : https://app.hubspot.com/contacts/${idAccount}/deal/${dealId}`;
};
