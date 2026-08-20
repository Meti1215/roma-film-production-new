'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { brand } from '@/lib/brand'
import { Check, MessageSquare } from 'lucide-react'

interface Package {
  id: string;
  title: string;
  subtitle: string;
  price: number | null;
  features: string[];
  highlighted: boolean;
  cta_text: string;
}

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
          throw new Error(`Packages request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setPackages(data.packages || []);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        setError('Failed to load packages');
        // Fallback to brand packages if Supabase fails
        setPackages(brand.packages.map((pkg: any) => ({
          id: pkg.title,
          title: pkg.title,
          subtitle: pkg.subtitle,
          price: null,
          features: pkg.features,
          highlighted: pkg.highlighted || false,
          cta_text: pkg.ctaText,
        })));
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  // Build dynamic WhatsApp link based on the centralized configuration
  const cleanWhatsAppNumber = brand.whatsAppNumber.replace(/[+\s\-()]/g, '')
  const whatsAppUrl = `https://wa.me/${cleanWhatsAppNumber}?text=Hi!%20I'm%20interested%20in%20your%20packages%20for%20Roma%20Film%20Production.%20Could%20you%20please%20share%20the%20details?`

  function formatPrice(price: number | null): string {
    if (price === null) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  if (loading) {
    return (
      <section id="packages" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
              Collections & Investment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
              Packages
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              All our collections are crafted to provide exceptional coverage. Contact us to receive our detailed digital brochure with collections information.
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            Loading packages...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3 block">
            Collections & Investment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-wide mb-6 text-foreground">
            Packages
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            All our collections are crafted to provide exceptional coverage. Contact us to receive our detailed digital brochure with collections information.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg, idx) => {
            const isCustom = pkg.title.toLowerCase().includes('custom')
            const actionLink = isCustom ? '/contact' : whatsAppUrl

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
                className={`bg-card p-8 border flex flex-col justify-between items-stretch transition-all duration-300 relative ${
                  pkg.highlighted
                    ? 'border-accent shadow-cinematic scale-[1.02]'
                    : 'border-border/60 hover:border-accent/40 shadow-sm hover:shadow-cinematic'
                }`}
              >
                {/* Highlight Badge */}
                {pkg.highlighted && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground text-[8px] uppercase tracking-[0.25em] font-bold px-3 py-1">
                    Recommended
                  </span>
                )}

                {/* Card Header */}
                <div>
                  <h3 className="text-lg md:text-xl font-heading font-medium text-foreground tracking-wide mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground italic mb-4 font-light">
                    {pkg.subtitle}
                  </p>
                  
                  {/* Price Display */}
                  {pkg.price && (
                    <p className="text-2xl font-heading font-semibold text-accent mb-4">
                      {formatPrice(pkg.price)}
                    </p>
                  )}
                  
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-accent/60 to-transparent mb-6" />

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start text-xs text-foreground/80 leading-relaxed font-light">
                        <Check className="w-3.5 h-3.5 text-accent mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Request Button */}
                <a
                  href={actionLink}
                  target={isCustom ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`w-full py-3 text-center text-[10px] uppercase tracking-widest font-semibold border transition-all duration-250 ${
                    pkg.highlighted
                      ? 'bg-primary text-primary-foreground border-transparent hover:bg-accent hover:text-accent-foreground'
                      : 'bg-transparent text-foreground border-border hover:border-accent hover:text-accent'
                  }`}
                >
                  {pkg.cta_text}
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Central Call to Action (WhatsApp + Contact) */}
        <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto p-8 border border-accent/30 bg-background/50 backdrop-blur-sm shadow-cinematic">
          <h4 className="text-xl font-heading font-medium tracking-wide mb-3 text-foreground">
            Looking for something specific?
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-light">
            We are always happy to tailor a custom package to suit your specific wedding timeline and videography expectations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            {/* WhatsApp CTA */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 fill-white text-transparent" />
              Ask About Packages
            </a>

            {/* General Get Package Details Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-primary hover:bg-accent text-primary-foreground hover:text-accent-foreground font-semibold text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto text-center border border-transparent hover:border-accent"
            >
              Get Package Details
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
