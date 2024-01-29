import axios from "axios";

interface Props {
  idDeals: string;
  idCompany: string;
  token: string;
  idAccoun: string;
}

export const dealCompanyAssociation = async (props: Props) => {
  try {
    const { idDeals, idCompany, token, idAccoun } = props;
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

    return `Associations created successfully. You can view the details at: https://app.hubspot.com/contacts/${idAccoun}/record/deal/${idDeals}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    throw new Error("Error creating associations. Please try again later.");
  }
};
