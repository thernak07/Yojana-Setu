import { Hover } from './Hover.jsx';

export default function Header({ t, onApp, completion, engine, ttsOn, lang, onGoLanding, onNewChat, onToggleLang, onToggleTts }) {
  const engineLabel = engine === 'ai' ? t('engineLive') : engine === 'offline' ? t('engineOffline') : t('engineStarting');
  const engineDot = engine === 'ai' ? '#5ec27a' : engine === 'offline' ? '#d9a03f' : '#7d766c';
  const engineTitle = engine === 'ai' ? t('engineTitleLive') : t('engineTitleOffline');

  return (
    <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', padding: '14px 22px', borderBottom: '1px solid #1e1e23', background: 'rgba(10,10,11,.72)', backdropFilter: 'blur(8px)' }}>
      <div onClick={onGoLanding} style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(145deg, #f0a72b, #c07d12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#241703' }}>से</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 19, lineHeight: 1.1, letterSpacing: '.2px' }}>{t('brandName')}</div>
          <div style={{ fontSize: 10, letterSpacing: '.09em', textTransform: 'uppercase', color: '#8d867c' }}>{t('brandSub')}</div>
        </div>
      </div>
      <div style={{ flex: '1 1 40px' }} />

      {onApp && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, color: '#8d867c', letterSpacing: '.04em' }}>{t('profile')}</span>
          <div style={{ width: 96, height: 6, borderRadius: 99, background: '#1e1e23', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #c07d12, #f0a72b)', width: `${completion}%`, transition: 'width .6s cubic-bezier(.2,.8,.2,1)' }} />
          </div>
          <span style={{ fontSize: 11.5, fontVariantNumeric: 'tabular-nums', color: '#f0a72b', minWidth: 28 }}>{completion}%</span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div title={engineTitle} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 99, border: '1px solid #26262c', background: '#101013' }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: engineDot }} />
          <span style={{ font: '600 11px Manrope, sans-serif', letterSpacing: '.04em', color: '#a8a19a' }}>{engineLabel}</span>
        </div>
        <Hover as="button" onClick={onToggleTts} title={ttsOn ? 'Turn off spoken replies' : 'Read replies aloud'}
          style={{ border: '1px solid #2a2a30', background: ttsOn ? '#16130c' : '#131316', color: ttsOn ? '#f0a72b' : '#cfc7bb', font: '500 12px Manrope, sans-serif', padding: '7px 12px', borderRadius: 99, cursor: 'pointer' }}
          hoverStyle={{ borderColor: '#3a3a42' }}>
          {ttsOn ? t('ttsOn') : t('ttsOff')}
        </Hover>
        {onApp && (
          <Hover as="button" onClick={onNewChat}
            style={{ border: '1px solid #2a2a30', background: '#131316', color: '#cfc7bb', font: '500 12px Manrope, sans-serif', padding: '7px 12px', borderRadius: 99, cursor: 'pointer' }}
            hoverStyle={{ borderColor: '#3a3a42', color: '#f4efe6' }}>
            {t('newChat')}
          </Hover>
        )}
        <Hover as="button" onClick={onToggleLang}
          style={{ border: '1px solid #2a2a30', background: '#131316', color: '#cfc7bb', font: '500 12px Manrope, sans-serif', padding: '7px 12px', borderRadius: 99, cursor: 'pointer' }}
          hoverStyle={{ borderColor: '#3a3a42', color: '#f4efe6' }}>
          {lang === 'hi' ? 'हिं · EN' : 'EN · हिं'}
        </Hover>
      </div>
    </header>
  );
}
