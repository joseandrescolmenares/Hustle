import { supabase } from "@/lib/ClientSupabase";
import { renewToken } from "../renewToken";
import { sendMessage } from "../whatsapp/sendMessage";

export const renewTokenAgent = async (phoneNumber: string) => {
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

  console.log(data, error, "error");

  if (!data?.length) {
    return { numberUser: [] };
  }

  const { id_integrations, hubspotAccount }: any = data[0]?.id_team;
  const { refresh_token }: any = id_integrations || {};
  console.log(refresh_token, "token_refresh");


  if (!refresh_token || !hubspotAccount) {
    const props = { phoneNumber, messageResponse: "Hubo un error  relacionado a la cuenta de Hubspot por favor comunicarse con el equipo de meethustle.io" };
    return sendMessage(props);

  }

  const token = await renewToken(refresh_token,phoneNumber);

  return { token, idAccount: hubspotAccount };
};
