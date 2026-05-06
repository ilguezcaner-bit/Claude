import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = spring({ frame, fps, from: 0.85, to: 1, durationInFrames: 20 });
  const imgOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: Math.max(0, frame - 14), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 7 } });
  const keywordOpacity = interpolate(frame, [24, 34], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.topBar} />

      <div style={styles.titleBox}>
        <p style={styles.titleLabel}>THE FIX</p>
        <p style={styles.titleText}>Satin reduziert Reibung. Kein Frizz.</p>
      </div>

      <div style={{ ...styles.satinImgWrap, opacity: imgOpacity, transform: `scale(${imgScale})` }}>
        <Img src={staticFile('caps/cap_interior.jpg')} style={styles.satinImg} />
        <div style={styles.satinLabel}>
          <p style={styles.satinLabelText}>✅  PREMIUM SATIN INNEN</p>
        </div>
      </div>

      <div style={styles.charWrap}>
        <Character mood="thumbsup" scale={0.6} />
      </div>

      <div style={{ ...styles.checkWrap, transform: `scale(${checkScale})` }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="60" fill="rgba(0,200,83,0.15)" stroke={SW.green} strokeWidth="6" />
          <polyline points="32,65 55,90 98,42" fill="none" stroke={SW.green} strokeWidth="11"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>SATIN</p>
        <p style={styles.keywordSub}>Smooth  ·  Kein Frizz  ·  Kein Haarbruch</p>
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
    background: SW.bgCardGreen, borderRadius: 4, padding: '28px 40px 32px',
    borderLeft: `6px solid ${SW.gold}`,
    borderTop: '1px solid rgba(201,168,76,0.2)',
    borderRight: '1px solid rgba(201,168,76,0.2)',
    borderBottom: '1px solid rgba(201,168,76,0.2)',
  },
  titleLabel: {
    color: SW.gold, fontSize: 22, fontWeight: 700, fontFamily: SW.fontBody,
    letterSpacing: 6, margin: '0 0 10px', textTransform: 'uppercase' as const,
  },
  titleText: {
    color: '#ffffff', fontSize: 50, fontFamily: SW.fontDisplay,
    margin: 0, lineHeight: 1.1, letterSpacing: -1, textTransform: 'uppercase' as const,
  },
  satinImgWrap: {
    position: 'absolute', top: 460, left: 50, right: 50,
    borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 12px 80px rgba(201,168,76,0.4)',
    border: `3px solid ${SW.gold}`,
    transformOrigin: 'center',
  },
  satinImg: { width: '100%', height: 480, objectFit: 'cover', objectPosition: 'center top' },
  satinLabel: { background: SW.gold, padding: '12px 20px' },
  satinLabelText: {
    color: '#000', fontSize: 26, fontWeight: 900, fontFamily: SW.fontDisplay,
    margin: 0, textAlign: 'center' as const, letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  charWrap: { position: 'absolute', top: 470, right: 60, zIndex: 10 },
  checkWrap: { position: 'absolute', top: 460, right: 55, transformOrigin: 'center', zIndex: 11 },
  keyword: { position: 'absolute', top: 1090, left: 50, right: 50, textAlign: 'center' as const },
  keywordText: {
    color: SW.gold, fontSize: 120, fontFamily: SW.fontDisplay,
    margin: 0, letterSpacing: 6, textTransform: 'uppercase' as const,
    WebkitTextStroke: '2px rgba(201,168,76,0.3)',
  },
  keywordSub: {
    color: '#555', fontSize: 32, fontFamily: SW.fontBody,
    margin: '8px 0 0', letterSpacing: 3, textTransform: 'uppercase' as const,
  },
};
