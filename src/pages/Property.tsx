import { Link, Navigate, useParams } from 'react-router-dom'
import { DESTINATIONS, PROPERTIES, testimonialFor, waLink } from '../data/properties'
import { usePageMeta } from '../lib/use-page-meta'
import { useBooking } from '../lib/booking-context'
import { inr } from '../lib/booking'
import PageHero from '../components/PageHero'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'

export default function Property() {
  const { slug } = useParams()
  const property = PROPERTIES.find((p) => p.slug === slug)
  usePageMeta(
    property ? `${property.name} | Ritumbhara` : 'Stays | Ritumbhara',
    property?.description,
  )
  const { openBooking } = useBooking()

  if (!property) return <Navigate to="/#stays" replace />
  const destination = DESTINATIONS.find((d) => d.id === property.destination)!
  const quote = testimonialFor(property.destination)
  const related = PROPERTIES.filter(
    (p) => p.destination === property.destination && p.slug !== property.slug,
  ).slice(0, 3)
  const waHref = waLink(`Hi, I'd like to check availability for ${property.name}`)

  return (
    <>
      <PageHero image={property.image} kicker={`${property.type} · ${destination.name}, ${destination.region}`} title={property.name}>
        <p className="text-sm text-cream/70">
          <Link to="/" className="underline-offset-4 hover:underline">Home</Link>
          {' / '}
          <Link to={`/destinations/${destination.id}`} className="underline-offset-4 hover:underline">
            {destination.name}
          </Link>
          {' / '}{property.name} · <span className="text-gold">★ Airbnb Superhost</span>
        </p>
      </PageHero>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="font-display text-2xl font-light leading-relaxed">{property.description}</p>
              <p className="mt-3 text-sm text-ink/60">{property.tagline}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Amenities</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-ink/75">
                    <span className="mt-0.5 text-maroon">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            {quote && (
              <Reveal delay={0.15}>
                <blockquote className="mt-10 rounded-3xl bg-linen p-7">
                  <p className="font-display text-xl font-light leading-relaxed">“{quote.quote}”</p>
                  <footer className="mt-3 text-sm text-ink/60">
                    <span className="font-semibold text-ink">{quote.author}</span> — a guest in{' '}
                    {quote.place} · <span className="text-maroon">★ {quote.source}</span>
                  </footer>
                </blockquote>
              </Reveal>
            )}
          </div>

          {/* Booking card */}
          <Reveal delay={0.1}>
            <aside className="top-24 rounded-3xl border border-linen bg-white p-7 shadow-sm lg:sticky">
              <p className="text-sm text-ink/50">
                from <span className="font-display text-3xl text-maroon">{inr(property.baseRate)}</span>{' '}
                /night <span className="text-xs">(demo rate)</span>
              </p>
              <p className="mt-1 text-xs text-ink/45">
                Sleeps up to {property.maxGuests} · Book direct · No OTA fees
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => openBooking({ destination: property.destination, propertySlug: property.slug })}
                  className="rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
                >
                  Check Availability
                </button>
                <a
                  href={property.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-ink px-6 py-3 text-center text-sm font-semibold text-cream transition hover:bg-ink/80"
                >
                  Book Now on Hotel Spider
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-maroon px-6 py-3 text-center text-sm font-semibold text-maroon transition hover:bg-maroon hover:text-cream"
                >
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-4 text-center text-[11px] text-ink/40">
                Hotel Spider is our secure booking partner — live rates and instant confirmation.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-linen bg-sand py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-2xl font-light">More stays in {destination.name}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.slug} property={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
