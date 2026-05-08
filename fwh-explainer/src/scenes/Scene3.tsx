import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const xScale = spring({ frame: Math.max(0, frame - 6), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 8 } });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const shake = Math.sin(frame * 2.8) * 7 * Math.max(0, 1 - frame / 18);

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.paper} />

      {/* Title */}
      <div style={styles.titleBox}>
        <p style={styles.titleText}>Auf Dauer strapaziert es dein Haar.</p>
      </div>

      {/* Cap image right — shows a normal cotton cap */}
      <div style={{ ...styles.imgRight, opacity: imgOpacity }}>
        <Img src={staticFile('caps/cap_official.jpg')} style={styles.capImg} />
        <div style={styles.imgLabel}>
          <p style={styles.imgLabelText}>❌ Baumwolle innen</p>
        </div>
      </div>

      {/* Character left + X */}
      <div style={{ ...styles.charWrap, transform: `translateX(${shake}px)` }}>
        <Character mood="confused" scale={0.72} />
        <svg width={160 * xScale} height={160 * xScale} viewBox="0 0 160 160"
          style={{ position: 'absolute', top: 10, left: -10 }}>
          <circle cx="80" cy="80" r="74" fill="rgba(232,51,74,0.18)" stroke="#E8334A" strokeWidth="6" />
          <line x1="40" y1="40" x2="120" y2="120" stroke="#E8334A" strokeWidth="13" strokeLinecap="round" />
          <line x1="120" y1="40" x2="40" y2="120" stroke="#E8334A" strokeWidth="13" strokeLinecap="round" />
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>SCHADEN</p>
        <p style={styles.keywordSub}>Frizz · Haarbruch · Trockenheit</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#f5f0eb' },
  paper: { background: '#f0ebe4' },
  titleBox: {
    position: 'absolute',
    top: 280,
    left: 50,
    right: 50,
    background: '#fff0f0',
    borderRadius: 24,
    padding: '32px 40px',
    boxShadow: '0 6px 30px rgba(232,51,74,0.12)',
    border: '2px solid rgba(232,51,74,0.18)',
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
  imgRight: {
    position: 'absolute',
    top: 460,
    right: 40,
    width: 380,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    border: '3px solid rgba(232,51,74,0.3)',
  },
  capImg: { width: '100%', height: 340, objectFit: 'cover' },
  imgLabel: {
    background: 'rgba(232,51,74,0.9)',
    padding: '10px 16px',
  },
  imgLabelText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    margin: 0,
    textAlign: 'center',
  },
  charWrap: {
    position: 'absolute',
    top: 460,
    left: 20,
  },
  keyword: {
    position: 'absolute',
    top: 1100,
    left: 50,
    right: 50,
    textAlign: 'center',
  },
  keywordText: {
    color: '#E8334A',
    fontSize: 110,
    fontWeight: 900,
    fontFamily: 'sans-serif',
    margin: 0,
    letterSpacing: -2,
  },
  keywordSub: {
    color: '#666',
    fontSize: 36,
    fontFamily: 'sans-serif',
    margin: '10px 0 0',
    fontWeight: 500,
  },
};
