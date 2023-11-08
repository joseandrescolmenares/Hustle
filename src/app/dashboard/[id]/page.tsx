import { getIdCompanies } from "@/service/company/getIdCompany";

export default async function Page({ params }: { params: { id: string } }) {
  let array = [
    "Fecha de cierre: Vencida",
    "Etapa: 3 meses sin cambia",
    "Contacto: Solo 2 Contactos asociados",
  ];
  let arrayProperties = ["$38 200", "Procurement", "Mexico", "FinTech"];
  //   const dataCompany = await getIdCompanies(params.id)
  //   console.log(dataCompany,"dart")
  // dataCompany.properties.name
  return (
    <div className="w-full flex mt-7">
        <div className=" m-8 w-3/5 flex flex-col gap-10"> 
      <h1>Detalle del caso</h1>
      <div className=" p-6 w-full bg-slate-400 flex flex-col gap-4">
        <div>
          <h2>Clara </h2>
        </div>
        <div className="flex gap-4">
          {arrayProperties.map((properties) => (
            <p key={properties}>{properties}</p>
          ))}
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
            @MaxVelasco por favor incluyeme en los proximos reuniones y email para acelerar el ciclo
        </div>
      </div>
      </div>
      <div className=" m-10 flex justify-start items-center bg-slate-200 flex-col w-1/3 "> 
      <div className=" p-6 flex justify-center text-center">
      Maxximiliano Velasco
      </div>
       
      </div>
    </div>
  );
}
