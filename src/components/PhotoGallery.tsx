'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { brand } from '@/lib/brand'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface PhotoGalleryProps {
  photos?: typeof brand.photos
}

export default function PhotoGallery({ photos = brand.photos }: PhotoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = ['All', 'Weddings', 'Bride & Groom', 'Engagement', 'Family', 'Events']
  const isHomePage = photos === brand.homePagePhotos
  const showFilters = !isHomePage

  // Filter photos - only filter if showing all photos and filters are enabled
  const filteredPhotos = showFilters && activeCategory !== 'All'
    ? photos.filter(p => p.categories && p.categories.includes(activeCategory))
    : photos

  const openLightbox = (photoSrc: string) => {
    const idx = photos.findIndex(p => p.src === photoSrc)
    if (idx !== -1) {
      setLightboxIndex(idx)
    }
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (lightboxIndex === null) return
    let newIndex = direction === 'next' ? lightboxIndex + 1 : lightboxIndex - 1

    if (newIndex >= photos.length) {
      newIndex = 0
    } else if (newIndex < 0) {
      newIndex = photos.length - 1
    }

    setLightboxIndex(newIndex)
  }

  return (
    <section id="photos" className={`${isHomePage ? 'py-4 md:py-6 px-4 sm:px-6 lg:px-8' : 'py-8 md:py-12 px-3 sm:px-4 lg:px-5'} bg-background`}>
      <div className={`${isHomePage ? 'max-w-7xl' : 'max-w-none'} mx-auto`}>

        {/* Title */}
        <div className={`text-center max-w-2xl mx-auto ${isHomePage ? 'mb-3' : 'mb-6'}`}>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-1 block">
            Visual Portfolio
          </span>
          <h2 className={`${isHomePage ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-heading font-medium tracking-wide mb-2 text-foreground`}>
            Photos
          </h2>
          <div className={`w-12 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto ${isHomePage ? 'hidden' : 'block'}`} />
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-4 ${isHomePage ? 'mb-4' : 'mb-8'} overflow-x-auto pb-2 scrollbar-none`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-wider font-semibold border transition-all duration-300 ${
                  activeCategory === category
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-transparent text-foreground/75 hover:border-foreground/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Photos Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(4,22%)] lg:justify-between">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.src}
              onClick={() => openLightbox(photo.src)}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-transparent photo-hover-trigger"
            >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="eager"
                  priority
                  quality={85}
                  unoptimized={photo.src.startsWith('https://fnbxlfpzhhxyalzghbzr.supabase.co') || photo.src.includes('photo22.jpg') || photo.src.includes('photo21.jpg') || photo.src.includes('photo23.jpg') || photo.src.includes('photo24.jpg') || photo.src.includes('photo25.jpg') || photo.src.includes('photo26.jpg') || photo.src.includes('photo27.jpg') || photo.src.includes('photo28.jpg') || photo.src.includes('photo29.jpg') || photo.src.includes('photo30.jpg') || photo.src.includes('photo31.jpg') || photo.src.includes('photo32.jpg') || photo.src.includes('photo34.jpg') || photo.src.includes('photo35.jpg') || photo.src.includes('photo36.jpg')}
                />

              {/* Overlay on hover - only show for full gallery, not home page */}
              {!isHomePage && (
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                  <div className="text-center p-4">
                    <Maximize2 className="w-6 h-6 text-white mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] tracking-widest uppercase text-white/90 font-medium block">
                      {photo.categories ? photo.categories[0] : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox dialog modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 select-none"
          >
            {/* Top Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white focus:outline-none p-2 z-50 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Navigate Button */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white focus:outline-none p-2 z-40 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Main Image */}
            <div className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  unoptimized={photos[lightboxIndex].src.startsWith('https://fnbxlfpzhhxyalzghbzr.supabase.co') || photos[lightboxIndex].src.includes('photo22.jpg') || photos[lightboxIndex].src.includes('photo21.jpg') || photos[lightboxIndex].src.includes('photo23.jpg') || photos[lightboxIndex].src.includes('photo24.jpg') || photos[lightboxIndex].src.includes('photo25.jpg') || photos[lightboxIndex].src.includes('photo26.jpg') || photos[lightboxIndex].src.includes('photo27.jpg') || photos[lightboxIndex].src.includes('photo28.jpg') || photos[lightboxIndex].src.includes('photo29.jpg') || photos[lightboxIndex].src.includes('photo30.jpg') || photos[lightboxIndex].src.includes('photo31.jpg') || photos[lightboxIndex].src.includes('photo32.jpg') || photos[lightboxIndex].src.includes('photo34.jpg') || photos[lightboxIndex].src.includes('photo35.jpg') || photos[lightboxIndex].src.includes('photo36.jpg')}
                />
              </motion.div>
              
              {/* Image Description Footer */}
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/80 text-xs md:text-sm tracking-wider px-4">
                <span className="font-heading italic">
                  {photos[lightboxIndex].alt}
                </span>
                <span className="mx-2 text-white/30">|</span>
                <span className="uppercase text-[10px] text-accent tracking-widest font-semibold">
                  {photos[lightboxIndex].categories ? photos[lightboxIndex].categories.join(', ') : ''}
                </span>
              </div>
            </div>

            {/* Right Navigate Button */}
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white focus:outline-none p-2 z-40 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
