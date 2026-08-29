import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQS } from '../data/properties'
import Reveal from './Reveal'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-maroon">
            Questions
          </p>
          <h2 className="mt-3 text-center font-display text-4xl font-light">
            Frequently asked
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-linen rounded-3xl border border-linen bg-white px-6">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
              >
                {f.q}
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className="shrink-0 text-xl text-maroon"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-ink/65">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
