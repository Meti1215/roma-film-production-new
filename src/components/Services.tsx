'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { Camera, Film, Compass, Heart, Award, Sparkles, Image as ImageIcon, Milestone, Calendar } from 'lucide-react'

// Map service id to icon component for visual elegance
const serviceIcons: Record<string, any> = {
  'wedding-photo': Camera,
  'wedding-video': Film,
  'pre-wedding': Compass,
  'engagement': Heart,
  'baptism': Sparkles,
  'graduation': Award,
  'birthday-family': Calendar,
  'drone': Milestone,
  'event-highlights': ImageIcon,
}

interface ServicesProps {
  showImages?: boolean
}

export default function Services({ showImages = true }: ServicesProps) {
  return (
    <section id="services" className="py-12 md:py-16 px-6 sm:px-8 lg:px-12 bg-secondary/20">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[9px] uppercase tracking-[0.35em] font-normal text-accent mb-4 block">
            Crafting Memories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-light tracking-wide mb-6 text-foreground">
            Services Offered
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            From intimate elopements to grand celebrations, we preserve your most cherished events with a signature cinematic style.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {brand.services.map((service, idx) => {
            const IconComponent = serviceIcons[service.id] || Camera

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (idx % 3) * 0.08 }}
                className={`group relative bg-card border border-border/50 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-cinematic hover:shadow-tan-glow ${!showImages ? 'min-h-[220px]' : 'min-h-[240px]'}`}
              >
                {showImages ? (
                  /* Visual Header Image with dark overlay */
                  <div className="relative h-36 w-full overflow-hidden bg-muted">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="h-full w-full object-cover object-center transition-transform duration-600 group-hover:scale-105"
                      sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

                    {/* Floating Icon overlay */}
                    <div className="absolute top-2 right-2 w-7 h-7 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/30">
                      <IconComponent className="w-3.5 h-3.5 text-accent" />
                    </div>
                  </div>
                ) : (
                  /* Elegant icon-only header without image */
                  <div className="relative h-16 w-full bg-gradient-to-br from-accent/5 via-secondary/10 to-accent/5 flex items-center justify-center border-b border-border/30">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-30" />
                      <div className="relative w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-accent/20 shadow-sm">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Body Text */}
                <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm md:text-base font-heading font-medium tracking-wide mb-2 text-foreground group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed mb-3 font-light">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="text-[9px] uppercase tracking-widest font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    Inquire Details
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
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
