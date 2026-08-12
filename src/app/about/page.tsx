'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  )
}
