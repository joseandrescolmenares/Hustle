import axios from "axios";
import { DataProps } from "./handleDeal";
export const updateDeal = async (props: DataProps) => {
  const { dealId, amount, token, closedate, dealname, dealstage, idAccount } =
    props;

  const url = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

  const response = await axios.patch(
    url,
    {
      properties: {
        amount: `${amount}`,
        closedate: `${closedate}`,
        dealname: `${dealname}`,
        dealstage: `${dealstage}`,
        // properties_amount: `${}`
        // properties_amount: `${}`
        // properties_amount: `${}`
        // properties_amount: `${}`
      },
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return `se actualizo con exitos, lo puedes ver en el siguiente link : https://app.hubspot.com/contacts/${idAccount}/deal/${dealId}`;
};
