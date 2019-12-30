import { styled } from 'goober';
import { useEffect, useRef, useState } from 'preact/hooks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useAppStore } from 'store';
import { audioCtx } from 'audio';

/**
 * Styles
 */
const Tip = styled('span')(({ show }) => ({
  transition: 'opacity 300ms',
  opacity: show ? 0.8 : 0,

  position: 'relative',
  margin: 'auto',
  zIndex: -1,
  fontFamily: 'Comic Sans MS, sans-serif'
}));

/**
 * Component
 */
const Player = () => {
  const store = useAppStore();

  const internalMousePos = useRef([0, 0]);
  const [showTip, setShowTip] = useState(true);

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

      setShowTip(false);
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
        // update player position
        store.playerPos = internalMousePos.current;

        // update audio listener position to reflect new player position
        const listener = audioCtx.listener;
        listener.positionX.value = internalMousePos.current[0];
        listener.positionY.value = internalMousePos.current[1];
      }),
      400
    );

    return () => clearInterval(playerUpdater);
  }, []);

  return (
    <Tip
      show={showTip}
      x={internalMousePos.current[0]}
      y={internalMousePos.current[1]}
    >
      MOOve your mouse!
    </Tip>
  );
};

export default observer(Player);
