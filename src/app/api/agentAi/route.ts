import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

import axios from "axios";
import { getSearchContacts } from "@/service/funtionsTools/getSearchContact";

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  const contactName = "n";
  const token =
    "CJ7xz4_UMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFJSABMdmpICOk3nkRsmWTrl6oG-cOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhRQguPktnzwUUpZMtVMb7fyrlRmQUoDbmExUgBaAA";
  const dataProp = { token, contactName };
  const data = await getSearchContacts(dataProp);

  return NextResponse.json({ jose: data });
}
