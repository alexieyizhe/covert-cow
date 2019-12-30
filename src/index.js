import { h } from 'preact';
import { setPragma } from 'goober';

import { AppStoreProvider } from 'store';
import Main from 'components/Main';

setPragma(h);

const App = () => (
  <>
    <link
      href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah&display=swap"
      rel="stylesheet"
    />
    <AppStoreProvider>
      <Main />
    </AppStoreProvider>
  </>
);

export default App;
