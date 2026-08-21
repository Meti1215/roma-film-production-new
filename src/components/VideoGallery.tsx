'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { brand } from '@/lib/brand'
import { Play, X } from 'lucide-react'

interface Video {
  id: string
  title: string
  category: string | null
  video_url: string
  thumbnail_url: string | null
}

interface LegacyVideo {
  title: string
  subtitle: string
  category: string
  duration: string
  thumbnail: string
  videoUrl: string
}

interface VideoGalleryProps {
  fetchFromSupabase?: boolean
  homeMobileTwoColumns?: boolean
}

export default function VideoGallery({
  fetchFromSupabase = true,
  homeMobileTwoColumns = false,
}: VideoGalleryProps) {
  const [videos, setVideos] = useState<LegacyVideo[]>(brand.videos)
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('')

  function getYouTubeVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)

      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  }

  function isYouTubeUrl(url: string): boolean {
    return getYouTubeVideoId(url) !== null
  }

  function getYouTubeEmbedUrl(url: string): string {
    const videoId = getYouTubeVideoId(url)

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }

    return url
  }

  function isDirectVideoUrl(url: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']

    return videoExtensions.some((ext) =>
      url.toLowerCase().endsWith(ext)
    )
  }

  function getYouTubeThumbnailUrl(url: string): string | null {
    const videoId = getYouTubeVideoId(url)

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }

    return null
  }

  useEffect(() => {
    if (!fetchFromSupabase) {
      setVideos(brand.videos)
      return
    }

    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos')

        if (!response.ok) {
          throw new Error(
            `Videos request failed with status ${response.status}`
          )
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        const mappedVideos = (data.videos || []).map((video: Video) => {
          let thumbnail = video.thumbnail_url

          if (!thumbnail && isYouTubeUrl(video.video_url)) {
            thumbnail = getYouTubeThumbnailUrl(video.video_url)
          }

          if (!thumbnail) {
            thumbnail = '/images/photos/photo8.jpg'
          }

          return {
            title: video.title,
            subtitle: video.category || 'Video',
            category: video.category || 'Video',
            duration: 'Short',
            thumbnail,
            videoUrl: video.video_url,
          }
        })

        setVideos([...mappedVideos, ...brand.videos])
      } catch (err) {
        console.error('Failed to fetch videos:', err)
        setVideos(brand.videos)
      }
    }

    fetchVideos()
  }, [fetchFromSupabase])

  const openVideoPlayer = (url: string, title: string) => {
    setActiveVideoUrl(url)
    setActiveVideoTitle(title)
  }

  const closeVideoPlayer = () => {
    setActiveVideoUrl(null)
    setActiveVideoTitle('')
  }

  return (
    <section
      id="videos"
      className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-secondary/30 w-full"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 md:mb-7">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
            Moving Frames
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-3 text-foreground">
            Videos
          </h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-3" />

          <p className="text-sm text-muted-foreground leading-relaxed">
            Beautiful wedding films and highlight reels that tell your unique
            love story with cinematic color, composition, and emotional pace.
          </p>
        </div>

        {/* Video Grid */}
        <div
          className={
            homeMobileTwoColumns
              ? 'grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 lg:gap-12'
              : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12 w-full'
          }
        >
          {videos.map((video, idx) => (
            <motion.div
              key={`${video.title}-${idx}`}
              className="group flex flex-col cursor-pointer"
              onClick={() =>
                openVideoPlayer(video.videoUrl, video.title)
              }
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-transparent photo-hover-trigger rounded-lg">
                {isDirectVideoUrl(video.videoUrl) ? (
                  <video
                    src={video.videoUrl}
                    muted
                    playsInline
                    preload="auto"
                    aria-label={`${video.title} Video Preview`}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                  />
                ) : video.thumbnail.startsWith('http') ? (
                  <img
                    src={video.thumbnail}
                    alt={`${video.title} Video Thumbnail`}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                  />
                ) : (
                  <Image
                    src={video.thumbnail}
                    alt={`${video.title} Video Thumbnail`}
                    fill
                    className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 33vw"
                  />
                )}

                {/* Cinematic Dark Overlay and Play Button */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 z-10 pointer-events-none" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 pointer-events-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-300 shadow-cinematic">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white group-hover:text-accent-foreground ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 px-2 py-1 sm:px-2.5 sm:py-1 bg-black/60 backdrop-blur-sm text-[9px] sm:text-[10px] font-semibold text-white/90 uppercase tracking-widest pointer-events-none">
                  {video.duration}
                </div>

                {/* Inner Border Accent */}
                <div className="absolute inset-3 sm:inset-4 border border-accent/20 pointer-events-none z-20" />
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
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-2 sm:p-4 md:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeVideoPlayer}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white focus:outline-none p-2 z-[160] transition-colors"
              aria-label="Close video player"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Video container */}
            <div className="relative flex h-full w-full flex-col items-center justify-center px-2 sm:px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[16/9] w-[min(90vw,calc(85vh*16/9))] overflow-hidden rounded-lg bg-black shadow-2xl"
              >
                {isYouTubeUrl(activeVideoUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(activeVideoUrl)}
                    title={activeVideoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={activeVideoUrl}
                    controls
                    autoPlay
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                )}
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