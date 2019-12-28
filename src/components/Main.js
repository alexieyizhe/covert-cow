import { styled } from 'goober';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { GameState, useAppStore } from '../store';
import Player from './Player';
import Target from './Target';

/**
 * Styles
 */
const Title = styled('h1')`
  color: lightblue;
  text-align: center;
`;

/**
 * Component
 */
const Main = () => {
	const store = useAppStore();

	const onClickStart = action(() => {
		store.gameState = GameState.RUNNING;
	});

	switch (store.gameState) {
		case GameState.INITIAL:
			return (
				<div>
					<Title>hello this is a work in progress</Title>
					<button onClick={onClickStart}>start game</button>
				</div>
			);

		case GameState.RUNNING:
			return (
				<div>
					<p>game started</p>
					<Player />
					<Target />
				</div>
			);

		case GameState.FINISHED:
			return (
				<div>
					<p>game FINISHED</p>
				</div>
			);

		default:
			throw new Error('Game is not in a valid state');
	}
};

export default observer(Main);
