'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain object-center opacity-80"
        >
          <source src="/images/hero/hero.MOV" type="video/quicktime" />
        </video>
        {/* Soft Dark Vignette Overlay for premium editorial readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50 z-10" />
      </div>

      {/* Hero Contents */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mb-6"
        />

        {/* Cinematic Subheading */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="text-[10px] md:text-xs uppercase font-semibold text-accent tracking-[0.3em] mb-4 text-shadow-sm"
        >
          {brand.name}
        </motion.span>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium tracking-wide mb-6 text-white text-shadow-lg max-w-4xl"
        >
          {brand.tagline}
        </motion.h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-white/90 font-sans max-w-2xl leading-relaxed mb-10 tracking-wide text-shadow-sm font-light"
        >
          {brand.taglineSubtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/photos"
            className="w-full sm:w-auto px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-xs uppercase tracking-widest hover:bg-accent/90 transition-all duration-300 text-center shadow-cinematic"
          >
            View Our Work
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white text-white font-semibold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group text-center"
          >
            Book a Session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[8px] uppercase tracking-[0.2em] font-medium text-white/70">Scroll</span>
        <div className="w-[1px] h-8 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </div>
    </section>
  )
}
