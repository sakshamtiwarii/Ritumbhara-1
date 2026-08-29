export type DestinationId = 'jaipur' | 'alwar' | 'sariska' | 'agra'

export interface Property {
  slug: string
  name: string
  destination: Exclude<DestinationId, 'agra'>
  type: 'Studio' | 'Serviced Apartment' | 'Villa'
  /** key into image-manifest.json / public/images */
  image: string
  amenities: string[]
  tagline: string
  /** DEMO nightly base rate in INR — not real pricing */
  baseRate: number
  maxGuests: number
}

export const PROPERTIES: Property[] = [
  {
    slug: 'studio-925',
    name: 'Studio 925',
    destination: 'jaipur',
    type: 'Studio',
    image: 'studio-925',
    amenities: ['King Bed', 'Smart TV', 'Air Conditioning', 'Workspace'],
    tagline: 'A compact, well-appointed studio in the Pink City.',
    baseRate: 2900,
    maxGuests: 2,
  },
  {
    slug: 'studio-711',
    name: 'Studio 711',
    destination: 'jaipur',
    type: 'Studio',
    image: 'studio-711',
    amenities: ['Queen Bed', 'Kitchenette', 'Dining Nook', 'Smart TV'],
    tagline: 'Light-filled studio with a full kitchenette.',
    baseRate: 2600,
    maxGuests: 2,
  },
  {
    slug: 'studio-909',
    name: 'Studio 909',
    destination: 'jaipur',
    type: 'Studio',
    image: 'studio-909',
    amenities: ['Queen Bed', 'Kitchenette', 'Block-print Linen', 'Workspace'],
    tagline: 'Warm woods and hand-blocked textiles, ninth floor.',
    baseRate: 2700,
    maxGuests: 2,
  },
  {
    slug: 'studio-1210',
    name: 'Studio 1210',
    destination: 'jaipur',
    type: 'Studio',
    image: 'studio-1210',
    amenities: ['King Bed', 'Balcony View', 'Kitchenette', 'Dining Table'],
    tagline: 'Twelfth-floor studio with a balcony over the city.',
    baseRate: 3100,
    maxGuests: 3,
  },
  {
    slug: 'studio-1212',
    name: 'Studio 1212',
    destination: 'jaipur',
    type: 'Studio',
    image: 'studio-1212',
    amenities: ['Queen Bed', 'Full Kitchenette', 'Water Purifier', 'Smart TV'],
    tagline: 'The corner studio with the best-equipped kitchen.',
    baseRate: 2800,
    maxGuests: 2,
  },
  {
    slug: 'apartment-813',
    name: 'Apartment 813',
    destination: 'alwar',
    type: 'Serviced Apartment',
    image: 'apartment-813',
    amenities: ['Queen Bed', 'Individually Controlled AC', 'Private Bathroom', 'Housekeeping'],
    tagline: 'A full serviced apartment in the heart of Alwar.',
    baseRate: 3800,
    maxGuests: 4,
  },
  {
    slug: 'studio-502-alwar',
    name: 'Studio 502 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-502-alwar',
    amenities: ['Queen Bed', 'Air Conditioning', 'Private Bathroom', 'Parking'],
    tagline: 'Quiet fifth-floor stay with easy parking below.',
    baseRate: 2100,
    maxGuests: 2,
  },
  {
    slug: 'studio-807-alwar',
    name: 'Studio 807 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-807-alwar',
    amenities: ['King Bed', 'Jaali Wood Screen', 'Smart TV', 'Workspace'],
    tagline: 'Carved wood screens and the warmest room in Alwar.',
    baseRate: 2500,
    maxGuests: 2,
  },
  {
    slug: 'studio-808-alwar',
    name: 'Studio 808 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-808-alwar',
    amenities: ['King Bed', 'Air Conditioning', 'Private Bathroom', 'Kitchenette'],
    tagline: 'The mirror twin of 807, one door down.',
    baseRate: 2500,
    maxGuests: 2,
  },
  {
    slug: 'studio-603-alwar',
    name: 'Studio 603 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-603-alwar',
    amenities: ['Queen Bed', 'Air Conditioning', 'Private Bathroom', 'Kitchenette'],
    tagline: 'Timber-panelled studio with a proper work desk.',
    baseRate: 2300,
    maxGuests: 2,
  },
  {
    slug: 'villa-65-sariska',
    name: 'Villa 65 Sariska',
    destination: 'sariska',
    type: 'Villa',
    image: 'villa-65-sariska',
    amenities: ['Mountain View', 'Private Garden', 'Air Conditioning', 'Safari Access'],
    tagline: 'A forest-edge villa minutes from the tiger reserve.',
    baseRate: 7500,
    maxGuests: 6,
  },
]

export interface Destination {
  id: DestinationId
  name: string
  region: string
  blurb: string
  /** image key, or null when no photography exists yet */
  image: string | null
  open: boolean
  stays: number
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    blurb: "The Pink City, and Ritumbhara's founding destination, with five managed studios.",
    image: 'dest-jaipur',
    open: true,
    stays: 5,
  },
  {
    id: 'alwar',
    name: 'Alwar',
    region: 'Rajasthan',
    blurb: 'A historic district of forts and forest, home to five Ritumbhara serviced stays.',
    image: 'studio-807-alwar',
    open: true,
    stays: 5,
  },
  {
    id: 'sariska',
    name: 'Sariska',
    region: 'Rajasthan',
    blurb: 'Forest-edge stays near Sariska Tiger Reserve, within Alwar district.',
    image: 'villa-65-sariska',
    open: true,
    stays: 1,
  },
  {
    id: 'agra',
    name: 'Agra',
    region: 'Uttar Pradesh',
    blurb: 'Home of the Taj Mahal, the next Ritumbhara destination.',
    image: 'dest-agra',
    open: false,
    stays: 0,
  },
]

export const TESTIMONIALS = [
  {
    quote: 'Best place at really affordable prices and the staff is helpful and studio is really tidy.',
    author: 'Kunal G.',
    place: 'Jaipur',
    source: 'Airbnb review',
  },
  {
    quote: 'Great to spend your weekends with family and friends.',
    author: 'Akshay K.',
    place: 'Alwar',
    source: 'Airbnb review',
  },
  {
    quote: "A wonderful experience, and I'd definitely recommend this place for a peaceful mountain getaway!",
    author: 'Rekha G.',
    place: 'Sariska',
    source: 'Airbnb review',
  },
]

export const STANDARD = [
  { title: 'Guest Experience', body: 'Every stay opens the same way: spotless, stocked, and ready.' },
  { title: 'Cleanliness', body: 'Hotel-grade housekeeping checklists, verified after every turnover.' },
  { title: 'Hospitality', body: 'A named host on WhatsApp, not a call-center queue.' },
  { title: 'Interior Design', body: 'Considered rooms — real wood, block-print textiles, proper lighting.' },
  { title: 'Technology', body: 'Smart TVs, fast Wi-Fi, keyless entry where the building allows.' },
  { title: 'Housekeeping', body: 'Scheduled service on longer stays, on request otherwise.' },
  { title: 'Service', body: 'Airport pickups, early check-ins, and extra beds — just ask.' },
  { title: 'Local Experiences', body: 'Forts, safaris, and food walks arranged by people who live there.' },
  { title: 'Safety', body: 'Verified buildings, CCTV commons, and in-room safes.' },
  { title: 'Communication', body: 'Real humans, replying in minutes, before and during your stay.' },
]

export const EXPERIENCES = [
  {
    title: 'Heritage Walks',
    body: 'Guided journeys through centuries-old forts, havelis, and bazaars.',
    icon: '🏛',
  },
  {
    title: 'Culinary Journeys',
    body: 'From royal Rajasthani thalis to quiet rooftop breakfasts.',
    icon: '🍛',
  },
  {
    title: 'Wellness & Slow Mornings',
    body: 'Quiet courtyards and unhurried mornings, designed for rest.',
    icon: '🌿',
  },
  {
    title: 'Wildlife & Nature',
    body: 'Early-morning safaris at Sariska, steps from your stay.',
    icon: '🐅',
  },
]

export const FAQS = [
  {
    q: 'How do I book a stay with Ritumbhara?',
    a: 'Pick your dates in the booking bar and confirm in a couple of taps — or message us on WhatsApp and a real person will hold the room for you. No OTA fees either way.',
  },
  {
    q: 'Which cities does Ritumbhara currently operate in?',
    a: 'Ritumbhara currently manages properties in Jaipur and Alwar, Rajasthan, including stays near the Sariska Tiger Reserve. Agra, Uttar Pradesh is an upcoming destination.',
  },
  {
    q: 'What types of properties does Ritumbhara manage?',
    a: 'Studios, serviced apartments, and villas today, with hotels, resorts, and additional categories planned as the portfolio expands.',
  },
  {
    q: 'What is the Ritumbhara Standard?',
    a: 'A set of ten operating commitments — from cleanliness to communication — applied identically across every property Ritumbhara manages.',
  },
  {
    q: 'How can I contact Ritumbhara directly?',
    a: 'Call +91 95030 02629, message us on WhatsApp, or write to reservations@ritumbhara.com.',
  },
]

export const PHONE = '+91 95030 02629'
export const WHATSAPP = 'https://wa.me/919503002629'
export const EMAIL = 'reservations@ritumbhara.com'
