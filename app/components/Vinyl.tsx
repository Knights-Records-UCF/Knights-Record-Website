"use client";

import { useState } from "react";
import Image from "next/image";

interface Record {
  sleeveImage: string;
  // recordImage: string; Commented out unless we decide to have custom records for each album
}

interface VinylProps {
  onSelectArtist: (index: number) => void;
}

const recordArr: Record[] = [
  {
    sleeveImage: "/images/albumCovers/volumeAlpha.jpeg",
  },
  {
    sleeveImage: "/images/albumCovers/TCSOHIG.jpg",
  },
  {
    sleeveImage: "/images/albumCovers/200E.jpg",
  },
  {
    sleeveImage: "/images/albumCovers/WLFGRL.jpg",
  },
  {
    sleeveImage: "/images/albumCovers/SUBQ.jpg",
  },
  {
    sleeveImage: "/images/albumCovers/SUBQ.jpg",
  },
];

export default function Vinyl({ onSelectArtist }: VinylProps) {
  return (
    // Switch to aside later since this is lowk like a navbar but for artists
    <div className="flex flex-col gap-4">
      {recordArr.map((vinyl, i) => (
        <div
          key={i}
          onClick={() => onSelectArtist(i)} //changes artist based whats clicked
          className="relative w-32 h-32 group transition-all duration-450 fade-in-out hover:shadow-2xl"
        >
          {/* Album Sleeve */}
          <Image
            src={vinyl.sleeveImage}
            alt="Album Sleeve"
            width={128}
            height={128}
            className={`absolute inset-0 z-10 drop-shadow-md drop-shadow-black/70`}
          />

          {/* Record */}
          <Image
            src="/images/record.png"
            alt="Album Record"
            width={128}
            height={128}
            className={`absolute inset-0 z-0 h-full w-full object-cover rounded-full  transition-transform drop-shadow-gray-400 dark:drop-shadow-black/70 drop-shadow-md duration-300 scale-115 group-hover:translate-x-16 group-hover:animate-[spin_5.5s_linear_infinite]`}
          />
        </div>
      ))}
    </div>
  );
}
