import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charX = spring({ frame, fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const titleY = interpolate(frame, [10, 22], [-60, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: 'clamp' });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const keywordScale = spring({ frame: Math.max(0, frame - 20), fps, from: 0.7, to: 1, durationInFrames: 14, config: { damping: 10 } });

  return (
    <AbsoluteFill style={styles.container}>
      {/* Crumpled paper background */}
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.paperTexture} />

      {/* Title top */}
      <div style={{ ...styles.titleBox, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={styles.titleText}>Was steckt in deiner Cap?</p>
      </div>

      {/* Character */}
      <div style={{ ...styles.charWrap, transform: `translateX(${charX}px)` }}>
        <Character mood="confused" scale={0.88} />
      </div>

      {/* Keyword callout */}
      <div style={{
        ...styles.keyword,
        opacity: keywordOpacity,
        transform: `scale(${keywordScale})`,
      }}>
        <p style={styles.keywordText}>BAUMWOLLE</p>
        <p style={styles.keywordSub}>Die meisten Caps innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: {
    background: '#f0ebe4',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23paper)\' opacity=\'0.18\'/%3E%3C/svg%3E")',
  },
  paperTexture: {
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 28px)',
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
    color: '#1a1a1a',
    fontSize: 56,
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
    transformOrigin: 'center',
  },
  keywordText: {
    color: '#1a1a1a',
    fontSize: 100,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
    textShadow: '4px 4px 0px rgba(0,0,0,0.08)',
  },
  keywordSub: {
    color: '#555',
    fontSize: 36,
    fontFamily: 'sans-serif',
    margin: '8px 0 0',
    fontWeight: 500,
  },
};
