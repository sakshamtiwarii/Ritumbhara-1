import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROPERTIES } from '../data/properties'
import { useBooking } from '../lib/booking-context'
import { inr } from '../lib/booking'
import Img from './Img'
import Reveal from './Reveal'

const FILTERS = [
  { id: 'all', label: 'All Stays' },
  { id: 'jaipur', label: 'Jaipur' },
  { id: 'alwar', label: 'Alwar' },
  { id: 'sariska', label: 'Sariska' },
] as const

export default function Stays() {
  const [filter, setFilter] = useState<string>('all')
  const { openBooking } = useBooking()
  const shown = PROPERTIES.filter((p) => filter === 'all' || p.destination === filter)

  return (
    <section id="stays" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">The Portfolio</p>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">Every stay we manage</h2>
            <p className="mt-3 max-w-xl text-sm text-ink/60">
              Eleven properties, one operating standard. Nightly rates shown are demo pricing.
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
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <Img name={p.image} alt={p.name} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-full" />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
                    {p.type}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-maroon/90 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm">
                    ★ Superhost
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <p className="shrink-0 text-sm text-ink/50">
                      from <span className="font-display text-lg text-maroon">{inr(p.baseRate)}</span>/night
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
                  <p className="mt-2 text-xs text-ink/45">{p.amenities.slice(0, 3).join(' · ')}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-ink/40">Book direct · No OTA fees</span>
                    <button
                      onClick={() => openBooking({ destination: p.destination, propertySlug: p.slug })}
                      className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream transition hover:bg-maroon"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
