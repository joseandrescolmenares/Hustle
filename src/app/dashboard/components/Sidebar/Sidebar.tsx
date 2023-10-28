import { Calendar, Flashlight, Report  } from "../../../components/Icons/svg";
import iconsHustle from "../../../../../public/hustle.png"

import Image from "next/image";

function Sidebar() {
  return (
    <div className="h-screen  dark:bg-slate-900 w-7">
      <aside
        id="sidebar"
        className="fixed left-0 top-0 z-40 h-screen  transition-transform"
        aria-label="Sidebar"
      >
        <div className="flex h-full items-center justify-center flex-col overflow-y-auto shadow-lg border-slate-200  px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div
            // href="#"
            className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          >
           <Image src={iconsHustle} alt="Hustle" className=" w-6"/>
            {/* <span className="ml-3 text-base font-semibold">Hustle</span> */}
          </div>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {/* <span className="ml-3 flex-1 whitespace-nowrap">Home</span> */}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple  dark:text-white dark:hover:bg-slate-700"
              >
                <Calendar />
                {/* <span className="ml-3 flex-1 whitespace-nowrap">meetings</span> */}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700"
              >
                <Flashlight/>
                {/* <span className="ml-3 flex-1 whitespace-nowrap">Pipeline</span> */}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-customPurple dark:text-white dark:hover:bg-slate-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {/* <span className="ml-3 flex-1 whitespace-nowrap">Settings</span> */}
              </a>
            </li>
          </ul>
          <div className="mt-auto flex">
            <div className="flex w-full justify-between">
              {/* <span className="text-sm font-medium text-black dark:text-white">
                email@example.com
              </span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
