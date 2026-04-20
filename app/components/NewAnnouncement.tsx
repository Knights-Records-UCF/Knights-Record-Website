import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type AnnouncementFormProps = {
  submitLabel: string;
  action: (formData: FormData) => Promise<void>;
};

function AnnouncementForm({ submitLabel, action }: AnnouncementFormProps) {
  return (
    <div className="border mt-4 w-90">
      <h2>Create Announcement</h2>
      <Form action={action} className="">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            rows={1}
            required
          />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            type="text"
            id="backgroundColor"
            name="backgroundColor"
            placeholder="Enter background color"
            required
          />
        </div>
        <button type="submit" className="bg-gray-500 p-2 rounded-xl">
          {submitLabel}
        </button>
      </Form>
    </div>
  );
}

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
        <AnnouncementForm
          submitLabel="Create announcement!"
          action={createAnnouncement}
        />
  );
}
