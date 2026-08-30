import { Link, Navigate, useParams } from 'react-router-dom'
import ARTICLES from '../data/articles.json'
import { usePageMeta } from '../lib/use-page-meta'
import { useBooking } from '../lib/booking-context'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'
import Reveal from '../components/Reveal'

export default function Article() {
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)
  usePageMeta(article ? `${article.title} | Ritumbhara` : 'Journal | Ritumbhara', article?.excerpt)
  const { openBooking } = useBooking()

  if (!article) return <Navigate to="/journal" replace />
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <PageHero image={article.image} kicker={article.category} title={article.title}>
        <p className="text-sm text-cream/70">
          <Link to="/journal" className="underline-offset-4 hover:underline">Journal</Link>
          {' / '}{article.date} · {article.readTime}
        </p>
      </PageHero>

      <article className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {article.sections.map((s, i) => (
            <Reveal key={i} y={20}>
              <section className={i > 0 ? 'mt-10' : ''}>
                {s.heading && (
                  <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">{s.heading}</h2>
                )}
                {s.paras.map((p, j) => (
                  <p
                    key={j}
                    className={`mt-4 leading-relaxed text-ink/75 ${i === 0 && j === 0 ? 'font-display text-xl font-light leading-relaxed text-ink' : ''}`}
                  >
                    {p}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}

          {/* Booking CTA */}
          <Reveal>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-charcoal p-7 text-cream sm:p-9">
              <div>
                <p className="font-display text-2xl font-light">Planning this trip?</p>
                <p className="mt-1 text-sm text-cream/60">
                  Check availability across our stays — book direct, no OTA fees.
                </p>
              </div>
              <button
                onClick={() => openBooking({})}
                className="rounded-full bg-cream px-7 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Check Availability
              </button>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-linen bg-sand py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-2xl font-light">Keep reading</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
