import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

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
      {/* Grain texture */}
      <AbsoluteFill style={styles.grain} />

      {/* Thin gold top bar */}
      <div style={styles.topBar} />

      {/* Title */}
      <div style={{ ...styles.titleBox, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={styles.titleLabel}>THE QUESTION</p>
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
  container: { overflow: 'hidden', background: SW.bgPure },
  grain: {
    backgroundImage: SW.grain,
    backgroundRepeat: 'repeat',
    opacity: 0.8,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    background: SW.gold,
  },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: SW.bgCard,
    borderRadius: 4,
    padding: '28px 40px 32px',
    borderLeft: `6px solid ${SW.gold}`,
    borderTop: '1px solid rgba(201,168,76,0.2)',
    borderRight: '1px solid rgba(201,168,76,0.2)',
    borderBottom: '1px solid rgba(201,168,76,0.2)',
  },
  titleLabel: {
    color: SW.gold,
    fontSize: 22,
    fontWeight: 700,
    fontFamily: SW.fontBody,
    letterSpacing: 6,
    margin: '0 0 10px',
    textTransform: 'uppercase' as const,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 58,
    fontWeight: 900,
    textAlign: 'left' as const,
    fontFamily: SW.fontDisplay,
    margin: 0,
    lineHeight: 1.1,
    letterSpacing: -1,
    textTransform: 'uppercase' as const,
  },
  charWrap: {
    position: 'absolute',
    top: 420,
    left: '50%',
    transform: 'translateX(-50%)',
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
    color: SW.gold,
    fontSize: 108,
    fontFamily: SW.fontDisplay,
    margin: 0,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
    WebkitTextStroke: '2px rgba(201,168,76,0.3)',
  },
  keywordSub: {
    color: '#555',
    fontSize: 34,
    fontFamily: SW.fontBody,
    margin: '8px 0 0',
    letterSpacing: 3,
    textTransform: 'uppercase' as const,
  },
};
