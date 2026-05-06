import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Character } from '../Character';
import { SW } from '../theme';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = spring({ frame, fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const w2 = spring({ frame: Math.max(0, frame - 5), fps, from: -80, to: 0, durationInFrames: 16, config: { damping: 16 } });
  const o1 = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const o2 = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: 'clamp' });

  const imgScale = spring({ frame, fps, from: 0.88, to: 1, durationInFrames: 20 });
  const imgOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: Math.max(0, frame - 16), fps, from: 0, to: 1, durationInFrames: 14, config: { damping: 7 } });

  const kwOpacity = interpolate(frame, [26, 34], [0, 1], { extrapolateRight: 'clamp' });
  const kwY = spring({ frame: Math.max(0, frame - 26), fps, from: 60, to: 0, durationInFrames: 14, config: { damping: 14 } });

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.grain} />
      <div style={styles.sceneNum}>04</div>

      {/* Title */}
      <div style={styles.titleBlock}>
        <p style={styles.tag}>THE SOLUTION</p>
        <div style={{ overflow: 'hidden', marginBottom: 4 }}>
          <p style={{ ...styles.tl, opacity: o1, transform: `translateY(${w1}px)` }}>SATIN REDUZIERT REIBUNG.</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ ...styles.tl, ...styles.tlGold, opacity: o2, transform: `translateY(${w2}px)` }}>KEIN FRIZZ.</p>
        </div>
      </div>

      {/* Satin image */}
      <div style={{ ...styles.imgWrap, opacity: imgOpacity, transform: `scale(${imgScale})` }}>
        <Img src={staticFile('caps/cap_interior.jpg')} style={styles.satinImg} />
        <div style={styles.imgLabel}>
          <p style={styles.imgLabelText}>✓ PREMIUM SATIN INNEN</p>
        </div>
      </div>

      {/* Character */}
      <div style={styles.charWrap}>
        <Character mood="thumbsup" scale={0.56} />
      </div>

      {/* Checkmark */}
      <div style={{ ...styles.checkWrap, transform: `scale(${checkScale})` }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="52" fill="rgba(0,200,83,0.12)" stroke="#00C853" strokeWidth="5" />
          <polyline points="27,55 47,76 83,36" fill="none" stroke="#00C853" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Keyword */}
      <div style={{ ...styles.kwWrap, opacity: kwOpacity, transform: `translateY(${kwY}px)` }}>
        <svg width="980" height="180" viewBox="0 0 980 180" style={styles.kwGhost}>
          <text x="490" y="160" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs"
            fontSize="180" fontFamily="Impact, sans-serif"
            fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="2">SATIN</text>
        </svg>
        <svg width="980" height="180" viewBox="0 0 980 180" style={styles.kwSvg}>
          <text x="490" y="160" textAnchor="middle" textLength="940" lengthAdjust="spacingAndGlyphs"
            fontSize="170" fontFamily="Impact, sans-serif" fill={SW.gold}>SATIN</text>
        </svg>
        <p style={styles.kwSub}>Smooth · Kein Frizz · Kein Haarbruch</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden', background: '#000' },
  grain: { backgroundImage: SW.grain, backgroundRepeat: 'repeat', backgroundSize: '300px 300px', opacity: 0.7 },
  sceneNum: { position: 'absolute', top: 180, right: 50, fontSize: 220, fontFamily: 'Impact, sans-serif', color: 'rgba(255,255,255,0.03)', lineHeight: 1 },
  titleBlock: { position: 'absolute', top: 250, left: 50, right: 50 },
  tag: { color: SW.gold, fontSize: 20, fontFamily: SW.fontBody, letterSpacing: 8, margin: '0 0 20px', textTransform: 'uppercase' as const },
  tl: { color: '#fff', fontSize: 72, fontFamily: SW.fontDisplay, margin: 0, lineHeight: 0.95, letterSpacing: -1, textTransform: 'uppercase' as const },
  tlGold: { color: SW.gold },
  imgWrap: {
    position: 'absolute', top: 480, left: 50, right: 50,
    borderRadius: 2, overflow: 'hidden',
    boxShadow: '0 12px 80px rgba(201,168,76,0.35)',
    border: `2px solid ${SW.gold}`, transformOrigin: 'center',
  },
  satinImg: { width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center top' },
  imgLabel: { background: SW.gold, padding: '10px 20px' },
  imgLabelText: { color: '#000', fontSize: 24, fontWeight: 900, fontFamily: SW.fontDisplay, margin: 0, textAlign: 'center' as const, letterSpacing: 3 },
  charWrap: { position: 'absolute', top: 480, right: 56, zIndex: 10 },
  checkWrap: { position: 'absolute', top: 472, right: 50, transformOrigin: 'center', zIndex: 11 },
  kwWrap: { position: 'absolute', bottom: 80, left: 50, right: 50 },
  kwGhost: { position: 'absolute' as const, top: -6, left: -4 },
  kwSvg: { display: 'block' },
  kwSub: { color: '#444', fontSize: 28, fontFamily: SW.fontBody, margin: '4px 0 0', letterSpacing: 4, textTransform: 'uppercase' as const },
};
