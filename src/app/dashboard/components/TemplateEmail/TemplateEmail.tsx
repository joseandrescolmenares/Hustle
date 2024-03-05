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
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
      ¡Hola {firstName}!
    </h1>

    <p>
      ¡Te han invitado a probar Hustle Copilot!, Descubre cómo
      Hustle Copilot puede facilitar nuestra vida laboral en el CRM!
      <br />
      Saludos.
    </p>
    <a href={url}>Comenzar ahora!</a>
  </div>
);
