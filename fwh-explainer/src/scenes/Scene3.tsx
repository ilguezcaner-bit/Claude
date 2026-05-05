import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const xScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 8 } });
  const keywordOpacity = interpolate(frame, [16, 26], [0, 1], { extrapolateRight: 'clamp' });
  const shake = Math.sin(frame * 2.8) * 8 * Math.max(0, 1 - frame / 20);

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Auf Dauer strapaziert es dein Haar.</p>
      </div>

      {/* Character + X overlay */}
      <div style={{ ...styles.charWrap, transform: `translateX(${shake}px)` }}>
        <Character mood="confused" scale={0.78} />
        {/* Red X overlay */}
        <svg width={180 * xScale} height={180 * xScale} viewBox="0 0 180 180"
          style={{ position: 'absolute', top: 20, left: -20 }}>
          <circle cx="90" cy="90" r="84" fill="rgba(232,51,74,0.18)" stroke="#E8334A" strokeWidth="6" />
          <line x1="44" y1="44" x2="136" y2="136" stroke="#E8334A" strokeWidth="14" strokeLinecap="round" />
          <line x1="136" y1="44" x2="44" y2="136" stroke="#E8334A" strokeWidth="14" strokeLinecap="round" />
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>SCHADEN</p>
        <p style={styles.keywordSub}>Frizz · Haarbruch · Trockenheit</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f0ebe4' },
  titleBox: {
    position: 'absolute',
    top: 80,
    left: 40,
    right: 40,
    background: '#fff0f0',
    borderRadius: 24,
    padding: '28px 36px',
    boxShadow: '0 4px 24px rgba(232,51,74,0.15)',
    border: '2px solid rgba(232,51,74,0.2)',
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
  charWrap: {
    position: 'absolute',
    bottom: 300,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  keyword: {
    position: 'absolute',
    bottom: 100,
    left: 40,
    right: 40,
    textAlign: 'center',
  },
  keywordText: {
    color: '#E8334A',
    fontSize: 110,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
  },
  keywordSub: {
    color: '#666',
    fontSize: 34,
    fontFamily: 'sans-serif',
    margin: '8px 0 0',
    fontWeight: 500,
  },
};
