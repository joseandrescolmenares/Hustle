import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
import { getIdNotes } from "@/service/hubspot/activity/notes/getIdNotes";
import { AddnNotes } from "../components/AddNotes";
import { supabase } from "@/lib/ClientSupabase";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";
// const { JSDOM } = require("jsdom");

type NoteData = {
  id: string;
  properties: {
    hs_note_body: string;
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  // function extractTextFromHTML(htmlString: any) {
  //   const dom = new JSDOM(htmlString);
  //   return dom.window.document.body.textContent || "";
  // }

  const { data, error } = await supabase
    .from("deals")
    .select(
      "scoreFlag,scoreReason,score,scoreDetails,amount, hs_lastmodifieddate,nameOnwer, dealname,idOwner,last_activity"
    )
    .eq("id_deals", params.id);

  console.log(data);

  // const getNotesData = async () => {
  //   if (!dataDeals.associations) return [];

  //   const notesIds = dataDeals?.associations?.notes?.results.map(
  //     (notes: any) => notes.id
  //   );

  //   const notesData = await Promise.all(
  //     notesIds.map((id: string) => getIdNotes(id))
  //   );

  //   return notesData;
  // };

  // const allNotesData = await getNotesData();
  if (data == null) return;

  return (
    <div className="w-full flex  h-full ">
      <div className=" ml-6 w-3/5 flex flex-col gap-10 mt-14">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Detalle del caso
        </h1>
        <div className="w-full shadow-md border-slate-200 p-4 rounded-md  flex flex-col gap-4">
          <div className="flex gap-1">
            <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              {" "}
              {data[0].scoreFlag}{" "}
            </h2>
            <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0 ">
              {data[0].dealname ? data[0].dealname : "no asignado"}
            </h2>
          </div>
          <div className="flex gap-4">
            <h2 className="p-4  bg-slate-200 text-black rounded-xl ">
              {data[0].amount ? `$ ${data[0].amount}` : "---"}
            </h2>
          </div>
        </div>
        <div className="shadow-md border-slate-200 p-4 rounded-md  w-full flex flex-col gap-4">
          <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Razones
          </h2>
          <div className="flex gap-4 flex-col ">
            <div className="flex gap-3">
              {data[0].scoreReason
                .split(", ")
                .map(
                  (
                    el:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | PromiseLikeOfReactNode
                      | null
                      | undefined,
                    i: Key | null | undefined
                  ): any => (
                    <p
                      className="p-2 bg-customPurple text-white rounded-xl flex justify-center "
                      key={i}
                    >
                      {el}
                    </p>
                  )
                )}
            </div>
            <p className="p-4 bg-customPurple text-white rounded-xl ">
              {data[0].scoreDetails}
            </p>
          </div>
        </div>
        <AddnNotes idOwner={data[0].idOwner} idDeals={params.id} />
      </div>
      <div className="mt-20 flex justify-start items-center shadow-lg border-slate-200  p-2 rounded-md  flex-col w-5/12 h-3/5 ml-8">
        <div className=" pl-3 flex  flex-col h-full">
          <div className="flex w-full justify-between">
            <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              propietario
            </h2>
            <p className="p-4  bg-slate-200 text-black rounded-xl ">
              {data[0].nameOnwer ? ` ${data[0].nameOnwer} ` : "no asignado"}
            </p>
          </div>
          <div className=" mt-8 flex flex-col w-full justify-between items-center h-full ">
            <div className="flex justify-between w-full gap-8">
              <p>Estado del caso </p>
              <p className="p-2  bg-slate-200 text-black rounded-xl ">
                detectado
              </p>
            </div>
            <div className="flex justify-between  w-full gap-8">
              <p> Severidad </p>
              <p className="p-2  bg-slate-200 text-black rounded-xl ">Alta</p>
            </div>
            <div className="flex justify-between w-full gap-8">
              <p> Ultima Interacción</p>
              <p className="p-2  bg-slate-200 text-black rounded-xl l">
                {data[0]?.last_activity ? data[0]?.last_activity : "---"}
              </p>
            </div>
            <div className="flex justify-between gap-8 w-full">
              {" "}
              <p>Última actualización</p>
              <p className="p-2  bg-slate-200 text-black rounded-xl ">
                {data[0].hs_lastmodifieddate}
              </p>
            </div>
            <div> </div>
          </div>
        </div>
      </div>
    </div>
  );
}
