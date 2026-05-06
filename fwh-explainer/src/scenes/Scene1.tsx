import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = spring({ frame, fps, from: -80, to: 0, durationInFrames: 18, config: { damping: 16 } });
  const w2 = spring({ frame: Math.max(0, frame - 4), fps, from: -80, to: 0, durationInFrames: 18, config: { damping: 16 } });
  const w3 = spring({ frame: Math.max(0, frame - 8), fps, from: -80, to: 0, durationInFrames: 18, config: { damping: 16 } });
  const o1 = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const o2 = interpolate(frame, [4, 14], [0, 1], { extrapolateRight: 'clamp' });
  const o3 = interpolate(frame, [8, 18], [0, 1], { extrapolateRight: 'clamp' });

  const charX = spring({ frame: Math.max(0, frame - 12), fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });

  const kwOpacity = interpolate(frame, [22, 30], [0, 1], { extrapolateRight: 'clamp' });
  const kwScale = spring({ frame: Math.max(0, frame - 22), fps, from: 1.15, to: 1, durationInFrames: 14, config: { damping: 12 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />

      {/* Scene number */}
      <div style={styles.sceneNum}>01</div>

      {/* Title — raw stacked text, no box */}
      <div style={styles.titleBlock}>
        <p style={styles.tag}>INSIDE YOUR CAP</p>
        <div style={{ overflow: 'hidden', marginBottom: 2 }}>
          <p style={{ ...styles.titleLine, opacity: o1, transform: `translateY(${w1}px)` }}>WAS STECKT</p>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 2 }}>
          <p style={{ ...styles.titleLine, ...styles.titleLineGold, opacity: o2, transform: `translateY(${w2}px)` }}>IN DEINER</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ ...styles.titleLine, opacity: o3, transform: `translateY(${w3}px)` }}>CAP?</p>
        </div>
      </div>

      {/* Character */}
      <div style={{ ...styles.charWrap, transform: `translateX(${charX}px)` }}>
        <Character mood="confused" scale={0.82} />
      </div>

      {/* Keyword — fills width via SVG */}
      <div style={{ ...styles.kwWrap, opacity: kwOpacity, transform: `scale(${kwScale})` }}>
        {/* Ghost outline */}
        <svg width="980" height="160" viewBox="0 0 980 160" style={styles.kwSvgGhost}>
          <text x="490" y="140" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs"
            fontSize="160" fontFamily="Impact, 'Arial Black', sans-serif"
            fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="3">BAUMWOLLE</text>
        </svg>
        {/* Solid */}
        <svg width="980" height="160" viewBox="0 0 980 160" style={styles.kwSvg}>
          <text x="490" y="140" textAnchor="middle" textLength="940" lengthAdjust="spacingAndGlyphs"
            fontSize="150" fontFamily="Impact, 'Arial Black', sans-serif" fill={SW.gold}>BAUMWOLLE</text>
        </svg>
        <p style={styles.kwSub}>Die meisten Caps innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#000' },
  grain: {
    backgroundImage: SW.grain, backgroundRepeat: 'repeat',
    backgroundSize: '300px 300px', opacity: 0.7,
  },
  sceneNum: {
    position: 'absolute', top: 180, right: 50,
    fontSize: 220, fontFamily: 'Impact, sans-serif',
    color: 'rgba(255,255,255,0.03)', lineHeight: 1,
    userSelect: 'none',
  },
  titleBlock: {
    position: 'absolute', top: 260, left: 50, right: 50,
  },
  tag: {
    color: SW.gold, fontSize: 20, fontFamily: SW.fontBody,
    letterSpacing: 8, margin: '0 0 24px',
    textTransform: 'uppercase' as const,
  },
  titleLine: {
    color: '#ffffff',
    fontSize: 92,
    fontFamily: SW.fontDisplay,
    margin: 0,
    lineHeight: 0.95,
    letterSpacing: -1,
    textTransform: 'uppercase' as const,
  },
  titleLineGold: { color: SW.gold },
  charWrap: {
    position: 'absolute',
    top: 680,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  kwWrap: {
    position: 'absolute',
    bottom: 100,
    left: 50,
    right: 50,
    transformOrigin: 'center bottom',
  },
  kwSvgGhost: {
    position: 'absolute' as const,
    top: -6,
    left: -4,
  },
  kwSvg: { display: 'block' },
  kwSub: {
    color: '#444',
    fontSize: 28,
    fontFamily: SW.fontBody,
    margin: '4px 0 0',
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
  },
};
