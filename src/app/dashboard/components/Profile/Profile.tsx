"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { supabase } from "@/lib/ClientSupabase";
import { Label } from "../../../components/ui/Label";
import { CiUser } from "react-icons/ci";
import { ClipBoard } from "../Clipboard";
import { TbBrandWhatsapp } from "react-icons/tb";
import { Switch } from "@/app/components/ui/switch";
import { HiPaperAirplane } from "react-icons/hi2";
import { FiGrid ,FiUser} from "react-icons/fi"

// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

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
import { sendMessage } from "@/service/whatsapp/sendMessage";

export default function SheetSide() {
  const [users, setUsers] = React.useState<any | []>([]);
  const [inviteCode, setInviteCode] = React.useState<string>("");
  const [openDialog, setDialog] = useState(false);
  const [numberPhone, setNumberPhoone] = useState("");
  const [userId, setUserId] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [checked, setChecked] = useState(false);



  // const channels = supabase
  //   .channel("custom-all-channel")
  //   .on(
  //     "postgres_changes",
  //     { event: "*", schema: "public", table: "users", },
  //     (payload) => {
  //       const { phoneNumber }: any = payload.new;
  //       const messageResponse =
  //         "¡Hola! Soy Hustle, tu asistente personal 🚀. ¿Listo para mantener tu CRM al día con solo un mensaje por WhatsApp? ¡Vamos allá! 💬✨";
  //       const dataMessage = { phoneNumber, messageResponse };
  //       console.log("cagaooo");

  //       if (phoneNumber) {
  
  //         sendMessage(dataMessage);
  //       }
  //     }
  //   )
  //   .subscribe();
  const handleSwitch = (value: boolean, idUser: string) => {
    setDialog(value);
    setUserId(idUser);
  };
  const handleSendNumberPhone = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ phoneNumber: numberPhone })
      .eq("id_user", userId);
    setConfetti(true);
    setDialog(false);
    setChecked(true);

    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  };

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

  // useEffect(() => {
  //   getUser();
  //   codeTeam();
  // }, []);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className=" flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700 cursor-pointer">
          <FiUser size={24}/>
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
            <div className="flex justify-between w-full items-end">
              <div className="flex flex-col justify-center items-start gap-3">
                <Label htmlFor="name" className="text-right">
                  Team creator :
                </Label>
                <p className="text-sm font-medium leading-none p-2 bg-slate-200/50 rounded-sm">
                  {
                    users.find(
                      (userGuest: { rol: string }): any =>
                        userGuest.rol == "creator"
                    )?.correo
                  }
                </p>
                {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
              </div>
              <div className="flex gap-2">
                <Switch checked={true} />
                <TbBrandWhatsapp size={27} color="#36E93C" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <div className="space-y-8">
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
                    <Switch
                      checked={user.phoneNumber || checked}
                      onCheckedChange={(value) =>
                        handleSwitch(value, user.id_user)
                      }
                    />

                    <TbBrandWhatsapp size={27} color="#36E93C" />
                  </div>
                </div>
              ))}
          </div>
          <>
            {confetti && (
              <Confetti
                width={window.innerWidth || 300}
                height={window.innerHeight || 200}
                tweenDuration={3000}
                initialVelocityY={20}
              />
            )}
          </>

          <Dialog open={openDialog}>
            <DialogTrigger asChild></DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>add phone number </DialogTitle>
                <DialogDescription>
                  add the phone number to start updating the CRM from whatsApp.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    placeholder="+54-222-300"
                    onChange={(e) => setNumberPhoone(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={handleSendNumberPhone}
                >
                  <HiPaperAirplane size={20} />
                  {/* <CopyIcon className="h-4 w-4" /> */}
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDialog(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
