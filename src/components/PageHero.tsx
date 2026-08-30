import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Img from './Img'

interface PageHeroProps {
  image: string
  kicker: string
  title: string
  children?: ReactNode
  compact?: boolean
}

/** Dark image header shared by the inner pages, sized to sit under the transparent nav. */
export default function PageHero({ image, kicker, title, children, compact = false }: PageHeroProps) {
  return (
    <header className={`relative overflow-hidden bg-charcoal text-cream ${compact ? 'min-h-[52svh]' : 'min-h-[64svh]'}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Img name={image} alt="" eager sizes="100vw" className="h-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-ink/75" />
      <div className={`relative mx-auto flex max-w-4xl flex-col items-start justify-end px-5 pb-14 sm:px-8 ${compact ? 'min-h-[52svh]' : 'min-h-[64svh]'} pt-28`}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-gold"
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-4 max-w-2xl text-cream/80"
          >
            {children}
          </motion.div>
        )}
      </div>
    </header>
  )
}
