import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageMeta } from '../lib/use-page-meta'
import Hero from '../components/Hero'
import Destinations from '../components/Destinations'
import Stays from '../components/Stays'
import Standard from '../components/Standard'
import Experiences from '../components/Experiences'
import Interlude from '../components/Interlude'
import JournalTeaser from '../components/JournalTeaser'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'

export default function Home() {
  usePageMeta(
    'Ritumbhara | India, Thoughtfully Hosted',
    'Hotels, villas, serviced apartments and boutique stays across India, each one managed to the same exacting standard.',
  )
  const { hash } = useLocation()

  // Land on the right section when arriving from another page (/#stays etc.)
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [hash])

  return (
    <>
      <Hero />
      <Destinations />
      <Stays />
      <Standard />
      <Experiences />
      <Interlude />
      <JournalTeaser />
      <Testimonials />
      <Faq />
    </>
  )
}
