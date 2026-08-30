import { Link } from 'react-router-dom'
import { DESTINATIONS, EMAIL, PHONE, waLink } from '../data/properties'
import { usePageMeta } from '../lib/use-page-meta'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const CARDS = [
  {
    title: 'Phone',
    body: PHONE,
    href: `tel:${PHONE.replace(/ /g, '')}`,
    action: 'Call us',
  },
  {
    title: 'WhatsApp',
    body: 'Real humans, replying in minutes',
    href: waLink('Hi, I have a question about a Ritumbhara stay'),
    action: 'Chat with us',
  },
  {
    title: 'Email',
    body: EMAIL,
    href: `mailto:${EMAIL}`,
    action: 'Write to us',
  },
]

export default function Contact() {
  usePageMeta(
    'Contact | Ritumbhara',
    'Reach Ritumbhara for reservations, partnerships, or press — by phone, WhatsApp, or email.',
  )

  return (
    <>
      <PageHero image="jaipur-nahargarh" kicker="Contact" title="Talk to a person, not a queue." compact>
        <p>
          For reservations, book through any property page. For partnerships, press, or general
          questions — reach us below.
        </p>
      </PageHero>

      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group block h-full rounded-3xl border border-linen bg-white p-7 transition hover:border-maroon/40 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">{c.title}</p>
                  <p className="mt-3 font-display text-xl [overflow-wrap:anywhere]">{c.body}</p>
                  <p className="mt-4 text-sm font-semibold text-maroon opacity-70 transition group-hover:opacity-100">
                    {c.action} →
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-charcoal p-8 text-cream">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Destinations</p>
                <p className="mt-2 font-display text-2xl font-light">
                  {DESTINATIONS.map((d) => d.name).join(', ')}
                </p>
                <p className="mt-1 text-sm text-cream/60">
                  Own a property in one of these cities?{' '}
                  <Link to="/partner" className="font-semibold text-gold underline-offset-4 hover:underline">
                    Partner with us
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {DESTINATIONS.map((d) => (
                  <Link
                    key={d.id}
                    to={`/destinations/${d.id}`}
                    className="rounded-full border border-cream/25 px-5 py-2 text-sm font-medium transition hover:border-cream hover:bg-cream/10"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
