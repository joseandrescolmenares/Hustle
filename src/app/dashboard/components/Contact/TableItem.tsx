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

  const idIntegrations = Cookies.get("idIntegrations");
  const idTeam = Cookies.get("team")

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
        .select("dealsAlll")
        .eq("id_integrations", idIntegrations);
      if (data == null) return;
      if (!data[0]?.dealsAlll) {
        const resultDeals = await axios.get(`/api/hubspot/getAllDeals`);
        const deals = resultDeals.data;
        setAllDeals(deals.dealsData);
      } else {
        let { data: dataDeals, error } = await supabase
          .from("deals")
          .select("*")
          .eq("id_team", idTeam);
        console.log(dataDeals, "data", error, "error");
        setAllDeals(dataDeals);
      }
    };

    getDeals();
  }, []);

  if (!allDeals) return;
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
                  <TableCell>{deals?.dealname}</TableCell>
                  <TableCell className="lex justify-center items-center">
                    <div className="flex gap-4 justify-center ">
                      {score(deals.dealContacts)?.reason}
                    </div>
                  </TableCell>
                  <TableCell>{deals.nameOnwer}</TableCell>
                  <TableCell>{"Dectectado"}</TableCell>
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
