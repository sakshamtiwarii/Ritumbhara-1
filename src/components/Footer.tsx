import { useState } from 'react'
import { DESTINATIONS, EMAIL, PHONE, WHATSAPP } from '../data/properties'
import Reveal from './Reveal'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer id="contact" className="bg-charcoal text-cream">
      {/* Notify strip */}
      <div id="notify" className="border-b border-cream/10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-light sm:text-4xl">Not ready to book yet?</h2>
            <p className="mt-2 text-sm text-cream/60">
              Leave your email and we'll tell you about new destinations, availability, and offers.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {subscribed ? (
              <p className="rounded-full border border-gold/40 px-6 py-3.5 text-center text-sm text-gold">
                ✓ You're on the list — we'll be in touch. (Demo — nothing was sent.)
              </p>
            ) : (
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSubscribed(true)
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-full border border-cream/20 bg-transparent px-5 py-3 text-sm outline-none transition placeholder:text-cream/30 focus:border-gold"
                />
                <button className="rounded-full bg-maroon px-7 py-3 text-sm font-semibold transition hover:bg-maroon-deep">
                  Notify Me
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">
            Ritumbhara<sup className="text-xs">®</sup>
          </p>
          <p className="mt-3 max-w-xs text-sm text-cream/55">
            A hospitality management company curating hotels, villas, and boutique stays across
            India.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40">Destinations</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {DESTINATIONS.map((d) => (
              <li key={d.id}>
                {d.name}
                {!d.open && <span className="text-cream/40"> (Coming Soon)</span>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><a href="#top" className="hover:text-cream">Our Story</a></li>
            <li><a href="#standard" className="hover:text-cream">The Ritumbhara Standard</a></li>
            <li><a href="#experiences" className="hover:text-cream">Experiences</a></li>
            <li>
              <a
                href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I own a property and I'd like to partner with Ritumbhara")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cream"
              >
                Partner With Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cream/40">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><a href={`tel:${PHONE.replace(/ /g, '')}`} className="hover:text-cream">{PHONE}</a></li>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-cream">
                WhatsApp Us
              </a>
            </li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-cream">{EMAIL}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/40">
        <p>© 2026 Ritumbhara, a brand of LilacMosaic Technologies Private Limited. All rights reserved.</p>
        <p className="mt-1">Secure booking · Direct rates · No OTA fees · Prices &amp; availability on this page are demo data</p>
      </div>
    </footer>
  )
}
