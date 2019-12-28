import { useEffect, useRef } from 'preact/hooks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useAppStore } from '../store';

const Player = () => {
	const store = useAppStore();

	const internalMousePos = useRef([0, 0]);

	/**
   * Compute
   */
	useEffect(() => {
		const mouseListener = e => {
			const mousePos = [
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

			internalMousePos.current = mousePos;
		};

		document.addEventListener('mousemove', mouseListener);

		return () => document.removeEventListener('mousemove', mouseListener);
	}, []);

	useEffect(() => {
		const playerUpdater = setInterval(() => {
			console.log('updating position', internalMousePos.current);
			store.playerPos = internalMousePos.current;
		}, 1000);

		return () => clearInterval(playerUpdater);
	}, []);

	return (
		<div>
      x: {store.playerPos[0]} y: {store.playerPos[1]}
		</div>
	);
};

export default observer(Player);
