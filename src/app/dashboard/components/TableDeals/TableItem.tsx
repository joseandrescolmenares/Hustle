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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import { score } from "@/app/ai/score/score";
import { Toaster, toast } from "sonner";
import { Value } from "@radix-ui/react-select";

const MainTable = () => {
  const [allDeals, setAllDeals] = useState<any[] | null>([]);
  const [filteredDeals, setFilteredDeals] = useState<any[] | null>([]);
  const [alertReloading, setAlertReloading] = useState<boolean>(false);
  const [loandingData, setLoandingData] = useState(true);
  const [notes, setNotes] = React.useState<string[]>([]);
  const [slackData, setSlackData] = useState("");

  const idIntegrations = Cookies.get("idIntegrations");
  const idTeam = Cookies.get("team");

  const handleFilterChange = (value: string) => {
    const resultFilter: any = filteredDeals?.filter((deal) => {
      if (value === "risk") {
        return deal.score <= 3;
      } else if (value === "neutral") {
        return deal.score > 3 && deal.score < 5;
      } else if (value === "opportunity") {
        return deal.score > 5;
      } else if (value == "all") {
        return true;
      }
    });
    setAllDeals(resultFilter);
  };

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
      let { data, error } = await supabase
        .from("integrations")
        .select("dealsAlll,isSlack,webhookUrlSlack,alert_reloading")
        .eq("id_integrations", idIntegrations);

      if (data == null) return;
      if (data[0]?.isSlack) {
        setSlackData(data[0]?.webhookUrlSlack);
        setAlertReloading(data[0]?.alert_reloading);
      }
      if (!data[0]?.dealsAlll) {
        const resultDeals = await axios.get(`/api/hubspot/getAllDeals`);
        const deals = resultDeals.data;

        setAllDeals(deals.dealsData);
        setFilteredDeals(deals.dealsData);
        setLoandingData(false);
      } else {
        let { data: dataDeals, error } = await supabase
          .from("deals")
          .select("*")
          .eq("id_team", idTeam);
        setAllDeals(dataDeals);
        setFilteredDeals(dataDeals);
        setLoandingData(false);
      }
    };

    getDeals();
  }, []);

  const setAlertSlack = async () => {
    const { data: dataSlack, error: errorSlack } = await supabase
      .from("integrations")
      .update({
        alert_reloading: false,
      })
      .eq("id_integrations", idIntegrations)
      .select();
    if (dataSlack == null) return;

    return { data: dataSlack[0].alert_reloading, errorSlack };
  };

  useEffect(() => {
    const sentAlert = async () => {
      try {
        let redFlags = 0;
        let greenFlags = 0;
        let neutralFlags = 0;

        allDeals?.forEach((el) => {
          if (el.score < 3) {
            redFlags++;
          } else if (el.score > 5) {
            greenFlags++;
          } else {
            neutralFlags++;
          }
        });

        const data = {
          webUrl: slackData,
          redFlags: redFlags,
          greenFlags: greenFlags,
          neutralFlags: neutralFlags,
        };

        const alertSlack = await axios.post("api/slack/sentAlert", data);
        const result = alertSlack?.data;

        const resltDbSlack = await setAlertSlack();
        console.log(resltDbSlack, "slackF");
      } catch (error) {
        console.error("Error sending alert to Slack:");
      }
    };
    if (alertReloading) {
      setTimeout(() => {
        sentAlert();
      }, 20000);
    }
  }, [allDeals]);

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
      <div className="flex w-full justify-start mt-16 mb-0">
        {/* <div className="flex w-full justify-start  mb-0">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Revenue Alerts
        </h1>
        </div> */}
        <Select onValueChange={(value) => handleFilterChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Cases" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cases</SelectItem>
            <SelectItem value="risk">🔴 Risk</SelectItem>
            <SelectItem value="neutral">🟠 Neutral</SelectItem>
            <SelectItem value="opportunity">🟢 Opportunity</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
          {allDeals?.map((deal) => (
            // Asegúrate de pasar los valores correctos a la función score

            <TableRow key={deal.id}>
              <TableCell className="font-medium">
                {deal.scoreFlag} {/* Muestra la bandera como un emoji */}
              </TableCell>
              <TableCell>
                <p className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {deal?.dealname}{" "}
                </p>
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <div className="flex gap-4 justify-center">
                  {/* Aquí puedes mostrar las razones cortas o detalladas */}
                  {deal.scoreReason
                    .split(", ")
                    .map(
                      (
                        el:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | React.PromiseLikeOfReactNode
                          | null
                          | undefined,
                        i: React.Key | null | undefined
                      ) => (
                        <div className="flex" key={i}>
                          <p className="p-2 bg-customPurple text-white rounded-xl ">
                            {el}
                          </p>
                        </div>
                      )
                    )}
                </div>
              </TableCell>
              <TableCell>{deal.nameOnwer}</TableCell>
              <TableCell>
                <p
                  className={`p-2 ${
                    notes.length ? "bg-orange-300" : "bg-red-500 opacity-50"
                  } text-white rounded-xl w-max`}
                >
                  {"Detectado"}
                </p>
              </TableCell>
              <TableCell>
                <Link
                  className="cursor-pointer"
                  href={`/dashboard/${deal?.id_deals}`}
                >
                  <div className="ml-3">
                    <CiLogin size={24} />
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          ))}
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
