"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deletePhoto(photoId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete photos." };
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

  const { data: photo } = await supabase
    .from("photos")
    .select("image_url")
    .eq("id", photoId)
    .single();

  if (!photo) {
    return { error: "Photo not found." };
  }

  const urlParts = photo.image_url.split("/");
  const filePath = urlParts[urlParts.length - 1];

  const { error: storageError } = await supabase.storage
    .from("photos")
    .remove([filePath]);

  if (storageError) {
    return { error: `Failed to delete image from storage: ${storageError.message}` };
  }

  const { error: dbError } = await supabase
    .from("photos")
    .delete()
    .eq("id", photoId);

  if (dbError) {
    return { error: `Failed to delete photo from database: ${dbError.message}` };
  }

  revalidatePath("/admin/photos");
  revalidatePath("/");

  return { success: true };
}
