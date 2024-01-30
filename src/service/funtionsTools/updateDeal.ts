import axios from "axios";

interface PropData {
    amount: number
    dealname: string 
    dealstage: string 
    closedate: string 
    dealId: string;
    token: string;
    idAccount: string
}

export const updateDeal = async (props: PropData) => {
  const { dealId, amount, token, closedate, dealname, dealstage,idAccount} = props;

  const url = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

  const response = await axios.patch(
    url,
    {
      "properties": {
        amount: `${amount}`,
        closedate: `${closedate}`,
        dealname: `${dealname}`,
        dealstage: `${dealstage}`,
        // properties_amount: `${}`
        // properties_amount: `${}`
        // properties_amount: `${}`
        // properties_amount: `${}`
      },
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  

  return `se creo cambio con exitos, lo puedes ver aca : https://app.hubspot.com/contacts/${idAccount}/deal/${dealId}`
};
