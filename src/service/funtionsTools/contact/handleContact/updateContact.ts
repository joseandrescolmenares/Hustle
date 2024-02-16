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
