import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SW } from '../theme';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = spring({ frame, fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const w2 = spring({ frame: Math.max(0, frame - 5), fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const o1 = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const o2 = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' });

  const imgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const dropScale = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, durationInFrames: 14, config: { damping: 7 } });
  const clockScale = spring({ frame: Math.max(0, frame - 14), fps, from: 0, to: 1, durationInFrames: 14, config: { damping: 7 } });
  const clockAngle = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: 'clamp' });

  const kwOpacity = interpolate(frame, [22, 30], [0, 1], { extrapolateRight: 'clamp' });
  const kwY = spring({ frame: Math.max(0, frame - 22), fps, from: 60, to: 0, durationInFrames: 14, config: { damping: 14 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.sceneNum}>05</div>

      {/* Title */}
      <div style={styles.titleBlock}>
        <p style={styles.tag}>THE RESULT</p>
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <p style={{ ...styles.tl, opacity: o1, transform: `translateY(${w1}px)` }}>HÄLT FEUCHTIGKEIT.</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ ...styles.tl, ...styles.tlGold, opacity: o2, transform: `translateY(${w2}px)` }}>FRISUR SITZT LÄNGER.</p>
        </div>
      </div>

      {/* Background image */}
      <div style={{ ...styles.imgWrap, opacity: imgOpacity }}>
        <Img src={staticFile('caps/cap_interior.jpg')} style={styles.bgImg} />
        <div style={styles.imgOverlay} />
      </div>

      {/* Icons */}
      <div style={styles.iconsRow}>
        <div style={{ transform: `scale(${dropScale})`, ...styles.iconCard }}>
          <svg width="80" height="100" viewBox="0 0 80 100">
            <path d="M40 6 Q62 38 62 62 A22 22 0 0 1 18 62 Q18 38 40 6Z" fill="#4FC3F7" />
            <path d="M40 28 Q52 46 52 59 A12 12 0 0 1 28 59 Q28 46 40 28Z" fill="rgba(255,255,255,0.4)" />
          </svg>
          <p style={styles.iconText}>FEUCHTIGKEIT</p>
        </div>
        <div style={{ width: 2, height: 80, background: 'rgba(201,168,76,0.2)' }} />
        <div style={{ transform: `scale(${clockScale})`, ...styles.iconCard }}>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="42" fill="rgba(201,168,76,0.1)" stroke={SW.gold} strokeWidth="4" />
            <circle cx="45" cy="45" r="4" fill={SW.gold} />
            <line x1="45" y1="45" x2="45" y2="18" stroke={SW.gold} strokeWidth="4" strokeLinecap="round"
              transform={`rotate(${clockAngle * 0.5} 45 45)`} />
            <line x1="45" y1="45" x2="45" y2="10" stroke="#fff" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${clockAngle} 45 45)`} />
          </svg>
          <p style={styles.iconText}>LÄNGER HALTBAR</p>
        </div>
      </div>

      {/* Keyword — two words, each fills half */}
      <div style={{ ...styles.kwWrap, opacity: kwOpacity, transform: `translateY(${kwY}px)` }}>
        <svg width="980" height="100" viewBox="0 0 980 100">
          <text x="10" y="88" textLength="460" lengthAdjust="spacingAndGlyphs"
            fontSize="96" fontFamily="Impact, sans-serif" fill={SW.gold}>FRISUR</text>
          <text x="490" y="88" textLength="480" lengthAdjust="spacingAndGlyphs"
            fontSize="96" fontFamily="Impact, sans-serif"
            fill="none" stroke="#fff" strokeWidth="2">SITZT</text>
        </svg>
        <p style={styles.kwSub}>Dank Premium-Satin innen</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#000' },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', backgroundSize: '300px 300px', opacity: 0.7 },
  sceneNum: { position: 'absolute', top: 180, right: 50, fontSize: 220, fontFamily: 'Impact, sans-serif', color: 'rgba(255,255,255,0.03)', lineHeight: 1 },
  titleBlock: { position: 'absolute', top: 250, left: 50, right: 50, zIndex: 10 },
  tag: { color: SW.gold, fontSize: 20, fontFamily: SW.fontBody, letterSpacing: 8, margin: '0 0 20px', textTransform: 'uppercase' as const },
  tl: { color: '#fff', fontSize: 72, fontFamily: SW.fontDisplay, margin: 0, lineHeight: 0.95, letterSpacing: -1, textTransform: 'uppercase' as const },
  tlGold: { color: SW.gold },
  imgWrap: { position: 'absolute', top: 470, left: 50, right: 50, height: 480, borderRadius: 2, overflow: 'hidden', border: `2px solid ${SW.gold}` },
  bgImg: { width: '100%', height: '100%', objectFit: 'cover' },
  imgOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' },
  iconsRow: {
    position: 'absolute', top: 560, left: 0, right: 0,
    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', zIndex: 10,
  },
  iconCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'center bottom', gap: 10 },
  iconText: { color: '#fff', fontSize: 22, fontFamily: SW.fontDisplay, margin: 0, letterSpacing: 4, textTransform: 'uppercase' as const },
  kwWrap: { position: 'absolute', bottom: 90, left: 50, right: 50 },
  kwSub: { color: '#444', fontSize: 28, fontFamily: SW.fontBody, margin: '6px 0 0', letterSpacing: 4, textTransform: 'uppercase' as const },
};
