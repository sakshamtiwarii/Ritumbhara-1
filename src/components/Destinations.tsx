import { motion } from 'framer-motion'
import { DESTINATIONS } from '../data/properties'
import { useBooking } from '../lib/booking-context'
import Img from './Img'
import Reveal from './Reveal'

export default function Destinations() {
  const { openBooking } = useBooking()

  return (
    <section id="destinations" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Destinations</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-light sm:text-5xl">
            Four cities. One standard.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1}>
              {d.open && d.image ? (
                <motion.button
                  onClick={() => openBooking({ destination: d.id })}
                  whileHover="hover"
                  className="group relative block h-105 w-full overflow-hidden rounded-3xl text-left text-cream"
                >
                  <motion.div
                    className="absolute inset-0"
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Img name={d.image} alt={d.name} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="h-full" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                      {d.region} · {d.stays} {d.stays === 1 ? 'stay' : 'stays'}
                    </p>
                    <h3 className="mt-1 font-display text-3xl">{d.name}</h3>
                    <p className="mt-2 text-sm text-cream/75">{d.blurb}</p>
                    <p className="mt-3 text-sm font-semibold opacity-0 transition duration-500 group-hover:opacity-100">
                      Check availability →
                    </p>
                  </div>
                </motion.button>
              ) : (
                <a
                  href="#notify"
                  className="group relative block h-105 w-full overflow-hidden rounded-3xl text-left text-cream"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    {d.image && (
                      <Img
                        name={d.image}
                        alt={d.name}
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                        className="h-full"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
                  <span className="absolute left-5 top-5 rounded-full border border-gold/60 bg-ink/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
                    Coming Soon
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-cream/60">{d.region}</p>
                    <h3 className="mt-1 font-display text-3xl">{d.name}</h3>
                    <p className="mt-2 text-sm text-cream/75">{d.blurb}</p>
                    <p className="mt-3 text-sm font-semibold text-gold opacity-0 transition duration-500 group-hover:opacity-100">
                      Get notified →
                    </p>
                  </div>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
