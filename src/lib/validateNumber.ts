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

  if (data == null) return;

  if (!data?.length) {
    return {
      validate: {
        message:
          "Este número no está asociado a ninguna cuenta. Te invitamos a crear una cuenta en https://meethustle.io/ para acceder a todas las funciones y beneficios. ¡Es rápido y sencillo! Una vez registrado, podrás disfrutar de todas las herramientas y servicios que ofrecemos. ¡Bienvenido a MeetHustle!  ",
        status: false,
      },
    };
  }

  console.log(data[0].id_team, "perrrsoo");
  const hubspotAccount = data[0]?.id_team?.hubspotAccount;
  console.log(hubspotAccount, "huspo");
  if (!hubspotAccount) {
    return {  
      validate: {
        message: "por favor, agregue una cuenta de Husbpot",
        status: false,
      },
    };
  }


  return { validate: { message: "success", status: true } };
};
