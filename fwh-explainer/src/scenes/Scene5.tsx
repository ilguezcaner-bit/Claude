import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 7 } });
  const clockScale = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 7 } });
  const textOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' });

  // clock hand rotation
  const clockAngle = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.background} />

      <div style={styles.iconsRow}>
        {/* Water drop */}
        <div style={{ transform: `scale(${dropScale})`, ...styles.iconCard }}>
          <svg width="120" height="150" viewBox="0 0 120 150">
            <path d="M60 10 Q90 50 90 90 A30 30 0 0 1 30 90 Q30 50 60 10Z"
              fill="#4FC3F7" opacity="0.9" />
            <path d="M60 40 Q75 65 75 85 A15 15 0 0 1 45 85 Q45 65 60 40Z"
              fill="rgba(255,255,255,0.35)" />
          </svg>
          <p style={styles.iconLabel}>Feuchtigkeit</p>
        </div>

        {/* Clock */}
        <div style={{ transform: `scale(${clockScale})`, ...styles.iconCard }}>
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="58" fill="none" stroke="#C9A84C" strokeWidth="6" />
            <circle cx="65" cy="65" r="5" fill="#C9A84C" />
            {/* Hour hand */}
            <line x1="65" y1="65" x2="65" y2="28"
              stroke="#C9A84C" strokeWidth="5" strokeLinecap="round"
              transform={`rotate(${clockAngle * 0.5} 65 65)`} />
            {/* Minute hand */}
            <line x1="65" y1="65" x2="65" y2="18"
              stroke="#FFD54F" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockAngle} 65 65)`} />
            {/* Tick marks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
              <line key={a}
                x1={65 + 48 * Math.sin((a * Math.PI) / 180)}
                y1={65 - 48 * Math.cos((a * Math.PI) / 180)}
                x2={65 + 55 * Math.sin((a * Math.PI) / 180)}
                y2={65 - 55 * Math.cos((a * Math.PI) / 180)}
                stroke="#C9A84C" strokeWidth="2" />
            ))}
          </svg>
          <p style={styles.iconLabel}>Länger halten</p>
        </div>
      </div>

      {/* Text */}
      <div style={{ ...styles.textBox, opacity: textOpacity }}>
        <p style={styles.text}>„Hält Feuchtigkeit. Frisur sitzt länger."</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden' },
  background: {
    background: 'radial-gradient(ellipse at 50% 40%, #3d2a00 0%, #1a1000 60%, #0a0a0a 100%)',
  },
  iconsRow: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transformOrigin: 'center bottom',
  },
  iconLabel: {
    color: '#FFD54F',
    fontSize: 32,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    marginTop: 16,
    textAlign: 'center',
  },
  textBox: {
    position: 'absolute',
    bottom: 160,
    left: 60,
    right: 60,
    background: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: '24px 32px',
    border: '1px solid rgba(201,168,76,0.4)',
  },
  text: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.3,
  },
};
