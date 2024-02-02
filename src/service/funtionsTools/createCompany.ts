interface DataProps {
    token?: string;
    phone?: number;
    name?: string;
    industry?: string;
    idAccount?: string;
    domain:string
    city:string
  }
  
  export const createCompany = async (dataProp: DataProps) => {
    const { phone, name,industry,domain, token, idAccount, city, } = dataProp;
    const url = "https://api.hubapi.com/crm/v3/objects/companies";
  
    const requestBody = {
      properties: {
        name,
        phone,
        domain,
        city,
        industry
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
      const name = data?.properties?.name;
    
    //   return `Proceso completado con éxito. la  empresa  ${name}  se creo correctamente.. Puede ver los detalles acá : https://app.hubspot.com/contacts/${idAccount}/companies/${data.id}.
    //   `;
    return data
    } catch (error: any) {
      return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
      // if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
      //   return "token expired";
      // }
    }
  };
  