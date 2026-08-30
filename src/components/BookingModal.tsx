import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBooking, type BookingRequest } from '../lib/booking-context'
import { searchStays, getQuote, inr, fmtDate, type Quote } from '../lib/booking'
import { PROPERTIES, destinationName, waLink } from '../data/properties'
import Img from './Img'

type Step = { view: 'results' } | { view: 'quote'; quote: Quote } | { view: 'confirmed'; quote: Quote }

export default function BookingModal() {
  const { request, closeBooking } = useBooking()
  return (
    <AnimatePresence>
      {request && <BookingDialog key="dialog" request={request} onClose={closeBooking} />}
    </AnimatePresence>
  )
}

/** Mounted fresh per open, so all flow state resets with each request. */
function BookingDialog({ request, onClose }: { request: BookingRequest; onClose: () => void }) {
  // Entry step: jump straight to the quote when a specific property was requested
  const [step, setStep] = useState<Step>(() => {
    const p = request.propertySlug && PROPERTIES.find((x) => x.slug === request.propertySlug)
    return p
      ? { view: 'quote', quote: getQuote(p, request.checkIn, request.checkOut) }
      : { view: 'results' }
  })
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      // Keep Tab cycling inside the dialog while it's open
      const dialog = dialogRef.current
      if (!dialog) return
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (!dialog.contains(active) || (!e.shiftKey && active === last)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault()
        last.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const prev = document.activeElement as HTMLElement | null
    requestAnimationFrame(() => dialogRef.current?.focus())
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  const results = useMemo(
    () => searchStays(request.destination, request.checkIn, request.checkOut, request.guests),
    [request],
  )

  return (
    <motion.div
          className="fixed inset-0 z-100 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Booking"
            tabIndex={-1}
            className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-linen px-6 py-4">
              <div>
                <p className="font-display text-lg">
                  {step.view === 'results' && 'Available stays'}
                  {step.view === 'quote' && step.quote.property.name}
                  {step.view === 'confirmed' && 'Booking confirmed'}
                </p>
                <p className="text-xs text-ink/50">
                  {fmtDate(request.checkIn)} → {fmtDate(request.checkOut)} · {request.guests}{' '}
                  {request.guests === 1 ? 'guest' : 'guests'} ·{' '}
                  <span className="text-maroon">demo pricing</span>
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full text-ink/60 transition hover:bg-linen hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              {step.view === 'results' && request.checkIn >= request.checkOut && (
                <p className="py-8 text-center text-sm text-ink/60">
                  Check-out must be after check-in — pick at least one night.
                </p>
              )}
              {step.view === 'results' && request.checkIn < request.checkOut && (
                <ul className="space-y-4">
                  {results.length === 0 && (
                    <p className="py-8 text-center text-sm text-ink/60">
                      No stays match that party size — try fewer guests, or WhatsApp us and we'll
                      arrange something.
                    </p>
                  )}
                  {results.map((q, i) => (
                    <motion.li
                      key={q.property.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        disabled={!q.available}
                        onClick={() => setStep({ view: 'quote', quote: q })}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-linen bg-white p-3 text-left transition enabled:hover:border-maroon/40 enabled:hover:shadow-lg disabled:opacity-50"
                      >
                        <Img
                          name={q.property.image}
                          alt={q.property.name}
                          sizes="96px"
                          className="size-20 shrink-0 rounded-xl"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{q.property.name}</p>
                          <p className="text-xs text-ink/50">
                            {q.property.type} · {destinationName(q.property.destination)}
                          </p>
                          <p className="mt-1 text-xs text-ink/60">{q.property.amenities.slice(0, 3).join(' · ')}</p>
                        </div>
                        <div className="text-right">
                          {q.available ? (
                            <>
                              <p className="font-display text-lg text-maroon">{inr(q.total)}</p>
                              <p className="text-[11px] text-ink/50">{q.nights.length} night{q.nights.length > 1 ? 's' : ''}, taxes in</p>
                            </>
                          ) : (
                            <p className="text-xs font-medium text-ink/40">Sold out</p>
                          )}
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}

              {step.view === 'quote' && (
                <QuoteView
                  quote={step.quote}
                  onBack={() => setStep({ view: 'results' })}
                  onConfirm={() => setStep({ view: 'confirmed', quote: step.quote })}
                  showBack={!request.propertySlug}
                />
              )}

              {step.view === 'confirmed' && <ConfirmedView quote={step.quote} onClose={onClose} />}
            </div>
          </motion.div>
        </motion.div>
  )
}

function QuoteView({
  quote,
  onBack,
  onConfirm,
  showBack,
}: {
  quote: Quote
  onBack: () => void
  onConfirm: () => void
  showBack: boolean
}) {
  const p = quote.property
  return (
    <div>
      <Img name={p.image} alt={p.name} sizes="640px" className="h-48 rounded-2xl" />
      <p className="mt-4 text-sm text-ink/70">{p.tagline}</p>
      <p className="mt-1 text-xs text-ink/50">{p.amenities.join(' · ')}</p>

      {quote.available ? (
        <div className="mt-5 rounded-2xl border border-linen bg-white p-4 text-sm">
          {quote.nights.map((n) => (
            <div key={n.date} className="flex justify-between py-0.5 text-ink/70">
              <span>{fmtDate(n.date)}</span>
              <span>{inr(n.rate)}</span>
            </div>
          ))}
          {quote.longStayDiscount > 0 && (
            <div className="flex justify-between py-0.5 text-maroon">
              <span>Long-stay discount (10%)</span>
              <span>−{inr(quote.longStayDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between py-0.5 text-ink/70">
            <span>Taxes &amp; fees (12%)</span>
            <span>{inr(quote.taxes)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-linen pt-2 font-semibold">
            <span>Total</span>
            <span className="font-display text-xl text-maroon">{inr(quote.total)}</span>
          </div>
        </div>
      ) : (
        <p className="mt-5 rounded-2xl bg-linen p-4 text-sm text-ink/70">
          Those dates are sold out for this stay — try shifting a day, or WhatsApp us and we'll find
          an alternative.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-ink"
          >
            ← All stays
          </button>
        )}
        {quote.available && (
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-maroon px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
          >
            Confirm booking — {inr(quote.total)}
          </button>
        )}
        <a
          href={waLink(`Hi, I'd like to check availability for ${p.name}`)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-maroon px-5 py-2.5 text-sm font-medium text-maroon transition hover:bg-maroon hover:text-cream"
        >
          WhatsApp
        </a>
      </div>
      <a
        href={p.bookingUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block text-center text-xs font-semibold text-ink/50 underline-offset-4 hover:text-ink hover:underline"
      >
        or book this room live on Hotel Spider →
      </a>
      <p className="mt-3 text-center text-[11px] text-ink/40">
        Demo flow — no payment is taken and no reservation is created.
      </p>
    </div>
  )
}

function ConfirmedView({ quote, onClose }: { quote: Quote; onClose: () => void }) {
  const ref = `RTB-${quote.property.slug.slice(0, 4).toUpperCase()}-${quote.nights[0]?.date.replaceAll('-', '').slice(2)}`
  return (
    <motion.div
      className="py-6 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="mx-auto grid size-16 place-items-center rounded-full bg-maroon text-3xl text-cream"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, delay: 0.1 }}
      >
        ✓
      </motion.div>
      <h3 className="mt-4 font-display text-2xl">You're all set</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
        {quote.property.name} · {fmtDate(quote.nights[0].date)} →{' '}
        {fmtDate(quote.nights[quote.nights.length - 1].date)} · {inr(quote.total)}
      </p>
      <p className="mt-3 font-mono text-sm tracking-widest text-maroon">{ref}</p>
      <p className="mx-auto mt-4 max-w-xs text-[11px] text-ink/40">
        This is a demo confirmation. In production this step hands off to the booking engine and
        payment gateway.
      </p>
      <button
        onClick={onClose}
        className="mt-6 rounded-full bg-ink px-8 py-2.5 text-sm font-semibold text-cream transition hover:bg-ink/80"
      >
        Done
      </button>
    </motion.div>
  )
}
