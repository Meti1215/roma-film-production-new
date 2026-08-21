'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-background px-2 py-6 sm:px-6 sm:py-20 md:py-32 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 items-center gap-2 sm:gap-12 lg:grid-cols-12 lg:gap-20">

          {/* Photo Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative min-w-0 w-full overflow-hidden bg-secondary shadow-cinematic photo-hover-trigger lg:col-span-6"
          >
            <div className="relative aspect-[3/4] max-h-[220px] w-full sm:max-h-[500px]">
              <Image
                src={brand.aboutPath}
                alt={`Intimate wedding moment captured by ${brand.name}`}
                fill
                className="object-contain object-center"
                sizes="(max-w-1024px) 100vw, 50vw"
              />
            </div>
            {/* Soft border accent */}
            <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="min-w-0 flex flex-col items-start lg:col-span-6"
          >
            <span className="mb-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-accent sm:mb-3 sm:text-[10px] sm:tracking-[0.3em]">
              Our Philosophy
            </span>
            <h2 className="mb-2 text-lg font-heading font-medium tracking-wide text-foreground sm:mb-8 sm:text-4xl md:text-5xl">
              About Us
            </h2>

            <p className="mb-2 text-[9px] font-heading italic leading-relaxed text-foreground/80 sm:mb-6 sm:text-lg md:text-xl">
              "{brand.name} specializes in wedding photography and filmmaking, capturing real moments with a creative and timeless style. Our goal is simple—to create beautiful photos and films that preserve your memories for years to come."
            </p>

            <div className="my-2 h-[1px] w-8 bg-gradient-to-r from-transparent via-accent to-transparent sm:my-4 sm:w-16" />

            <p className="mb-2 text-[7px] font-medium uppercase leading-relaxed tracking-[0.12em] text-muted-foreground sm:mb-8 sm:text-sm sm:tracking-wider">
              Dallas, Texas & Worldwide Destinations
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center text-[7px] font-bold uppercase tracking-wider text-foreground transition-colors duration-250 hover:text-accent sm:text-xs sm:tracking-widest"
            >
              Let's capture your story
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1 sm:ml-2 sm:h-4 sm:w-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
