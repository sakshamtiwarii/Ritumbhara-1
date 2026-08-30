import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BookingProvider } from './lib/booking-context'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'
import About from './pages/About'
import Journal from './pages/Journal'
import Article from './pages/Article'
import Partner from './pages/Partner'
import Property from './pages/Property'
import Destination from './pages/Destination'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // 'instant' sidesteps the global `scroll-behavior: smooth`, which would
    // otherwise animate the jump to the top on every route change
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<Article />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/properties/:slug" element={<Property />} />
            <Route path="/destinations/:id" element={<Destination />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal />
        <WhatsAppFab />
      </BookingProvider>
    </BrowserRouter>
  )
}
