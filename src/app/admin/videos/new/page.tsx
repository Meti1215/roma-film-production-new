"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createVideo } from "../actions";
import { createClient } from "@/lib/supabase/client";

export default function AddVideoPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate video file type
      const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid video file (MP4, WebM, MOV)");
        setVideoFile(null);
        return;
      }
      setVideoFile(file);
      setError("");
    }
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (JPEG, PNG, WebP)");
        setCoverPhotoFile(null);
        return;
      }
      setCoverPhotoFile(file);
      setError("");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setUploadProgress(0);

    try {
      // Validate title
      if (!title.trim()) {
        setError("Title is required.");
        setLoading(false);
        return;
      }

      // Validate video file
      if (!videoFile) {
        setError("Please select a video file.");
        setLoading(false);
        return;
      }

      // Upload video to Supabase Storage
      setUploadProgress(10);
      const videoExt = videoFile.name.split('.').pop();
      const videoFileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${videoExt}`;
      const videoFilePath = `videos/${videoFileName}`;

      const { data: videoUploadData, error: videoUploadError } = await supabase.storage
        .from('videos')
        .upload(videoFilePath, videoFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (videoUploadError) {
        setError(`Failed to upload video: ${videoUploadError.message}`);
        setLoading(false);
        return;
      }

      setUploadProgress(50);

      // Get public URL for video
      const { data: { publicUrl: videoPublicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(videoUploadData.path);

      let coverPhotoUrl = null;

      // Upload cover photo if provided
      if (coverPhotoFile) {
        setUploadProgress(60);
        const photoExt = coverPhotoFile.name.split('.').pop();
        const photoFileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${photoExt}`;
        const photoFilePath = `video-covers/${photoFileName}`;

        const { data: photoUploadData, error: photoUploadError } = await supabase.storage
          .from('videos')
          .upload(photoFilePath, coverPhotoFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (photoUploadError) {
          setError(`Failed to upload cover photo: ${photoUploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: { publicUrl: photoPublicUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(photoUploadData.path);

        coverPhotoUrl = photoPublicUrl;
      }

      setUploadProgress(80);

      // Create video record in database
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video_url", videoPublicUrl);
      if (coverPhotoUrl) {
        formData.append("thumbnail_url", coverPhotoUrl);
      }

      const result = await createVideo(formData);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setUploadProgress(100);

      // Redirect after successful upload
      setTimeout(() => {
        router.push("/admin/videos");
        router.refresh();
      }, 500);

    } catch (err) {
      setError(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-black">
            Add Video
          </h1>
          <p className="mt-2 text-gray-600">
            Add a new video to your gallery
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
                placeholder="e.g., Ethiopian Wedding"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="video_file"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Video File
              </label>
              <input
                id="video_file"
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska"
                onChange={handleVideoFileChange}
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:opacity-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                Supports MP4, WebM, MOV
              </p>
              {videoFile && (
                <div className="mt-2 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-700">
                  <p className="font-medium">Selected:</p>
                  <p>{videoFile.name}</p>
                  <p className="text-xs text-blue-600">{formatFileSize(videoFile.size)}</p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="cover_photo"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Cover Photo (optional)
              </label>
              <input
                id="cover_photo"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleCoverPhotoChange}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:opacity-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                Supports JPEG, PNG, WebP
              </p>
              {coverPhotoFile && (
                <div className="mt-2 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
                  <p className="font-medium">Selected:</p>
                  <p>{coverPhotoFile.name}</p>
                  <p className="text-xs text-green-600">{formatFileSize(coverPhotoFile.size)}</p>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {loading && uploadProgress > 0 && (
              <div className="rounded-lg bg-blue-50 px-4 py-3">
                <div className="mb-2 flex items-center justify-between text-sm text-blue-700">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Video"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
