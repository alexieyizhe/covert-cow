import { styled, glob } from 'goober';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import 'wired-card';
import 'wired-button';

import { GameState, useAppStore } from 'store';
import Player from 'components/Player';
import Target from 'components/Target';
import Footer from 'components/Footer';

import Cow from 'assets/cow.jpg';
import InvisibleCow from 'assets/invisiblecow.jpg';

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

const CardContents = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled('h1')`
  margin-bottom: 20px;

  color: lightblue;
  text-align: center;
`;

const Desc = styled('p')`
  margin: 20px auto 0;
  width: 60%;

  color: orange;
  text-align: center;
  font-size: 14px;
  font-family: Comic Sans MS, sans-serif;
  opacity: 0.6;
`;

const Image = styled('img')`
  width: 150px;
  opacity: 0.8;
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
        <PageContainer>
          <wired-card elevation="2">
            <CardContents>
              <Image src={InvisibleCow} />
              <Title>hello i am the invisible cow</Title>
              <wired-button onClick={onClickStart}>find me</wired-button>
              <Desc>
                make sure your sound is on. best enjoyed with headphones!
              </Desc>
            </CardContents>
          </wired-card>
          <Footer />
        </PageContainer>
      );

    case GameState.RUNNING:
      return (
        <PageContainer>
          <Player />
          <Target />
          <Footer />
        </PageContainer>
      );

    case GameState.FINISHED:
      return (
        <PageContainer>
          <wired-card elevation="2">
            <CardContents>
              <Image src={Cow} />
              <Title>the end</Title>
              <wired-button onClick={onClickStart}>Again</wired-button>
            </CardContents>
          </wired-card>
          <Footer />
        </PageContainer>
      );

    default:
      throw new Error('Game is not in a valid state');
  }
};

export default observer(Main);
