import { EXPERIENCES } from '../data/properties'
import Img from './Img'
import Reveal from './Reveal'

export default function Experiences() {
  return (
    <section id="experiences" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Img name="agra-taj-arch" alt="The Taj Mahal seen through a sandstone archway" sizes="(min-width:1024px) 25vw, 50vw" className="h-72 rounded-3xl" />
              <Img name="jaipur-nahargarh" alt="Nahargarh Fort walls above Jaipur at sunset" sizes="(min-width:1024px) 25vw, 50vw" className="mt-10 h-72 rounded-3xl" />
              <Img name="jaipur-amber-fort" alt="Amber Fort above Maota Lake" sizes="(min-width:1024px) 25vw, 50vw" className="h-52 rounded-3xl" />
              <Img name="villa-65-sariska" alt="The gardens at Villa 65 Sariska" sizes="(min-width:1024px) 25vw, 50vw" className="mt-10 h-52 rounded-3xl" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon">Experiences</p>
              <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
                A stay is shaped by what surrounds it.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6">
              {EXPERIENCES.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.08} y={20}>
                  <div className="flex gap-4 rounded-2xl border border-linen bg-white p-5 transition hover:border-maroon/30 hover:shadow-md">
                    <span className="text-2xl" aria-hidden>{e.icon}</span>
                    <div>
                      <h3 className="font-semibold">{e.title}</h3>
                      <p className="mt-1 text-sm text-ink/60">{e.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
