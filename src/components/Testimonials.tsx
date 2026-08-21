'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { Quote, X } from 'lucide-react'

export default function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof brand.testimonials[number] | null>(null)

  useEffect(() => {
    if (!selectedTestimonial) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedTestimonial(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedTestimonial])

  return (
    <section id="testimonials" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
            Love Letters
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
            What Our Couples Say
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-8 lg:gap-12">
          {brand.testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.15 }}
              role="button"
              tabIndex={0}
              aria-label={`Read the full love letter from ${testimonial.author}`}
              onClick={() => setSelectedTestimonial(testimonial)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedTestimonial(testimonial)
                }
              }}
              className="group min-w-0 cursor-pointer border border-border/40 bg-secondary/20 p-3 text-center shadow-cinematic transition-all duration-300 hover:border-accent/60 hover:-translate-y-1 focus:outline-none focus:ring-1 focus:ring-accent md:p-6"
            >
              {/* Quote Icon */}
              <div className="mb-2 text-accent/40 md:mb-4">
                <Quote className="mx-auto h-5 w-5 rotate-180 md:h-7 md:w-7" />
              </div>

              {/* Review Text */}
              <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-foreground/80 font-heading italic md:mb-5 md:text-sm">
                "{testimonial.text}"
              </p>

              {/* Divider line */}
              <div className="mx-auto mb-3 h-[1px] w-8 bg-gradient-to-r from-transparent via-accent/50 to-transparent md:mb-4" />

              {/* Couple Names */}
              <span className="text-[9px] uppercase tracking-widest font-semibold text-foreground md:text-xs">
                {testimonial.author}
              </span>
            </motion.div>
          ))}
        </div>

      </div>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedTestimonial(null)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="love-letter-title"
            className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto border border-accent/40 bg-background p-5 shadow-cinematic sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedTestimonial(null)}
              aria-label="Close love letter"
              className="absolute right-3 top-3 p-1 text-muted-foreground transition-colors hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-accent">
              Love Letter
            </span>
            <h3 id="love-letter-title" className="mb-5 pr-8 text-xl font-heading font-medium text-foreground">
              {selectedTestimonial.author}
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80 font-heading italic">
              {selectedTestimonial.text}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
