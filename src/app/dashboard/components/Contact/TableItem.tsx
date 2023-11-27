"use client";
import { Pagination } from "../Pagination";
import React, { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/ClientSupabase";
import Cookies from "js-cookie";
import axios from "axios";
import { Icons } from "@/app/components/Icons/IconsAuth/IconsAuth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import { score } from "@/app/ai/score/score";
import { Toaster, toast } from "sonner";

const MainTable = () => {
  const [allDeals, setAllDeals] = useState<any[] | null>([]);
  const [agreementStatus, setAgreementStatus] = useState<boolean>(true);
  const [loandingData, setLoandingData] = useState(true);

  const idIntegrations = Cookies.get("idIntegrations");
  const idTeam = Cookies.get("team");

  useEffect(() => {
    const integrationCompleted = localStorage.getItem("integrationCompleted");
    if (!integrationCompleted) {
      toast.success("Integration completed");
      localStorage.setItem("integrationCompleted", "true");
    }
  }, []);
  useEffect(() => {
    const getDeals = async () => {
      // try {
      setLoandingData(true);
      let { data, error } = await supabase
        .from("integrations")
        .select("dealsAlll,isSlack,webhookUrlSlack")
        .eq("id_integrations", idIntegrations);

      if (data == null) return;
      if (!data[0]?.dealsAlll) {
        const resultDeals = await axios.get(`/api/hubspot/getAllDeals`);
        const deals = resultDeals.data;
        setAllDeals(deals.dealsData);
        setLoandingData(false);

        if (data[0].isSlack) {
          setTimeout(() => {
            if (data == null) return;

            const dataSentAlert = {
              webUrl: data[0].webhookUrlSlack,
            };
            const sentAlert = async () => {
              const alertUrl = await axios.post("api/slack/sentAlert",dataSentAlert);
              const dataAlert = alertUrl.data;
            };
            sentAlert();
          }, 8000);
        }
      } else {
        let { data: dataDeals, error } = await supabase
          .from("deals")
          .select("*")
          .eq("id_team", idTeam);
        setAllDeals(dataDeals);
        setLoandingData(false);
      
        if (!data[0].isSlack) {
          setTimeout(() => {
            if (data == null) return;

            const dataSentAlert = {
              webUrl: data[0].webhookUrlSlack
            };
            const sentAlert = async () => {
              const alertUrl = await axios.post("api/slack/sentAlert",dataSentAlert);
              const dataAlert = alertUrl.data;
              console.log(dataAlert, "alert");
            };
            sentAlert();
          }, 8000);
        }
      }
    };
    getDeals();
  }, []);

  // useEffect(() => {
  //   const sentAlertSlack = async () => {
  //     const { data: dataIntegrations, error: errorIntegrations } =
  //       await supabase
  //         .from("integrations")
  //         .select("isSlack")
  //         .eq("id_integrations", idIntegrations);
  //     if (dataIntegrations == null) return;

  //     // if (dataIntegrations[0].isSlack) {

  //     // }
  //   };
  //   sentAlertSlack();

  // }, []);

  if (!allDeals) return;
  if (loandingData)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-customPurple  border-t-customPurple border-r-blue-300 border-r-2"></div>
      </div>
    );
  return (
    <>
      {" "}
      <div className=" absolute">
        <Toaster richColors position="top-right" />{" "}
      </div>
      <Table className=" w-full">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">Salud</TableHead>
            <TableHead>Cuenta</TableHead>
            <TableHead className="flex justify-center items-center">
              Razones
            </TableHead>
            <TableHead>Responsables</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDeals
            ? allDeals?.map((deals: any) => (
                <TableRow key={deals.id}>
                  <TableCell className="font-medium">
                    {score(deals.dealContacts).flag}
                  </TableCell>
                  <TableCell>
                    <p className="scroll-m-20 text-xl font-semibold tracking-tight">
                      {deals?.dealname}{" "}
                    </p>
                  </TableCell>
                  <TableCell className="lex justify-center items-center">
                    <div className="flex gap-4 justify-center ">
                      <p className="p-2 bg-customPurple text-white rounded-xl ">
                        {" "}
                        {score(deals.dealContacts)?.reason}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{deals.nameOnwer}</TableCell>
                  <TableCell>
                    <p className="p-2 bg-red-500 opacity-50 text-white rounded-xl  w-max">
                      {"Dectectado"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Link
                      className=" cursor-pointer"
                      href={`/dashboard/${deals?.id_deals}`}
                    >
                      <div className=" ml-3">
                        <CiLogin size={24} />
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {/* <Pagination
        setLastDealId={setLastDealId}
        lastDealId={lastDealId}
        setAllDeals={setAllDeals}
      /> */}
    </>
  );
};

export default MainTable;
