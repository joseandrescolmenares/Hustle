import { supabase } from "@/lib/ClientSupabase";

const channels = supabase
  .channel("custom-all-channel")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "users" },
    (payload) => {
      const { phoneNumber }: any = payload.new;
      console.log( payload,"nuberr")

      if (payload.new) {
        console.log("estoy en punga");
      }
    }
  )
  .subscribe();
