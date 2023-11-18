"use client";
import { Pagination } from "../Pagination";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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
  const [allDeals, setAllDeals] = useState<any>([]);
  const [lastDealId, setLastDealId] = useState<string | null>("0");
  console.log(allDeals, "state")

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
        const resultDeals = await axios.post(`/api/hubspot/getAllDeals`, {
          lastDealId: "0",
        });
        const data = resultDeals.data;
        console.log(data, "dataa");

        setAllDeals(data.dealsData);
        // if (data?.link !== lastDealId) {
        //   setLastDealId(data?.link);
        // }
      // } catch (error) {
      //   console.error("Error al obtener tratos:", error);
      // }
    };

    // Llamar a la función para obtener tratos
    getDeals();

    // Establecer el componente como desmontado al desmontarse
  }, [lastDealId ]);

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
                    {score(deals.partnerContact).flag}
                  </TableCell>
                  <TableCell>{deals?.dealname}</TableCell>
                  <TableCell className="lex justify-center items-center">
                    <div className="flex gap-4 justify-center ">
                      {score(deals.partnerContact)?.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    {deals.firstName} {deals.lastName}{" "}
                  </TableCell>
                  <TableCell>Dectectado</TableCell>
                  <TableCell>
                    <Link
                      className=" cursor-pointer"
                      href={`/dashboard/${deals?.dealsId}`}
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
