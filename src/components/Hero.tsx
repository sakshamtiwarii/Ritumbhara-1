import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Img from './Img'
import BookingBar from './BookingBar'

const HEADLINE = ['India,', 'Thoughtfully', 'Hosted.']

/** Rotating hero backdrops: interiors and destinations, all landscape. */
const SLIDES = [
  { name: 'studio-925', alt: 'A Ritumbhara studio in Jaipur' },
  { name: 'jaipur-jal-mahal', alt: 'Jal Mahal palace on Man Sagar Lake, Jaipur' },
  { name: 'studio-807-alwar', alt: 'Carved wood interiors at Studio 807, Alwar' },
  { name: 'agra-taj-arch', alt: 'The Taj Mahal seen through a sandstone archway' },
]
const SLIDE_MS = 7000

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative min-h-svh overflow-hidden bg-charcoal text-cream">
      {/* Backdrop: hero.mp4 when present, else a slow crossfading slideshow */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: imgY }}>
        <HeroBackdrop reduced={!!reduced} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-charcoal" />

      <motion.div
        style={reduced ? undefined : { y: textY, opacity: fade }}
        className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pb-10 pt-28 sm:min-h-svh sm:px-8 sm:pb-48"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold"
        >
          ★ Airbnb Superhost · Book Direct, No OTA Fees
        </motion.p>

        <h1 className="font-display text-[13vw] font-light leading-[0.98] sm:text-7xl lg:text-8xl">
          {HEADLINE.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg"
        >
          A home-away-from-home, managed so you don't have to worry. Hotels, villas, serviced
          apartments and boutique stays across India — each one held to the same exacting standard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#stays"
            className="rounded-full bg-cream px-7 py-3 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Explore Stays
          </a>
          <a
            href="#destinations"
            className="rounded-full border border-cream/40 px-7 py-3 text-sm font-semibold transition hover:border-cream hover:bg-cream/10"
          >
            Our Destinations
          </a>
        </motion.div>
      </motion.div>

      {/* Booking bar riding the hero's lower edge */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-5 pb-24 sm:absolute sm:inset-x-0 sm:bottom-16 sm:px-8 sm:pb-0"
      >
        <div className="mx-auto max-w-5xl">
          <BookingBar />
        </div>
      </motion.div>

      {/* Destination ticker */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-cream/10 bg-charcoal/80 py-3 backdrop-blur-sm">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-xs uppercase tracking-[0.35em] text-cream/40">
          {/* second copy exists only to make the marquee loop seamless */}
          {[0, 1].map((n) => (
            <span key={n} className="flex gap-10" aria-hidden={n === 1}>
              {['Jaipur', 'Alwar', 'Sariska', 'Agra — Coming Soon', 'The Ritumbhara Standard'].map(
                (t) => (
                  <span key={t}>{t} ·</span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}


function HeroBackdrop({ reduced }: { reduced: boolean }) {
  const [slide, setSlide] = useState(0)
  const [videoOk, setVideoOk] = useState(false)
  // Skip the video for reduced-motion users and on phones (weight + autoplay etiquette)
  const [wantVideo, setWantVideo] = useState(
    () => !reduced && typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches,
  )

  useEffect(() => {
    if (reduced || videoOk) return
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [reduced, videoOk])

  return (
    <div className="relative h-full w-full">
      {/* Drop a hero.mp4 into public/ and it takes over automatically */}
      {wantVideo && (
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoOk(true)}
          onError={() => {
            setVideoOk(false)
            setWantVideo(false)
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoOk ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {!videoOk && (
        <AnimatePresence>
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            <motion.div
              className="h-full w-full"
              initial={reduced ? false : { scale: slide % 2 ? 1 : 1.12 }}
              animate={reduced ? undefined : { scale: slide % 2 ? 1.12 : 1 }}
              transition={{ duration: (SLIDE_MS + 2000) / 1000, ease: 'linear' }}
            >
              <Img name={SLIDES[slide].name} alt={SLIDES[slide].alt} eager className="h-full" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
