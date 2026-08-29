/**
 * DEMO booking engine.
 *
 * Availability and pricing here are deterministic pseudo-data derived from
 * hashing property + date, so the UI behaves like a live booking flow without
 * touching a real inventory system. Swap these three functions for API calls
 * (e.g. the Hotel Spider endpoints) to go live.
 */
import { PROPERTIES, type Property } from '../data/properties'

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function isAvailable(slug: string, dateISO: string): boolean {
  // ~86% of property-nights come back available
  return hash(`${slug}:${dateISO}`) % 7 !== 0
}

export function nightlyRate(property: Property, date: Date): number {
  const day = date.getDay()
  const weekend = day === 5 || day === 6 // Fri, Sat
  const seasonal = 1 + ((hash(`${property.slug}:${date.getMonth()}`) % 11) - 5) / 100
  return Math.round((property.baseRate * (weekend ? 1.25 : 1) * seasonal) / 10) * 10
}

export interface Quote {
  property: Property
  nights: { date: string; rate: number }[]
  subtotal: number
  longStayDiscount: number
  taxes: number
  total: number
  available: boolean
}

export function eachNight(checkIn: string, checkOut: string): Date[] {
  const out: Date[] = []
  const d = new Date(checkIn + 'T00:00:00')
  const end = new Date(checkOut + 'T00:00:00')
  while (d < end) {
    out.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

export function getQuote(property: Property, checkIn: string, checkOut: string): Quote {
  const nights = eachNight(checkIn, checkOut).map((d) => ({
    date: toISO(d),
    rate: nightlyRate(property, d),
  }))
  const available = nights.length > 0 && nights.every((n) => isAvailable(property.slug, n.date))
  const subtotal = nights.reduce((s, n) => s + n.rate, 0)
  const longStayDiscount = nights.length >= 4 ? Math.round(subtotal * 0.1) : 0
  const taxes = Math.round((subtotal - longStayDiscount) * 0.12)
  return {
    property,
    nights,
    subtotal,
    longStayDiscount,
    taxes,
    total: subtotal - longStayDiscount + taxes,
    available,
  }
}

export function searchStays(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests: number,
): Quote[] {
  return PROPERTIES.filter(
    (p) => (destination === 'all' || p.destination === destination) && p.maxGuests >= guests,
  ).map((p) => getQuote(p, checkIn, checkOut))
}

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

export function todayISO(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return toISO(d)
}

export function fmtDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}
