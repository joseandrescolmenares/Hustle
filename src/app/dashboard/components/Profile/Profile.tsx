"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Switch } from "@/app/components/ui/switch";
import { FiUser } from "react-icons/fi";
import { HiPaperAirplane } from "react-icons/hi2";
import { TbBrandWhatsapp } from "react-icons/tb";
import Cookies from "js-cookie";
import { supabase } from "@/lib/ClientSupabase";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/app/components/ui/Input";
import { InviteUser } from "../InviteUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function SheetSide() {
  const [invite, setInvite] = useState(false);
  const [users, setUsers] = React.useState<any | []>([]);
  const team = Cookies.get("team");
  const getUser = async () => {
    let { data: dataUsers, error } = await supabase
      .from("users")
      .select("*")
      .eq("id_team", team);

    setUsers(dataUsers);
  };
  console.log(users, "user");

  useEffect(() => {
    getUser();
  }, []);

  const creatoUser = users?.find(
    (userGuest: { rol: string }): any => userGuest.rol == "creator"
  )?.correo;

  const  guesttUser =users?.find(
    (userGuest: { rol: string }): any => userGuest.rol == "guest"
  )?.correo;
  

  return (
    <div>
      <Sheet onOpenChange={() => setInvite(false)}>
        <SheetTrigger asChild>
          <button className=" flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700 cursor-pointer">
            <FiUser size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <div className="flex justify-center items-start flex-col gap-6 mt-8">
            <div className="flex justify-between w-full items-end">
              <div className="flex flex-col justify-center items-start gap-3">
                <p className="text-sm font-medium leading-none p-2 bg-slate-200/50 rounded-sm">
                  Team creator
                </p>
              </div>
              <p className="text-sm font-medium leading-none p-2 bg-slate-200/50 rounded-sm">
                {" "}
                {creatoUser}
              </p>
              <div className="flex gap-2">
                {/* <Switch checked={true} /> */}
                {/* <TbBrandWhatsapp size={27} color="#36E93C" /> */}
              </div>
            </div>
          </div>
          <div className="space-y-8 mt-8 overflow-scroll max-h-72">
            <Label htmlFor="name" className="text-right">
              Team
            </Label>
            {users
              .filter(
                (userGuest: { rol: string }): any => userGuest?.rol == "guest"
              )
              .map((user: any) => (
                <div
                  className="flex items-center justify-between"
                  key={user.id_user}
                >
                  <div className="flex justify-center items-center ">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>
                        {user.correo.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 ">
                      <p className="text-sm font-medium leading-none m-0">
                        {user?.rol}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.correo}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <TbBrandWhatsapp size={27} color="#36E93C" />
                  </div>
                </div>
              ))}
            {!guesttUser ? <p>No guest</p> : null}
          </div>
          <div className="mt-9">
            {invite ? <InviteUser setUsers={setUsers} users={users} /> : null}
            <Button onClick={() => setInvite(true)}>invite </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

