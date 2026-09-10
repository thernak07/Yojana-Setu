// Thin wrappers around the browser's Web Speech API. Both are best-effort:
// unsupported browsers just no-op rather than throwing.

const SpeechRecognitionImpl = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition)
  : null;

export const speechSupported = !!SpeechRecognitionImpl;
export const ttsSupported = typeof window !== 'undefined' && !!window.speechSynthesis;

export function createRecognizer({ lang, onInterim, onFinal, onEnd, onError }) {
  if (!SpeechRecognitionImpl) return null;
  const rec = new SpeechRecognitionImpl();
  rec.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  rec.continuous = false;
  rec.interimResults = true;

  rec.onresult = (e) => {
    let interim = '';
    let final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) final += r[0].transcript;
      else interim += r[0].transcript;
    }
    if (final) onFinal?.(final.trim());
    else if (interim) onInterim?.(interim.trim());
  };
  rec.onend = () => onEnd?.();
  rec.onerror = (e) => onError?.(e.error);
  return rec;
}

let voicesCache = [];
if (ttsSupported) {
  const load = () => { voicesCache = window.speechSynthesis.getVoices(); };
  load();
  window.speechSynthesis.onvoiceschanged = load;
}

export function speak(text, lang) {
  if (!ttsSupported || !text) return;
  const targetLang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = targetLang;
  const voice = voicesCache.find((v) => v.lang === targetLang) || voicesCache.find((v) => v.lang?.startsWith(lang === 'hi' ? 'hi' : 'en'));
  if (voice) utter.voice = voice;
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (ttsSupported) window.speechSynthesis.cancel();
}
