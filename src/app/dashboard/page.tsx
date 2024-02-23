import React from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dashboard} from "./components/Dashboard";
import { cookies } from "next/headers";
import { TableItem } from "./components/TableDeals";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";

type TeamData = {
  nameTeam: string;
  id_integrations: {
    isSlack: boolean;
    isHubspot: boolean;
  };
};

const dashboard = async () => {
  const Cookies = cookies();
  const idIntegrations = Cookies.get("idIntegrations")?.value;

  let { data: integrations, error } = await supabase
    .from("integrations")
    .select("isHubspot")
    .eq("id_integrations", idIntegrations);
  if (integrations == null) return;

  const isHubspot: any = integrations[0]?.isHubspot;


  // if (!isHubspot) {
  //   return (
  //     <div className=" w-full flex  justify-center items-center ml-7 flex-col">
  //       <TableItem />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full flex  justify-center items-center h-screen">
      <Dashboard  crm="Hubspot"/>
    </div>
  );
  
};
export default dashboard;
