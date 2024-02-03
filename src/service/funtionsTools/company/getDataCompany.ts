import axios from "axios";

interface DataProp {
  token: string;
  nameCompany: string;
}

export const getDataCompany = async (dataProp: DataProp) => {
  const { nameCompany, token } = dataProp;
  console.log(nameCompany, "estoy es el nomnre de la empres");
  const url = "https://api.hubapi.com/crm/v3/objects/companies/search";

  const data = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "name",
            operator: "EQ",
            value: `${nameCompany}*`,
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

  if (dataResult.total === 0) {
    return "No company found with the specified criteria.";
  }
  if (dataResult.total > 1) {
    return "More than one company found with this name, please be more specific.";
  }

  const idCompany = dataResult.results[0]?.id;
  const name = dataResult.results[0]?.properties?.name;

  return `Empresa encontrada con id: ${idCompany} y Nombre: ${name}`;
};
