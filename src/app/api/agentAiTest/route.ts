// import { supabase } from "@/lib/ClientSupabase";

import { handleDeal } from "@/service/funtionsTools/deals/handleDeal/handleDeal";
import { handleOwners } from "@/service/funtionsTools/owner/handleOwner";
// import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { transcribeAudio } from "@/service/whatsapp/transcribeAudio/transcribeAudio";
import { NextResponse } from "next/server";
// import { renewToken } from "@/service/renewToken";
// import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
// import { getAllCompanies } from "@/service/hubspot/company/getAllCompanies";
// import { renewTokenAgent } from "@/service/funtionsTools/renewTokenAgent";

// import axios from "axios";
// import { getSearchContacts } from "@/service/funtionsTools/contact/getSearchContact";

// import { getStage } from "@/service/funtionsTools/deals/getStage";
// import { dealContactAssociation } from "@/service/funtionsTools/deals/association/dealContactAssociation";
// import { getOwners } from "@/service/funtionsTools/owner/getOwners";
// import { createActivityNotes } from "@/service/funtionsTools/deals/activityDeal/createActivityNotes";
// import { getDataCompany } from "@/service/funtionsTools/company/getDataCompany";
// import { getDataDeal } from "@/service/funtionsTools/deals/getDataDeal";
// import { updateDeal } from "@/service/funtionsTools/deals/handleDeal/updateDeal";

// import { companyContactAssociations } from "@/service/funtionsTools/company/association/companyContact";
// import { createtaskDeals } from "@/service/funtionsTools/deals/activityDeal/createTaskDeal";

// import { Contact } from "lucide-react";
// import { handleCall } from "@/service/funtionsTools/handleCall/handleCall";
// import { handleComunications } from "@/service/funtionsTools/handleComunications/handleComunications";
// import { handleMeeting } from "@/service/funtionsTools/handleMeeting/handleMeeting";

export async function GET(request: Request) {
  // const token =
  //   "CL3bz4ffMRIUAAEDUAAA-TIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFD66qw3BeUEgq74c0DnBpC0h5r8LOkEAAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgOQAAAEAEwP__HwAQ8QMAAID__wMAAAAAAOABAADsH0IUYmXYgB6v8B27Ve4nvvEceMchsvxKA25hMVIAWgA";


  //   const data = await getIdDeals(token)
  return NextResponse.json({ data: "jose" });
}
// {
//   // "input": "{\"contactId\":\"1201\",\"dealId\":\"17327602555\"}"
// }
