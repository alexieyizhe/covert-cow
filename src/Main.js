import { styled, glob } from 'goober';
import { observer } from 'mobx-react-lite';
import 'wired-button';

import { GameState, useAppStore } from 'store';
import Start from 'pages/Start';
import Game from 'pages/Game';
import Win from 'pages/Win';
import Footer from 'components/Footer';

/**
 * Styles
 */
glob`
  html,
  body {
    font-family: Gloria Hallelujah, Comic Sans MS, sans-serif;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }  
`;

const PageContainer = styled('main')`
  width: 100%;
  height: 100%;
  display: flex;

  & wired-card {
    margin: auto;
    padding: 40px;
  }
`;

/**
 * Component
 */
const Main = () => {
  const store = useAppStore();

  let Component;

  switch (store.gameState) {
    case GameState.INITIAL:
      Component = Start;
      break;

    case GameState.RUNNING:
      Component = Game;
      break;

    case GameState.FINISHED:
      Component = Win;
      break;

    default:
      throw new Error('Game is not in a valid state');
  }

  return (
    <PageContainer>
      <Component />
      <Footer />
    </PageContainer>
  );
};

export default observer(Main);
