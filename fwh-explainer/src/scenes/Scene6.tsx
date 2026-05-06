import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SW } from '../theme';

const FPS = 30;

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0–3s): caps
  const leftX = spring({ frame, fps, from: -600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const centerY = spring({ frame: Math.max(0, frame - 5), fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const rightX = spring({ frame: Math.max(0, frame - 10), fps, from: 600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const brandOp = interpolate(frame, [22, 34], [0, 1], { extrapolateRight: 'clamp' });
  const phase1Op = interpolate(frame, [82, 94], [1, 0], { extrapolateRight: 'clamp' });

  // Phase 2 (3–6s): statement
  const ss = 3 * FPS;
  const bgOp = interpolate(frame, [ss, ss + 10], [0, 1], { extrapolateRight: 'clamp' });

  // Each line slams in staggered
  const l1y = spring({ frame: Math.max(0, frame - ss), fps, from: 120, to: 0, durationInFrames: 16, config: { damping: 13 } });
  const l1o = interpolate(frame, [ss, ss + 10], [0, 1], { extrapolateRight: 'clamp' });
  const l2y = spring({ frame: Math.max(0, frame - (ss + 6)), fps, from: 120, to: 0, durationInFrames: 16, config: { damping: 13 } });
  const l2o = interpolate(frame, [ss + 6, ss + 16], [0, 1], { extrapolateRight: 'clamp' });
  const l3y = spring({ frame: Math.max(0, frame - (ss + 12)), fps, from: 120, to: 0, durationInFrames: 16, config: { damping: 13 } });
  const l3o = interpolate(frame, [ss + 12, ss + 22], [0, 1], { extrapolateRight: 'clamp' });
  const divW = interpolate(frame, [ss + 18, ss + 30], [0, 980], { extrapolateRight: 'clamp' });
  const brandLineOp = interpolate(frame, [ss + 22, ss + 32], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />

      {/* Phase 1: caps */}
      <div style={{ ...styles.capsRow, opacity: phase1Op }}>
        <div style={{ ...styles.capCard, transform: `translateX(${leftX}px) rotate(-5deg)` }}>
          <Img src={staticFile('caps/cap_official.jpg')} style={styles.capImage} />
        </div>
        <div style={{ ...styles.capCardCenter, transform: `translateY(${centerY}px)` }}>
          <Img src={staticFile('caps/cap_hero.jpg')} style={styles.capImage} />
        </div>
        <div style={{ ...styles.capCard, transform: `translateX(${rightX}px) rotate(5deg)` }}>
          <Img src={staticFile('caps/cap_interior.jpg')} style={styles.capImage} />
        </div>
      </div>
      <div style={{ ...styles.brandRow, opacity: Math.min(brandOp, phase1Op) }}>
        <p style={styles.brandText}>FRIENDS WITH HUSTLE</p>
      </div>

      {/* Phase 2: pure black overlay */}
      <AbsoluteFill style={{ background: '#000', opacity: bgOp, pointerEvents: 'none' }} />

      {/* Phase 2: statement — full width typography */}
      <div style={styles.statementWrap}>

        {/* "BEI UNS" — huge, filled white */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <svg width="980" height="120" viewBox="0 0 980 120"
            style={{ display: 'block', opacity: l1o, transform: `translateY(${l1y}px)` }}>
            <text x="0" y="105" textLength="980" lengthAdjust="spacingAndGlyphs"
              fontSize="112" fontFamily="Impact, sans-serif" fill="#ffffff">BEI UNS</text>
          </svg>
        </div>

        {/* "ZÄHLEN" — huge, gold outline */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <svg width="980" height="130" viewBox="0 0 980 130"
            style={{ display: 'block', opacity: l2o, transform: `translateY(${l2y}px)` }}>
            <text x="0" y="115" textLength="980" lengthAdjust="spacingAndGlyphs"
              fontSize="120" fontFamily="Impact, sans-serif"
              fill="none" stroke={SW.gold} strokeWidth="3">ZÄHLEN</text>
          </svg>
        </div>

        {/* "AUCH DIE INNEREN WERTE." — split: small / massive */}
        <div style={{ overflow: 'hidden', width: '100%', marginTop: 8 }}>
          <div style={{ opacity: l3o, transform: `translateY(${l3y}px)` }}>
            <p style={styles.smallLine}>auch die</p>
            <svg width="980" height="130" viewBox="0 0 980 130" style={{ display: 'block' }}>
              <text x="0" y="115" textLength="980" lengthAdjust="spacingAndGlyphs"
                fontSize="120" fontFamily="Impact, sans-serif" fill="#ffffff">INNEREN WERTE.</text>
            </svg>
          </div>
        </div>

        {/* Divider sweeps across */}
        <svg width="980" height="8" viewBox="0 0 980 8" style={{ display: 'block', margin: '28px 0 20px' }}>
          <rect x="0" y="0" width={divW} height="8" fill={SW.gold} />
        </svg>

        {/* Brand */}
        <p style={{ ...styles.finalBrand, opacity: brandLineOp }}>FRIENDS WITH HUSTLE</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#000' },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', backgroundSize: '300px 300px', opacity: 0.7 },
  capsRow: {
    position: 'absolute', top: 220, left: 0, right: 0,
    display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 14, paddingLeft: 24, paddingRight: 24,
  },
  capCard: {
    width: 260, height: 260, borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 10px 60px rgba(0,0,0,0.9)', border: `2px solid ${SW.gold}`, flexShrink: 0,
  },
  capCardCenter: {
    width: 340, height: 340, borderRadius: 2, overflow: 'hidden',
    boxShadow: `0 16px 100px rgba(201,168,76,0.4)`, border: `3px solid ${SW.gold}`, flexShrink: 0, zIndex: 2,
  },
  capImage: { width: '100%', height: '100%', objectFit: 'cover' },
  brandRow: { position: 'absolute', top: 890, left: 50, right: 50, textAlign: 'center' as const },
  brandText: {
    color: SW.gold, fontSize: 52, fontFamily: SW.fontDisplay,
    margin: 0, letterSpacing: 6, textTransform: 'uppercase' as const,
  },
  statementWrap: {
    position: 'absolute', top: 0, bottom: 0, left: 50, right: 50,
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  smallLine: {
    color: SW.gold,
    fontSize: 38,
    fontFamily: SW.fontDisplay,
    margin: '0 0 4px',
    letterSpacing: 6,
    textTransform: 'lowercase' as const,
  },
  finalBrand: {
    color: '#fff',
    fontSize: 32,
    fontFamily: SW.fontDisplay,
    margin: 0,
    letterSpacing: 10,
    textTransform: 'uppercase' as const,
  },
};
