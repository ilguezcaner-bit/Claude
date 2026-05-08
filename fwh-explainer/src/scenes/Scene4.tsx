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
      <AbsoluteFill style={styles.paper} />
      <AbsoluteFill style={styles.goldTint} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Satin reduziert Reibung. Kein Frizz.</p>
      </div>

      {/* Satin interior image — MAIN VISUAL */}
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

      {/* Character small left */}
      <div style={styles.charWrap}>
        <Character mood="thumbsup" scale={0.6} />
      </div>

      {/* Green checkmark overlay */}
      <div style={{ ...styles.checkWrap, transform: `scale(${checkScale})` }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="60" fill="rgba(0,180,80,0.18)" stroke="#00C853" strokeWidth="6" />
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
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f5f0e8' },
  goldTint: {
    background: 'radial-gradient(ellipse at 50% 55%, rgba(201,168,76,0.1) 0%, transparent 70%)',
  },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: '#f0fff4',
    borderRadius: 24,
    padding: '32px 40px',
    boxShadow: '0 6px 30px rgba(0,180,80,0.12)',
    border: '2px solid rgba(0,180,80,0.2)',
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
  satinImgWrap: {
    position: 'absolute',
    top: 460,
    left: 50,
    right: 50,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 12px 50px rgba(201,168,76,0.35)',
    border: '4px solid #C9A84C',
    transformOrigin: 'center',
  },
  satinImg: { width: '100%', height: 480, objectFit: 'cover', objectPosition: 'center top' },
  satinLabel: {
    background: 'rgba(201,168,76,0.95)',
    padding: '12px 20px',
  },
  satinLabelText: {
    color: '#1a1a1a',
    fontSize: 30,
    fontWeight: 800,
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
    textShadow: '3px 3px 0px rgba(0,0,0,0.08)',
  },
  keywordSub: {
    color: '#555',
    fontSize: 36,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
