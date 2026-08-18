"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteVideo(videoId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete videos." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "You do not have administrator access." };
  }

  const { error: dbError } = await supabase
    .from("videos")
    .delete()
    .eq("id", videoId);

  if (dbError) {
    return { error: `Failed to delete video: ${dbError.message}` };
  }

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");

  return { success: true };
}

export async function createVideo(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create videos." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "You do not have administrator access." };
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const videoUrl = formData.get("video_url") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  if (!category || !category.trim()) {
    return { error: "Category is required." };
  }

  if (!videoUrl || !videoUrl.trim()) {
    return { error: "Video URL is required." };
  }

  const { error: dbError } = await supabase
    .from("videos")
    .insert({
      title: title.trim(),
      category: category.trim(),
      video_url: videoUrl.trim(),
      thumbnail_url: thumbnailUrl ? thumbnailUrl.trim() : null,
    });

  if (dbError) {
    return { error: `Failed to create video: ${dbError.message}` };
  }

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");

  return { success: true };
}

export async function updateVideo(videoId: string, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update videos." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "You do not have administrator access." };
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const videoUrl = formData.get("video_url") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  if (!category || !category.trim()) {
    return { error: "Category is required." };
  }

  if (!videoUrl || !videoUrl.trim()) {
    return { error: "Video URL is required." };
  }

  const { error: dbError } = await supabase
    .from("videos")
    .update({
      title: title.trim(),
      category: category.trim(),
      video_url: videoUrl.trim(),
      thumbnail_url: thumbnailUrl ? thumbnailUrl.trim() : null,
    })
    .eq("id", videoId);

  if (dbError) {
    return { error: `Failed to update video: ${dbError.message}` };
  }

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");

  return { success: true };
}
