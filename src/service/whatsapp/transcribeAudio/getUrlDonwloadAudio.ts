import axios from "axios";


export const getUrlDonwloadAudio = async (token: string, id: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const data = await axios.get(`https://graph.facebook.com/v19.0/${id}/`, {
    headers,
  });
  const result = data?.data;
  const url = result.url;
  const downloadUrl = await axios.get(url, {
    headers,
    responseType: "arraybuffer",
  });
  return downloadUrl.data
};
