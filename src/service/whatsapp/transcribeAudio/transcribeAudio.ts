import axios from "axios";
import { fileSync } from "tmp";
import * as fs from "fs";
import { createClient } from "@deepgram/sdk";
import { getUrlDonwloadAudio } from "./getUrlDonwloadAudio";
import { createTemporaryFile } from "./createTemporaryFile";

export const transcribeAudio = async (
  id: string
): Promise<any> => {
  const token = process.env.WHATSAPP_TOKEN || "";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const resultDownload = await getUrlDonwloadAudio(token, id);
    if (resultDownload) {
      const resultBuffer = createTemporaryFile(resultDownload);

      const transcribeFile = async () => {
        const apikey = process.env.DEEPGRAM_API_KEY || "";
        const deepgram = createClient(apikey);

        const { result, error } =
          await deepgram.listen.prerecorded.transcribeFile(
            fs.readFileSync(resultBuffer),
            {
              model: "nova-2",
              language: "es",
              smart_format: true,
            }
          );

        if (error) throw error;

        const transcript: string =
          result?.results?.channels?.[0]?.alternatives?.[0]?.transcript;
        return transcript;
      };

      return transcribeFile();
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
