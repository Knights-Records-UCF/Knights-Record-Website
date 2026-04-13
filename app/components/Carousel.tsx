"use client";
import { useState } from "react";

interface Announcement {
    title: string;
    description: string;
    bgColor: string;
}

interface ModalProps {
    announcement: Announcement;
    onClose: () => void;
}

interface ButtonProps {
    onPrev: () => void;
    onNext: () => void;
}

interface CarouselProps {
    announcement: Announcement[];
}

function Modal({ announcement, onClose }: ModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex p-4 items-center text-center justify-center bg-black/10"
            onClick={onClose}
        >
            <div
                className="w-100 h-100 bg-white rounded-xl  shadow-2xl drop-shadow-2xl flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className=" flex w-full justify-center">
                    <h2 className="text-2xl font-bold text-[#656565] p-2 w-[90%] ">{announcement.title} </h2>
                    <button
                        className="font-bold text-[#656565]/90 hover:text-black transition-all duration-300 ease-in-out"
                        onClick={onClose}> X
                    </button>
                </div>
                <div className={`w-full h-full ${announcement.bgColor}`} />
                <p className="text-[#656565] h-24 p-2">{announcement.description}</p>
            </div>
        </div>
    )
}

// Find icons for this button later
function TempButton({ onPrev, onNext }: ButtonProps) {
    return (
        <div className="flex flex-row gap-2 dark:text-[#fbfbfb]">
            <button
                onClick={onPrev}>
                {'<'}
            </button>
            <button
                onClick={onNext}>
                {'>'}
            </button>
        </div>
    )
}

export default function Carousel({ announcement }: CarouselProps) {
    const [visibleAnnouncement, setVisibleAnnouncement] = useState(0);
    const [currAnnouncement, setCurrAnnouncement] = useState(0);
    const [showModal, setShowModal] = useState(false);


    function prev() {
        setVisibleAnnouncement(visibleAnnouncement === 0 ? announcement.length - 1 : visibleAnnouncement - 1)
    }

    function next() {
        // >= just for flexibility between showcasing two announcements at a time or just one, depends on what we wanna do
        setVisibleAnnouncement(visibleAnnouncement >= announcement.length - 1 ? 0 : visibleAnnouncement + 1)
    }

    return (
        <div className="overflow-hidden relative">
            <div className="flex mt-2 items-center ">
                <h1 className=" text-[#656565] dark:text-[#fbfbfb] font-[525] text-3xl transition-all duration-300 ease-in-out">
                    Announcements
                </h1>
                <div className="ml-2">
                    <TempButton onPrev={prev} onNext={next} />
                </div>
            </div>
            <div className="border border-[#D9D9D9] dark:border-[#363636] mb-0.5 transition-all duration-300 ease-in-out" />
            <div
                className="flex flex-row gap-4 transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${(visibleAnnouncement * 256)}px)` }} // 256 bc w-60 + gap-4 omggggg
            >
                {announcement.map((item, index) => (
                    <div key={index} className="w-60">
                        <h1 className="text-[#656565] dark:text-[#AEAEAE] text-[14px] font-525 transition-all duration-300 ease-in-out">
                            {item.title}
                        </h1>
                        <p className="text-[#656565] dark:text-[#D9D9D9] w-52 text-[14px] text-left leading-none line-clamp-2 transition-all duration-300 ease-in-out">
                            {item.description}
                        </p>
                        <div
                            className={`${item.bgColor} mt-1.5 h-42 w-60  rounded-xl`}
                            onClick={() => {
                                setShowModal(true);
                                setCurrAnnouncement(index);
                            }}
                        />
                    </div>
                ))}
            </div>
            {showModal &&
                <Modal announcement={announcement[currAnnouncement]} onClose={() => setShowModal(false)} />
            }
        </div>
    )
}