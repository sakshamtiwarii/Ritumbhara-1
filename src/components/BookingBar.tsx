import { useState } from 'react'
import { useBooking } from '../lib/booking-context'
import { defaultStay, todayISO, nextDayISO } from '../lib/booking'
import { FIELD } from '../lib/ui'

const DEFAULTS = defaultStay()

export default function BookingBar() {
  const { openBooking } = useBooking()
  const [destination, setDestination] = useState('all')
  const [checkIn, setCheckIn] = useState(DEFAULTS.checkIn)
  const [checkOut, setCheckOut] = useState(DEFAULTS.checkOut)
  const [guests, setGuests] = useState(2)

  const field = `${FIELD} px-3 py-2.5 font-medium [color-scheme:light]`

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        openBooking({ destination, checkIn, checkOut, guests })
      }}
      className="grid grid-cols-2 gap-3 rounded-3xl border border-white/40 bg-cream/95 p-4 shadow-2xl backdrop-blur-lg sm:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto] sm:items-end sm:rounded-full sm:py-3 sm:pl-6 sm:pr-3"
    >
      <label className="col-span-2 block sm:col-span-1">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink/60">
          Destination
        </span>
        <select value={destination} onChange={(e) => setDestination(e.target.value)} className={field}>
          <option value="all">Anywhere</option>
          <option value="jaipur">Jaipur</option>
          <option value="alwar">Alwar</option>
          <option value="sariska">Sariska</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink/60">
          Check-in
        </span>
        <input
          type="date"
          required
          min={todayISO()}
          value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value)
            if (e.target.value >= checkOut) {
              setCheckOut(nextDayISO(e.target.value))
            }
          }}
          className={field}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink/60">
          Check-out
        </span>
        <input
          type="date"
          required
          min={nextDayISO(checkIn)}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={field}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink/60">
          Guests
        </span>
        <select value={guests} onChange={(e) => setGuests(+e.target.value)} className={field}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}{n === 6 ? '+' : ''}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="col-span-2 rounded-full bg-maroon px-7 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-deep sm:col-span-1"
      >
        Check Availability
      </button>
    </form>
  )
}
