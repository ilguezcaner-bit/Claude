import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const dropScale = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, durationInFrames: 14, config: { damping: 7 } });
  const clockScale = spring({ frame: Math.max(0, frame - 14), fps, from: 0, to: 1, durationInFrames: 14, config: { damping: 7 } });
  const keywordOpacity = interpolate(frame, [22, 32], [0, 1], { extrapolateRight: 'clamp' });
  const clockAngle = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.goldTint} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Hält Feuchtigkeit. Frisur sitzt länger.</p>
      </div>

      {/* Satin interior — background image */}
      <div style={{ ...styles.imgWrap, opacity: imgOpacity }}>
        <Img src={staticFile('caps/cap_interior.jpg')} style={styles.bgImg} />
        <div style={styles.imgOverlay} />
      </div>

      {/* Icons on top of image */}
      <div style={styles.iconsRow}>
        <div style={{ transform: `scale(${dropScale})`, ...styles.iconCard }}>
          <svg width="90" height="115" viewBox="0 0 90 115">
            <path d="M45 8 Q70 42 70 70 A25 25 0 0 1 20 70 Q20 42 45 8Z" fill="#4FC3F7" />
            <path d="M45 32 Q58 52 58 66 A13 13 0 0 1 32 66 Q32 52 45 32Z" fill="rgba(255,255,255,0.4)" />
          </svg>
          <div style={styles.iconBadge}><p style={styles.iconBadgeText}>Feuchtigkeit</p></div>
        </div>

        <div style={{ transform: `scale(${clockScale})`, ...styles.iconCard }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,0.15)" stroke="#C9A84C" strokeWidth="5" />
            <circle cx="50" cy="50" r="5" fill="#C9A84C" />
            <line x1="50" y1="50" x2="50" y2="20" stroke="#C9A84C" strokeWidth="5" strokeLinecap="round"
              transform={`rotate(${clockAngle * 0.5} 50 50)`} />
            <line x1="50" y1="50" x2="50" y2="12" stroke="#fff" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockAngle} 50 50)`} />
          </svg>
          <div style={styles.iconBadge}><p style={styles.iconBadgeText}>Länger haltbar</p></div>
        </div>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>FRISUR SITZT</p>
        <p style={styles.keywordSub}>Dank Premium-Satin innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f5f0e8' },
  goldTint: {
    background: 'radial-gradient(ellipse at 50% 55%, rgba(201,168,76,0.08) 0%, transparent 70%)',
  },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: '#ffffff',
    borderRadius: 24,
    padding: '32px 40px',
    boxShadow: '0 6px 30px rgba(0,0,0,0.08)',
    zIndex: 10,
  },
  titleText: {
    color: '#1a1a1a',
    fontSize: 52,
    fontWeight: 900,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.2,
  },
  imgWrap: {
    position: 'absolute',
    top: 460,
    left: 50,
    right: 50,
    height: 520,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 12px 40px rgba(201,168,76,0.3)',
    border: '4px solid #C9A84C',
  },
  bgImg: { width: '100%', height: '100%', objectFit: 'cover' },
  imgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
  },
  iconsRow: {
    position: 'absolute',
    top: 560,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 10,
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transformOrigin: 'center bottom',
    gap: 12,
  },
  iconBadge: {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: '8px 18px',
  },
  iconBadgeText: {
    color: '#1a1a1a',
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    margin: 0,
  },
  keyword: {
    position: 'absolute',
    top: 1100,
    left: 50,
    right: 50,
    textAlign: 'center',
  },
  keywordText: {
    color: '#C9A84C',
    fontSize: 86,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
  },
  keywordSub: {
    color: '#555',
    fontSize: 36,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
