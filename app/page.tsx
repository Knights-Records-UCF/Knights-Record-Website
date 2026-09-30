import Carousel from "./components/Carousel";
import Calendar from "./components/Calendar";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Session } from "next-auth";

interface Announcement {
  id: number;
  title: string;
  description: string;
  imageKey: string | null;
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

type HomeProps = {
  user: Session["user"] | null;
};

export default async function Home({ user }: HomeProps) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
    console.log("Session:", session);
  } catch {
    session = null;
  }
  const isAdmin = Boolean(session?.user?.isAdmin);
  console.log("Is Admin:", isAdmin);
  console.log("User:", session?.user);
  const announcement: Announcement[] = await prisma.announcement
    .findMany({ orderBy: { id: "desc" } })
    .catch(() => []);
  return (
    <div className=" text-left ">
      <Carousel announcement={announcement} isAdmin={isAdmin} />
      <div className="mt-12">
          <Calendar />
      </div>
    </div>
  );
}