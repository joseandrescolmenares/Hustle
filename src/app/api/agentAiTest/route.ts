import { supabase } from "@/lib/ClientSupabase";
import { NextResponse } from "next/server";
import { renewToken } from "@/service/renewToken";
import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

import axios from "axios";
import { getSearchContacts } from "@/service/funtionsTools/contact/getSearchContact";

import { getStage } from "@/service/funtionsTools/deals/getStage";
import { dealContactAssociation } from "@/service/funtionsTools/deals/association/dealContactAssociation";
import { getOwners } from "@/service/funtionsTools/onwer/getOwners";
import { createActivityNotes } from "@/service/funtionsTools/deals/activityDeal/createActivityNotes";
import { getDataCompany } from "@/service/funtionsTools/company/getDataCompany";
import { getDataDeal } from "@/service/funtionsTools/deals/getDataDeal";
import { updateDeal } from "@/service/funtionsTools/deals/updateDeal";

import { companyContactAssociations } from "@/service/funtionsTools/company/association/companyContact";
import { createtaskDeals } from "@/service/funtionsTools/deals/activityDeal/createTaskDeal";

import { Contact } from "lucide-react";
import { handleCall } from "@/service/funtionsTools/handleCall";

export async function GET(request: Request) {
  // const token = "CLuAkbfYMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFFI-XDKcuUli4JtRMa8R8e_dGTGZOkEAAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABAADsH0IUnl72-iGvPb9a0dzsV3oZOEyPCwtKA25hMVIAWgA";

  // const props = {
  //   token,
  //   fromObjectType:"calls",
  //     fromObjectId:"sssd",
  //     toObjectId:"",
  //     toObjectType:""

  // };


  // // // const data = await createtaskDeals(props);
  // // // const jose = await renewTokenAgent("+541126336301")
  // // const data = await contactDealAssociation(props);
  // // const data =await  dealContactAssociation({token})
  // // const  data = await getOwners(token)
  // // const data = await createActivityNotes(props)
  // // const data = await createNewDeals(dataProp);
  // const data = await handleCall(props);
  // const data = await getStage(token);

  // const  data = contactDealAssociation(props)
  return NextResponse.json({ jose: "jose" });
}
// {
//   // "input": "{\"contactId\":\"1201\",\"dealId\":\"17327602555\"}"
// }
