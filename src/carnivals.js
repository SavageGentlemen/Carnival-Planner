/**
 * Helper to ensure a carnival date is always in the future relative to the current date.
 * If the current year's date has passed, rolls over to the next year.
 */
export function getUpcomingCarnivalDate(dateStr) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let [year, month, day] = dateStr.split('-').map(Number);
  let target = new Date(year, month - 1, day);
  
  while (target < today) {
    year += 1;
    target = new Date(year, month - 1, day);
  }
  
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export const rawCarnivalData = [
  // --- August 2026 (Upcoming) ---
  { name: "Cariwest (Canada)", date: "2026-08-07" },
  { name: "Notting Hill Carnival (London)", date: "2026-08-30" },

  // --- September 2026 ---
  { name: "New York Carnival (Labor Day)", date: "2026-09-07" },
  { name: "Japan Caribbean Carnival", date: "2026-09-23" },

  // --- October 2026 ---
  { name: "Miami Carnival", date: "2026-10-11" },

  // --- November 2026 ---
  { name: "Tobago Carnival", date: "2026-11-01" },

  // --- December 2026 / January 2027 ---
  { name: "Sugar Mas (St. Kitts)", date: "2026-12-26" },
  { name: "St. Croix Carnival", date: "2027-01-02" },

  // --- February 2027 ---
  { name: "Carnaval Ponceno (Puerto Rico)", date: "2027-02-04" },
  { name: "Rio Carnival (Brazil)", date: "2027-02-05" },
  { name: "Aruba Carnival", date: "2027-02-07" },
  { name: "Barranquilla Carnival (Colombia)", date: "2027-02-06" },
  { name: "Martinique Carnival", date: "2027-02-07" },
  { name: "Carnaval De Saint-Martin", date: "2027-02-07" },
  { name: "Mas Domnik (Dominica)", date: "2027-02-08" },
  { name: "Trinidad Carnival", date: "2027-02-08" },
  { name: "Carriacou & Petite Martinique", date: "2027-02-08" },
  { name: "Venezuela Carnival", date: "2027-02-08" },
  { name: "Guyana Mashramani", date: "2027-02-23" },
  { name: "Carnaval De San Pedro (Belize)", date: "2027-02-23" },

  // --- March 2027 ---
  { name: "Cape Town Carnival (South Africa)", date: "2027-03-20" },

  // --- April 2027 ---
  { name: "Virgin Gorda Easter Festival", date: "2027-03-28" },
  { name: "Jamaica Carnival", date: "2027-04-04" },
  { name: "Tampa Bay Carnival (USA)", date: "2027-04-17" },
  { name: "St. Maarten Carnival", date: "2027-04-29" },

  // --- May 2027 ---
  { name: "St. Thomas Carnival (USVI)", date: "2027-05-01" },
  { name: "Cayman Carnival Batabano", date: "2027-05-08" },
  { name: "Braccanal (Cayman Islands)", date: "2027-05-12" },
  { name: "Berlin Carnival (Germany)", date: "2027-05-14" },
  { name: "Atlanta Caribbean Carnival", date: "2027-05-29" },
  { name: "Aalborg Karneval (Denmark)", date: "2027-05-29" },
  { name: "Orlando Carnival", date: "2027-05-30" },
  { name: "Luton International Carnival (UK)", date: "2027-05-30" },
  { name: "Guyana Independence", date: "2027-05-26" },

  // --- June 2027 ---
  { name: "Munich Carnival (Germany)", date: "2027-05-27" },
  { name: "Bahamas Carnival", date: "2027-06-05" },
  { name: "South Carolina Carnival", date: "2027-06-10" },
  { name: "Bermuda Carnival", date: "2027-06-14" },
  { name: "Hollywood Carnival (USA)", date: "2027-06-19" },
  { name: "Caymas Carnival (Cayman Islands)", date: "2027-06-19" },
  { name: "Philadelphia Carnival", date: "2027-06-19" },
  { name: "Vienna Carnival (Austria)", date: "2027-06-25" },

  // --- July 2027 ---
  { name: "Vincy Mas (St. Vincent)", date: "2027-07-05" },
  { name: "Saint Lucia Carnival", date: "2027-07-19" },
  { name: "Anguilla Summer Festival", date: "2027-07-29" },
  { name: "Zomercarnaval (Rotterdam)", date: "2027-07-31" },

  // --- August 2027 ---
  { name: "Toronto Caribbean Carnival (Caribana)", date: "2027-07-31" },
  { name: "Crop Over (Barbados)", date: "2027-08-02" },
  { name: "Antigua Carnival", date: "2027-08-02" },
  { name: "Nevis Culturama Festival", date: "2027-08-03" },
  { name: "Spice Mas (Grenada)", date: "2027-08-09" }
];

export const carnivalData = rawCarnivalData.map(c => ({
  ...c,
  date: getUpcomingCarnivalDate(c.date)
}));
