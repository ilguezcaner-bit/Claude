import './index.css';
import { Composition, staticFile } from 'remotion';
import { FWHExplainer } from './Composition';

// Load Bebas Neue from local file (CDN not available in this environment)
const fontFace = new FontFace(
  'Bebas Neue',
  `url(${staticFile('fonts/BebasNeue-Regular.woff2')}) format('woff2')`,
  { weight: '400' }
);
fontFace.load().then((f) => document.fonts.add(f));

const FPS = 30;
const TOTAL_FRAMES = (3 + 3 + 3 + 4 + 3 + 6) * FPS; // 22s = 660 frames

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FWHExplainer"
        component={FWHExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
