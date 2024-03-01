import axios from "axios";
import { DataProps } from "./handleCompany";

export const updateCompany = async (dataProp: DataProps & { [key: string]: any }) => {
  const {
    phone,
    name,
    industry,
    domain,
    token,
    idAccount,
    city,
    companyId,
    ownerId,
    propertiesOwnerid,
    ...dynamicProps
  } = dataProp;

  const url = `https://api.hubapi.com/crm/v3/objects/companies/${companyId}`;

  const response = await axios.patch(
    url,
    {
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
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return `se actualizo con exitos, lo puedes ver en el siguiente link : https://app.hubspot.com/contacts/${idAccount}/companies/${companyId}`;
};
