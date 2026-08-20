import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { brand } from "@/lib/brand";

function getFallbackPackages() {
  return brand.packages.map((pkg) => ({
    id: pkg.title,
    title: pkg.title,
    subtitle: pkg.subtitle,
    price: null,
    features: pkg.features,
    highlighted: pkg.highlighted || false,
    cta_text: pkg.ctaText,
  }));
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ packages: getFallbackPackages() });
  }

  try {
    const supabase = await createClient();

    const { data: packages, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch packages:", error);
      return NextResponse.json({ packages: getFallbackPackages() });
    }

    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Packages API error:", error);
    return NextResponse.json({ packages: getFallbackPackages() });
  }
}
