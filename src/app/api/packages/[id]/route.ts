import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const packageId = params.id;

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", packageId)
    .single();

  if (error || !pkg) {
    return NextResponse.json(
      { error: "Package not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ package: pkg });
}
