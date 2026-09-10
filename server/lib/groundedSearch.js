// Calls the Gemini API directly over REST with the built-in Google Search
// grounding tool, so answers are backed by a real, current web search
// instead of only the model's training-time memory. Uses the same
// GEMINI_API_KEY — no extra service or key needed.

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export async function groundedResearch(query) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const res = await fetch(`${API_BASE}/${MODEL_NAME}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: query }] }],
      tools: [{ google_search: {} }],
      generationConfig: { maxOutputTokens: 1500, temperature: 0.3 },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Grounded search failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const candidate = data.candidates?.[0];
  const text = (candidate?.content?.parts || []).map((p) => p.text || '').join('\n').trim();

  const chunks = candidate?.groundingMetadata?.groundingChunks || [];
  const seen = new Set();
  const sources = [];
  for (const c of chunks) {
    const web = c.web;
    if (web?.uri && !seen.has(web.uri)) {
      seen.add(web.uri);
      sources.push({ title: web.title || web.uri, url: web.uri });
    }
  }

  return { text, sources };
}

// Biased toward myscheme.gov.in — India's own official aggregator of
// ~4,700 central + state schemes — since that's the closest thing to a
// complete index. General web search is the fallback within the same
// query. `curatedNames` are schemes already covered by our own database,
// so the search focuses on gaps: state-specific or newly announced schemes.
export function buildChatResearchQuery(turns, profile, curatedNames = []) {
  const lastUser = [...turns].reverse().find((t) => t.role === 'user');
  const bits = [];
  if (profile?.sector) bits.push(`business: ${profile.sector}`);
  if (profile?.state) bits.push(`state: ${profile.state}`);
  if (profile?.category) bits.push(`category: ${profile.category}`);
  if (profile?.capital) bits.push(`funding need: ${profile.capital}`);
  if (profile?.gender) bits.push(`gender: ${profile.gender}`);
  return `site:myscheme.gov.in OR general web search: find Indian government entrepreneurship schemes (central AND state-level) relevant to this applicant.
Applicant said: "${lastUser?.content || ''}". Known profile: ${bits.join('; ') || 'not much yet'}.

I already have current details for these schemes, so DO NOT re-report them — only report schemes beyond this list: ${curatedNames.join(', ')}.

Focus on: (a) state-government schemes for the applicant's state if known, (b) any scheme on myscheme.gov.in matching this profile that isn't in my list above, (c) any newly announced central scheme from ${new Date().getFullYear()} not in my list.
For each NEW scheme found, give: exact name, implementing ministry/agency, loan or subsidy amount, key eligibility conditions, application deadline (or "rolling"), and the official portal URL. Prefer official .gov.in / nic.in sources. If nothing new is found beyond my list, say so plainly.`;
}

export function buildSchemeResearchQuery(scheme, profile) {
  return `site:myscheme.gov.in OR general web search: find the current, official details of the Indian government scheme "${scheme?.name || ''}" (${scheme?.agency || 'agency unknown'}). Give: benefit / loan / subsidy amount, interest rate if any, eligibility criteria, required documents, step-by-step application process, deadline, and the official government portal URL. Prefer official .gov.in / nic.in sources. Applicant context: ${JSON.stringify(profile || {})}.`;
}
