import { supabase } from "@/lib/ClientSupabase";
import { renewToken } from "../renewToken";

export const renewTokenAgent = async () => {
  const { data, error } = await supabase
    .from("teams")
    .select(
      `hubspotAccount,
      id_integrations (
refresh_token
)`
    )
    .eq("hubspotAccount", 44543727);
  if (data == null) return;

  const { refresh_token }: any = data[0]?.id_integrations;
  console.log(data[0], "data")
  const { hubspotAccount }: any = data[0]?.hubspotAccount;

  if (!refresh_token) return;

  const token = await renewToken(refresh_token);
  return { token, idAccount : hubspotAccount};
};
