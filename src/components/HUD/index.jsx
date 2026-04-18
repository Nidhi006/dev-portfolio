
import { useState, useEffect } from "react";
import { LEVELS, ACHIEVEMENTS } from "../../data/gameData";

// ─── Floating XP Popup ───
export function XPPopup({ amount, id }) {
  return <div key={id} style={{
    position: 'fixed', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
    fontFamily: "'Silkscreen', cursive", fontSize: 18, color: '#FFD700',
    textShadow: '0 2px 8px rgba(255,215,0,0.5), 0 0 20px rgba(255,215,0,0.3)',
    animation: 'xpFloat 1.2s ease-out forwards', zIndex: 300, pointerEvents: 'none',
    fontWeight: 700,
  }}>+{amount} XP</div>;
}

// ─── Achievement Gallery Panel ───
export function AchievementGallery({ achievements, unlocked, xp, onClose }) {
  return <div style={{
    position: 'fixed', inset: 0, zIndex: 350,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)',
    animation: 'fadeInQuick 0.2s ease',
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      background: '#FFFCF5', borderRadius: 24, padding: '28px 24px', maxWidth: 420, width: '90%',
      maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      border: '2px solid rgba(108,99,255,0.1)', animation: 'levelUpPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontFamily: "'Silkscreen', cursive", fontSize: 16, color: '#3a3a5c' }}>🏆 Achievements</div>
        <div style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>
          {unlocked.size}/{achievements.length} · {xp} XP
        </div>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {achievements.map((ach, i) => {
          const done = unlocked.has(ach.id);
          return <div key={ach.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            borderRadius: 14, background: done ? 'linear-gradient(135deg, #FFF8E1, #FFF5E6)' : 'rgba(0,0,0,0.02)',
            border: `1px solid ${done ? 'rgba(255,215,0,0.2)' : 'rgba(0,0,0,0.04)'}`,
            opacity: done ? 1 : 0.5, transition: 'all 0.3s',
            animation: `fadeInQuick 0.3s ease ${i * 0.05}s both`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: done ? 'linear-gradient(135deg, #FFD700, #FFA500)' : '#eee',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              boxShadow: done ? '0 2px 8px rgba(255,215,0,0.2)' : 'none',
            }}>{done ? ach.icon : '🔒'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Silkscreen', cursive", fontSize: 10, color: done ? '#3a3a5c' : '#aaa' }}>{ach.name}</div>
              <div style={{ fontSize: 10, color: '#999', marginTop: 1 }}>{ach.desc}</div>
            </div>
            {done && ach.xp > 0 && <div style={{ fontFamily: "'Silkscreen', cursive", fontSize: 9, color: '#D4A853' }}>+{ach.xp}</div>}
          </div>;
        })}
      </div>
      <button onClick={onClose} style={{
        marginTop: 16, width: '100%', padding: '10px', background: 'linear-gradient(135deg, #6C63FF, #9B8FFF)',
        color: '#fff', border: 'none', borderRadius: 12, fontFamily: "'Silkscreen', cursive", fontSize: 11,
        cursor: 'pointer', boxShadow: '0 4px 12px rgba(108,99,255,0.2)',
      }}>Close</button>
    </div>
  </div>;
}

// ─── HUD ───
export function HUD({ xp, visitedCount, showAchievement, onToggleSound, soundOn, isSprinting, stepsCount, achievements, onShowGallery, xpPopups, prevLevel, currentLevel }) {
  const cl = LEVELS.reduce((a, l, i) => xp >= l.xp ? i : a, 0);
  const nl = LEVELS[Math.min(cl + 1, LEVELS.length - 1)];
  const pp = LEVELS[cl].xp;
  const prog = cl >= LEVELS.length - 1 ? 100 : ((xp - pp) / (nl.xp - pp)) * 100;
  const [isMob, setIsMob] = useState(false);
  useEffect(() => { const c = () => setIsMob(window.innerWidth < 640); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  return <><div role="banner" aria-label="Game HUD" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: isMob ? '8px 10px' : '10px 14px', background: 'linear-gradient(180deg,rgba(255,252,245,0.97) 0%,rgba(255,252,245,0.88) 80%,transparent 100%)', display: 'flex', alignItems: 'center', gap: isMob ? 6 : 10, fontFamily: "'Nunito',sans-serif", flexWrap: 'wrap' }}>
    {/* Level badge */}
    <div onClick={onShowGallery} role="button" aria-label={`Level ${cl + 1} ${LEVELS[cl].name}. Click to view achievements.`} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') onShowGallery(); }} style={{ background: 'linear-gradient(135deg,#6C63FF,#9B8FFF)', color: '#fff', borderRadius: 10, padding: isMob ? '3px 8px' : '4px 12px', fontFamily: "'Silkscreen',cursive", fontSize: isMob ? 8 : 10, boxShadow: '0 2px 8px rgba(108,99,255,0.3)', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      Lv.{cl + 1} {LEVELS[cl].name}
    </div>
    {/* XP Bar */}
    <div role="progressbar" aria-valuenow={xp} aria-valuemin={pp} aria-valuemax={nl.xp} aria-label={`XP: ${xp}`} style={{ flex: 1, maxWidth: isMob ? 140 : 200, minWidth: 80 }}><div style={{ height: isMob ? 14 : 16, borderRadius: 8, background: 'rgba(108,99,255,0.1)', border: '2px solid rgba(108,99,255,0.15)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ height: '100%', borderRadius: 6, background: 'linear-gradient(90deg,#6C63FF,#FFD700)', width: `${prog}%`, transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMob ? 7 : 8, fontWeight: 800, color: '#3a3a5c', fontFamily: "'Silkscreen',cursive" }}>{xp} XP</div></div></div>
    {/* Zones */}
    <div style={{ fontSize: isMob ? 9 : 11, color: '#666', fontWeight: 600, whiteSpace: 'nowrap' }}>🗺️ {visitedCount}/6</div>
    {/* Steps */}
    {!isMob && <div style={{ fontSize: 11, color: '#666', fontWeight: 600, whiteSpace: 'nowrap' }}>🥾 {stepsCount}</div>}
    {/* Achievement count */}
    <div onClick={onShowGallery} role="button" aria-label={`${achievements.size} of ${ACHIEVEMENTS.length} achievements. Click to view.`} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') onShowGallery(); }} style={{ fontSize: isMob ? 9 : 11, color: '#D4A853', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      🏆 {achievements.size}/{ACHIEVEMENTS.length}
    </div>
    {isSprinting && <div style={{ background: 'linear-gradient(135deg,#FFD700,#FFA500)', color: '#fff', borderRadius: 8, padding: '3px 8px', fontFamily: "'Silkscreen',cursive", fontSize: isMob ? 7 : 8, animation: 'pulseGlow 0.8s ease-in-out infinite' }}>⚡</div>}
    <button onClick={onToggleSound} aria-label={soundOn ? 'Mute sound' : 'Enable sound'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: isMob ? 16 : 18, opacity: 0.6, padding: 4, WebkitTapHighlightColor: 'transparent' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.6}>{soundOn ? '🔊' : '🔇'}</button>
  </div>
  {/* Achievement Toast */}
  {showAchievement && <div role="alert" style={{ position: 'fixed', top: isMob ? 48 : 56, right: isMob ? 8 : 16, zIndex: 200, background: 'linear-gradient(135deg,#FFD700,#FFA500)', color: '#3a2a00', borderRadius: isMob ? 10 : 14, padding: isMob ? '8px 14px' : '12px 20px', fontFamily: "'Silkscreen',cursive", fontSize: isMob ? 10 : 12, boxShadow: '0 4px 24px rgba(255,165,0,0.4)', animation: 'achievementSlide 0.5s cubic-bezier(0.34,1.56,0.64,1),achievementFade 3.5s ease forwards', display: 'flex', alignItems: 'center', gap: isMob ? 8 : 10, border: '2px solid rgba(255,255,255,0.5)', maxWidth: isMob ? 240 : 280 }}>
    <span style={{ fontSize: isMob ? 20 : 26 }}>{showAchievement.icon}</span><div><div style={{ fontWeight: 700, marginBottom: 2 }}>🏆 {showAchievement.name}</div><div style={{ fontSize: isMob ? 8 : 10, fontFamily: "'Nunito',sans-serif", opacity: 0.8 }}>{showAchievement.desc} {showAchievement.xp > 0 && `+${showAchievement.xp} XP`}</div></div></div>}
  {/* XP Float Popups */}
  {xpPopups.map(p => <XPPopup key={p.id} amount={p.amount} id={p.id} />)}
  </>;
}

// ─── Minimap ───
export function Minimap({ charPos, zones, visitedZones, isMobile }) {
  const w = isMobile ? 80 : 110; const h = isMobile ? 64 : 90;
  return <div role="img" aria-label="Minimap showing your position and zone locations" style={{ position: 'fixed', bottom: isMobile ? 80 : 16, right: isMobile ? 8 : 16, zIndex: 90, width: w, height: h, borderRadius: 10, background: 'rgba(255,252,245,0.92)', border: '2px solid rgba(108,99,255,0.2)', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', overflow: 'hidden', backdropFilter: 'blur(6px)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#D4ECFB 30%,#A8D8A8 50%,#8BC48B 100%)' }} />
    {zones.map(z => <div key={z.id} style={{ position: 'absolute', left: `${z.x}%`, top: `${z.y}%`, transform: 'translate(-50%,-50%)', width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: '50%', background: visitedZones.has(z.id) ? '#FFD700' : z.color, border: '1.5px solid #fff' }} />)}
    <div style={{ position: 'absolute', left: `${charPos.x}%`, top: `${charPos.y}%`, transform: 'translate(-50%,-50%)', width: isMobile ? 5 : 6, height: isMobile ? 5 : 6, borderRadius: '50%', background: '#6C63FF', border: '1.5px solid #fff', animation: 'minimapBlink 1.5s ease-in-out infinite', zIndex: 2 }} />
    <div style={{ position: 'absolute', top: 2, left: 4, fontFamily: "'Silkscreen',cursive", fontSize: isMobile ? 5 : 6, color: '#3a3a5c', opacity: 0.6 }}>MAP</div></div>;
}

// ─── Mobile DPad ───
export function MobileDPad({ onDirStart, onDirEnd, onAction }) {
  const sz = 50;
  const gap = 5;
  const btn = { width: sz, height: sz, borderRadius: 12, background: 'rgba(108,99,255,0.18)', border: '2px solid rgba(108,99,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#6C63FF', cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent', touchAction: 'none' };
  const [p, setP] = useState({});
  const s = d => e => { e.preventDefault(); e.stopPropagation(); setP(v => ({ ...v, [d]: true })); onDirStart(d); };
  const en = d => e => { e.preventDefault(); e.stopPropagation(); setP(v => ({ ...v, [d]: false })); onDirEnd(d); };
  return <div role="group" aria-label="Movement controls" style={{ position: 'fixed', bottom: 'max(16px, env(safe-area-inset-bottom, 16px))', left: 16, zIndex: 90, display: 'grid', gridTemplateColumns: `${sz}px ${sz}px ${sz}px`, gridTemplateRows: `${sz}px ${sz}px ${sz}px`, gap: gap, touchAction: 'none' }}>
    <div /><div style={{ ...btn, ...(p.up ? { background: 'rgba(108,99,255,0.4)', transform: 'scale(0.95)' } : {}) }} onTouchStart={s('up')} onTouchEnd={en('up')} aria-label="Move up">▲</div><div />
    <div style={{ ...btn, ...(p.left ? { background: 'rgba(108,99,255,0.4)', transform: 'scale(0.95)' } : {}) }} onTouchStart={s('left')} onTouchEnd={en('left')} aria-label="Move left">◄</div>
    <div style={{ ...btn, background: 'rgba(255,215,0,0.25)', border: '2px solid rgba(255,215,0,0.35)', fontSize: 11, fontFamily: "'Silkscreen',cursive", color: '#D4A853', fontWeight: 700 }} onTouchStart={e => { e.preventDefault(); onAction(); }} aria-label="Enter zone">E</div>
    <div style={{ ...btn, ...(p.right ? { background: 'rgba(108,99,255,0.4)', transform: 'scale(0.95)' } : {}) }} onTouchStart={s('right')} onTouchEnd={en('right')} aria-label="Move right">►</div>
    <div /><div style={{ ...btn, ...(p.down ? { background: 'rgba(108,99,255,0.4)', transform: 'scale(0.95)' } : {}) }} onTouchStart={s('down')} onTouchEnd={en('down')} aria-label="Move down">▼</div>
    <div style={{ ...btn, background: 'rgba(255,165,0,0.18)', border: '2px solid rgba(255,165,0,0.3)', fontSize: 10, fontFamily: "'Silkscreen',cursive", color: '#E07B5A', fontWeight: 700, ...(p.sprint ? { background: 'rgba(255,165,0,0.4)', transform: 'scale(0.95)' } : {}) }} onTouchStart={s('sprint')} onTouchEnd={en('sprint')} aria-label="Sprint">⚡</div>
  </div>;
}