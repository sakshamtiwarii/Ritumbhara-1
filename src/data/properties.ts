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
  /** Longer description from the live property page */
  description: string
  /** Real Hotel Spider reservation page for this room */
  bookingUrl: string
  /** DEMO nightly base rate in INR — not real pricing */
  baseRate: number
  maxGuests: number
}

const SPIDER = 'https://reservations.hotel-spider.com/03u69e20bdb541a7/guestroom/'

export const PROPERTIES: Property[] = [
  {
    slug: 'studio-925',
    name: 'Studio 925',
    destination: 'jaipur',
    type: 'Studio',
    image: 'studio-925',
    amenities: ['King Bed', 'Smart TV', 'Air Conditioning', 'Workspace'],
    tagline: 'A compact, well-appointed studio in the Pink City.',
    description: 'A compact, well-appointed studio in Jaipur.',
    bookingUrl: SPIDER + '03u69e76a5fdc6b9',
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
    description: 'A comfortable Jaipur studio suited to short and extended stays.',
    bookingUrl: SPIDER + '03u69e76aad7f1e5',
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
    description: 'A well-located Jaipur studio.',
    bookingUrl: SPIDER + '03u69e76b0ca1fb0',
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
    description: 'A Jaipur studio managed to the Ritumbhara Standard.',
    bookingUrl: SPIDER + '03u69eb353651b26',
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
    description: 'A Jaipur studio managed to the Ritumbhara Standard.',
    bookingUrl: SPIDER + '03u69eb3760dfbec',
    baseRate: 2800,
    maxGuests: 2,
  },
  {
    slug: 'apartment-813',
    name: 'Apartment 813',
    destination: 'alwar',
    type: 'Serviced Apartment',
    image: 'apartment-813',
    amenities: ['Queen Bed', 'Air Conditioning (Individually Controlled)', 'Private Bathroom', 'Balcony', 'Microwave', 'Plates & Bowls', 'Ceiling Fan', 'TV', 'Safe'],
    tagline: 'A full serviced apartment in the heart of Alwar.',
    description: 'A spacious three-bedroom serviced apartment in Alwar, suited to longer stays and small groups.',
    bookingUrl: SPIDER + '03u6a51d29f9cdb9',
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
    description: 'A compact Alwar studio, accommodates up to 2 guests.',
    bookingUrl: SPIDER + '03u6a350e6c634a6',
    baseRate: 2100,
    maxGuests: 2,
  },
  {
    slug: 'studio-807-alwar',
    name: 'Studio 807 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-807-alwar',
    amenities: ['Air Conditioning', 'Private Bathroom', 'Kitchenette', 'Refrigerator', 'Microwave', 'TV', 'Hairdryer', 'Desk', 'Bidet'],
    tagline: 'Carved wood screens and the warmest room in Alwar.',
    description: 'A well-equipped Alwar studio with a full kitchenette.',
    bookingUrl: SPIDER + '03u6a5dcaa9e1652',
    baseRate: 2500,
    maxGuests: 2,
  },
  {
    slug: 'studio-808-alwar',
    name: 'Studio 808 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-808-alwar',
    amenities: ['Air Conditioning', 'Private Bathroom', 'Kitchenette', 'Refrigerator', 'Microwave', 'TV', 'Hairdryer', 'Desk', 'Bidet'],
    tagline: 'The mirror twin of 807, one door down.',
    description: 'A well-equipped Alwar studio, sister unit to Studio 807.',
    bookingUrl: SPIDER + '03u6a5dcad54c09f',
    baseRate: 2500,
    maxGuests: 2,
  },
  {
    slug: 'studio-603-alwar',
    name: 'Studio 603 Alwar',
    destination: 'alwar',
    type: 'Studio',
    image: 'studio-603-alwar',
    amenities: ['Air Conditioning', 'Private Bathroom', 'Kitchenette', 'Refrigerator', 'Microwave', 'TV', 'Hairdryer', 'Desk', 'Balcony'],
    tagline: 'Timber-panelled studio with a proper work desk.',
    description: 'A chic, couple-friendly Alwar studio with fast wifi and a Juliet balcony.',
    bookingUrl: SPIDER + '03u69e76a80a033e',
    baseRate: 2300,
    maxGuests: 2,
  },
  {
    slug: 'villa-65-sariska',
    name: 'Villa 65 Sariska',
    destination: 'sariska',
    type: 'Villa',
    image: 'villa-65-sariska',
    amenities: ['Mountain View', 'Air Conditioning', 'Private Bathroom', 'Kitchen', 'Kitchenette', 'Widescreen TV', 'Ironing Board', 'Safe', 'Queen Bed'],
    tagline: 'A forest-edge villa minutes from the tiger reserve.',
    description: 'A six-guest villa near Sariska, with a mountain view and full kitchen.',
    bookingUrl: SPIDER + '03u6a2269dc57865',
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
  /** derived from PROPERTIES below — never hand-maintained */
  stays: number
  thingsToDo: { title: string; body: string }[]
  gettingAround: string
}

const DESTINATION_DATA: Omit<Destination, 'stays'>[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    blurb: "The Pink City, and Ritumbhara's founding destination, with five managed studios.",
    image: 'dest-jaipur',
    open: true,
    thingsToDo: [
      { title: 'Hawa Mahal & City Palace', body: "The Pink City's landmark facade and the royal complex beside it." },
      { title: 'Amber Fort', body: 'The hilltop fort above Maota Lake, best in late-afternoon light.' },
      { title: 'Jal Mahal', body: 'The water palace on Man Sagar Lake, a short drive from the old city.' },
    ],
    gettingAround: 'Served by Jaipur International Airport and Jaipur Junction railway station.',
  },
  {
    id: 'alwar',
    name: 'Alwar',
    region: 'Rajasthan',
    blurb: 'A historic district of forts and forest, home to five Ritumbhara serviced stays.',
    image: 'studio-807-alwar',
    open: true,
    thingsToDo: [
      { title: 'Bala Qila & City Palace', body: "The fort and palace complex that defines Alwar's skyline." },
      { title: 'Siliserh Lake', body: 'A quiet lakeside spot just outside the city.' },
      { title: 'Sariska Tiger Reserve', body: 'A well-known tiger reserve within the district.' },
    ],
    gettingAround: 'Alwar Junction railway station; National Highway links to Jaipur and Delhi.',
  },
  {
    id: 'sariska',
    name: 'Sariska',
    region: 'Rajasthan',
    blurb: 'Forest-edge stays near Sariska Tiger Reserve, within Alwar district.',
    image: 'villa-65-sariska',
    open: true,
    thingsToDo: [
      { title: 'Sariska Tiger Reserve', body: "Safari drives through one of India's prominent tiger reserves." },
      { title: 'Siliserh Lake', body: 'A lakeside stop on the road between Alwar and the reserve.' },
    ],
    gettingAround: 'Best reached by road via Alwar.',
  },
  {
    id: 'agra',
    name: 'Agra',
    region: 'Uttar Pradesh',
    blurb: 'Home of the Taj Mahal, the next Ritumbhara destination.',
    image: 'dest-agra',
    open: false,
    thingsToDo: [
      { title: 'Taj Mahal', body: 'The white-marble mausoleum, best at sunrise from the east gate.' },
      { title: 'Agra Fort', body: 'The red-sandstone Mughal fort overlooking the Yamuna.' },
    ],
    gettingAround: 'Served by Agra Cantt railway station and the Yamuna Expressway from Delhi.',
  },
]

export const DESTINATIONS: Destination[] = DESTINATION_DATA.map((d) => ({
  ...d,
  stays: PROPERTIES.filter((p) => p.destination === d.id).length,
}))

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

/** WhatsApp chat link with a pre-filled message. */
export const waLink = (message: string) => `${WHATSAPP}?text=${encodeURIComponent(message)}`

/** Display name for a destination id ('jaipur' → 'Jaipur'). */
export const destinationName = (id: string) => DESTINATIONS.find((d) => d.id === id)?.name ?? id

/** The guest quote for a destination, if we have one. */
export const testimonialFor = (destinationId: string) =>
  TESTIMONIALS.find((t) => t.place.toLowerCase() === destinationId)
