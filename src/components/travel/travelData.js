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
    heroImage: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787630888899_7f8c93d1-d6d0-4da2-9c29-1458d7d85ee4.jpeg?alt=media&token=15aae2de-1db4-4e7e-9ee4-333a6fbfd7fa',
    cardImage: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787630878374_7f8c93d1-d6d0-4da2-9c29-1458d7d85ee4.jpeg?alt=media&token=2e37d1fa-ffc5-47a9-b3d6-fb5cf12ea263',
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
    heroImage: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787630264162_WhatsApp_Image_2026-08-24_at_11.55.45_PM.jpeg?alt=media&token=a1f33371-84fd-4d9f-8c24-f79912f1b72f',
    cardImage: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787630604386_4f8c36a3-8a86-43f9-8a7d-406bdbc91979.jpeg?alt=media&token=5fe7ed79-d246-4cb8-9b2c-51ca335991e6',
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
  avatar: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787632241831_ce0a511f-89ef-44c5-a7e2-3179b48b206f.jpeg?alt=media&token=17e43f4c-fb77-4f5a-80eb-ec12734e1a90',
  lifestylePhoto: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787674458258_WhatsApp_Image_2026-08-25_at_12.11.21_PM.jpeg?alt=media&token=24f51499-64cb-494d-a539-b833ca197d7a',
  heroArtwork: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787674458258_WhatsApp_Image_2026-08-25_at_12.11.21_PM.jpeg?alt=media&token=24f51499-64cb-494d-a539-b833ca197d7a',
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
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787674458258_WhatsApp_Image_2026-08-25_at_12.11.21_PM.jpeg?alt=media&token=24f51499-64cb-494d-a539-b833ca197d7a',
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
    backgroundImage: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787674458258_WhatsApp_Image_2026-08-25_at_12.11.21_PM.jpeg?alt=media&token=24f51499-64cb-494d-a539-b833ca197d7a'
  },
  aboutMoy: {
    fullName: 'Moy (Moy Meets World)',
    title: 'Chief Travel Curator',
    location: 'Tobago, Trinidad & Tobago 🇹🇹',
    verifiedBadge: 'Certified Travel Specialist',
    photo: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787632241831_ce0a511f-89ef-44c5-a7e2-3179b48b206f.jpeg?alt=media&token=17e43f4c-fb77-4f5a-80eb-ec12734e1a90',
    hostPhoto: 'https://firebasestorage.googleapis.com/v0/b/carnival-planner.firebasestorage.app/o/travel_assets%2F1787632241831_ce0a511f-89ef-44c5-a7e2-3179b48b206f.jpeg?alt=media&token=17e43f4c-fb77-4f5a-80eb-ec12734e1a90',
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
