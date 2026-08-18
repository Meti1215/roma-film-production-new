import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PackageCard from "./PackageCard";

export default async function AdminPackagesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: true });

  console.log("=== ADMIN PACKAGES DIAGNOSTIC ===");
  console.log("Packages count:", packages?.length);
  console.log("Packages data:", JSON.stringify(packages, null, 2));

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-black">
              Packages
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your service packages
            </p>
          </div>
          <Link
            href="/admin/packages/new"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            + Add Package
          </Link>
        </div>

        {!packages || packages.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <p className="text-lg text-gray-600">
              No packages yet
            </p>
            <Link
              href="/admin/packages/new"
              className="mt-4 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Add Package
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
