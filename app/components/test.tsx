"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function AnnouncementImageUploader() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Upload complete:", res);
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
        alert(`Upload error: ${error.message}`);
      }}
    />
  );
}