/**
 * App-wide booking state: `openBooking(...)` from anywhere (nav, booking bar,
 * property cards) sets the active request, which mounts <BookingModal>;
 * `closeBooking()` clears it. Missing fields fall back to sensible defaults.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { defaultStay } from './booking'

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
    const dates = defaultStay()
    setRequest({
      destination: req.destination ?? 'all',
      checkIn: req.checkIn ?? dates.checkIn,
      checkOut: req.checkOut ?? dates.checkOut,
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

// oxlint-disable-next-line react/only-export-components -- the hook belongs beside its provider
export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}
