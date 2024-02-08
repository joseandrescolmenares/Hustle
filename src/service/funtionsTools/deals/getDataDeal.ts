import axios from "axios";

interface PropsDataContact {
  token: string;
  dealName: string;
}
export const getDataDeal = async (props: PropsDataContact) => {
  const { dealName, token } = props;

  try {
    const url = "https://api.hubapi.com/crm/v3/objects/deal/search";

    const data = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: "dealname",
              operator: "EQ",
              value: `${dealName}*`,
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

    const resultData = res.data;
    console.log(resultData);
    if (resultData.total === 0) {
      return "No deal found with the specified criteria.";
    }
    if (resultData.total > 1) {
      return "More than one deal found with this name, please be more specific.";
    }
    const id = resultData.results[0].id;
    const name = resultData.results[0].properties.dealname

    return `Se ha recuperado correctamente el ID del negocio: ${id} y el nombre: ${name}. Listo para continuar con el procesamiento.`;
  } catch (error) {
    console.error("Error creating associations:", error);
    return "No deal found with the specified name  Please check your input and try again.";
  }
};
