import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";

import { TableItem } from "./components/Contact";
import { asyncFetchDataOwner } from "@/service/fetchDataOwner";

const dashboard = async () => {
 
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
    console.log(dataOwnerDeals, "data")
    return (
      <div className=" w-full flex  justify-center items-center ml-7">
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
