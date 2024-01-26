import axios from "axios";

interface Props {
  idDeals: string;
  idCompany: string;
  token: string;
}

export const dealBusinessAssociation = async (props: Props) => {
  const { idDeals, idCompany, token } = props;
  console.log("esto es el id del la empresaa ", idDeals);
  const url = `https://api.hubapi.com/crm-associations/v1/associations`;

  const response = await axios.put(
    url,
    {
      fromObjectId: `${idDeals}`,
      toObjectId: `${idCompany}`,
      category: "HUBSPOT_DEFINED",
      definitionId: 5,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return "se ha creado con exitos";
};
