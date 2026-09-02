"use client";

import Image from "next/image";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

type Role = {
    id: number;
    title: string;
    committee: string;
    team: "Executive Board" | "Label Team";
    description: string;
    applyLink?: string;
    image?: string;
};

const roles: Role[] = [
    {
        id: 1,
        title: "President",
        committee: "Executive Board",
        team: "Executive Board",
        description:
            "Provides strategic leadership for Knights Records, oversees all organizational operations, chairs executive meetings, and represents the organization to UCF and external partners.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 2,
        title: "Vice President",
        committee: "Executive Board",
        team: "Executive Board",
        description:
            "Supports the President in organizational leadership, oversees committee coordination, and ensures initiatives are executed effectively across all departments.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 3,
        title: "Secretary",
        committee: "Executive Board",
        team: "Executive Board",
        description:
            "Maintains meeting notes, organizational records, attendance, and official documentation while ensuring clear communication among officers and members.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 4,
        title: "Treasurer",
        committee: "Finance",
        team: "Executive Board",
        description:
            "Oversees the organization's budget, financial planning, fundraising efforts, and compliance with UCF financial policies while providing financial updates to the Executive Board.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 5,
        title: "Head of Finance",
        committee: "Finance",
        team: "Executive Board",
        description:
            "Assists with budgeting, expense tracking, reimbursement processes, fundraising logistics, and maintaining accurate financial records.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 6,
        title: "VP of Events",
        committee: "Events",
        team: "Executive Board",
        description:
            "Leads the planning and execution of organization-wide events, manages event logistics and timelines, and coordinates with committees, venues, and performers. Events include: Guest Speakers, Fundraisers, Workshops, Socials, etc.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 7,
        title: "Head of Events",
        committee: "Events",
        team: "Executive Board",
        description:
            "Supports event planning by coordinating volunteers, managing event operations, and ensuring smooth execution before, during, and after events. Events include: Guest Speakers, Fundraisers, Workshops, Socials, etc.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 8,
        title: "VP of Membership",
        committee: "Membership",
        team: "Executive Board",
        description:
            "Leads member recruitment, onboarding, engagement, and retention while fostering a welcoming and active organizational culture.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 9,
        title: "Head of Membership",
        committee: "Membership",
        team: "Executive Board",
        description:
            "Assists with recruitment efforts, member communications, attendance tracking, and planning member development and social activities.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 10,
        title: "VP of Marketing",
        committee: "Marketing",
        team: "Executive Board",
        description:
            "Develops marketing strategy for the organization, oversees branding and social media, and manages promotional campaigns for events and initiatives.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 11,
        title: "Head of Marketing",
        committee: "Marketing",
        team: "Executive Board",
        description:
            "Creates marketing content, assists with social media management, and supports promotional campaigns to increase organizational visibility.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 12,
        title: "Web Designer",
        committee: "Marketing",
        team: "Executive Board",
        description:
            "Designs, updates, and maintains the organization's website while ensuring accurate information, strong branding, and a user-friendly experience.",
        applyLink: "#",
        // image: "",
    },
    {
        id: 13,
        title: "Label Operations Director",
        committee: "Label Operations",
        team: "Label Team",
        description:
            "Oversees day-to-day label operations, manages artist relations, coordinates projects across departments, and ensures artists receive organizational support.",
        applyLink: "#",
    },
    {
        id: 14,
        title: "A&R Director",
        committee: "Artist & Repertoire",
        team: "Label Team",
        description:   
            "Leads artist recruitment, evaluates talent, oversees artist development, and serves as the primary liaison between artists and the label.",
        applyLink: "#",
    },
    {
        id: 15,
        title: "A&R Manager",
        committee: "Artist & Repertoire",
        team: "Label Team",
        description:
            "Assists with artist scouting, maintains communication with their assigned artist, provides developmental support, and helps coordinate artist projects.",
        applyLink: "#",
    },
    {
        id: 16,
        title: "Marketing Director",
        committee: "Marketing",
        team: "Label Team",
        description:
            "Leads marketing strategy for signed artists, oversees release campaigns, and coordinates branding efforts across creative and promotional teams.",
        applyLink: "#",
    },
    {
        id: 17,
        title: "Marketing Manager / Graphic Designer",
        committee: "Marketing",
        team: "Label Team",
        description:
            "Executes artist marketing campaigns, manages promotional content, monitors campaign performance, and assists with release planning as well as graphic design support.",
        applyLink: "#",
    },
    {
        id: 18,
        title: "Artist & Promotions Director",
        committee: "Artist & Promotions",
        team: "Label Team",
        description:
            "Leads promotional initiatives for artists and label events while developing partnerships and outreach opportunities within the UCF and Orlando communities.",
        applyLink: "#",
    },
    {
        id: 19,
        title: "Artist & Promotions Manager",
        committee: "Artist & Promotions",
        team: "Label Team",
        description:
            "Supports promotional campaigns, coordinates outreach efforts, assists with partnerships, and helps increase artist and event visibility.",
        applyLink: "#",
    },
    {
        id: 20,
        title: " Live Events Director",
        committee: " Live Events",
        team: "Label Team",
        description:
            "Plans and manages artist showcases, concerts, and live performances while coordinating logistics, production, and venue operations.",
        applyLink: "#",
    },
    {
        id: 21,
        title: "Live Events Assistant",
        committee: "Live Events",
        team: "Label Team",
        description:
            "Supports live event setup, artist coordination, volunteer management, and day-of-event operations.",
        applyLink: "#",
    },
    {
        id: 22,
        title: "Creative Director",
        committee: "Creative",
        team: "Label Team",
        description:
            "Leads the creative vision for the organization and its artists, overseeing branding, visual content, photoshoots, album artwork, and multimedia projects.",
        applyLink: "#",
    },
    {
        id: 23,
        title: "Creative Assistant",
        committee: "Creative",
        team: "Label Team",
        description:
            "Supports creative projects by assisting with design, branding, content creation, and production for artists and organizational initiatives.",
        applyLink: "#",
    },
    {
        id: 24,
        title: "Photographer",
        committee: "Creative",
        team: "Label Team",
        description:
            "Captures high-quality photography for events, artists, and promotional materials while maintaining the organization's visual archive.",
        applyLink: "#",
    },
    {
        id: 25,
        title: "Videographer",
        committee: "Creative",
        team: "Label Team",
        description:
            "Produces and edits video content for performances, promotional campaigns, artist features, and social media platforms.",
        applyLink: "#",
    }
];

export default function JoinTeamPage() {
    const [openRole, setOpenRole] = useState<number | null>(null);

    const [labelFirst, setLabelFirst] = useState(false);

    const toggleRole = (id: number) => {
        setOpenRole((current) => (current === id ? null : id));
    };

    const displayedRoles = [...roles].sort((a, b) => {
        if (a.team === b.team) {
            return 0;
        }

        if (labelFirst) {
            return a.team === "Label Team" ? -1 : 1;
        }

        return a.team === "Executive Board" ? -1 : 1;
    });

    return (
        <main className="min-h-screen text-[#656565] dark:text-[#E5E5E5] transition-all duration-300 ease-in-out">
            <div className=" mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">

                {/* Hero */}
                <section className="flex flex-col md:flex-row gap-8 md:gap-10 items-start mb-12">

                    {/* Hero image placeholder */}
                    <div className="w-full md:w-52 shrink-0">
                        <div className="w-full aspect-square rounded-2xl bg-[#D68783] shadow-lg" />
                    </div>

                    {/* Hero text */}
                    <div className="max-w-152 md:pt-8">
                        <h1 className="text-3xl md:text-[32px] font-semibold mb-4 text-[#656565] dark:text-white text-center md:text-left transition-all duration-300 ease-in-out">
                            Interested In Joining?
                        </h1>

                        <p className="text-[17px] leading-tight">
                            Join a team of students passionate about music, creativity,
                            and community. Whether you're interested in planning events,
                            marketing, or management, we would love for you to join
                            Knights Records! Check out our roles below.
                        </p>
                    </div>
                </section>

                {/* Table header */}
                <div className="mx-8">
                <div className="hidden md:grid grid-cols-[1.2fr_1.2fr_80px] items-center border-b border-[#D8D8D8] dark:border-[#323236] pb-2 px-1 font-semibold transition-all duration-300 ease-in-out">
                    <div>
                        Role
                    </div>

                    <div className="flex items-center gap-2">
                        Committee 
                        <button
                            type="button"
                            onClick={() => setLabelFirst((prev) => !prev)}
                            aria-label="Toggle team order"
                            className="cursor-pointer"
                        >
                            <IoFilter />
                        </button>
                    </div>

                    <div className="text-right whitespace-nowrap">
                        Learn More    
                    </div>
                </div>

                {/* Role list */}
                <div>
                    {displayedRoles.map((role) => {
                        const isOpen = openRole === role.id;

                        return (
                            <div
                                key={role.id}
                                className="border-b border-[#D8D8D8] dark:border-[#323236] transition-all duration-300 ease-in-out"
                            >
                                {/* Clickable role row */}
                                <button
                                    type="button"
                                    onClick={() => toggleRole(role.id)}
                                    className="w-full text-left"
                                    aria-expanded={isOpen}
                                >
                                    <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1.2fr_1.2fr_80px] items-center gap-4 py-2">

                                        {/* Role */}
                                        <div className="flex items-center gap-3">

                                            {/* Role image */}
                                            <div className="relative w-11 h-11 rounded-lg bg-[#EAB0AE] overflow-hidden shrink-0">
                                                {role.image && (
                                                    <Image
                                                        src={role.image}
                                                        alt={`${role.title} role`}
                                                        fill
                                                        sizes="44px"
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>

                                            <span className="text-[16px]">
                                                {role.title}
                                            </span>
                                        </div>

                                        {/* Committee */}
                                        <div className="hidden md:block text-[16px]">
                                            {role.committee}
                                        </div>

                                        {/* Learn More Dropdown */}
                                        <div className="flex justify-end">
                                            <IoChevronDown
                                                className={`text-base transition-transform duration-300 ${
                                                    isOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Committee shown under role on mobile */}
                                    <div className="md:hidden pl-14 pb-2 text-sm text-[#8A8A8A]">
                                        {role.committee}
                                    </div>
                                </button>

                                {/* Expanded role information */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="md:grid md:grid-cols-[150px_1fr] gap-x-8 px-4 md:px-17 pt-6 pb-7">

                                            {/* About label */}
                                            <h3 className="font-semibold mb-2 md:mb-0">
                                                About
                                            </h3>

                                            {/* Description */}
                                            <p className="text-[15px] leading-[1.2] max-w-140">
                                                {role.description}
                                            </p>

                                            {/* Apply */}
                                            {role.applyLink && (
                                                <div className="md:col-span-2 flex justify-center mt-8">
                                                    <a
                                                        href={role.applyLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="px-5 py-1.5 rounded-md bg-[#656565] hover:bg-[#555555] text-white text-sm font-semibold transition-colors shadow-md"
                                                    >
                                                        Apply
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
                </div>
            </div>

            {/* Gradients*/}
            <div className="fixed bottom-0 left-0 md:left-65 right-0 h-40 pointer-events-none z-20">

            {/* Light mode gradient */}
            <div
                className="
                    absolute inset-0
                    bg-linear-to-b
                    from-transparent
                    via-white/40
                    to-white
                    opacity-100
                    dark:opacity-0
                    transition-opacity duration-300 ease-in-out
                "
            />

            {/* Dark mode gradient */}
            <div
                className="
                    absolute inset-0
                    bg-linear-to-b
                    from-transparent
                    via-[#1E1E1E]/70
                    to-[#1E1E1E]
                    opacity-0
                    dark:opacity-100
                    transition-opacity duration-300 ease-in-out
                "
            />
        </div>

        </main>
    );
}