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

import { Cards } from "../Cards";
import { cards } from "@/lib/constants";

const MainTable = () => {
  return (
    <div className="w-full h-screen flex flex-col  items-center b-g justify-center ">
      <h1 className=" scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-32">Choose CRM to start</h1>
      <div className=" w-full h-2/5 flex justify-between gap-9">
        {cards.map((items: any) => (
          <Cards
            key={items.name}
            name={items.name}
            image={items.image}
            link={items.link}
            underConstruction={items.underConstruction}
          />
        ))}

      </div>
    </div>
  );
};

export default MainTable;
