import React from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
import { TableItem } from "./components/Contact";
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
  const teamId = Cookies.get("team")?.value;

  let { data: teams, error } = await supabase
    .from("teams")
    .select(
      `
nameTeam,
id_integrations (
  isSlack,
  isHubspot
)
`
    )
    .eq("id_team", teamId);

  console.log(teams, "data");
  if (teams == null) return;

  const { isHubspot }: any = teams[0]?.id_integrations;

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
