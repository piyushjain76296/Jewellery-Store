'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    question: "Do you offer certificates of authenticity?",
    answer: "Yes, all our diamond and gemstone jewelry comes with a certificate of authenticity from internationally recognized gemological laboratories such as IGI or GIA. Our gold jewelry is strictly BIS Hallmarked."
  },
  {
    question: "How long does custom or bespoke jewelry take?",
    answer: "Bespoke orders typically take 3 to 4 weeks from the date of design approval and advance payment. Our artisans meticulously craft each piece to ensure it meets our rigorous quality standards."
  },
  {
    question: "Can I track my order?",
    answer: "Absolutely. Once your order is dispatched, you will receive an email and SMS with your AWB number and a tracking link. You can also track your order directly from your Account Dashboard."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries globally using trusted logistics partners like FedEx and DHL. International shipping takes approximately 5-7 business days after dispatch."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return window for unworn items in pristine condition with all original packaging and certificates. Custom, engraved, and bespoke items are non-refundable."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[var(--background)] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-center text-[var(--muted-foreground)] mb-12">Find answers to common questions about our jewelry, shipping, and services.</p>
        
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={cn(
                "border border-[var(--border)] rounded-2xl bg-[var(--card)] overflow-hidden transition-all",
                openIndex === idx ? "border-gold-300 shadow-sm" : "hover:border-gold-200"
              )}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left font-medium"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={cn("w-5 h-5 text-gold-500 transition-transform", openIndex === idx && "rotate-180")} />
              </button>
              <div 
                className={cn(
                  "px-6 text-sm text-[var(--muted-foreground)] leading-relaxed transition-all duration-300",
                  openIndex === idx ? "pb-5 opacity-100 h-auto" : "h-0 opacity-0 overflow-hidden"
                )}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[var(--muted-foreground)] mb-4">Still have questions?</p>
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
