import axios from "axios";

axios;
export const getOwners = async (token: string) => {
  const url = `https://api.hubapi.com/crm/v3/owners`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const result = await axios.get(url, { headers });
  const data = result?.data;
  return data;
};
