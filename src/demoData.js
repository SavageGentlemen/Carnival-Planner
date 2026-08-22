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
        shareCode: "FETE27",
        sharedPlanId: "demo-plan-id",
        budget: [
            { id: '1', name: 'Flight (JFK -> POS)', cost: 850.00, addedBy: { email: 'guest@carnival.com' } },
            { id: '2', name: 'Airbnb (Woodbrook)', cost: 1200.00, addedBy: { email: 'soca@junkie.com' } },
            { id: '3', name: 'Costume Deposit', cost: 300.00, addedBy: { email: 'guest@carnival.com' } },
            { id: '4', name: 'Spending Money', cost: 500.00, addedBy: { email: 'guest@carnival.com' } },
        ],
        schedule: [
            { id: '1', title: 'Arrival at Piarco', datetime: '2027-02-04T14:30', note: 'Grab doubles at airport', addedBy: { email: 'guest@carnival.com' } },
            { id: '2', title: 'Tribe Costume Pickup', datetime: '2027-02-05T10:00', note: 'Bring ID and receipt', addedBy: { email: 'guest@carnival.com' } },
            { id: '3', title: 'AM Bush J\'ouvert', datetime: '2027-02-06T02:00', note: 'J\'ouvert wear needed', addedBy: { email: 'soca@junkie.com' } },
            { id: '4', title: 'Soca Brainwash', datetime: '2027-02-06T11:00', note: 'The main event!', addedBy: { email: 'king@fete.com' } },
            { id: '5', title: 'Sunny Side Up', datetime: '2027-02-07T04:00', note: 'Breakfast cooler fete', addedBy: { email: 'guest@carnival.com' } },
            { id: '6', title: 'Carnival Monday On The Road', datetime: '2027-02-08T10:00', note: 'Meet at the music truck', addedBy: { email: 'guest@carnival.com' } },
            { id: '7', title: 'Carnival Tuesday Pretty Mas', datetime: '2027-02-09T08:00', note: 'Full costume & feathers on stage', addedBy: { email: 'guest@carnival.com' } },
        ],
        packing: [
            { id: '1', item: 'Passport', checked: true },
            { id: '2', item: 'Sunblock', checked: false },
            { id: '3', item: 'Power bank', checked: true },
            { id: '4', item: 'Comfortable carnival boots', checked: false },
            { id: '5', item: 'Vitamins & Electrolytes', checked: true },
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
