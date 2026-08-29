import { useState } from 'react'
import manifest from '../data/image-manifest.json'

type ManifestEntry = { widths: number[]; aspect: number; blur: string }
const MANIFEST = manifest as Record<string, ManifestEntry>

interface ImgProps {
  name: string
  alt: string
  sizes?: string
  className?: string
  eager?: boolean
}

/** Responsive <picture> backed by the AVIF/WebP/JPEG sets in public/images. */
export default function Img({ name, alt, sizes = '100vw', className = '', eager = false }: ImgProps) {
  const [loaded, setLoaded] = useState(false)
  const entry = MANIFEST[name]
  if (!entry) return null

  const srcset = (ext: string) =>
    entry.widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')
  const largest = entry.widths[entry.widths.length - 1]

  return (
    <picture
      className={`block overflow-hidden ${className}`}
      style={{ backgroundImage: `url(${entry.blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/images/${name}-${largest}.jpg`}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </picture>
  )
}
