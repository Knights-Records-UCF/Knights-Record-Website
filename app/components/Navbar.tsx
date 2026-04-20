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
import { IoClose } from "react-icons/io5"; // close icon
import { IoMenu } from "react-icons/io5"; // menu icon

export default function Navbar() {
    const pathname = usePathname();

    // auto-open if you're on a teams page
    const isOnTeamsRoute = pathname?.startsWith("/teams");
    const [teamsOpen, setTeamsOpen] = useState<boolean>(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setTeamsOpen(isOnTeamsRoute);
    }, [isOnTeamsRoute]);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);
    

    const baseItem =
        "block rounded-xl px-4 py-2 hover:bg-[#EBEBEB] dark:hover:bg-[#39393B] text-[#656565] dark:text-white transition-all duration-300 ease-in-out";
    const activeItem = "bg-[#EBEBEB] dark:bg-[#39393B]";

    const navContent = (
        <>
        {/* Title */}
        <div className="text-xl font-semibold mb-8 text-[#656565] dark:text-white text-center">
            Knights Records
        </div>

        {/* Nav */}
        <ul className="px-4 pr-6 space-y-2 text-lg text-[#656565] pt-6 md:pt-12">
            <li>
            <Link
                href="/"
                className={`${baseItem} ${
                pathname === "/" ? activeItem : ""
                } flex flex-row items-center gap-2`}
            >
                <IoHome className="text-2xl text-[#c59a93]" /> Home
            </Link>
            </li>

            <li>
            <Link
                href="/about"
                className={`${baseItem} ${
                pathname === "/about" ? activeItem : ""
                } flex flex-row items-center gap-2`}
            >
                <IoIosInformationCircle className="text-2xl text-[#cdc7a2]" /> About
            </Link>
            </li>

            {/* Team dropdown */}
            <li>
            <div
                className={`rounded-xl transition-colors ${
                teamsOpen
                    ? "bg-[#EBEBEB] dark:bg-[#39393B] transition-all duration-300 ease-in-out"
                    : ""
                }`}
            >
                <button
                type="button"
                onClick={() => setTeamsOpen((v) => !v)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#EBEBEB] dark:hover:bg-[#39393B] flex flex-row items-center gap-2 text-[#656565] dark:text-[#fbfbfb]"
                >
                <IoPeople className="text-2xl text-[#b0ccb3]" /> Team
                </button>

                <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    teamsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                >
                <div className="my-2 h-px mt-0 w-6/7 mx-auto bg-[#D8D8D8]" />

                <Link
                    href="/teams/executive"
                    className={`block px-12 rounded-md text-[15px] dark:text-[#9e9e9e] ${
                    pathname === "/teams/executive" ? "font-semibold" : ""
                    }`}
                >
                    Executive Board
                </Link>

                <div className="my-2 h-px w-6/7 mx-auto bg-[#D8D8D8]" />

                <Link
                    href="/teams/label"
                    className={`block pb-3 px-12 rounded-md text-[15px] dark:text-[#9e9e9e] ${
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
                className={`${baseItem} ${
                pathname === "/artists" ? activeItem : ""
                } flex flex-row items-center gap-2`}
            >
                <MdLibraryMusic className="text-2xl text-[#b3b3de]" /> Artists
            </Link>
            </li>
        </ul>

        {/* Footer */}
        <div className="mt-auto text-lg pt-6 pb-5">
            <div className="flex justify-center gap-4 text-[#B8B8B8] mb-3 text-4xl">
            <a href="#"><RiInstagramFill /></a>
            <a href="#"><IoLogoDiscord className="mt-0.5" /></a>
            <a href="#"><IoLogoLinkedin className="mb-0.5" /></a>
            <a href="#"><IoMail /></a>
            </div>
            <div className="text-xs text-[#B8B8B8] flex justify-center">
            @ 2026 Knights Records
            </div>
        </div>
        </>
    );

    return (
        <>
        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#F5F5F5] dark:bg-[#252526] border-b border-[#E3E3E3] dark:border-[#3B3B3C] flex items-center px-4 transition-all duration-300 ease-in-out">
            <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-3xl text-[#656565] dark:text-white"
            aria-label="Open menu"
            >
            <IoMenu />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-[#656565] dark:text-white">
            Knights Records
            </div>
        </div>

        {/* Mobile overlay */}
        <div
            className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
            mobileOpen
                ? "pointer-events-auto bg-black/40"
                : "pointer-events-none bg-black/0"
            }`}
            onClick={() => setMobileOpen(false)}
        >
            {/* Mobile drawer */}
            <aside
            className={`h-full w-72 max-w-[85vw] bg-[#F5F5F5] dark:bg-[#252526] drop-shadow-sm dark:drop-shadow-[#3B3B3C] flex flex-col pt-5 overflow-y-auto transition-transform duration-300 ease-in-out ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
            >
            {navContent}
            </aside>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:flex h-screen w-64 bg-[#F5F5F5] dark:bg-[#252526] drop-shadow-sm drop-shadow-gray-400 dark:drop-shadow-[#3B3B3C] flex-col pt-5 overflow-y-auto transition-all duration-300 ease-in-out">
            {navContent}
        </aside>
        </>
    );
}
