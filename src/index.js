import { h } from 'preact';
import { setPragma } from 'goober';

import { AppStoreProvider } from 'store';
import Main from 'Main';

setPragma(h);

const App = () => (
  <AppStoreProvider>
    <Main />
  </AppStoreProvider>
);

export default App;
