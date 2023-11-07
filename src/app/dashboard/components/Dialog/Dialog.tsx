"use client";

import { useState } from "react";
import Image from "next/image";
import imgBackground from "../../../../../public/background.png";

export default function Dialog() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const hubspotAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID}&scope=crm.lists.read%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.objects.marketing_events.read%20crm.objects.marketing_events.write%20crm.objects.custom.read%20crm.objects.custom.write%20crm.objects.companies.write%20crm.schemas.contacts.read%20crm.objects.feedback_submissions.read%20crm.lists.write%20crm.objects.companies.read%20crm.objects.deals.read%20crm.objects.deals.write%20crm.schemas.companies.read%20crm.schemas.companies.write%20crm.schemas.contacts.write%20crm.schemas.deals.read%20crm.schemas.deals.write%20crm.objects.line_items.read%20crm.objects.line_items.write%20crm.schemas.line_items.read%20crm.objects.goals.read&redirect_uri=${process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI}`;

  
  return (
    <div>
      <Image className="w-full h-screen" src={imgBackground} alt="background" />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur w-full  h-screen">
          <div className="modal-dialog bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
            <div className="modal-content p-4 flex flex-col justify-center items-center gap-4">
              <h1 className="text-2xl font-bold ">Connect your Hubspot</h1>

              <p className=" font-sans">Get the most value from Hustle by connecting your CRM</p>

              <a
                className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bg-customPurple "
                type="button"
                href={hubspotAuthUrl}
              >
                {" "}
                conect Hubspo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
