/* Comments
 * Ok so right now this is gonna just be to post announcements,
 * but I'll probably end up refactoring the component to just POST
 * and taking in props to specify what type of post that is trying to be made.
 * Ex. Teams page would be like <newAnnouncement postType=Teams/> or something.
 * I'm using this to learn for now
 */

import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function newAnnouncement() {
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
    <div className="border mt-4 w-90">
      <h2>Create Announcement</h2>
      <Form action={createAnnouncement} className="">
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
            // type="text"
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
        <button 
            type="submit"
            className="bg-gray-500 p-2 rounded-xl">Create announcement!</button>
      </Form>
    </div>
  );
}
