# Ritumbhara

Marketing + booking demo site for **Ritumbhara**, a hospitality management company running studios, serviced apartments, and villas across Jaipur, Alwar, and Sariska (Rajasthan), with Agra coming next.

> **Demo notice:** prices, availability, and every form on the site are demo-only. Nothing is charged, reserved, or submitted. The real booking path is the per-room Hotel Spider links and WhatsApp.

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org), built with [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) — theme tokens (colors, fonts) live in `src/index.css` under `@theme`
- [framer-motion](https://motion.dev) for scroll reveals, parallax, and modal transitions
- [react-router-dom](https://reactrouter.com) for client-side routing (SPA; see deploy notes)

## Commands

```sh
npm install
npm run dev       # local dev server
npm run build     # typecheck (tsc -b) + production build to dist/
npm run lint      # oxlint
npm run preview   # serve the production build locally
```

## Project layout

```
src/
  App.tsx            Routes, layout shell (Nav / Footer / BookingModal / WhatsAppFab)
  pages/             One component per route (Home, Property, Destination, Journal, …)
  components/        Shared UI. Notable ones:
                       Img.tsx           responsive <picture> backed by the image manifest
                       PropertyCard.tsx  stay card used by every property grid
                       ArticleCard.tsx   journal card used by every article grid
                       BookingModal.tsx  the search → quote → confirm demo flow
                       Reveal.tsx        fade-and-rise on scroll into view
  lib/
    booking.ts       DEMO booking engine (see below) + date/price helpers
    booking-context.tsx  app-wide "a booking request is open" state
    use-page-meta.ts per-page <title> + meta description
    ui.ts            shared form-field class string
  data/
    properties.ts    the single source of truth: properties, destinations,
                     testimonials, FAQs, contact constants, and small helpers
                     (waLink, testimonialFor, destinationName)
    articles.json    journal articles (content included)
    image-manifest.json  generated — do not edit by hand (see images)
```

## The demo booking engine

`src/lib/booking.ts` fakes a live booking system deterministically: availability and nightly rates are derived from hashing `property + date`, so the UI behaves consistently (same dates always give the same prices/sold-out nights) without any backend. Weekend and seasonal multipliers, a long-stay discount, and 12% taxes are layered on top.

To go live, replace `isAvailable`, `nightlyRate`, and `getQuote` with calls to a real inventory API (each property already carries its real Hotel Spider reservation URL in `properties.ts`), and wire the confirm step to a payment gateway.

## Images

Source photos go in `assets-src/`, then:

```sh
node scripts/optimize-images.mjs
```

generates AVIF/WebP/JPEG at several widths into `public/images/` and rewrites `src/data/image-manifest.json` (widths, aspect ratio, and a base64 blur placeholder per image). `<Img name="…">` looks images up by manifest key — an unknown key renders nothing.

An optional `public/hero.mp4` plays as the hero backdrop on desktop; without it (or on phones / reduced-motion) the hero falls back to a crossfading slideshow.

## Deploy

The site is a SPA, so all paths must rewrite to `index.html`:

- **Vercel** — handled by `vercel.json`
- **Netlify** — handled by `public/_redirects`

`index.html` carries the meta/OG tags. The `og:image` URL must be made absolute once the site has a production domain.
