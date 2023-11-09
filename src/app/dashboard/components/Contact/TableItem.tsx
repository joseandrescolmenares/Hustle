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

const MainTable = ({ allCompanies }: any) => {
  console.log(allCompanies, "al");
  return (
    <Table className=" w-full">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[130px]">Salud</TableHead>
          <TableHead>Cuenta</TableHead>
          <TableHead>Razones</TableHead>
          <TableHead>Responsables</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allCompanies.results.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="w-[270px]">
                {item?.properties?.name}
              </TableCell>
              <TableCell>
                {array.map((el) => (
                  <div key={el}>{el}</div>
                ))}
              </TableCell>
              <TableCell>Max Velasco</TableCell>
              <TableCell>Dectectado</TableCell>
              <TableCell>
              <Link className=" cursor-pointer"  href={`/dashboard/${item?.id}`}> 
                <div className=" ml-3">
                  <CiLogin />
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
