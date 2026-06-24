"use client";
import { User2 } from "lucide-react";
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

function TeamContainers({ arr, currentIndex }: PersonArrayProp) {
  return (
    <>
      <div
        className="flex gap-5 py-3 transition-transform duration-500 ease-out transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 140}px)` }}
      >
        {/* team member vvv */}

        {arr.map((a, index) => {
          return (
            <div
              key={index}
              className="dark:[&_h2]:text-[#fbfbfb] dark:[&_p]:text-[#D9D9D9] flex flex-col flex-shrink-0 [&_h2]:text-[#656565] [&_p]:text-[#656565] w-30  "
            >
              {a.image && (
                <img
                  src={a.image || ""}
                  // alt={"Picture of " + a.name}
                  className="w-30 h-30 min-w-30 min-h-30 bg-gray-300 rounded-2xl object-cover "
                />
              )}
              {!a.image && (
                <div className="w-30 h-30 min-w-30 min-h-30 bg-gray-300 rounded-2xl object-cover flex items-center justify-center ">
                  <User2 size={50} color={"white"} />
                </div>
              )}
              <h2 className="font-semibold transition-all duration-300 ease-in-out">{a.name}</h2>
              <p className="text-sm transition-all duration-300 ease-in-out">{a.role}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function ImageCarousel({ arr, title }: PersonArrayProp) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1 >= arr.length ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? arr.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="flex items-center gap-2 mb-4 ">
        <div className="w-full border-b-[1.5px] border-gray-300 flex dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-2xl md:text-3xl transition-all duration-300 ease-in-out">{title}</h1>
          <button
            onClick={prev}
            className="ml-auto px-2 py-1 border border-none rounded dark:hover:bg-transparent hover:bg-gray-100 text-[#656565] dark:text-[#fbfbfb]"
          >
            {"<"}
          </button>
          <button
            onClick={next}
            className="px-2 py-1 border border-none  rounded dark:hover:bg-transparent hover:bg-gray-100 text-[#656565] dark:text-[#fbfbfb]"
          >
            {">"}
          </button>
        </div>
      </div>

      <TeamContainers arr={arr} currentIndex={currentIndex} />
    </div>
  );
}
