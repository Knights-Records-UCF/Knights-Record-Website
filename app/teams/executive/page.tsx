"use client";
import ImageCarousel from "@/app/components/TeamCarousel";
import { useState } from "react";

interface Person {
  name: string;
  role: string;
  image: string;
  darkImage?: string;
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
  
];

const FinanceBoard: Person[] = [
  { name: "Colin", role: "Treasurer", image: "/images/colin.png" },
];

const MarketingBoard: Person[] = [
  {
    name: "Sienna",
    role: "VP of Marketing",
    image: "/images/sienna.png",
  },
  { name: "Kendall", role: "Head of Marketing", image:"" },
];

const MembershipBoard: Person[] = [
  {
    name: "Cassidy",
    role: "Head of Membership",
    image: "/images/Cassidy.jpg",
  },
]

const EventsBoard: Person[] = [
  { name: "Sydney", role: "VP of Events", image:""}
];

const WebBoard: Person[] = [
  { name: "Valeria", role: "Web Designer", image: "/images/Valeria.JPG" },
  { name: "Samantha", role: "Web Designer", image: "/images/sam.jpg", darkImage: "/images/sam-evil.jpg" },
  { name: "Thaira", role: "Web Designer", image: "/images/thaira.jpg" },
  { name: "Carlos", role: "Web Designer", image: "/images/carlos.jpg", darkImage: "/images/carlos-dark.png" },
];
  
export default function Executive() {
  return (
    <div className="dark:[&_h1]:text-[#fbfbfb] dark:[&_p]:text-[#D9D9D9] [&>div:not(.fatHeader)]:py-2 gap-2 w-full px-4 md:px-10 [&_h1]:text-[#656565] transition-all duration-300 ease-in-out">
      <div className="py-7 fatHeader transition-all duration-300 ease-in-out"></div>

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
          <ImageCarousel arr={MembershipBoard} title={"Membership"} />
        </div>
      </div>

      <div className="block">
        <div className="block">
          <ImageCarousel arr={EventsBoard} title={"Events"} />
        </div>
      </div>

      <div className="block">
        <div className="block">
          <ImageCarousel arr={WebBoard} title={"Website Designers"} />
        </div>
      </div>
    </div>
  );
}
