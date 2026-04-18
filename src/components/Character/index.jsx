import { useState, useEffect } from "react";

export function CharacterSprite({ pos, direction, isMoving, isSprinting }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!isMoving) { setFrame(0); return; }
    const iv = setInterval(() => setFrame(f => (f + 1) % 4), isSprinting ? 120 : 200);
    return () => clearInterval(iv);
  }, [isMoving, isSprinting]);

  const legF = [
    { l: { x: 10, h: 6 }, r: { x: 18, h: 6 } },
    { l: { x: 8, h: 7 }, r: { x: 20, h: 5 } },
    { l: { x: 10, h: 6 }, r: { x: 18, h: 6 } },
    { l: { x: 12, h: 5 }, r: { x: 16, h: 7 } },
  ];
  const armF = [
    { l: 18, r: 18 }, { l: 16, r: 20 },
    { l: 18, r: 18 }, { l: 20, r: 16 },
  ];
  const leg = isMoving ? legF[frame] : legF[0];
  const arm = isMoving ? armF[frame] : armF[0];
  const eo = direction === 'left' ? -2.5 : direction === 'right' ? 2.5 : 0;
  const ey = direction === 'up' ? 11 : 13;
  const sf = direction !== 'up';

  return (
    <div style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, transform: `translate(-50%,-50%) scale(${isSprinting ? 1.05 : 1})`, zIndex: 20, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: isSprinting ? 28 : 24, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.18)' }} />
      {isSprinting && isMoving && <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle,rgba(108,99,255,0.15),transparent 70%)', animation: 'sprintAura 0.4s ease-in-out infinite' }} />}
      <svg width="36" height="44" viewBox="0 0 32 40" style={{ overflow: 'visible' }}>
        {direction === 'up' && <path d={`M8 18 Q16 ${isMoving ? 32 + (frame % 2) * 3 : 30} 24 18`} fill="#9B8FFF" opacity="0.7" />}
        <rect x="8" y="16" width="16" height="14" rx="3" fill="#6C63FF" /><rect x="8" y="16" width="16" height="5" rx="2" fill="#7B73FF" />
        <rect x="8" y="26" width="16" height="2" rx="1" fill="#D4A853" /><rect x="14" y="25.5" width="4" height="3" rx="1" fill="#FFD700" />
        <circle cx="16" cy="12" r="9" fill="#FFD5B8" />
        {sf && <><circle cx="9" cy="14" r="2.5" fill="#FFB5A0" opacity="0.3" /><circle cx="23" cy="14" r="2.5" fill="#FFB5A0" opacity="0.3" /></>}
        <ellipse cx="16" cy="7" rx="10.5" ry="6.5" fill="#2D1B69" /><rect x="5.5" y="4" width="21" height="5.5" rx="3" fill="#2D1B69" />
        <ellipse cx="10" cy="8" rx="3" ry="4" fill="#3D2B79" /><ellipse cx="22" cy="8" rx="3" ry="4" fill="#3D2B79" />
        {sf && <><ellipse cx={13 + eo} cy={ey} rx="1.8" ry="2" fill="#2D1B69" /><ellipse cx={19 + eo} cy={ey} rx="1.8" ry="2" fill="#2D1B69" />
          <circle cx={13.7 + eo} cy={ey - 0.7} r="0.7" fill="#fff" /><circle cx={19.7 + eo} cy={ey - 0.7} r="0.7" fill="#fff" />
          {isMoving ? <ellipse cx="16" cy="16.5" rx="1.5" ry="1" fill="#E07B5A" /> : <path d="M14 16 Q16 17.5 18 16" stroke="#E07B5A" strokeWidth="0.8" fill="none" />}</>}
        {!sf && <><circle cx="16" cy="12" r="9" fill="#FFD5B8" /><ellipse cx="16" cy="8" rx="10" ry="7" fill="#2D1B69" /></>}
        <rect x="2" y={arm.l} width="6" height="10" rx="3" fill="#FFD5B8" /><rect x="24" y={arm.r} width="6" height="10" rx="3" fill="#FFD5B8" />
        <circle cx="5" cy={arm.l + 10} r="2.5" fill="#FFD5B8" /><circle cx="27" cy={arm.r + 10} r="2.5" fill="#FFD5B8" />
        <rect x={leg.l.x} y="30" width="4" height={leg.l.h} rx="2" fill="#4A4063" /><rect x={leg.r.x} y="30" width="4" height={leg.r.h} rx="2" fill="#4A4063" />
        <rect x={leg.l.x - 1} y={30 + leg.l.h - 3} width="6" height="3" rx="1.5" fill="#E07B5A" /><rect x={leg.r.x - 1} y={30 + leg.r.h - 3} width="6" height="3" rx="1.5" fill="#E07B5A" />
        {direction !== 'up' && <path d={`M10 20 Q16 ${isMoving ? 33 + (frame % 2) * 2 : 32} 22 20`} fill="#9B8FFF" opacity="0.4" />}
      </svg>
      <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Silkscreen',cursive", fontSize: 8, color: '#6C63FF', textShadow: '0 1px 3px rgba(255,255,255,0.9)', whiteSpace: 'nowrap', opacity: 0.8 }}>EXPLORER</div>
    </div>
  );
}