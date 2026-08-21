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
    <section id="contact" className="bg-background px-2 py-6 sm:px-6 sm:py-20 md:py-32 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 items-stretch gap-2 sm:gap-8 lg:grid-cols-12 lg:gap-20">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="min-w-0 lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
                Get In Touch
              </span>
              <h2 className="mb-3 text-lg font-heading font-medium tracking-wide text-foreground sm:mb-6 sm:text-4xl md:text-5xl">
                Let's Capture Your Story
              </h2>
              <div className="mb-3 h-[1px] w-10 bg-gradient-to-r from-transparent via-accent to-transparent sm:mb-8 sm:w-16" />
              <p className="mb-3 max-w-md text-[9px] font-light leading-relaxed text-muted-foreground sm:mb-10 sm:text-sm">
                We'd love to hear more about your upcoming wedding, engagement session, or event celebration. Fill out the form or reach out directly to learn more.
              </p>

              {/* Direct Info list */}
              <div className="mb-3 space-y-2 sm:mb-10 sm:space-y-6">
                {/* Phone */}
                <a
                  href={brand.phoneHref}
                  className="group flex min-w-0 items-center gap-2 text-foreground/80 transition-colors duration-200 hover:text-accent sm:gap-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-border shadow-sm transition-colors group-hover:border-accent/50 sm:h-10 sm:w-10">
                    <Phone className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Call / Text</span>
                    <span className="text-[9px] font-semibold sm:text-sm">{brand.phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={brand.emailHref}
                  className="group flex min-w-0 items-center gap-2 text-foreground/80 transition-colors duration-200 hover:text-accent sm:gap-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-border shadow-sm transition-colors group-hover:border-accent/50 sm:h-10 sm:w-10">
                    <Mail className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Email</span>
                    <span className="break-words text-[9px] font-semibold sm:text-sm">{brand.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex min-w-0 items-center gap-2 text-foreground/80 sm:gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-border shadow-sm sm:h-10 sm:w-10">
                    <MapPin className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Location</span>
                    <span className="text-[9px] font-semibold sm:text-sm">{brand.locationName}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mb-3 flex items-center gap-1 sm:mb-10 sm:gap-3">
                <a
                  href={brand.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="flex h-7 w-7 items-center justify-center border border-border shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-cinematic sm:h-10 sm:w-10"
                >
                  <InstagramIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
                <a
                  href={brand.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Profile"
                  className="flex h-7 w-7 items-center justify-center border border-border shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-cinematic sm:h-10 sm:w-10"
                >
                  <TikTokIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </a>
              </div>
            </div>

            {/* Google Map Embed Placeholder Container */}
            <div className="relative mt-auto h-20 w-full overflow-hidden border border-accent/20 bg-secondary/30 shadow-cinematic sm:h-52">
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
            className="min-w-0 lg:col-span-7 flex flex-col justify-center"
          >
            <BookingForm />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
