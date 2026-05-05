import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftX = spring({ frame, fps, from: -600, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const centerY = spring({ frame: Math.max(0, frame - 5), fps, from: -500, to: 0, durationInFrames: 22, config: { damping: 14 } });
  const rightX = spring({ frame: Math.max(0, frame - 10), fps, from: 600, to: 0, durationInFrames: 22, config: { damping: 14 } });

  const headlineOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateRight: 'clamp' });
  const headlineY = interpolate(frame, [22, 34], [24, 0], { extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [34, 46], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({ frame: Math.max(0, frame - 36), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 8 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.goldShimmer} />

      {/* 3 Cap Images staggered — no overlap, clear layout */}
      <div style={styles.capsRow}>
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

      {/* FWH Logo badge */}
      <div style={{ ...styles.logoBadge, transform: `scale(${logoScale})` }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="52" fill="#C9A84C" />
          <circle cx="55" cy="55" r="44" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <text x="55" y="48" textAnchor="middle" fontSize="22" fontWeight="900"
            fontFamily="sans-serif" fill="#1a1a1a" letterSpacing="1">FWH</text>
          <text x="55" y="67" textAnchor="middle" fontSize="9" fontWeight="700"
            fontFamily="sans-serif" fill="#1a1a1a" letterSpacing="3">OFFICIAL</text>
        </svg>
      </div>

      {/* Headline */}
      <div style={{ ...styles.headlineBox, opacity: headlineOpacity, transform: `translateY(${headlineY}px)` }}>
        <p style={styles.headline}>Friends with Hustle</p>
      </div>

      {/* Subline in white card */}
      <div style={{ ...styles.subBox, opacity: subOpacity }}>
        <p style={styles.subText}>„Bei uns zählen auch die inneren Werte."</p>
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
    top: 160,
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
  logoBadge: {
    position: 'absolute',
    top: 165,
    right: 50,
    transformOrigin: 'top right',
    zIndex: 10,
  },
  headlineBox: {
    position: 'absolute',
    top: 840,
    left: 40,
    right: 40,
    textAlign: 'center',
  },
  headline: {
    color: '#1a1a1a',
    fontSize: 78,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: 1,
  },
  subBox: {
    position: 'absolute',
    top: 980,
    left: 50,
    right: 50,
    background: '#ffffff',
    borderRadius: 20,
    padding: '24px 32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
    textAlign: 'center',
  },
  subText: {
    color: '#333',
    fontSize: 38,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.4,
  },
};
