import './index.css';
import { Composition } from 'remotion';
import { FWHExplainer } from './Composition';

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
