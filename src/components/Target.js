import { useEffect } from 'preact/hooks';
import { useComputed, observer } from 'mobx-react-lite';
import { styled } from 'goober';
import { action } from 'mobx';

import { useAppStore, GameState } from '../store';

const TARGET_RADIUS = 50;

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

  /**
   * Check if the player is within range of the target.
   */
  const isTargetFound = useComputed(() => {
    const playerTargetDistance = Math.sqrt(
      (store.playerPos[0] - store.targetPos[0]) ** 2 +
        (store.playerPos[1] - store.targetPos[1]) ** 2
    );
    console.log(playerTargetDistance, [...store.playerPos], store.targetPos);

    return playerTargetDistance < TARGET_RADIUS; // if player is within `N`px of target
  });

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
  useEffect(() => {
    const onResize = action(() => {
      store.windowSize = [window.innerWidth, window.innerHeight];
    });

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isTargetFound ? ( // only show target if within range
    <Indicator
      x={store.targetPos[0]}
      y={store.targetPos[1]}
      onClick={onClickTarget}
    />
  ) : null;
};

export default observer(Target);
