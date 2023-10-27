import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
  

const MainTable = () => {
  return (
    <Table >
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Business</TableHead>
        <TableHead>Value</TableHead>
        <TableHead>Stage</TableHead>
        <TableHead >Closing Date</TableHead>
        <TableHead >Next Step</TableHead>
        <TableHead >MRR</TableHead>
        <TableHead >Tasks</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell >$250.00</TableCell>
      </TableRow>
    </TableBody>
   
  </Table>
  
  )
}

export default MainTable
