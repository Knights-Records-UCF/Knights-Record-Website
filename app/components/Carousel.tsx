"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ModalProps {
  announcement: Announcement;
  isAdmin: boolean;
  onClose: () => void;
}

interface ButtonProps {
  onPrev: () => void;
  onNext: () => void;
}

interface CarouselProps {
  announcement: Announcement[];
  isAdmin: boolean;
}

function Modal({ announcement, isAdmin, onClose }: ModalProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(announcement.title);
  const [description, setDescription] = useState(announcement.description);
  const [backgroundColor, setBackgroundColor] = useState(
    announcement.backgroundColor,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  async function saveAnnouncement() {
    if (!title.trim() || !description.trim() || !backgroundColor.trim()) {
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
          backgroundColor: backgroundColor.trim(),
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
          className={`w-full h-full`}
          style={{ backgroundColor: announcement.backgroundColor }}
        />
        {!isEditing && !deleteConfirm && (
          <div>
            <p className="text-[#656565] h-24 p-2">
              {announcement.description}
            </p>
            {isAdmin && (
              <div>
                <button
                  type="button"
                  className="mb-3 rounded-lg bg-gray-500 p-4"
                  onClick={() => setIsEditing(true)}
                >
                  Edit announcement
                </button>
                <button
                  type="button"
                  className="mb-3 rounded-lg bg-gray-500 p-4"
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
              <label htmlFor="edit-background-color" className="block text-sm">
                Background Color
              </label>
              <input
                id="edit-background-color"
                type="text"
                className="w-full border"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
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
function TempButton({ onPrev, onNext }: ButtonProps) {
  return (
    <div className="flex flex-row gap-2">
      <button onClick={onPrev}>{"<"}</button>
      <button onClick={onNext}>{">"}</button>
    </div>
  );
}

export default function Carousel({ announcement, isAdmin }: CarouselProps) {
  const [visibleAnnouncement, setVisibleAnnouncement] = useState(0);
  const [currAnnouncement, setCurrAnnouncement] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function prev() {
    setVisibleAnnouncement(
      visibleAnnouncement === 0
        ? announcement.length - 1
        : visibleAnnouncement - 1,
    );
  }

  function next() {
    // >= just for flexibility between showcasing two announcements at a time or just one, depends on what we wanna do
    setVisibleAnnouncement(
      visibleAnnouncement >= announcement.length - 1
        ? 0
        : visibleAnnouncement + 1,
    );
  }

  return (
    <div className="overflow-hidden relative">
      <div className="flex mt-2 items-center ">
        <h1 className=" text-[#656565] font-[525] text-3xl">Announcements</h1>
        <div className="ml-2">
          <TempButton onPrev={prev} onNext={next} />
        </div>
      </div>
      <div className="border border-[#D9D9D9] mb-0.5" />
      <div
        className="flex flex-row gap-4 transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${visibleAnnouncement * 256}px)` }} // 256 bc w-60 + gap-4 omggggg
      >
        {announcement.map((item) => (
          <div key={item.id} className="w-60">
            <h1 className="text-[#656565] text-[14px] font-525">
              {item.title}
            </h1>
            <p className="text-[#656565] w-52 text-[14px] text-left leading-none line-clamp-2">
              {item.description}
            </p>
            <div
              className={`mt-1.5 h-42 w-60 rounded-xl`}
              style={{ backgroundColor: item.backgroundColor }}
              onClick={() => {
                setShowModal(true);
                setCurrAnnouncement(announcement.indexOf(item));
              }}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          announcement={announcement[currAnnouncement]}
          isAdmin={isAdmin}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
