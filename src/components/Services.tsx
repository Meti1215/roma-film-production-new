'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import {
  Camera,
  Film,
  Compass,
  Heart,
  Award,
  Sparkles,
  Image as ImageIcon,
  Milestone,
  Calendar,
} from 'lucide-react'

// Map service id to icon component for visual elegance
const serviceIcons: Record<string, any> = {
  'wedding-photo': Camera,
  'wedding-video': Film,
  'pre-wedding': Compass,
  engagement: Heart,
  baptism: Sparkles,
  graduation: Award,
  'birthday-family': Calendar,
  drone: Milestone,
  'event-highlights': ImageIcon,
}

interface ServicesProps {
  showImages?: boolean
  showIntro?: boolean
}

export function ServicesIntro({
  overVideo = false,
}: {
  overVideo?: boolean
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-4 md:mb-6">
      <span className="text-[9px] uppercase tracking-[0.35em] font-normal text-accent mb-4 block">
        Crafting Memories
      </span>

      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-heading font-light tracking-wide mb-6 ${
          overVideo ? 'text-white' : 'text-foreground'
        }`}
      >
        Services Offered
      </h2>

      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />

      <p
        className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light ${
          overVideo ? 'text-white/90' : 'text-muted-foreground'
        }`}
      >
        From intimate elopements to grand celebrations, we preserve your most
        cherished events with a signature cinematic style.
      </p>
    </div>
  )
}

export default function Services({
  showImages = true,
  showIntro = true,
}: ServicesProps) {
  return (
    <section
      id="services"
      className="py-4 md:py-6 px-6 sm:px-8 lg:px-10 bg-secondary/20"
    >
      <div className="w-full mx-auto">
        {/* Title */}
        {showIntro && <ServicesIntro />}

        {/* Services Grid */}
        <div className="mx-auto grid w-full max-w-[90rem] grid-flow-row grid-cols-3 gap-2 md:gap-4">
          {brand.services.map((service, idx) => {
            const IconComponent = serviceIcons[service.id] || Camera

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: (idx % 3) * 0.08,
                }}
                className={`group relative bg-card border border-border/50 rounded-sm hover:border-accent/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-cinematic hover:shadow-tan-glow ${
                  !showImages ? 'min-h-[145px]' : 'min-h-[240px]'
                }`}
              >
                {showImages ? (
                  /* Visual Header Image with dark overlay */
                  <div className="relative h-28 w-full overflow-hidden bg-muted sm:h-32 md:h-36">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="h-full w-full object-contain object-center transition-transform duration-600 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

                    {/* Floating Icon overlay */}
                    <div className="absolute top-2 right-2 w-7 h-7 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/30">
                      <IconComponent className="w-3.5 h-3.5 text-accent" />
                    </div>
                  </div>
                ) : (
                  /* Elegant icon-only header without image */
                  <div className="relative h-12 w-full bg-gradient-to-br from-accent/5 via-secondary/10 to-accent/5 flex items-center justify-center border-b border-border/30">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-30" />

                      <div className="relative w-8 h-8 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-accent/20 shadow-sm">
                        <IconComponent className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Body Text */}
                <div className="p-1.5 sm:p-2 md:p-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm md:text-base font-heading font-medium tracking-wide mb-1 text-foreground group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>

                    <p className="line-clamp-2 text-[11px] md:text-xs text-muted-foreground leading-relaxed mb-2 font-light">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="text-[8px] uppercase tracking-widest font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-1"
                  >
                    Inquire Details
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}