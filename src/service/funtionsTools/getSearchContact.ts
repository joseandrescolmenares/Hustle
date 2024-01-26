import axios from "axios";

interface PropsDataContact {
  token: string;
  contactName: string;
}
export const getSearchContacts = async (propsDataContact: PropsDataContact) => {
  const { contactName, token } = propsDataContact;
  const url = "https://api.hubapi.com/crm/v3/objects/contacts/search";

  const data = {
    filterGroup: [
      {
        filters: [
          {
            propertyName: "firstname",
            operator: "EQ",
            value: `${contactName}*`,
          },
        ],
      },
    ],
    filterGroups: [
      {
        filters: [
          {
            propertyName: "firstname",
            operator: "EQ",
            value: `${contactName}*`,
          },
          {
            propertyName: "email",
            operator: "CONTAINS_TOKEN",
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

  const dataurl = res.data;

  return dataurl;
};
