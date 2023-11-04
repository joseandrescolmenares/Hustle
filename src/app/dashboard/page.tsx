"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/ClientSupabase";
import { Dialog } from "./components/Dialog";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = () => {
  const [dataHubspot, setDataHubspot] = useState<boolean>(false);
  // const Cookies = cookies();
  const userId = Cookies.get("userId");

  useEffect(() => {
    const getContactHubspot = async () => {
      let { data, error } = await supabase
        .from("integrations")
        .select("isHubspot")
        .eq("userId", userId);
      if (data == null) return;
      setDataHubspot(data[0]?.isHubspot);
    };

    getContactHubspot();
  }, [userId]);

  if (dataHubspot == null) return;

  return (
    <div className=" w-full">
      {/* {!dataHubspot? <Dialog /> : <div></div>} */}
      <Dialog />
    </div>
  );
};

export default Dashboard;
