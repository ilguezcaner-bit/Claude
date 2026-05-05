import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowProgress = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const keywordOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' });
  const keywordScale = spring({ frame: Math.max(0, frame - 18), fps, from: 0.6, to: 1, durationInFrames: 14, config: { damping: 10 } });
  const shake = frame > 10 ? Math.sin(frame * 2.2) * 6 * Math.max(0, 1 - (frame - 10) / 25) : 0;

  const arrowLen = 320 * arrowProgress;

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.paperTexture} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Mehr Reibung. Weniger Feuchtigkeit.</p>
      </div>

      {/* Character explaining */}
      <div style={{ ...styles.charWrap, transform: `translateX(${shake}px)` }}>
        <Character mood="explaining" scale={0.75} />
      </div>

      {/* Friction arrow graphic */}
      <div style={styles.arrowArea}>
        <svg width="420" height="90" viewBox="0 0 420 90">
          <defs>
            <marker id="ah" markerWidth="12" markerHeight="9" refX="12" refY="4.5" orient="auto">
              <polygon points="0 0, 12 4.5, 0 9" fill="#E8334A" />
            </marker>
          </defs>
          <line x1="20" y1="45" x2={20 + arrowLen} y2="45"
            stroke="#E8334A" strokeWidth="7" strokeLinecap="round"
            markerEnd="url(#ah)" />
          <text x="210" y="28" textAnchor="middle" fill="#E8334A"
            fontSize="22" fontWeight="900" fontFamily="sans-serif">REIBUNG</text>
          {/* Hair strands getting damaged */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i}
              x1={310 + i * 18} y1="60"
              x2={310 + i * 18 + (i % 2 === 0 ? 8 : -8)} y2="85"
              stroke="#8B4513" strokeWidth="3" strokeLinecap="round"
              style={{ opacity: arrowProgress }} />
          ))}
        </svg>
        <p style={styles.arrowLabel}>Baumwolle → Haar</p>
      </div>

      {/* Keyword */}
      <div style={{
        ...styles.keyword,
        opacity: keywordOpacity,
        transform: `scale(${keywordScale})`,
      }}>
        <p style={styles.keywordText}>REIBUNG</p>
        <p style={styles.keywordSub}>Baumwolle schadet deinem Haar</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f0ebe4' },
  paperTexture: {
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, transparent 28px)',
  },
  titleBox: {
    position: 'absolute',
    top: 80,
    left: 40,
    right: 40,
    background: '#ffffff',
    borderRadius: 24,
    padding: '28px 36px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  },
  titleText: {
    color: '#E8334A',
    fontSize: 52,
    fontWeight: 900,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.2,
  },
  charWrap: {
    position: 'absolute',
    bottom: 320,
    left: '15%',
  },
  arrowArea: {
    position: 'absolute',
    top: '45%',
    right: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrowLabel: {
    color: '#888',
    fontSize: 26,
    fontFamily: 'sans-serif',
    marginTop: 8,
    textAlign: 'center',
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
    color: '#E8334A',
    fontSize: 110,
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
