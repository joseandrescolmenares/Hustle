
import { redirect } from 'next/navigation';

export default function Home() {
 
    const hubspotAuthUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID}&scope=${process.env.NEXT_PUBLIC_HUBSPOT_SCOPE}&redirect_uri=${process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI}`;
    redirect(hubspotAuthUrl);
}

