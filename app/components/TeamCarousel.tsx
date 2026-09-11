"use client";
import { User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

//each card is 140px long
const CARD_STEP = 140;

function TeamContainers({ arr, currentIndex }: PersonArrayProp) {
  return (
    <>
      <div
        className="flex gap-5 py-3 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * CARD_STEP}px)` }}
      >
        {/* team member vvv */}

        {arr.map((a, index) => {
          return (
            <div
              key={index}
              className="dark:[&_h2]:text-[#fbfbfb] dark:[&_p]:text-[#D9D9D9] flex flex-col flex-shrink-0 [&_h2]:text-[#656565] [&_p]:text-[#656565] w-30"
            >
              {a.image ? (
                <img
                  src={a.image}
                  className="w-30 h-30 min-w-30 min-h-30 bg-gray-300 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-30 h-30 min-w-30 min-h-30 bg-gray-300 rounded-2xl object-cover flex items-center justify-center">
                  <User2 size={50} color={"white"} />
                </div>
              )}
              <h2 className="font-semibold transition-all duration-300 ease-in-out">
                {a.name}
              </h2>
              <p className="text-sm transition-all duration-300 ease-in-out">
                {a.role}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function ImageCarousel({ arr, title }: PersonArrayProp) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(arr.length);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    //measure how many cards fit n tells us if there's overflow on the right
    const measure = () => {
      //measure how much cards will fit
      let count = Math.floor(el.clientWidth / CARD_STEP);
      // cant be zero
      if (count < 1) count = 1;
      setVisibleCount(count);
    };

    measure();

    //if window gets resized we re measure
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  //the max we can have is the amount we have vs the amount we can show visibly
  const maxIndex = Math.max(0, arr.length - visibleCount);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? prev : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const showLeftFade = currentIndex > 0;
  const showRightFade = currentIndex < maxIndex;

  // mask fade
  const from = showLeftFade ? "transparent 0%, black 6%" : "black 0%";
  const to = showRightFade ? "black 94%, transparent 100%" : "black 100%";
  const maskImage = `linear-gradient(to right, ${from}, ${to})`;

  return (
    <div className="relative w-full group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-full border-b-[1.5px] border-gray-300 flex dark:border-[#323236] transition-all duration-300 ease-in-out">
          <h1 className="font-bold text-2xl md:text-3xl transition-all duration-300 ease-in-out">
            {title}
          </h1>
          <button
            onClick={prev}
            className="ml-auto px-2 py-1 rounded dark:hover:bg-transparent hover:bg-gray-100 text-[#656565] dark:text-[#fbfbfb] disabled:opacity-30"
            disabled={!showLeftFade}
          >
            {"<"}
          </button>
          <button
            onClick={next}
            className="px-2 py-1 rounded dark:hover:bg-transparent hover:bg-gray-100 text-[#656565] dark:text-[#fbfbfb] disabled:opacity-30"
            disabled={!showRightFade}
          >
            {">"}
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        <TeamContainers arr={arr} currentIndex={currentIndex} />
      </div>
    </div>
  );
}
