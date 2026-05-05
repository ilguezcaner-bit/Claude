import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkScale = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, durationInFrames: 18, config: { damping: 7 } });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const keywordScale = spring({ frame: Math.max(0, frame - 20), fps, from: 0.6, to: 1, durationInFrames: 14, config: { damping: 10 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      {/* Gold tint */}
      <AbsoluteFill style={styles.goldTint} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Satin reduziert Reibung. Kein Frizz.</p>
      </div>

      {/* Character happy with thumbs up */}
      <div style={styles.charWrap}>
        <Character mood="thumbsup" scale={0.82} />
      </div>

      {/* Big green checkmark */}
      <div style={{
        ...styles.checkWrap,
        transform: `scale(${checkScale})`,
      }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="74" fill="rgba(0,180,80,0.15)" stroke="#00C853" strokeWidth="6" />
          <polyline points="38,80 66,108 122,50"
            fill="none" stroke="#00C853" strokeWidth="12"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Keyword */}
      <div style={{
        ...styles.keyword,
        opacity: keywordOpacity,
        transform: `scale(${keywordScale})`,
      }}>
        <p style={styles.keywordText}>SATIN</p>
        <p style={styles.keywordSub}>Smooth. Kein Frizz. Kein Haarbruch.</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f5f0e8' },
  goldTint: {
    background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.12) 0%, transparent 70%)',
  },
  titleBox: {
    position: 'absolute',
    top: 80,
    left: 40,
    right: 40,
    background: '#f0fff4',
    borderRadius: 24,
    padding: '28px 36px',
    boxShadow: '0 4px 24px rgba(0,180,80,0.15)',
    border: '2px solid rgba(0,180,80,0.2)',
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
    left: '15%',
  },
  checkWrap: {
    position: 'absolute',
    top: '42%',
    right: '10%',
    transformOrigin: 'center',
  },
  keyword: {
    position: 'absolute',
    bottom: 100,
    left: 40,
    right: 40,
    textAlign: 'center',
    transformOrigin: 'center',
  },
  keywordText: {
    color: '#C9A84C',
    fontSize: 120,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
    textShadow: '3px 3px 0px rgba(0,0,0,0.1)',
  },
  keywordSub: {
    color: '#555',
    fontSize: 34,
    fontFamily: 'sans-serif',
    margin: '8px 0 0',
    fontWeight: 500,
  },
};
