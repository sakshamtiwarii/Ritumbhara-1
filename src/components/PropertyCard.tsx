import { Link } from 'react-router-dom'
import { type Property } from '../data/properties'
import { useBooking } from '../lib/booking-context'
import { inr } from '../lib/booking'
import Img from './Img'

interface PropertyCardProps {
  property: Property
  /** Small image-and-price tile for "More stays" rails; no booking button. */
  compact?: boolean
}

/** Stay card shared by the home portfolio grid, destination pages, and
 *  the related-stays rail on property pages. */
export default function PropertyCard({ property: p, compact = false }: PropertyCardProps) {
  const { openBooking } = useBooking()

  if (compact) {
    return (
      <Link
        to={`/properties/${p.slug}`}
        className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="h-40 overflow-hidden">
          <div className="h-full transition-transform duration-700 group-hover:scale-105">
            <Img name={p.image} alt={p.name} sizes="(min-width:640px) 33vw, 100vw" className="h-full" />
          </div>
        </div>
        <div className="p-4">
          <p className="font-display leading-snug group-hover:text-maroon">{p.name}</p>
          <p className="mt-1 text-xs text-ink/50">
            {p.type} · from {inr(p.baseRate)}/night
          </p>
        </div>
      </Link>
    )
  }

  return (
    <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl">
      <Link to={`/properties/${p.slug}`} className="relative block h-56 overflow-hidden">
        <div className="h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <Img
            name={p.image}
            alt={p.name}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="h-full"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
          {p.type}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-maroon/90 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm">
          ★ Superhost
        </span>
      </Link>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <Link to={`/properties/${p.slug}`} className="font-display text-xl transition-colors hover:text-maroon">
            {p.name}
          </Link>
          <p className="shrink-0 text-sm text-ink/50">
            from <span className="font-display text-lg text-maroon">{inr(p.baseRate)}</span>/night
          </p>
        </div>
        <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
        <p className="mt-2 text-xs text-ink/45">{p.amenities.slice(0, 3).join(' · ')}</p>
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/properties/${p.slug}`}
            className="text-sm font-semibold text-maroon underline-offset-4 hover:underline"
          >
            View stay →
          </Link>
          <button
            onClick={() => openBooking({ destination: p.destination, propertySlug: p.slug })}
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream transition hover:bg-maroon"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  )
}
