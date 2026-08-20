import React from 'react'
import Navigation from '@/components/Navigation'
import PhotoGallery from '@/components/PhotoGallery'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { brand } from '@/lib/brand'

// Normalize category names to match existing system
function normalizeCategory(category: string | null): string {
  if (!category) return 'Weddings'
  const categoryMap: Record<string, string> = {
    'Wedding': 'Weddings',
    'Couple': 'Couples',
    'Engagement': 'Engagement',
    'Portrait': 'Portraits',
    'Family': 'Family',
    'Event': 'Events',
    'Bride & Groom': 'Bride & Groom',
  }
  return categoryMap[category] || category
}

export default async function PhotosPage() {
  let supabasePhotos: Array<{
    image_url: string
    title: string
    category: string | null
  }> = []

  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('photos')
      .select('image_url, title, category')
      .order('created_at', { ascending: false })

    supabasePhotos = data || []
  }

  const mappedSupabasePhotos = supabasePhotos?.map(photo => ({
    src: photo.image_url,
    alt: photo.title,
    categories: [normalizeCategory(photo.category)],
  })) || []

  const allPhotos = [...mappedSupabasePhotos, ...brand.photos]

  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <PhotoGallery photos={allPhotos} />
      </div>
      <Footer />
    </main>
  )
}
