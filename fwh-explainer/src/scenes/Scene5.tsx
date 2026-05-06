import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SW } from '../theme';

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
      <AbsoluteFill style={styles.grain} />
      <div style={styles.topBar} />

      <div style={styles.titleBox}>
        <p style={styles.titleLabel}>THE RESULT</p>
        <p style={styles.titleText}>Hält Feuchtigkeit. Frisur sitzt länger.</p>
      </div>

      <div style={{ ...styles.imgWrap, opacity: imgOpacity }}>
        <Img src={staticFile('caps/cap_interior.jpg')} style={styles.bgImg} />
        <div style={styles.imgOverlay} />
      </div>

      <div style={styles.iconsRow}>
        <div style={{ transform: `scale(${dropScale})`, ...styles.iconCard }}>
          <svg width="90" height="115" viewBox="0 0 90 115">
            <path d="M45 8 Q70 42 70 70 A25 25 0 0 1 20 70 Q20 42 45 8Z" fill="#4FC3F7" />
            <path d="M45 32 Q58 52 58 66 A13 13 0 0 1 32 66 Q32 52 45 32Z" fill="rgba(255,255,255,0.4)" />
          </svg>
          <div style={styles.iconBadge}><p style={styles.iconBadgeText}>FEUCHTIGKEIT</p></div>
        </div>

        <div style={{ transform: `scale(${clockScale})`, ...styles.iconCard }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="rgba(201,168,76,0.12)" stroke={SW.gold} strokeWidth="5" />
            <circle cx="50" cy="50" r="5" fill={SW.gold} />
            <line x1="50" y1="50" x2="50" y2="20" stroke={SW.gold} strokeWidth="5" strokeLinecap="round"
              transform={`rotate(${clockAngle * 0.5} 50 50)`} />
            <line x1="50" y1="50" x2="50" y2="12" stroke="#fff" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockAngle} 50 50)`} />
          </svg>
          <div style={styles.iconBadge}><p style={styles.iconBadgeText}>LÄNGER HALTBAR</p></div>
        </div>
      </div>

      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>FRISUR SITZT</p>
        <p style={styles.keywordSub}>Dank Premium-Satin innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: SW.bgPure },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', opacity: 0.8 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: SW.gold },
  titleBox: {
    position: 'absolute', top: 280, left: 50, right: 50,
    background: SW.bgCard, borderRadius: 4, padding: '28px 40px 32px',
    borderLeft: `6px solid ${SW.gold}`,
    borderTop: '1px solid rgba(201,168,76,0.2)',
    borderRight: '1px solid rgba(201,168,76,0.2)',
    borderBottom: '1px solid rgba(201,168,76,0.2)',
    zIndex: 10,
  },
  titleLabel: {
    color: SW.gold, fontSize: 22, fontWeight: 700, fontFamily: SW.fontBody,
    letterSpacing: 6, margin: '0 0 10px', textTransform: 'uppercase' as const,
  },
  titleText: {
    color: '#ffffff', fontSize: 50, fontFamily: SW.fontDisplay,
    margin: 0, lineHeight: 1.1, letterSpacing: -1, textTransform: 'uppercase' as const,
  },
  imgWrap: {
    position: 'absolute', top: 460, left: 50, right: 50, height: 520,
    borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 12px 80px rgba(201,168,76,0.25)',
    border: `3px solid ${SW.gold}`,
  },
  bgImg: { width: '100%', height: '100%', objectFit: 'cover' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' },
  iconsRow: {
    position: 'absolute', top: 560, left: 0, right: 0,
    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', zIndex: 10,
  },
  iconCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    transformOrigin: 'center bottom', gap: 12,
  },
  iconBadge: {
    background: 'rgba(0,0,0,0.8)',
    border: `1px solid ${SW.gold}`,
    borderRadius: 2,
    padding: '8px 18px',
  },
  iconBadgeText: {
    color: '#ffffff', fontSize: 24, fontWeight: 900, fontFamily: SW.fontDisplay,
    margin: 0, letterSpacing: 3,
  },
  keyword: { position: 'absolute', top: 1090, left: 50, right: 50, textAlign: 'center' as const },
  keywordText: {
    color: SW.gold, fontSize: 86, fontFamily: SW.fontDisplay,
    margin: 0, letterSpacing: 4, textTransform: 'uppercase' as const,
    WebkitTextStroke: '2px rgba(201,168,76,0.3)',
  },
  keywordSub: {
    color: '#555', fontSize: 32, fontFamily: SW.fontBody,
    margin: '8px 0 0', letterSpacing: 3, textTransform: 'uppercase' as const,
  },
};
