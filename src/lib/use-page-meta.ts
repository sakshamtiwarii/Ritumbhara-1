import { useEffect } from 'react'

/** Site-wide fallback, mirrors the description baked into index.html. */
export const DEFAULT_DESCRIPTION =
  'Hotels, villas, serviced apartments and boutique stays across India, each one managed to the same exacting standard.'

/** Sets document title + meta description per page (always sets the
 *  description so one page's copy never leaks into the next). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description ?? DEFAULT_DESCRIPTION)
  }, [title, description])
}
