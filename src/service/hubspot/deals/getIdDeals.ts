import axios from "axios";


export interface DataProps {
  token: string;
  amount: number;
  dealname: string;
  closedate?: string;
  idAccount?: string;
  dealstage?: string | null;
  dealId?: string;
  propertiesOwnerid?: Promise<string> | string;
  ownerId?: string;
 
}

export const postDeal = async (dataProp: DataProps ) => {
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
  } = dataProp;


  const url = "https://api.hubapi.com/crm/v3/objects/deals";

  const requestBody = {
    properties: {
      amount ,
      dealstage,
      dealname,
      closedate,
      hubspot_owner_id: ownerId ? ownerId : propertiesOwnerid,
      pais: null
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

    return  data;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
  }
};
