import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const videoId = params.id;

  const { data: video, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", videoId)
    .single();

  if (error || !video) {
    return NextResponse.json(
      { error: "Video not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ video });
}
