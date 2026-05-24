export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl mb-4 text-center">Shipping & Returns</h1>
        <p className="text-center text-[var(--muted-foreground)] mb-12">Everything you need to know about getting your jewelry and our return policies.</p>
        
        <div className="space-y-12 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
          <section>
            <h2 className="font-display text-2xl mb-4 text-gold-600 dark:text-gold-400">Complimentary Shipping</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
              We offer free insured shipping on all orders above ₹999 within India. Your precious cargo is fully insured during transit, and requires an adult signature upon delivery to ensure it safely reaches your hands.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--muted-foreground)] text-sm">
              <li><strong>Ready to Ship:</strong> Dispatched within 24-48 hours.</li>
              <li><strong>Made to Order:</strong> Dispatched within 10-14 business days.</li>
              <li><strong>Custom Orders:</strong> Dispatched within 3-4 weeks.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4 text-gold-600 dark:text-gold-400">International Shipping</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              We ship globally using trusted international couriers (FedEx/DHL). Flat shipping rate of $50 applies to all international orders. Please note that customs duties and local taxes are the responsibility of the customer and will be collected at the time of delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4 text-gold-600 dark:text-gold-400">30-Day Returns</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
              We want you to love your Lumière jewelry. If you are not completely satisfied, we accept returns within 30 days of delivery for a full refund or exchange.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              To be eligible for a return, the item must be unworn, in its original pristine condition, and include all original packaging and certificates (IGI/BIS). 
              <strong> Custom engraved pieces and bespoke orders are non-refundable.</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
