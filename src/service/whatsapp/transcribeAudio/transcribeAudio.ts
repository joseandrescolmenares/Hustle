import axios from "axios";
import { url } from "inspector";
import { fileSync } from "tmp";
import * as fs from "fs";
import { createClient } from "@deepgram/sdk";

export const transcribeAudio = async (id: string) => {
  const token = process.env.WHATSAPP_TOKEN;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const data = await axios.get(`https://graph.facebook.com/v19.0/${id}/`, {
    headers,
  });

  const result = data?.data;

  const dataBody = {
    url: result?.url,
  };

  const downloadUrl = await axios.post("http://localhost:3001/transcribeAudio",dataBody, { headers });
  const resultDownload = downloadUrl.data;

  console.log(resultDownload,"dosss")

 
  return;
};
