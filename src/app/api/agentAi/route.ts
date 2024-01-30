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
import { getOwners } from "@/service/funtionsTools/getOwners";
import { createActivityNotes } from "@/service/funtionsTools/createActivityNotes";
import { getDataCompany } from "@/service/funtionsTools/getDataCompany";
import { getDataDeal } from "@/service/funtionsTools/getDataDeal";
import { updateDeal } from "@/service/funtionsTools/updateDeal";

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  // const closedate = "n";
  const token =
    "CMntpbrVMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFNPx0TVT2QoQwts1kdkUv1jYx_BjOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhTmiQagc6AwDwSZwrlaMdiJNIcAG0oDbmExUgBaAA";
  // const dataProp = {
  //   token,
  //   contactName: "n"
  // };
  // const data = await getSearchContacts(dataProp);
  // const data =await  dealContactAssociation({token})
  // const  data = await getOwners(token)
  const props = {
    dealId: "17219101813",
    token,
    amount: "3333",
    dealstage: "",
    dealname: "max",
    closedate: "",
  };
  // const data = await createActivityNotes(props)

  // const data = await createNewDeals(dataProp);

  // const data = await updateDeal(props);
  // const data = await getStage(token);

  return NextResponse.json({ jose: "jodse"});
}
