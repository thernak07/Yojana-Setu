import { Hover } from './Hover.jsx';

export default function Landing({ t, onGoApp, onRunDemo }) {
  const howItWorks = t('howItWorks');
  const guardrails = t('guardrails');
  const coverage = t('coverage');

  return (
    <div style={{ position: 'relative', flex: '1 1 0', minHeight: 0, overflowY: 'auto' }}>
      <div style={{ position: 'absolute', inset: '-20% -10% auto -10%', height: '70vh', pointerEvents: 'none', background: 'radial-gradient(38% 46% at 22% 18%, rgba(240,167,43,.13), transparent 70%), radial-gradient(34% 40% at 78% 10%, rgba(120,150,255,.08), transparent 70%)', filter: 'blur(10px)', animation: 'drift 26s ease-in-out infinite' }} />
      <div style={{ position: 'relative', maxWidth: 1120, margin: '0 auto', padding: 'clamp(36px, 7vh, 84px) clamp(20px, 5vw, 48px) 72px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 5vw, 60px)', alignItems: 'center' }}>
          <div style={{ animation: 'rise .6s ease both' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 13px', borderRadius: 99, border: '1px solid #3a2c0f', background: '#16130c', font: '600 11.5px Manrope, sans-serif', letterSpacing: '.06em', textTransform: 'uppercase', color: '#f0a72b', marginBottom: 22 }}>{t('heroBadge')}</div>
            <h1 style={{ fontFamily: 'Newsreader, Georgia, serif', fontWeight: 300, fontSize: 'clamp(34px, 5.4vw, 62px)', lineHeight: 1.06, letterSpacing: '-1px', margin: '0 0 18px', whiteSpace: 'pre-line' }}>{t('heroTitle')}</h1>
            <p style={{ margin: '0 0 30px', maxWidth: '50ch', fontSize: 16.5, lineHeight: 1.62, color: '#a09a91', textWrap: 'pretty' }}>{t('heroBody')}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <Hover as="button" onClick={onGoApp}
                style={{ height: 50, padding: '0 26px', borderRadius: 99, border: 0, background: 'linear-gradient(145deg, #f0a72b, #d4901c)', color: '#211502', font: '700 15px Manrope, sans-serif', cursor: 'pointer', transition: 'filter .16s ease, transform .16s ease' }}
                hoverStyle={{ filter: 'brightness(1.1)', transform: 'translateY(-1px)' }}>
                {t('startMatching')}
              </Hover>
              <Hover as="button" onClick={onRunDemo}
                style={{ height: 50, padding: '0 22px', borderRadius: 99, border: '1px solid #2c2c33', background: 'transparent', color: '#ded7cc', font: '600 14px Manrope, sans-serif', cursor: 'pointer' }}
                hoverStyle={{ borderColor: '#f0a72b', color: '#f0a72b' }}>
                {t('watchDemo')}
              </Hover>
            </div>
          </div>

          <div style={{ animation: 'rise .7s .1s ease both' }}>
            <div style={{ border: '1px solid #1f1f25', background: '#0e0e11', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 80px -50px rgba(0,0,0,.9)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 15px', borderBottom: '1px solid #1a1a1f' }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: '#2f2f37' }} />
                <span style={{ width: 8, height: 8, borderRadius: 99, background: '#2f2f37' }} />
                <span style={{ fontSize: 11, color: '#6e685f', marginLeft: 6 }}>setu.gov.in / match</span>
              </div>
              <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ maxWidth: '80%', background: '#17171b', border: '1px solid #24242a', padding: '10px 14px', borderRadius: '14px 14px 4px 14px', fontSize: 13.5, lineHeight: 1.5 }}>I want to start a tailoring unit. I have no collateral.</div>
                </div>
                <div style={{ display: 'flex', gap: 11 }}>
                  <div style={{ flex: 'none', width: 22, height: 22, borderRadius: 7, border: '1px solid #3a2c0f', background: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 99, background: '#f0a72b' }} />
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.6, color: '#e7e1d7' }}>Collateral is solvable — CGTMSE guarantees loans without it. How much do you need to get going?</div>
                </div>
                <div style={{ border: '1px solid #1f1f25', background: '#101013', borderRadius: 14, padding: 13, display: 'flex', gap: 11, alignItems: 'center' }}>
                  <div style={{ flex: 'none', width: 40, height: 40, borderRadius: 99, background: 'conic-gradient(#f0a72b 320deg, rgba(255,255,255,.07) 0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 31, height: 31, borderRadius: 99, background: '#101013', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 11px Manrope, sans-serif', color: '#f0a72b' }}>89%</div>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>PM MUDRA Yojana — Kishor</div>
                    <div style={{ fontSize: 11, color: '#8d867c', marginTop: 2 }}>Dept. of Financial Services · ₹50k–₹5 lakh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: '#1a1a1f', margin: 'clamp(44px, 8vh, 76px) 0 clamp(30px, 5vh, 48px)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 22 }}>
          {howItWorks.map((h, i) => (
            <div key={i} style={{ animation: 'rise .6s ease both' }}>
              <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 30, lineHeight: 1, color: '#f0a72b', marginBottom: 12 }}>{h.n}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 7 }}>{h.title}</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#918a80', textWrap: 'pretty' }}>{h.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(40px, 7vh, 68px)', border: '1px solid #1f1f25', background: '#0d0d10', borderRadius: 20, padding: 'clamp(22px, 3vw, 32px)' }}>
          <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 22, marginBottom: 6 }}>{t('guardHeading')}</div>
          <p style={{ margin: '0 0 22px', maxWidth: '62ch', fontSize: 14, lineHeight: 1.6, color: '#918a80', textWrap: 'pretty' }}>{t('guardBody')}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: 16 }}>
            {guardrails.map((g, i) => (
              <div key={i} style={{ border: '1px solid #1c1c22', background: '#101013', borderRadius: 14, padding: 15 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6, color: '#f4efe6' }}>{g.title}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#8d867c' }}>{g.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 34, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, letterSpacing: '.07em', textTransform: 'uppercase', color: '#6e685f', marginRight: 4 }}>{t('coversLabel')}</span>
          {coverage.map((c, i) => (
            <span key={i} style={{ font: '500 12px Manrope, sans-serif', padding: '6px 11px', borderRadius: 99, border: '1px solid #1f1f25', background: '#101013', color: '#a8a19a' }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
