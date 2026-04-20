import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const announcementId = Number(id);

  if (!announcementId) {
    return Response.json({ error: "Invalid announcement id" }, { status: 400 });
  }

  const body = (await req.json()) as {
    title?: string;
    description?: string;
    backgroundColor?: string;
  };

  const title = body.title?.trim();
  const description = body.description?.trim();
  const backgroundColor = body.backgroundColor?.trim();

  if (!title || !description || !backgroundColor) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await prisma.announcement.update({
      where: { id: announcementId },
      data: {
        title,
        description,
        backgroundColor,
      },
    });

    revalidatePath("/");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to update announcement" }, { status: 500 });
  }
}
