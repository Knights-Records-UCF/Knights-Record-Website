import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/r2";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData();

  // 
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!title || !description) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const image = formData.get("image")

  if (!image || !(image instanceof File)) {
    return Response.json(
      { error: "Missing or invalid image file" },
      { status: 400 }
    );
  }


  const announcement = await prisma.announcement.create({
    data: {
      title,
      description,
      imageKey: null // initially null till "rehydration" (not really rehydration)
    },
  });

  console.log("created announcement", announcement.id);

  const extension = image.name.split(".").pop();
  const imageKey = `announcements/${announcement.id}.${extension}`;

  console.log("Uploading:", {
    imageKey,
    imageName: image.name,
    imageType: image.type,
    imageSize: image.size,
  });

  await uploadImage(image, imageKey);

  console.log("complete")

  const updatedAnnouncement = await prisma.announcement.update({
    where: { id: announcement.id },
    data: { imageKey },
  });

  revalidatePath("/");

  return Response.json(updatedAnnouncement, { status: 201 });
}