import { getIdDeals } from "@/service/hubspot/deals/getIdDeals";
import { getIOwner } from "@/service/hubspot/owners/getIdOwner";

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
  console.log(dataDeals, "owner");

  return (
    <div className="w-full flex  h-full">
      <div className=" m-8 w-3/5 flex flex-col gap-10">
        <h1>Detalle del caso</h1>
        <div className=" p-6 w-full bg-slate-400 flex flex-col gap-4">
          <div>
            <h2>{dataDeals.properties.dealname}</h2>
          </div>
          <div className="flex gap-4">
            <p>{dataDeals.properties.amount}</p>
          </div>
        </div>
        <div className="p-6 w-full bg-slate-400 flex flex-col gap-4">
          <h2>Razones</h2>
          <div className="flex gap-4">
            {array.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className=" p-6 w-full bg-slate-400 flex flex-col gap-4">
          <h2>Workspace</h2>
          <div>
            @MaxVelasco por favor incluyeme en los proximos reuniones y email
            para acelerar el ciclo
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-start items-center bg-slate-200 flex-col w-1/3 h-3/5 ml-8">
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
