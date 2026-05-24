export default function CareInstructionsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl mb-4 text-center">Jewelry Care Instructions</h1>
        <p className="text-center text-[var(--muted-foreground)] mb-12">Keep your Lumière pieces shining for generations.</p>
        
        <div className="space-y-12 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
          <section>
            <h2 className="font-display text-2xl mb-4 text-gold-600 dark:text-gold-400">General Care</h2>
            <ul className="list-disc pl-5 space-y-2 text-[var(--muted-foreground)] text-sm">
              <li>Always put your jewelry on last, after applying makeup, perfume, and hairspray.</li>
              <li>Remove your jewelry before swimming, bathing, or doing household chores.</li>
              <li>Store each piece individually in its original box or a soft pouch to prevent scratching.</li>
              <li>Avoid exposing your jewelry to extreme temperatures or prolonged sunlight.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4 text-gold-600 dark:text-gold-400">Caring for Gold & Platinum</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
              Gold and platinum can lose their shine over time due to dust, moisture, and daily wear. 
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              <strong>To clean:</strong> Mix a few drops of mild dish soap with warm water. Soak the piece for 10-15 minutes, gently scrub with a soft-bristled toothbrush, rinse thoroughly under warm water, and pat dry with a lint-free cloth.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4 text-gold-600 dark:text-gold-400">Caring for Diamonds & Gemstones</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
              While diamonds are the hardest natural substance, they can still chip if struck at the right angle. Precious gemstones like Emeralds and Pearls are extremely delicate.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--muted-foreground)] text-sm">
              <li><strong>Diamonds, Rubies, Sapphires:</strong> Clean using the same mild soap and warm water method used for gold.</li>
              <li><strong>Emeralds & Pearls:</strong> Never soak or use an ultrasonic cleaner. Wipe gently with a soft, damp cloth only.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
