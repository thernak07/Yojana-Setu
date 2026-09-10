import { Hover } from './Hover.jsx';

const markOf = (state) => (state === 'met' ? { mark: '✓', color: '#5ec27a' } : state === 'missed' ? { mark: '✕', color: '#d9663f' } : { mark: '?', color: '#7d766c' });

export default function SchemePanel({
  t, panel, panelData, panelLoading, panelTab, docs,
  onClose, onSetTab, onOpenPanel, onAskWhy, onFieldChange, onLetterChange, onToggleDoc,
}) {
  if (!panel) return null;
  const s = panel.scheme;
  const d = panelData || {};
  const kindLabel = t('panelKind', panel.kind);
  const panelTabsLabels = t('panelTabs');

  const docRows = (list) => (list || []).map((raw, i) => {
    const label = typeof raw === 'string' ? raw : raw.label;
    const note = typeof raw === 'string' ? t('keepCopy') : (raw.note || '');
    const have = !!docs[label];
    return { key: i, label, note, have };
  });

  const blocks = [];
  if (!panelLoading) {
    if (panel.kind === 'detail') {
      if (d.summary) blocks.push({ key: 'summary', isProse: true, text: d.summary });
      if (d.facts) blocks.push({ key: 'facts', heading: t('atAGlance'), isFacts: true, items: d.facts });
      if (d.eligibility) blocks.push({ key: 'elig', heading: t('eligibilityHeading'), isChecks: true, items: d.eligibility });
      if (d.steps) blocks.push({ key: 'steps', heading: t('howToApply'), isSteps: true, items: d.steps });
      if (d.documents) blocks.push({ key: 'docs', heading: t('documents'), isDocs: true, items: docRows(d.documents) });
      if (d.caution) blocks.push({ key: 'caution', heading: t('verifyBeforeActing'), isCaution: true, text: d.caution });
      if (d.sources?.length) blocks.push({ key: 'sources', heading: t('sourcesLabel'), isSources: true, items: d.sources });
    } else if (panel.kind === 'draft') {
      if (panelTab === 0) {
        if (d.fields) blocks.push({ key: 'fields', heading: t('formDataHeading'), isFields: true, items: d.fields });
      } else if (d.letter) {
        blocks.push({ key: 'letter', heading: t('letterHeading'), isLetter: true, text: d.letter });
      }
      if (d.caution) blocks.push({ key: 'caution', isCaution: true, text: d.caution });
      if (d.sources?.length) blocks.push({ key: 'sources', isSources: true, items: d.sources });
    } else {
      if (d.documents) blocks.push({ key: 'docs', heading: t('collectThese'), isDocs: true, items: docRows(d.documents) });
      if (d.caution) blocks.push({ key: 'caution', isCaution: true, text: d.caution });
      if (d.sources?.length) blocks.push({ key: 'sources', isSources: true, items: d.sources });
    }
  }

  const panelLoadingLabel = t('panelLoading', panel.kind);

  const tabBtn = (i, label) => {
    const active = panelTab === i;
    return (
      <button key={i} onClick={() => onSetTab(i)} style={{ border: `1px solid ${active ? '#f0a72b' : '#26262c'}`, background: active ? '#16130c' : '#101013', color: active ? '#f0a72b' : '#a8a19a', font: '600 12.5px Manrope, sans-serif', padding: '7px 14px', borderRadius: 99, cursor: 'pointer' }}>
        {label}
      </button>
    );
  };

  const actions = panel.kind === 'detail'
    ? [
        { key: 'a', label: t('actDraftApp'), run: () => onOpenPanel('draft', s), primary: true },
        { key: 'b', label: t('actDocChecklist'), run: () => onOpenPanel('docs', s) },
        { key: 'c', label: `${t('actAskWhy')} ${s.fit || 0}%`, run: () => onAskWhy(s) },
      ]
    : panel.kind === 'draft'
    ? [
        { key: 'a', label: t('actPrint'), run: () => window.print(), primary: true },
        { key: 'b', label: t('actDocChecklist'), run: () => onOpenPanel('docs', s) },
        { key: 'c', label: t('actBackToScheme'), run: () => onOpenPanel('detail', s) },
      ]
    : [
        { key: 'a', label: t('actDraftApp'), run: () => onOpenPanel('draft', s), primary: true },
        { key: 'b', label: t('actBackToScheme'), run: () => onOpenPanel('detail', s) },
      ];

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 6, display: 'flex', justifyContent: 'flex-end', background: 'rgba(6,6,7,.62)', backdropFilter: 'blur(3px)', animation: 'fadeIn .22s ease both' }}>
      <div onClick={onClose} style={{ flex: 1, cursor: 'pointer' }} />
      <div style={{ flex: 'none', width: 'min(660px, 100%)', display: 'flex', flexDirection: 'column', minHeight: 0, background: '#0c0c0e', borderLeft: '1px solid #23232a', boxShadow: '-40px 0 90px -40px rgba(0,0,0,.9)', animation: 'panelIn .3s cubic-bezier(.2,.8,.2,1) both' }}>

        <div style={{ flex: 'none', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '20px 22px 15px', borderBottom: '1px solid #1a1a1f' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: '#f0a72b', marginBottom: 6 }}>{kindLabel}</div>
            <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 'clamp(20px, 2.6vw, 27px)', lineHeight: 1.18, textWrap: 'pretty' }}>{s.name}</div>
            <div style={{ fontSize: 12, color: '#8d867c', marginTop: 5 }}>{s.agency}</div>
          </div>
          <button onClick={onClose} style={{ flex: 'none', width: 34, height: 34, borderRadius: 99, border: '1px solid #2a2a30', background: '#131316', color: '#cfc7bb', font: '400 17px Manrope, sans-serif', lineHeight: 1, cursor: 'pointer' }}>×</button>
        </div>

        {panel.kind === 'draft' && !panelLoading && (
          <div style={{ flex: 'none', display: 'flex', gap: 6, padding: '12px 22px 0' }}>
            {panelTabsLabels.map((label, i) => tabBtn(i, label))}
          </div>
        )}

        <div style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', padding: '20px 22px 28px' }}>
          {panelLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#8d867c' }}>
                <span style={{ width: 14, height: 14, borderRadius: 99, border: '2px solid #2a2a30', borderTopColor: '#f0a72b', animation: 'spin .8s linear infinite', display: 'inline-block' }} />
                {panelLoadingLabel}
              </div>
              {[1, 2, 3].map((g) => (
                <div key={g} style={{ height: 64, borderRadius: 14, border: '1px solid #17171c', background: 'linear-gradient(100deg, #101013 25%, #16161b 50%, #101013 75%)', backgroundSize: '200% 100%', animation: 'shimmer 2.6s linear infinite' }} />
              ))}
            </div>
          )}

          {blocks.map((b) => (
            <div key={b.key} style={{ marginBottom: 22, animation: 'rise .4s ease both' }}>
              {b.heading && <div style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6e685f', marginBottom: 11 }}>{b.heading}</div>}

              {b.isProse && <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.68, color: '#ded7cc', whiteSpace: 'pre-wrap', textWrap: 'pretty' }}>{b.text}</p>}

              {b.isFacts && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 10 }}>
                  {b.items.map((f, i) => (
                    <div key={i} style={{ border: '1px solid #1c1c22', background: '#101013', borderRadius: 13, padding: '12px 13px' }}>
                      <div style={{ fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6e685f', marginBottom: 5 }}>{f.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#f4efe6', lineHeight: 1.35, textWrap: 'pretty' }}>{String(f.value)}</div>
                    </div>
                  ))}
                </div>
              )}

              {b.isChecks && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {b.items.map((c, i) => {
                    const mk = markOf(c.state);
                    return (
                      <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'baseline', border: '1px solid #1c1c22', background: '#101013', borderRadius: 12, padding: '11px 13px' }}>
                        <span style={{ flex: 'none', width: 14, textAlign: 'center', fontWeight: 700, color: mk.color }}>{mk.mark}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#ded7cc', textWrap: 'pretty' }}>{c.label}</div>
                          {c.note && <div style={{ fontSize: 12, lineHeight: 1.5, color: '#8d867c', marginTop: 4 }}>{c.note}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {b.isSteps && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {b.items.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 99, border: '1px solid #3a2c0f', background: '#16130c', color: '#f0a72b', font: '700 11px Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                      <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#ded7cc', textWrap: 'pretty' }}>{step}</div>
                    </div>
                  ))}
                </div>
              )}

              {b.isFields && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {b.items.map((f, i) => (
                    <label key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <span style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6e685f' }}>{f.label}</span>
                      <input
                        value={f.value == null ? '' : String(f.value)}
                        onChange={(e) => onFieldChange(i, e.target.value)}
                        style={{ border: '1px solid #24242a', background: '#101013', borderRadius: 11, padding: '11px 13px', color: '#f4efe6', font: '400 14px Manrope, sans-serif', outline: 'none' }}
                      />
                    </label>
                  ))}
                </div>
              )}

              {b.isLetter && (
                <textarea
                  value={b.text}
                  onChange={(e) => onLetterChange(e.target.value)}
                  style={{ width: '100%', minHeight: 360, border: '1px solid #24242a', background: '#0f0f12', borderRadius: 14, padding: 18, color: '#e7e1d7', font: '400 14px/1.75 Newsreader, Georgia, serif', outline: 'none', resize: 'vertical' }}
                />
              )}

              {b.isDocs && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {b.items.map((doc) => (
                    <div key={doc.key} style={{ display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #1c1c22', background: '#101013', borderRadius: 13, padding: '12px 13px' }}>
                      <button onClick={() => onToggleDoc(doc.label)} style={{ flex: 'none', width: 22, height: 22, borderRadius: 7, border: `1px solid ${doc.have ? '#f0a72b' : '#2a2a30'}`, background: doc.have ? '#f0a72b' : '#131316', color: '#211502', font: '700 12px Manrope, sans-serif', lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {doc.have ? '✓' : ''}
                      </button>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 13.5, lineHeight: 1.45, color: '#ded7cc', textWrap: 'pretty' }}>{doc.label}</div>
                        <div style={{ fontSize: 11.5, color: '#7d766c', marginTop: 3 }}>{doc.note}</div>
                      </div>
                      <button onClick={() => onToggleDoc(doc.label)} style={{ flex: 'none', border: '1px solid #2a2a30', background: '#16161b', color: '#cfc7bb', font: '600 11.5px Manrope, sans-serif', padding: '6px 11px', borderRadius: 99, cursor: 'pointer' }}>
                        {doc.have ? t('ready') : t('markReady')}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {b.isCaution && (
                <div style={{ border: '1px solid #33291a', background: '#14110b', borderRadius: 13, padding: '13px 15px', fontSize: 12.5, lineHeight: 1.6, color: '#c9ab74', textWrap: 'pretty' }}>{b.text}</div>
              )}

              {b.isSources && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {b.items.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ font: '500 11.5px Manrope, sans-serif', padding: '5px 10px', borderRadius: 99, border: '1px solid #1c1c22', background: '#101013', color: '#8d867c' }}>
                      {(() => { try { return new URL(s.url).hostname.replace('www.', ''); } catch { return s.title || s.url; } })()}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {!panelLoading && (
          <div style={{ flex: 'none', display: 'flex', flexWrap: 'wrap', gap: 9, padding: '14px 22px', borderTop: '1px solid #1a1a1f', background: '#0d0d10' }}>
            {actions.map((a) => (
              <Hover as="button" key={a.key} onClick={a.run}
                style={{ border: a.primary ? '1px solid transparent' : '1px solid #2a2a30', background: a.primary ? '#f0a72b' : '#131316', color: a.primary ? '#211502' : '#ded7cc', font: '700 12.5px Manrope, sans-serif', padding: '10px 16px', borderRadius: 99, cursor: 'pointer' }}
                hoverStyle={{ filter: 'brightness(1.12)' }}>
                {a.label}
              </Hover>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
