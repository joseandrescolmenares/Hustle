import React, { useState } from "react";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { InputField } from "@/app/onboarding/components/InputField";
import { supabase } from "@/lib/ClientSupabase";
import Cookies from "js-cookie";
import { handleAuthSignup } from "@/app/(auth)/sign-up/page";
import { toast } from "sonner";

const InviteUser = ({ setUsers }: any) => {
  const team = Cookies.get("team");
  const [input, setInput] = useState({
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setInput((prevInput) => ({ ...prevInput, [field]: value }));
  };

  const inviteUser = async () => {
    try {
      const password = input?.phoneNumber;
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
              phoneNumber: input?.phoneNumber,
              emailCrm: input?.email,
            },
          ])

        console.log(dataUser, "invute");
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
      <div className="w-full">
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
      </div>
      <Button onClick={inviteUser}>Send</Button>
    </div>
  );
};

export default InviteUser;
