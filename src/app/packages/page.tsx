'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Packages from '@/components/Packages'
import Footer from '@/components/Footer'

export default function PackagesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <Packages />
      </div>
      <Footer />
    </main>
  )
}
