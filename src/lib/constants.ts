export const cards = [
  {
    name: "Hubspot",
    image: "/husbpot.webp",
    link: ` https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID}&redirect_uri=https://hustle-beta.vercel.app/api/hubspot/oauth-callback&scope=oauth%20crm.lists.read%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.objects.custom.read%20crm.objects.custom.write%20crm.objects.companies.write%20crm.schemas.contacts.read%20crm.lists.write%20crm.objects.companies.read%20crm.objects.deals.read%20crm.objects.deals.write%20crm.schemas.companies.read%20crm.schemas.companies.write%20crm.schemas.contacts.write%20crm.schemas.deals.read%20crm.schemas.deals.write%20crm.objects.owners.read` 
    
   ,
    underConstruction: false,
  },

  {
    name: "Salesforce",
    image: "/saleforce.png",
    link: "",
    underConstruction: true,
  },
  {
    name: "Pipedrive",
    image: "/pipedrive.png",
    link: "",
    underConstruction: true,
  },
  { name: "otros", image: "/otro.png", link: "", underConstruction: true },
];
