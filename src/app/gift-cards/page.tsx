import { Gift, CreditCard, Mail } from 'lucide-react'

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gold-50 to-transparent dark:from-gold-900/10 py-24 px-4 text-center border-b border-[var(--border)]">
        <Gift className="w-16 h-16 mx-auto mb-6 text-gold-500" />
        <h1 className="font-display text-4xl md:text-5xl mb-4">Give the Gift of Choice</h1>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-lg">
          Not sure what to buy? Let them choose their perfect piece with a Lumière Jewels digital gift card.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="aspect-[16/9] md:aspect-[2/1] bg-charcoal-900 rounded-3xl p-8 md:p-16 flex flex-col justify-between relative overflow-hidden text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-ivory-100 mb-2">Lumière Jewels</h2>
              <p className="text-gold-400 tracking-[0.2em] uppercase text-xs font-semibold">Digital Gift Card</p>
            </div>
            <Gift className="w-10 h-10 text-gold-500 opacity-50" />
          </div>
          
          <div className="relative z-10 mt-16 md:mt-0">
            <p className="text-charcoal-400 text-sm mb-2">Select Value</p>
            <div className="flex flex-wrap gap-3">
              {['₹5,000', '₹10,000', '₹25,000', '₹50,000'].map(val => (
                <button key={val} className="px-6 py-2 rounded-full border border-gold-500/30 text-ivory-100 hover:bg-gold-500/20 hover:border-gold-500 transition-all">
                  {val}
                </button>
              ))}
              <button className="px-6 py-2 rounded-full border border-charcoal-700 text-charcoal-300 hover:bg-charcoal-800 transition-all">
                Custom
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-left">
          <div className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)]">
            <Mail className="w-8 h-8 text-gold-500 mb-4" />
            <h3 className="font-display text-xl mb-2">Instant Delivery</h3>
            <p className="text-[var(--muted-foreground)] text-sm">Our e-gift cards are delivered instantly via email, making them the perfect last-minute gift. They can be forwarded to the recipient whenever you choose.</p>
          </div>
          <div className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)]">
            <CreditCard className="w-8 h-8 text-gold-500 mb-4" />
            <h3 className="font-display text-xl mb-2">No Expiry</h3>
            <p className="text-[var(--muted-foreground)] text-sm">Lumière Jewels gift cards never expire and carry no hidden fees. They can be redeemed online or at any of our flagship boutiques.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
