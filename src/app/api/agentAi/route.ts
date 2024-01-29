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

export async function GET(request: Request) {
  // const jose = await renewTokenAgent("+541126336301")
  // const closedate = "n";
  // const token =
  //   "CO-izJvVMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFFNOOp6bBpQoBf1QFGRNxH0ntudNOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhQ8TiVjG2IZwNLKr4cZpRrNoURpUUoDbmExUgBaAA";
  // const dataProp = {
  //   token,
  //   contactName: "n"
  // };
  // const data = await getSearchContacts(dataProp);
  // const data =await  dealContactAssociation({token})
  // const  data = await getOwners(token)
  // const props = {token, nameCompany: "molina"}
  // const data = await createActivityNotes(props)

  // const data = await createNewDeals(dataProp);


  // const  data = await getDataCompany(props)
  // const data = await getStage(token);

  return NextResponse.json({ jose:"jose" });
}
