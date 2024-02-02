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
import { createCompany } from "@/service/funtionsTools/createCompany";

export async function GET(request: Request) {
  const token =
    "CKHbvMbWMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFEmg4yId82w9Sm-Wy4q3BDJkd6-mOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhRHoSa2uvKfQPQoTdTo-RyYXt-U1koDbmExUgBaAA";

  const props = {
    token,
    phone: 1126336301,
    name: "kiko",
    industry:"",
    idAccount:"",
    domain:"",
    city:""
  };
   const data = await createCompany(props)
  // const jose = await renewTokenAgent("+541126336301")
  // const data = await getSearchContacts(dataProp);
  // const data =await  dealContactAssociation({token})
  // const  data = await getOwners(token)
  // const data = await createActivityNotes(props)
  // const data = await createNewDeals(dataProp);
  // const data = await updateDeal(props);
  // const data = await getStage(token);

  return NextResponse.json({ jose: data });
}
