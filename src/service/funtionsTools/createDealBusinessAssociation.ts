import axios from "axios";
interface Props {
  idDeal: string;
  idCompany: string;
  token: string;
}

export const dealBusinessAssociation = async (props: Props) => {
  const { idDeal, idCompany, token } = props;
  const url = `https://api.hubapi.com/crm-associations/v1/associations`;

  const response = await axios.put(
    url,
    {
      fromObjectId: `${idDeal}`,
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
