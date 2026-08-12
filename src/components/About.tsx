'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Photo Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 relative h-[350px] sm:h-[450px] md:h-[550px] w-full bg-secondary overflow-hidden photo-hover-trigger shadow-cinematic"
          >
            <Image
              src={brand.aboutPath}
              alt={`Intimate wedding moment captured by ${brand.name}`}
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
            {/* Soft border accent */}
            <div className="absolute inset-4 border border-accent/30 pointer-events-none" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-8 text-foreground">
              About Us
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-heading leading-relaxed italic mb-6">
              "{brand.name} specializes in wedding photography and filmmaking, capturing real moments with a creative and timeless style. Our goal is simple—to create beautiful photos and films that preserve your memories for years to come."
            </p>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent my-4" />

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed tracking-wider mb-8 uppercase font-medium">
               Dallas, Texas & Worldwide Destinations
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center text-xs uppercase tracking-widest font-bold text-foreground hover:text-accent transition-colors duration-250"
            >
              Let's capture your story
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
