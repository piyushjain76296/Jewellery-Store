export default function RingSizeGuidePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl mb-4 text-center">Ring Size Guide</h1>
        <p className="text-center text-[var(--muted-foreground)] mb-12">Find the perfect fit for your ring.</p>
        
        <div className="space-y-8 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            The most accurate way to determine your ring size is to visit a local jeweler. However, if you are purchasing online, you can use our simple at-home measuring techniques.
          </p>

          <div className="bg-gold-50 dark:bg-gold-900/10 p-6 rounded-xl border border-gold-200 dark:border-gold-800">
            <h3 className="font-semibold text-gold-700 dark:text-gold-400 mb-3">Method 1: Measure an Existing Ring</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>Select a ring that properly fits the intended finger.</li>
              <li>Measure the inside diameter of the ring in millimeters.</li>
              <li>Use our conversion chart below to find the corresponding ring size.</li>
            </ol>
          </div>

          <div className="bg-gold-50 dark:bg-gold-900/10 p-6 rounded-xl border border-gold-200 dark:border-gold-800">
            <h3 className="font-semibold text-gold-700 dark:text-gold-400 mb-3">Method 2: Measure Your Finger</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>Wrap a piece of string or paper around the base of your finger.</li>
              <li>Mark the point where the ends meet.</li>
              <li>Measure the string or paper with a ruler in millimeters to find the circumference.</li>
              <li>Divide the circumference by 3.14 to get the diameter, and check the chart.</li>
            </ol>
          </div>

          <h2 className="font-display text-2xl mt-8 mb-4 border-b border-[var(--border)] pb-2">Size Chart (Indian / Asian Sizes)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="py-3 px-4 font-semibold">Ring Size</th>
                  <th className="py-3 px-4 font-semibold">Diameter (mm)</th>
                  <th className="py-3 px-4 font-semibold">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--muted-foreground)]">
                <tr><td className="py-3 px-4">10</td><td className="py-3 px-4">15.9</td><td className="py-3 px-4">50.0</td></tr>
                <tr><td className="py-3 px-4">12</td><td className="py-3 px-4">16.5</td><td className="py-3 px-4">51.8</td></tr>
                <tr><td className="py-3 px-4">14</td><td className="py-3 px-4">17.1</td><td className="py-3 px-4">53.8</td></tr>
                <tr><td className="py-3 px-4">16</td><td className="py-3 px-4">17.8</td><td className="py-3 px-4">55.8</td></tr>
                <tr><td className="py-3 px-4">18</td><td className="py-3 px-4">18.4</td><td className="py-3 px-4">57.8</td></tr>
                <tr><td className="py-3 px-4">20</td><td className="py-3 px-4">19.1</td><td className="py-3 px-4">60.0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
