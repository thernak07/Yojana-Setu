export function buildPanelPrompt(kind, scheme, profile, researchText) {
  const p = JSON.stringify(profile || {});
  const name = scheme?.name || '';
  const agency = scheme?.agency || '';
  const research = researchText
    ? `\n\nRESEARCH CONTEXT (from a live web search just now — prefer these facts over memory; if something below isn't covered by it, say so in "caution"):\n${researchText}`
    : '\n\nNo live search results were available — draw on memory only, and say so in "caution".';

  if (kind === 'draft') {
    return `Draft an application for "${name}" (${agency}) for this applicant: ${p}.
Return ONLY JSON, shape:
{"fields":[{"label":"Applicant name","value":""},{"label":"Enterprise name","value":""}],"letter":"a printable business-case letter addressed to the branch manager or agency, 220-300 words, first person, plain English, with placeholders in [square brackets] for anything unknown","caution":"what the applicant must fill or verify"}
Include 8-12 fields covering identity, enterprise, project cost, means of finance and category.${research}`;
  }
  if (kind === 'docs') {
    return `List the documents needed to apply for "${name}" (${agency}) given this applicant: ${p}.
Return ONLY JSON, shape: {"documents":[{"label":"","note":"where to get it or who issues it"}],"caution":"..."}${research}`;
  }
  return `Scheme: "${name}" (${agency}). Applicant profile JSON: ${p}.
Return ONLY JSON, no prose, shape:
{"summary":"2 sentences plain English","facts":[{"label":"Benefit","value":""},{"label":"Interest","value":""},{"label":"Tenure","value":""},{"label":"Agency","value":""}],"eligibility":[{"label":"","state":"met|missed|unknown","note":"why, referencing the profile"}],"documents":["..."],"steps":["how to apply, in order"],"caution":"what may have changed or must be verified with the agency"}${research}`;
}
