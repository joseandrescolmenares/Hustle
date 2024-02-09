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
}

export const handleDeal = async (dataProp: DataProps) => {
  const { amount, dealname, closedate, token, idAccount, dealstage, dealId } =
    dataProp;

  if (dealId) {
    return await updateDeal(dataProp);
  }

  const url = "https://api.hubapi.com/crm/v3/objects/deals";

  const requestBody = {
    properties: {
      amount,
      dealstage,
      dealname,
      closedate,
    },
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
  

    return `El Negocio  se ha creado correctamente. Puede ver la información [aquí](https://app.hubspot.com/contacts/${idAccount}/deal/${data.id}).
    `;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
  }
};