import { useState, useEffect, useMemo } from "react";

// ─── Zone Transition ───
export function ZoneTransition({ zone, onComplete }) {
  useEffect(() => { const t = setTimeout(onComplete, 1200); return () => clearTimeout(t); }, [onComplete]);
  return <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'zoneTransitionIn 0.4s ease,zoneTransitionOut 0.4s ease 0.8s forwards', background: zone.color }}>
    <div style={{ fontSize: 56, animation: 'bounceMarker 0.6s ease-in-out infinite', marginBottom: 16 }}>{zone.icon}</div>
    <div style={{ fontFamily: "'Silkscreen',cursive", fontSize: 22, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.2)', animation: 'fadeInQuick 0.3s ease 0.2s both' }}>{zone.name}</div>
    <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6, animation: 'fadeInQuick 0.3s ease 0.4s both' }}>{zone.description}</div></div>;
}

// ─── Intro Screen (appears after loading) ───
function IntroScreen({ onStart }) {
  const [isMob, setIsMob] = useState(false);
  useEffect(() => { setIsMob(window.innerWidth < 768 || 'ontouchstart' in window); }, []);
  return <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'linear-gradient(135deg,#E8F4FD,#FFF5E6,#F0EEFF)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Nunito',sans-serif", animation: 'fadeInQuick 0.5s ease', padding: 20, textAlign: 'center' }}>
    <div style={{ fontSize: isMob ? 48 : 64, marginBottom: 16, animation: 'bob 3s ease-in-out infinite' }}>🧙‍♀️</div>
    <div style={{ fontFamily: "'Silkscreen',cursive", fontSize: isMob ? 22 : 28, color: '#3a3a5c', marginBottom: 8 }}>Nidhi's Realm</div>
    <div style={{ fontSize: isMob ? 12 : 14, color: '#888', maxWidth: 340, lineHeight: 1.7, marginBottom: 32 }}>A Full Stack Adventure<br /><span style={{ fontSize: isMob ? 10 : 12, color: '#aaa' }}>Explore the map to discover skills, quests, and treasures</span></div>
    <button onClick={onStart} aria-label="Start the adventure" style={{ background: 'linear-gradient(135deg,#6C63FF,#9B8FFF)', color: '#fff', border: 'none', borderRadius: 24, padding: isMob ? '12px 36px' : '14px 44px', fontSize: isMob ? 12 : 14, fontFamily: "'Silkscreen',cursive", cursor: 'pointer', boxShadow: '0 4px 24px rgba(108,99,255,0.3)', animation: 'pulseGlow 2s ease-in-out infinite', transition: 'transform 0.2s', WebkitTapHighlightColor: 'transparent' }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>▶ Start Adventure</button>
    <div style={{ marginTop: 28, fontSize: 10, color: '#aaa', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {isMob ? <>
        <div>📱 Use D-Pad to move · ⚡ Sprint button</div>
        <div>🖱️ Tap zones to explore · E to enter</div>
      </> : <>
        <div style={{ display: 'flex', gap: 16 }}><span>🎮 WASD / Arrows</span><span>⚡ Shift = Sprint</span></div>
        <div style={{ display: 'flex', gap: 16 }}><span>🖱️ Click zones</span><span>🔎 E near zones</span></div>
      </>}
    </div>
  </div>;
}

// ─── Loading Screen ───
export function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const tips = useMemo(() => [
    "Sharpening the C# swords...",
    "Planting React trees in the forest...",
    "Polishing the SQL crystals...",
    "Summoning .NET familiars...",
    "Brewing Docker potions...",
    "Enchanting REST scrolls...",
  ], []);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => setPhase('ready'), 400); return 100; }
        return p + Math.random() * 12 + 3;
      });
    }, 150);
    const tipIv = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 1800);
    return () => { clearInterval(iv); clearInterval(tipIv); };
  }, [tips]);

  if (phase === 'ready') return <IntroScreen onStart={onDone} />;

  return <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Nunito',sans-serif" }}>
    <div style={{ fontSize: 48, marginBottom: 20, animation: 'bob 3s ease-in-out infinite' }}>🧙‍♀️</div>
    <div style={{ fontFamily: "'Silkscreen',cursive", fontSize: 22, color: '#FFD700', marginBottom: 8, textShadow: '0 2px 12px rgba(255,215,0,0.3)' }}>Nidhi's Realm</div>
    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Loading Adventure...</div>
    {/* Progress bar */}
    <div style={{ width: 'min(280px, 70vw)', height: 18, borderRadius: 9, background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,215,0,0.15)', overflow: 'hidden', position: 'relative', marginBottom: 16 }}>
      <div style={{ height: '100%', borderRadius: 7, background: 'linear-gradient(90deg,#6C63FF,#FFD700)', width: `${Math.min(progress, 100)}%`, transition: 'width 0.2s ease', boxShadow: '0 0 12px rgba(108,99,255,0.4)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', fontFamily: "'Silkscreen',cursive", textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{Math.min(Math.round(progress), 100)}%</div>
    </div>
    {/* Loading tip */}
    <div key={tipIdx} style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', animation: 'fadeInQuick 0.3s ease', textAlign: 'center', maxWidth: 250 }}>
      {tips[tipIdx]}
    </div>
  </div>;
}