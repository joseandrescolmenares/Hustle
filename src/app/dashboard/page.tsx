"use client";

import { MainTable } from "./components/Contact";

const dashboard = () => {
  const hubspotAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID}&scope=crm.objects.contacts.read&redirect_uri=${process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI}`;

  return (
    <div className=" w-full">
      {/* <MainTable /> */}
      <a className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bg-customPurple " type="button" href={hubspotAuthUrl}>
        {" "}
        conect Hubspot
      </a>
    </div>
  );
};

export default dashboard;
