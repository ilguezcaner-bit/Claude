import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowProgress = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const keywordScale = spring({ frame: Math.max(0, frame - 20), fps, from: 0.6, to: 1, durationInFrames: 14, config: { damping: 10 } });
  const arrowLen = 340 * arrowProgress;

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.topBar} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleLabel}>THE PROBLEM</p>
        <p style={styles.titleText}>Mehr Reibung. Weniger Feuchtigkeit.</p>
      </div>

      {/* Character left */}
      <div style={styles.charWrap}>
        <Character mood="explaining" scale={0.78} />
      </div>

      {/* Friction arrow — right side */}
      <div style={styles.arrowArea}>
        <svg width="380" height="100" viewBox="0 0 380 100">
          <defs>
            <marker id="ah2" markerWidth="12" markerHeight="9" refX="12" refY="4.5" orient="auto">
              <polygon points="0 0, 12 4.5, 0 9" fill={SW.red} />
            </marker>
          </defs>
          <text x="190" y="28" textAnchor="middle" fill={SW.red}
            fontSize="24" fontWeight="900" fontFamily="Impact, sans-serif" letterSpacing="4">REIBUNG</text>
          <line x1="20" y1="60" x2={20 + arrowLen} y2="60"
            stroke={SW.red} strokeWidth="8" strokeLinecap="round"
            markerEnd="url(#ah2)" />
        </svg>
        <svg width="220" height="80" viewBox="0 0 220 80">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={i}
              x1={20 + i * 36} y1="10"
              x2={20 + i * 36 + (i % 2 === 0 ? 12 : -12)} y2="70"
              stroke={SW.gold} strokeWidth="4" strokeLinecap="round"
              style={{ opacity: arrowProgress }} />
          ))}
          <text x="110" y="78" textAnchor="middle" fontSize="18"
            fontFamily="Impact, sans-serif" fill="#444" letterSpacing="2">HAAR</text>
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity, transform: `scale(${keywordScale})` }}>
        <p style={styles.keywordText}>REIBUNG</p>
        <p style={styles.keywordSub}>Baumwolle schadet deinem Haar</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: SW.bgPure },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', opacity: 0.8 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: SW.red },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: SW.bgCardRed,
    borderRadius: 4,
    padding: '28px 40px 32px',
    borderLeft: `6px solid ${SW.red}`,
    borderTop: '1px solid rgba(232,51,74,0.2)',
    borderRight: '1px solid rgba(232,51,74,0.2)',
    borderBottom: '1px solid rgba(232,51,74,0.2)',
  },
  titleLabel: {
    color: SW.red,
    fontSize: 22,
    fontWeight: 700,
    fontFamily: SW.fontBody,
    letterSpacing: 6,
    margin: '0 0 10px',
    textTransform: 'uppercase' as const,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 54,
    fontFamily: SW.fontDisplay,
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: -1,
    textTransform: 'uppercase' as const,
  },
  charWrap: { position: 'absolute', top: 460, left: 40 },
  arrowArea: {
    position: 'absolute',
    top: 540,
    right: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  keyword: {
    position: 'absolute',
    top: 1090,
    left: 50,
    right: 50,
    textAlign: 'center',
    transformOrigin: 'center',
  },
  keywordText: {
    color: SW.red,
    fontSize: 110,
    fontFamily: SW.fontDisplay,
    margin: 0,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
    WebkitTextStroke: `2px rgba(232,51,74,0.3)`,
  },
  keywordSub: {
    color: '#555',
    fontSize: 32,
    fontFamily: SW.fontBody,
    margin: '8px 0 0',
    letterSpacing: 3,
    textTransform: 'uppercase' as const,
  },
};
