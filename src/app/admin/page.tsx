import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id, email")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  const { count: photosCount } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true });

  const { count: packagesCount } = await supabase
    .from("packages")
    .select("*", { count: "exact", head: true });

  const { count: videosCount } = await supabase
    .from("videos")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-black">
            Roma Film Production
          </h1>

          <p className="mt-2 text-gray-600">
            Admin Dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/photos"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition-shadow"
          >
            <p className="text-sm text-gray-500">
              Photos
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {photosCount ?? 0}
            </p>
          </Link>

          <Link
            href="/admin/videos"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition-shadow"
          >
            <p className="text-sm text-gray-500">
              Videos
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {videosCount ?? 0}
            </p>
          </Link>

          <Link
            href="/admin/packages"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition-shadow"
          >
            <p className="text-sm text-gray-500">
              Packages
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {packagesCount ?? 0}
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}