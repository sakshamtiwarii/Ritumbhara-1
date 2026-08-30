import { Link, Navigate, useParams } from 'react-router-dom'
import { DESTINATIONS, PROPERTIES, testimonialFor } from '../data/properties'
import ARTICLES from '../data/articles.json'
import { usePageMeta } from '../lib/use-page-meta'
import { useBooking } from '../lib/booking-context'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'

export default function Destination() {
  const { id } = useParams()
  const destination = DESTINATIONS.find((d) => d.id === id)
  usePageMeta(
    destination ? `${destination.name}, ${destination.region} | Ritumbhara` : 'Destinations | Ritumbhara',
    destination?.blurb,
  )
  const { openBooking } = useBooking()

  if (!destination) return <Navigate to="/#destinations" replace />
  const stays = PROPERTIES.filter((p) => p.destination === destination.id)
  const quote = testimonialFor(destination.id)
  const guides = ARTICLES.filter((a) =>
    a.category.toLowerCase().includes(destination.name.toLowerCase()),
  ).slice(0, 3)

  return (
    <>
      <PageHero
        image={destination.image ?? 'dest-agra'}
        kicker={`Destination · ${destination.region}`}
        title={destination.name}
      >
        <p>{destination.blurb}</p>
        {destination.open ? (
          <button
            onClick={() => openBooking({ destination: destination.id })}
            className="mt-5 rounded-full bg-cream px-7 py-3 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Check Availability
          </button>
        ) : (
          <a
            href="#notify"
            className="mt-5 inline-block rounded-full border border-gold/60 px-7 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink"
          >
            Coming Soon — Get Notified
          </a>
        )}
      </PageHero>

      {destination.open ? (
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-display text-3xl font-light sm:text-4xl">
                Stays in {destination.name}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stays.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.08} className="h-full">
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <Reveal>
              <h2 className="font-display text-3xl font-light sm:text-4xl">We're preparing managed stays in {destination.name}</h2>
              <p className="mt-3 text-ink/60">
                Leave your email on the{' '}
                <a href="#notify" className="font-semibold text-maroon underline-offset-4 hover:underline">notify list</a>{' '}
                and we'll tell you the moment {destination.name} opens for booking.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-charcoal py-16 text-cream sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Things to do</p>
            </Reveal>
            <div className="mt-6 space-y-5">
              {destination.thingsToDo.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.08} y={16}>
                  <div className="border-t border-cream/15 pt-4">
                    <h3 className="font-semibold">{t.title}</h3>
                    <p className="mt-1 text-sm text-cream/60">{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Getting around</p>
              <p className="mt-6 border-t border-cream/15 pt-4 text-sm leading-relaxed text-cream/70">
                {destination.gettingAround}
              </p>
              {quote && (
                <blockquote className="mt-8 rounded-2xl bg-cream/5 p-6">
                  <p className="font-display text-lg font-light leading-relaxed">“{quote.quote}”</p>
                  <footer className="mt-2 text-xs text-cream/50">
                    {quote.author} — {quote.place} · ★ {quote.source}
                  </footer>
                </blockquote>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="bg-sand py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-light">Guides for {destination.name}</h2>
              <Link to="/journal" className="text-sm font-semibold text-maroon underline-offset-4 hover:underline">
                All guides →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {guides.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
