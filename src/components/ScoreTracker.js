import { styled } from 'goober';
import { useState, useEffect } from 'preact/hooks';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useAppStore } from 'store';

export const BEST_TIME_KEY = 'game_best_time';
export const BEST_SCORE_KEY = 'game_tot_score';

const Container = styled('div')`
  position: absolute;
  top: 5px;
  right: 15px;
  z-index: -1;

  text-align: center;

  & > * {
    font-size: 14px;
    color: grey;
  }

  & > .cur-time {
    font-size: 40px;
    color: black;
  }
`;

const ScoreTracker = () => {
  const store = useAppStore();

  const [curTime, setCurTime] = useState(0);

  useEffect(
    action(() => {
      if (typeof Storage !== undefined) {
        // check browser compatability
        const storedBestTime = parseInt(
          window.localStorage.getItem(BEST_TIME_KEY),
          10
        );
        const storedTotScore = parseInt(
          window.localStorage.getItem(BEST_SCORE_KEY),
          10
        );

        if (!isNaN(storedBestTime)) {
          store.bestTimeSeconds = storedBestTime;
        }

        if (!isNaN(storedTotScore)) {
          store.totScore = storedTotScore;
        }
      }
    }),
    []
  );

  /**
   * Track current running time
   */
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCurTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(
    () =>
      action(() => {
        store.curTimeSeconds = curTime;
      }),
    [curTime]
  );

  return (
    <Container>
      <div className="cur-time">{curTime}</div>
      {isFinite(store.bestTimeSeconds) && (
        <div className="best-time">best: {store.bestTimeSeconds}s</div>
      )}
      <div className="tot-score">{store.totScore} cows found</div>
    </Container>
  );
};

export default observer(ScoreTracker);
