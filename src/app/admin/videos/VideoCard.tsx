"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteVideo } from "./actions";
import { Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  category: string;
  video_url: string;
  thumbnail_url: string | null;
}

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    setDeleting(true);

    const result = await deleteVideo(video.id);

    if (result.error) {
      setError(result.error);
      setDeleting(false);
      setShowConfirm(false);
      return;
    }

    router.refresh();
  }

  if (showConfirm) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow">
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete "{video.title}"?
        </p>
        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 mb-4">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowConfirm(false);
              setError("");
            }}
            disabled={deleting}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow overflow-hidden">
      <div className="relative aspect-[16/9] bg-gray-100">
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-black line-clamp-1">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {video.category}
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/admin/videos/${video.id}/edit`}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-black transition hover:bg-gray-50"
          >
            Edit
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
