import axios from "axios";
import { PropsContact } from "./handleContact";

export const updateContact = async (props: PropsContact) => {
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
    ownerId,
    propertiesOwnerid,
    ...dynamicProps
  } = props;

  const url = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;

  const response = await axios.patch(
    url,
    {
      properties: {
        email,
        firstname,
        lastname,
        phone,
        company,
        website,
        lifecyclestage,
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

  return `se actualizo con exitos, lo puedes ver en el siguiente link : https://app.hubspot.com/contacts/${idAccount}/contact/${contactId}`;
};
