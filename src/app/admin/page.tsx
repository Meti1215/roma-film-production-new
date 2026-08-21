import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import Link from "next/link";

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-[#120D08] p-8 text-[#FFFFFF]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#C9A066]/30 bg-[#12100E] p-8 shadow">
          <h1 className="text-2xl font-semibold text-[#C9A066]">
            Supabase configuration required
          </h1>
          <p className="mt-3 text-[#A19688]">
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart the development server.
          </p>
        </div>
      </main>
    );
  }

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
    <main className="min-h-screen bg-[#120D08] p-8 text-[#FFFFFF]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#C9A066]">
            Roma Film Production
          </h1>

          <p className="mt-2 text-[#A19688]">
            Admin Dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/photos"
            className="rounded-2xl border border-[#C9A066]/30 bg-[#12100E] p-6 shadow transition-shadow hover:border-[#C9A066]/70 hover:shadow-[0_10px_30px_rgba(201,160,102,0.12)]"
          >
            <p className="text-sm text-[#A19688]">
              Photos
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#F5F3F0]">
              {photosCount ?? 0}
            </p>
          </Link>

          <Link
            href="/admin/videos"
            className="rounded-2xl border border-[#C9A066]/30 bg-[#12100E] p-6 shadow transition-shadow hover:border-[#C9A066]/70 hover:shadow-[0_10px_30px_rgba(201,160,102,0.12)]"
          >
            <p className="text-sm text-[#A19688]">
              Videos
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#F5F3F0]">
              {videosCount ?? 0}
            </p>
          </Link>

          <Link
            href="/admin/packages"
            className="rounded-2xl border border-[#C9A066]/30 bg-[#12100E] p-6 shadow transition-shadow hover:border-[#C9A066]/70 hover:shadow-[0_10px_30px_rgba(201,160,102,0.12)]"
          >
            <p className="text-sm text-[#A19688]">
              Packages
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#F5F3F0]">
              {packagesCount ?? 0}
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}