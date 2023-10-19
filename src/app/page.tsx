'use client' 
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID)
    // Redirige al usuario a la página de autorización de HubSpot
    const hubspotAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID}&scope=${process.env.NEXT_PUBLIC_HUBSPOT_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI}`;
    window.location.href = hubspotAuthUrl;
  }, []);

  return (
    <div>
      <p>Redirigiendo a HubSpot para autorización...</p>
    </div>
  );
}


