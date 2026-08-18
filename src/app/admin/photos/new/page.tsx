"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AddPhotoPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [optimizedFile, setOptimizedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [optimizedSize, setOptimizedSize] = useState<number>(0);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Wedding", "Couples", "Family", "Events", "Portrait", "Other"];

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  async function optimizeImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        const maxWidth = 2000;
        const maxHeight = 2000;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], `${crypto.randomUUID()}.webp`, {
                type: "image/webp",
              });
              resolve(optimizedFile);
            } else {
              reject(new Error("Canvas to Blob failed"));
            }
          },
          "image/webp",
          0.85
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(selectedFile: File | null) {
    if (!selectedFile) {
      setFile(null);
      setOptimizedFile(null);
      setPreviewUrl("");
      setOriginalSize(0);
      setOptimizedSize(0);
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setOptimizing(true);
    setError("");

    try {
      const optimized = await optimizeImage(selectedFile);
      setOptimizedFile(optimized);
      setOptimizedSize(optimized.size);
      setPreviewUrl(URL.createObjectURL(optimized));
    } catch (err) {
      setError("Failed to optimize image. Please try a different image.");
      setFile(null);
      setOptimizedFile(null);
      setPreviewUrl("");
    } finally {
      setOptimizing(false);
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!category) {
      setError("Category is required.");
      return;
    }

    if (!optimizedFile) {
      setError("Please select a photo to upload.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to upload photos.");
      setLoading(false);
      return;
    }

    try {
      const fileName = `${crypto.randomUUID()}.webp`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, optimizedFile);

      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("photos")
        .insert({
          title,
          category,
          image_url: publicUrl,
        });

      if (dbError) {
        await supabase.storage.from("photos").remove([filePath]);
        setError(`Database error: ${dbError.message}. Photo was deleted.`);
        setLoading(false);
        return;
      }

      router.push("/admin/photos");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-black">
            Add Photo
          </h1>
          <p className="mt-2 text-gray-600">
            Upload a new photo to your gallery
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
                placeholder="Photo title"
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
                htmlFor="photo"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <input
                id="photo"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                required
                disabled={optimizing}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:opacity-50"
              />
              {optimizing && (
                <p className="mt-2 text-sm text-gray-600">
                  Optimizing image...
                </p>
              )}
            </div>

            {previewUrl && (
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Image Preview
                </p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mb-4 h-64 w-full rounded-lg object-contain bg-gray-100"
                />
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Original:</span>
                    <span className="ml-2 text-gray-600">{formatFileSize(originalSize)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Optimized:</span>
                    <span className="ml-2 text-green-600">{formatFileSize(optimizedSize)}</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
