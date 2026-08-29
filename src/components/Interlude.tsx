import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Img from './Img'
import Reveal from './Reveal'
import { useBooking } from '../lib/booking-context'

/** Full-bleed parallax band — Jal Mahal, between the content sections. */
export default function Interlude() {
  const ref = useRef<HTMLDivElement>(null)
  const { openBooking } = useBooking()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative h-[70vh] min-h-105 overflow-hidden">
      <motion.div className="absolute inset-0 scale-125" style={{ y }}>
        <Img name="jaipur-jal-mahal" alt="Jal Mahal palace on Man Sagar Lake, Jaipur" sizes="100vw" className="h-full" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-5 text-center text-cream">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Rajasthan, at your door</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-6xl">
            Forts at sunrise, safaris at dawn — and a spotless room to come back to.
          </h2>
          <button
            onClick={() => openBooking({})}
            className="mt-8 rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Plan Your Stay
          </button>
        </Reveal>
      </div>
    </section>
  )
}
