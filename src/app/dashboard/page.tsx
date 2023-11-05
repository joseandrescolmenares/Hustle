// "use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
import { cookies } from "next/headers";
// import Cookies from "js-cookie";
import axios from "axios";

const dashboard = async () => {
  // const [dataHubspot, setDataHubspot] = useState<boolean>(false);
  const Cookies = cookies();
  const userId = Cookies.get("userId")?.value;

  let { data, error } = await supabase
    .from("integrations")
    .select("isHubspot")
    .eq("userId", userId);

  if (data == null) return;
  let dataHubspot = data[0].isHubspot;
  return (
    <div className=" w-full flex  justify-center items-center">
      {!dataHubspot ? <Dialog /> : <div></div>}
    </div>
  );
};

export default dashboard;
