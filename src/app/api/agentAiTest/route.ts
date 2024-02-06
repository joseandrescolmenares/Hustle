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
import { contactDealAssociation } from "@/service/funtionsTools/contact/association/contactDealAssociation";

export async function GET(request: Request) {
  // const token =
  //   "CMuVstvXMRIUAAEDUAAA-SIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFMLFdhM_udCOrgBbtn813SAnkCIxOj0AAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgMQAAAAAEwP__HwAQ8QMAAID__wMAAAAAAOABQhTt18UuhJlfsJcAlOYprgqTnCiwJ0oDbmExUgBaAA";

  // const props = {
  //   idContact:"1201",
  //   idDeal:"17327602555",
  //   token,
  //   idAccount: "44543727",
 
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

  // const  data = contactDealAssociation(props)
  return NextResponse.json({ jose: "jose" });
}
// {
//   // "input": "{\"contactId\":\"1201\",\"dealId\":\"17327602555\"}"
// }