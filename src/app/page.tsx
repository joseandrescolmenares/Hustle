import { redirect } from "next/navigation";
import { score } from "./ai/score/score";

export default function Home() {
  //   const dealExample = {
  //     numberOfContacts: 3,
  //     numberOfSalesActivities:5,

  // };
  // console.log(score(dealExample))

  redirect("https://meethustle.io/");
  // return <div> jose test</div>
}
