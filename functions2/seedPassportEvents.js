// Seed script for Soca Passport test events
// Run this in the Firebase Console or via a Cloud Function

const admin = require('firebase-admin');

// Initialize if not already done
if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

// Sample passport events for testing
const SAMPLE_EVENTS = [
    {
        title: "Soca Brainwash 2026",
        date: new Date('2026-02-23T20:00:00'),
        location: "O2 Park, Chaguaramas",
        countryCode: "TT",
        carnivalCircuit: "trinidad",
        accessCode: "BRAIN-2026",
        isActive: true,
        isFlagship: true,
        eventType: "fete",
        maxCapacity: 15000,
        organizerName: "Island People",
        totalCheckins: 0
    },
    {
        title: "AM Bush J'ouvert",
        date: new Date('2026-02-24T04:00:00'),
        location: "Brian Lara Promenade",
        countryCode: "TT",
        carnivalCircuit: "trinidad",
        accessCode: "AMBUSH-2026",
        isActive: true,
        isFlagship: false,
        eventType: "jouvert",
        maxCapacity: 5000,
        organizerName: "Tribe",
        totalCheckins: 0
    },
    {
        title: "Miami Carnival Road March",
        date: new Date('2026-10-11T09:00:00'),
        location: "Miami-Dade Fairgrounds",
        countryCode: "US",
        carnivalCircuit: "miami",
        accessCode: "MIAMI-ROAD",
        isActive: true,
        isFlagship: true,
        eventType: "carnival",
        maxCapacity: 50000,
        organizerName: "Miami Broward Carnival",
        totalCheckins: 0
    },
    {
        title: "Sunrise Breakfast Fete",
        date: new Date('2026-07-14T06:00:00'),
        location: "Mas Camp, St. Lucia",
        countryCode: "LC",
        carnivalCircuit: "stlucia",
        accessCode: "SUNRISE-LC",
        isActive: true,
        isFlagship: false,
        eventType: "breakfast",
        maxCapacity: 800,
        organizerName: "Lucian Events",
        totalCheckins: 0
    },
    {
        title: "Catamaran Vibes Cruise",
        date: new Date('2026-08-02T11:00:00'),
        location: "Barbados Harbour",
        countryCode: "BB",
        carnivalCircuit: "barbados",
        accessCode: "BOAT-VIBES",
        isActive: true,
        isFlagship: false,
        eventType: "boat_ride",
        maxCapacity: 200,
        organizerName: "Island Cruises",
        totalCheckins: 0
    },
    {
        // Demo event for testing
        title: "Demo Test Event",
        date: new Date('2026-01-20T12:00:00'),
        location: "Test Location",
        countryCode: "TT",
        carnivalCircuit: "trinidad",
        accessCode: "TEST-001",
        isActive: true,
        isFlagship: false,
        eventType: "fete",
        maxCapacity: 1000,
        organizerName: "Carnival Planner Team",
        totalCheckins: 0
    }
];

async function seedPassportEvents() {
    console.log('Seeding passport events...');

    const batch = db.batch();
    const eventsRef = db.collection('passportEvents');

    for (const event of SAMPLE_EVENTS) {
        const docRef = eventsRef.doc();
        batch.set(docRef, {
            ...event,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Adding: ${event.title} (${event.accessCode})`);
    }

    await batch.commit();
    console.log(`✓ Seeded ${SAMPLE_EVENTS.length} passport events`);
    console.log('\nTest access codes:');
    SAMPLE_EVENTS.forEach(e => console.log(`  ${e.accessCode} - ${e.title}`));
}

// Run the seeder
seedPassportEvents()
    .then(() => {
        console.log('\nDone!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
