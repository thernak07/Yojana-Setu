// Pure client-side fallback — runs with zero network dependency so a demo
// never dies if the backend/AI is unreachable. Matches against the same
// curated, sourced scheme database the server uses (data/schemes.json),
// so even the offline path shows real schemes, not placeholders.

import schemesData from './data/schemes.json';

const SCHEMES = schemesData.schemes;
const LAST_VERIFIED = schemesData.lastVerified;

export function stripMd(t) {
  return String(t || '')
    .replace(/```[a-z]*\n?/gi, '').replace(/`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/__([^_]+)__/g, '$1')
    .replace(/(^|\s)\*([^*\n]+)\*/g, '$1$2')
    .replace(/^\s*[#>]+\s*/gm, '').replace(/^\s*[-*•]\s+/gm, '');
}

export function findScheme(name) {
  if (!name) return null;
  const n = String(name).toLowerCase();
  return SCHEMES.find((s) => s.name.toLowerCase() === n) || SCHEMES.find((s) => n.includes(s.id) || s.name.toLowerCase().includes(n)) || null;
}

const ARTISAN_KEYWORDS = /\b(potter|weav|blacksmith|carpenter|tailor|cobbler|mason|artisan|craft|handloom|goldsmith|barber|embroider)/i;

function categoryTags(profile) {
  const tags = new Set(['universal']);
  const cat = String(profile.category || '').toLowerCase();
  if (/\bsc\b/.test(cat)) tags.add('sc');
  if (/\bst\b/.test(cat)) tags.add('st');
  if (/\bobc\b/.test(cat)) tags.add('obc');
  if (/safai/.test(cat)) tags.add('safai_karamchari');
  if (String(profile.gender || '').toLowerCase() === 'woman') tags.add('women');
  if (/trans/.test(String(profile.gender || '').toLowerCase())) tags.add('transgender');
  if (profile.disability) tags.add('pwd');
  if (ARTISAN_KEYWORDS.test(String(profile.sector || ''))) tags.add('artisan');
  return tags;
}

// Fixed base scores so universal schemes lead, per the design's ranking
// philosophy — reserved-category schemes score high only when they apply.
const BASE_FIT = { mudra: 84, pmegp: 76, cgtmse: 71, 'pm-vishwakarma': 68, sisfs: 55 };

function criteriaFor(scheme, profile) {
  return scheme.eligibility.slice(0, 3).map((label) => {
    const l = label.toLowerCase();
    let state = 'unknown';
    if (/age/.test(l) && profile.age) state = 'met';
    else if (/(income|family income)/.test(l) && profile.income) state = 'met';
    else if (/(caste|sc\/st|category|obc|scheduled)/.test(l) && profile.category) state = 'met';
    else if (/registration|udyam/.test(l) && profile.registered) state = 'met';
    else if (/disab/.test(l) && profile.disability) state = 'met';
    else if (/(greenfield|new unit|first-time)/.test(l)) state = 'unknown';
    return { label, state };
  });
}

function buildOfflineMatches(profile) {
  const tags = categoryTags(profile);
  const relevant = SCHEMES.filter((s) => s.categories.some((c) => tags.has(c)));

  const scored = relevant.map((s) => {
    const isUniversal = s.categories.includes('universal') && s.categories.length === 1;
    const base = BASE_FIT[s.id] ?? (isUniversal ? 60 : 78);
    return { s, fit: base };
  });

  scored.sort((a, b) => b.fit - a.fit);

  return scored.slice(0, 6).map(({ s, fit }) => ({
    name: s.name,
    agency: s.agency,
    amount: s.amount,
    deadline: s.deadline,
    fit,
    status: fit >= 78 ? 'likely' : fit >= 60 ? 'needs_info' : 'needs_info',
    confidence: 'medium',
    confidence_note: `Curated from ${s.sourceTitle}, verified ${LAST_VERIFIED} — confirm current limits with the agency.`,
    criteria: criteriaFor(s, profile),
    sourceUrl: s.sourceUrl,
  }));
}

export function offlineReply(lastUserText, profile) {
  const p = { ...profile };
  const t = (lastUserText || '').toLowerCase();
  if (/lakh|crore|thousand|₹|\d{4,}/.test(t) && !p.capital) {
    p.capital = (t.match(/[^.!?]*(?:lakh|crore|thousand|₹|\d{4,})[^.!?]*/) || [t])[0].trim();
  }
  if (/\b(sc|st|obc|general|none)\b/.test(t) && !p.category) {
    p.category = (t.match(/\b(sc|st|obc|general|none)\b/) || [])[0];
  }
  if (/\b(woman|women|female|mahila)\b/.test(t)) p.gender = 'woman';
  if (/\btrans(gender)?\b/.test(t)) p.gender = 'transgender';
  if (/\b(disab|divyang|handicap)/.test(t)) p.disability = 'yes';
  if (!p.sector) p.sector = t.slice(0, 44);

  const matches = buildOfflineMatches(p);

  const question = !p.capital
    ? { en: 'How much money do you need to get going? A rough figure is fine.', hi: 'शुरुआत के लिए कितनी राशि चाहिए? अनुमानित आंकड़ा भी ठीक है।' }
    : !p.state
    ? { en: 'Which state are you in? Several schemes are run by the state government.', hi: 'आप किस राज्य में हैं? कई योजनाएं राज्य सरकार चलाती है।' }
    : !p.category
    ? { en: 'This part is optional — do you belong to SC, ST, OBC or a Safai Karamchari family? It only unlocks extra routes; nothing is lost if not.', hi: 'यह वैकल्पिक है — क्या आप SC, ST, OBC या सफाई कर्मचारी परिवार से हैं? इससे सिर्फ़ अतिरिक्त योजनाएं खुलती हैं, कुछ खोता नहीं।' }
    : { en: 'Noted. Open any scheme on the right to see its rules, documents and how to apply.', hi: 'नोट कर लिया। दाईं ओर किसी भी योजना को खोलकर नियम, दस्तावेज़ और आवेदन प्रक्रिया देखें।' };

  return { profile: p, matches, question };
}

const HINT_POOL = {
  en: { capital: ['About ₹2 lakh', '₹15 lakh'], state: ['I am in Bihar'], category: ['None of these categories', 'OBC'], registered: ['Not registered yet'], why: 'Why did the top one drop?' },
  hi: { capital: ['लगभग ₹2 लाख', '₹15 लाख'], state: ['मैं बिहार में हूं'], category: ['इनमें से कोई नहीं', 'OBC'], registered: ['अभी पंजीकृत नहीं'], why: 'सबसे ऊपर वाली योजना क्यों घटी?' },
};

export function suggestHints(profile, matchesLen, lang) {
  const p = profile;
  const pool = HINT_POOL[lang] || HINT_POOL.en;
  const out = [];
  if (!p.capital) out.push(...pool.capital);
  if (!p.state) out.push(...pool.state);
  if (!p.category) out.push(...pool.category);
  if (!p.registered) out.push(...pool.registered);
  if (matchesLen) out.push(pool.why);
  return out.slice(0, 3);
}

export function offlinePanel(kind, scheme, profile, lang) {
  const curated = findScheme(scheme.name);
  const cautionSuffix = lang === 'hi'
    ? ` (क्यूरेटेड डेटा, स्रोत: ${curated?.sourceUrl || 'एजेंसी पोर्टल'}, सत्यापित ${LAST_VERIFIED})`
    : ` (curated data, source: ${curated?.sourceUrl || 'agency portal'}, verified ${LAST_VERIFIED})`;

  if (kind === 'draft') {
    return {
      fields: [
        { label: 'Applicant name', value: '[your full name]' }, { label: 'Enterprise name', value: '[enterprise name]' },
        { label: 'Scheme applied for', value: scheme.name }, { label: 'Implementing agency', value: scheme.agency },
        { label: 'Project cost', value: String(profile.capital || '[amount]') },
        { label: 'Own contribution', value: '[10% of project cost]' }, { label: 'Loan requested', value: '[amount]' },
        { label: 'State / district', value: String(profile.state || '[state]') },
        { label: 'Category', value: String(profile.category || 'General') },
        { label: 'Udyam registration no.', value: '[if registered]' },
      ],
      letter: `To\nThe Branch Manager\n[Bank / ${scheme.agency}]\n\nSubject: Application under ${scheme.name}\n\nSir/Madam,\n\nI wish to set up [enterprise name] at [address]. The unit will [describe the work in one line], serving [who your customers are]. I have [experience / training] in this trade.\n\nThe total project cost is [amount], of which I will contribute [amount] from my own savings. I request assistance of [amount] under ${scheme.name}. The unit is expected to generate a monthly turnover of about [amount] from month [n], which comfortably covers the proposed instalment.\n\nAll supporting documents are enclosed. I request you to consider my application.\n\nYours faithfully,\n[Name]\n[Phone] · [Address]`,
      caution: (lang === 'hi'
        ? 'यह ऑफ़लाइन टेम्पलेट से बना है। जमा करने से पहले हर [ ] वाली जगह भरें और एजेंसी से मौजूदा सीमाएं जांच लें।'
        : 'Generated offline from a template. Replace every bracketed placeholder and confirm the current limits with the agency before submitting.') + cautionSuffix,
      sources: curated ? [{ title: curated.sourceTitle, url: curated.sourceUrl }] : [],
    };
  }
  if (kind === 'docs') {
    return {
      documents: curated
        ? curated.documents.map((label) => ({ label, note: lang === 'hi' ? 'स्व-सत्यापित प्रति रखें' : 'Keep a self-attested copy' }))
        : [
            { label: 'Aadhaar card', note: 'Identity and address proof' },
            { label: 'PAN card', note: 'Income Tax Department' },
            { label: 'Project report / cost estimate', note: 'Machinery quotations, working capital estimate' },
            { label: 'Bank statement (6 months)', note: 'Your bank branch' },
          ],
      caution: (lang === 'hi' ? 'यह एक संकेतात्मक सूची है। शाखा या एजेंसी अधिक दस्तावेज़ मांग सकती है।' : 'Indicative list. The branch or agency may ask for more.') + cautionSuffix,
      sources: curated ? [{ title: curated.sourceTitle, url: curated.sourceUrl }] : [],
    };
  }
  if (curated) {
    return {
      summary: `${curated.name} is administered by ${curated.agency}. Benefit: ${curated.amount}.`,
      facts: [
        { label: 'Benefit', value: curated.amount },
        { label: 'Interest / terms', value: curated.interest || '—' },
        { label: 'Deadline', value: curated.deadline },
        { label: 'Agency', value: curated.agency },
      ],
      eligibility: criteriaFor(curated, profile).map((c) => ({ label: c.label, state: c.state, note: '' })),
      documents: curated.documents,
      steps: curated.howToApply,
      caution: (lang === 'hi' ? `क्यूरेटेड डेटा, ${LAST_VERIFIED} में सत्यापित। जमा करने से पहले एजेंसी से मौजूदा शर्तें ज़रूर जांचें।` : `Curated data, verified ${LAST_VERIFIED}. Confirm current terms with the agency before you apply.`),
      sources: [{ title: curated.sourceTitle, url: curated.sourceUrl }],
    };
  }
  return {
    summary: `${scheme.name} is administered by ${scheme.agency}. Benefit: ${scheme.amount || 'see portal'}.`,
    facts: [{ label: 'Benefit', value: scheme.amount || '—' }, { label: 'Deadline', value: scheme.deadline || 'Rolling' }, { label: 'Agency', value: scheme.agency }],
    eligibility: (scheme.criteria || []).map((c) => ({ label: c.label, state: c.state, note: '' })),
    documents: ['Aadhaar', 'PAN', 'Project report', 'Bank statement'],
    steps: ['Keep your documents ready', 'Apply on the scheme portal or at a bank branch', 'Track the application and respond to queries'],
    caution: lang === 'hi' ? 'ऑफ़लाइन सारांश। कार्यान्वयन एजेंसी से मौजूदा शर्तें ज़रूर जांचें।' : 'Offline summary. Verify current terms with the implementing agency.',
    sources: [],
  };
}
