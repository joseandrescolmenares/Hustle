import { supabase } from "@/lib/ClientSupabase";
import { renewToken } from "../renewToken";

export const renewTokenAgent = async () => {
  const { data, error } = await supabase
    .from("teams")
    .select(
      `id_integrations (
refresh_token
)`
    )
    .eq("hubspotAccount", 44543727);
  if (data == null) return;

  const { refresh_token }: any = data[0]?.id_integrations;

  if (!refresh_token) return;

  const token = await renewToken(refresh_token);
  return token;
};
