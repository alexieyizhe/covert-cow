import { useEffect } from 'preact/hooks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { GameState, useAppStore } from 'store';
import Cow from 'assets/cow.jpg';

import Card from 'components/Card';
import Image from 'components/Image';
import Title from 'components/Title';
import Desc from 'components/Desc';
import { BEST_TIME_KEY, BEST_SCORE_KEY } from 'components/ScoreTracker';

const Win = () => {
  const store = useAppStore();

  const onClickStart = action(() => {
    store.gameState = GameState.RUNNING;
  });

  // check if time is better than best time and update if so
  useEffect(
    action(() => {
      if (store.curTimeSeconds < store.bestTimeSeconds) {
        store.bestTimeSeconds = store.curTimeSeconds;
        localStorage.setItem(BEST_TIME_KEY, store.curTimeSeconds);
      }

      const newScore = store.totScore + 1;

      store.totScore = newScore;
      localStorage.setItem(BEST_SCORE_KEY, newScore);
    }),
    []
  );

  return (
    <Card>
      <Image src={Cow} />
      <Title>the end</Title>
      <Desc>you found the cow in {store.curTimeSeconds}s!</Desc>
      <wired-button onClick={onClickStart}>again</wired-button>
    </Card>
  );
};

export default observer(Win);
