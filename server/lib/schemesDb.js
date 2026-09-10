import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(path.join(__dirname, '..', 'data', 'schemes.json'), 'utf-8');
const DB = JSON.parse(raw);

export const schemes = DB.schemes;
export const lastVerified = DB.lastVerified;

export function schemeNames() {
  return schemes.map((s) => s.name);
}

export function findScheme(name) {
  if (!name) return null;
  const n = String(name).toLowerCase();
  return schemes.find((s) => s.name.toLowerCase() === n || n.includes(s.id) || s.name.toLowerCase().includes(n)) || null;
}

// Renders the curated database as compact, readable text for the model's
// context — this is treated as the primary source of truth, verified
// against official portals as of `lastVerified` (not live, but real).
export function schemesContextBlock() {
  const lines = schemes.map((s) => {
    const elig = s.eligibility.join('; ');
    return `- ${s.name} | Agency: ${s.agency} | Categories: ${s.categories.join(', ')} | Amount: ${s.amount} | Eligibility: ${elig} | Source: ${s.sourceUrl}`;
  });
  return `SCHEME DATABASE (curated from official government sources, last verified ${lastVerified} — this is real, checked data, more reliable than your memory. Use these exact names and agencies when a scheme below matches. This list is NOT exhaustive — state-specific and newly announced schemes may exist beyond it; use RESEARCH CONTEXT if present to find those too):\n${lines.join('\n')}`;
}

export function schemeFactsBlock(scheme) {
  if (!scheme) return '';
  return `CURATED FACTS for "${scheme.name}" (verified ${lastVerified}, source: ${scheme.sourceUrl}):
Agency: ${scheme.agency}
Amount: ${scheme.amount}
Interest/terms: ${scheme.interest || 'n/a'}
Eligibility: ${scheme.eligibility.join('; ')}
Documents: ${scheme.documents.join(', ')}
How to apply: ${scheme.howToApply.join(' → ')}`;
}
