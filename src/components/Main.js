import { styled } from 'goober';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { GameState, useAppStore } from '../store';
import Player from './Player';
import Target from './Target';
import Card from './Card';

/**
 * Styles
 */
const Container = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
`;

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
        <Container>
          <Card>
            <Title>hello this is a work in progress</Title>
            <button onClick={onClickStart}>Start</button>
          </Card>
        </Container>
      );

    case GameState.RUNNING:
      return (
        <>
          <p>game started</p>
          <Player />
          <Target />
        </>
      );

    case GameState.FINISHED:
      return (
        <Container>
          <Card>
            <Title>over</Title>
            <button onClick={onClickStart}>Again</button>
          </Card>
        </Container>
      );

    default:
      throw new Error('Game is not in a valid state');
  }
};

export default observer(Main);
