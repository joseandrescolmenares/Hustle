import axios from "axios";
import { updateDeal } from "./updateDeal";

export interface DataProps {
  token: string;
  amount: number;
  dealname: string;
  closedate?: string;
  idAccount?: string;
  dealstage: string | null;
  dealId?: string;
  propertiesOwnerid?: Promise<string> | string;
  ownerId?: string;
}

export const handleDeal = async (
  dataProp: DataProps & { [key: string]: any }
) => {
  const {
    amount,
    dealname,
    closedate,
    token,
    idAccount,
    dealstage,
    dealId,
    propertiesOwnerid,
    ownerId,
    ...dynamicProps
  } = dataProp;

  const us = dynamicProps;
  console.log(us, "us");

  if (dealId) {
    return await updateDeal(dataProp);
  }

  const url = "https://api.hubapi.com/crm/v3/objects/deals";
  try {
    const requestBody = {
      properties: {
        amount,
        dealstage,
        dealname,
        closedate,
        hubspot_owner_id: ownerId ? ownerId : propertiesOwnerid,
        ...Object.entries(dynamicProps).reduce((acc, [key, value]) => {
          if (value !== "") {
            acc[key as keyof typeof dynamicProps] = value;
          }
          return acc;
        }, {} as { [key: string]: any }),
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (!data.id)
      return `The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.`;

    return `Response: El Negocio  se ha creado correctamente. Puede ver la información acá (https://app.hubspot.com/contacts/${idAccount}/deal/${data.id}).
    `;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
  }
};
