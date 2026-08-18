"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deletePackage(packageId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete packages." };
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
    .from("packages")
    .delete()
    .eq("id", packageId);

  if (dbError) {
    return { error: `Failed to delete package: ${dbError.message}` };
  }

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");

  return { success: true };
}

export async function createPackage(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create packages." };
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
  const subtitle = formData.get("subtitle") as string;
  const price = formData.get("price") as string;
  const features = formData.get("features") as string;
  const highlighted = formData.get("highlighted") === "true";
  const ctaText = formData.get("cta_text") as string;

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  if (!subtitle || !subtitle.trim()) {
    return { error: "Subtitle is required." };
  }

  if (!ctaText || !ctaText.trim()) {
    return { error: "CTA text is required." };
  }

  const featuresArray = features
    .split("\n")
    .map(f => f.trim())
    .filter(f => f.length > 0);

  if (featuresArray.length === 0) {
    return { error: "At least one feature is required." };
  }

  const priceNumeric = price ? parseFloat(price) : null;

  const { error: dbError } = await supabase
    .from("packages")
    .insert({
      title: title.trim(),
      subtitle: subtitle.trim(),
      price: priceNumeric,
      features: featuresArray,
      highlighted,
      cta_text: ctaText.trim(),
    });

  if (dbError) {
    return { error: `Failed to create package: ${dbError.message}` };
  }

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");

  return { success: true };
}

export async function updatePackage(packageId: string, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update packages." };
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
  const subtitle = formData.get("subtitle") as string;
  const price = formData.get("price") as string;
  const features = formData.get("features") as string;
  const highlighted = formData.get("highlighted") === "true";
  const ctaText = formData.get("cta_text") as string;

  if (!title || !title.trim()) {
    return { error: "Title is required." };
  }

  if (!subtitle || !subtitle.trim()) {
    return { error: "Subtitle is required." };
  }

  if (!ctaText || !ctaText.trim()) {
    return { error: "CTA text is required." };
  }

  const featuresArray = features
    .split("\n")
    .map(f => f.trim())
    .filter(f => f.length > 0);

  if (featuresArray.length === 0) {
    return { error: "At least one feature is required." };
  }

  const priceNumeric = price ? parseFloat(price) : null;

  const { error: dbError } = await supabase
    .from("packages")
    .update({
      title: title.trim(),
      subtitle: subtitle.trim(),
      price: priceNumeric,
      features: featuresArray,
      highlighted,
      cta_text: ctaText.trim(),
    })
    .eq("id", packageId);

  if (dbError) {
    return { error: `Failed to update package: ${dbError.message}` };
  }

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/");

  return { success: true };
}
