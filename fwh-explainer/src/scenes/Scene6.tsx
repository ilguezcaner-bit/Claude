import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SW } from '../theme';

const FPS = 30;

// Set to true once fwh_logo.png is in public/
const HAS_LOGO = false;

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-3s): 3 caps slide in
  const leftX = spring({ frame, fps, from: -600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const centerY = spring({ frame: Math.max(0, frame - 5), fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const rightX = spring({ frame: Math.max(0, frame - 10), fps, from: 600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const brandOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateRight: 'clamp' });

  // Phase 2 (3-6s): Statement
  const statementStart = 3 * FPS;
  const statementOpacity = interpolate(frame, [statementStart, statementStart + 14], [0, 1], { extrapolateRight: 'clamp' });
  const statementScale = spring({ frame: Math.max(0, frame - statementStart), fps, from: 0.9, to: 1, durationInFrames: 18, config: { damping: 12 } });
  const lineOpacity = interpolate(frame, [statementStart + 10, statementStart + 22], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({ frame: Math.max(0, frame - statementStart), fps, from: 0, to: 1, durationInFrames: 20, config: { damping: 10 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.topBar} />

      {/* Phase 1: caps */}
      <div style={{ ...styles.capsRow, opacity: interpolate(frame, [statementStart - 8, statementStart + 4], [1, 0], { extrapolateRight: 'clamp' }) }}>
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

      {/* Brand name */}
      <div style={{ ...styles.brandRow, opacity: brandOpacity }}>
        <p style={styles.brandText}>FRIENDS WITH HUSTLE</p>
      </div>

      {/* Phase 2 bg */}
      <AbsoluteFill style={{ opacity: statementOpacity, background: SW.bgPure, pointerEvents: 'none' }} />

      {/* Phase 2 Statement */}
      <div style={{ ...styles.statementWrap, opacity: statementOpacity, transform: `scale(${statementScale})` }}>

        {/* Real FWH Logo or fallback shield */}
        <div style={{ ...styles.logoWrap, transform: `scale(${logoScale})` }}>
          {HAS_LOGO ? (
            <Img src={staticFile('fwh_logo.png')} style={styles.logoImg} />
          ) : (
            <svg width="120" height="120" viewBox="0 0 120 120">
              <rect width="120" height="120" fill="#000" />
              <text x="60" y="72" textAnchor="middle" fontSize="48" fontWeight="900"
                fontFamily="Impact, sans-serif" fill="#fff" letterSpacing="-1">FWH</text>
            </svg>
          )}
        </div>

        {/* Statement */}
        <p style={styles.statementQuote}>„Bei uns zählen</p>
        <p style={styles.statementHighlight}>auch die inneren Werte."</p>

        {/* Divider */}
        <div style={{ ...styles.dividerLine, opacity: lineOpacity }} />

        <p style={{ ...styles.statementBrand, opacity: lineOpacity }}>FRIENDS WITH HUSTLE</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: SW.bgPure },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', opacity: 0.8 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: SW.gold },
  capsRow: {
    position: 'absolute', top: 220, left: 0, right: 0,
    display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 14,
    paddingLeft: 24, paddingRight: 24,
  },
  capCard: {
    width: 260, height: 260, borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 10px 60px rgba(0,0,0,0.8)',
    border: `2px solid ${SW.gold}`,
    flexShrink: 0,
  },
  capCardCenter: {
    width: 340, height: 340, borderRadius: 2, overflow: 'hidden',
    boxShadow: `0 16px 100px rgba(201,168,76,0.4)`,
    border: `3px solid ${SW.gold}`,
    flexShrink: 0, zIndex: 2,
  },
  capImage: { width: '100%', height: '100%', objectFit: 'cover' },
  brandRow: { position: 'absolute', top: 900, left: 40, right: 40, textAlign: 'center' as const },
  brandText: {
    color: SW.gold,
    fontSize: 58,
    fontFamily: SW.fontDisplay,
    margin: 0,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
  },
  statementWrap: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '0 60px', transformOrigin: 'center',
  },
  logoWrap: {
    marginBottom: 40,
    transformOrigin: 'center',
  },
  logoImg: {
    width: 180,
    height: 180,
    objectFit: 'contain',
  },
  statementQuote: {
    color: '#666',
    fontSize: 52,
    fontFamily: SW.fontDisplay,
    margin: 0,
    textAlign: 'center' as const,
    lineHeight: 1.2,
    letterSpacing: 1,
  },
  statementHighlight: {
    color: '#ffffff',
    fontSize: 60,
    fontFamily: SW.fontDisplay,
    margin: '6px 0 0',
    textAlign: 'center' as const,
    lineHeight: 1.1,
    letterSpacing: 1,
  },
  dividerLine: {
    width: 140,
    height: 4,
    background: SW.gold,
    borderRadius: 0,
    margin: '44px 0 30px',
  },
  statementBrand: {
    color: SW.gold,
    fontSize: 38,
    fontFamily: SW.fontDisplay,
    margin: 0,
    letterSpacing: 6,
    textTransform: 'uppercase' as const,
  },
};
