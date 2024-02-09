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
import { getOwners } from "@/service/funtionsTools/owner/getOwners";
import { createActivityNotes } from "@/service/funtionsTools/deals/activityDeal/createActivityNotes";
import { getDataCompany } from "@/service/funtionsTools/company/getDataCompany";
import { getDataDeal } from "@/service/funtionsTools/deals/getDataDeal";
import { updateDeal } from "@/service/funtionsTools/deals/handleDeal/updateDeal";

import { companyContactAssociations } from "@/service/funtionsTools/company/association/companyContact";
import { createtaskDeals } from "@/service/funtionsTools/deals/activityDeal/createTaskDeal";

import { Contact } from "lucide-react";
import { handleCall } from "@/service/funtionsTools/handleCall/handleCall";

export async function GET(request: Request) {
  // const token = "COL-sM7YMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFK8rJTFTn1NGrxRlkoBOY5GIpFCCOkEAAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABAADsH0IUojJaWbFSnXVG2Pz5B2uGvhpzzwtKA25hMVIAWgA";

  // const props = {
  //   token,
  //   contactName:"andres@meethustle.",
  //   email:""
  // };


  // const data = await getSearchContacts(props);
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
