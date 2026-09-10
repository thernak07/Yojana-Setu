import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt, PANEL_SYSTEM, PANEL_SYSTEM_HI } from './systemPrompt.js';
import { UPDATE_MATCHES_TOOL } from './tool.js';
import { groundedResearch, buildChatResearchQuery, buildSchemeResearchQuery } from './groundedSearch.js';
import { schemesContextBlock, schemeNames, schemeFactsBlock, findScheme } from './schemesDb.js';
import { buildPanelPrompt } from './panelPrompts.js';

const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

let client = null;
function getClient() {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');
  if (!client) client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client;
}

function toGeminiContents(turns) {
  return turns
    .filter((t) => t && t.content)
    .map((t) => ({ role: t.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(t.content) }] }));
}

function safeText(resp) {
  try {
    return (resp.text() || '').trim();
  } catch {
    return '';
  }
}

async function tryResearch(query) {
  try {
    return await groundedResearch(query);
  } catch (e) {
    console.warn('[grounded research]', e.message);
    return { text: '', sources: [] };
  }
}

export async function chatTurn({ turns, profile, lang }) {
  const curatedBlock = schemesContextBlock();
  const { text: researchText, sources } = await tryResearch(buildChatResearchQuery(turns, profile, schemeNames()));

  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: buildSystemPrompt(lang, curatedBlock, researchText),
  });

  const contents = toGeminiContents(turns);

  const first = await model.generateContent({
    contents,
    tools: [UPDATE_MATCHES_TOOL],
    toolConfig: { functionCallingConfig: { mode: 'AUTO' } },
    generationConfig: { maxOutputTokens: 1400 },
  });

  const firstResp = first.response;
  const calls = firstResp.functionCalls() || [];
  const call = calls.find((c) => c.name === 'update_matches');

  let newProfile = profile || {};
  let matches = null;
  let replyText = safeText(firstResp);

  if (call) {
    const args = call.args || {};
    newProfile = { ...(profile || {}), ...(args.profile || {}) };
    matches = Array.isArray(args.matches) ? args.matches : [];

    if (!replyText) {
      const second = await model.generateContent({
        contents: [
          ...contents,
          { role: 'model', parts: [{ functionCall: { name: call.name, args: call.args } }] },
          { role: 'function', parts: [{ functionResponse: { name: 'update_matches', response: { result: 'recorded' } } }] },
        ],
        toolConfig: { functionCallingConfig: { mode: 'NONE' } },
        generationConfig: { maxOutputTokens: 500 },
      });
      replyText = safeText(second.response);
    }
  }

  return {
    reply: replyText || 'I have updated the ranking on the right. What else can you tell me?',
    profile: newProfile,
    matches,
    sources,
    grounded: !!researchText,
  };
}

export async function panelJSON({ kind, scheme, profile, lang }) {
  const curated = findScheme(scheme?.name);
  const curatedFacts = schemeFactsBlock(curated);
  const { text: researchText, sources } = await tryResearch(buildSchemeResearchQuery(scheme, profile));

  const combinedResearch = [curatedFacts, researchText].filter(Boolean).join('\n\n');
  const prompt = buildPanelPrompt(kind, scheme, profile, combinedResearch);

  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: lang === 'hi' ? PANEL_SYSTEM_HI : PANEL_SYSTEM,
  });

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 1800, responseMimeType: 'application/json' },
  });

  const raw = safeText(result.response);
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Model did not return JSON');
  const data = JSON.parse(match[0]);

  const allSources = [...(curated ? [{ title: curated.sourceTitle, url: curated.sourceUrl }] : []), ...sources];
  return { ...data, sources: allSources, grounded: !!researchText || !!curated };
}
