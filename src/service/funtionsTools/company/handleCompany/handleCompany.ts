import { updateCompany } from "./updateCompany";

export interface DataProps {
  token?: string;
  phone?: number;
  name?: string;
  industry?: string;
  idAccount?: string;
  domain: string;
  city: string;
  companyId?: string;
  propertiesOwnerid?: Promise<string> | string;
  ownerId?: string;
}

export const handleCompany = async (dataProp: DataProps) => {
  const {
    phone,
    name,
    industry,
    domain,
    token,
    idAccount,
    city,
    companyId,
    propertiesOwnerid,
    ownerId,
    ...dynamicProps
  } = dataProp;

  if (companyId) {
    return await updateCompany(dataProp);
  }

  console.log(dynamicProps, "Dynamic props");

  const url = "https://api.hubapi.com/crm/v3/objects/companies";

  const requestBody = {
    properties: {
      name,
      phone,
      domain,
      city,
      industry,
      hubspot_owner_id: ownerId ? ownerId : propertiesOwnerid,
      ...Object.entries(dynamicProps).reduce((acc, [key, value]) => {
        if (value !== "") {
          acc[key as keyof typeof dynamicProps] = value;
        }
        return acc;
      }, {} as { [key: string]: any }),
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
      if(!data?.id) return `The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.`
    console.log(data);

    return `Proceso completado con éxito. la  empresa  ${name}  se creo correctamente.. Puede ver los detalles acá : https://app.hubspot.com/contacts/${idAccount}/companies/${data?.id}.
      `;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
   
  }
};
