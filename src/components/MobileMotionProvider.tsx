'use client'

import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

export default function MobileMotionProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        document.body.classList.add('mobile-no-motion')
      } else {
        document.body.classList.remove('mobile-no-motion')
      }
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <MotionConfig reducedMotion={isMobile ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  )
}
