import { useEffect, useRef } from 'preact/hooks';
import { observer } from 'mobx-react-lite';
import { styled } from 'goober';
import { action, computed } from 'mobx';

import { useAppStore, GameState } from 'store';
import { useWindowSize } from 'hooks/useWindowSize';
import { audioCtx, audioGainNode, playSound, NUM_SOUND_LEVELS } from 'audio';

const TARGET_RADIUS = 40;
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
  zIndex: 2,
  transform: `translate(${x - TARGET_RADIUS}px, ${y - TARGET_RADIUS}px)`
}));

/**
 * Component
 */
const Target = () => {
  const store = useAppStore();
  const curWindowSize = useWindowSize();
  const audioPanner = useRef(null);

  /**
   * Observable tracking the distance from target to player
   */
  const playerTargetDistance = computed(() =>
    Math.sqrt(
      (store.playerPos[0] - store.targetPos[0]) ** 2 +
        (store.playerPos[1] - store.targetPos[1]) ** 2
    )
  );

  /**
   * Check if the player is within range of the target.
   */
  const isTargetFound = playerTargetDistance.get() < TARGET_RADIUS; // if player is within `N`px of target

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
   * Set up audio source and directional panner node.
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
      orientationZ: -1, // have the audio source face the user
      refDistance: 1,
      maxDistance: 10000,
      rolloffFactor: 100,
      coneInnerAngle: 60,
      coneOuterAngle: 90,
      coneOuterGain: 0.3
    });
  }, []);

  /**
   * Play sound every .4 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const percentageDistFromTarget = Math.exp(
        (Math.E - playerTargetDistance.get()) / 500
      );
      const soundFileToPlay = Math.floor(
        percentageDistFromTarget * NUM_SOUND_LEVELS
      );
      const clampedGainValue = Math.min(11, Math.max(1, soundFileToPlay));

      // set gain value to increase as player gets closer to target
      audioGainNode.gain.value = clampedGainValue;

      // play the sound
      playSound(audioPanner.current, soundFileToPlay);
    }, 400);

    return () => clearInterval(interval);
  }, []);

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
