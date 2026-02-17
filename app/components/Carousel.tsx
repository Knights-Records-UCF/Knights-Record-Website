"use client";
import { useState } from "react";

interface announcement {
    title: string;
    description: string;
    bgColor: string;
}


export default function Carousel({ children }: { children: announcement[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    function prev() {
        setCurrentIndex(currentIndex === 0 ? children.length - 1 : currentIndex - 1)
    }

    function next() {
        setCurrentIndex(currentIndex === children.length - 1 ? 0 : currentIndex + 1)
    }
    return (
        <div className="overflow-hidden relative">
            <div className="flex flex-row gap-4 transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
                {children.map((child, index) => (
                    <div key={index} className="w-60">
                        <h1 className="text-[#656565] text-[14px] font-525">
                            {child.title}
                        </h1>
                        <p className="text-[#656565] w-52 text-[14px] text-left leading-none line-clamp-2">
                            {child.description}
                        </p>
                        <div className={`${child.bgColor} mt-1.5 h-42 w-60  rounded-xl`} />
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}>
                    {'<'}
                </button>
                <button
                    onClick={next}>
                    {'>'}
                </button>
            </div>
        </div>
    )
}