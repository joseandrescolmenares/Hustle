import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
import { getContact } from "@/service/getContact";
import { renewToken } from "@/service/renewToken";

const dashboard = async () => {
  const ulrSlack = `https://slack.com/oauth/v2/authorize?scope=incoming-webhook,channels:read,commands&client_id=${process.env.SLACK_CLIENT_ID}`;
  const Cookies = cookies();
  const userId = Cookies.get("userId")?.value;
  const cookieToken = Cookies.get("accessTokenHubspot")?.value;

  let { data, error } = await supabase
    .from("integrations")
    .select("isHubspot")
    .eq("userId", userId);
  if (data == null) return;
  let dataHubspot = data[0]?.isHubspot;

  if (dataHubspot) {
    let result = await getContact(cookieToken);
    console.log(result)
    return (
      <div className=" w-full flex  justify-center items-center">
        <a href={ulrSlack}>slack</a>
        <div>
         {/* {result && result.results.map((item: React.Key | null | undefined):any => <p key={item}>{item.properties.firstname}</p>)} */}
        </div>
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
