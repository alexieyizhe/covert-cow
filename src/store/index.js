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
	targetRelativePos: [0, 0],

	get targetPos() {
		return [
			this.targetRelativePos[0] * window.innerWidth,
			this.targetRelativePos[1] * window.innerHeight
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

export const useAppStore = () => useContext(AppContext);
