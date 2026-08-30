import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/use-page-meta'
import { STANDARD } from '../data/properties'
import PageHero from '../components/PageHero'
import Img from '../components/Img'
import Reveal from '../components/Reveal'

export default function About() {
  usePageMeta(
    'Our Story | Ritumbhara',
    "How Ritumbhara came to manage stays across Rajasthan to one exacting standard — and where it's going next.",
  )

  return (
    <>
      <PageHero image="studio-807-alwar" kicker="Our Story" title="Consistency, not spectacle.">
        <p>
          Ritumbhara began with a simple observation about Indian hospitality: guests wanted
          consistency more than spectacle.
        </p>
      </PageHero>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-2xl font-light leading-relaxed text-ink">
              A traveler booking a stay in Jaipur or Alwar deserved the same standard of
              housekeeping, service, and care regardless of which building they walked into.
            </p>
            <p className="mt-6 leading-relaxed text-ink/75">
              That observation became a company. Today Ritumbhara manages studios, serviced
              apartments, and villas across Jaipur, Alwar, and Sariska — with Agra next — each one
              operated to the same ten commitments, whether it's a compact studio on the twelfth
              floor or a villa at the edge of a tiger reserve.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-linen bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Vision</p>
                <p className="mt-3 leading-relaxed text-ink/80">
                  To become India's most trusted hospitality management company, present in over a
                  hundred cities, without ever compromising the standard a guest can expect from a
                  single Ritumbhara-managed stay.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-linen bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Mission</p>
                <p className="mt-3 leading-relaxed text-ink/80">
                  We manage hotels, studios, villas, and serviced apartments to one operating
                  standard, so that owners gain professional management and guests gain certainty.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Standard, condensed */}
      <section className="bg-charcoal py-20 text-cream sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">The Ritumbhara Standard</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-light sm:text-4xl">
              Ten commitments, applied identically across every property we manage.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {STANDARD.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04} y={12}>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80">
                  <span className="font-display text-gold/80">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Link to="/#standard" className="mt-8 inline-block text-sm font-semibold text-gold underline-offset-4 hover:underline">
              Read the full standard →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOCO */}
      <section className="bg-sand py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">FOCO Model &amp; Future Expansion</p>
            <h2 className="mt-3 font-display text-3xl font-light sm:text-4xl">
              Owners keep the asset. We bring the standard.
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">
              Ritumbhara partners with property owners under a Franchise-Owned, Company-Operated
              model: owners retain the asset, Ritumbhara brings systems, staffing standards,
              technology, and brand.
            </p>
            <Link
              to="/partner"
              className="mt-6 inline-block rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
            >
              Partner With Us
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Img name="villa-65-sariska" alt="The grounds at Villa 65 Sariska" sizes="(min-width:1024px) 50vw, 100vw" className="h-80 rounded-3xl" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
