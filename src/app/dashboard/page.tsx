import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";

import { TableItem } from "./components/Contact";
import { asyncFetchDataOwner } from "@/service/fetchDataOwner";

const dashboard = async () => {
  const ulrSlack = `https://slack.com/oauth/v2/authorize?scope=incoming-webhook,channels:read,commands&client_id=${process.env.SLACK_CLIENT_ID}`;
  const Cookies = cookies();
  const userId = Cookies.get("userId")?.value;
  let { data, error } = await supabase
    .from("integrations")
    .select("isHubspot")
    .eq("userId", userId);
  if (data == null) return;
  let dataHubspot = data[0]?.isHubspot;

  if (dataHubspot) {
    const dataOwnerDeals = await asyncFetchDataOwner();
    return (
      <div className=" w-full flex  justify-center items-center ml-7">
        {/* <a href={ulrSlack}>slack</a>  */}
        <TableItem dataOwnerDeals={dataOwnerDeals} />
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
