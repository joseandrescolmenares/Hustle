import { EmailTemplateOnboarding } from "../../../dashboard/components/TemplateEmail/sentEmailOnboarding/SentEmailOnboarding";
import { Resend } from "resend";
import * as React from "react";
import { NextApiRequest } from "next";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, firstname} = await request.json();
  console.log(firstname,  "send");
  try {
    const { data, error } = await resend.emails.send({
      from: "max@meethustle.io",
      to: [email],
      subject: "Bienvenido a tu nuevo copiloto para el CRM, Hustle Copilot",
      react: EmailTemplateOnboarding({
        firstname: firstname
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
