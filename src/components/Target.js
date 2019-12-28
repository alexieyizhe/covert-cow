import { useEffect } from "preact/hooks";
import { useComputed, observer } from "mobx-react-lite";
import { styled } from "goober";

import { useAppStore } from "../store";

/**
 * Styles
 */
const Hitbox = styled("div")(({ x, y }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  cursor: "pointer",
  transform: `translate(${x - 25}px, ${y - 25}px)`,
  backgroundColor: "red"
}));

/**
 * Component
 */
const Target = () => {
  const store = useAppStore();

  const isTargetHit = useComputed(() => {
    const playerTargetDistance = Math.sqrt(
      (store.playerPos[0] - store.targetPos[0]) ** 2 +
        (store.playerPos[1] - store.targetPos[1]) ** 2
    );
    console.log(playerTargetDistance, [...store.playerPos], store.targetPos);

    return playerTargetDistance < 25; // if player is within `N`px of target
  });

  return isTargetHit ? (
    <Hitbox x={store.targetPos[0]} y={store.targetPos[1]} />
  ) : null;
};

export default observer(Target);
