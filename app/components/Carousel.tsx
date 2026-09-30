"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Announcement {
  id: number;
  title: string;
  description: string;
  imageKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ModalProps {
  announcement: Announcement;
  isAdmin: boolean;
  onClose: () => void;
}

interface ButtonProps {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface CarouselProps {
  announcement: Announcement[];
  isAdmin: boolean;
}

const R2_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_URL;
const CARD_STEP = 256;

function Modal({ announcement, isAdmin, onClose }: ModalProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(announcement.title);
  const [description, setDescription] = useState(announcement.description);
  const [imageKey, setImageKey] = useState(announcement.imageKey || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const imageUrl = announcement.imageKey
    ? `${R2_URL}/${announcement.imageKey}`
    : "";

  async function saveAnnouncement() {
    if (!title.trim() || !description.trim() || !imageKey.trim()) {
      setError("All fields are required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`/api/announcements/${announcement.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          imageKey: imageKey.trim(),
        }),
      });

      if (!res.ok) {
        setError("Failed to update announcement.");
        return;
      }

      router.refresh(); // Refresh the page to show the updated announcement
      onClose();
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteAnnouncement() {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/announcements/${announcement.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setError("Failed to delete announcement.");
        return;
      }

      router.refresh(); // Refresh the page to show the updated announcement
      onClose();
    } catch {
      setError("Failed to delete announcement.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex p-4 items-center text-center justify-center bg-black/10"
      onClick={onClose}
    >
      <div
        className="w-100 h-100 bg-white rounded-xl  shadow-2xl drop-shadow-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex w-full justify-center">
          <h2 className="text-2xl font-bold text-[#656565] p-2 w-[90%] ">
            {announcement.title}{" "}
          </h2>
          <button
            className="font-bold text-[#656565]/90 hover:text-black transition-all duration-300 ease-in-out"
            onClick={onClose}
          >
            {" "}
            X
          </button>
        </div>
        <div
          className={`w-full h-full bg-cover bg-center`}
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "none" }}
        />
        {!isEditing && !deleteConfirm && (
          <div>
            <p className="text-[#656565] h-24 p-2 ">
              {announcement.description}
            </p>
            {isAdmin && (
              <div className="gap-2 flex flex-row justify-center">
                <button
                  type="button"
                  className="mb-3 rounded-lg bg-gray-500 p-3"
                  onClick={() => setIsEditing(true)}
                >
                  Edit announcement
                </button>
                <button
                  type="button"
                  className="mb-3 rounded-lg bg-gray-500 p-3"
                  onClick={() => setDeleteConfirm(true)}
                >
                  Delete announcement
                </button>
              </div>
            )}
          </div>
        )}

        {isEditing && isAdmin && (
          <div className="w-full p-4 text-left">
            <div className="mb-2">
              <label htmlFor="edit-title" className="block text-sm">
                Title
              </label>
              <input
                id="edit-title"
                type="text"
                className="w-full border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="edit-description" className="block text-sm">
                Description
              </label>
              <textarea
                id="edit-description"
                className="w-full border"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="edit-image-key" className="block text-sm">
                Image Key
              </label>
              <input
                id="edit-image-key"
                type="text"
                className="w-full border"
                value={imageKey}
                onChange={(e) => setImageKey(e.target.value)}
              />
            </div>

            {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg bg-gray-500 w-full"
                onClick={saveAnnouncement}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                className="rounded-lg border w-full"
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                }}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {deleteConfirm && isAdmin && (
          <div>
            <p className="text-[#656565] h-24 p-2">
              Are you sure you want to delete this announcement?
            </p>

            {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg bg-gray-500 w-full"
                onClick={deleteAnnouncement}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                className="rounded-lg border w-full"
                onClick={() => {
                  setError("");
                  setDeleteConfirm(false);
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Find icons for this button later
function TempButton({ onPrev, onNext, canPrev, canNext }: ButtonProps) {
  return (
    <div className="flex flex-row gap-2 dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
      <button
        type="button"
        disabled={!canPrev}
        aria-label="Previous announcement"
        className="disabled:opacity-30"
        onClick={onPrev}
      >
        {"<"}
      </button>
      <button
        type="button"
        disabled={!canNext}
        aria-label="Next announcement"
        className="disabled:opacity-30"
        onClick={onNext}
      >
        {">"}
      </button>
    </div>
  );
}

export default function Carousel({ announcement, isAdmin }: CarouselProps) {
  const [visibleAnnouncement, setVisibleAnnouncement] = useState(0);
  const [currAnnouncement, setCurrAnnouncement] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [maxOffset, setMaxOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      setMaxOffset(
        Math.max(
          0,
          track.getBoundingClientRect().width - container.clientWidth,
        ),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.ceil(maxOffset / CARD_STEP);
  const currentIndex = Math.min(visibleAnnouncement, maxIndex);
  const offset = Math.min(currentIndex * CARD_STEP, maxOffset);

  if (visibleAnnouncement !== currentIndex) {
    setVisibleAnnouncement(currentIndex);
  }

  const showLeftFade = offset > 0;
  const showRightFade = offset < maxOffset;
  const from = showLeftFade ? "transparent 0%, black 6%" : "black 0%";
  const to = showRightFade ? "black 94%, transparent 100%" : "black 100%";
  const maskImage = `linear-gradient(to right, ${from}, ${to})`;

  function prev() {
    setVisibleAnnouncement((index) => Math.max(0, index - 1));
  }

  function next() {
    setVisibleAnnouncement((index) => Math.min(maxIndex, index + 1));
  }

  return (
    <div className="overflow-hidden relative">
      <div className="flex mt-2 items-center ">
        <h1 className=" text-[#656565] dark:text-[#fbfbfb] font-[525] text-3xl transition-all duration-300 ease-in-out">
          Announcements
        </h1>
        <div className="ml-2">
          <TempButton
            onPrev={prev}
            onNext={next}
            canPrev={showLeftFade}
            canNext={showRightFade}
          />
        </div>
      </div>
      <div className="border border-[#D9D9D9] dark:border-[#363636] mb-0.5 transition-all duration-300 ease-in-out" />
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        <div
          ref={trackRef}
          className="flex w-max flex-row gap-4 transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {announcement.map((item) => {
            const imageUrl = item.imageKey ? `${R2_URL}/${item.imageKey}` : "";

            return (
              <div key={item.id} className="w-60 shrink-0">
                <h1 className="text-[#656565] dark:text-[#AEAEAE] text-[14px] font-525 transition-all duration-300 ease-in-out">
                  {item.title}
                </h1>
                <p className="text-[#656565] dark:text-[#D9D9D9] w-52 text-[14px] text-left leading-none truncate transition-all duration-300 ease-in-out">
                  {item.description}
                </p>
                <div
                  className={`mt-1.5 h-42 w-60 rounded-xl`}
                  style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => {
                    setShowModal(true);
                    setCurrAnnouncement(announcement.indexOf(item));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {showModal && announcement[currAnnouncement] && (
        <Modal
          announcement={announcement[currAnnouncement]}
          isAdmin={isAdmin}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
