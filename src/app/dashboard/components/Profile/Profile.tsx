"use client";
import React, { useEffect } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { supabase } from "@/lib/ClientSupabase";
import { Label } from "../../../components/ui/Label";
import { CiUser } from "react-icons/ci";
import { ClipBoard } from "../Clipboard";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { date } from "zod";

export default function SheetSide() {
  const [users, setUsers] = React.useState<any | []>([]);
  const [inviteCode, setInviteCode] = React.useState<string>("");

  const team = Cookies.get("team");
  const getUser = async () => {
    let { data: dataUsers, error } = await supabase
      .from("users")
      .select("*")
      .eq("id_team", team);

    setUsers(dataUsers);
  };
  const codeTeam = async () => {
    let { data: dataTeam, error } = await supabase
      .from("teams")
      .select("inviteCode")
      .eq("id_team", team);
    if (dataTeam == null) return;
    setInviteCode(dataTeam[0].inviteCode);
  };

  useEffect(() => {
    getUser();
    codeTeam();
  }, []);
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className=" flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700 cursor-pointer">
            <CiUser size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            {/* <SheetDescription>
                Make changes to your profile here. Click save when you re done.
              </SheetDescription> */}
          </SheetHeader>
          <div className="flex justify-center items-start flex-col gap-6 mt-8">
            <div className="flex flex-col justify-center items-start gap-3">
              <Label htmlFor="name" className="text-right">
                Team creator :
              </Label>
              <p className="text-sm font-medium leading-none">
                {/* josecolmenaes02@gmail.com */}
                Creator User
              </p>
              {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <div className="space-y-8">
            <Label htmlFor="name" className="text-right">
              Team
            </Label>
            {users
              ? users.map((user: any) => (
                  <div className="flex items-center" key={user.id_user}>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        guest user
                      </p>
                      <p className="text-sm text-muted-foreground">
                        USER@email.com
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>

          {/* <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose> */}
          <div className=" mt-9">
            {/* <Label>invitation code</Label> */}
            <ClipBoard code={inviteCode} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/registry/new-york/ui/avatar"
