import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import hustle from "../../../public/auth.png";

export const metadata: Metadata = {
  title: "Hustle",
  description:
    "A tool that helps you detect revenue at risk and revenue opportunities with the help of AI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container  flex items-center justify-center  lg:max-w-none lg:grid-cols-2 lg:px-0 h-screen sm-w-full">
      <div className=" w-3/6 h-full justify-start items-center  hidden  lg:block">
          <Image className=" h-full w-full m-0 p-0 " src={hustle} alt="Authentication" />
        </div>
      
       
        <div className="lg:p-8  lg:w-3/6 ">
          <div className="mx-auto flex  flex-col justify-center space-y-6 lg:w-[350px] ">
            {children}

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
