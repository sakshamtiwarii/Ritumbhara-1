import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROPERTIES } from '../data/properties'
import PropertyCard from './PropertyCard'
import Reveal from './Reveal'

const FILTERS = [
  { id: 'all', label: 'All Stays' },
  { id: 'jaipur', label: 'Jaipur' },
  { id: 'alwar', label: 'Alwar' },
  { id: 'sariska', label: 'Sariska' },
] as const

const COUNT_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']

export default function Stays() {
  const [filter, setFilter] = useState<string>('all')
  const shown = PROPERTIES.filter((p) => filter === 'all' || p.destination === filter)
  const count = COUNT_WORDS[PROPERTIES.length] ?? String(PROPERTIES.length)

  return (
    <section id="stays" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">The Portfolio</p>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">Every stay we manage</h2>
            <p className="mt-3 max-w-xl text-sm text-ink/60">
              {count} properties, one operating standard. Nightly rates shown are demo pricing.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === f.id ? 'bg-ink text-cream' : 'bg-white text-ink/70 hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
