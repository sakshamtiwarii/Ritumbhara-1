import { Link } from 'react-router-dom'
import Img from './Img'

/** The fields a card needs; matches entries in articles.json. */
export interface ArticleSummary {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  image: string
}

interface ArticleCardProps {
  article: ArticleSummary
  /**
   * 'full': tall image with category pill, excerpt and date — the Journal index.
   * 'teaser': home-page card with category above the title and a date line.
   * 'compact': small related-guides card, category + title only.
   */
  variant?: 'full' | 'teaser' | 'compact'
  sizes?: string
}

/** Journal article link card, shared by every article grid on the site. */
export default function ArticleCard({
  article: a,
  variant = 'compact',
  sizes = '(min-width:640px) 33vw, 100vw',
}: ArticleCardProps) {
  const compact = variant === 'compact'
  const imageHeight = variant === 'full' ? 'h-52' : variant === 'teaser' ? 'h-48' : 'h-36'

  return (
    <Link
      to={`/journal/${a.slug}`}
      className={`group flex h-full flex-col overflow-hidden bg-white shadow-sm transition-shadow ${
        compact ? 'rounded-2xl hover:shadow-lg' : 'rounded-3xl hover:shadow-xl'
      }`}
    >
      <div className={`relative ${imageHeight} shrink-0 overflow-hidden`}>
        <div className="h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <Img name={a.image} alt={a.title} sizes={sizes} className="h-full" />
        </div>
        {variant === 'full' && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
            {a.category}
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5'}`}>
        {variant !== 'full' && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon">{a.category}</p>
        )}
        <h3
          className={`font-display leading-snug transition-colors group-hover:text-maroon ${
            variant === 'full' ? 'text-xl' : variant === 'teaser' ? 'mt-1 text-lg' : 'mt-1'
          }`}
        >
          {a.title}
        </h3>
        {variant === 'full' && <p className="mt-2 flex-1 text-sm text-ink/60">{a.excerpt}</p>}
        {variant !== 'compact' && (
          <p className={`text-xs text-ink/45 ${variant === 'full' ? 'mt-4' : 'mt-2'}`}>
            {a.date} · {a.readTime}
          </p>
        )}
      </div>
    </Link>
  )
}
