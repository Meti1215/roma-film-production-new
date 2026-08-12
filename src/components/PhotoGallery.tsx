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

  const categories = ['All', 'Weddings', 'Couples', 'Bride & Groom', 'Engagement', 'Portraits', 'Family', 'Events']
  const showFilters = photos === brand.photos
  const isHomePage = photos === brand.homePagePhotos

  // Filter photos - only filter if showing all photos and filters are enabled
  const filteredPhotos = showFilters && activeCategory !== 'All'
    ? photos.filter(p => p.category === activeCategory)
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
    <section id="photos" className={`${isHomePage ? 'py-4 md:py-6' : 'py-8 md:py-12'} px-4 sm:px-6 lg:px-8 bg-background`}>
      <div className="max-w-7xl mx-auto">

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
        <motion.div
          layout
          className={`grid gap-2 md:gap-4 ${isHomePage ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3'}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={() => openLightbox(photo.src)}
                className={`group relative cursor-pointer overflow-hidden bg-muted photo-hover-trigger ${isHomePage ? 'aspect-[4/5] md:aspect-square' : 'aspect-[3/4] md:aspect-[4/5]'}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 25vw"
                />

                {/* Overlay on hover - only show for full gallery, not home page */}
                {!isHomePage && (
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="text-center p-4">
                      <Maximize2 className="w-6 h-6 text-white mx-auto mb-2 opacity-80 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] tracking-widest uppercase text-white/90 font-medium block">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
                />
              </motion.div>
              
              {/* Image Description Footer */}
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/80 text-xs md:text-sm tracking-wider px-4">
                <span className="font-heading italic">
                  {photos[lightboxIndex].alt}
                </span>
                <span className="mx-2 text-white/30">|</span>
                <span className="uppercase text-[10px] text-accent tracking-widest font-semibold">
                  {photos[lightboxIndex].category}
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
