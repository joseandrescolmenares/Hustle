import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const Cookies = cookies();
  const cookieToken = Cookies.get("accessTokenHubspot")?.value;

  const headers = {
    Authorization: `Bearer ${cookieToken}`,
    "Content-Type": "application/json",
  };
  const apiUrl = "https://api.hubapi.com/crm/v3/objects/contacts";

  const responseData: any = await axios.get(apiUrl, { headers });

    console.log(responseData)
  

  return NextResponse.json(responseData?.data);
}
