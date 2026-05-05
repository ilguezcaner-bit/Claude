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
      <AbsoluteFill style={styles.bg} />
      <AbsoluteFill style={styles.noise} />

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

      {/* Brand name under caps */}
      <div style={{ ...styles.brandRow, opacity: brandOpacity }}>
        <p style={styles.brandText}>Friends with Hustle</p>
      </div>

      {/* Phase 2: Gold background */}
      <AbsoluteFill style={{ ...styles.statementBg, opacity: statementOpacity }}>
        <AbsoluteFill style={styles.statementBgDark} />
        {/* Gold corner glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
      </AbsoluteFill>

      {/* Phase 2: Statement */}
      <div style={{
        ...styles.statementWrap,
        opacity: statementOpacity,
        transform: `scale(${statementScale})`,
      }}>
        {/* FWH badge */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 36 }}>
          <circle cx="50" cy="50" r="48" fill="#C9A84C" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          <text x="50" y="44" textAnchor="middle" fontSize="20" fontWeight="900"
            fontFamily="sans-serif" fill="#0a0a0a">FWH</text>
          <text x="50" y="60" textAnchor="middle" fontSize="8" fontWeight="800"
            fontFamily="sans-serif" fill="#0a0a0a" letterSpacing="2">OFFICIAL</text>
        </svg>

        {/* Statement */}
        <p style={styles.statementQuote}>„Bei uns zählen</p>
        <p style={styles.statementHighlight}>auch die inneren Werte."</p>

        {/* Divider */}
        <div style={{ ...styles.dividerLine, opacity: lineOpacity }} />

        <p style={{ ...styles.statementBrand, opacity: lineOpacity }}>Friends with Hustle</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#0a0a0a' },
  bg: {
    background: 'radial-gradient(ellipse at 50% 40%, #1a1408 0%, #0a0a0a 70%)',
  },
  noise: {
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 24px)',
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
    boxShadow: '0 10px 50px rgba(0,0,0,0.6)',
    border: '2px solid rgba(201,168,76,0.5)',
    flexShrink: 0,
  },
  capCardCenter: {
    width: 340,
    height: 340,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 16px 80px rgba(201,168,76,0.35)',
    border: '3px solid #C9A84C',
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
    color: '#C9A84C',
    fontSize: 68,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    textShadow: '0 0 60px rgba(201,168,76,0.4)',
  },
  statementBg: {
    pointerEvents: 'none',
  },
  statementBgDark: {
    background: '#0a0a0a',
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
    color: '#888',
    fontSize: 56,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    margin: 0,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  statementHighlight: {
    color: '#ffffff',
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
    boxShadow: '0 0 20px rgba(201,168,76,0.6)',
  },
  statementBrand: {
    color: '#C9A84C',
    fontSize: 44,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: 2,
    textShadow: '0 0 40px rgba(201,168,76,0.5)',
  },
};
