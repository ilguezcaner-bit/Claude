import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charX = spring({ frame, fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const titleOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [8, 20], [-40, 0], { extrapolateRight: 'clamp' });
  const keywordOpacity = interpolate(frame, [22, 32], [0, 1], { extrapolateRight: 'clamp' });
  const keywordScale = spring({ frame: Math.max(0, frame - 22), fps, from: 0.7, to: 1, durationInFrames: 14, config: { damping: 10 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.paperTexture} />

      {/* Title — top safe zone */}
      <div style={{ ...styles.titleBox, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={styles.titleText}>Was steckt in deiner Cap?</p>
      </div>

      {/* Character — center */}
      <div style={{ ...styles.charWrap, transform: `translateX(${charX}px)` }}>
        <Character mood="confused" scale={0.9} />
      </div>

      {/* Keyword — center-bottom safe zone */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity, transform: `scale(${keywordScale})` }}>
        <p style={styles.keywordText}>BAUMWOLLE</p>
        <p style={styles.keywordSub}>Die meisten Caps innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f0ebe4' },
  paperTexture: {
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.012) 0px, rgba(0,0,0,0.012) 1px, transparent 1px, transparent 30px)',
  },
  titleBox: {
    position: 'absolute',
    top: 160,
    left: 50,
    right: 50,
    background: '#ffffff',
    borderRadius: 24,
    padding: '32px 40px',
    boxShadow: '0 6px 30px rgba(0,0,0,0.10)',
  },
  titleText: {
    color: '#1a1a1a',
    fontSize: 58,
    fontWeight: 900,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.2,
  },
  charWrap: {
    position: 'absolute',
    top: 420,
    left: '50%',
    transform: 'translateX(-50%)',
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
    color: '#1a1a1a',
    fontSize: 100,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
  },
  keywordSub: {
    color: '#666',
    fontSize: 38,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
