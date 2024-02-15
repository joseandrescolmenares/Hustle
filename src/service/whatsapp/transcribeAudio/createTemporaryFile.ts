import { fileSync } from "tmp";
import * as fs from "fs";

export function createTemporaryFile(buffer: Buffer): string {
  const tmpFile = fileSync({ postfix: ".mp3" });
  fs.writeFileSync(tmpFile.fd, buffer);
  return tmpFile.name;
}
