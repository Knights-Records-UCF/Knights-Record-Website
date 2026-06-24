
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import NewAnnouncementModal from "./NewAnnouncementModal";

export default function NewAnnouncement() {
  async function createAnnouncement(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const backgroundColor = formData.get("backgroundColor") as string;

    await prisma.announcement.create({
      data: {
        title,
        description,
        backgroundColor,
      },
    });

    revalidatePath("/");
    redirect("/");
  }

  return (
    <NewAnnouncementModal action={createAnnouncement} />
  );
}
