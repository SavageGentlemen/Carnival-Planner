/**
 * Moy Meets World — Curated Travel Packages Data
 * Designed for lead travel agent Moy (Trinidad & Tobago based)
 */

export const MOY_TRAVEL_PACKAGES = [
  {
    id: 'trinidad-carnival-2027',
    title: 'Trinidad Carnival',
    subtitle: 'The Ultimate Mas Experience',
    country: 'Trinidad & Tobago',
    badge: 'Flagship Experience',
    dates: 'February 5 – 11, 2027',
    duration: '7 Days / 6 Nights',
    location: 'Port of Spain, Trinidad',
    heroImage: '/images/carnival/trinidad.jpg',
    cardImage: '/images/carnival/trinidad.jpg',
    accentColor: '#e11d48',
    status: 'Booking Open',
    spotsTotal: 24,
    spotsRemaining: 9,
    tagline: 'Immerse in the Mother of all Carnivals with VIP road registration, luxury villa living, and all-inclusive fetes.',
    overview: 'Experience Trinidad Carnival in unrivaled comfort and style. Curated directly by Moy, this premier package eliminates all carnival planning friction: your premium band costume is secured and custom-fitted, luxury private villa accommodations are reserved in Port of Spain, chauffeur shuttles transport you to the hottest fetes, and your J\'ouvert & carnival Monday/Tuesday road experience is fully managed 24/7.',
    whenWhere: {
      dates: 'Friday, Feb 5 to Thursday, Feb 11, 2027',
      location: 'Port of Spain & Western Peninsula, Trinidad',
      hotel: 'Luxury Private Villa / Hyatt Regency VIP Suites'
    },
    included: [
      '6 Nights in Luxury Villa or 5-Star Hotel Accommodations',
      'VIP Costume Registration with Tribe / YUMA / Lost Tribe / Bliss (Frontline or Backline)',
      'Personal Costume Fitting, Steaming & Concierge Pickup',
      'Tickets to 4 Top-Tier Curated Fetes (e.g. Scorch, Caesar\'s Army, Vale Vibe, Soaka)',
      'All-Inclusive J\'ouvert Package (Paint, Mud, Drinks Truck & Security)',
      'Dedicated Chauffeur Airport & Fete Shuttles (Private A/C Transport)',
      'Daily Caribbean Gourmet Breakfast & Carnival Cool-Down Brunches',
      'Masquerader Survival Kit (Hydration pack, carnival essentials, branded apparel)',
      '24/7 On-Ground Concierge & Road Security Support by Moy & Team'
    ],
    notIncluded: [
      'International roundtrip flights to Piarco International Airport (POS)',
      'Discretionary personal spending, tips & optional private excursions',
      'Travel & medical insurance (mandatory for all travelers)'
    ],
    pricing: {
      deposit: 500,
      singleOccupancy: 3850,
      doubleOccupancy: 2750,
      quadOccupancy: 2250,
      currency: 'USD',
      paymentSchedule: 'Pay $500 USD deposit today to secure your spot. 50% balance due by September 15, 2026. Final balance due December 1, 2026.'
    },
    accommodations: [
      {
        type: 'Single Luxury Suite',
        price: '$3,850 USD',
        occupancy: 'Single (1 King Bed)',
        description: 'Private oceanfront / hillside luxury suite with ensuite bathroom, balcony, high-speed WiFi, espresso bar, and personalized concierge.'
      },
      {
        type: 'Shared Double Room',
        price: '$2,750 USD / person',
        occupancy: 'Shared (2 Queen Beds or King for Couples)',
        description: 'Spacious shared luxury room for pairs or solo masqueraders matched with a vetted squad member of the same gender.'
      }
    ]
  },
  {
    id: 'barbados-crop-over-2027',
    title: 'Barbados Crop Over',
    subtitle: 'Grand Kadooment & Island Luxe',
    country: 'Barbados',
    badge: 'Summer Sweetness',
    dates: 'July 29 – August 4, 2027',
    duration: '7 Days / 6 Nights',
    location: 'St. Michael & Christ Church, Barbados',
    heroImage: '/images/carnival/barbados.jpg',
    cardImage: '/images/carnival/barbados.jpg',
    accentColor: '#f59e0b',
    status: 'Booking Open',
    spotsTotal: 20,
    spotsRemaining: 6,
    tagline: 'The Sweetest Summer Festival meets platinum-tier catamaran cruises and breathtaking Bajan beach vibes.',
    overview: 'Crop Over in Barbados is pure joy. From sunrise breakfast parties at pristine beaches to the euphoria of Grand Kadooment day on the highway, Moy Meets World brings you an effortless, premium island escape with luxury beachfront suites, premier band costume packages, and sunset catamaran soirees.',
    whenWhere: {
      dates: 'Thursday, July 29 to Wednesday, Aug 4, 2027',
      location: 'Christ Church & West Coast, Barbados',
      hotel: 'Beachfront 4-Star Resort / Private Ocean Villa'
    },
    included: [
      '6 Nights in Oceanfront Resort or Luxury Island Villa',
      'Grand Kadooment Mas Costume with Zulu International / Aura / Krave',
      'Foreday Morning J\'ouvert Package',
      'Tickets to 4 Essential Fetes (e.g. Bliss, Lifted, Native, Roast)',
      'Private 5-Hour VIP Catamaran Cruise with Open Bar & Snorkeling with Turtles',
      'Roundtrip Airport & Event Transfers in Private A/C Shuttles',
      'Daily Breakfast & Signature Island Welcome Dinner',
      'Masquerader Glam Bag & Sun Protection Kit',
      'On-Ground Host Guidance by Moy'
    ],
    notIncluded: [
      'Roundtrip flights to Grantley Adams International Airport (BGI)',
      'Lunches & dinners not specified in itinerary',
      'Personal water sports & discretionary tips'
    ],
    pricing: {
      deposit: 500,
      singleOccupancy: 3450,
      doubleOccupancy: 2450,
      quadOccupancy: 2050,
      currency: 'USD',
      paymentSchedule: 'Pay $500 USD deposit today. 50% milestone due by February 15, 2027. Final balance due May 15, 2027.'
    },
    accommodations: [
      {
        type: 'Oceanfront King Deluxe',
        price: '$3,450 USD',
        occupancy: 'Single Occupancy',
        description: 'Direct views of turquoise Caribbean waters, private patio, king bedding, and luxury bath amenities.'
      },
      {
        type: 'Oceanview Shared Double',
        price: '$2,450 USD / person',
        occupancy: 'Double Occupancy (2 Beds)',
        description: 'Beautiful tropical room with twin or queen beds, pool/beach access, and modern island design.'
      }
    ]
  },
  {
    id: 'greece-mediterranean-escape-2026',
    title: 'Greece & The Cyclades',
    subtitle: 'Aegean Island & Cultural Fusion',
    country: 'Greece',
    badge: 'Luxury Cultural Retreat',
    dates: 'August 18 – 25, 2026',
    duration: '8 Days / 7 Nights',
    location: 'Amorgos & Athens, Greece',
    heroImage: '/images/carnival/hero_banner.jpg',
    cardImage: '/images/carnival/hero_banner.jpg',
    accentColor: '#0ea5e9',
    status: 'Limited Spots',
    spotsTotal: 16,
    spotsRemaining: 4,
    tagline: 'Where ancient mythology meets turquoise sea relaxation, curated gastronomy, and sunset soirees.',
    overview: 'A breathtaking 8-day luxury retreat on the island of Amorgos, Greece, at a 5-star spa resort. Indulge in fresh Mediterranean cuisine, seaside yacht tours, ancient monastery visits, and intimate sunset gatherings crafted for the discerning Caribbean & global traveler.',
    whenWhere: {
      dates: 'Tuesday, Aug 18 to Tuesday, Aug 25, 2026',
      location: 'Amorgos Island & Cyclades Archipelago, Greece',
      hotel: '5-Star Aegialis Hotel & Thalassotherapy Spa'
    },
    included: [
      '7 Nights in 5-Star Luxury Sea-View Resort',
      'Daily Mediterranean Gourmet Breakfast & Fine Dinners',
      'Guided Island Excursions: Panagia Chozoviotissa Monastery & Ancient Chora',
      'Southern Island Hidden Beaches & Shipwreck Boat Tour',
      'Free Use of Thalassotherapy Spa, Sauna, Hammam & Saltwater Heated Pool',
      'One Complimentary 30-Minute Relaxing Spa Massage + 15% Treatment Discount',
      'Port to Resort Private Shuttle Transfers in Amorgos',
      'Curated Welcome Gift & Greek Wine Tasting Experience'
    ],
    notIncluded: [
      'Flight to Athens International Airport (ATH)',
      'Ferry tickets from Piraeus/Rafina port to Amorgos',
      'Lunches and personal beverages'
    ],
    pricing: {
      deposit: 500,
      singleOccupancy: 3800,
      doubleOccupancy: 2600,
      quadOccupancy: null,
      currency: 'USD',
      paymentSchedule: '$500 USD non-refundable deposit holds spot. Balance due 60 days prior to departure.'
    },
    accommodations: [
      {
        type: 'Oceanfront Single Suite',
        price: '$3,800 USD',
        occupancy: 'Single Occupancy',
        description: 'Unobstructed 180° Aegean sea views, private veranda, espresso machine, handmade iron king bed.'
      },
      {
        type: 'Oceanfront Shared Double',
        price: '$2,600 USD / person',
        occupancy: 'Double Occupancy (2 Guests)',
        description: 'Cycladic minimalist design with twin or king bedding, luxury robes, slippers, and terrace.'
      }
    ]
  },
  {
    id: 'jamaica-carnival-2027',
    title: 'Jamaica Carnival',
    subtitle: 'Road Energy & Blue Mountain Luxe',
    country: 'Jamaica',
    badge: 'Pure High Energy',
    dates: 'April 7 – 13, 2027',
    duration: '7 Days / 6 Nights',
    location: 'Kingston & Ocho Rios, Jamaica',
    heroImage: '/images/carnival/nottinghill.jpg',
    cardImage: '/images/carnival/nottinghill.jpg',
    accentColor: '#10b981',
    status: 'Booking Open',
    spotsTotal: 20,
    spotsRemaining: 8,
    tagline: 'The pulse of Kingston road march, Frenchmen VIP fetes, and tranquil Blue Mountain coffee retreats.',
    overview: 'Experience the explosive energy of Jamaica Carnival in Kingston paired with private villa relaxation. Jump with Xodus or YardMas, attend the most exclusive breakfast and rum fetes, and take a breathtaking excursion to the Blue Mountains and Dunn\'s River Falls.',
    whenWhere: {
      dates: 'Wednesday, April 7 to Tuesday, April 13, 2027',
      location: 'Kingston & Saint Andrew, Jamaica',
      hotel: 'AC Hotel by Marriott Kingston / Private Luxury Gated Villa'
    },
    included: [
      '6 Nights in 4-Star Modern Hotel or Gated Villa in Kingston',
      'Carnival Sunday Road March Costume (Xodus / YardMas)',
      'Tickets to 3 Premier Fetes (Frenchmen, Sunrise Breakfast, Duck Work)',
      'Sunken Island / Maiden Cay VIP Boat Ride',
      'Blue Mountain Coffee Estate & Culinary Day Tour',
      'Private Chauffeur Airport & Fete Shuttles',
      'Daily Island Breakfast & Welcome Reggae Rum Tasting',
      'Masquerader Goodie Bag & 24/7 Security Escort'
    ],
    notIncluded: [
      'Flights to Norman Manley International Airport (KIN)',
      'Personal shopping & optional activities'
    ],
    pricing: {
      deposit: 500,
      singleOccupancy: 3200,
      doubleOccupancy: 2350,
      quadOccupancy: 1950,
      currency: 'USD',
      paymentSchedule: '$500 USD deposit holds your spot. Remainder split into 2 equal milestone payments.'
    },
    accommodations: [
      {
        type: 'King Deluxe City View',
        price: '$3,200 USD',
        occupancy: 'Single Occupancy',
        description: 'Modern luxury suite in the heart of New Kingston with floor-to-ceiling windows and pool access.'
      },
      {
        type: 'Double Queen Shared Suite',
        price: '$2,350 USD / person',
        occupancy: 'Double Occupancy (2 Guests)',
        description: 'Two plush queen beds, workspace, fast WiFi, and spacious ensuite bath.'
      }
    ]
  },
  {
    id: 'brazil-rio-carnaval-2027',
    title: 'Rio de Janeiro Carnaval',
    subtitle: 'Sambadrome & Carioca Marvels',
    country: 'Brazil',
    badge: 'Coming Soon',
    dates: 'February 2027 (TBA)',
    duration: '8 Days / 7 Nights',
    location: 'Rio de Janeiro, Brazil',
    heroImage: '/images/carnival/costume_gold.jpg',
    cardImage: '/images/carnival/costume_gold.jpg',
    accentColor: '#eab308',
    status: 'Waitlist Open',
    spotsTotal: 18,
    spotsRemaining: 18,
    tagline: 'The spectacle of the Sambadrome, beachside blocos in Ipanema, and breathtaking Christ the Redeemer sunsets.',
    overview: 'Join Moy for an unforgettable Carnaval journey in Brazil. Front-row Sambadrome box seats, local street bloco immersion, Christ the Redeemer & Sugarloaf mountain excursions, and beachside caipirinhas in Copacabana.',
    whenWhere: {
      dates: 'February 2027 (Exact Dates TBA)',
      location: 'Copacabana & Ipanema, Rio de Janeiro',
      hotel: 'Oceanfront Copacabana 5-Star Hotel'
    },
    included: [
      '7 Nights at Copacabana Oceanfront Hotel',
      'VIP Camarotes / Front-Row Sambadrome Tickets & Transport',
      'Guided Private Bloco Street Party Tours',
      'Christ the Redeemer & Sugarloaf Private Helicopter/Van Excursion',
      'Daily Brazilian Buffet Breakfast',
      'Private Airport Transfers & English/Portuguese Concierge Guide'
    ],
    notIncluded: [
      'International flights to Galeão International Airport (GIG)',
      'Brazilian Visa / Entry fees (if applicable)'
    ],
    pricing: {
      deposit: 500,
      singleOccupancy: 4200,
      doubleOccupancy: 2950,
      quadOccupancy: null,
      currency: 'USD',
      paymentSchedule: 'Join the priority waitlist now for early bird access and first costume choice.'
    },
    accommodations: [
      {
        type: 'Copacabana Ocean View Suite',
        price: '$4,200 USD',
        occupancy: 'Single Occupancy',
        description: 'Balcony overlooking iconic Copacabana beach, marble bath, luxury spa amenities.'
      },
      {
        type: 'Copacabana Shared Twin/Double',
        price: '$2,950 USD / person',
        occupancy: 'Double Occupancy',
        description: 'Modern beachside room for two with full hotel amenities and rooftop pool access.'
      }
    ]
  }
];

export const MOY_AGENT_PROFILE = {
  name: 'Moy',
  fullName: 'Moy (Moy Meets World)',
  title: 'Chief Travel Curator & Carnival Connoisseur',
  location: 'Port of Spain, Trinidad & Tobago 🇹🇹',
  logoImage: '/images/moymeetsworld_logo.jpg',
  avatar: '/images/moymeetsworld_logo.jpg',
  heroArtwork: '/images/moymeetsworld_logo.jpg',
  bio: 'Moy is a passionate travel architect and Caribbean carnival insider based in Trinidad & Tobago. Having experienced carnivals and cultural celebrations worldwide, Moy crafts bespoke, frictionless journeys that combine insider band access, premium accommodations, and genuine cultural immersion. From hand-delivering your costume to reserving VIP cabanas at the hottest fetes, Moy ensures you experience the culture with elegance and effortless ease.',
  whatsappNumber: '+18687000000',
  whatsappDisplay: '+1 (868) 700-0000',
  email: 'info@moymeetsworld.com',
  instagram: '@moymeetsworld',
  verifiedBadge: 'Verified Caribbean Travel Specialist',
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
    a: 'Simply select your desired destination package, choose single or shared occupancy, and secure your reservation with a $500 USD deposit. Once your deposit is received, Moy personally contacts you via WhatsApp or Email to confirm costume sizing, fete preferences, and dietary requirements. Flexible milestone payment schedules are provided.'
  },
  {
    q: 'What payment methods are accepted? Can I pay locally in Trinidad?',
    a: 'Yes! We support multiple secure payment gateways: (1) Direct Credit/Debit Card via WiPay Caribbean (optimized for Trinidad and regional cardholders in TTD or USD), (2) Stripe / International Visa, Mastercard & AMEX, (3) Direct TT Bank Transfer or Fast Deposit to Republic Bank / First Citizens / Scotiabank, and (4) PayPal or Wire Transfer for international clients.'
  },
  {
    q: 'What if I am traveling solo? Can you match me with a roommate?',
    a: 'Absolutely. Many of our masqueraders travel solo! If you choose the Shared Double Occupancy package, Moy will pair you with another vetted solo traveler of the same gender. If you have a friend who is booking separately, simply mention their name in the notes box during reservation.'
  },
  {
    q: 'How do costume pickup and fittings work during carnival?',
    a: 'You never have to stand in chaotic costume distribution lines! Moy and our on-ground concierge team collect your costume directly from the mas camp, inspect all pieces, ensure headpieces and wings are pristine, and deliver everything directly to your hotel or villa room along with a fitting session.'
  },
  {
    q: 'Are flights included in the package price?',
    a: 'International flights are not included so travelers have complete flexibility to book using their preferred airline, mileage points, or departure city. However, Moy provides exact flight timing recommendations, and all on-ground airport transfers with luggage assistance are fully included.'
  },
  {
    q: 'What is the refund and cancellation policy?',
    a: 'The $500 USD initial deposit is non-refundable as it immediately secures limited costume sections and villa reservations. Subsequent milestone payments are refundable up to 90 days before the trip departure (less processing fees), or transferable to a future Moy Meets World journey.'
  },
  {
    q: 'Can I customize my package or add private excursions?',
    a: 'Yes! Moy specializes in custom itineraries. You can upgrade to Frontline costumes, add private yacht charters, reserve VIP bottle-service tables, or extend your stay with post-carnival island hopping in Tobago, Grenada, or the Greek islands. Just let Moy know!'
  }
];
