import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Mood = 'confused' | 'happy' | 'explaining' | 'thumbsup';

interface CharacterProps {
  mood?: Mood;
  scale?: number;
  x?: number;
}

export const Character: React.FC<CharacterProps> = ({ mood = 'explaining', scale = 1, x = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Idle body bob
  const bob = Math.sin(frame * 0.08) * 4;

  // Arm wave for explaining
  const armAngle = mood === 'explaining'
    ? Math.sin(frame * 0.12) * 18
    : mood === 'thumbsup' ? -40 : 0;

  // Question mark opacity for confused
  const qOpacity = mood === 'confused' ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1]) : 0;

  const eyeSquint = mood === 'happy' || mood === 'thumbsup';
  const mouthSmile = mood === 'happy' || mood === 'thumbsup';

  return (
    <svg
      width={320 * scale}
      height={520 * scale}
      viewBox="0 0 320 520"
      style={{ transform: `translateX(${x}px) translateY(${bob}px)`, overflow: 'visible' }}
    >
      {/* Shadow */}
      <ellipse cx="160" cy="510" rx="70" ry="12" fill="rgba(0,0,0,0.12)" />

      {/* Body / Suit */}
      <rect x="105" y="230" width="110" height="160" rx="14" fill="#2c2c3e" />

      {/* Shirt / Tie */}
      <rect x="148" y="230" width="24" height="120" rx="4" fill="#ffffff" />
      {/* Tie */}
      <polygon points="160,240 153,280 160,295 167,280" fill="#E8334A" />

      {/* Collar */}
      <polygon points="148,230 160,255 172,230 162,230 160,240 158,230" fill="#f0f0f0" />

      {/* Left arm */}
      <g style={{ transformOrigin: '113px 245px', transform: `rotate(${mood === 'confused' ? 30 : armAngle}deg)` }}>
        <rect x="78" y="235" width="36" height="110" rx="18" fill="#2c2c3e" />
        {/* Left hand */}
        <ellipse cx="96" cy="352" rx="18" ry="18" fill="#F4C27F" />
        {mood === 'confused' && (
          <text x="50" y="320" fontSize="36" fill="#333">🤷</text>
        )}
      </g>

      {/* Right arm */}
      <g style={{ transformOrigin: '207px 245px', transform: `rotate(${mood === 'confused' ? -30 : -armAngle}deg)` }}>
        <rect x="206" y="235" width="36" height="110" rx="18" fill="#2c2c3e" />
        {/* Right hand */}
        <ellipse cx="224" cy="352" rx="18" ry="18" fill="#F4C27F" />
        {mood === 'thumbsup' && (
          <text x="215" y="290" fontSize="38">👍</text>
        )}
      </g>

      {/* Legs */}
      <rect x="115" y="385" width="38" height="110" rx="14" fill="#1a1a2e" />
      <rect x="167" y="385" width="38" height="110" rx="14" fill="#1a1a2e" />
      {/* Shoes */}
      <ellipse cx="134" cy="497" rx="28" ry="12" fill="#111" />
      <ellipse cx="186" cy="497" rx="28" ry="12" fill="#111" />

      {/* Neck */}
      <rect x="148" y="200" width="24" height="34" rx="6" fill="#F4C27F" />

      {/* Head */}
      <ellipse cx="160" cy="168" rx="68" ry="76" fill="#F4C27F" />

      {/* Hair */}
      <path d="M92 140 Q96 88 160 80 Q224 88 228 140 Q210 108 160 108 Q110 108 92 140Z" fill="#1a1a1a" />
      {/* Hair top detail */}
      <path d="M128 82 Q160 68 192 82 Q178 72 160 70 Q142 72 128 82Z" fill="#333" />

      {/* Eyes */}
      {eyeSquint ? (
        <>
          <path d="M132 162 Q140 155 148 162" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M172 162 Q180 155 188 162" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="140" cy="165" rx="12" ry="14" fill="#fff" />
          <ellipse cx="180" cy="165" rx="12" ry="14" fill="#fff" />
          <ellipse cx="141" cy="166" rx="7" ry="8" fill="#1a1a1a" />
          <ellipse cx="181" cy="166" rx="7" ry="8" fill="#1a1a1a" />
          <ellipse cx="143" cy="163" rx="3" ry="3" fill="#fff" />
          <ellipse cx="183" cy="163" rx="3" ry="3" fill="#fff" />
          {mood === 'confused' && (
            <>
              <line x1="130" y1="150" x2="148" y2="157" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
              <line x1="190" y1="150" x2="172" y2="157" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </>
      )}

      {/* Mouth */}
      {mouthSmile ? (
        <path d="M140 198 Q160 215 180 198" stroke="#c0392b" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : mood === 'confused' ? (
        <path d="M140 205 Q160 195 180 205" stroke="#c0392b" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M143 200 Q160 210 177 200" stroke="#c0392b" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}

      {/* Cheeks */}
      <ellipse cx="120" cy="190" rx="14" ry="8" fill="rgba(240,120,100,0.25)" />
      <ellipse cx="200" cy="190" rx="14" ry="8" fill="rgba(240,120,100,0.25)" />

      {/* Question mark */}
      <text
        x="218"
        y="130"
        fontSize="52"
        fill="#555"
        fontWeight="900"
        style={{ opacity: qOpacity }}
      >?</text>
    </svg>
  );
};
