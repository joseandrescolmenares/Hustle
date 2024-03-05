import { Button } from "@/app/components/ui/Button";
import * as React from "react";

interface EmailTemplateProps {
  firstname: string;
}

export const EmailTemplateOnboarding: React.FC<
  Readonly<EmailTemplateProps>
> = ({ firstname }) => (
  <div>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
      Hola {firstname}
    </h1>
    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      ¡Bienvenido a tu nuevo copiloto para el CRM, Hustle!
    </h2>
    <p className="leading-7 [&:not(:first-child)]:mt-6">
 
      Ahora, en vez de preocuparte por actualizar tu CRM, podrás enfocarte en lo
      más importante: ¡vender! Con Hustle, puedes ejecutar comandos desde
      WhatsApp o Slack para mantener tu CRM actualizado. Por ejemplo, puedes
      crear, asociar, registrar tareas/actividades y mucho más, todo de forma
      rápida y sencilla.
      
     <br/> 
     Saludos, Max & José
    </p>
  </div>
);
