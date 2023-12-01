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
  const [notes, setNotes] = React.useState<string[]>([]);
  const [slackData, setSlackData] = useState("")
  // const [countScore, setCountScore] = useState({
  //   redFlags: 0,
  //   greenFlags: 0,
  //   neutralFlags: 0,
  // });

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
      let { data, error } = await supabase
        .from("integrations")
        .select("dealsAlll,isSlack,webhookUrlSlack")
        .eq("id_integrations", idIntegrations);

      if (data == null) return;
      if (data[0]?.isSlack) {
        setSlackData(data[0]?.webhookUrlSlack)
      }
      if (!data[0]?.dealsAlll) {
        const resultDeals = await axios.get(`/api/hubspot/getAllDeals`);
        const deals = resultDeals.data;
        setAllDeals(deals.dealsData);
        setLoandingData(false);

      } else {
        let { data: dataDeals, error } = await supabase
          .from("deals")
          .select("*")
          .eq("id_team", idTeam);
        setAllDeals(dataDeals);
        setLoandingData(false);
      }
    };

    getDeals();
  }, []);

  useEffect(() => {
    // const sentAlertSlack = async () => {
    //   const { data: dataIntegrations, error: errorIntegrations } =
    //     await supabase
    //       .from("integrations")
    //       .select("isSlack")
    //       .eq("id_integrations", idIntegrations);
    //   if (dataIntegrations == null) return;

    //   // if (dataIntegrations[0].isSlack) {

    //   // }
    // };
    // sentAlertSlack();

    // Reemplaza esto con tus datos reales

    // Contadores para cada tipo de bandera
    let redFlags = 0;
    let greenFlags = 0;
    let neutralFlags = 0;

    if(allDeals){ 

    allDeals.forEach((deal) => {
      const result = score({
        numberOfContacts: deal?.dealContacts,
        numberOfSalesActivities: deal?.num_contacted_notes,
      });

      // Incrementa el contador correspondiente según la bandera
      if (result.flag === "🔴") {
        redFlags++;
      } else if (result.flag === "🟢") {
        greenFlags++;
      } else if (result.flag === "🟠") {
        neutralFlags++;
      }
    });
  }

  setTimeout(() => {
    if(slackData && allDeals?.length){ 
   
    const dataSentAlert = {
      webUrl: slackData,
      redFlags,
      greenFlags,
      neutralFlags,
    };
    const sentAlert = async () => {
      const alertUrl = await axios.post(
        "api/slack/sentAlert",
        dataSentAlert
      );
      const dataAlert = alertUrl.data;
      console.log(dataAlert,'slack')
    };
    sentAlert();
  }
    
  }, 12000);

    // console.log("Red Flags:", redFlags);
    // console.log("Green Flags:", greenFlags);
    // console.log("Neutral Flags:", neutralFlags);
  }, [allDeals,slackData]);

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
          {allDeals?.map((deal) => {
            // Asegúrate de pasar los valores correctos a la función score
            const evaluation = score({
              numberOfContacts: deal?.dealContacts,
              numberOfSalesActivities: deal?.num_contacted_notes,
            });

            return (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">
                  {evaluation.flag} {/* Muestra la bandera como un emoji */}
                </TableCell>
                <TableCell>
                  <p className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {deal?.dealname}{" "}
                  </p>
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <div className="flex gap-4 justify-center">
                    {/* Aquí puedes mostrar las razones cortas o detalladas */}
                    {evaluation.shortReason.map((el, i): any => (
                      <div className="flex" key={i}>
                        <p className="p-2 bg-customPurple text-white rounded-xl ">
                          {el}
                        </p>
                      </div>
                    ))}
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
            );
          })}
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
