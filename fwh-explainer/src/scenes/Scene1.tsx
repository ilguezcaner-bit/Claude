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
      <AbsoluteFill style={styles.bg} />
      <AbsoluteFill style={styles.noise} />

      {/* Gold corner accent */}
      <div style={styles.cornerAccentTL} />
      <div style={styles.cornerAccentBR} />

      {/* Title */}
      <div style={{ ...styles.titleBox, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={styles.titleText}>Was steckt in deiner Cap?</p>
      </div>

      {/* Character */}
      <div style={{ ...styles.charWrap, transform: `translateX(${charX}px)` }}>
        <Character mood="confused" scale={0.9} />
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity, transform: `scale(${keywordScale})` }}>
        <p style={styles.keywordText}>BAUMWOLLE</p>
        <p style={styles.keywordSub}>Die meisten Caps innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#0a0a0a' },
  bg: {
    background: 'radial-gradient(ellipse at 50% 40%, #1a1a1a 0%, #0a0a0a 70%)',
  },
  noise: {
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 20px)',
  },
  cornerAccentTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)',
  },
  cornerAccentBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 200,
    height: 200,
    background: 'linear-gradient(315deg, rgba(201,168,76,0.15) 0%, transparent 60%)',
  },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: '#161616',
    borderRadius: 20,
    padding: '30px 40px',
    border: '2px solid rgba(201,168,76,0.5)',
    boxShadow: '0 0 40px rgba(201,168,76,0.12)',
  },
  titleText: {
    color: '#ffffff',
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
    color: '#C9A84C',
    fontSize: 100,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
    textShadow: '0 0 60px rgba(201,168,76,0.4)',
  },
  keywordSub: {
    color: '#666',
    fontSize: 38,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
