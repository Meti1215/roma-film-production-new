'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
