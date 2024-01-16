import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import hustle  from "../../../public/hustle.png";


export const metadata: Metadata = {
  title: 'Hustle',
  description: 'A tool that helps you detect revenue at risk and revenue opportunities with the help of AI.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container  flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-screen ">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0  bg-customPurple" />
          <div className="relative z-20 flex items-center text-lg font-medium ">
            <div className="flex w-full h-full items-center ">
              <Image
                src={hustle}
                width={80}
                height={43}
                alt="Authentication"
              />
         
            </div>
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;boost your sales with AI .&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
           
            
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
