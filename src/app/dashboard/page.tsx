
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
import { getContact } from "@/service/getContact";
import { renewToken } from "@/service/renewToken";

const dashboard = async () => {
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
    return (
      <div className=" w-full flex  justify-center items-center">
     
        <div>
          <p>{result?.results[0].properties.firstname}</p>
          <p>{result?.results[0].properties.lastname}</p>
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
