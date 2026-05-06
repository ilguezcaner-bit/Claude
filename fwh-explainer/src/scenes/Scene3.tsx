import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = spring({ frame, fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const w2 = spring({ frame: Math.max(0, frame - 5), fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const w3 = spring({ frame: Math.max(0, frame - 10), fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const o1 = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const o2 = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' });
  const o3 = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' });

  const imgOpacity = interpolate(frame, [4, 16], [0, 1], { extrapolateRight: 'clamp' });
  const xScale = spring({ frame: Math.max(0, frame - 8), fps, from: 0, to: 1, durationInFrames: 14, config: { damping: 8 } });
  const shake = Math.sin(frame * 2.8) * 6 * Math.max(0, 1 - frame / 18);

  const kwOpacity = interpolate(frame, [22, 30], [0, 1], { extrapolateRight: 'clamp' });
  const kwY = spring({ frame: Math.max(0, frame - 22), fps, from: 60, to: 0, durationInFrames: 14, config: { damping: 14 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.sceneNum}>03</div>

      {/* Title */}
      <div style={styles.titleBlock}>
        <p style={styles.tag}>THE DAMAGE</p>
        <div style={{ overflow: 'hidden', marginBottom: 2 }}>
          <p style={{ ...styles.tl, opacity: o1, transform: `translateY(${w1}px)` }}>AUF DAUER</p>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 2 }}>
          <p style={{ ...styles.tl, ...styles.tlRed, opacity: o2, transform: `translateY(${w2}px)` }}>STRAPAZIERT ES</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ ...styles.tl, opacity: o3, transform: `translateY(${w3}px)` }}>DEIN HAAR.</p>
        </div>
      </div>

      {/* Cap image — right */}
      <div style={{ ...styles.imgRight, opacity: imgOpacity }}>
        <Img src={staticFile('caps/cap_official.jpg')} style={styles.capImg} />
        <div style={styles.imgLabel}>
          <p style={styles.imgLabelText}>BAUMWOLLE INNEN</p>
        </div>
      </div>

      {/* Character + X */}
      <div style={{ ...styles.charWrap, transform: `translateX(${shake}px)` }}>
        <Character mood="confused" scale={0.68} />
        <svg width={150 * xScale} height={150 * xScale} viewBox="0 0 150 150"
          style={{ position: 'absolute', top: 8, left: -8 }}>
          <circle cx="75" cy="75" r="70" fill="rgba(232,51,74,0.12)" stroke={SW.red} strokeWidth="5" />
          <line x1="35" y1="35" x2="115" y2="115" stroke={SW.red} strokeWidth="12" strokeLinecap="round" />
          <line x1="115" y1="35" x2="35" y2="115" stroke={SW.red} strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.kwWrap, opacity: kwOpacity, transform: `translateY(${kwY}px)` }}>
        <svg width="980" height="160" viewBox="0 0 980 160" style={styles.kwGhost}>
          <text x="490" y="140" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs"
            fontSize="160" fontFamily="Anton, Impact, sans-serif"
            fill="none" stroke="rgba(232,51,74,0.1)" strokeWidth="3">SCHADEN</text>
        </svg>
        <svg width="980" height="160" viewBox="0 0 980 160" style={styles.kwSvg}>
          <text x="490" y="140" textAnchor="middle" textLength="940" lengthAdjust="spacingAndGlyphs"
            fontSize="150" fontFamily="Anton, Impact, sans-serif" fill={SW.red}>SCHADEN</text>
        </svg>
        <p style={styles.kwSub}>Frizz · Haarbruch · Trockenheit</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#000' },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', backgroundSize: '300px 300px', opacity: 0.7 },
  sceneNum: { position: 'absolute', top: 180, right: 50, fontSize: 220, fontFamily: 'Impact, sans-serif', color: 'rgba(255,255,255,0.03)', lineHeight: 1 },
  titleBlock: { position: 'absolute', top: 250, left: 50, right: 50 },
  tag: { color: SW.red, fontSize: 20, fontFamily: SW.fontBody, letterSpacing: 8, margin: '0 0 20px', textTransform: 'uppercase' as const },
  tl: { color: '#fff', fontSize: 78, fontFamily: SW.fontDisplay, margin: 0, lineHeight: 0.95, letterSpacing: -1, textTransform: 'uppercase' as const },
  tlRed: { color: SW.red },
  imgRight: {
    position: 'absolute', top: 490, right: 40, width: 360,
    borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 8px 60px rgba(232,51,74,0.3)',
    border: `2px solid ${SW.red}`,
  },
  capImg: { width: '100%', height: 320, objectFit: 'cover' },
  imgLabel: { background: SW.red, padding: '10px 14px' },
  imgLabelText: { color: '#000', fontSize: 22, fontWeight: 900, fontFamily: SW.fontDisplay, margin: 0, textAlign: 'center' as const, letterSpacing: 3, textTransform: 'uppercase' as const },
  charWrap: { position: 'absolute', top: 490, left: 10 },
  kwWrap: { position: 'absolute', bottom: 100, left: 50, right: 50 },
  kwGhost: { position: 'absolute' as const, top: -6, left: -4 },
  kwSvg: { display: 'block' },
  kwSub: { color: '#444', fontSize: 28, fontFamily: SW.fontBody, margin: '4px 0 0', letterSpacing: 4, textTransform: 'uppercase' as const },
};
