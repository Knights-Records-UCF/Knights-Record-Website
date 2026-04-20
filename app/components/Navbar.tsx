"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHome, IoInformationCircle } from "react-icons/io5"; // home icon
import { IoIosInformationCircle } from "react-icons/io"; // about icon
import { IoPeople } from "react-icons/io5"; // team icon
import { MdLibraryMusic } from "react-icons/md"; // artists icon
import { RiInstagramFill } from "react-icons/ri"; // ig icon
import { IoLogoDiscord } from "react-icons/io5"; // discord icon
import { IoLogoLinkedin } from "react-icons/io5"; // linkedin icon
import { IoMail } from "react-icons/io5"; // email icon


export default function Navbar() {
    const pathname = usePathname();

    // auto-open if you're on a teams page
    const isOnTeamsRoute = pathname?.startsWith("/teams");
    const [teamsOpen, setTeamsOpen] = useState<boolean>(false);

    useEffect(() => {
        setTeamsOpen(isOnTeamsRoute);
    }, [isOnTeamsRoute]);

    const baseItem =
        "block rounded-xl px-4 py-2 hover:bg-[#EBEBEB] text-[#656565]";
    const activeItem = "bg-[#EBEBEB]";

    return (
        <aside className='h-screen w-64 bg-[#F5F5F5] drop-shadow-sm drop-shadow-gray-400 flex flex-col pt-5 overflow-y-auto'>

            {/* Title */}
            <div className='text-xl font-semibold mb-8 text-[#656565] text-center'>Knights Records</div>

            {/* Nav */}
            <ul className="px-4 pr-6 space-y-2 text-lg text-[#656565] pt-12">
                <li>
                <Link
                    href="/"
                    className={`${baseItem} ${pathname === "/" ? activeItem : ""} flex flex-row items-center gap-2`}
                >
                    <IoHome className= "text-2xl text-[#c59a93]"  /> Home
                </Link>
                </li>

                <li>
                <Link
                    href="/about"
                    className={`${baseItem} ${pathname === "/about" ? activeItem : ""} flex flex-row items-center gap-2`}
                >
                    <IoIosInformationCircle className="text-2xl text-[#cdc7a2]" /> About
                </Link>
                </li>

                {/* Team dropdown */}
                <li>
                <div
                    className={`rounded-xl transition-colors  ${
                    teamsOpen ? "bg-[#EBEBEB]" : ""
                    }`}
                >
                    {/* Top row (Team) */}
                    <button
                    type="button"
                    onClick={() => setTeamsOpen((v) => !v)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#EBEBEB] flex flex-row items-center gap-2 text-[#656565] "
                    >
                    <IoPeople className="text-2xl text-[#b0ccb3]" /> Team
                    </button>

                    {/* Dropdown content */}
                    <div
                        className={`
                            overflow-hidden transition-all duration-300 ease-in-out
                            ${teamsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                        `}
                        >
                        <div className="my-2 h-px mt-0 w-6/7 mx-auto bg-[#D8D8D8] " />

                        <Link
                            href="/teams/executive"
                            className={`block px-12 rounded-md text-[15px] ${
                                pathname === "/teams/executive" ? "font-semibold" : ""
                            }`}
                            >
                            Executive Board
                        </Link>

                        <div className="my-2 h-px w-6/7 mx-auto bg-[#D8D8D8]" />

                        <Link
                            href="/teams/label"
                            className={`block pb-3 px-12 rounded-md text-[15px] ${
                                pathname === "/teams/label" ? "font-semibold" : ""
                            }`}
                            >
                            Label Team
                        </Link>
                    </div>
                    
                </div>
                </li>

                <li>
                <Link
                    href="/artists"
                    className={`${baseItem} ${pathname === "/artists" ? activeItem : ""} flex flex-row items-center gap-2`}
                >
                    <MdLibraryMusic className="text-2xl text-[#b3b3de]" /> Artists
                </Link>
                </li>
            </ul>

           

            {/* Footer */}
            <div className="mt-auto text-lg pt-6 pb-5">
                <div className='flex justify-center gap-4 text-[#B8B8B8] mb-3 text-4xl'>
                    <a href="#" ><RiInstagramFill /></a>
                    <a href="#" ><IoLogoDiscord className="mt-0.5"/></a>
                    <a href="#" ><IoLogoLinkedin className="mb-0.5" /></a>
                    <a href="#" ><IoMail  /></a>
                </div>
                <div className="text-xs text-[#B8B8B8] flex justify-center">@ 2026 Knights Records</div>
            </div>
        </aside>

    )
}