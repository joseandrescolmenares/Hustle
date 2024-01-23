import { renewToken } from "@/service/renewToken";
import { supabase } from "./ClientSupabase";

export const validateNumber = async (phoneNumber: string) => {
  console.log(phoneNumber, "phoneee");
  const { data, error } = await supabase
    .from("users")
    .select(
      `id_team (
          hubspotAccount,
          id_integrations (
            refresh_token
          )
        )`
    )
    .eq("phoneNumber", phoneNumber);
  if (!data?.length) {
    return {
      validate: {
        message:
          "este numero no esta asociado a ninguna cuenta, Porfavor creé una cuenta en https://meethustle.io/ ",
        status: false,
      },
    };
  }

  console.log(data, error, "error");

  return { validate: { message: "success", status: true } };
};
