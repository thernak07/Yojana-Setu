import { Hover } from './Hover.jsx';

export default function MatchesRail({ t, profile, fieldLabels, matches, sources, hasProfile, noMatches, onEditField, onOpen, onWhy, onApply }) {
  const matchCountLabel = matches.length ? `${matches.length} ${t('rankedSuffix')}` : t('nothingYet');
  const statusMap = {
    eligible: [t('statusLabels', 'eligible'), '#7de29a', 'rgba(94,194,122,.13)'],
    likely: [t('statusLabels', 'likely'), '#f0a72b', 'rgba(240,167,43,.12)'],
    needs_info: [t('statusLabels', 'needs_info'), '#9d968c', 'rgba(255,255,255,.06)'],
    not_eligible: [t('statusLabels', 'not_eligible'), '#e0836a', 'rgba(217,102,63,.12)'],
  };

  return (
    <aside style={{ minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', background: '#0c0c0e' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, padding: '18px 20px 13px', borderBottom: '1px solid #1a1a1f' }}>
        <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 18 }}>{t('liveMatches')}</span>
        <span style={{ fontSize: 11.5, color: '#7d766c', fontVariantNumeric: 'tabular-nums' }}>{matchCountLabel}</span>
      </div>

      <div style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', padding: '14px 16px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {sources && sources.length > 0 && (
          <div title={t('groundedTitle')} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6e685f' }}>🔎 {t('sourcesLabel')}</span>
            {sources.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ font: '500 11px Manrope, sans-serif', padding: '3px 9px', borderRadius: 99, border: '1px solid #1f1f25', background: '#101013', color: '#8d867c' }}>
                {(() => { try { return new URL(s.url).hostname.replace('www.', ''); } catch { return s.title || s.url; } })()}
              </a>
            ))}
          </div>
        )}

        {hasProfile && (
          <div style={{ border: '1px solid #1c1c22', background: '#0f0f12', borderRadius: 14, padding: '12px 13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 9 }}>
              <span style={{ fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: '#6e685f' }}>{t('whatSetuKnows')}</span>
              <span style={{ fontSize: 11, color: '#6e685f' }}>{t('tapToCorrect')}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.keys(profile).filter((k) => profile[k] !== undefined && profile[k] !== '' && fieldLabels[k]).map((k) => (
                <Hover as="button" key={k} onClick={() => onEditField(k)}
                  style={{ display: 'flex', alignItems: 'baseline', gap: 6, border: '1px solid #24242a', background: '#141418', borderRadius: 99, padding: '5px 11px', cursor: 'pointer', font: '500 12px Manrope, sans-serif', color: '#ded7cc' }}
                  hoverStyle={{ borderColor: '#f0a72b' }}>
                  <span style={{ color: '#7d766c', fontSize: 10.5, letterSpacing: '.04em', textTransform: 'uppercase' }}>{fieldLabels[k]}</span>
                  <span>{String(profile[k])}</span>
                </Hover>
              ))}
            </div>
          </div>
        )}

        {noMatches && (
          <div style={{ padding: '6px 4px' }}>
            <p style={{ margin: '0 0 18px', fontSize: 13.5, lineHeight: 1.6, color: '#8d867c', textWrap: 'pretty' }}>{t('noMatchesBody')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[1, 2, 3].map((g) => (
                <div key={g} style={{ height: 78, borderRadius: 14, border: '1px solid #17171c', background: 'linear-gradient(100deg, #101013 25%, #16161b 50%, #101013 75%)', backgroundSize: '200% 100%', animation: 'shimmer 2.6s linear infinite' }} />
              ))}
            </div>
          </div>
        )}

        {matches.map((s, i) => {
          const sm = statusMap[s.status] || statusMap.needs_info;
          const fit = Math.max(0, Math.min(100, Math.round(s.fit || 0)));
          const deg = Math.round(fit * 3.6);
          const conf = s.confidence || 'medium';
          const showConfidence = conf !== 'high';
          const confidenceLabel = conf === 'low' ? t('verifyWithAgency') : t('mediumConfidence');
          return (
            <div key={s.name + i} style={{ border: '1px solid #1f1f25', background: '#101013', borderRadius: 16, padding: '14px 14px 12px', animation: 'cardIn .5s cubic-bezier(.2,.8,.2,1) both' }}>
              <div onClick={() => onOpen(s)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                <div style={{ flex: 'none', width: 46, height: 46, borderRadius: 99, background: `conic-gradient(#f0a72b ${deg}deg, rgba(255,255,255,.07) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 99, background: '#101013', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 12px Manrope, sans-serif', fontVariantNumeric: 'tabular-nums', color: '#f0a72b' }}>{fit}%</div>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: '#f4efe6', textWrap: 'pretty' }}>{s.name}</div>
                  <div style={{ fontSize: 11.5, color: '#8d867c', marginTop: 3 }}>{s.agency}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 11 }}>
                <span style={{ font: '700 10.5px Manrope, sans-serif', letterSpacing: '.07em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 99, color: sm[1], background: sm[2] }}>{sm[0]}</span>
                <span style={{ font: '600 11.5px Manrope, sans-serif', padding: '4px 9px', borderRadius: 99, color: '#ded7cc', background: '#191920' }}>{s.amount || 'See portal'}</span>
                <span style={{ font: '500 11.5px Manrope, sans-serif', padding: '4px 9px', borderRadius: 99, color: '#98918e', background: '#191920' }}>{s.deadline || 'Rolling'}</span>
                {showConfidence && (
                  <span title={s.confidence_note || 'Scheme limits change — confirm with the implementing agency.'} style={{ font: '500 11.5px Manrope, sans-serif', padding: '4px 9px', borderRadius: 99, color: '#98918e', background: '#191920' }}>{confidenceLabel}</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 11, paddingTop: 10, borderTop: '1px solid #1b1b21' }}>
                {(s.criteria || []).slice(0, 4).map((c, j) => {
                  const mark = c.state === 'met' ? '✓' : c.state === 'missed' ? '✕' : '?';
                  const color = c.state === 'met' ? '#5ec27a' : c.state === 'missed' ? '#d9663f' : '#7d766c';
                  return (
                    <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 12.5, lineHeight: 1.45 }}>
                      <span style={{ flex: 'none', width: 12, textAlign: 'center', fontWeight: 700, color }}>{mark}</span>
                      <span style={{ color: '#a8a19a' }}>{c.label}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 11 }}>
                <Hover as="button" onClick={() => onOpen(s)}
                  style={{ border: '1px solid #2a2a30', background: '#16161b', color: '#ded7cc', font: '600 11.5px Manrope, sans-serif', padding: '6px 11px', borderRadius: 99, cursor: 'pointer' }}
                  hoverStyle={{ borderColor: '#f0a72b', color: '#f0a72b' }}>
                  {t('detailsBtn')}
                </Hover>
                <Hover as="button" onClick={() => onWhy(s)}
                  style={{ border: '1px solid #2a2a30', background: '#16161b', color: '#ded7cc', font: '600 11.5px Manrope, sans-serif', padding: '6px 11px', borderRadius: 99, cursor: 'pointer' }}
                  hoverStyle={{ borderColor: '#f0a72b', color: '#f0a72b' }}>
                  {`${t('actAskWhy')} ${fit}%?`}
                </Hover>
                <Hover as="button" onClick={() => onApply(s)}
                  style={{ border: 0, background: '#2a2109', color: '#f0a72b', font: '700 11.5px Manrope, sans-serif', padding: '6px 11px', borderRadius: 99, cursor: 'pointer' }}
                  hoverStyle={{ background: '#38290a' }}>
                  {t('draftBtn')}
                </Hover>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
