import { AbsoluteFill, interpolate, Series, useCurrentFrame } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';

const FPS = 30;

const S1 = 3 * FPS;
const S2 = 3 * FPS;
const S3 = 3 * FPS;
const S4 = 4 * FPS;
const S5 = 3 * FPS;
const S6 = 6 * FPS;

const SceneTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const FWHExplainer: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={S1}>
          <SceneTransition><Scene1 /></SceneTransition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={S2}>
          <SceneTransition><Scene2 /></SceneTransition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={S3}>
          <SceneTransition><Scene3 /></SceneTransition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={S4}>
          <SceneTransition><Scene4 /></SceneTransition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={S5}>
          <SceneTransition><Scene5 /></SceneTransition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={S6}>
          <SceneTransition><Scene6 /></SceneTransition>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
