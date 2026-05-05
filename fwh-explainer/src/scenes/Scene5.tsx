import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 7 } });
  const clockScale = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 7 } });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const clockAngle = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.goldTint} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Hält Feuchtigkeit. Frisur sitzt länger.</p>
      </div>

      {/* Icons row */}
      <div style={styles.iconsRow}>
        {/* Water drop */}
        <div style={{ transform: `scale(${dropScale})`, ...styles.iconCard }}>
          <svg width="100" height="125" viewBox="0 0 100 125">
            <path d="M50 8 Q76 44 76 76 A26 26 0 0 1 24 76 Q24 44 50 8Z" fill="#4FC3F7" />
            <path d="M50 34 Q63 56 63 72 A13 13 0 0 1 37 72 Q37 56 50 34Z" fill="rgba(255,255,255,0.4)" />
          </svg>
          <p style={styles.iconLabel}>Feuchtigkeit</p>
        </div>

        {/* Character */}
        <div style={styles.charWrap}>
          <Character mood="happy" scale={0.65} />
        </div>

        {/* Clock */}
        <div style={{ transform: `scale(${clockScale})`, ...styles.iconCard }}>
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="50" fill="none" stroke="#C9A84C" strokeWidth="6" />
            <circle cx="55" cy="55" r="5" fill="#C9A84C" />
            <line x1="55" y1="55" x2="55" y2="22"
              stroke="#C9A84C" strokeWidth="5" strokeLinecap="round"
              transform={`rotate(${clockAngle * 0.5} 55 55)`} />
            <line x1="55" y1="55" x2="55" y2="14"
              stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockAngle} 55 55)`} />
          </svg>
          <p style={styles.iconLabel}>Länger halten</p>
        </div>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>FRISUR SITZT</p>
        <p style={styles.keywordSub}>Dank Premium-Satin innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f5f0e8' },
  goldTint: {
    background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.10) 0%, transparent 70%)',
  },
  titleBox: {
    position: 'absolute',
    top: 80,
    left: 40,
    right: 40,
    background: '#ffffff',
    borderRadius: 24,
    padding: '28px 36px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  titleText: {
    color: '#1a1a1a',
    fontSize: 52,
    fontWeight: 900,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.2,
  },
  iconsRow: {
    position: 'absolute',
    top: '36%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transformOrigin: 'center bottom',
  },
  iconLabel: {
    color: '#333',
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    marginTop: 12,
    textAlign: 'center',
  },
  charWrap: {
    marginBottom: -20,
  },
  keyword: {
    position: 'absolute',
    bottom: 100,
    left: 40,
    right: 40,
    textAlign: 'center',
  },
  keywordText: {
    color: '#C9A84C',
    fontSize: 86,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
  },
  keywordSub: {
    color: '#555',
    fontSize: 34,
    fontFamily: 'sans-serif',
    margin: '8px 0 0',
    fontWeight: 500,
  },
};
