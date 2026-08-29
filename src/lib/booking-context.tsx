import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { todayISO } from './booking'

export interface BookingRequest {
  destination: string // 'all' | DestinationId
  checkIn: string
  checkOut: string
  guests: number
  /** jump straight to one property's quote */
  propertySlug?: string
}

interface BookingContextValue {
  request: BookingRequest | null
  openBooking: (req: Partial<BookingRequest>) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<BookingRequest | null>(null)

  const openBooking = useCallback((req: Partial<BookingRequest>) => {
    setRequest({
      destination: req.destination ?? 'all',
      checkIn: req.checkIn ?? todayISO(7),
      checkOut: req.checkOut ?? todayISO(9),
      guests: req.guests ?? 2,
      propertySlug: req.propertySlug,
    })
  }, [])

  const closeBooking = useCallback(() => setRequest(null), [])

  return (
    <BookingContext.Provider value={{ request, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
