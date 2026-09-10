// NSFDC-STYLE CORPORATION TIERS
// NSFDC (SC), NSTFDC (ST), NBCFDC (OBC), and NMDFC (Minority) all follow the
// same Channel Finance structure (Micro / Term / Educational loans through
// SCAs, PSBs, RRBs, NBFC-MFIs). Rates/limits/moratorium are simplified
// representative values for this prototype.

const CORPORATIONS = {
  sc: {
    key: "sc",
    shortName: "NSFDC",
    fullName: { en: "National Scheduled Castes Finance & Development Corporation", hi: "राष्ट्रीय अनुसूचित जाति वित्त एवं विकास निगम" }
  },
  st: {
    key: "st",
    shortName: "NSTFDC",
    fullName: { en: "National Scheduled Tribes Finance & Development Corporation", hi: "राष्ट्रीय अनुसूचित जनजाति वित्त एवं विकास निगम" }
  },
  obc: {
    key: "obc",
    shortName: "NBCFDC",
    fullName: { en: "National Backward Classes Finance & Development Corporation", hi: "राष्ट्रीय पिछड़ा वर्ग वित्त एवं विकास निगम" }
  },
  minority: {
    key: "minority",
    shortName: "NMDFC",
    fullName: { en: "National Minorities Development & Finance Corporation", hi: "राष्ट्रीय अल्पसंख्यक विकास एवं वित्त निगम" }
  }
};

function tiersFor(corpKey) {
  return [
    {
      id: "micro",
      name: { en: "Micro Finance Scheme", hi: "माइक्रो फाइनेंस योजना" },
      forProject: true,
      maxAmount: 140000, minAmount: 0, rate: 6.5, maxTenureYears: 5, moratoriumMonths: 3, subsidyPct: 90,
      desc: {
        en: "For small income-generating projects — shop setup, small trade, tailoring, repair units, etc.",
        hi: "छोटी आय-सृजन परियोजनाओं के लिए — दुकान, छोटा व्यापार, सिलाई, मरम्मत इकाई आदि।"
      }
    },
    {
      id: "term",
      name: { en: "Term Loan Scheme", hi: "टर्म लोन योजना" },
      forProject: true,
      maxAmount: 5000000, minAmount: 140001, rate: 8, maxTenureYears: 10, moratoriumMonths: 6, subsidyPct: 90,
      desc: {
        en: "For larger projects — manufacturing units, transport vehicles, agri-processing, larger retail setups.",
        hi: "बड़ी परियोजनाओं के लिए — विनिर्माण इकाई, परिवहन वाहन, कृषि-प्रसंस्करण, बड़ा खुदरा व्यापार।"
      }
    },
    {
      id: "education",
      name: { en: "Educational Loan Scheme", hi: "शैक्षिक ऋण योजना" },
      forProject: false,
      maxAmount: 2000000, minAmount: 0, rate: 6.5, maxTenureYears: 15, moratoriumMonths: 12, subsidyPct: 90,
      desc: {
        en: "Covers tuition, hostel and course costs for professional/technical courses in India or abroad.",
        hi: "भारत या विदेश में व्यावसायिक/तकनीकी पाठ्यक्रमों के लिए ट्यूशन, छात्रावास और पाठ्यक्रम लागत को कवर करता है।"
      }
    }
  ];
}

// CHANNEL PARTNERS — sample directory. Real deployment would sync with each
// corporation's live Channel Partner database including current fund
// utilisation / NPA status.
const PARTNERS = [
  { name: "State SC Development Corp — Punjab", type: "SCA", city: "Jalandhar", state: "Punjab", lat: 31.326, lng: 75.576, npaFlag: false, handles: ["micro","term","education"] },
  { name: "Punjab & Sind Bank — Ludhiana Branch", type: "PSB", city: "Ludhiana", state: "Punjab", lat: 30.901, lng: 75.857, npaFlag: false, handles: ["micro","term"] },
  { name: "Punjab Gramin Bank", type: "RRB", city: "Kapurthala", state: "Punjab", lat: 31.380, lng: 75.383, npaFlag: true, handles: ["micro"] },
  { name: "State SC Development Corp — Delhi", type: "SCA", city: "Delhi", state: "Delhi", lat: 28.613, lng: 77.209, npaFlag: false, handles: ["micro","term","education"] },
  { name: "Canara Bank — Connaught Place", type: "PSB", city: "Delhi", state: "Delhi", lat: 28.632, lng: 77.220, npaFlag: false, handles: ["term","education"] },
  { name: "NBFC-MFI Sahayog Finance", type: "NBFC-MFI", city: "Delhi", state: "Delhi", lat: 28.700, lng: 77.10, npaFlag: false, handles: ["micro"] },
  { name: "State SC Development Corp — Maharashtra", type: "SCA", city: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.877, npaFlag: false, handles: ["micro","term","education"] },
  { name: "Bank of Maharashtra — Pune", type: "PSB", city: "Pune", state: "Maharashtra", lat: 18.520, lng: 73.856, npaFlag: false, handles: ["micro","term"] },
  { name: "Maharashtra Gramin Bank", type: "RRB", city: "Nashik", state: "Maharashtra", lat: 19.997, lng: 73.789, npaFlag: true, handles: ["micro","term"] },
  { name: "State SC Development Corp — UP", type: "SCA", city: "Lucknow", state: "Uttar Pradesh", lat: 26.847, lng: 80.946, npaFlag: false, handles: ["micro","term","education"] },
  { name: "Baroda UP Bank", type: "RRB", city: "Kanpur", state: "Uttar Pradesh", lat: 26.449, lng: 80.331, npaFlag: false, handles: ["micro","term"] },
  { name: "NBFC-MFI Uday Credit", type: "NBFC-MFI", city: "Varanasi", state: "Uttar Pradesh", lat: 25.317, lng: 82.973, npaFlag: false, handles: ["micro"] },
  { name: "State SC Development Corp — Tamil Nadu", type: "SCA", city: "Chennai", state: "Tamil Nadu", lat: 13.082, lng: 80.270, npaFlag: false, handles: ["micro","term","education"] },
  { name: "Indian Bank — Coimbatore", type: "PSB", city: "Coimbatore", state: "Tamil Nadu", lat: 11.016, lng: 76.955, npaFlag: false, handles: ["term","education"] },
  { name: "Tamil Nadu Grama Bank", type: "RRB", city: "Madurai", state: "Tamil Nadu", lat: 9.925, lng: 78.119, npaFlag: true, handles: ["micro"] }
];

function fmt(n) {
  return "₹" + Number(Math.round(n)).toLocaleString("en-IN");
}

// Recommend a tier based on category (which corporation), project type, and cost
function recommendTier(category, input) {
  const corpKey = ["sc","st","obc","minority"].includes(category) ? category : null;
  if (!corpKey) return null; // General category has no dedicated corporation
  const tiers = tiersFor(corpKey);
  let tier;
  if (input.isEducation) {
    tier = tiers.find(t => t.id === "education");
  } else if (input.cost <= 140000) {
    tier = tiers.find(t => t.id === "micro");
  } else {
    tier = tiers.find(t => t.id === "term");
  }
  return { ...tier, corp: CORPORATIONS[corpKey] };
}

// EMI calculation using standard reducing-balance formula
function calcEMI(principal, annualRatePct, tenureYears) {
  const r = annualRatePct / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
}

// Haversine distance in km between two lat/lng points
function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function findPartners(tierId, userLat, userLng, limit) {
  return PARTNERS
    .filter(p => p.handles.includes(tierId) && !p.npaFlag)
    .map(p => ({ ...p, distance: distanceKm(userLat, userLng, p.lat, p.lng) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit || 5);
}

// City -> approximate lat/lng, used since we don't have live geolocation permission by default
const CITY_COORDS = {
  "Jalandhar": [31.326, 75.576], "Ludhiana": [30.901, 75.857], "Amritsar": [31.634, 74.872],
  "Delhi": [28.644, 77.216], "Mumbai": [19.076, 72.877], "Pune": [18.520, 73.856],
  "Nashik": [19.997, 73.789], "Lucknow": [26.847, 80.946], "Kanpur": [26.449, 80.331],
  "Varanasi": [25.317, 82.973], "Chennai": [13.082, 80.270], "Coimbatore": [11.016, 76.955],
  "Madurai": [9.925, 78.119], "Kapurthala": [31.380, 75.383]
};

// City -> state, used to surface state-specific schemes automatically
const STATE_OF_CITY = {
  "Jalandhar": "Punjab", "Ludhiana": "Punjab", "Amritsar": "Punjab", "Kapurthala": "Punjab",
  "Delhi": "Delhi",
  "Mumbai": "Maharashtra", "Pune": "Maharashtra", "Nashik": "Maharashtra",
  "Lucknow": "Uttar Pradesh", "Kanpur": "Uttar Pradesh", "Varanasi": "Uttar Pradesh",
  "Chennai": "Tamil Nadu", "Coimbatore": "Tamil Nadu", "Madurai": "Tamil Nadu"
};
