import React from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";

interface CardProps {
  image: string;
  name: string;
  link: string;
  underConstruction : boolean
}

const Cards = ({ image, name, link, underConstruction }: CardProps) => {
  return (
    <div className="h-full w-full rounded-lg shadow-md overflow-hidden ">
      <div className="flex flex-col w-full h-full justify-between items-center p-5 ">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">{name}</h1>

        <Image width={155} height={155} src={image} alt="Card Image" />
        <a
          className={ underConstruction ? "bg-gray-300 text-gray-500 cursor-not-allowed py-2 px-4 rounded leading-7 [&:not(:first-child)]:mt-6" : ' bg-customPurple/90 cursor-pointer py-2 px-4 rounded leading-7 [&:not(:first-child)]:mt-6'}
          href={link}
        >
          {" "}
          Connect
        </a>
      </div>
    </div>
  );
};

export default Cards;
