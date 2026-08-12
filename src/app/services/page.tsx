'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Services from '@/components/Services'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </main>
  )
}
