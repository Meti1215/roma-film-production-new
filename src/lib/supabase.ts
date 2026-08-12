import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  read_time: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  category: string
  image_url: string
  thumbnail_url?: string
  storage_path: string
  created_at: string
}

export interface AnnualReport {
  id: string
  title: string
  year: number
  description?: string
  cover_image_url?: string
  cover_storage_path?: string
  pdf_url: string
  pdf_storage_path: string
  page_count?: number
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  name: string
  phone?: string
  email?: string
  interest?: string
  message: string
  status: 'new' | 'seen' | 'resolved'
  created_at: string
}

// Helper functions for file uploads
export async function uploadImage(
  file: File,
  bucket: 'articles' | 'gallery',
  folder?: string
): Promise<{ url: string; path: string } | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return {
      url: publicUrl,
      path: data.path
    }
  } catch (error) {
    console.error('Upload exception:', error)
    return null
  }
}

export async function uploadFile(
  file: File,
  bucket: 'articles' | 'gallery' | 'reports',
  folder?: string
): Promise<{ url: string; path: string } | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return {
      url: publicUrl,
      path: data.path
    }
  } catch (error) {
    console.error('Upload exception:', error)
    return null
  }
}

export async function deleteImage(bucket: 'articles' | 'gallery' | 'reports', path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    return !error
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}
