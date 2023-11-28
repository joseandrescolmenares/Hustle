import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";

const Clipboard = ({ code }: any) => {
  const defaulValue = `https://hustle-beta.vercel.app/dashboard?${code}`
  const [copied, setCopied] = useState(false);
  return (
    <div className=" mt-5 w-full">
      <input className=" outline-none w-full " value={defaulValue} />

      <div className=" mt-6">
        <CopyToClipboard text={defaulValue} onCopy={() => setCopied(true)}>
          <Button>Copy</Button>
        </CopyToClipboard>
      </div>

      {copied ? <span style={{ color: "red" }}>Copied.</span> : null}
    </div>
  );
};

export default Clipboard;
