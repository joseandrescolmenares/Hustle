import axios from "axios";

export const getDataCompany = async (
  token: string,
  valueNameCompany: string
) => {
  const url = "https://api.hubapi.com/crm/v3/objects/companies/search";

  const data = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "name",
            operator: "EQ",
            value: `${valueNameCompany}*`,
          },
        ],
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await axios.post(url, data, { headers });

  const dataResult = res.data;
  const idCompany = dataResult.results[0].id;
  const nameCompany = dataResult.results[0].properties.name;


  return `el id de empresa es : ${idCompany} y el nombre : ${nameCompany}`;
};
