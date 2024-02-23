import { Button } from "@/app/components/ui/Button";
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  url: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  url,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>

    <a href={url}>Comenzar ahora!</a>
  </div>
);
