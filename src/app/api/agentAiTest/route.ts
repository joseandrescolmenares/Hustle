// import { supabase } from "@/lib/ClientSupabase";
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
  //   "CPujpq_aMRIUAAEDUAAA-TIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFPfTVCQY90RluqMk6cKNb4faXaQ0OkEAAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgOQAAAEAEwP__HwAQ8QMAAID__wMAAAAAAOABAADsH0IU4Q-43pjg7t-tFhyG75Q7m3NWvXlKA25hMVIAWgA";

  // const props = {
  //   token,
  //   // idObject: "19044137052",
  //   // object: "empresa",
  //   // title:"esto es una prueba de reunio ",
  //   // textBody:"resuniom",
  //   // idAccount:"44543727",
  //   // meetingNotes:"",
  //   // timeStamp:""
  // };
  // const id = "jose";
  // const res = await transcribeAudio(id);

  // const email = "joseandrescolmenares02@gmail.com"

  //   const data = await getOwners(token, email);
  // // // const jose = await renewTokenAgent("+541126336301")
  // // const data = await contactDealAssociation(props);
  // // const data =await  dealContactAssociation({token})
  // // const  data = await getOwners(token)
  // // const data = await createActivityNotes(props)
  // // const data = await createNewDeals(dataProp);
  // const data = await handleCall(props);
  // const data = await getStage(token);

  // const  data = contactDealAssociation(props)
  return NextResponse.json({ data: "jose" });
}
// {
//   // "input": "{\"contactId\":\"1201\",\"dealId\":\"17327602555\"}"
// }
