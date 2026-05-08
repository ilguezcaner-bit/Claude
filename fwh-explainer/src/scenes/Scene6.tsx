import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const FPS = 30;

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-3s): 3 caps slide in
  const leftX = spring({ frame, fps, from: -600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const centerY = spring({ frame: Math.max(0, frame - 5), fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const rightX = spring({ frame: Math.max(0, frame - 10), fps, from: 600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const brandOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateRight: 'clamp' });

  // Phase 2 (3-6s): Statement fade in
  const statementStart = 3 * FPS;
  const statementOpacity = interpolate(frame, [statementStart, statementStart + 14], [0, 1], { extrapolateRight: 'clamp' });
  const statementScale = spring({ frame: Math.max(0, frame - statementStart), fps, from: 0.88, to: 1, durationInFrames: 18, config: { damping: 12 } });
  const lineOpacity = interpolate(frame, [statementStart + 10, statementStart + 22], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.goldShimmer} />

      {/* Phase 1: 3 caps */}
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

      {/* Brand name fades in under caps */}
      <div style={{ ...styles.brandRow, opacity: brandOpacity }}>
        <p style={styles.brandText}>Friends with Hustle</p>
      </div>

      {/* Phase 2: Big closing statement */}
      <AbsoluteFill style={{ ...styles.statementBg, opacity: statementOpacity }}>
        <AbsoluteFill style={styles.statementBgGold} />
      </AbsoluteFill>

      <div style={{
        ...styles.statementWrap,
        opacity: statementOpacity,
        transform: `scale(${statementScale})`,
      }}>
        {/* FWH badge */}
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ marginBottom: 32 }}>
          <circle cx="45" cy="45" r="43" fill="#C9A84C" />
          <circle cx="45" cy="45" r="36" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
          <text x="45" y="40" textAnchor="middle" fontSize="18" fontWeight="900"
            fontFamily="sans-serif" fill="#1a1a1a">FWH</text>
          <text x="45" y="56" textAnchor="middle" fontSize="8" fontWeight="700"
            fontFamily="sans-serif" fill="#1a1a1a" letterSpacing="2">OFFICIAL</text>
        </svg>

        {/* The statement */}
        <p style={styles.statementQuote}>„Bei uns zählen</p>
        <p style={styles.statementHighlight}>auch die inneren Werte."</p>

        {/* Divider line */}
        <div style={{ ...styles.dividerLine, opacity: lineOpacity }} />

        <p style={{ ...styles.statementBrand, opacity: lineOpacity }}>Friends with Hustle</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f2ede6' },
  goldShimmer: {
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.05) 0px, rgba(201,168,76,0.05) 1px, transparent 1px, transparent 24px)',
  },
  capsRow: {
    position: 'absolute',
    top: 220,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 14,
    paddingLeft: 24,
    paddingRight: 24,
  },
  capCard: {
    width: 260,
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 10px 35px rgba(0,0,0,0.15)',
    border: '3px solid rgba(201,168,76,0.4)',
    flexShrink: 0,
  },
  capCardCenter: {
    width: 340,
    height: 340,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 16px 50px rgba(201,168,76,0.4)',
    border: '4px solid #C9A84C',
    flexShrink: 0,
    zIndex: 2,
  },
  capImage: { width: '100%', height: '100%', objectFit: 'cover' },
  brandRow: {
    position: 'absolute',
    top: 900,
    left: 40,
    right: 40,
    textAlign: 'center',
  },
  brandText: {
    color: '#1a1a1a',
    fontSize: 72,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
  },
  // Phase 2
  statementBg: {
    pointerEvents: 'none',
  },
  statementBgGold: {
    background: 'linear-gradient(160deg, #faf6ee 0%, #f5edd8 50%, #faf6ee 100%)',
  },
  statementWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 60px',
    transformOrigin: 'center',
  },
  statementQuote: {
    color: '#555',
    fontSize: 56,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    margin: 0,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  statementHighlight: {
    color: '#1a1a1a',
    fontSize: 64,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: '8px 0 0',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  dividerLine: {
    width: 120,
    height: 4,
    background: '#C9A84C',
    borderRadius: 2,
    margin: '40px 0 28px',
  },
  statementBrand: {
    color: '#C9A84C',
    fontSize: 44,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: 2,
  },
};
