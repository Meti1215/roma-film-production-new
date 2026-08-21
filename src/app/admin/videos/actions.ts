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

  // Get video data to extract storage paths
  const { data: video } = await supabase
    .from("videos")
    .select("video_url, thumbnail_url")
    .eq("id", videoId)
    .single();

  if (!video) {
    return { error: "Video not found." };
  }

  // Delete video file from storage if it's a Supabase storage URL
  if (video.video_url && video.video_url.includes('/storage/v1/object/public/videos/')) {
    const urlParts = video.video_url.split('/storage/v1/object/public/videos/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      const { error: videoStorageError } = await supabase.storage
        .from('videos')
        .remove([filePath]);

      if (videoStorageError) {
        console.error('Failed to delete video from storage:', videoStorageError);
        // Continue with database deletion even if storage deletion fails
      }
    }
  }

  // Delete thumbnail from storage if it's a Supabase storage URL
  if (video.thumbnail_url && video.thumbnail_url.includes('/storage/v1/object/public/videos/')) {
    const urlParts = video.thumbnail_url.split('/storage/v1/object/public/videos/');
    if (urlParts.length > 1) {
      const filePath = urlParts[1];
      const { error: thumbnailStorageError } = await supabase.storage
        .from('videos')
        .remove([filePath]);

      if (thumbnailStorageError) {
        console.error('Failed to delete thumbnail from storage:', thumbnailStorageError);
        // Continue with database deletion even if storage deletion fails
      }
    }
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
  const videoUrl = formData.get("video_url") as string;
  const thumbnailUrl = formData.get("thumbnail_url") as string;

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  if (!videoUrl || !videoUrl.trim()) {
    return { error: "Video URL is required." };
  }

  const { error: dbError } = await supabase
    .from("videos")
    .insert({
      title: title.trim(),
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

  if (!videoUrl || !videoUrl.trim()) {
    return { error: "Video URL is required." };
  }

  const updateData: any = {
    title: title.trim(),
    video_url: videoUrl.trim(),
    thumbnail_url: thumbnailUrl ? thumbnailUrl.trim() : null,
  };

  // Only include category if it's provided (for backward compatibility)
  if (category && category.trim()) {
    updateData.category = category.trim();
  }

  const { error: dbError } = await supabase
    .from("videos")
    .update(updateData)
    .eq("id", videoId);

  if (dbError) {
    return { error: `Failed to update video: ${dbError.message}` };
  }

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  revalidatePath("/");

  return { success: true };
}
