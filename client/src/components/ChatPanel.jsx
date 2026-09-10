import { Hover } from './Hover.jsx';

export default function ChatPanel({
  t, messages, isEmpty, thinking, thinkingLabel, draft, placeholder, listening,
  scrollRef, onDraftChange, onKeyDown, onSend, onToggleVoice, onStarter,
  hints, hasHints, onHintClick, speechSupported,
}) {
  return (
    <section style={{ minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', borderRight: '1px solid #1e1e23' }}>
      <div ref={scrollRef} style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', padding: '32px clamp(18px, 4.5vw, 50px) 8px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {isEmpty && (
            <div style={{ padding: 'clamp(0px, 3vh, 40px) 0 0', animation: 'rise .6s ease both' }}>
              <h1 style={{ fontFamily: 'Newsreader, Georgia, serif', fontWeight: 300, fontSize: 'clamp(28px, 4.2vw, 44px)', lineHeight: 1.12, margin: '0 0 12px', letterSpacing: '-.4px' }}>{t('chatEmptyTitle')}</h1>
              <p style={{ margin: '0 0 26px', maxWidth: '48ch', fontSize: 15.5, lineHeight: 1.6, color: '#a09a91', textWrap: 'pretty' }}>{t('chatEmptyBody')}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {t('starters').map((s, i) => (
                  <Hover as="button" key={i} onClick={() => onStarter(s)}
                    style={{ textAlign: 'left', border: '1px solid #24242a', background: '#101013', color: '#ded7cc', font: '500 13.5px Manrope, sans-serif', padding: '12px 15px', borderRadius: 13, cursor: 'pointer', maxWidth: 320, lineHeight: 1.4, transition: 'all .18s ease' }}
                    hoverStyle={{ borderColor: '#f0a72b', background: '#16130c', color: '#fff' }}>
                    {s}
                  </Hover>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.key} style={{ animation: 'rise .45s cubic-bezier(.2,.8,.2,1) both' }}>
              {m.isUser && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ maxWidth: '78%', background: '#17171b', border: '1px solid #24242a', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', fontSize: 15, lineHeight: 1.55, color: '#f4efe6' }}>{m.text}</div>
                </div>
              )}
              {m.isBot && (
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ flex: 'none', width: 26, height: 26, borderRadius: 8, border: '1px solid #3a2c0f', background: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <div style={{ width: 7, height: 7, borderRadius: 99, background: '#f0a72b' }} />
                  </div>
                  <div style={{ minWidth: 0, fontSize: 15.5, lineHeight: 1.68, color: '#e7e1d7', whiteSpace: 'pre-wrap', textWrap: 'pretty' }}>
                    {m.text}
                    {m.streaming && <span style={{ display: 'inline-block', width: 8, height: 16, marginLeft: 3, verticalAlign: -2, background: '#f0a72b', animation: 'caret 1s steps(1) infinite' }} />}
                  </div>
                </div>
              )}
              {m.isNote && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 13px', borderRadius: 12, border: '1px solid #33291a', background: '#14110b', fontSize: 12.5, lineHeight: 1.5, color: '#c9ab74' }}>{m.text}</div>
              )}
            </div>
          ))}

          {thinking && (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', animation: 'rise .3s ease both' }}>
              <div style={{ flex: 'none', width: 26, height: 26, borderRadius: 8, border: '1px solid #3a2c0f', background: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 7, height: 7, borderRadius: 99, background: '#f0a72b' }} />
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#f0a72b', animation: 'blip 1.1s ease-in-out infinite' }} />
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#f0a72b', animation: 'blip 1.1s ease-in-out .16s infinite' }} />
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#f0a72b', animation: 'blip 1.1s ease-in-out .32s infinite' }} />
              </div>
              <span style={{ fontSize: 12.5, color: '#7d766c', letterSpacing: '.02em' }}>{thinkingLabel}</span>
            </div>
          )}

          <div style={{ height: 10 }} />
        </div>
      </div>

      <div style={{ padding: '8px clamp(18px, 4.5vw, 50px) 20px', background: 'linear-gradient(transparent, #0a0a0b 42%)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {hasHints && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, alignItems: 'center', padding: '0 4px 10px' }}>
              <span style={{ fontSize: 11, color: '#6e685f', letterSpacing: '.06em', textTransform: 'uppercase' }}>{t('tryLabel')}</span>
              {hints.map((h, i) => (
                <Hover as="button" key={i} onClick={() => onHintClick(h)}
                  style={{ border: '1px dashed #2c2c33', background: 'transparent', color: '#989186', font: '500 12.5px Manrope, sans-serif', padding: '6px 11px', borderRadius: 99, cursor: 'pointer', transition: 'all .16s ease' }}
                  hoverStyle={{ borderColor: '#f0a72b', color: '#f0a72b', borderStyle: 'solid' }}>
                  {h}
                </Hover>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, border: '1px solid #26262c', background: '#101013', borderRadius: 20, padding: '10px 10px 10px 18px', boxShadow: '0 18px 40px -28px rgba(0,0,0,.9)' }}>
            <input
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={listening ? t('listeningNote') : placeholder}
              style={{ flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent', color: '#f4efe6', font: '400 15.5px Manrope, sans-serif', padding: '9px 0' }}
            />
            {speechSupported && (
              <Hover as="button" onClick={onToggleVoice} title={t('speakTitle')}
                style={{ position: 'relative', flex: 'none', width: 40, height: 40, borderRadius: 99, border: '1px solid #2a2a30', background: '#17171b', color: '#b9b1a5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                hoverStyle={{ borderColor: '#3a3a42', color: '#f4efe6' }}>
                {listening && <span style={{ position: 'absolute', inset: 0, borderRadius: 99, border: '1px solid #f0a72b', animation: 'ripple 1.5s ease-out infinite' }} />}
                <span style={{ display: 'block', width: 9, height: 15, borderRadius: 99, background: 'currentColor' }} />
              </Hover>
            )}
            <Hover as="button" onClick={onSend}
              style={{ flex: 'none', height: 40, padding: '0 20px', borderRadius: 99, border: 0, background: 'linear-gradient(145deg, #f0a72b, #d4901c)', color: '#211502', font: '700 13.5px Manrope, sans-serif', cursor: 'pointer', transition: 'filter .16s ease' }}
              hoverStyle={{ filter: 'brightness(1.12)' }}>
              {t('send')}
            </Hover>
          </div>
          <div style={{ padding: '9px 6px 0', fontSize: 11.5, color: '#6e685f' }}>{t('composerDisclaimer')}</div>
        </div>
      </div>
    </section>
  );
}
