import axios from "axios";
import { DataProps } from "./handleCompany";

export const updateCompany = async (dataProp: DataProps) => {
  const { phone, name, industry, domain, token, idAccount, city ,companyId} = dataProp;

 

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
