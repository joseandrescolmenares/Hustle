import { Icons } from "@/app/components/Icons/IconsAuth/IconsAuth";
import { supabase } from "@/lib/ClientSupabase";
import { cookies } from "next/headers";

const bannerSlack = async () => {
  const ulrSlack = `https://slack.com/oauth/v2/authorize?scope=incoming-webhook,channels:read,commands&client_id=${process.env.SLACK_CLIENT_ID}`;

  const Cookies = cookies();
  const userId = Cookies.get("userId")?.value;
  let { data, error } = await supabase
    .from("integrations")
    .select("isSlack")
    .eq("userId", userId);
  if (data == null) return;
  let dataIsSlack = data[0]?.isSlack;

  return (
    <>
  {!dataIsSlack ? (
  <div className="w-11/12 h-11 bg-customPurple absolute z-5 flex justify-center items-center ml-4 mb-6 ">
    <div className="flex gap-5">
      <p className="text-white">
        connect Hustle to your slack for alerts
      </p>{" "}
      <a className="text-white flex gap-1 cursor-pointer z-10" href={ulrSlack}>
        <Icons.slack />
        slack
      </a>
    </div>
  </div>
) : null}

    </>
  );
};

export default bannerSlack;
