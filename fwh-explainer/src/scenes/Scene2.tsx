import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowX = spring({ frame, fps, from: -300, to: 0, durationInFrames: 18 });
  const hairX = spring({ frame: Math.max(0, frame - 8), fps, from: 400, to: 0, durationInFrames: 18 });
  const textOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });

  // shake effect
  const shake = frame > 20 ? Math.sin(frame * 1.8) * 4 : 0;

  return (
    <AbsoluteFill style={styles.container}>
      <AbsoluteFill style={styles.background} />

      {/* Friction Arrow */}
      <div style={{ ...styles.arrowContainer, transform: `translateX(${arrowX}px)` }}>
        <svg width="220" height="80" viewBox="0 0 220 80">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#FF4444" />
            </marker>
          </defs>
          <line x1="10" y1="40" x2="195" y2="40" stroke="#FF4444" strokeWidth="6"
            strokeDasharray="16,8" markerEnd="url(#arrowhead)" />
          <text x="110" y="25" textAnchor="middle" fill="#FF4444" fontSize="18" fontWeight="bold"
            fontFamily="sans-serif">REIBUNG</text>
        </svg>
      </div>

      {/* Hair Icon */}
      <div style={{
        ...styles.hairContainer,
        transform: `translateX(${hairX}px) rotate(${shake}deg)`
      }}>
        <div style={styles.hairIcon}>
          <svg width="120" height="140" viewBox="0 0 120 140">
            {/* Dry/frizzy hair strands */}
            {[0, 15, -15, 25, -25, 10, -10].map((angle, i) => (
              <line key={i}
                x1="60" y1="140"
                x2={60 + Math.sin((angle * Math.PI) / 180) * 60}
                y2={140 - 100 + (i % 3) * 10}
                stroke="#8B4513"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            {/* Dry indicator lines */}
            <text x="60" y="20" textAnchor="middle" fontSize="32">💇</text>
          </svg>
        </div>
        <p style={styles.hairLabel}>Trockenes Haar</p>
      </div>

      {/* Text */}
      <div style={{ ...styles.textBox, opacity: textOpacity }}>
        <p style={styles.textMain}>„Mehr Reibung. Weniger Feuchtigkeit."</p>
      </div>
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { overflow: 'hidden' },
  background: { background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)' },
  arrowContainer: {
    position: 'absolute',
    top: '38%',
    left: '8%',
  },
  hairContainer: {
    position: 'absolute',
    top: '30%',
    right: '8%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  hairIcon: { fontSize: 80 },
  hairLabel: {
    color: '#aaa',
    fontSize: 28,
    fontFamily: 'sans-serif',
    marginTop: 8,
    textAlign: 'center',
  },
  textBox: {
    position: 'absolute',
    bottom: 160,
    left: 60,
    right: 60,
    background: 'rgba(180,30,30,0.2)',
    borderRadius: 20,
    padding: '24px 32px',
    border: '1px solid rgba(255,80,80,0.35)',
  },
  textMain: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    margin: 0,
    lineHeight: 1.3,
  },
};
