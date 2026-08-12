'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
            Love Letters
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
            What Our Couples Say
          </h2>
          <div className="w-12 h-[1px] bg-accent/80 mx-auto" />
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {brand.testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.15 }}
              className="bg-secondary/20 p-8 md:p-10 border border-border/40 flex flex-col justify-between items-center text-center relative"
            >
              {/* Quote Icon */}
              <div className="text-accent/30 mb-6">
                <Quote className="w-8 h-8 rotate-180" />
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-heading italic flex-grow mb-8">
                "{testimonial.text}"
              </p>

              {/* Divider line */}
              <div className="w-8 h-[1px] bg-accent/40 mb-6" />

              {/* Couple Names */}
              <span className="text-xs uppercase tracking-widest font-semibold text-foreground">
                {testimonial.author}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
