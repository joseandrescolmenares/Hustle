interface DataProps {
  token?: string;
  amount?: number;
  dealname?: string;
  closedate?: string;
  idAccount?: string;
}

export const createNewDeals = async (dataProp: DataProps) => {
  const { amount, dealname, closedate, token, idAccount } = dataProp;
  const url = "https://api.hubapi.com/crm/v3/objects/deals";

  const requestBody = {
    properties: {
      amount,
      // dealstage,
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

    return `se ha creado con exito, Puedes ver los detalles en el siguiente enlace : https://app.hubspot.com/contacts/${idAccount}/record/0-3/${data.id}`;
  } catch (error: any) {
    if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
      return "token expired";
    }
    return "error, por favor vuelva a intentarlo";
  }
};
