import { useEffect } from 'preact/hooks';
import { useComputed, observer } from 'mobx-react-lite';
import { styled } from 'goober';
import { action } from 'mobx';

import { useAppStore } from '../store';

const TARGET_RADIUS = 50;

/**
 * Styles
 */
const Hitbox = styled('div')(({ x, y }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: `${TARGET_RADIUS * 2}px`,
	height: `${TARGET_RADIUS * 2}px`,
	borderRadius: '50%',
	cursor: 'pointer',
	transform: `translate(${x - TARGET_RADIUS}px, ${y - TARGET_RADIUS}px)`,
	backgroundColor: 'red'
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

	/**
   * Randomly generate target relative position at the start of the game.
   */
	useEffect(
		action(() => {
			store.targetRelativePos = [Math.random(), Math.random()];
		}),
		[]
	);

	return isTargetFound ? ( // only show target if within range
		<Hitbox x={store.targetPos[0]} y={store.targetPos[1]} />
	) : null;
};

export default observer(Target);
