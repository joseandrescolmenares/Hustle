"use client";

import { useState } from "react";

export default function Dialog() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const hubspotAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID}&scope=crm.objects.contacts.read&redirect_uri=${process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI}`;

  return (
    <div>
   
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur w-full  h-screen">
          <div className="modal-dialog bg-white rounded-lg shadow-lg w-1/2">
            <div className="modal-content p-4">
              <h1 className="text-2xl font-bold mb-4">Modal de Ejemplo</h1>
              <p>Este es un modal de ejemplo.</p>

              <a
                className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bg-customPurple "
                type="button"
                href={hubspotAuthUrl}
              >
                {" "}
                conect Hubspot
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
