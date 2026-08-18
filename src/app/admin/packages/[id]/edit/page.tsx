"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updatePackage } from "../../actions";

interface Package {
  id: string;
  title: string;
  subtitle: string;
  price: number | null;
  features: string[];
  highlighted: boolean;
  cta_text: string;
}

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.id as string;

  const [pkg, setPkg] = useState<Package | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [highlighted, setHighlighted] = useState(false);
  const [ctaText, setCtaText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchPackage() {
      const response = await fetch(`/api/packages/${packageId}`);
      
      if (!response.ok) {
        setError("Package not found.");
        setFetching(false);
        return;
      }

      const data = await response.json();
      
      if (!data.package) {
        setError("Package not found.");
        setFetching(false);
        return;
      }

      setPkg(data.package);
      setTitle(data.package.title);
      setSubtitle(data.package.subtitle);
      setPrice(data.package.price ? data.package.price.toString() : "");
      setFeatures(data.package.features.join("\n"));
      setHighlighted(data.package.highlighted);
      setCtaText(data.package.cta_text);
      setFetching(false);
    }

    fetchPackage();
  }, [packageId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("price", price);
    formData.append("features", features);
    formData.append("highlighted", highlighted.toString());
    formData.append("cta_text", ctaText);

    const result = await updatePackage(packageId, formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/admin/packages");
    router.refresh();
  }

  if (fetching) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-gray-600">Loading package...</p>
        </div>
      </main>
    );
  }

  if (error && !pkg) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push("/admin/packages")}
              className="mt-4 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Back to Packages
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
            Edit Package
          </h1>
          <p className="mt-2 text-gray-600">
            Update package details
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
                placeholder="e.g., Wedding Photography"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="subtitle"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Subtitle
              </label>
              <input
                id="subtitle"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g., Timeless storytelling of your day"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price (USD)
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 2500"
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty for "Contact for pricing"
              </p>
            </div>

            <div>
              <label
                htmlFor="features"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Features
              </label>
              <textarea
                id="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Enter each feature on a new line:
Full day coverage
High-resolution edited digital gallery
Online sharing platform
Luxury wedding album"
                required
                rows={8}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black font-mono text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter each feature on a new line
              </p>
            </div>

            <div>
              <label
                htmlFor="cta_text"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                CTA Text
              </label>
              <input
                id="cta_text"
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="e.g., Request Package"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div className="flex items-center">
              <input
                id="highlighted"
                type="checkbox"
                checked={highlighted}
                onChange={(e) => setHighlighted(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label
                htmlFor="highlighted"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Highlighted (Recommended)
              </label>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push("/admin/packages")}
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
