"use client"

import React from "react";
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

let array = ["Contactos", "Etapa", "Fecha de cierre"];

const MainTable = ({ dataOwnerDeals }: any) => {
  return (
    <Table className=" w-full">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Salud</TableHead>
          <TableHead>Cuenta</TableHead>
          <TableHead className="flex justify-center items-center">Razones</TableHead>
          <TableHead>Responsables</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {dataOwnerDeals?.map((deals: any) => (
            <TableRow key={deals.id}>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell >
                {deals?.dealname}
              </TableCell>
              <TableCell className="lex justify-center items-center">
                <div className="flex gap-4 justify-center" >
                {array?.map((el) => (
                  <div key={el}>{el}</div>
                ))}
                </div>
              </TableCell>
              <TableCell>{deals.firstName} {deals.lastName} </TableCell>
              <TableCell>Dectectado</TableCell>
              <TableCell>
              <Link className=" cursor-pointer" href={`/dashboard/${deals?.dealsId}`}> 
                <div className=" ml-3">
                  <CiLogin size={24}/>
                </div>
                </Link>
              </TableCell>
            </TableRow>
           
        ))}
      </TableBody>
    </Table>
  );
};

export default MainTable;
