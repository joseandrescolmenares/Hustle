import axios from "axios";

interface PropsDataContact {
  token: string;
  contactName?: string;
  email?: string;
}
export const getSearchContacts = async (propsDataContact: PropsDataContact) => {
  const { contactName, token, email } = propsDataContact;

  let firstName, lastName;
  let searchEmail = email;

  if (!searchEmail) {
    searchEmail = contactName;
  }
  if (contactName) {
    const [firstNamePart, lastNamePart]: any = contactName?.split(" ");
    firstName = firstNamePart;
    lastName = lastNamePart;
  }

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
              value: `${searchEmail}*`,
            },
          ],
        },
        {
          filters: [
            {
              propertyName: "firstname",
              operator: "EQ",
              value: `${firstName}*`,
            },
            {
              propertyName: "lastname",
              operator: "EQ",
              value: `${lastName}*`,
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

    const resultData = res?.data;
    console.log(resultData, "tes");

    if (resultData?.total === 0) {
      return "No contact found with the specified criteria.";
    }
    if (resultData?.total > 1) {
      return "More than one contact found with this name, please be more specific.";
    }
    const contactId = resultData?.results[0]?.id;
    return `Identificador de contacto obtenido: ${contactId}`;
  } catch (error) {
    console.error("Error creating associations:", error);
    return "No contact found with the specified name or email. Please check your input and try again.";
  }
};
