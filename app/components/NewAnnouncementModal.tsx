"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!image) {
      console.error("Image required");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/announcements/upload", {
      method: "POST",
      body: formData,
    });

    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-4 rounded-xl bg-gray-600 px-4 py-2 text-white"
      >
        Create Announcement
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Create Announcement
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-1 hover:bg-gray-100"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  required
                  className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  rows={3}
                  required
                  className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="image" className="text-sm font-medium">
                  Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  required
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setImage(file);
                    }
                  }}
                  className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-gray-600 p-3 text-white"
                >
                  Create announcement!
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-gray-300 p-3 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}