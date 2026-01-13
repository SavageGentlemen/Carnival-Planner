
export const DEMO_USER = {
    uid: 'demo-user-123',
    email: 'guest@carnival-planner.com',
    displayName: 'Ready To Fete',
    photoURL: null,
    isAnonymous: true
};

export const DEMO_SQUAD = [
    { id: '1', name: 'Ready To Fete', email: 'guest@carnival.com', photoURL: null },
    { id: '2', name: 'Soca Junkie', email: 'soca@junkie.com', photoURL: null },
    { id: '3', name: 'Fete King', email: 'king@fete.com', photoURL: null },
    { id: '4', name: 'Carnival Baby', email: 'baby@carnival.com', photoURL: null },
];

export const DEMO_CARNIVALS = {
    trinidad: {
        name: "Trinidad Carnival - February",
        shareCode: "FETE26",
        sharedPlanId: "demo-plan-id",
        budget: [
            { id: '1', name: 'Flight (JFK -> POS)', cost: 850.00, addedBy: { email: 'guest@carnival.com' } },
            { id: '2', name: 'Airbnb (Woodbrook)', cost: 1200.00, addedBy: { email: 'soca@junkie.com' } },
            { id: '3', name: 'Costume Deposit', cost: 300.00, addedBy: { email: 'guest@carnival.com' } },
            { id: '4', name: 'Spending Money', cost: 500.00, addedBy: { email: 'guest@carnival.com' } },
        ],
        schedule: [
            { id: '1', title: 'Arrival at Piarco', datetime: '2026-02-11T14:30', note: 'Grab doubles at airport', addedBy: { email: 'guest@carnival.com' } },
            { id: '2', title: 'Tribe Costume Pickup', datetime: '2026-02-12T10:00', note: 'Bring ID and receipt', addedBy: { email: 'guest@carnival.com' } },
            { id: '3', title: 'AM Bush', datetime: '2026-02-14T02:00', note: 'J\'ouvert wear needed', addedBy: { email: 'soca@junkie.com' } },
            { id: '4', title: 'Soca Brainwash', datetime: '2026-02-14T11:00', note: 'The main event!', addedBy: { email: 'king@fete.com' } },
            { id: '5', title: 'Sunny Side Up', datetime: '2026-02-15T04:00', note: 'Breakfast cooler fete', addedBy: { email: 'guest@carnival.com' } },
            { id: '6', title: 'Carnival Monday', datetime: '2026-02-16T10:00', note: 'Meet at the truck', addedBy: { email: 'guest@carnival.com' } },
        ],
        packing: [
            { id: '1', item: 'Passport', checked: true },
            { id: '2', item: 'Sunblock', checked: false },
            { id: '3', item: 'Power bank', checked: true },
            { id: '4', item: 'Comfortable carnival boots', checked: false },
            { id: '5', item: 'Vitamins', checked: true },
        ],
        costume: {
            band: 'Tribe',
            section: 'The Monarch',
            total: 1200,
            paid: 300
        },
        squad: DEMO_SQUAD
    }
};
