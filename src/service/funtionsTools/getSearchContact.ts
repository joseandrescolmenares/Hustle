import axios from "axios";

interface PropsDataContact {
  token: string;
  contactName: string;
}
export const getSearchContacts = async (propsDataContact: PropsDataContact) => {
  const { contactName, token } = propsDataContact;

  try {
    const url = "https://api.hubapi.com/crm/v3/objects/contacts/search";

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
    console.log(resultData)
    if (resultData.total === 0) {
      return "No contact found with the specified criteria.";
    }
    if (resultData.total > 1) {
      return "More than one contact found with this name, please be more specific.";
    }
    const contactId = resultData.results[0].id;
    // const name = resultData.results[0].properties;

    return `Successfully obtained contact id: ${contactId}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    return "No contact found with the specified name or email. Please check your input and try again.";
  }
};
