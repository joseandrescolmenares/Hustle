import { Sidebar } from "./components/Sidebar";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center  w-full ">
      <Sidebar />

      <div className=" w-4/5">{children}</div>
    </div>
  );
}
