'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    preferredDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const serviceOptions = [
    'Wedding Photography',
    'Wedding Videography',
    'Pre-Wedding',
    'Engagement',
    'Baptism',
    'Graduation',
    'Birthday / Family Event',
    'Drone Photography / Videography',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid'
    }
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate backend communication delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        serviceType: '',
        preferredDate: '',
        message: '',
      })
    }, 1500)
  }

  return (
    <div className="w-full bg-card p-6 md:p-8 border border-border/80 shadow-sm relative">
      <AnimatePresence mode="wait">
        {!submitSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-[10px] uppercase tracking-wider font-semibold text-foreground mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Michael Smith"
                className={`w-full px-4 py-3 bg-secondary/10 border text-xs text-foreground placeholder-muted-foreground/60 transition-colors focus:border-accent focus:ring-1 focus:ring-accent ${
                  errors.fullName ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Grid layout for Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-semibold text-foreground mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (214) 000-0000"
                  className="w-full px-4 py-3 bg-secondary/10 border border-border text-xs text-foreground placeholder-muted-foreground/60 transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-wider font-semibold text-foreground mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 bg-secondary/10 border text-xs text-foreground placeholder-muted-foreground/60 transition-colors focus:border-accent focus:ring-1 focus:ring-accent ${
                    errors.email ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Grid layout for Service Dropdown & Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Type of Service */}
              <div>
                <label htmlFor="serviceType" className="block text-[10px] uppercase tracking-wider font-semibold text-foreground mb-1.5">
                  Type of Service *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-secondary/10 border text-xs text-foreground transition-colors focus:border-accent focus:ring-1 focus:ring-accent ${
                    errors.serviceType ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="" disabled className="text-muted-foreground/50">
                    Select a service...
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.serviceType && <p className="text-[10px] text-red-500 mt-1">{errors.serviceType}</p>}
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="preferredDate" className="block text-[10px] uppercase tracking-wider font-semibold text-foreground mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary/10 border border-border text-xs text-foreground transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-[10px] uppercase tracking-wider font-semibold text-foreground mb-1.5">
                Message / Event Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your story, timeline, venue location, or specific ideas..."
                className="w-full px-4 py-3 bg-secondary/10 border border-border text-xs text-foreground placeholder-muted-foreground/60 transition-colors focus:border-accent focus:ring-1 focus:ring-accent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:bg-primary/65 disabled:text-primary-foreground/65 text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-16"
          >
            <CheckCircle2 className="w-16 h-16 text-accent mb-6 animate-pulse" />
            <h4 className="text-2xl font-heading font-medium tracking-wide text-foreground mb-3">
              Inquiry Sent Beautifully
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-8 font-light">
              Thank you so much for reaching out to Roma Film Production. We have received your details and will get back to you within 24-48 hours.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-2.5 border border-border text-[10px] uppercase tracking-widest font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'
