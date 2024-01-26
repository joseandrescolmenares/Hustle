import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

import axios from "axios";
import { getSearchContacts } from "@/service/funtionsTools/getSearchContact";
import { createNewDeals } from "@/service/funtionsTools/createDeals";

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  const closedate = "n";
  const token =
    "CO7YtZ7UMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFDMLEyqTdbts3veD1vNz_M5VA88lOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhRRxbpegWOxolI4UbUEBt8Ei5fwLUoDbmExUgBaAA";
  const dataProp = {
    token,
    idAccount: "0",
    closedate: "2024/02/28",
    dealname: "kuil",
    amount: 0,
    // dealstage: "closedwon",
  };
  // const data = await getSearchContacts(dataProp);

  const data = await createNewDeals(dataProp);

  return NextResponse.json({ jose: data });
}
