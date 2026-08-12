'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import PhotoGallery from '@/components/PhotoGallery'
import Footer from '@/components/Footer'

export default function PhotosPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <PhotoGallery />
      </div>
      <Footer />
    </main>
  )
}
