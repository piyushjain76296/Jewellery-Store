'use client'

import { motion } from 'motion/react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="bg-charcoal-900 text-ivory-100 py-16 sm:py-24 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl mb-4">Contact Us</h1>
          <p className="text-charcoal-400 max-w-2xl mx-auto text-lg">
            Whether you have a question about a piece, need help with sizing, or want to discuss a custom design, we&apos;re here for you.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
            <div>
              <h2 className="font-display text-3xl mb-6">Get in Touch</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Our customer service team is available to assist you with any inquiries. We aim to respond to all emails within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <div className="w-12 h-12 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone & WhatsApp</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-1">+91 98765 43210</p>
                  <p className="text-xs text-gold-600">Mon-Sat, 10am to 7pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <div className="w-12 h-12 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-1">hello@lumierejewels.com</p>
                  <p className="text-sm text-[var(--muted-foreground)]">support@lumierejewels.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                <div className="w-12 h-12 rounded-full bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Flagship Studio</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    14, Linking Road, Bandra West<br />
                    Mumbai, Maharashtra 400050<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
              <h3 className="font-display text-2xl mb-6">Send a Message</h3>
              
              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-success" />
                  </div>
                  <h4 className="font-medium text-lg mb-2">Message Sent!</h4>
                  <p className="text-[var(--muted-foreground)] text-sm">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Name</label>
                      <input required type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Email</label>
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Subject</label>
                    <select value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50">
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="custom">Custom Design</option>
                      <option value="repair">Repairs & Resizing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-[var(--foreground)]">Message</label>
                    <textarea required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} rows={5} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none" />
                  </div>
                  <button disabled={loading} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium hover:from-gold-700 hover:to-gold-600 transition-all btn-glow disabled:opacity-50">
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
