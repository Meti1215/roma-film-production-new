'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { brand } from '@/lib/brand'
import { Play, X } from 'lucide-react'

export default function VideoGallery() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('')

  const openVideoPlayer = (url: string, title: string) => {
    setActiveVideoUrl(url)
    setActiveVideoTitle(title)
  }

  const closeVideoPlayer = () => {
    setActiveVideoUrl(null)
    setActiveVideoTitle('')
  }

  return (
    <section id="videos" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
            Moving Frames
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
            Videos
          </h2>
          <div className="w-12 h-[1px] bg-accent/80 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beautiful wedding films and highlight reels that tell your unique love story with cinematic color, composition, and emotional pace.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {brand.videos.map((video, idx) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
              className="group flex flex-col cursor-pointer"
              onClick={() => openVideoPlayer(video.videoUrl, video.title)}
            >
              {/* Thumbnail Container */}
              <div className="relative h-56 sm:h-64 md:h-80 lg:h-[400px] w-full overflow-hidden bg-black photo-hover-trigger">
                <Image
                  src={video.thumbnail}
                  alt={`${video.title} Video Thumbnail`}
                  fill
                  className="object-cover object-center opacity-90 transition-transform duration-700"
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 50vw"
                />
                
                {/* Cinematic Dark Overlay and Play Button */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 z-10" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white group-hover:text-accent-foreground ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 px-2 py-1 sm:px-2.5 sm:py-1 bg-black/60 backdrop-blur-sm text-[9px] sm:text-[10px] font-semibold text-white/90 uppercase tracking-widest">
                  {video.duration}
                </div>

                {/* Inner Border Accent */}
                <div className="absolute inset-3 sm:inset-4 border border-white/10 pointer-events-none z-20" />
              </div>

              {/* Title Block */}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-medium tracking-wide text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-1 block">
                    {video.subtitle}
                  </span>
                </div>
                
                <span className="px-2.5 py-1 sm:px-3 sm:py-1 border border-border text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold text-muted-foreground whitespace-nowrap">
                  {video.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoUrl !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4 md:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeVideoPlayer}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white focus:outline-none p-2 z-50 transition-colors"
              aria-label="Close video player"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Video container */}
            <div className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center px-2 sm:px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-video bg-black shadow-2xl relative rounded-lg overflow-hidden"
              >
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <h4 className="mt-3 sm:mt-4 text-white font-heading text-base sm:text-lg md:text-xl tracking-wide text-center px-4">
                {activeVideoTitle}
              </h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
