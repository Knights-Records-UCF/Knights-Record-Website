"use client";
import ImageCarousel from "@/app/components/TeamCarousel";
import { useState } from "react";

interface Person {
  name: string;
  role: string;
  image: string;
}

interface PersonArrayProp {
  arr: Person[];
  title?: String;
  currentIndex?: any;
}

const ExecutiveBoard: Person[] = [
  {
    name: "Dany",
    role: "President",
    image: "/images/1.jpg",
  },
  { name: "Tommy", role: "Vice-President", image: "/images/tommy.png" },
  { name: "Lis", role: "Secretary", image: "/images/lis.png" },
];

const FinanceBoard: Person[] = [
  { name: "Colin", role: "Head of Marketing", image: "/images/colin.png" },
];

const MarketingBoard: Person[] = [
  { name: "Lizbeth", role: "VP of Marketing", image: "" },
  {
    name: "Sienna Hilland",
    role: "Head of Marketing",
    image: "/images/sienna.png",
  },
];

const EventsBoard: Person[] = [
  {
    name: "Cassidy Zanger",
    role: "VP of Membership",
    image: "/images/cassidy.jpg",
  },
  { name: "Maria Vega", role: "VP of Events", image: "/images/maria.JPG" },
];

export default function Executive() {
  return (
    <div className="dark:[&_h1]:text-[#fbfbfb] dark:[&_p]:text-[#D9D9D9] [&>div:not(.fatHeader)]:py-2 gap-2 w-full px-4 md:px-10 [&_h1]:text-[#656565]">
      <div className="py-7 fatHeader"></div>

      <div className="block">
        <ImageCarousel arr={ExecutiveBoard} title={"Executive Board"} />
      </div>

      <div className="block">
        <ImageCarousel arr={FinanceBoard} title={"Finance"} />
      </div>

      <div className="block">
        <div className="block">
          <ImageCarousel arr={MarketingBoard} title={"Marketing"} />
        </div>
      </div>

      <div className="block">
        <div className="block">
          <ImageCarousel arr={EventsBoard} title={"Events"} />
        </div>
      </div>
    </div>
  );
}
