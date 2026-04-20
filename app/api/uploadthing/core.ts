import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
    .middleware(async () => {
        const session = await getServerSession(authOptions);

        console.log("Session in middleware:", session);

        /*if (!session?.user?.isAdmin) {
            throw new UploadThingError("Unauthorized");
        }*/

        return { userId: session?.user.name ?? "Unknown" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);

        console.log("File URL:", file.url);

        return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;