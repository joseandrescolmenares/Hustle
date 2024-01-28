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

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  const closedate = "n";
  const token =
    "CKbU4vTUMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFHGQiYpLUAzI0yuDhofvuKtN3xU5Oj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhSP6B18_ApHxyKYFEgHBzav0Bjq60oDbmExUgBaAA";
  const dataProp = {
    token,
    contactName: "max"
  };
  // const data = await getSearchContacts(dataProp);
  // const data =await  dealContactAssociation({token})
  // const  data = await getOwners(token)
  const props = {token, onwerId: "", messageNotesBody:"holaa donde estoyy"}
  const data = await createActivityNotes(props)

  // const data = await createNewDeals(dataProp);

  // const data = await getStage(token);

  return NextResponse.json({ jose: data });
}
