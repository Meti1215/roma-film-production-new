'use client'

import React from 'react'
import Link from 'next/link'
import { brand } from '@/lib/brand'

export default function Footer() {
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Photos', href: '/photos' },
    { name: 'Videos', href: '/videos' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-border/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-12">

          {/* Brand block */}
          <div className="col-span-1 md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl md:text-2xl font-bold tracking-widest text-primary-foreground hover:opacity-85 transition-opacity block">
                {brand.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-accent font-semibold mt-1 block">
                {brand.tagline}
              </span>
            </Link>
            <p className="text-xs text-primary-foreground/60 leading-relaxed max-w-sm font-light">
              Wedding photography and filmmaking that preserves your most meaningful moments with a creative, timeless style.
            </p>
          </div>

          {/* Navigation links block */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <span className="block text-[10px] uppercase tracking-widest text-accent font-bold">
              Navigation
            </span>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-primary-foreground/75 hover:text-accent transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <span className="block text-[10px] uppercase tracking-widest text-accent font-bold">
              Contact
            </span>
            <ul className="space-y-2.5 text-xs text-primary-foreground/75 font-light">
              <li>
                <a href={brand.phoneHref} className="hover:text-accent transition-colors">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={brand.emailHref} className="hover:text-accent transition-colors block truncate">
                  {brand.email}
                </a>
              </li>
              <li className="text-primary-foreground/50 text-[10px] uppercase tracking-wider font-semibold">
                {brand.locationName}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <span className="block text-[10px] uppercase tracking-widest text-accent font-bold">
              Follow Us
            </span>
            <ul className="space-y-2.5 text-xs text-primary-foreground/75 font-light">
              <li>
                <a
                  href={brand.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={brand.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-border/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-primary-foreground/55 tracking-wider uppercase">
          <span>
            © 2026 {brand.name}. All rights reserved.
          </span>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
