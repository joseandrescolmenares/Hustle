interface DataProps {
  token?: string;
  amount?: number;
  dealname?: string;
  closedate?: string;
  idAccount?: string;
  dealstage: string | null;
}

export const createNewDeals = async (dataProp: DataProps) => {
  const { amount, dealname, closedate, token, idAccount, dealstage } = dataProp;
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
    console.log(data);

    return `Process completed successfully. Deal created.. You can view the details at: https://app.hubspot.com/contacts/${idAccount}/record/deal/${data.id}.
    `;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
    // if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
    //   return "token expired";
    // }
  }
};
