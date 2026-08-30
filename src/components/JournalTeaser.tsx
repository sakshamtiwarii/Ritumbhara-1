import { Link } from 'react-router-dom'
import ARTICLES from '../data/articles.json'
import ArticleCard from './ArticleCard'
import Reveal from './Reveal'

export default function JournalTeaser() {
  const featured = ARTICLES.slice(0, 3)

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Journal</p>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">Notes for the road</h2>
          </div>
          <Link to="/journal" className="text-sm font-semibold text-maroon underline-offset-4 hover:underline">
            All guides →
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {featured.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08} className="h-full">
              <ArticleCard article={a} variant="teaser" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
