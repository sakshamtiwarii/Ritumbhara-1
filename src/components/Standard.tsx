import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { STANDARD } from '../data/properties'
import Img from './Img'
import Reveal from './Reveal'

export default function Standard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="standard" ref={ref} className="relative overflow-hidden bg-charcoal py-24 text-cream sm:py-32">
      {/* Dim parallax backdrop */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: imgY, scale: 1.2 }}>
        <Img name="studio-807-alwar" alt="" sizes="100vw" className="h-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/60 to-charcoal" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">The Ritumbhara Standard</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-light sm:text-5xl">
            Ten commitments, applied identically — whether it's a compact studio in Jaipur or a
            villa in Sariska.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {STANDARD.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08} y={24}>
              <div className="group flex gap-5 border-t border-cream/15 pt-5">
                <span className="font-display text-lg text-gold/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-semibold tracking-wide">{s.title}</h3>
                  <p className="mt-1 text-sm text-cream/60">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
