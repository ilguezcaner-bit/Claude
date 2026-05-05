import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = spring({ frame, fps, from: 0.85, to: 1, durationInFrames: 20 });
  const imgOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: Math.max(0, frame - 14), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 7 } });
  const keywordOpacity = interpolate(frame, [24, 34], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.bg} />
      <AbsoluteFill style={styles.noise} />

      <div style={styles.cornerAccentTL} />
      <div style={styles.cornerAccentBR} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Satin reduziert Reibung. Kein Frizz.</p>
      </div>

      {/* Satin interior image */}
      <div style={{
        ...styles.satinImgWrap,
        opacity: imgOpacity,
        transform: `scale(${imgScale})`,
      }}>
        <Img src={staticFile('caps/cap_interior.jpg')} style={styles.satinImg} />
        <div style={styles.satinLabel}>
          <p style={styles.satinLabelText}>✅ Premium Satin innen</p>
        </div>
      </div>

      {/* Character small */}
      <div style={styles.charWrap}>
        <Character mood="thumbsup" scale={0.6} />
      </div>

      {/* Green checkmark */}
      <div style={{ ...styles.checkWrap, transform: `scale(${checkScale})` }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="60" fill="rgba(0,180,80,0.2)" stroke="#00C853" strokeWidth="6" />
          <polyline points="32,65 55,90 98,42"
            fill="none" stroke="#00C853" strokeWidth="11"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>SATIN</p>
        <p style={styles.keywordSub}>Smooth. Kein Frizz. Kein Haarbruch.</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#0a0a0a' },
  bg: {
    background: 'radial-gradient(ellipse at 50% 55%, #0a1a0a 0%, #0a0a0a 70%)',
  },
  noise: {
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 20px)',
  },
  cornerAccentTL: {
    position: 'absolute', top: 0, left: 0, width: 200, height: 200,
    background: 'linear-gradient(135deg, rgba(0,200,83,0.1) 0%, transparent 60%)',
  },
  cornerAccentBR: {
    position: 'absolute', bottom: 0, right: 0, width: 200, height: 200,
    background: 'linear-gradient(315deg, rgba(201,168,76,0.12) 0%, transparent 60%)',
  },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: '#081608',
    borderRadius: 20,
    padding: '30px 40px',
    border: '2px solid rgba(0,200,83,0.35)',
    boxShadow: '0 0 40px rgba(0,200,83,0.08)',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 52,
    fontWeight: 900,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.2,
  },
  satinImgWrap: {
    position: 'absolute',
    top: 460,
    left: 50,
    right: 50,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 12px 60px rgba(201,168,76,0.4)',
    border: '3px solid #C9A84C',
    transformOrigin: 'center',
  },
  satinImg: { width: '100%', height: 480, objectFit: 'cover', objectPosition: 'center top' },
  satinLabel: {
    background: '#C9A84C',
    padding: '12px 20px',
  },
  satinLabelText: {
    color: '#0a0a0a',
    fontSize: 30,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    textAlign: 'center',
  },
  charWrap: {
    position: 'absolute',
    top: 470,
    right: 60,
    zIndex: 10,
  },
  checkWrap: {
    position: 'absolute',
    top: 460,
    right: 55,
    transformOrigin: 'center',
    zIndex: 11,
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
    fontSize: 120,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
    textShadow: '0 0 80px rgba(201,168,76,0.5)',
  },
  keywordSub: {
    color: '#666',
    fontSize: 36,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
