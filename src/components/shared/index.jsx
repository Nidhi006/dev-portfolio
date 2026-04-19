import { useState, useEffect, useMemo } from "react";

// ─── Particles ───
export function Particles() {
  const p = useMemo(() => Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 4 + 2, dur: Math.random() * 8 + 6, del: Math.random() * 5, op: Math.random() * 0.35 + 0.1 })), []);
  return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
    {p.map(v => <div key={v.id} style={{ position: 'absolute', left: `${v.x}%`, top: `${v.y}%`, width: v.size, height: v.size, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,220,100,0.8),rgba(255,180,50,0.2))', opacity: v.op, animation: `floatParticle ${v.dur}s ease-in-out ${v.del}s infinite`, boxShadow: '0 0 6px rgba(255,200,50,0.3)' }} />)}
  </div>;
}

// ─── Footstep Dust ───
export function FootstepDust({ steps }) {
  return <>{steps.map(s => <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', width: 8, height: 8, borderRadius: '50%', background: 'rgba(180,160,120,0.4)', animation: 'dustFade 0.8s ease forwards', pointerEvents: 'none', zIndex: 15 }} />)}</>;
}

// ─── Zone Decorative Backgrounds ───
export function ZoneBG({ type }) {
  if (type === 'village') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,#FFF5E6 0%,#FFFCF5 100%)' }} />
      {[15, 35, 60, 80].map((x, i) => <div key={i} style={{ position: 'absolute', bottom: 0, left: `${x}%`, width: 3, height: 30 + i * 10, background: '#C8B8A0', borderRadius: '2px 2px 0 0', opacity: 0.15 }} />)}
      {[20, 45, 70, 90].map((x, i) => <div key={i} style={{ position: 'absolute', top: `${20 + i * 15}%`, left: `${x}%`, fontSize: 16, opacity: 0.06, transform: 'rotate(-10deg)' }}>{['🏠', '🌸', '🌻', '🦋'][i]}</div>)}
    </div>
  );
  if (type === 'forest') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,#E8F5E9 0%,#FFFCF5 100%)' }} />
      {[10, 25, 40, 55, 70, 85].map((x, i) => <div key={i} style={{ position: 'absolute', top: `${10 + i * 12}%`, left: `${x}%`, fontSize: 20 + i * 2, opacity: 0.05, transform: `rotate(${i * 15}deg)` }}>🌿</div>)}
    </div>
  );
  if (type === 'castle') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,#E8EAF6 0%,#FFFCF5 100%)' }} />
      {[15, 50, 85].map((x, i) => <div key={i} style={{ position: 'absolute', top: 60, left: `${x}%`, transform: 'translateX(-50%)', fontSize: 28, opacity: 0.05 }}>🏰</div>)}
    </div>
  );
  if (type === 'town') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,#FFF8E1 0%,#FFFCF5 100%)' }} />
    </div>
  );
  if (type === 'cave') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,#F3E5F5 0%,#FFFCF5 100%)' }} />
      {[20, 50, 80].map((x, i) => <div key={i} style={{ position: 'absolute', top: `${15 + i * 20}%`, left: `${x}%`, fontSize: 24, opacity: 0.04, animation: `floatParticle ${6 + i * 2}s ease-in-out infinite` }}>💎</div>)}
    </div>
  );
  if (type === 'tavern') return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(180deg,#FBE9E7 0%,#FFFCF5 100%)' }} />
    </div>
  );
  return null;
}

// ─── SVG Radar Chart for Profile ───
export function RadarChart({ stats, size = 220 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const n = stats.length;
  const getPoint = (i, val) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const d = (val / 100) * r;
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) };
  };
  const gridLevels = [20, 40, 60, 80, 100];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto' }}>
      {gridLevels.map(lv => {
        const pts = Array.from({ length: n }, (_, i) => getPoint(i, lv));
        return <polygon key={lv} points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(108,99,255,0.08)" strokeWidth="1" />;
      })}
      {stats.map((_, i) => { const p = getPoint(i, 100); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(108,99,255,0.06)" strokeWidth="1" />; })}
      <polygon points={stats.map((s, i) => { const p = getPoint(i, s.value); return `${p.x},${p.y}`; }).join(' ')} fill="rgba(108,99,255,0.15)" stroke="#6C63FF" strokeWidth="2.5" strokeLinejoin="round">
        <animate attributeName="opacity" from="0" to="1" dur="1s" fill="freeze" />
      </polygon>
      {stats.map((s, i) => { const p = getPoint(i, s.value); const lp = getPoint(i, 115); return <g key={i}>
        <circle cx={p.x} cy={p.y} r="4" fill="#6C63FF" stroke="#fff" strokeWidth="2"><animate attributeName="r" from="0" to="4" dur="0.8s" fill="freeze" begin={`${i * 0.1}s`} /></circle>
        <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontFamily="Silkscreen,cursive" fill="#3a3a5c" fontWeight="700">{s.label}</text>
        <text x={lp.x} y={lp.y + 10} textAnchor="middle" dominantBaseline="middle" fontSize="7" fontFamily="Nunito,sans-serif" fill="#888">{s.value}</text>
      </g>; })}
    </svg>
  );
}

// ─── Skill Tooltip ───
export function SkillTooltip({ skill, catColor }) {
  return (
    <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8, background: 'rgba(255,255,255,0.98)', borderRadius: 12, padding: '10px 14px', fontSize: 11, fontFamily: "'Nunito',sans-serif", color: '#555', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', animation: 'fadeInQuick 0.15s ease', whiteSpace: 'nowrap', zIndex: 50, border: `2px solid ${catColor}22`, textAlign: 'center' }}>
      <div style={{ fontWeight: 700, color: '#3a3a5c', marginBottom: 2 }}>{skill.name}</div>
      <div style={{ fontSize: 10, color: '#888' }}>{skill.desc}</div>
      <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>{Array.from({ length: 5 }, (_, j) => <div key={j} style={{ width: 10, height: 10, borderRadius: 2, background: j < skill.level ? catColor : 'rgba(0,0,0,0.08)' }} />)}</div>
      <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid rgba(255,255,255,0.98)' }} />
    </div>
  );
}

// ─── Easter Egg ───
export function EasterEgg({ egg, found, onFind }) {
  const [h, setH] = useState(false);
    const colors = { cloud: "#5BC0EB", star: "#FDE74C", gem: "#C47ED0", mushroom: "#E55934", scroll: "#9BC53D", fairy: "#FA7921" };
  if (found) return null;
  return <div onClick={() => onFind(egg)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: 'absolute', left: `${egg.x}%`, top: `${egg.y}%`, transform: 'translate(-50%,-50%)', fontSize: h ? 22 : 13, cursor: 'pointer', zIndex: 8, opacity: h ? 1 : 0.25, transition: 'all 0.3s', filter: h ? 'drop-shadow(0 0 10px gold)' : 'none' }}>
        <span style={{ display: 'inline-block', width: h ? 22 : 14, height: h ? 28 : 18, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: `linear-gradient(135deg, ${colors[egg.id] || '#FFD700'}, ${colors[egg.id] || '#FFD700'}88)`, border: '2px solid rgba(255,255,255,0.6)', boxShadow: `0 0 ${h ? 10 : 4}px ${colors[egg.id] || '#FFD700'}88`, transition: 'all 0.3s' }} />
    </div>;
}

// ─── Zone Marker ───
export function ZoneMarker({ zone, isVisited, onEnter, charPos }) {
  const [h, setH] = useState(false);
  const dist = Math.sqrt(Math.pow(charPos.x - zone.x, 2) + Math.pow(charPos.y - zone.y, 2));
  const near = dist < 10;
  return <div onClick={() => onEnter(zone.id)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: 'absolute', left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%,-50%)', cursor: 'pointer', zIndex: 10 }}>
    <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', background: `radial-gradient(circle,${zone.color}55,transparent 70%)`, animation: near ? 'pulseGlow 1.2s ease-in-out infinite' : 'pulseGlow 3s ease-in-out infinite', opacity: h || near ? 1 : 0.5, transition: 'opacity 0.3s' }} />
    <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(145deg,${zone.color},${zone.color}bb)`, border: `3px solid ${isVisited ? '#FFD700' : '#fff'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: isVisited ? `0 0 24px ${zone.color}88,0 0 48px #FFD70033` : `0 0 18px ${zone.color}55`, animation: h ? 'bounceMarker 0.6s ease-in-out infinite' : 'none', transform: h ? 'scale(1.18)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', position: 'relative' }}>
      {zone.icon}{isVisited && <div style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: '#FFD700', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</div>}</div>
    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 10, whiteSpace: 'nowrap', textAlign: 'center', opacity: h || near ? 1 : 0.75, transition: 'all 0.3s' }}>
      <div style={{ fontFamily: "'Silkscreen',cursive", fontSize: 11, fontWeight: 700, color: '#3a3a5c', textShadow: '0 1px 3px rgba(255,255,255,0.9)' }}>{zone.name}</div>
      {(h || near) && <div style={{ fontSize: 10, color: '#666', marginTop: 2, fontFamily: "'Nunito',sans-serif", animation: 'fadeInQuick 0.2s ease' }}>{zone.subtitle}</div>}</div>
    {near && <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 14, background: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: '5px 12px', fontSize: 10, whiteSpace: 'nowrap', fontFamily: "'Nunito',sans-serif", boxShadow: '0 2px 12px rgba(0,0,0,0.12)', animation: 'fadeInQuick 0.2s ease,bounceMarker 2s ease-in-out infinite', color: '#3a3a5c', fontWeight: 600, border: `2px solid ${zone.color}44` }}>Press <b>E</b> or Click ✨</div>}
  </div>;
}

// ─── Map NPC ───
export function MapNPC({ npc, charPos }) {
  const [showMsg, setShowMsg] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dist = Math.sqrt(Math.pow(charPos.x - npc.x, 2) + Math.pow(charPos.y - npc.y, 2));
  const near = dist < 8;
  const vis = near || hovered;
  useEffect(() => { if (near) setShowMsg(true); else if (!hovered) { const t = setTimeout(() => setShowMsg(false), 600); return () => clearTimeout(t); } }, [near, hovered]);
  useEffect(() => { if (hovered) setShowMsg(true); }, [hovered]);
  return <div onMouseEnter={() => { setHovered(true); setShowMsg(true); }} onMouseLeave={() => { setHovered(false); if (!near) setTimeout(() => setShowMsg(false), 400); }} style={{ position: 'absolute', left: `${npc.x}%`, top: `${npc.y}%`, transform: 'translate(-50%,-50%)', zIndex: showMsg ? 30 : 9, cursor: 'pointer' }}>
    <div style={{ fontSize: 28, animation: 'bob 3s ease-in-out infinite', textShadow: '0 2px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s', transform: vis ? 'scale(1.15)' : 'scale(1)' }}>{npc.icon}</div>
    {showMsg && <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 10, background: 'rgba(255,255,255,0.97)', borderRadius: 12, padding: '8px 14px', fontSize: 11, fontFamily: "'Nunito',sans-serif", color: '#555', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', animation: 'fadeInQuick 0.2s ease', maxWidth: 210, whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.5, border: '1px solid rgba(108,99,255,0.1)', zIndex: 31 }}>
      <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid rgba(255,255,255,0.97)' }} />"{npc.message}"</div>}
  </div>;
}