import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

import axios from "axios";
import { getSearchContacts } from "@/service/funtionsTools/contact/getSearchContact";
import { createNewDeals } from "@/service/funtionsTools/deals/createDeals";
import { getStage } from "@/service/funtionsTools/deals/getStage";
import { dealContactAssociation } from "@/service/funtionsTools/deals/association/dealContactAssociation";
import { getOwners } from "@/service/funtionsTools/onwer/getOwners";
import { createActivityNotes } from "@/service/funtionsTools/deals/activityDeal/createActivityNotes";
import { getDataCompany } from "@/service/funtionsTools/company/getDataCompany";
import { getDataDeal } from "@/service/funtionsTools/deals/getDataDeal";
import { updateDeal } from "@/service/funtionsTools/deals/updateDeal";
import { createCompany } from "@/service/funtionsTools/company/createCompany";
import { createContact } from "@/service/funtionsTools/contact/createContact";
import { companyContactAssociations } from "@/service/funtionsTools/company/association/companyContact";
import { createtaskDeals } from "@/service/funtionsTools/deals/activityDeal/createTaskDeal";

export async function GET(request: Request) {
  // const token =
  //   "CP7ziZXXMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFFVDLa2TgZZZHTokx3aRNnnUxdUkOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhSUFGZVQO0ItLQIrV_2m3y9sgF_aUoDbmExUgBaAA";

  // const props = {
  //   dealId: 17341710148,
  //   token,
  //   idAccount: "44543727",
  //   messageBody: "Tarea: los invencibles",
  //   time: "2024-02-19T05:00:39.415Z",
  //   status: "NOT_STARTED",
  //   title: "los invencibles",
  //   priority: "MEDIUM",
  //   type: "TODO",
  //   onwerId:""
  // };
  // const data = await createtaskDeals(props);
  // const jose = await renewTokenAgent("+541126336301")
  // const data = await getSearchContacts(dataProp);
  // const data =await  dealContactAssociation({token})
  // const  data = await getOwners(token)
  // const data = await createActivityNotes(props)
  // const data = await createNewDeals(dataProp);
  // const data = await updateDeal(props);
  // const data = await getStage(token);

  return NextResponse.json({ jose: "jose" });
}
