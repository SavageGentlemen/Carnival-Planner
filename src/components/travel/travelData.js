/**
 * Moy Meets World — Curated Travel Packages Data
 * Designed for lead travel agent Moy (Trinidad & Tobago based)
 */

export const MOY_TRAVEL_PACKAGES = [
  {
    id: 'trinidad-carnival-2027',
    title: 'St Lucia Carnival',
    subtitle: 'The Sweetest Summer Festival',
    country: 'St. Lucia',
    badge: 'Flagship Experience',
    dates: 'July 16th - July 23rd',
    duration: '7 Days ',
    location: 'St. Lucia',
    accentColor: '#e11d48',
    heroImage: '/images/travel/stlucia_hero.jpeg',
    cardImage: '/images/travel/stlucia_card.jpeg',
    status: 'Booking Open',
    spotsTotal: 10,
    spotsRemaining: 6,
    customQuoteOnly: true,
    tagline: 'Enjoy the authenticity of the sweetest summer festival',
    overview: 'St Lucia carnival is one of my favorite Caribbean carnivals outside of Trinidad and Tobago. Every year I attend somehow seems to Trump the year before and I believe everyone should experience this.',
    whenWhere: {
      dates: 'Summer 2027',
      location: 'St Lucia, Caribbean',
      hotel: 'Hotel/Resort',
      securityNote: '24/7 On-Ground Host '
    },
    included: [
      'Round Trip Flights from Trinidad to St Lucia ',
      'Accommodation  (Breakfast Inclusive)  ',
      'Ground Transportation',
      'Carnival Costume Package',
      ' 3 Signature Events ',
      'Carnival Survival Kit'
    ],
    notIncluded: [
      'Discretionary personal spending, tips & optional private excursions',
      ' Meals outside of breakfast or all inclusive events.',
      'Costume Add On (backpack etc)'
    ],
    pricing: {
      deposit: 500,
      currency: 'USD',
      singleOccupancy: null,
      doubleOccupancy: null,
      quadOccupancy: null,
      paymentSchedule: 'Pay $500 USD deposit today to secure your spot. Custom balance schedule provided upon costume and room selection.'
    },
    accommodations: [
      {
        type: 'Single Luxury Suite',
        price: 'Custom Quote on Request',
        occupancy: 'Single (1 King Bed)',
        description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
      },
      {
        type: 'Shared Double Room',
        price: 'Custom Quote on Request',
        occupancy: 'Shared (2 Queen Beds or King for Couples)',
        description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
      }
    ],
    updatedAt: '2026-08-25T16:17:20.127Z'
  },
  {
    id: 'custom-pkg-1787629349617',
    title: 'Thailand 2027',
    subtitle: 'Curated Group Trip',
    country: 'Thailand',
    badge: 'New Experience',
    dates: 'November 11th - November 25th',
    duration: '14 Days',
    location: 'Thailand',
    accentColor: '#0ea5e9',
    heroImage: '/images/travel/thailand_hero.jpeg',
    cardImage: '/images/travel/thailand_card.jpeg',
    status: 'Booking Open',
    spotsTotal: 10,
    spotsRemaining: 8,
    customQuoteOnly: false,
    tagline: 'Experience Thailand in its true essence.',
    overview: "After living in Thailand for longer than I had planned to, I've always had a special connection to this Kingdom. It was only fitting that I curate a group package for those who dream of exploring this gem. I have carefully selected experiences that will truly allow you to fall in love with the Land of Smiles.",
    whenWhere: {
      dates: 'November 2027',
      location: 'Asian Adventure',
      hotel: 'Hotels',
      securityNote: '24/7 On-Ground Host '
    },
    included: [
      'Round Trip Flights from Trinidad to Thailand',
      'Accommodations (Breakfast Inclusive)',
      'Tours, excursions and activities',
      'Ground Transportation',
      'Travel Goodie Bag'
    ],
    notIncluded: [
      'Personal Spending & Discretionary Purchases',
      ' Meals outside of breakfast '
    ],
    pricing: {
      deposit: 0,
      currency: 'USD',
      singleOccupancy: 3500,
      doubleOccupancy: 4999,
      quadOccupancy: null,
      paymentSchedule: 'Flexible installment plans available. Contact Moy for payment schedules.'
    },
    accommodations: [
      {
        type: 'Single Luxury Suite',
        price: '$3,500 USD',
        occupancy: 'Single Occupancy (1 King Bed)',
        description: 'Private luxury suite with ensuite bath and balcony.'
      },
      {
        type: 'Shared Double Room',
        price: '$2,500 USD / person',
        occupancy: 'Double Occupancy (2 Guests)',
        description: 'Spacious shared luxury room for pairs or matched solo travelers.'
      }
    ],
    updatedAt: '2026-08-25T16:16:04.382Z'
  }
];

export const MOY_AGENT_PROFILE = {
  name: 'Moy',
  fullName: 'Moy (Moy Meets World)',
  title: 'Chief Travel Curator',
  location: 'Tobago, Trinidad & Tobago 🇹🇹',
  logoImage: '/images/moymeetsworld_logo.jpg',
  avatar: '/images/travel/moy_headshot.jpeg',
  lifestylePhoto: '/images/travel/moy_lifestyle.jpeg',
  heroArtwork: '/images/travel/moy_lifestyle.jpeg',
  bio: `My group trips are designed for people who want to experience a destination, not simply visit it.

I carefully curate the itinerary, accommodations, activities and experiences to create trips that feel exciting, social and effortless — while still giving you the freedom to enjoy the destination your own way.

From girls’ trips and birthday getaways to Carnival adventures and bucket-list experiences, Moy Meets World brings the planning, the people and the experiences together.

You bring your passport and your people.

I’ll curate the experience. 🌎✨

Moy Meets World — Come see the world with us.`,
  whatsappNumber: '+18687014820',
  whatsappDisplay: '+1 (868) 701-4820',
  email: 'info@moysworld.com',
  instagram: '@moymeetsworld',
  verifiedBadge: 'Certified Travel Specialist',
  premiumPerks: {
    discountPercent: 5, // 5% off package bookings
    dollarSavingsExample: 150,
    vipCostumeDeliveryFree: true,
    champagneAirportTransferFree: true,
    glamKitUpgradeFree: true,
    promoCode: 'PREMIUMSQUAD'
  },
  trinidadBankingInfo: {
    bankName: 'Republic Bank Limited (Trinidad & Tobago)',
    accountName: 'Moy Meets World Travel Ltd',
    accountType: 'TTD Commercial Checking / USD Foreign Account',
    branch: 'Port of Spain Main Branch',
    wipayMerchantId: 'wipay_moy_tt_live',
    stripeEnabled: true
  }
};

export const MOY_FAQS = [
  {
    q: 'How does booking a travel package with Moy work?',
    a: 'Simply select your desired destination package, choose single or shared occupancy, and secure your reservation with a $500 USD deposit. Once your deposit is received, Moy personally contacts you via WhatsApp or Email to confirm detail and formulate a flexibke  payment schedule.'
  },
  {
    q: 'What payment methods are accepted? ',
    a: 'We support multiple secure payment gateways:  Direct Credit/Debit Card via WiPay Caribbean (optimized for Trinidad and regional cardholders in TTD or USD), Direct TT Bank Transfer or Fast Deposit to Republic Bank /  Scotiabank, and PayPal or Wire Transfer for international clients.'
  },
  {
    q: 'What if I am traveling solo? Can you match me with a roommate?',
    a: 'Absolutely. Many people travel solo! If you choose the Shared Double Occupancy package, I will pair you with another vetted solo traveler of the same gender. If you have a friend who is booking separately, simply let me know.'
  },
  {
    q: 'What is the refund and cancellation policy?',
    a: 'The $500 USD initial deposit is non-refundable as it immediately secures limited reservations. Subsequent milestone payments are refundable up to 90 days before the trip departure (less processing fees), or transferable to a future Moy Meets World journey.'
  },
  {
    q: 'Can I customize my package or add private excursions?',
    a: 'Yes! Moy specializes in custom itineraries.  Just let me know what you need and I will make it happen.'
  }
];

export const DEFAULT_SITE_CONTENT = {
  hero: {
    titleLine1: 'TRAVEL IN FULL COLOR',
    titleLine2: 'MOY MEETS WORLD ',
    tagline: 'Curated travel packages, and seamless bespoke journeys curated by Moy!',
    destinationsPill: 'CARIBBEAN • SOUTH AMERICA • ASIA • EUROPE',
    ctaButtonText: 'Explore Curated Escapes',
    whatsappButtonText: 'WhatsApp Moy',
    backgroundImage: '/images/travel/moy_lifestyle.jpeg',
    emblemImage: '/images/moymeetsworld_logo.jpg'
  },
  packagesHeader: {
    kicker: 'CURATED ESCAPES',
    title: 'Destinations & Travel Packages',
    subtitle: 'Journeys crafted for every type of wanderlust!'
  },
  manifesto: {
    title: 'OUR PHILOSOPHY',
    summary: 'Moy Meets World is your gateway to frictionless travel. Based in Trinidad & Tobago, we eliminate all planning stress so you can celebrate life in pure luxury.',
    lines: [
      'We move in rhythm.',
      'We travel for the culture.',
      '',
      'We honor the places and people that welcome us.',
      'We immerse, not consume.',
      'We show up as family, not  just tourists.'
    ]
  },
  experienceBanner: {
    badge: 'EXPERIENCE THE UNFORGETTABLE',
    title: 'MORE ADVENTURE.MORE CULTURE. MORE LIFE.',
    description: 'We curate every moment with intention and elegance.',
    buttonText: 'Browse All Packages',
    buttonLink: '#experiences',
    backgroundImage: '/images/travel/moy_lifestyle.jpeg'
  },
  aboutMoy: {
    fullName: 'Moy (Moy Meets World)',
    title: 'Chief Travel Curator',
    location: 'Tobago, Trinidad & Tobago 🇹🇹',
    verifiedBadge: 'Certified Travel Specialist',
    photo: '/images/travel/moy_headshot.jpeg',
    hostPhoto: '/images/travel/moy_headshot.jpeg',
    bio: `My group trips are designed for people who want to experience a destination, not simply visit it.

I carefully curate the itinerary, accommodations, activities and experiences to create trips that feel exciting, social and effortless — while still giving you the freedom to enjoy the destination your own way.

From girls’ trips and birthday getaways to Carnival adventures and bucket-list experiences, Moy Meets World brings the planning, the people and the experiences together.

You bring your passport and your people.

I’ll curate the experience. 🌎✨

Moy Meets World — Come see the world with us.`,
    whatsappNumber: '+18687014820',
    email: 'info@moysworld.com',
    instagram: '@moymeetsworld'
  },
  paymentSection: {
    heading: 'Trinidad Gateway & Flexible Installments !!',
    subheading: 'Managed directly out of Trinidad & Tobago with direct credit card processing, local TT bank transfer, and transparent milestone schedules.',
    card1Title: '$500 Hold Spot Deposit',
    card1Desc: 'Secure limited costume sections and luxury villa rooms today with a simple $500 USD deposit. Flexible payment plans spread across months.',
    card2Title: 'WiPay & TT Direct Banking',
    card2Desc: 'Pay via WiPay Caribbean card checkout (TTD / USD), Republic Bank wire, or Stripe international checkout with zero hidden currency fees.',
    card3Title: 'White-Glove Concierge',
    card3Desc: 'Direct 1-on-1 contact with Moy from the day you book until the last fete of your journey. Hand-delivered costumes & 24/7 security.'
  },
  faqsHeader: {
    kicker: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Everything You Need To Know',
    subtitle: 'Got questions about costume fittings, villas, or payment plans? Moy has you covered.'
  },
  faqs: [
    {
      q: 'How does booking a travel package with Moy work?',
      a: 'Simply select your desired destination package, choose single or shared occupancy, and secure your reservation with a $500 USD deposit. Once your deposit is received, Moy personally contacts you via WhatsApp or Email to confirm detail and formulate a flexibke  payment schedule.'
    },
    {
      q: 'What payment methods are accepted? ',
      a: 'We support multiple secure payment gateways:  Direct Credit/Debit Card via WiPay Caribbean (optimized for Trinidad and regional cardholders in TTD or USD), Direct TT Bank Transfer or Fast Deposit to Republic Bank /  Scotiabank, and PayPal or Wire Transfer for international clients.'
    },
    {
      q: 'What if I am traveling solo? Can you match me with a roommate?',
      a: 'Absolutely. Many people travel solo! If you choose the Shared Double Occupancy package, I will pair you with another vetted solo traveler of the same gender. If you have a friend who is booking separately, simply let me know.'
    },
    {
      q: 'What is the refund and cancellation policy?',
      a: 'The $500 USD initial deposit is non-refundable as it immediately secures limited reservations. Subsequent milestone payments are refundable up to 90 days before the trip departure (less processing fees), or transferable to a future Moy Meets World journey.'
    },
    {
      q: 'Can I customize my package or add private excursions?',
      a: 'Yes! Moy specializes in custom itineraries.  Just let me know what you need and I will make it happen.'
    }
  ],
  footer: {
    brandTagline: 'Curated Travel by Moy • Trinidad & Tobago',
    copyright: '© 2027 Moy Meets World & Carnival Planner. All rights reserved.'
  }
};
