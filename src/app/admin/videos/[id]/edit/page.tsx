"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateVideo } from "../../actions";

interface Video {
  id: string;
  title: string;
  category: string;
  video_url: string;
  thumbnail_url: string | null;
}

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;

  const [video, setVideo] = useState<Video | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const categories = ["Wedding", "Couples", "Family", "Events", "Portrait", "Other", "Highlight Film"];

  useEffect(() => {
    async function fetchVideo() {
      const response = await fetch(`/api/videos/${videoId}`);
      
      if (!response.ok) {
        setError("Video not found.");
        setFetching(false);
        return;
      }

      const data = await response.json();
      
      if (!data.video) {
        setError("Video not found.");
        setFetching(false);
        return;
      }

      setVideo(data.video);
      setTitle(data.video.title);
      setCategory(data.video.category);
      setVideoUrl(data.video.video_url);
      setThumbnailUrl(data.video.thumbnail_url || "");
      setFetching(false);
    }

    fetchVideo();
  }, [videoId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("video_url", videoUrl);
    formData.append("thumbnail_url", thumbnailUrl);

    const result = await updateVideo(videoId, formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin/videos");
    router.refresh();
  }

  if (fetching) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-gray-600">Loading video...</p>
        </div>
      </main>
    );
  }

  if (error && !video) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push("/admin/videos")}
              className="mt-4 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Back to Videos
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-black">
            Edit Video
          </h1>
          <p className="mt-2 text-gray-600">
            Update video details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Ethiopian Wedding Highlights"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="video_url"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Video URL
              </label>
              <input
                id="video_url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="e.g., https://example.com/video.mp4"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
              <p className="mt-1 text-xs text-gray-500">
                Supports direct video URLs (MP4, WebM, etc.)
              </p>
            </div>

            <div>
              <label
                htmlFor="thumbnail_url"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Thumbnail URL (optional)
              </label>
              <input
                id="thumbnail_url"
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="e.g., https://example.com/thumbnail.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to use default thumbnail
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin/videos")}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-black transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
