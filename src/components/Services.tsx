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

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
            Crafting Memories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
            Services Offered
          </h2>
          <div className="w-12 h-[1px] bg-accent/80 mx-auto mb-6" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            From intimate elopements to grand celebrations, we preserve your most cherished events with a signature cinematic style.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {brand.services.map((service, idx) => {
            const IconComponent = serviceIcons[service.id] || Camera

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: (idx % 3) * 0.1 }}
                className="group relative bg-card border border-border/60 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
              >
                {/* Visual Header Image with dark overlay */}
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                  
                  {/* Floating Icon overlay */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <IconComponent className="w-5 h-5 text-accent" />
                  </div>
                </div>

                {/* Body Text */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-heading font-medium tracking-wide mb-3 text-foreground group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="text-[10px] uppercase tracking-widest font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5"
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
