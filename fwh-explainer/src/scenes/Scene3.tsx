import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const xScale = spring({ frame: Math.max(0, frame - 6), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 8 } });
  const keywordOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });
  const shake = Math.sin(frame * 2.8) * 7 * Math.max(0, 1 - frame / 18);

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.topBar} />

      <div style={styles.titleBox}>
        <p style={styles.titleLabel}>THE DAMAGE</p>
        <p style={styles.titleText}>Auf Dauer strapaziert es dein Haar.</p>
      </div>

      <div style={{ ...styles.imgRight, opacity: imgOpacity }}>
        <Img src={staticFile('caps/cap_official.jpg')} style={styles.capImg} />
        <div style={styles.imgLabel}>
          <p style={styles.imgLabelText}>❌  BAUMWOLLE INNEN</p>
        </div>
      </div>

      <div style={{ ...styles.charWrap, transform: `translateX(${shake}px)` }}>
        <Character mood="confused" scale={0.72} />
        <svg width={160 * xScale} height={160 * xScale} viewBox="0 0 160 160"
          style={{ position: 'absolute', top: 10, left: -10 }}>
          <circle cx="80" cy="80" r="74" fill="rgba(232,51,74,0.15)" stroke={SW.red} strokeWidth="6" />
          <line x1="40" y1="40" x2="120" y2="120" stroke={SW.red} strokeWidth="13" strokeLinecap="round" />
          <line x1="120" y1="40" x2="40" y2="120" stroke={SW.red} strokeWidth="13" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ ...styles.keyword, opacity: keywordOpacity }}>
        <p style={styles.keywordText}>SCHADEN</p>
        <p style={styles.keywordSub}>Frizz  ·  Haarbruch  ·  Trockenheit</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: SW.bgPure },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', opacity: 0.8 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: SW.red },
  titleBox: {
    position: 'absolute', top: 280, left: 50, right: 50,
    background: SW.bgCardRed, borderRadius: 4, padding: '28px 40px 32px',
    borderLeft: `6px solid ${SW.red}`,
    borderTop: '1px solid rgba(232,51,74,0.2)',
    borderRight: '1px solid rgba(232,51,74,0.2)',
    borderBottom: '1px solid rgba(232,51,74,0.2)',
  },
  titleLabel: {
    color: SW.red, fontSize: 22, fontWeight: 700, fontFamily: SW.fontBody,
    letterSpacing: 6, margin: '0 0 10px', textTransform: 'uppercase' as const,
  },
  titleText: {
    color: '#ffffff', fontSize: 50, fontFamily: SW.fontDisplay,
    margin: 0, lineHeight: 1.1, letterSpacing: -1, textTransform: 'uppercase' as const,
  },
  imgRight: {
    position: 'absolute', top: 460, right: 40, width: 380,
    borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 8px 60px rgba(232,51,74,0.3)',
    border: `3px solid ${SW.red}`,
  },
  capImg: { width: '100%', height: 340, objectFit: 'cover' },
  imgLabel: { background: SW.red, padding: '12px 16px' },
  imgLabelText: {
    color: '#fff', fontSize: 26, fontWeight: 900, fontFamily: SW.fontDisplay,
    margin: 0, textAlign: 'center' as const, letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  charWrap: { position: 'absolute', top: 460, left: 20 },
  keyword: { position: 'absolute', top: 1090, left: 50, right: 50, textAlign: 'center' as const },
  keywordText: {
    color: SW.red, fontSize: 110, fontFamily: SW.fontDisplay,
    margin: 0, letterSpacing: 4, textTransform: 'uppercase' as const,
    WebkitTextStroke: '2px rgba(232,51,74,0.3)',
  },
  keywordSub: {
    color: '#555', fontSize: 32, fontFamily: SW.fontBody,
    margin: '8px 0 0', letterSpacing: 3, textTransform: 'uppercase' as const,
  },
};
