'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import VideoGallery from '@/components/VideoGallery'
import Footer from '@/components/Footer'

export default function VideosPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <VideoGallery />
      </div>
      <Footer />
    </main>
  )
}
