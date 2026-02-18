"use client";
import { useState } from "react";

interface announcement {
    title: string;
    description: string;
    bgColor: string;
}

export default function Carousel({ children }: { children: announcement[] }) {
    const [visibleAnnouncement, setVisibleAnnouncement] = useState(0);
    const [currAnnouncement, setCurrAnnouncement] = useState(0);
    const [showModal, setShowModal] = useState(false);

    function Modal({ announcement }: { announcement: announcement }) {
        return (
            <div className="fixed text-center border  ">
                <h2 className="">{announcement.title}</h2>
                <p className="">{announcement.description}</p>
                <button
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>
            </div>
        )
    }

    function prev() {
        setVisibleAnnouncement(visibleAnnouncement === 0 ? children.length - 1 : visibleAnnouncement - 1)
    }

    function next() {
        // >= just for flexibility between showcasing two announcements at a time or just one, depends on what we wanna do
        setVisibleAnnouncement(visibleAnnouncement >= children.length - 1 ? 0 : visibleAnnouncement + 1)
    }

    // Find icons for this button later
    function TempButton() {
        return (
            <div className="flex flex-row gap-2">
                <button
                    onClick={prev}>
                    {'<'}
                </button>
                <button
                    onClick={next}>
                    {'>'}
                </button>
            </div>
        )
    }

    return (
        <div className="overflow-hidden relative">
            <div className="flex mt-2 items-center ">
                <h1 className=" text-[#656565] font-[525] text-3xl">
                    Announcements
                </h1>
                <div className="ml-2">
                    <TempButton />
                </div>
            </div>
            <div className="border border-[#D9D9D9] mb-0.5" />
            <div
                className="flex flex-row gap-4 transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${(visibleAnnouncement * 256)}px)` }} // 256 bc w-60 + gap-4 omggggg
            >
                {children.map((child, index) => (
                    <div key={index} className="w-60">
                        <h1 className="text-[#656565] text-[14px] font-525">
                            {child.title}
                        </h1>
                        <p className="text-[#656565] w-52 text-[14px] text-left leading-none line-clamp-2">
                            {child.description}
                        </p>
                        <div
                            className={`${child.bgColor} mt-1.5 h-42 w-60  rounded-xl`}
                            onClick={() => {
                                setShowModal(true);
                                setCurrAnnouncement(index);
                            }}
                        />
                    </div>
                ))}
            </div>
            {showModal &&
                <Modal announcement={children[currAnnouncement]} />
            }
        </div>
    )
}