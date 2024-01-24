import { renewToken } from "@/service/renewToken";
import { supabase } from "./ClientSupabase";

export const validateNumber = async (phoneNumber: string) => {
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
          "Este número no está asociado a ninguna cuenta. Te invitamos a crear una cuenta en https://meethustle.io/ para acceder a todas las funciones y beneficios. ¡Es rápido y sencillo! Una vez registrado, podrás disfrutar de todas las herramientas y servicios que ofrecemos. ¡Bienvenido a MeetHustle!  ",
        status: false,
      },
    };
  }


  return { validate: { message: "success", status: true } };
};
