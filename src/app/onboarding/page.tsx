"use client";

import * as React from "react";
import { supabase } from "@/lib/ClientSupabase";
import { useRouter } from "next/navigation";

import { Button } from "../components/ui/Button";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function TeamSwitcher() {
  const router = useRouter();
  const [inputTeam, setInputTeam] = React.useState({
    nameTeam: "",
    statusAccount: "free",
  });

  const [guestLink, setGuestLink] = React.useState("");

  const handleCreateTeam = async () => {
    try {
      const cleanedData = {
        nameTeam: inputTeam?.nameTeam?.trim(),
        statusAccount: inputTeam?.statusAccount?.trim(),
      };
  
      const data = await axios.post("/api/supabase/db/createTeam", cleanedData);
      const result = data?.data;
  
      if (result) {
     
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error)
    }
  };
  

  const handleGuestLink = async (e: any) => {};
  return (
    <>
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>
              Add a new team to manage products and customers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team name</Label>
                <Input
                  id="name"
                  placeholder="Meta"
                  value={inputTeam.nameTeam}
                  onChange={(e) =>
                    setInputTeam({ ...inputTeam, nameTeam: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Subscription plan</Label>
                <Select
                  onValueChange={(value) =>
                    setInputTeam({ ...inputTeam, statusAccount: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">
                      <span className="font-medium">Free</span> -{" "}
                      <span className="text-muted-foreground">
                        Trial for two weeks
                      </span>
                    </SelectItem>
                    <SelectItem value="pro">
                      <span className="font-medium">Pro</span> -{" "}
                      <span className="text-muted-foreground">
                        $9/month per user
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="border-b border-gray-400 rounded-md px-4 py-2">
              {/* <Button variant="outline">Cancel</Button> */}
              <Button type="submit" onClick={handleCreateTeam}>
                Continue
              </Button>
            </DialogFooter>
            <div className="space-y-2 mt-6 mb-5">
              <Label htmlFor="name">
                Join a team with the invitation link here.{" "}
                <span className=" text-lg">👇</span>
              </Label>
              <div className="flex gap-3">
                <Input
                  id="name"
                  placeholder="https://www.Hustle.com/meta?codigo=ABCDEFGHIJKLM"
                />
                <Button>enviar</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
