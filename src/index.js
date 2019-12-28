import { h } from 'preact';
import { setPragma } from 'goober';

import { AppStateProvider } from './state';
import Main from './components/Main';

setPragma(h);

const App = () => (
	<AppStateProvider>
		<Main />
	</AppStateProvider>
);

export default App;
