import axios from "axios";
import { url } from "inspector";
import { fileSync, tmpNameSync } from "tmp";
import * as fs from "fs";
import { createClient } from "@deepgram/sdk";

function createTemporaryFile(buffer: Buffer): string {
  console.log(buffer, "bufer");
  const tmpFile = fileSync({ postfix: ".wav" });
  fs.writeFileSync(tmpFile.fd, buffer);
  return tmpFile.name;
}

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

  if (result) {
    const url = result?.url;

    const downloadUrl = await axios.get(url, {
      headers,
    });

    const resultDownload = downloadUrl?.data;
    if (resultDownload) {
      const resultBuffer = createTemporaryFile(resultDownload);

      console.log(resultBuffer, "dosss");

      const transcribeFile = async () => {
        // STEP 1: Create a Deepgram client using the API key
        const deepgram = createClient(
          "bbf55ab9bf360ce5753680a4aa26c0fca02aaf4b"
        );

        // STEP 2: Call the transcribeFile method with the audio payload and options
        const { result, error } =
          await deepgram.listen.prerecorded.transcribeFile(
            // path to the audio file
            fs.readFileSync(resultBuffer),
            // STEP 3: Configure Deepgram options for audio analysis
            {
              model: "nova-2",
              smart_format: true,
            }
          );

        if (error) throw error;
        // STEP 4: Print the results
        if (!error) console.dir(result, { depth: null });
      };

      transcribeFile();
    }
  }

  return;
};
