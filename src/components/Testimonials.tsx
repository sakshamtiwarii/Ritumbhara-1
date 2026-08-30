import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TESTIMONIALS } from '../data/properties'
import Reveal from './Reveal'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  // `index` in the deps restarts the timer whenever a dot is clicked, so a
  // manual selection gets its full 5.5s before auto-advance resumes
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5500)
    return () => clearInterval(t)
  }, [index])

  const t = TESTIMONIALS[index]

  return (
    <section className="bg-linen py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Guest Stories</p>
        </Reveal>
        <div className="relative mt-8 min-h-44">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl font-light leading-snug sm:text-3xl">
                “{t.quote}”
              </p>
              <footer className="mt-5 text-sm text-ink/60">
                <span className="font-semibold text-ink">{t.author}</span> — {t.place} ·{' '}
                <span className="text-maroon">★ {t.source}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-maroon' : 'w-3 bg-ink/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
