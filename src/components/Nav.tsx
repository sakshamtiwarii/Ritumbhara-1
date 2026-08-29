import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useBooking } from '../lib/booking-context'

const LINKS = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#stays', label: 'Stays' },
  { href: '#standard', label: 'The Standard' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { openBooking } = useBooking()

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 60))

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-cream/90 text-ink shadow-sm backdrop-blur-md' : 'bg-transparent text-cream'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-2xl tracking-wide">
          Ritumbhara<sup className="text-xs">®</sup>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="opacity-80 transition hover:opacity-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openBooking({})}
            className={`hidden rounded-full px-5 py-2 text-sm font-semibold transition sm:block ${
              solid
                ? 'bg-maroon text-cream hover:bg-maroon-deep'
                : 'bg-cream text-ink hover:bg-white'
            }`}
          >
            Book Now
          </button>
          <button
            className="text-2xl lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1 bg-cream px-6 pb-6 text-ink lg:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-medium">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false)
                openBooking({})
              }}
              className="mt-2 w-full rounded-full bg-maroon py-2.5 font-semibold text-cream"
            >
              Book Now
            </button>
          </li>
        </motion.ul>
      )}
    </motion.header>
  )
}
