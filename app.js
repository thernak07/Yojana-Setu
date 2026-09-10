// ---------- LANGUAGE ----------
let LANG = "en";

const STRINGS = {
  en: {
    heroTitle: "Find every government scheme you actually qualify for.",
    step1: "Tell us about you",
    genderLabel: "Gender", woman: "Woman", man: "Man", otherGender: "Other",
    ageLabel: "Age",
    categoryLabel: "Category", general: "General", obc: "OBC", sc: "SC", st: "ST", minority: "Minority",
    isEducation: "What is this loan for?",
    project: "A business / project",
    education: "Education",
    stageLabel: "Business stage", stageIdea: "Just an idea", stageStarting: "Starting up", stageExisting: "Already running",
    btypeLabel: "Business type",
    btypeManufacturing: "Manufacturing", btypeService: "Service", btypeAgriculture: "Agriculture",
    btypeRetail: "Retail / Trading", btypeTech: "Tech / Digital", btypeHandicraft: "Handicraft / Artisan",
    income: "Annual family income (₹)",
    cost: "Estimated project / course cost (₹)",
    location: "Nearest city",
    useLocation: "📍 Use my exact location instead",
    locatingMsg: "Getting your location…",
    locatedMsg: "Using your exact location for accurate distances.",
    locationDeniedMsg: "Couldn't access your location — using the selected city instead.",
    findBtn: "Find my schemes",
    incomeWarnCorp: "This corporation's schemes require annual family income up to ₹5,00,000. You may not qualify for the loan tiers below, but you can still see how they work.",
    eligibleTitle: "schemes you may be eligible for",
    eligibleSub: "Based on what you entered. Confirm final eligibility on each scheme's official portal before applying.",
    noEligible: "No matches found — try adjusting your details above (age, category, income, or business type).",
    central: "Central", state: "State",
    visitPortal: "Visit official portal →",
    corpStep: "Your dedicated corporation scheme",
    recommended: "Recommended for you",
    subsidyLine: "Covers up to",
    rateLine: "Interest rate",
    moratoriumLine: "Moratorium (repayment grace period)",
    emiTitle: "Estimate your EMI",
    loanAmount: "Loan amount (₹)",
    tenure: "Tenure (years)",
    calcBtn: "Calculate EMI",
    partnersTitle: "Nearest eligible Channel Partners",
    partnersSub: "Filtered to partners currently accepting applications for this scheme (excludes partners flagged for high NPAs/overdues).",
    npaExcluded: "partner(s) nearby were excluded due to high NPA/overdue flags",
    noPartners: "No eligible partner found nearby for this scheme tier yet.",
    distance: "away",
    usingGPSNote: "Using your exact location.",
    usingCityNote: "Using selected city as your approximate location.",
    disclaimer: "YojanaSetu is a student prototype for SIH 2026 (NSFDC-family Channel Finance + broader scheme discovery). Figures are simplified for demonstration — always confirm final terms with the relevant department or Channel Partner."
  },
  hi: {
    heroTitle: "हर वह सरकारी योजना खोजें जिसके लिए आप पात्र हैं।",
    step1: "अपने बारे में बताएं",
    genderLabel: "लिंग", woman: "महिला", man: "पुरुष", otherGender: "अन्य",
    ageLabel: "आयु",
    categoryLabel: "श्रेणी", general: "सामान्य", obc: "OBC", sc: "SC", st: "ST", minority: "अल्पसंख्यक",
    isEducation: "यह ऋण किसके लिए है?",
    project: "व्यवसाय / परियोजना",
    education: "शिक्षा",
    stageLabel: "व्यवसाय चरण", stageIdea: "सिर्फ एक विचार", stageStarting: "शुरुआत", stageExisting: "पहले से चल रहा है",
    btypeLabel: "व्यवसाय प्रकार",
    btypeManufacturing: "विनिर्माण", btypeService: "सेवा", btypeAgriculture: "कृषि",
    btypeRetail: "खुदरा / व्यापार", btypeTech: "तकनीक / डिजिटल", btypeHandicraft: "हस्तशिल्प / शिल्पकार",
    income: "वार्षिक पारिवारिक आय (₹)",
    cost: "अनुमानित परियोजना / पाठ्यक्रम लागत (₹)",
    location: "निकटतम शहर",
    useLocation: "📍 मेरे सटीक स्थान का उपयोग करें",
    locatingMsg: "आपका स्थान प्राप्त किया जा रहा है…",
    locatedMsg: "सटीक दूरी के लिए आपके वास्तविक स्थान का उपयोग किया जा रहा है।",
    locationDeniedMsg: "स्थान प्राप्त नहीं हो सका — चयनित शहर का उपयोग किया जा रहा है।",
    findBtn: "मेरी योजनाएं खोजें",
    incomeWarnCorp: "इस निगम की योजनाओं के लिए वार्षिक पारिवारिक आय ₹5,00,000 तक होनी चाहिए। आप निचे दी गई ऋण श्रेणियों के लिए पात्र नहीं हो सकते।",
    eligibleTitle: "योजनाएं जिनके लिए आप पात्र हो सकते हैं",
    eligibleSub: "आपके द्वारा दी गई जानकारी के आधार पर। आवेदन से पहले आधिकारिक पोर्टल पर पात्रता अवश्य जांचें।",
    noEligible: "कोई मेल नहीं मिला — ऊपर दी गई जानकारी (आयु, श्रेणी, आय, या व्यवसाय प्रकार) में बदलाव करें।",
    central: "केंद्रीय", state: "राज्य",
    visitPortal: "आधिकारिक पोर्टल पर जाएं →",
    corpStep: "आपकी समर्पित निगम योजना",
    recommended: "आपके लिए अनुशंसित",
    subsidyLine: "कवर करता है",
    rateLine: "ब्याज दर",
    moratoriumLine: "अधिस्थगन (राहत अवधि)",
    emiTitle: "अपनी EMI का अनुमान लगाएं",
    loanAmount: "ऋण राशि (₹)",
    tenure: "अवधि (वर्ष)",
    calcBtn: "EMI की गणना करें",
    partnersTitle: "निकटतम योग्य चैनल पार्टनर",
    partnersSub: "उन पार्टनरों तक सीमित जो वर्तमान में आवेदन स्वीकार कर रहे हैं (उच्च NPA वाले पार्टनर शामिल नहीं)।",
    npaExcluded: "आस-पास के पार्टनर उच्च NPA फ्लैग के कारण बाहर रखे गए",
    noPartners: "इस श्रेणी के लिए अभी कोई योग्य पार्टनर नहीं मिला।",
    distance: "दूर",
    usingGPSNote: "आपके सटीक स्थान का उपयोग किया जा रहा है।",
    usingCityNote: "अनुमानित स्थान के रूप में चयनित शहर का उपयोग किया जा रहा है।",
    disclaimer: "YojanaSetu, SIH 2026 के लिए एक छात्र प्रोटोटाइप है। आंकड़े प्रदर्शन के लिए सरल किए गए हैं — कृपया संबंधित विभाग या चैनल पार्टनर से अंतिम शर्तें अवश्य जांचें।"
  }
};

function t(key) { return STRINGS[LANG][key]; }

function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.getAttribute("data-i18n-placeholder")); });
}

document.getElementById("langToggle").addEventListener("click", () => {
  LANG = LANG === "en" ? "hi" : "en";
  document.getElementById("langToggle").textContent = LANG === "en" ? "हिंदी" : "English";
  applyLanguage();
  if (window.__lastUser) {
    renderEligibleSchemes(window.__lastUser, window.__lastEligible);
    if (window.__lastTier) renderTier(window.__lastTier, window.__lastIncome);
    if (window.__lastEMI !== undefined) renderEMI(window.__lastEMI, window.__lastTier, window.__lastAmount, window.__lastYears);
    if (window.__lastPartners) renderPartners(window.__lastPartners, window.__lastExcluded, window.__lastTier);
  }
});

applyLanguage();

// Toggle business-only fields based on loan purpose
function toggleBusinessFields() {
  const isEdu = document.querySelector('input[name="need"]:checked')?.value === "education";
  document.getElementById("businessFields").style.display = isEdu ? "none" : "block";
  document.getElementById("btypeField").style.display = isEdu ? "none" : "block";
}
document.querySelectorAll('input[name="need"]').forEach(el => el.addEventListener("change", toggleBusinessFields));
toggleBusinessFields();

// ---------- REAL GEOLOCATION ----------
window.__userCoords = null;

document.getElementById("useLocationBtn").addEventListener("click", () => {
  const statusEl = document.getElementById("locationStatus");
  const btn = document.getElementById("useLocationBtn");

  if (!navigator.geolocation) {
    statusEl.textContent = t("locationDeniedMsg");
    statusEl.classList.add("error");
    return;
  }

  statusEl.textContent = t("locatingMsg");
  statusEl.classList.remove("error");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      window.__userCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
      statusEl.textContent = t("locatedMsg");
      statusEl.classList.remove("error");
      btn.classList.add("active");
      document.getElementById("city").required = false;
    },
    () => {
      window.__userCoords = null;
      statusEl.textContent = t("locationDeniedMsg");
      statusEl.classList.add("error");
      btn.classList.remove("active");
      document.getElementById("city").required = true;
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
});

function getUserCoords() {
  if (window.__userCoords) return window.__userCoords;
  const city = window.__userCity;
  const c = CITY_COORDS[city];
  return c ? { lat: c[0], lng: c[1] } : null;
}

// ---------- STEP 1: COLLECT PROFILE + FIND ELIGIBLE SCHEMES ----------
document.getElementById("needForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const gender = document.querySelector('input[name="gender"]:checked')?.value || null;
  const category = document.querySelector('input[name="category"]:checked')?.value || null;
  const isEducation = document.querySelector('input[name="need"]:checked')?.value === "education";
  const stage = document.querySelector('input[name="stage"]:checked')?.value || null;
  const btype = document.querySelector('input[name="btype"]:checked')?.value || null;
  const age = Number(document.getElementById("age").value);
  const income = Number(document.getElementById("income").value);
  const cost = Number(document.getElementById("cost").value);
  const city = document.getElementById("city").value;

  if (!category) { alert(LANG === "en" ? "Please select your category." : "कृपया अपनी श्रेणी चुनें।"); return; }
  if (!gender) { alert(LANG === "en" ? "Please select your gender." : "कृपया अपना लिंग चुनें।"); return; }
  if (!isEducation && !stage) { alert(LANG === "en" ? "Please select your business stage." : "कृपया अपना व्यवसाय चरण चुनें।"); return; }
  if (!isEducation && !btype) { alert(LANG === "en" ? "Please select your business type." : "कृपया अपना व्यवसाय प्रकार चुनें।"); return; }
  if (!city && !window.__userCoords) { alert(LANG === "en" ? "Please select your nearest city, or use your exact location." : "कृपया अपना निकटतम शहर चुनें, या अपने सटीक स्थान का उपयोग करें।"); return; }
  if (!age || age < 16) { alert(LANG === "en" ? "Please enter a valid age." : "कृपया एक मान्य आयु दर्ज करें।"); return; }
  if (!income && income !== 0) { alert(LANG === "en" ? "Please enter your annual family income." : "कृपया अपनी वार्षिक पारिवारिक आय दर्ज करें।"); return; }
  if (!cost || cost <= 0) { alert(LANG === "en" ? "Please enter a valid project/course cost." : "कृपया एक मान्य परियोजना/पाठ्यक्रम लागत दर्ज करें।"); return; }

  window.__userCity = city;

  const user = {
    gender, category, age, income,
    stage: isEducation ? null : stage,
    btype: isEducation ? null : btype,
    funding: cost,
    homeState: STATE_OF_CITY[city] || null,
    isEducation
  };
  window.__lastUser = user;

  // ---- Broad eligible-schemes list (central + state) ----
  const eligible = findEligibleSchemes(user);
  window.__lastEligible = eligible;
  renderEligibleSchemes(user, eligible);
  document.getElementById("eligibleSchemesSection").classList.add("show");

  // ---- Category-specific corporation deep dive (NSFDC/NSTFDC/NBCFDC/NMDFC) ----
  const tier = recommendTier(category, { isEducation, cost });
  const corpCard = document.getElementById("corpCard");
  const emiCard = document.getElementById("emiCard");

  if (tier) {
    window.__lastTier = tier;
    window.__lastIncome = income;
    corpCard.style.display = "block";
    emiCard.style.display = "block";
    renderTier(tier, income);

    const suggestedAmount = Math.min(cost, tier.maxAmount);
    document.getElementById("loanAmount").value = suggestedAmount;
    document.getElementById("tenureYears").value = Math.min(5, tier.maxTenureYears);
  } else {
    window.__lastTier = null;
    corpCard.style.display = "none";
    emiCard.style.display = "none";
  }

  document.getElementById("eligibleSchemesSection").scrollIntoView({ behavior: "smooth", block: "start" });
});

function renderEligibleSchemes(user, eligible) {
  const section = document.getElementById("eligibleSchemesSection");
  let html = `
    <div class="eligible-summary">${eligible.length} ${t("eligibleTitle")}</div>
    <div class="eligible-sub">${t("eligibleSub")}</div>
  `;

  if (eligible.length === 0) {
    html += `<div class="no-schemes">${t("noEligible")}</div>`;
  } else {
    eligible.forEach(s => {
      html += `
        <div class="scheme">
          <div class="scheme-head">
            <span class="scheme-name">${s.name}</span>
            <div class="scheme-badges">
              <span class="badge-level ${s.level}">${s.level === "central" ? t("central") : t("state")}</span>
              <span class="badge-benefit">${s.benefit}</span>
            </div>
          </div>
          <div class="scheme-desc">${s.description}</div>
          <div class="scheme-apply"><a href="${s.applyUrl}" target="_blank" rel="noopener">${t("visitPortal")}</a></div>
        </div>
      `;
    });
  }
  section.innerHTML = html;
}

function renderTier(tier, income) {
  const box = document.getElementById("tierResult");
  box.classList.add("show");
  const warn = income > 500000
    ? `<div class="warn-box" style="display:block;">${t("incomeWarnCorp")}</div>`
    : "";
  box.innerHTML = `
    <div class="result-label">${t("recommended")} — ${tier.corp.shortName} (${tier.corp.fullName[LANG]})</div>
    <div class="tier-name">${tier.name[LANG]}</div>
    <div class="tier-desc">${tier.desc[LANG]}</div>
    <div class="tier-stats">
      <div class="stat"><span class="stat-num">${fmt(tier.maxAmount)}</span><span class="stat-label">${LANG === "en" ? "Maximum loan" : "अधिकतम ऋण"}</span></div>
      <div class="stat"><span class="stat-num">${tier.rate}%</span><span class="stat-label">${t("rateLine")}</span></div>
      <div class="stat"><span class="stat-num">${tier.moratoriumMonths} ${LANG === "en" ? "mo" : "माह"}</span><span class="stat-label">${t("moratoriumLine")}</span></div>
      <div class="stat"><span class="stat-num">${tier.subsidyPct}%</span><span class="stat-label">${t("subsidyLine")}</span></div>
    </div>
    ${warn}
  `;
  document.getElementById("emiTitle").textContent = t("emiTitle");
  document.getElementById("emiCalcBtn").textContent = t("calcBtn");
}

// ---------- EMI CALCULATOR ----------
document.getElementById("emiForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const tier = window.__lastTier;
  if (!tier) return;

  let amount = Number(document.getElementById("loanAmount").value);
  let years = Number(document.getElementById("tenureYears").value);

  amount = Math.min(amount, tier.maxAmount);
  years = Math.min(Math.max(years, 1), tier.maxTenureYears);

  const emi = calcEMI(amount, tier.rate, years);
  window.__lastEMI = emi;
  window.__lastAmount = amount;
  window.__lastYears = years;

  renderEMI(emi, tier, amount, years);
  document.getElementById("emiResult").classList.add("show");

  showPartners(tier);
});

function renderEMI(emi, tier, amount, years) {
  amount = amount || window.__lastAmount;
  years = years || window.__lastYears;
  const box = document.getElementById("emiResult");
  box.innerHTML = `
    <div class="emi-amount">${fmt(emi)}<span class="emi-permonth">/${LANG === "en" ? "month" : "माह"}</span></div>
    <div class="emi-detail">${fmt(amount)} ${LANG === "en" ? "over" : "पर,"} ${years} ${LANG === "en" ? "years at" : "वर्ष,"} ${tier.rate}% ${LANG === "en" ? "p.a." : "प्रति वर्ष"}</div>
    <div class="emi-moratorium">${LANG === "en" ? `First EMI due after the ${tier.moratoriumMonths}-month moratorium period.` : `पहली EMI ${tier.moratoriumMonths} माह की अधिस्थगन अवधि के बाद देय होगी।`}</div>
  `;
}

// ---------- PARTNER LOCATOR ----------
function showPartners(tier) {
  const coords = getUserCoords();
  if (!coords) return;

  const allEligible = PARTNERS.filter(p => p.handles.includes(tier.id));
  const excludedCount = allEligible.filter(p => p.npaFlag).length;
  const partners = findPartners(tier.id, coords.lat, coords.lng, 5);

  window.__lastPartners = partners;
  window.__lastExcluded = excludedCount;

  renderPartners(partners, excludedCount, tier);
  document.getElementById("partnersSection").classList.add("show");
  document.getElementById("partnersSection").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPartners(partners, excludedCount, tier) {
  const section = document.getElementById("partnersSection");
  const typeLabel = { SCA: "State Channelizing Agency", PSB: "Public Sector Bank", RRB: "Regional Rural Bank", "NBFC-MFI": "NBFC-MFI" };
  const usingGPS = !!window.__userCoords;

  let html = `
    <h2>${t("partnersTitle")} — ${tier.corp.shortName}</h2>
    <p class="partners-sub">${t("partnersSub")}</p>
    <p class="partners-sub" style="margin-top:4px;font-weight:600;">${usingGPS ? "📍 " + t("usingGPSNote") : t("usingCityNote")}</p>
  `;

  if (excludedCount > 0) {
    html += `<div class="npa-note">${excludedCount} ${t("npaExcluded")}</div>`;
  }

  if (partners.length === 0) {
    html += `<div class="no-partners">${t("noPartners")}</div>`;
  } else {
    html += `<div class="partner-list">`;
    partners.forEach(p => {
      html += `
        <div class="partner">
          <div class="partner-head">
            <span class="partner-name">${p.name}</span>
            <span class="partner-type">${p.type}</span>
          </div>
          <div class="partner-meta">${typeLabel[p.type]} · ${p.city}, ${p.state} · ${p.distance.toFixed(0)} km ${t("distance")}</div>
        </div>
      `;
    });
    html += `</div>`;
  }

  section.innerHTML = html;
}
