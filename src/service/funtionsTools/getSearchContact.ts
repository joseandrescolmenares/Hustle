import axios from "axios";

interface PropsDataContact {
  token: string;
  contactName: string;
}
export const getSearchContacts = async (propsDataContact: PropsDataContact) => {
  const { contactName, token } = propsDataContact;
  const url = "https://api.hubapi.com/crm/v3/objects/contacts/search";
  console.log(contactName)

  const data = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: "firstname",
            operator: "EQ",
            value: `${contactName}*`,
          },
         
        ],
     
      },
      {
        filters: [
         
          {
            propertyName: "email",
            operator: "EQ",
            value: `${contactName}*`,
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
  const contactId = resultData.results[0].id
  // const  name = resultData.results[0].properties

  return `el id del contacto  es : ${contactId}`;
};
