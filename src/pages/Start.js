import { action } from 'mobx';

import { GameState, useAppStore } from 'store';
import Card from 'components/Card';
import Image from 'components/Image';
import Title from 'components/Title';
import Desc from 'components/Desc';
import InvisibleCow from 'assets/invisiblecow.jpg';

const Start = () => {
  const store = useAppStore();

  const onClickStart = action(() => {
    store.gameState = GameState.RUNNING;
  });

  return (
    <Card>
      <Image src={InvisibleCow} />
      <Title>hello i am the invisible cow</Title>
      <wired-button onClick={onClickStart}>find me</wired-button>
      <Desc>make sure your sound is on. best enjoyed with headphones!</Desc>
    </Card>
  );
};

export default Start;
