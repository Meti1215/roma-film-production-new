'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import BookingForm from '@/components/BookingForm'
import { Phone, Mail, MapPin } from 'lucide-react'

// Custom TikTok icon since Lucide doesn't have it by default
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.51-.71-.53-1.3-1.22-1.77-1.97v7.25c.15 4.88-4.56 9.16-9.61 8.22-4.08-.76-7.14-5.02-5.99-9.27 1.01-3.73 5.39-6.02 9.07-4.38v4.14c-2.03-1.11-4.79.09-5.18 2.44-.48 2.84 2.37 5.29 5.02 4.3 1.55-.58 2.22-2.28 2.14-3.85V.02z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
                Let's Capture Your Story
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mb-8" />
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-10 font-light max-w-md">
                We'd love to hear more about your upcoming wedding, engagement session, or event celebration. Fill out the form or reach out directly to learn more.
              </p>

              {/* Direct Info list */}
              <div className="space-y-6 mb-10">
                {/* Phone */}
                <a
                  href={brand.phoneHref}
                  className="flex items-center gap-4 text-foreground/80 hover:text-accent transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent/50 transition-colors shadow-sm">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Call / Text</span>
                    <span className="text-sm font-semibold">{brand.phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={brand.emailHref}
                  className="flex items-center gap-4 text-foreground/80 hover:text-accent transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent/50 transition-colors shadow-sm">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Email</span>
                    <span className="text-sm font-semibold">{brand.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 text-foreground/80">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shadow-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Location</span>
                    <span className="text-sm font-semibold">{brand.locationName}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 mb-10">
                <a
                  href={brand.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 shadow-sm hover:shadow-cinematic"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={brand.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Profile"
                  className="w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300 shadow-sm hover:shadow-cinematic"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Google Map Embed Placeholder Container */}
            <div className="relative w-full h-44 sm:h-52 bg-secondary/30 border border-accent/20 overflow-hidden mt-auto shadow-cinematic">
              <iframe
                src={brand.googleMapsEmbedUrl}
                title="Office Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-75 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 text-[8px] uppercase tracking-widest font-bold border border-accent/30 pointer-events-none">
                Dallas Office
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <BookingForm />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
