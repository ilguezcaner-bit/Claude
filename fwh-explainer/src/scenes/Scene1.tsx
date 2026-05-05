import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const characterX = spring({ frame, fps, from: -400, to: 0, durationInFrames: 20 });
  const textOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [15, 25], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={styles.container}>
      {/* Crumpled paper texture background */}
      <AbsoluteFill style={styles.background} />
      <AbsoluteFill style={styles.noise} />

      {/* Character */}
      <div style={{ ...styles.character, transform: `translateX(${characterX}px)` }}>
        <div style={styles.body}>
          <div style={styles.head}>
            <div style={styles.face}>
              {/* confused eyes */}
              <div style={styles.eyeRow}>
                <div style={{ ...styles.eye, transform: 'rotate(-15deg)' }} />
                <div style={{ ...styles.eye, transform: 'rotate(15deg)' }} />
              </div>
              <div style={styles.mouthConfused} />
            </div>
          </div>
          <div style={styles.torso} />
          {/* cap held in hand */}
          <div style={styles.arm}>
            <div style={styles.capIcon}>🧢</div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div style={{ ...styles.textBox, opacity: textOpacity, transform: `translateY(${textY}px)` }}>
        <p style={styles.text}>„Die meisten Caps sind innen aus Baumwolle."</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden' },
  background: {
    background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
  },
  noise: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
    opacity: 0.4,
  },
  character: {
    position: 'absolute',
    bottom: 320,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  body: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
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
  eye: {
    width: 12,
    height: 16,
    borderRadius: '50%',
    background: '#1a1a1a',
  },
  mouthConfused: {
    width: 30,
    height: 14,
    borderRadius: '0 0 15px 15px',
    border: '3px solid #1a1a1a',
    borderTop: 'none',
    transform: 'scaleY(-1)',
  },
  torso: {
    width: 80,
    height: 100,
    background: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 4,
  },
  arm: {
    marginTop: -60,
    marginLeft: 70,
    fontSize: 48,
  },
  capIcon: { fontSize: 48 },
  textBox: {
    position: 'absolute',
    bottom: 160,
    left: 60,
    right: 60,
    background: 'rgba(0,0,0,0.75)',
    borderRadius: 20,
    padding: '24px 32px',
    border: '1px solid rgba(255,255,255,0.12)',
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
