"use client";
import iconsHustle from "../../../../../public/hustle.png";
import { CiGrid41, CiWarning, CiBellOn, CiFilter } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import Cookies from "js-cookie";

function Sidebar() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("expires_in");
    Cookies.remove("userId");
    Cookies.remove("access_token");
    Cookies.remove("accessTokenHubspot");
    Cookies.remove("refresh_token");
    router.refresh();
  };
  return (
    <div className="h-screen  dark:bg-slate-900 ">
      <aside
        id="sidebar"
        className="fixed left-0 top-0 z-40 h-screen  transition-transform"
        aria-label="Sidebar"
      >
        <div className="flex h-full items-center justify-center flex-col overflow-y-auto shadow-lg border-slate-200  px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <Image src={iconsHustle} alt="Hustle" className=" w-6" />
            {/* <span className="ml-3 text-base font-semibold">Hustle</span> */}
          </div>
          <ul className="space-y-2 text-sm font-medium">
            <Link href="/dashboard">
              {" "}
              <li className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700">
                {/* <CiGrid41 size={24} /> */}
                <CiWarning size={24} />
                {/* <span className="ml-3 flex-1 whitespace-nowrap">Home</span> */}
              </li>
            </Link>
            {/* <Link href="/dashboard/revenueAlert">
              {" "}
              <li className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple  dark:text-white dark:hover:bg-slate-700">
                <CiWarning size={24} />
            
              </li>
            </Link> */}
            {/* <li>
              <a className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700">
                <CiFilter size={24} />
               
              </a>
            </li> */}
            {/* <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700"
              >
                <CiBellOn size={24} />
             
              </a>
            </li> */}
          </ul>

          <div className="mt-auto flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  aria-roledescription="more menu"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  className="h-5 w-5 text-black dark:text-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="flex justify-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut />
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
