import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

import axios from "axios";
import { getSearchContacts } from "@/service/funtionsTools/getSearchContact";
import { createNewDeals } from "@/service/funtionsTools/createDeals";
import { getStage } from "@/service/funtionsTools/getStage";

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  const closedate = "n";
  const token =
    "CIiQtcPUMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFKAp_z95mf8HNF0shVz9QKUJln1oOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhSOCXISYJXBH-v9O1nRUHKzkk3AaUoDbmExUgBaAA";
  const dataProp = {
    token,
    idAccount: "0",
    closedate: "2024/28/02/2024",
    dealname: "kuil",
    amount: 0,
    dealstage: "closedwon",
  };
  // const data = await getSearchContacts(dataProp);

  // const data = await createNewDeals(dataProp);

  const data = await getStage(token);

  return NextResponse.json({ jose: data });
}
