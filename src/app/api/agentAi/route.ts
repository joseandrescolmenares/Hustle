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
import { dealContactAssociation } from "@/service/funtionsTools/dealContactAssociation";

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  const closedate = "n";
  const token =
    "COb_k8_UMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFI6nKXQ-CCIf6Eo_caQHozRrcoXMOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhTrFLmJYEFFnGcHtfVpUvAX_NOvLEoDbmExUgBaAA";
  const dataProp = {
    token,
    contactName: "max"
  };
  const data = await getSearchContacts(dataProp);
  // const data =await  dealContactAssociation({token})

  // const data = await createNewDeals(dataProp);

  // const data = await getStage(token);

  return NextResponse.json({ jose: data });
}
