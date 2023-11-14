import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";
import { score } from "@/app/ai/score/score";
import { Input } from "@/app/components/ui/Input";
import { getIdNotes } from "@/service/hubspot/activity/notes/getIdNotes";

type NoteData = {
  id: string;
  properties: {
    hs_note_body: string;
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  let array = [
    "Fecha de cierre: Vencida",
    "Etapa: 3 meses sin cambia",
    "Contacto: Solo 2 Contactos asociados",
  ];
  let arrayProperties = ["$38 200", "Procurement", "Mexico", "FinTech"];
  const dataDeals = await getIdDeals(params.id);
  if (!dataDeals) return;
  const idOwner = dataDeals.properties.hubspot_owner_id;
  const dataOwner = await getIOwner(idOwner);

  const getNotesData = async () => {
    const notesIds = dataDeals.associations.notes.results.map(
      (notes: any) => notes.id
    );

    const notesData = await Promise.all(
      notesIds.map((id: string) => getIdNotes(id))
    );

    return notesData;
  };

  const allNotesData = await getNotesData();

  console.log(allNotesData);

  return (
    <div className="w-full flex  h-full mt-20">
      <div className=" m-8 w-3/5 flex flex-col gap-10">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Detalle del caso
        </h1>
        <div className="w-full shadow-lg border-slate-200 p-4 rounded-md  flex flex-col gap-4">
          <div>
            <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              {score(dataDeals?.properties?.num_associated_contacts).flag}{" "}
              {dataDeals.properties.dealname}
            </h2>
          </div>
          <div className="flex gap-4">
            <h2 className="">${dataDeals.properties.amount}</h2>
          </div>
        </div>
        <div className="shadow-md border-slate-200 p-4 rounded-md  w-full flex flex-col gap-4">
          <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Razones
          </h2>
          <div className="flex gap-4">
            <p className="p-4 bg-customPurple text-white rounded-xl ">
              {score(dataDeals?.properties?.num_associated_contacts).reason}
            </p>
          </div>
        </div>
        <div className=" shadow-md border-slate-200 p-4 rounded-md  w-full  flex flex-col gap-4">
          <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Workspace
          </h2>
          <div>
            <div>
              <Input placeholder="Type your message here." />
            </div>
            <div>
              {allNotesData
                ? allNotesData.map((propertiesNotes: NoteData) => (
                    <div key={propertiesNotes.id}>
                      {propertiesNotes?.properties.hs_note_body}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-start items-center shadow-lg border-slate-200  p-4 rounded-md  flex-col w-1/3 h-3/5 ml-8">
        <div className=" p-6 flex justify-center text-center flex-col h-full">
          <h2>
            {dataOwner.firstName} {dataOwner.lastName}
          </h2>
          <div className=" mt-8 flex flex-col w-full justify-between items-center h-full ">
            <div className="flex justify-between gap-14 w-full">
              <p>Estado del caso </p>
              <p>detectado</p>
            </div>
            <div className="flex justify-between gap-14 w-full">
              <p> Severidad </p>
            </div>
            <div className="flex justify-between gap-14 w-full">
              <p>Detectado</p>
            </div>
            <div className="flex justify-between gap-14 w-full">
              {" "}
              <p>Última actualización</p>
            </div>
            <div> </div>
          </div>
        </div>
      </div>
    </div>
  );
}
