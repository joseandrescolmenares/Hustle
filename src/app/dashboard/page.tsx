import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
import { getAllContact } from "@/service/getAllContact";
import { getAllCompanies } from "@/service/company/getAllCompanies";
import { TableItem } from "./components/Contact";

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
  // renewToken()
  if (dataHubspot) {
    let result = await getAllCompanies();
    return (
      <div className=" w-full flex  justify-center items-center">
        {/* <a href={ulrSlack}>slack</a>  */}

        <TableItem allCompanies={result} />
        {/* {result &&
            result.results.map((item: React.Key | null | undefined): any => (
              <p key={item}>{item.properties.name}</p>
            ))} */}
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
