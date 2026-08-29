import { BookingProvider } from './lib/booking-context'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Destinations from './components/Destinations'
import Stays from './components/Stays'
import Standard from './components/Standard'
import Experiences from './components/Experiences'
import Interlude from './components/Interlude'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <Hero />
        <Destinations />
        <Stays />
        <Standard />
        <Experiences />
        <Interlude />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <BookingModal />
      <WhatsAppFab />
    </BookingProvider>
  )
}
