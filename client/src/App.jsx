import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Landing from './components/Landing.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import MatchesRail from './components/MatchesRail.jsx';
import SchemePanel from './components/SchemePanel.jsx';
import { makeT } from './i18n.js';
import { fetchChat, fetchPanel } from './api.js';
import { stripMd, offlineReply, suggestHints, offlinePanel } from './offlineEngine.js';
import { speechSupported, createRecognizer, speak, stopSpeaking } from './speech.js';

const FIELD_KEYS = ['sector', 'capital', 'state', 'category', 'gender', 'age', 'income', 'registered', 'disability'];

const DEMO = {
  en: [
    'I want to start a tailoring unit but I have no collateral',
    'About 3 lakh. I am in Nashik, Maharashtra.',
    'I am a woman, 34 years old. Not registered yet.',
  ],
  hi: [
    'मुझे सिलाई का काम शुरू करना है पर मेरे पास गिरवी रखने को कुछ नहीं है',
    'लगभग 3 लाख। मैं नासिक, महाराष्ट्र में हूं।',
    'मैं एक महिला हूं, 34 साल की। अभी पंजीकृत नहीं हूं।',
  ],
};

export default function App() {
  const [view, setView] = useState('landing');
  const [lang, setLang] = useState('en');
  const [ttsOn, setTtsOn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const [thinkLabel, setThinkLabel] = useState('Thinking');
  const [listening, setListening] = useState(false);
  const [profile, setProfile] = useState({});
  const [matches, setMatches] = useState([]);
  const [sources, setSources] = useState([]);
  const [hints, setHints] = useState([]);
  const [engine, setEngine] = useState('checking');
  const [panel, setPanel] = useState(null);
  const [panelTab, setPanelTab] = useState(0);
  const [panelLoading, setPanelLoading] = useState(false);
  const [panelData, setPanelData] = useState(null);
  const [docs, setDocs] = useState({});

  const t = makeT(lang);
  const scrollRef = useRef(null);
  const turnsRef = useRef([]);
  const timersRef = useRef([]);
  const stageIntervalRef = useRef(null);
  const recognizerRef = useRef(null);
  const langRef = useRef(lang);
  const ttsOnRef = useRef(ttsOn);
  langRef.current = lang;
  ttsOnRef.current = ttsOn;

  useEffect(() => {
    fetch('/api/health').then((r) => r.json()).then((d) => setEngine(d.hasKey ? 'ai' : 'offline')).catch(() => setEngine('offline'));
    return () => {
      timersRef.current.forEach(clearTimeout);
      if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking]);

  function later(fn, ms) {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }

  function stageLabels(labels) {
    if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
    let i = 0;
    setThinkLabel(labels[0]);
    stageIntervalRef.current = setInterval(() => {
      i = Math.min(labels.length - 1, i + 1);
      setThinkLabel(labels[i]);
      if (i === labels.length - 1) { clearInterval(stageIntervalRef.current); stageIntervalRef.current = null; }
    }, 2600);
  }

  function stream(raw, onDone) {
    const full = stripMd(raw);
    const key = 'b' + Date.now() + Math.random();
    setMessages((s) => [...s, { key, isBot: true, text: '', streaming: true }]);
    let i = 0;
    const tick = () => {
      i = Math.min(full.length, i + 3);
      const done = i >= full.length;
      setMessages((s) => s.map((m) => (m.key === key ? { ...m, text: full.slice(0, i), streaming: !done } : m)));
      if (!done) later(tick, 16);
      else if (onDone) onDone(full);
    };
    later(tick, 30);
  }

  function note(text) {
    setMessages((s) => [...s, { key: 'n' + Date.now(), isNote: true, text }]);
  }

  function speakIfOn(text) {
    if (ttsOnRef.current) speak(text, langRef.current);
  }

  async function push(text) {
    const clean = (text || '').trim();
    if (!clean || thinking) return;
    setMessages((s) => [...s, { key: 'u' + Date.now(), isUser: true, text: clean }]);
    setDraft('');
    setHints([]);
    turnsRef.current.push({ role: 'user', content: clean });
    await ask(clean);
  }

  async function ask(lastUserText) {
    const known = Object.keys(profile).length;
    setThinking(true);
    stageLabels(
      known
        ? ['Reading your answer', 'Checking scheme rules', 'Re-ranking your matches', 'Almost there']
        : ['Reading your answer', 'Searching central and state schemes', 'Scoring eligibility', 'Almost there']
    );

    if (engine === 'offline') {
      later(() => runOfflineReply(lastUserText), 700);
      return;
    }

    try {
      const result = await fetchChat(turnsRef.current.slice(-14), profile, lang);
      const clean = stripMd((result.reply || '').trim()) || 'I have updated the ranking on the right. What else can you tell me?';
      turnsRef.current.push({ role: 'assistant', content: clean });
      const newProfile = result.profile || profile;
      setProfile(newProfile);
      if (Array.isArray(result.matches)) setMatches(result.matches.slice(0, 8));
      if (Array.isArray(result.sources)) setSources(result.sources.slice(0, 6));
      if (stageIntervalRef.current) { clearInterval(stageIntervalRef.current); stageIntervalRef.current = null; }
      setThinking(false);
      setHints(suggestHints(newProfile, (result.matches || matches).length, lang));
      setEngine('ai');
      stream(clean, speakIfOn);
    } catch (e) {
      if (stageIntervalRef.current) { clearInterval(stageIntervalRef.current); stageIntervalRef.current = null; }
      setThinking(false);
      if (engine !== 'offline') note(t('offlineSwitchedNote'));
      setEngine('offline');
      later(() => runOfflineReply(lastUserText), 400);
    }
  }

  function runOfflineReply(lastUserText) {
    const { profile: newProfile, matches: newMatches, question } = offlineReply(lastUserText, profile);
    setProfile(newProfile);
    setMatches(newMatches);
    const seen = new Set();
    setSources(newMatches.filter((m) => m.sourceUrl && !seen.has(m.sourceUrl) && seen.add(m.sourceUrl)).map((m) => ({ title: m.name, url: m.sourceUrl })));
    setThinking(false);
    setHints(suggestHints(newProfile, newMatches.length, lang));
    const q = question[lang] || question.en;
    turnsRef.current.push({ role: 'assistant', content: q });
    stream(q, speakIfOn);
  }

  async function openPanel(kind, scheme) {
    setPanel({ kind, scheme });
    setPanelTab(0);
    setPanelData(null);
    setPanelLoading(true);

    if (engine === 'offline') {
      later(() => { setPanelLoading(false); setPanelData(offlinePanel(kind, scheme, profile, lang)); }, 500);
      return;
    }
    try {
      const data = await fetchPanel(kind, scheme, profile, lang);
      setPanelLoading(false);
      setPanelData(data);
    } catch (e) {
      setPanelLoading(false);
      setPanelData(offlinePanel(kind, scheme, profile, lang));
    }
  }

  function closePanel() {
    setPanel(null);
    setPanelData(null);
  }

  function askWhy(scheme) {
    setView('app');
    const q = lang === 'hi'
      ? `बताइए ${scheme.name} को कितना स्कोर मिला — कौन-सी शर्तें पूरी हुईं, कौन-सी छूटीं और स्कोर बढ़ाने के लिए क्या चाहिए।`
      : `Explain how you scored ${scheme.name} — which criteria I meet, which I miss, and what would raise it.`;
    push(q);
  }

  function toggleDoc(label) {
    setDocs((s) => ({ ...s, [label]: !s[label] }));
  }

  function fieldChange(index, value) {
    setPanelData((d) => ({ ...d, fields: d.fields.map((f, i) => (i === index ? { ...f, value } : f)) }));
  }

  function letterChange(value) {
    setPanelData((d) => ({ ...d, letter: value }));
  }

  function resetChat() {
    turnsRef.current = [];
    setMessages([]);
    setProfile({});
    setMatches([]);
    setSources([]);
    setHints([]);
    setDraft('');
    setPanel(null);
    setDocs({});
  }

  function runDemo() {
    resetChat();
    setView('app');
    const script = DEMO[lang] || DEMO.en;
    script.forEach((line, i) => later(() => push(line), 400 + i * 5200));
  }

  function toggleVoice() {
    if (listening) {
      recognizerRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = createRecognizer({
      lang,
      onInterim: (text) => setDraft(text),
      onFinal: (text) => setDraft(text),
      onEnd: () => setListening(false),
      onError: () => setListening(false),
    });
    if (!rec) return;
    recognizerRef.current = rec;
    setListening(true);
    rec.start();
  }

  function editField(key) {
    const label = t('fieldLabels', key).toLowerCase();
    setDraft(lang === 'hi' ? `सुधार: मेरा ${label} है ` : `Correction: my ${label} is `);
  }

  const filled = FIELD_KEYS.filter((k) => profile[k] !== undefined && profile[k] !== '').length;
  const completion = Math.round((filled / FIELD_KEYS.length) * 100);
  const sortedMatches = [...matches].sort((a, b) => (b.fit || 0) - (a.fit || 0));

  return (
    <div style={{ position: 'relative', height: '100dvh', minHeight: 480, display: 'flex', flexDirection: 'column', background: '#0a0a0b', color: '#f4efe6', fontFamily: 'Manrope, system-ui, sans-serif', WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
      <Header
        t={t}
        onApp={view === 'app'}
        completion={completion}
        engine={engine}
        ttsOn={ttsOn}
        lang={lang}
        onGoLanding={() => { setView('landing'); setPanel(null); }}
        onNewChat={resetChat}
        onToggleLang={() => setLang((l) => (l === 'en' ? 'hi' : 'en'))}
        onToggleTts={() => { setTtsOn((v) => !v); stopSpeaking(); }}
      />

      {view === 'landing' && <Landing t={t} onGoApp={() => setView('app')} onRunDemo={runDemo} />}

      {view === 'app' && (
        <main style={{ position: 'relative', flex: '1 1 0', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, min(420px, 34%))', gridAutoRows: 'minmax(0, 1fr)', minHeight: 0, overflow: 'hidden' }}>
          <ChatPanel
            t={t}
            messages={messages}
            isEmpty={messages.length === 0}
            thinking={thinking}
            thinkingLabel={thinkLabel}
            draft={draft}
            placeholder={messages.length ? t('placeholderFilled') : t('placeholderEmpty')}
            listening={listening}
            scrollRef={scrollRef}
            onDraftChange={setDraft}
            onKeyDown={(e) => { if (e.key === 'Enter') push(draft); }}
            onSend={() => push(draft)}
            onToggleVoice={toggleVoice}
            onStarter={(text) => push(text)}
            hints={hints}
            hasHints={hints.length > 0 && !thinking}
            onHintClick={(text) => push(text)}
            speechSupported={speechSupported}
          />
          <MatchesRail
            t={t}
            profile={profile}
            fieldLabels={t('fieldLabels')}
            matches={sortedMatches}
            sources={sources}
            hasProfile={Object.keys(profile).length > 0}
            noMatches={sortedMatches.length === 0}
            onEditField={editField}
            onOpen={(s) => openPanel('detail', s)}
            onWhy={askWhy}
            onApply={(s) => openPanel('draft', s)}
          />

          {panel && (
            <SchemePanel
              t={t}
              panel={panel}
              panelData={panelData}
              panelLoading={panelLoading}
              panelTab={panelTab}
              docs={docs}
              onClose={closePanel}
              onSetTab={setPanelTab}
              onOpenPanel={openPanel}
              onAskWhy={(s) => { closePanel(); askWhy(s); }}
              onFieldChange={fieldChange}
              onLetterChange={letterChange}
              onToggleDoc={toggleDoc}
            />
          )}
        </main>
      )}
    </div>
  );
}
