import { supabase } from "@/lib/ClientSupabase";
import { renewToken } from "../renewToken";

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

  if (!refresh_token || !hubspotAccount) return;

  const token = await renewToken(refresh_token);
  console.log(token, "token");

  return { token, idAccount: hubspotAccount };
};
