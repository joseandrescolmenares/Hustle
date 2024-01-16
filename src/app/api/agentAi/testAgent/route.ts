import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = "https://api.hubapi.com/crm/v3/objects/deals";

    const requestBody = {
      properties: {
        amount : 0,
        dealname:"jose test",
        dealstage:"",
        closedate:"",
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer CJnR24TRMRIUAAEAUAAA-SIAAED8BwkA4AcgAAQYp_ebFSD3hJkdKMXiigEyFP6VFaNs9c12fCVepOVnSyZZZi_MOj8AAABBAAAAAAAAAAAAAAAAAIYAAAAAAAAAAAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAgAEAAOABAAhCFLHXe1KyEwJG4i_d9O3qS5HC2hILSgNuYTFSAFoA`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json({ok:"secess"})

}