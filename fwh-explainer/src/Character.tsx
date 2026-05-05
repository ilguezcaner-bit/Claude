import { interpolate, useCurrentFrame } from 'remotion';

type Mood = 'confused' | 'happy' | 'explaining' | 'thumbsup';

interface CharacterProps {
  mood?: Mood;
  scale?: number;
  x?: number;
}

export const Character: React.FC<CharacterProps> = ({ mood = 'explaining', scale = 1, x = 0 }) => {
  const frame = useCurrentFrame();

  const bob = Math.sin(frame * 0.08) * 4;
  const armAngle = mood === 'explaining'
    ? Math.sin(frame * 0.12) * 18
    : mood === 'thumbsup' ? -40 : 0;
  const qOpacity = mood === 'confused' ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1]) : 0;
  const eyeSquint = mood === 'happy' || mood === 'thumbsup';
  const mouthSmile = mood === 'happy' || mood === 'thumbsup';

  return (
    <svg
      width={320 * scale}
      height={550 * scale}
      viewBox="0 0 320 550"
      style={{ transform: `translateX(${x}px) translateY(${bob}px)`, overflow: 'visible' }}
    >
      {/* Shadow */}
      <ellipse cx="160" cy="538" rx="78" ry="14" fill="rgba(0,0,0,0.35)" />

      {/* Chunky sneakers — left */}
      <rect x="93" y="490" width="58" height="24" rx="10" fill="#C9A84C" />
      <rect x="90" y="478" width="54" height="18" rx="7" fill="#1a1a1a" />
      <rect x="94" y="484" width="46" height="6" rx="3" fill="#C9A84C" opacity="0.4" />

      {/* Chunky sneakers — right */}
      <rect x="169" y="490" width="58" height="24" rx="10" fill="#C9A84C" />
      <rect x="172" y="478" width="54" height="18" rx="7" fill="#1a1a1a" />
      <rect x="176" y="484" width="46" height="6" rx="3" fill="#C9A84C" opacity="0.4" />

      {/* Baggy joggers */}
      <rect x="96" y="365" width="56" height="126" rx="20" fill="#1e1e1e" />
      <rect x="168" y="365" width="56" height="126" rx="20" fill="#1e1e1e" />
      {/* Cuffs */}
      <rect x="96" y="468" width="56" height="18" rx="7" fill="#111" />
      <rect x="168" y="468" width="56" height="18" rx="7" fill="#111" />

      {/* Oversized hoodie body */}
      <rect x="76" y="210" width="168" height="168" rx="24" fill="#111" />

      {/* Kangaroo pocket */}
      <rect x="118" y="305" width="84" height="50" rx="14" fill="#0a0a0a" />

      {/* FWH logo on chest */}
      <text x="160" y="272" textAnchor="middle" fontSize="22" fontWeight="900"
        fontFamily="sans-serif" fill="#C9A84C" letterSpacing="1">FWH</text>

      {/* Gold chain */}
      <path d="M130 228 Q160 252 190 228" fill="none" stroke="#C9A84C" strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="160" cy="250" rx="7" ry="7" fill="#C9A84C" />
      <ellipse cx="160" cy="250" rx="3.5" ry="3.5" fill="#0a0a0a" />

      {/* Left arm */}
      <g style={{ transformOrigin: '90px 228px', transform: `rotate(${mood === 'confused' ? 30 : armAngle}deg)` }}>
        <rect x="55" y="216" width="44" height="120" rx="22" fill="#111" />
        <rect x="57" y="318" width="40" height="16" rx="7" fill="#0a0a0a" />
        <ellipse cx="77" cy="346" rx="20" ry="20" fill="#F4C27F" />
        {mood === 'confused' && <text x="28" y="318" fontSize="34">🤷</text>}
      </g>

      {/* Right arm */}
      <g style={{ transformOrigin: '230px 228px', transform: `rotate(${mood === 'confused' ? -30 : -armAngle}deg)` }}>
        <rect x="221" y="216" width="44" height="120" rx="22" fill="#111" />
        <rect x="223" y="318" width="40" height="16" rx="7" fill="#0a0a0a" />
        <ellipse cx="243" cy="346" rx="20" ry="20" fill="#F4C27F" />
        {mood === 'thumbsup' && <text x="232" y="290" fontSize="38">👍</text>}
      </g>

      {/* Neck */}
      <rect x="148" y="196" width="24" height="20" rx="6" fill="#F4C27F" />

      {/* Hoodie collar */}
      <path d="M118 214 Q160 242 202 214 Q184 204 160 200 Q136 204 118 214Z" fill="#0a0a0a" />

      {/* Head */}
      <ellipse cx="160" cy="162" rx="70" ry="76" fill="#F4C27F" />

      {/* Hair — clean fade on sides */}
      <path d="M92 138 Q98 86 160 78 Q222 86 228 138 Q210 104 160 104 Q110 104 92 138Z" fill="#111" />

      {/* Backwards snapback cap */}
      {/* Cap body */}
      <path d="M92 136 Q160 90 228 136 Q216 108 160 100 Q104 108 92 136Z" fill="#1a1a1a" />
      {/* Cap band */}
      <rect x="90" y="133" width="140" height="13" rx="4" fill="#0d0d0d" />
      {/* Gold snapback adjuster band at back */}
      <rect x="140" y="132" width="40" height="8" rx="3" fill="#C9A84C" opacity="0.8" />
      {/* Brim pointing backwards (left) */}
      <rect x="30" y="128" width="70" height="15" rx="5" fill="#1a1a1a" />
      <rect x="30" y="134" width="70" height="5" rx="3" fill="#0d0d0d" opacity="0.5" />

      {/* Eyes */}
      {eyeSquint ? (
        <>
          <path d="M128 160 Q140 152 152 160" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M168 160 Q180 152 192 160" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="140" cy="162" rx="12" ry="14" fill="#fff" />
          <ellipse cx="180" cy="162" rx="12" ry="14" fill="#fff" />
          <ellipse cx="141" cy="163" rx="7" ry="8" fill="#1a1a1a" />
          <ellipse cx="181" cy="163" rx="7" ry="8" fill="#1a1a1a" />
          <ellipse cx="143" cy="160" rx="3" ry="3" fill="#fff" />
          <ellipse cx="183" cy="160" rx="3" ry="3" fill="#fff" />
          {mood === 'confused' && (
            <>
              <line x1="128" y1="147" x2="148" y2="154" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
              <line x1="192" y1="147" x2="172" y2="154" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </>
      )}

      {/* Mouth */}
      {mouthSmile ? (
        <path d="M138 194 Q160 212 182 194" stroke="#c0392b" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : mood === 'confused' ? (
        <path d="M140 202 Q160 192 180 202" stroke="#c0392b" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M142 198 Q160 210 178 198" stroke="#c0392b" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}

      {/* Cheeks */}
      <ellipse cx="118" cy="186" rx="14" ry="8" fill="rgba(240,120,100,0.22)" />
      <ellipse cx="202" cy="186" rx="14" ry="8" fill="rgba(240,120,100,0.22)" />

      {/* Question mark */}
      <text x="222" y="125" fontSize="52" fill="#C9A84C" fontWeight="900"
        style={{ opacity: qOpacity }}>?</text>
    </svg>
  );
};
