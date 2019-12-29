import { useEffect, useRef } from 'preact/hooks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useAppStore } from 'store';
import { audioCtx } from 'audio';

/**
 * Component
 */
const Player = () => {
  const store = useAppStore();

  const internalMousePos = useRef([0, 0]);

  /**
   * Compute cursor position to update internal player position.
   */
  useEffect(() => {
    const onMouseMove = e => {
      const curMousePos = [
        window.Event
          ? e.pageX
          : event.clientX +
            (document.documentElement.scrollLeft
              ? document.documentElement.scrollLeft
              : document.body.scrollLeft),
        window.Event
          ? e.pageY
          : event.clientY +
            (document.documentElement.scrollTop
              ? document.documentElement.scrollTop
              : document.body.scrollTop)
      ];

      internalMousePos.current = curMousePos;
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  /**
   * Update player position at a set interval for target detection.
   */
  useEffect(() => {
    const playerUpdater = setInterval(
      action(() => {
        store.playerPos = internalMousePos.current;

        // update audio listener position to reflect new player position
        const listener = audioCtx.listener;
        listener.positionX.value = internalMousePos.current[0];
        listener.positionY.value = internalMousePos.current[1];
      }),
      1000
    );

    return () => clearInterval(playerUpdater);
  }, []);

  return (
    <div>
      x: {store.playerPos[0]} y: {store.playerPos[1]}
    </div>
  );
};

export default observer(Player);
