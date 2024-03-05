import { EmailTemplate } from "../../dashboard/components/TemplateEmail/TemplateEmail";
import { Resend } from "resend";
import * as React from "react";
import { NextApiRequest } from "next";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, urlInvite } = await request.json();
  console.log(email, urlInvite ,"send")
  try {
    const { data, error } = await resend.emails.send({
      from: 'max@meethustle.io',
      to: [email],
      subject: "¡Únete al equipo de Hustle Copilot y optimiza tu trabajo en el CRM!",
      react: EmailTemplate({
        firstName: email,
        url: urlInvite,
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
