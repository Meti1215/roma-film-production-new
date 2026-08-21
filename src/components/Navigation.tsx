'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { brand } from '@/lib/brand'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const navigationIsSolid = !isHomePage || isScrolled

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Photos', href: '/photos' },
    { name: 'Videos', href: '/videos' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHomePage && !isScrolled ? '-translate-y-full opacity-0 pointer-events-none' : ''
          } ${navigationIsSolid
            ? 'glass-nav py-4 shadow-cinematic'
            : 'bg-gradient-to-b from-black/70 to-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center">
              <img
                src={brand.logoPath}
                alt={brand.name}
                className="h-12 md:h-16 w-auto hover:opacity-85 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-medium hover:text-accent transition-colors duration-250 relative group ${isActive(link.href)
                      ? 'text-accent'
                      : navigationIsSolid
                        ? 'text-foreground'
                        : 'text-white'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive(link.href) ? 'scale-x-100' : ''}`} />
                </Link>
              ))}
            </nav>

            {/* Highlighted CTA */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 border shadow-cinematic ${isScrolled
                    ? 'bg-accent text-accent-foreground border-accent hover:bg-accent/90 hover:shadow-tan-glow'
                    : 'bg-accent text-accent-foreground border-accent hover:bg-accent/90 hover:shadow-tan-glow'
                  }`}
              >
                Book a Session
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${navigationIsSolid ? 'text-foreground' : 'text-white'} focus:outline-none p-1.5`}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col min-h-[100dvh]"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-border">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <img
                  src={brand.logoPath}
                  alt={brand.name}
                  className="h-12 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground focus:outline-none p-2"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex flex-col items-center justify-center flex-grow py-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    className={`block text-center text-xl uppercase tracking-widest font-semibold hover:text-accent transition-colors py-4 ${isActive(link.href) ? 'text-accent' : 'text-foreground'
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-6"
              >
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-bold hover:bg-accent hover:text-accent-foreground transition-all duration-300 inline-block text-center border border-transparent hover:border-accent"
                >
                  Book a Session
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Drawer Footer Contacts */}
            <div className="border-t border-border pt-6 pb-8 px-6 flex flex-col items-center space-y-3 text-center text-sm text-muted-foreground">
              <a href={brand.phoneHref} className="flex items-center gap-2 hover:text-accent">
                <Phone className="w-4 h-4" />
                {brand.phone}
              </a>
              <a href={brand.emailHref} className="flex items-center gap-2 hover:text-accent">
                <Mail className="w-4 h-4" />
                {brand.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
