import axios from "axios";
import { DataProps } from "./handleDeal";
export const updateDeal = async (props: DataProps & { [key: string]: any }) => {
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
    ...dynamicProps
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
        ...Object.entries(dynamicProps).reduce((acc, [key, value]) => {
          if (value !== "") {
            acc[key as keyof typeof dynamicProps] = value;
          }
          return acc;
        }, {} as { [key: string]: any }),
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
