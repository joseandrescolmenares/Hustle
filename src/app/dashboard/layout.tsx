import { Sidebar } from "./components/Sidebar";
import { BannerSlack } from "./components/BannerSlack";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center  w-full ">
      <Sidebar />
      <BannerSlack />
      <div className="w-10/12">{children}</div>
    </div>
  );
}
