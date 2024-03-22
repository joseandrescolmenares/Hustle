// import { supabase } from "@/lib/ClientSupabase";

// import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { NextResponse } from "next/server";
import { sendMessage } from "../../../service/whatsapp/sendMessage";
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
  //   "CMzZp_3gMRIUAAEDUAAA-TIAAED8BwkA4AcAAAQY792eFSD3hJkdKMXiigEyFMZ9vtFvHl3GfAbBUimHDAONX8ivOkEAAABBAAAAAMD_AwAAAAAAAIYAAAAAAAAADAAggI8APgDgOQAAAEAEwP__HwAQ8QMAAID__wMAAAAAAOABAADsH0IUISYRHlWpA67elSem2aVSQqhsCmRKA25hMVIAWgA";

  // const res = await sendMessage({
  //   phoneNumber: "5491126336301",
  //   typeMessage: "text",
  //   messageResponse: `👋👋 Hola Jose

  //   Recordatorio amistoso para que actualices tu CRM 🫠

  //   💡Estos son casos de uso de nuestros usuarios:
  //   -Actualizar variables personalizadas 
  //   -Registrar tareas con fecha y hora para no olvidar ningún seguimiento 
  //   -Registrar minutas de reuniones 
  //   -Hacer cargas masivas (hasta 20 por mensaje)
    
  // Olvídate de que te vuelvan a decir que lo que no está en el CRM no existe 😣
    
  //   ¡Escríbeme y haré todo el trabajo por ti! 😎`,
  // });

  // const data = await postDeal(datat);
  return NextResponse.json({ data: "jose" });
}
// {
//   // "input": "{\"contactId\":\"1201\",\"dealId\":\"17327602555\"}"
// }
