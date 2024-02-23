import React, { useState } from "react";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { InputField } from "@/app/onboarding/components/InputField";
import { supabase } from "@/lib/ClientSupabase";
import Cookies from "js-cookie";

import { Toaster, toast } from "sonner";
import { handleAuthSignup } from "@/app/(auth)/sign-up/handleSignUp";
import axios from "axios";

const InviteUser = ({ setUsers, users }: any) => {
  const team = Cookies.get("team");
  const [input, setInput] = useState({
    email: "",
    // phoneNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setInput((prevInput) => ({ ...prevInput, [field]: value }));
  };

  const inviteUser = async () => {
    try {
      const password = input?.email;
      const registreUser = await handleAuthSignup(input?.email, password);

      if (registreUser?.data?.user?.id) {
        const { data: dataUser } = await supabase
          .from("users")
          .insert([
            {
              id_user: registreUser?.data?.user?.id,
              id_team: team,
              rol: "guest",
              isOnboarding: true,
              correo: input?.email,
              emailCrm: input?.email,
            },
          ])
          .select();
        if (dataUser == null) return;
        console.log(dataUser[0], "invute");
        const email = dataUser[0]?.correo;
        const urlInvite  = `https://wa.me/+525525106749?text=start/%20${dataUser[0]?.codeTeam}`;
        const sendEmail = await axios.post("api/sendEmail", { email, urlInvite  });
        console.log(sendEmail?.data)

        setUsers([...users, dataUser[0]]);
        toast.success("se envio con exito");
      } else {
        toast.error("Error inviting user");
      }
    } catch (error) {
      console.error("Error inviting user:", error);
      toast.error("Error inviting user");
    }
  };

  return (
    <div className="mt-5 w-full flex flex-col justify-center items-center gap-5">
      <Toaster richColors position="top-right" />
      <div className="w-full">
        <InputField
          type="email"
          id="email"
          label="Email CRM"
          placeholder="invite@gmail.com"
          value={input.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("email", e.target.value)
          }
        />
      </div>
      {/* <div className="w-full">
        <InputField
          type="tel"
          id="phoneNumber"
          label="Phone number"
          placeholder="+5491123427602"
          value={input.phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("phoneNumber", e.target.value)
          }
        />
      </div> */}
      <Button onClick={inviteUser}>Send</Button>
    </div>
  );
};

export default InviteUser;
