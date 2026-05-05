import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered cap slides
  const leftX = spring({ frame: Math.max(0, frame - 0), fps, from: -500, to: 0, durationInFrames: 22 });
  const centerY = spring({ frame: Math.max(0, frame - 6), fps, from: -400, to: 0, durationInFrames: 22 });
  const rightX = spring({ frame: Math.max(0, frame - 12), fps, from: 500, to: 0, durationInFrames: 22 });

  const logoOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({ frame: Math.max(0, frame - 30), fps, from: 0.6, to: 1, durationInFrames: 14 });

  const textOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateRight: 'clamp' });
  const subTextOpacity = interpolate(frame, [32, 44], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.background} />
      {/* Gold shimmer lines */}
      <AbsoluteFill style={styles.shimmer} />

      {/* 3 Cap Product Images */}
      <div style={styles.capsRow}>
        {/* Left cap */}
        <div style={{ ...styles.capCard, transform: `translateX(${leftX}px) rotate(-8deg)` }}>
          <Img src={staticFile('caps/cap_side.jpg')} style={styles.capImage} />
        </div>

        {/* Center cap (main) */}
        <div style={{ ...styles.capCardCenter, transform: `translateY(${centerY}px)` }}>
          <Img src={staticFile('caps/cap_front.jpg')} style={styles.capImageCenter} />
        </div>

        {/* Right cap (satin interior) */}
        <div style={{ ...styles.capCard, transform: `translateX(${rightX}px) rotate(8deg)` }}>
          <Img src={staticFile('caps/cap_interior.jpg')} style={styles.capImage} />
        </div>
      </div>

      {/* Headline */}
      <div style={{ ...styles.headline, opacity: textOpacity }}>
        <p style={styles.headlineText}>Friends with Hustle</p>
      </div>

      {/* Subtext */}
      <div style={{ ...styles.subBox, opacity: subTextOpacity }}>
        <p style={styles.subText}>„Bei uns zählen auch die inneren Werte."</p>
      </div>

      {/* FWH Logo / badge */}
      <div style={{
        ...styles.logoBadge,
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
      }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="#C9A84C" />
          <text x="50" y="42" textAnchor="middle" fontSize="20" fontWeight="900"
            fontFamily="sans-serif" fill="#0a0a0a">FWH</text>
          <text x="50" y="64" textAnchor="middle" fontSize="10" fontWeight="600"
            fontFamily="sans-serif" fill="#0a0a0a">OFFICIAL</text>
          <ellipse cx="50" cy="64" rx="28" ry="8" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden' },
  background: {
    background: 'linear-gradient(160deg, #1a1000 0%, #0a0a0a 50%, #1a1000 100%)',
  },
  shimmer: {
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 20px)',
  },
  capsRow: {
    position: 'absolute',
    top: '12%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  capCard: {
    width: 290,
    height: 290,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
    border: '2px solid rgba(201,168,76,0.3)',
    flexShrink: 0,
  },
  capCardCenter: {
    width: 360,
    height: 360,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(201,168,76,0.3)',
    border: '3px solid #C9A84C',
    flexShrink: 0,
    zIndex: 2,
  },
  capImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  capImageCenter: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  headline: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headlineText: {
    color: '#C9A84C',
    fontSize: 72,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: 2,
    textShadow: '0 4px 20px rgba(201,168,76,0.5)',
  },
  subBox: {
    position: 'absolute',
    bottom: 120,
    left: 60,
    right: 60,
    textAlign: 'center',
  },
  subText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 36,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.4,
  },
  logoBadge: {
    position: 'absolute',
    top: 60,
    right: 60,
    transformOrigin: 'center',
  },
};
