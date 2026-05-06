import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = spring({ frame, fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const w2 = spring({ frame: Math.max(0, frame - 5), fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const o1 = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const o2 = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' });

  const arrowProgress = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, durationInFrames: 20 });
  const arrowLen = 320 * arrowProgress;

  const kwOpacity = interpolate(frame, [22, 30], [0, 1], { extrapolateRight: 'clamp' });
  const kwY = spring({ frame: Math.max(0, frame - 22), fps, from: 60, to: 0, durationInFrames: 14, config: { damping: 14 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.sceneNum}>02</div>

      {/* Title */}
      <div style={styles.titleBlock}>
        <p style={styles.tag}>THE PROBLEM</p>
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <p style={{ ...styles.tl, opacity: o1, transform: `translateY(${w1}px)` }}>MEHR REIBUNG.</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ ...styles.tl, ...styles.tlIndent, ...styles.tlGold, opacity: o2, transform: `translateY(${w2}px)` }}>WENIGER FEUCHTIGKEIT.</p>
        </div>
      </div>

      {/* Character left */}
      <div style={styles.charWrap}>
        <Character mood="explaining" scale={0.72} />
      </div>

      {/* Arrow — right side */}
      <div style={styles.arrowArea}>
        <svg width="360" height="90" viewBox="0 0 360 90">
          <defs>
            <marker id="ah2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={SW.red} />
            </marker>
          </defs>
          <text x="180" y="24" textAnchor="middle" fill={SW.red}
            fontSize="20" fontFamily="Anton, Impact, sans-serif" letterSpacing="6">REIBUNG</text>
          <line x1="10" y1="55" x2={10 + arrowLen} y2="55"
            stroke={SW.red} strokeWidth="7" strokeLinecap="round" markerEnd="url(#ah2)" />
        </svg>
        <svg width="200" height="70" viewBox="0 0 200 70">
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i}
              x1={20 + i * 36} y1="8" x2={20 + i * 36 + (i % 2 === 0 ? 10 : -10)} y2="60"
              stroke={SW.gold} strokeWidth="3.5" strokeLinecap="round"
              style={{ opacity: arrowProgress }} />
          ))}
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.kwWrap, opacity: kwOpacity, transform: `translateY(${kwY}px)` }}>
        <svg width="980" height="160" viewBox="0 0 980 160" style={styles.kwGhost}>
          <text x="490" y="140" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs"
            fontSize="160" fontFamily="Anton, Impact, sans-serif"
            fill="none" stroke="rgba(232,51,74,0.12)" strokeWidth="3">REIBUNG</text>
        </svg>
        <svg width="980" height="160" viewBox="0 0 980 160" style={styles.kwSvg}>
          <text x="490" y="140" textAnchor="middle" textLength="940" lengthAdjust="spacingAndGlyphs"
            fontSize="150" fontFamily="Anton, Impact, sans-serif" fill={SW.red}>REIBUNG</text>
        </svg>
        <p style={styles.kwSub}>Baumwolle schadet deinem Haar</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#000' },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', backgroundSize: '300px 300px', opacity: 0.7 },
  sceneNum: {
    position: 'absolute', top: 180, right: 50, fontSize: 220,
    fontFamily: 'Impact, sans-serif', color: 'rgba(255,255,255,0.03)', lineHeight: 1,
  },
  titleBlock: { position: 'absolute', top: 260, left: 50, right: 50 },
  tag: { color: SW.red, fontSize: 20, fontFamily: SW.fontBody, letterSpacing: 8, margin: '0 0 24px', textTransform: 'uppercase' as const },
  tl: { color: '#fff', fontSize: 80, fontFamily: SW.fontDisplay, margin: 0, lineHeight: 0.95, letterSpacing: -1, textTransform: 'uppercase' as const },
  tlIndent: { paddingLeft: 40 },
  tlGold: { color: SW.gold },
  charWrap: { position: 'absolute', top: 500, left: 30 },
  arrowArea: { position: 'absolute', top: 560, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  kwWrap: { position: 'absolute', bottom: 100, left: 50, right: 50 },
  kwGhost: { position: 'absolute' as const, top: -6, left: -4 },
  kwSvg: { display: 'block' },
  kwSub: { color: '#444', fontSize: 28, fontFamily: SW.fontBody, margin: '4px 0 0', letterSpacing: 4, textTransform: 'uppercase' as const },
};
