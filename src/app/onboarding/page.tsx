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
import { InputField } from "./components/InputField";

export default function Onboarding() {
  const router = useRouter();
  const [loandingData, setLoandingData] = React.useState(false);
  const [inputTeam, setInputTeam] = React.useState({
    nameCompany: "",
    firstname: "",
    phone: "",
    organizationSize: "",
    crmName: "",
  });

  console.log(inputTeam);

  const handleInputChange = (field: string, value: string) => {
    setInputTeam({ ...inputTeam, [field]: value });
  };

  const handlePlanChange = (value: string) => {
    handleInputChange("statusAccount", value);
  };

  const handleCreateTeam = async () => {
    try {
      const cleanedData = {
        nameCompany: inputTeam?.nameCompany.trim(),
        firstname: inputTeam.firstname.trim(),
        phone: inputTeam.phone.trim(),
        organizationSize: inputTeam.organizationSize.trim(),
        crmName: inputTeam.crmName.trim(),
      };
      setLoandingData(true);
      const data = await axios.post("/api/supabase/createTeam", cleanedData);
      const result = data?.data;

      if (result) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error);
    }
  };

  // const handleGuestLink = async () => {
  //   try {
  //     const dataLink = {
  //       link: guestLink,
  //     };
  //     setLoandingData(true);
  //     const data = await axios.post("/api/supabase/joinTeam", dataLink);
  //     const result = data?.data;

  //     if (result) {
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     console.error("Error al crear el equipo:", error);
  //   }
  // };

  return (
    <>
      {loandingData ? (
        <div className="flex justify-center items-center mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-customPurple  border-t-customPurple border-r-blue-300 border-r-2"></div>
        </div>
      ) : (
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Organization Details</DialogTitle>
              <DialogDescription>
                Add crucial information for efficient management of products and
                clients.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-4 py-2 pb-4">
                  <InputField
                    type="text"
                    id="nameCompany"
                    label="Company name"
                    placeholder="Hustle"
                    value={inputTeam.nameCompany}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("nameCompany", e.target.value)
                    }
                  />
                  <InputField
                    type="text"
                    id="firstname"
                    label="First Name"
                    placeholder="Max Velasco"
                    value={inputTeam.firstname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("firstname", e.target.value)
                    }
                  />
                  <InputField
                    type="text"
                    id="phone"
                    label="Phone number"
                    placeholder="+54 911 190 230 01"
                    value={inputTeam.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("phone", e.target.value)
                    }
                  />
                  <InputField
                    type="text"
                    id="crmName"
                    label="What CRM do you use?*"
                    placeholder="Hubspot"
                    value={inputTeam.crmName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("crmName", e.target.value)
                    }
                  />
                  <InputField
                    type="number"
                    id="organizationSize"
                    label="How many sales representatives work in your company?"
                    placeholder="10"
                    value={inputTeam.organizationSize}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("organizationSize", e.target.value)
                    }
                  />
                </div>
                {/* <div className="space-y-2">
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
                </div> */}
              </div>
              <DialogFooter className="border-b border-gray-400 rounded-md px-4 py-2">
                {/* <Button variant="outline">Cancel</Button> */}
                <Button type="submit" onClick={handleCreateTeam}>
                  Continue
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
