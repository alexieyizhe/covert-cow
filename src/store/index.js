import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { useLocalStore } from 'mobx-react-lite';

/**
 * MobX store
 */
export const GameState = {
  INITIAL: 'initial',
  RUNNING: 'running',
  FINISHED: 'finished'
};

export const createStore = () => ({
  gameState: GameState.INITIAL,
  playerPos: [0, 0],
  targetRelativePos: [-1, -1],
  windowSize: [window.innerWidth, window.innerHeight],

  get targetPos() {
    return [
      this.targetRelativePos[0] * this.windowSize[0],
      this.targetRelativePos[1] * this.windowSize[1]
    ];
  }
});

/**
 * Global state
 */
export const AppContext = createContext();

export const AppStoreProvider = ({ children }) => {
  const store = useLocalStore(createStore);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export const useAppStore = () => {
  const store = useContext(AppContext);

  if (!store) {
    throw new Error('Component is not under a provider');
  }

  return store;
};
