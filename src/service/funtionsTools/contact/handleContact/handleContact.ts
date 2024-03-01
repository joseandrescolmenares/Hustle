import { updateContact } from "./updateContact";

export interface PropsContact {
  token?: string;
  idAccount?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  website?: string;
  lifecyclestage?: string;
  contactId?: string;
  jobtitle?: string;
  ownerId?: string;
  propertiesOwnerid?:Promise<string> | string
}

export const handleContact = async (dataProp: PropsContact & { [key: string]: any }) => {
  const {
    phone,
    company,
    website,
    token,
    idAccount,
    email,
    lifecyclestage,
    firstname,
    lastname,
    contactId,
    jobtitle,
    ownerId,
    propertiesOwnerid,
    ...dynamicProps
  } = dataProp;

  if (contactId) {
    return await updateContact(dataProp);
  }
  try {
    const url = "https://api.hubapi.com/crm/v3/objects/contacts";

    const requestBody = {
      properties: {
        email,
        firstname,
        lastname,
        phone,
        company,
        website,
        lifecyclestage,
        jobtitle,
        hubspot_owner_id: ownerId ?  ownerId : propertiesOwnerid,
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
    const name = data?.properties?.firstname;

    console.log(data);

    return `Response: Proceso completado con éxito. el  contact  ${name}  se creo correctamente.. Puede ver los detalles acá [Link]: https://app.hubspot.com/contacts/${idAccount}/contact/${data.id}.
      `;
  } catch (error: any) {
    return "The function encountered an error and couldn't create the new deal. Please try again later. We apologize for the inconvenience.";
    // if (error.response.data.category == "EXPIRED_AUTHENTICATION") {
    //   return "token expired";
    // }
  }
};
