"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deletePackage } from "./actions";
import { Check, Star } from "lucide-react";

interface Package {
  id: string;
  title: string;
  subtitle: string;
  price: number | null;
  features: string[];
  highlighted: boolean;
  cta_text: string;
}

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function formatPrice(price: number | null): string {
    if (price === null) return "Contact for pricing";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  async function handleDelete() {
    setError("");
    setDeleting(true);

    const result = await deletePackage(pkg.id);

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
          Are you sure you want to delete "{pkg.title}"?
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
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-black">
            {pkg.title}
          </h3>
          {pkg.highlighted && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500 mb-3">
          {pkg.subtitle}
        </p>
        <p className="text-lg font-bold text-black mb-4">
          {formatPrice(pkg.price)}
        </p>
        <div className="space-y-2 mb-4">
          {pkg.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start text-xs text-gray-600">
              <Check className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
          {pkg.features.length > 3 && (
            <p className="text-xs text-gray-500">
              +{pkg.features.length - 3} more features
            </p>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/admin/packages/${pkg.id}/edit`}
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
