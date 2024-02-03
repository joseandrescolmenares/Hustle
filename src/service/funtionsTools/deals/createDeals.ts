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
    const name = data?.properties?.dealname;
  
    return `Proceso completado con éxito. el  negocio ${name}  se creo correctamente. Puede ver los detalles acá : https://app.hubspot.com/contacts/${idAccount}/deal/${data.id}.
    `;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
   
  }
};
