// import { supabase } from "@/lib/ClientSupabase";
// import { sendMessage } from "@/service/whatsapp/sendMessage";

// const channels = supabase
// .channel("custom-all-channel")
// .on(
//   "postgres_changes",
//   { event: "*", schema: "public", table: "users" },
//   (payload) => {
//     const { phoneNumber }: any = payload.new;
//     const messageResponse =
//       "¡Hola! Soy Hustle, tu asistente personal 🚀. ¿Listo para mantener tu CRM al día con solo un mensaje por WhatsApp? ¡Vamos allá! 💬✨";
//     const dataMessage = { phoneNumber, messageResponse };

//     if (phoneNumber) {
//       sendMessage(dataMessage);
//     }
//   }
// )
// .subscribe();