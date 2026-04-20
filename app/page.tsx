import Carousel from "./components/Carousel";
import Calendar from "./components/Calendar";
import NewAnnouncement from "./components/NewAnnouncement";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Announcement {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}

const months = [
  "January", // 0
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December", // 11
];

export default async function Home() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
    console.log("Session:", session);
  } catch {
    session = null;
  }
  const isAdmin = Boolean(session?.user?.isAdmin);
  const announcement: Announcement[] = await prisma.announcement.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div className=" text-left ">
      <Carousel announcement={announcement} isAdmin={isAdmin} />
      {isAdmin && (
          <NewAnnouncement />
      )}
      <div className="mt-12">
        <h1 className="font-[525] text-2xl text-left text-[#656565]">
          {`${months[new Date().getMonth()]}`}{" "}
          <span className="text-xl font-normal text-[#656565]/50">{` ${new Date().getFullYear()}`}</span>
        </h1>
        <div className="border border-[#D9D9D9] mb-4" />
        <Calendar />
      </div>
    </div>
  );
}
