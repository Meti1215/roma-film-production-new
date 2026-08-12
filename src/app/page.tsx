'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import PhotoGallery from '@/components/PhotoGallery'
import VideoGallery from '@/components/VideoGallery'
import Testimonials from '@/components/Testimonials'
import Packages from '@/components/Packages'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { brand } from '@/lib/brand'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <PhotoGallery photos={brand.homePagePhotos} />
      <VideoGallery />
      <Testimonials />
      <Packages />
      <Contact />
      <Footer />
    </main>
  )
}
