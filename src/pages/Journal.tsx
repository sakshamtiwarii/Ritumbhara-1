import ARTICLES from '../data/articles.json'
import { usePageMeta } from '../lib/use-page-meta'
import PageHero from '../components/PageHero'
import ArticleCard from '../components/ArticleCard'
import Reveal from '../components/Reveal'

export default function Journal() {
  usePageMeta(
    'Journal | Ritumbhara',
    'Practical travel guides for Jaipur, Alwar and Sariska — when to go, how to get between them, and where to stay.',
  )

  return (
    <>
      <PageHero
        image="jaipur-amber-fort"
        kicker="Journal"
        title="Travel notes on Jaipur, Alwar & Sariska"
        compact
      >
        <p>
          Practical guides for planning a trip around our destinations — when to go, how to get
          between them, and where to stay.
        </p>
      </PageHero>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.08} className="h-full">
              <ArticleCard
                article={a}
                variant="full"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
