import { NextResponse } from "next/server";

export async function GET(request: Request) {
     const requestBody = await request.json();
     console.log(requestBody,"body")

    return NextResponse.json({wha: " event"})
}
