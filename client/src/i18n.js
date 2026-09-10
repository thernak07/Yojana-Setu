const STR = {
  brandName: { en: 'Setu', hi: 'सेतु' },
  brandSub: { en: 'Ministry of Social Justice & Empowerment', hi: 'सामाजिक न्याय और अधिकारिता मंत्रालय' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल' },
  newChat: { en: 'New chat', hi: 'नई बातचीत' },
  langToggle: { en: 'हिं · EN', hi: 'EN · हिं' },
  ttsOn: { en: '🔊 Reading aloud', hi: '🔊 आवाज़ चालू' },
  ttsOff: { en: '🔈 Read aloud', hi: '🔈 आवाज़' },

  engineLive: { en: 'Live AI', hi: 'लाइव AI' },
  engineOffline: { en: 'Offline rules', hi: 'ऑफ़लाइन नियम' },
  engineStarting: { en: 'Starting', hi: 'शुरू हो रहा है' },
  engineTitleLive: { en: 'Answers and rankings are generated live by a language model', hi: 'उत्तर और रैंकिंग एक भाषा मॉडल द्वारा लाइव तैयार की जाती है' },
  engineTitleOffline: { en: 'Falling back to the built-in rule engine', hi: 'अंतर्निर्मित नियम इंजन का उपयोग किया जा रहा है' },

  heroBadge: { en: 'AI scheme matching · open to every entrepreneur', hi: 'AI योजना मिलान · हर उद्यमी के लिए खुला' },
  heroTitle: { en: 'Say what you want to build.\nSetu finds the scheme.', hi: 'बताइए आप क्या शुरू करना चाहते हैं।\nसेतु योजना ढूंढ देगा।' },
  heroBody: {
    en: 'India runs hundreds of credit, subsidy and skilling schemes across ministries. Almost nobody can name the three that fit them. Setu asks a handful of plain questions and ranks every route you qualify for — universal schemes first, with SC, ST, OBC, Divyangjan, Safai Karamchari, transgender and women’s routes layered on where they apply.',
    hi: 'भारत में अलग-अलग मंत्रालयों की सैकड़ों ऋण, सब्सिडी और कौशल योजनाएं चलती हैं। शायद ही कोई उन तीन योजनाओं का नाम बता पाए जो उस पर लागू होती हैं। सेतु कुछ सरल सवाल पूछता है और आपकी हर योग्य योजना को क्रम में दिखाता है — पहले सभी के लिए खुली योजनाएं, फिर जहां लागू हो वहां SC, ST, OBC, दिव्यांगजन, सफाई कर्मचारी, ट्रांसजेंडर और महिला श्रेणियों की अतिरिक्त योजनाएं।',
  },
  startMatching: { en: 'Start matching  →', hi: 'मिलान शुरू करें  →' },
  watchDemo: { en: 'Watch a 30-second demo', hi: '30 सेकंड का डेमो देखें' },

  howItWorksHeading: { en: 'How it works', hi: 'यह कैसे काम करता है' },
  howItWorks: {
    en: [
      { n: '01', title: 'Say it in your own words', body: 'No forms, no scheme names. “I want to start a tailoring unit” is enough to begin.' },
      { n: '02', title: 'One question at a time', body: 'The assistant asks only what changes the answer, and says which questions are optional.' },
      { n: '03', title: 'Ranked, with reasons', body: 'Every scheme shows a fit score, the criteria you meet, and the ones still unknown.' },
      { n: '04', title: 'Then it does the paperwork', body: 'Open any match for its rules, a document checklist, and a drafted application you can edit and print.' },
    ],
    hi: [
      { n: '01', title: 'अपने शब्दों में बताएं', body: 'न कोई फॉर्म, न योजना का नाम। "मुझे सिलाई का काम शुरू करना है" इतना काफी है।' },
      { n: '02', title: 'एक बार में एक सवाल', body: 'सहायक केवल वही पूछता है जिससे जवाब बदलता है, और बताता है कौन-से सवाल वैकल्पिक हैं।' },
      { n: '03', title: 'कारण सहित रैंकिंग', body: 'हर योजना में फिट स्कोर, पूरी हुई शर्तें और अनिश्चित शर्तें दिखती हैं।' },
      { n: '04', title: 'फिर कागज़ी काम भी', body: 'किसी भी योजना को खोलें — नियम, दस्तावेज़ सूची और एक तैयार आवेदन जिसे आप बदल और प्रिंट कर सकते हैं।' },
    ],
  },

  guardHeading: { en: 'Built to be checkable, not just confident', hi: 'भरोसेमंद ही नहीं, जांचने योग्य भी' },
  guardBody: {
    en: 'Scheme rules change and money is at stake, so the assistant never hands over a verdict alone.',
    hi: 'योजनाओं के नियम बदलते रहते हैं और पैसा दांव पर होता है, इसलिए सहायक कभी अकेला फैसला नहीं थोपता।',
  },
  guardrails: {
    en: [
      { title: 'Unknown is not failed', body: 'Anything you have not answered shows as “?” — it never counts against you.' },
      { title: 'Agency always named', body: 'Each match carries its implementing agency and ministry so you can verify it.' },
      { title: 'Confidence on the card', body: 'Where the assistant is unsure of a limit, the card says so and tells you to confirm.' },
      { title: 'Ask “why?” on anything', body: 'One tap makes the assistant defend a score, criterion by criterion.' },
    ],
    hi: [
      { title: 'अनिश्चित मतलब असफल नहीं', body: 'जो सवाल आपने नहीं भरा वह "?" दिखेगा — इससे आपका अंक कभी नहीं घटता।' },
      { title: 'एजेंसी हमेशा बताई जाती है', body: 'हर योजना के साथ उसकी कार्यान्वयन एजेंसी और मंत्रालय दिया जाता है ताकि आप जांच सकें।' },
      { title: 'कार्ड पर भरोसे का स्तर', body: 'जहां सहायक किसी सीमा को लेकर अनिश्चित है, कार्ड यह बताता है और पुष्टि करने को कहता है।' },
      { title: 'कहीं भी "क्यों" पूछें', body: 'एक टैप में सहायक हर शर्त के आधार पर अपना स्कोर समझाता है।' },
    ],
  },
  coverage: {
    en: ['Open to all', 'SC / ST', 'OBC', 'Divyangjan', 'Safai Karamcharis', 'Transgender persons', 'Women entrepreneurs', 'Denotified tribes', 'State MSME schemes'],
    hi: ['सभी के लिए', 'SC / ST', 'OBC', 'दिव्यांगजन', 'सफाई कर्मचारी', 'ट्रांसजेंडर व्यक्ति', 'महिला उद्यमी', 'विमुक्त जनजातियां', 'राज्य MSME योजनाएं'],
  },
  coversLabel: { en: 'Covers', hi: 'शामिल' },

  chatEmptyTitle: { en: 'What are you building?', hi: 'आप क्या शुरू करना चाहते हैं?' },
  chatEmptyBody: {
    en: 'Tell me in your own words — trade, town, how much you need. I’ll ask a few short questions and rank the schemes that fit.',
    hi: 'अपने शब्दों में बताएं — काम-धंधा, शहर, कितनी राशि चाहिए। मैं कुछ छोटे सवाल पूछूंगा और सही योजनाओं को क्रम में दिखाऊंगा।',
  },
  starters: {
    en: [
      'I want to start a tailoring unit but have no collateral',
      'I run a kirana shop and need ₹3 lakh to expand',
      'I am a potter — anything for artisans?',
      'Which schemes are open to everyone, no category needed?',
    ],
    hi: [
      'मुझे सिलाई का काम शुरू करना है पर मेरे पास गिरवी रखने को कुछ नहीं है',
      'मेरी किराना दुकान है, विस्तार के लिए ₹3 लाख चाहिए',
      'मैं कुम्हार हूं — कारीगरों के लिए कोई योजना?',
      'बिना किसी श्रेणी के, सबके लिए कौन-सी योजनाएं खुली हैं?',
    ],
  },
  placeholderEmpty: { en: 'e.g. I want to start a tailoring unit in Nashik', hi: 'जैसे: मुझे नासिक में सिलाई का काम शुरू करना है' },
  placeholderFilled: { en: 'Type your answer…', hi: 'अपना जवाब लिखें…' },
  tryLabel: { en: 'Try', hi: 'सुझाव' },
  send: { en: 'Send', hi: 'भेजें' },
  speakTitle: { en: 'Speak your answer', hi: 'बोलकर जवाब दें' },
  listeningNote: { en: 'Listening…', hi: 'सुन रहा हूं…' },
  composerDisclaimer: {
    en: 'Setu can be wrong about scheme rules — confirm final eligibility with the implementing agency before you pay any fee.',
    hi: 'सेतु योजना के नियमों में गलत हो सकता है — कोई भी शुल्क देने से पहले कार्यान्वयन एजेंसी से अंतिम पात्रता ज़रूर जांच लें।',
  },
  offlineSwitchedNote: {
    en: 'Live AI is unavailable right now, so Setu switched to its built-in rule engine. Matching still works.',
    hi: 'लाइव AI अभी उपलब्ध नहीं है, इसलिए सेतु अंतर्निर्मित नियम इंजन पर चला गया है। मिलान अभी भी काम करता है।',
  },

  sourcesLabel: { en: 'Sources', hi: 'स्रोत' },
  groundedTitle: { en: 'This answer draws on a curated, sourced scheme database — and live search for anything beyond it', hi: 'यह उत्तर एक सत्यापित योजना डेटाबेस और उससे बाहर की योजनाओं के लिए लाइव खोज पर आधारित है' },
  liveMatches: { en: 'Live matches', hi: 'लाइव मिलान' },
  rankedSuffix: { en: 'ranked', hi: 'रैंक की गईं' },
  nothingYet: { en: 'nothing yet', hi: 'अभी कुछ नहीं' },
  whatSetuKnows: { en: 'What Setu knows', hi: 'सेतु को अब तक पता है' },
  tapToCorrect: { en: 'tap to correct', hi: 'ठीक करने हेतु टैप करें' },
  noMatchesBody: {
    en: 'Schemes rank here as you answer — fit score, what you meet, what is missing, and how sure the assistant is.',
    hi: 'आपके जवाब देते ही यहां योजनाएं दिखेंगी — फिट स्कोर, पूरी हुई शर्तें, बाकी शर्तें और सहायक का भरोसा-स्तर।',
  },
  fieldLabels: {
    en: { sector: 'Work', capital: 'Needs', state: 'State', category: 'Category', gender: 'Identity', age: 'Age', income: 'Income', registered: 'Registered', disability: 'Disability' },
    hi: { sector: 'काम', capital: 'ज़रूरत', state: 'राज्य', category: 'श्रेणी', gender: 'पहचान', age: 'उम्र', income: 'आय', registered: 'पंजीकरण', disability: 'दिव्यांगता' },
  },
  statusLabels: {
    en: { eligible: 'Eligible', likely: 'Likely', needs_info: 'Needs more info', not_eligible: 'Not eligible' },
    hi: { eligible: 'पात्र', likely: 'संभावित', needs_info: 'अधिक जानकारी चाहिए', not_eligible: 'अपात्र' },
  },
  verifyWithAgency: { en: 'verify with agency', hi: 'एजेंसी से पुष्टि करें' },
  mediumConfidence: { en: 'medium confidence', hi: 'मध्यम भरोसा' },
  detailsBtn: { en: 'Details', hi: 'विवरण' },
  draftBtn: { en: 'Draft application', hi: 'आवेदन तैयार करें' },

  panelKind: {
    en: { detail: 'Scheme detail', draft: 'Application draft', docs: 'Document checklist' },
    hi: { detail: 'योजना विवरण', draft: 'आवेदन मसौदा', docs: 'दस्तावेज़ सूची' },
  },
  panelTabs: { en: ['Form data', 'Letter'], hi: ['फ़ॉर्म डेटा', 'पत्र'] },
  panelLoading: {
    en: { draft: 'Drafting your application…', docs: 'Building your checklist…', detail: 'Reading the scheme rules…' },
    hi: { draft: 'आपका आवेदन तैयार हो रहा है…', docs: 'आपकी सूची बन रही है…', detail: 'योजना के नियम पढ़े जा रहे हैं…' },
  },
  atAGlance: { en: 'At a glance', hi: 'एक नज़र में' },
  eligibilityHeading: { en: 'Eligibility, checked against your profile', hi: 'पात्रता, आपकी प्रोफ़ाइल के अनुसार' },
  howToApply: { en: 'How to apply', hi: 'आवेदन कैसे करें' },
  documents: { en: 'Documents', hi: 'दस्तावेज़' },
  verifyBeforeActing: { en: 'Verify before you act', hi: 'कार्रवाई से पहले पुष्टि करें' },
  formDataHeading: { en: 'Form data — edit anything', hi: 'फ़ॉर्म डेटा — कुछ भी बदलें' },
  letterHeading: { en: 'Business-case letter — print and carry', hi: 'व्यवसाय पत्र — प्रिंट करके साथ रखें' },
  collectThese: { en: 'Collect these', hi: 'ये एकत्र करें' },
  markReady: { en: 'Mark ready', hi: 'तैयार चिह्नित करें' },
  ready: { en: 'Ready', hi: 'तैयार' },
  keepCopy: { en: 'Keep a self-attested copy', hi: 'स्व-सत्यापित प्रति रखें' },

  actDraftApp: { en: 'Draft my application', hi: 'मेरा आवेदन तैयार करें' },
  actDocChecklist: { en: 'Document checklist', hi: 'दस्तावेज़ सूची' },
  actAskWhy: { en: 'Ask why this scored', hi: 'स्कोर का कारण पूछें' },
  actPrint: { en: 'Print / save as PDF', hi: 'प्रिंट / PDF सहेजें' },
  actBackToScheme: { en: 'Back to scheme', hi: 'योजना पर वापस जाएं' },

  offlineCaution: {
    en: 'Offline summary. Verify current terms with the implementing agency.',
    hi: 'ऑफ़लाइन सारांश। कार्यान्वयन एजेंसी से मौजूदा शर्तें ज़रूर जांचें।',
  },
  offlineCautionDraft: {
    en: 'Generated offline from a template. Replace every bracketed placeholder and confirm the current limits with the agency before submitting.',
    hi: 'यह ऑफ़लाइन टेम्पलेट से बना है। जमा करने से पहले हर [ ] वाली जगह भरें और एजेंसी से मौजूदा सीमाएं जांच लें।',
  },
  offlineCautionDocs: {
    en: 'Indicative list. The branch or agency may ask for more.',
    hi: 'यह एक संकेतात्मक सूची है। शाखा या एजेंसी अधिक दस्तावेज़ मांग सकती है।',
  },
};

export function makeT(lang) {
  return function t(key, sub) {
    const entry = STR[key];
    if (!entry) return key;
    const val = entry[lang] ?? entry.en;
    if (sub != null && typeof val === 'object' && !Array.isArray(val)) return val[sub] ?? entry.en?.[sub] ?? sub;
    return val;
  };
}

export default STR;
