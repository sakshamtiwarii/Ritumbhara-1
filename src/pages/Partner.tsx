import { useState } from 'react'
import { usePageMeta } from '../lib/use-page-meta'
import { STANDARD, waLink } from '../data/properties'
import { FIELD } from '../lib/ui'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const STEPS = [
  { title: 'Introductory call', body: 'A 30-minute conversation about your property, your goals, and whether the FOCO model fits.' },
  { title: 'Property assessment', body: 'We visit, assess the asset against the Ritumbhara Standard, and scope any upgrades needed.' },
  { title: 'Agreement & onboarding', body: 'Partnership agreement, revenue terms, and an onboarding plan — typically 4 to 6 weeks to launch.' },
  { title: 'Go live', body: 'Your property joins the portfolio: listed, staffed, photographed, and operated to the Standard.' },
]

const BENEFITS = [
  { title: 'You retain the asset', body: 'Franchise-Owned, Company-Operated: ownership never changes hands.' },
  { title: 'Professional operations', body: 'Housekeeping, guest communication, and maintenance run by our team.' },
  { title: 'Revenue, not vacancy', body: 'Direct bookings and Superhost-rated listings keep occupancy working for you.' },
  { title: 'Brand & technology', body: 'Listing management, pricing, and guest experience systems included.' },
]

export default function Partner() {
  usePageMeta(
    'Partner With Us | Ritumbhara',
    'Own a property in Jaipur, Alwar, Sariska, or Agra? Partner with Ritumbhara under the FOCO model — you keep the asset, we operate it to the Standard.',
  )
  const [form, setForm] = useState({ name: '', phone: '', city: 'Jaipur', type: 'Studio / Apartment', message: '' })
  const [sent, setSent] = useState(false)

  const field = `${FIELD} px-4 py-3`
  const waHref = waLink(
    `Hi, I'm ${form.name || 'a property owner'} — I own a ${form.type} in ${form.city} and I'd like to partner with Ritumbhara. ${form.message}`.trim(),
  )

  return (
    <>
      <PageHero image="apartment-813" kicker="FOCO Partnership" title="Own the asset. We'll run the stay.">
        <p>
          Ritumbhara partners with property owners under a Franchise-Owned, Company-Operated model —
          you keep your property, we operate it to the Ritumbhara Standard.
        </p>
      </PageHero>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-linen bg-white p-6">
                  <p className="font-display text-lg text-maroon">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-2 font-semibold">{b.title}</h2>
                  <p className="mt-2 text-sm text-ink/60">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-cream sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">How onboarding works</p>
            <h2 className="mt-3 font-display text-3xl font-light sm:text-4xl">Four steps to launch</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="border-t border-cream/15 pt-5">
                  <p className="font-display text-2xl text-gold/80">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-cream/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-3xl text-sm text-cream/50">
              What your property gets: {STANDARD.map((s) => s.title.toLowerCase()).join(', ')} — the
              same ten commitments every Ritumbhara stay runs on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-light sm:text-4xl">Tell us about your property</h2>
            <p className="mt-3 text-center text-sm text-ink/60">
              A few details and we'll set up an introductory call. Prefer to talk now?{' '}
              <a href={waHref} target="_blank" rel="noreferrer" className="font-semibold text-maroon underline-offset-4 hover:underline">
                WhatsApp us directly
              </a>.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {sent ? (
              <div className="mt-10 rounded-3xl border border-linen bg-white p-10 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-maroon text-2xl text-cream">✓</div>
                <p className="mt-4 font-display text-2xl">Thank you, {form.name.split(' ')[0] || 'partner'}</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
                  We'll reach out within one business day. (Demo — nothing was submitted; use the
                  WhatsApp button to reach us for real.)
                </p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
                >
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form
                className="mt-10 grid gap-4 rounded-3xl border border-linen bg-white p-7 sm:grid-cols-2 sm:p-9"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">Your name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Full name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">Phone</span>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} placeholder="+91" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">City</span>
                  <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={field}>
                    {['Jaipur', 'Alwar', 'Sariska', 'Agra', 'Other'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">Property type</span>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={field}>
                    {['Studio / Apartment', 'Villa', 'Multiple units', 'Hotel / Resort', 'Land / Under construction'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/60">Anything else</span>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field} placeholder="Number of units, current occupancy, timelines…" />
                </label>
                <button className="rounded-full bg-maroon px-8 py-3.5 text-sm font-semibold text-cream transition hover:bg-maroon-deep sm:col-span-2">
                  Request an Intro Call
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
