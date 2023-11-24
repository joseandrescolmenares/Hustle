import React from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
import { TableItem } from "./components/Contact";


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

  if (isHubspot) {
    return (
      <div className=" w-full flex  justify-center items-center ml-7 flex-col">
        <TableItem />
      </div>
    );
  }

  return (
    <div className="w-full flex  justify-center items-center">
      <Dialog />
    </div>
  );
};
export default dashboard;
