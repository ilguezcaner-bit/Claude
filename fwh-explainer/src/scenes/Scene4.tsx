import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const charX = spring({ frame, fps, from: -400, to: 0, durationInFrames: 22 });
  const checkScale = spring({ frame: Math.max(0, frame - 15), fps, from: 0, to: 1, durationInFrames: 16, config: { damping: 8 } });
  const textOpacity = interpolate(frame, [22, 32], [0, 1], { extrapolateRight: 'clamp' });

  // thumbs up bounce
  const thumbBounce = spring({ frame: Math.max(0, frame - 10), fps, from: 0, to: 1, durationInFrames: 18, config: { damping: 6 } });

  return (
    <AbsoluteFill style={styles.container}>
      {/* Dark base */}
      <AbsoluteFill style={styles.darkBg} />
      {/* Gold overlay */}
      <AbsoluteFill style={{ ...styles.goldBg, opacity: bgOpacity }} />

      {/* Character with new cap + thumbs up */}
      <div style={{ ...styles.character, transform: `translateX(${charX}px)` }}>
        <div style={styles.capOnHead}>🧢</div>
        <div style={styles.head}>
          <div style={styles.face}>
            <div style={styles.eyeRow}>
              <div style={styles.eyeHappy} />
              <div style={styles.eyeHappy} />
            </div>
            <div style={styles.smile} />
          </div>
        </div>
        <div style={styles.torso} />
        <div style={{
          ...styles.thumbsUp,
          transform: `scale(${thumbBounce}) translateY(${(1 - thumbBounce) * 40}px)`,
        }}>👍</div>
      </div>

      {/* Green checkmark */}
      <div style={{
        ...styles.checkContainer,
        transform: `scale(${checkScale})`,
      }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="60" fill="rgba(0,180,80,0.25)" stroke="#00C853" strokeWidth="5" />
          <polyline points="32,65 55,90 98,42" fill="none" stroke="#00C853" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Text */}
      <div style={{ ...styles.textBox, opacity: textOpacity }}>
        <p style={styles.text}>„Satin reduziert Reibung. Kein Frizz."</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden' },
  darkBg: { background: '#0a0a0a' },
  goldBg: {
    background: 'radial-gradient(ellipse at 50% 40%, #3d2a00 0%, #1a1000 60%, #0a0a0a 100%)',
  },
  character: {
    position: 'absolute',
    bottom: 310,
    left: '22%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  capOnHead: { fontSize: 64, marginBottom: -10, zIndex: 2 },
  head: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: '#F4C27F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  face: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  eyeRow: { display: 'flex', gap: 18 },
  eyeHappy: {
    width: 14,
    height: 8,
    borderRadius: '8px 8px 0 0',
    background: '#1a1a1a',
  },
  smile: {
    width: 40,
    height: 20,
    borderRadius: '0 0 20px 20px',
    border: '3px solid #1a1a1a',
    borderTop: 'none',
  },
  torso: {
    width: 80,
    height: 100,
    background: '#C9A84C',
    borderRadius: 12,
  },
  thumbsUp: {
    fontSize: 72,
    marginTop: -20,
    marginLeft: 80,
  },
  checkContainer: {
    position: 'absolute',
    top: '30%',
    right: '10%',
    transformOrigin: 'center',
  },
  textBox: {
    position: 'absolute',
    bottom: 160,
    left: 60,
    right: 60,
    background: 'rgba(0,150,60,0.2)',
    borderRadius: 20,
    padding: '24px 32px',
    border: '1px solid rgba(0,200,80,0.4)',
  },
  text: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.3,
  },
};
