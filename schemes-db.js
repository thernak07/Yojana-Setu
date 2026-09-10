// BROADER SCHEME DATABASE
// Central and state government schemes beyond the NSFDC-family corporations,
// each with explicit eligibility rules covering category, gender, age, income,
// business type/stage, and (for state schemes) home state.
// Simplified for hackathon demonstration — real eligibility should always be
// confirmed on each scheme's official portal.

const ALL_SCHEMES = [
  // ---- CENTRAL SCHEMES ----
  {
    id: "pmegp", level: "central",
    name: "PMEGP — Prime Minister's Employment Generation Programme",
    benefit: "Subsidy up to 35%",
    description: "Credit-linked subsidy for setting up new manufacturing or service micro-enterprises, run by KVIC.",
    applyUrl: "https://www.kviconline.gov.in/pmegpeportal/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: ["idea","starting"], btypes: ["manufacturing","service","handicraft"],
    maxFunding: 5000000
  },
  {
    id: "standup", level: "central",
    name: "Stand-Up India",
    benefit: "Loan ₹10L–1Cr",
    description: "Bank loans for SC/ST and women entrepreneurs to set up a new greenfield enterprise.",
    applyUrl: "https://www.standupmitra.in/",
    minAge: 18, maxAge: null, categories: ["sc","st"], genders: null, allowIfWoman: true,
    stages: ["idea","starting"], btypes: null,
    minFunding: 100000
  },
  {
    id: "mudra", level: "central",
    name: "PM MUDRA Yojana",
    benefit: "Collateral-free loan",
    description: "Loans up to ₹20 lakh for non-farm micro and small enterprises, without collateral.",
    applyUrl: "https://www.mudra.org.in/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: null, btypes: ["manufacturing","service","retail","tech","handicraft"],
    maxFunding: 2000000
  },
  {
    id: "pmvishwakarma", level: "central",
    name: "PM Vishwakarma",
    benefit: "Loan + toolkit support",
    description: "Skill training, toolkit incentive, and collateral-free loans up to ₹3L for traditional artisans.",
    applyUrl: "https://pmvishwakarma.gov.in/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: null, btypes: ["handicraft"],
    maxFunding: 300000
  },
  {
    id: "svanidhi", level: "central",
    name: "PM SVANidhi",
    benefit: "Micro-loan ₹10K–50K",
    description: "Working capital loans for street vendors and very small retail/trading businesses.",
    applyUrl: "https://pmsvanidhi.mohua.gov.in/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: null, btypes: ["retail"],
    maxFunding: 50000
  },
  {
    id: "seedfund", level: "central",
    name: "Startup India Seed Fund Scheme",
    benefit: "Seed grant up to ₹50L",
    description: "Seed funding for early-stage tech/innovative startups for proof of concept and prototyping.",
    applyUrl: "https://seedfund.startupindia.gov.in/",
    minAge: 18, maxAge: 45, categories: null, genders: null,
    stages: ["idea","starting"], btypes: ["tech"]
  },
  {
    id: "mahilaehaat", level: "central",
    name: "Mahila e-Haat",
    benefit: "Free online marketplace",
    description: "A free online platform for women entrepreneurs and artisans to sell products directly to buyers.",
    applyUrl: "https://mahilaehaat-rmk.gov.in/",
    minAge: 18, maxAge: null, categories: null, genders: ["woman"],
    stages: null, btypes: ["handicraft","retail","manufacturing"]
  },
  {
    id: "cgtmse", level: "central",
    name: "CGTMSE",
    benefit: "Collateral-free credit guarantee",
    description: "Credit guarantee to banks so micro/small enterprises can get loans without collateral.",
    applyUrl: "https://www.cgtmse.in/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: ["existing"], btypes: ["manufacturing","service","retail","tech","handicraft"],
    maxFunding: 20000000
  },
  {
    id: "pmfme", level: "central",
    name: "PM FME (Food Processing Micro-Enterprises)",
    benefit: "Subsidy up to 35%",
    description: "Credit-linked subsidy for micro food processing units to formalise and expand.",
    applyUrl: "https://pmfme.mofpi.gov.in/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: null, btypes: ["agriculture"],
    maxFunding: 2500000
  },
  {
    id: "udyam", level: "central",
    name: "Udyam Registration",
    benefit: "Free MSME status",
    description: "Free registration that classifies your business as an MSME, unlocking most other scheme benefits.",
    applyUrl: "https://udyamregistration.gov.in/",
    minAge: 18, maxAge: null, categories: null, genders: null,
    stages: null, btypes: null
  },
  {
    id: "tread", level: "central",
    name: "TREAD Scheme",
    benefit: "Grant + credit support",
    description: "Grants and credit support for women entrepreneurs through NGOs, covering training and counselling.",
    applyUrl: "https://msme.gov.in/",
    minAge: 18, maxAge: null, categories: null, genders: ["woman"],
    stages: null, btypes: ["manufacturing","service","retail","handicraft"],
    maxFunding: 3000000
  },
  {
    id: "seniorcitizen-fitl", level: "central",
    name: "Senior Citizen FITL / Vayoshreshtha support (via Udyam + concessional bank schemes)",
    benefit: "Priority-sector lending",
    description: "Entrepreneurs above 60 can access priority-sector MSME lending at select PSBs with relaxed collateral norms.",
    applyUrl: "https://msme.gov.in/",
    minAge: 60, maxAge: null, categories: null, genders: null,
    stages: null, btypes: null
  },

  // ---- STATE SCHEMES ----
  {
    id: "punjab-ghar-ghar", level: "state", state: "Punjab",
    name: "Ghar Ghar Rozgar Te Karobar Mission",
    benefit: "Loan facilitation + training",
    description: "Punjab's state mission connecting youth to employment and business loan facilitation, including skill counselling.",
    applyUrl: "https://pgrkam.com/",
    minAge: 18, maxAge: 45, categories: null, genders: null,
    stages: ["idea","starting"], btypes: null
  },
  {
    id: "maha-apavim", level: "state", state: "Maharashtra",
    name: "Annasaheb Patil Arthik Vikas Mahamandal (Interest Subvention Loan)",
    benefit: "Interest subvention up to ₹10L",
    description: "Interest subsidy on business loans for OBC/open-category entrepreneurs (SC/ST covered under national corporations).",
    applyUrl: "https://mahaswayam.gov.in/",
    minAge: 18, maxAge: 50, categories: ["obc","general"], genders: null,
    stages: ["idea","starting","existing"], btypes: null,
    maxFunding: 1000000
  },
  {
    id: "up-mysy", level: "state", state: "Uttar Pradesh",
    name: "UP Mukhyamantri Yuva Swarojgar Yojana",
    benefit: "Subsidy + collateral-free loan",
    description: "Self-employment scheme for UP youth to set up new manufacturing/service ventures with subsidised loans.",
    applyUrl: "https://msme.up.gov.in/",
    minAge: 18, maxAge: 40, categories: null, genders: null,
    stages: ["idea","starting"], btypes: ["manufacturing","service"],
    maxFunding: 2500000
  },
  {
    id: "tn-needs", level: "state", state: "Tamil Nadu",
    name: "New Entrepreneur-cum-Enterprise Development Scheme (NEEDS)",
    benefit: "Subsidy + concessional loan",
    description: "Supports graduate/diploma entrepreneurs in Tamil Nadu setting up new manufacturing or service enterprises.",
    applyUrl: "https://www.msmeonline.tn.gov.in/",
    minAge: 21, maxAge: 35, categories: null, genders: null,
    stages: ["idea","starting"], btypes: ["manufacturing","service"],
    maxFunding: 5000000
  },
  {
    id: "delhi-dsmfdc", level: "state", state: "Delhi",
    name: "Delhi Minorities Finance & Development Corporation Loan Scheme",
    benefit: "Concessional loan",
    description: "Low-interest loans for minority entrepreneurs resident in Delhi for small business ventures.",
    applyUrl: "https://dsmfdc.delhi.gov.in/",
    minAge: 18, maxAge: null, categories: ["minority"], genders: null,
    stages: null, btypes: null,
    maxFunding: 500000
  }
];

// Eligibility check against a unified user profile.
// NOTE: every scheme currently in ALL_SCHEMES is business/enterprise-focused
// (none are education-specific — education loans are handled via the
// category-specific corporation tier in nsfdc-data.js). So if the user is
// seeking an education loan, none of these should match — a scheme would
// need an explicit purpose:"education" or purpose:"any" to show up there.
function schemeEligible(scheme, u) {
  if (u.isEducation && scheme.purpose !== "education" && scheme.purpose !== "any") return false;
  if (scheme.level === "state" && scheme.state !== u.homeState) return false;
  if (scheme.minAge != null && u.age < scheme.minAge) return false;
  if (scheme.maxAge != null && u.age > scheme.maxAge) return false;
  if (scheme.categories && !scheme.categories.includes(u.category)) {
    if (!(scheme.allowIfWoman && u.gender === "woman")) return false;
  }
  if (scheme.genders && !scheme.genders.includes(u.gender)) return false;
  // stage/btype are only meaningful for business-purpose schemes; since
  // isEducation already filtered above, u.stage/u.btype are guaranteed
  // non-null here for any scheme that reaches this line.
  if (scheme.stages && !scheme.stages.includes(u.stage)) return false;
  if (scheme.btypes && !scheme.btypes.includes(u.btype)) return false;
  if (scheme.maxFunding != null && u.funding > scheme.maxFunding) return false;
  if (scheme.minFunding != null && u.funding < scheme.minFunding) return false;
  return true;
}

function findEligibleSchemes(u) {
  return ALL_SCHEMES.filter(s => {
    try { return schemeEligible(s, u); } catch (e) { return false; }
  });
}
