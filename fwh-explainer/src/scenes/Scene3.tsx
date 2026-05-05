import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const xScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 14 });
  const textOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateRight: 'clamp' });
  const shake = frame < 30 ? Math.sin(frame * 2.5) * 10 * Math.max(0, 1 - frame / 30) : 0;

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.background} />

      {/* Hair icon with shake + red X */}
      <div style={{
        ...styles.iconGroup,
        transform: `translateX(${shake}px)`,
      }}>
        <div style={styles.hairEmoji}>💇</div>

        {/* Red X */}
        <svg
          width={160 * xScale}
          height={160 * xScale}
          viewBox="0 0 160 160"
          style={styles.redX}
        >
          <circle cx="80" cy="80" r="75" fill="rgba(200,0,0,0.25)" stroke="#FF2222" strokeWidth="5" />
          <line x1="40" y1="40" x2="120" y2="120" stroke="#FF2222" strokeWidth="12" strokeLinecap="round" />
          <line x1="120" y1="40" x2="40" y2="120" stroke="#FF2222" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text */}
      <div style={{ ...styles.textBox, opacity: textOpacity }}>
        <p style={styles.text}>„Auf Dauer strapaziert es dein Haar."</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden' },
  background: { background: 'radial-gradient(ellipse at center, #1a0000 0%, #0a0a0a 100%)' },
  iconGroup: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hairEmoji: { fontSize: 160 },
  redX: {
    position: 'absolute',
  },
  textBox: {
    position: 'absolute',
    bottom: 160,
    left: 60,
    right: 60,
    background: 'rgba(180,0,0,0.25)',
    borderRadius: 20,
    padding: '24px 32px',
    border: '1px solid rgba(255,50,50,0.4)',
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
