import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowProgress = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const keywordScale = spring({ frame: Math.max(0, frame - 20), fps, from: 0.6, to: 1, durationInFrames: 14, config: { damping: 10 } });
  const arrowLen = 340 * arrowProgress;

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Mehr Reibung. Weniger Feuchtigkeit.</p>
      </div>

      {/* Character left */}
      <div style={styles.charWrap}>
        <Character mood="explaining" scale={0.78} />
      </div>

      {/* Friction arrow — right side, no overlap */}
      <div style={styles.arrowArea}>
        <svg width="380" height="100" viewBox="0 0 380 100">
          <defs>
            <marker id="ah2" markerWidth="12" markerHeight="9" refX="12" refY="4.5" orient="auto">
              <polygon points="0 0, 12 4.5, 0 9" fill="#E8334A" />
            </marker>
          </defs>
          <text x="190" y="28" textAnchor="middle" fill="#E8334A"
            fontSize="24" fontWeight="900" fontFamily="sans-serif">REIBUNG</text>
          <line x1="20" y1="60" x2={20 + arrowLen} y2="60"
            stroke="#E8334A" strokeWidth="8" strokeLinecap="round"
            markerEnd="url(#ah2)" />
        </svg>
        {/* Hair strands */}
        <svg width="220" height="80" viewBox="0 0 220 80">
          {[0,1,2,3,4,5].map(i => (
            <line key={i}
              x1={20 + i * 36} y1="10"
              x2={20 + i * 36 + (i % 2 === 0 ? 12 : -12)} y2="70"
              stroke="#8B4513" strokeWidth="4" strokeLinecap="round"
              style={{ opacity: arrowProgress }} />
          ))}
          <text x="110" y="78" textAnchor="middle" fontSize="20"
            fontFamily="sans-serif" fill="#888">Haar</text>
        </svg>
      </div>

      {/* Keyword — center safe zone */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity, transform: `scale(${keywordScale})` }}>
        <p style={styles.keywordText}>REIBUNG</p>
        <p style={styles.keywordSub}>Baumwolle schadet deinem Haar</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f0ebe4' },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: '#fff0f0',
    borderRadius: 24,
    padding: '32px 40px',
    boxShadow: '0 6px 30px rgba(232,51,74,0.12)',
    border: '2px solid rgba(232,51,74,0.18)',
  },
  titleText: {
    color: '#E8334A',
    fontSize: 54,
    fontWeight: 900,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.2,
  },
  charWrap: {
    position: 'absolute',
    top: 460,
    left: 40,
  },
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
    top: 1100,
    left: 50,
    right: 50,
    textAlign: 'center',
    transformOrigin: 'center',
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
    fontSize: 36,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
