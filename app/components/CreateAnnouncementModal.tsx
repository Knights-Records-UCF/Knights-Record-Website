"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, CheckCircle2 } from "lucide-react";

export default function CreateAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();
  const handleImageSelect = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image :)");
      return;
    }

    setImage(file);
  };

  const removeImage = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Preview of chosen image
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

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
        className="rounded-lg bg-red-500 px-4 py-2 text-white cursor-pointer hover:bg-red-600"
      >
        Create New
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-modal-title"
            className="w-full max-w-lg overflow-hidden rounded-xl bg-gray-50 dark:bg-[#1f1f1f] shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#D9D9D9] dark:border-[#363636] px-5 py-3">
              <h2
                id="announcement-modal-title"
                className="text-lg font-semibold text-gray-900 dark:text-[#fbfbfb]"
              >
                Create Announcement
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="cursor-pointer rounded-md p-1 text-gray-900 hover:bg-gray-100 dark:text-[#f5f5f5] dark:hover:bg-[#2a2a2a]"
              >
                <X size={18} />
              </button>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 px-5 py-4">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-900 dark:text-[#fbfbfb]"
                  >
                    Title
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="h-9 w-full rounded-lg border border-gray-400 dark:border-[#363636] bg-gray-100 dark:bg-[#252526] px-3 text-sm text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-900 dark:text-[#fbfbfb]"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className="h-28 w-full resize-none rounded-lg border border-gray-400 dark:border-[#363636] dark:bg-[#252526] bg-gray-100 p-3 text-sm text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="image"
                    className="text-sm font-medium text-gray-900 dark:text-[#fbfbfb]"
                  >
                    Image
                  </label>

                  <input
                    ref={fileInputRef}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="sr-only"
                    onChange={(e) => {
                      handleImageSelect(e.target.files?.[0]);
                    }}
                  />

                  {!image ? (
                    /* Empty Upload State */
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);

                        const file = e.dataTransfer.files[0];

                        if (fileInputRef.current && file) {
                          const transfer = new DataTransfer();
                          transfer.items.add(file);
                          fileInputRef.current.files = transfer.files;
                        }

                        handleImageSelect(file);
                      }}
                      className={`flex h-32 flex-col items-center justify-center rounded-lg border dark:border-[#363636] bg-gray-100 dark:bg-[#252526] ${
                        isDragging
                          ? "border-red-500 bg-red-50"
                          : "border-gray-400"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-white dark:bg-[#1f1f1f] px-5 py-2 text-sm font-medium text-gray-900 dark:text-[#f5f5f5] shadow-sm hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                      >
                        <Upload size={17} />
                        Upload
                      </button>

                      <p className="mt-2 text-xs text-gray-600 dark:text-[#f5f5f5]">
                        Choose an image or drag & drop it here
                      </p>
                    </div>
                  ) : (
                    /* Selected Image State */
                    <div className=" flex h-32 items-start gap-3 rounded-lg border border-gray-400 bg-gray-100 p-3 dark:border-[#363636] dark:bg-[#252526]">
                      {/* Thumbnail */}
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Selected announcement image"
                          className="h-full w-24 shrink-0 rounded-md object-cover"
                        />
                      )}

                      {/* File Info */}
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-[#fbfbfb]">
                          {image.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {formatFileSize(image.size)}
                        </p>

                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
                          <CheckCircle2 size={14} />
                          Ready
                        </div>
                      </div>

                      {/* Remove image */}
                      <button
                        type="button"
                        onClick={removeImage}
                        aria-label="Remove image"
                        className="shrink-0 cursor-pointer rounded-md p-1 text-gray-700 hover:bg-gray-200 dark:text-[#f5f5f5] dark:hover:bg-[#2a2a2a]"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <footer className="flex items-center justify-between border-t border-[#D9D9D9] dark:border-[#363636] px-5 py-3">
                <button
                  type="button"
                  className="cursor-pointer rounded-lg border border-gray-300 bg-gray-200 dark:bg-[#252526] dark:text-[#f5f5f5] dark:hover:bg-[#2a2a2a] dark:border-[#363636] px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
                >
                  Preview
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-[#252526] dark:text-[#f5f5f5] dark:hover:bg-[#2a2a2a]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                  >
                    Create!
                  </button>
                </div>
              </footer>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
