import { useEffect, useRef } from 'preact/hooks';
import { useComputed, observer } from 'mobx-react-lite';
import { styled } from 'goober';
import { action } from 'mobx';

import { useAppStore, GameState } from 'store';
import { useWindowSize } from 'hooks/useWindowSize';
import { audioCtx, audioGainNode, playSound } from 'audio';

const TARGET_RADIUS = 50;
const TARGET_Z_POS = 300;

/**
 * Styles
 */
const Indicator = styled('div')(({ x, y }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: `${TARGET_RADIUS * 2}px`,
  height: `${TARGET_RADIUS * 2}px`,
  borderRadius: '50%',
  cursor: 'pointer',
  transform: `translate(${x - TARGET_RADIUS}px, ${y - TARGET_RADIUS}px)`,
  backgroundColor: 'red' // TODO: remove this
}));

/**
 * Component
 */
const Target = () => {
  const store = useAppStore();
  const curWindowSize = useWindowSize();
  const audioPanner = useRef(null);

  const playerTargetDistance = useComputed(
    () =>
      Math.sqrt(
        (store.playerPos[0] - store.targetPos[0]) ** 2 +
          (store.playerPos[1] - store.targetPos[1]) ** 2
      ),
    []
  );

  /**
   * Check if the player is within range of the target.
   */
  const isTargetFound = playerTargetDistance < TARGET_RADIUS; // if player is within `N`px of target

  const onClickTarget = action(() => {
    store.gameState = GameState.FINISHED;
  });

  /**
   * Randomly generate target relative position at the start of the game.
   */
  useEffect(
    action(() => {
      store.targetRelativePos = [Math.random(), Math.random()];
    }),
    []
  );

  /**
   * Update window size on resize so that target stays in viewport.
   */
  useEffect(
    action(() => {
      store.windowSize = curWindowSize;
    }),
    [curWindowSize]
  );

  /**
   * Set up audio source
   */
  useEffect(() => {
    const listener = audioCtx.listener;
    listener.positionZ.value = TARGET_Z_POS - 5; // place listener in front of target

    audioPanner.current = new PannerNode(audioCtx, {
      panningModel: 'HRTF',
      distanceModel: 'linear',
      positionX: store.targetPos[0],
      positionY: store.targetPos[1],
      positionZ: TARGET_Z_POS,
      orientationX: 0,
      orientationY: 0,
      orientationZ: -1, // have the audio source facing the user
      refDistance: 1,
      maxDistance: 10000,
      rolloffFactor: 100,
      coneInnerAngle: 60,
      coneOuterAngle: 90,
      coneOuterGain: 0.3
    });
  }, []);

  /**
   * Play sound every .5 seconds
   */
  useEffect(() => {
    playSound(audioPanner.current);

    const soundVal =
      (((Math.max(curWindowSize[0], curWindowSize[1]) - playerTargetDistance) /
        Math.max(curWindowSize[0], curWindowSize[1])) *
        3) **
      4;
    audioGainNode.gain.value = Math.min(70, Math.max(10, soundVal)); // clamp between 70 and 10
  }, [playerTargetDistance]);

  return (
    <>
      {isTargetFound ? ( // only show target if within range
        <Indicator
          x={store.targetPos[0]}
          y={store.targetPos[1]}
          onClick={onClickTarget}
        />
      ) : null}
      <audio />
    </>
  );
};

export default observer(Target);
